---
title: "Improving and Tuning GAN Precision and Recall"
order: 4
summary: "Training f-GANs on MNIST under four divergences, then tuning the precision and recall balance after training with soft truncation and discriminator rejection sampling."
tags:
  - Generative Models
tech_stack:
  - PyTorch
  - f-GANs
  - FID
links:
  - type: github
    url: https://github.com/rayanedkh/GAN-Latent-Space-Tuning
    label: Code
  - type: file
    url: report.pdf
    label: Report
featured: true
status: "Data Science Lab project 2"
role: "Team of 3"
duration: "MSc IASD, PSL"
highlights:
  - "The divergences did not behave as theory predicts, and the report says so"
  - "Discriminator rejection sampling with a 20,000 sample burn-in"
  - "Soft truncation trades precision against recall, never improves both"
---

{{< kicker >}}Data Science Lab, project 2 · MSc IASD, PSL{{< /kicker >}}

{{< lede >}}
GANs trade precision, the realism of generated samples, against recall, the coverage of the data
distribution. The project studies that balance on MNIST, first by changing the training
divergence, then by two post-training methods.
{{< /lede >}}

{{< stats >}}
  {{< stat value="4" label="objectives compared: KL, JS, reverse KL and vanilla BCE" >}}
  {{< stat value="20,000" label="samples in the rejection sampling burn-in" >}}
  {{< stat value="10⁴" label="real and generated images compared per evaluation point" >}}
{{< /stats >}}

{{< meta >}}
  {{< metaitem term="Course" >}}Data Science Lab, MSc IASD, PSL{{< /metaitem >}}
  {{< metaitem term="Team" >}}Jules Roques, Chloé Court and myself{{< /metaitem >}}
  {{< metaitem term="Dataset" >}}MNIST{{< /metaitem >}}
{{< /meta >}}

## Measuring in the right space

Comparing handwritten digits pixel by pixel says nothing about how people perceive them, so
everything is measured in the penultimate layer of a CNN classifier trained on MNIST. Inception
is too general to capture MNIST variation, so FID is computed in that same custom space.

Two precision and recall definitions are used: Sajjadi et al. (2018), which gives a set of
attainable pairs and lets model frontiers be compared, and Kynkäänniemi et al. (2019), which
gives a single pair from a k-NN coverage algorithm, usable during training.

## The divergences did not behave as expected

The f-GAN framework generalises the adversarial objective to any f-divergence. Four objectives
were trained: **KL, JS and reverse KL**, against the **vanilla BCE** baseline.

The baseline BCE produces the most realistic digits but lacks diversity. On the PR curve, **KL
achieves both the best precision and the best recall** among the three f-GANs, though the report
notes this is not obvious from the digits themselves.

That result is unexpected. Theory says KL should induce more diversity, reverse KL more
precision, and JS find a balance between the two. The report attributes the discrepancy to
hyperparameters, and points at the discriminator and generator learning rates as what would need
more tuning before drawing conclusions.

## Keeping KL and reverse KL stable

Both are more prone to instability than the others, because of the exponential terms in the
generator loss. Three things helped.

**Adaptive learning rates.** KL needed a smaller learning rate on the discriminator to stop it
overpowering the generator. Tuning the Adam momentum parameters smoothed the updates and reduced
oscillation.

**Two generator updates per discriminator step**, again to stop the discriminator dominating and
keep the gradients meaningful for the generator.

**Clamping the discriminator output**, which cut the extreme gradients that KL and reverse KL
produce and prevented numerical explosions. It is visible in the code, where the discriminator
returns a scaled hyperbolic tangent rather than a raw logit.

## Soft truncation

Sampling the latent embeddings with a variance other than one. Higher variance gives more
diversity, lower variance gives more quality. Sweeping from 0.5 to 2.0, it never improves
precision and recall at the same time, which only the training-time methods do.

The sweep also surfaced a limitation of the Sajjadi PR curves, already noted by Kynkäänniemi et
al.: for a KL-trained GAN they fail to register the expected movement and underestimate every
truncation value other than one.

## Discriminator rejection sampling

Following Azadi et al. (2019), implemented in the repository. A burn-in over 20,000 samples
records the largest discriminator logit, a margin is added to it, and each generated sample is
then accepted with a probability that is a sigmoid of its own logit shifted by that constant.
Samples the discriminator judges more real are kept more often, and the acceptance rate is
reported at the end.

The repository also runs a variant chaining the two, where the latent vector is first rescaled by
a factor derived from the discriminator score, clamped to a narrow range, before rejection
sampling is applied.

This part is implemented in code but its section in the report was left empty, so there are no
written results for it.

## The document

{{< doc src="report.pdf" label="Project report" >}}

## Credits

Joint work with **Jules Roques** and **Chloé Court**, for the Data Science Lab of the MSc IASD
programme.
