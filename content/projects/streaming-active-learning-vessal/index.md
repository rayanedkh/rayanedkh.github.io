---
title: "Streaming Active Learning with VeSSAL"
order: 8
summary: "A presentation of VeSSAL (Saran et al., ICML 2023), which selects a diverse labelling batch from a stream while seeing each point only once."
tags:
  - Active Learning
  - Paper Reading
tech_stack:
  - Volume sampling
  - Gradient embeddings
links:
  - type: file
    url: slides.pdf
    label: Slides
featured: false
status: "Paper presentation"
role: "With Nathan Rouillé"
duration: "Advanced Machine Learning, M2 IASD"
highlights:
  - "Gradient norm carries uncertainty, gradient direction carries diversity"
  - "Runtime stays nearly constant as the batch grows, where BADGE scales superlinearly"
  - "Assumes the number of classes is known, which open-world settings break"
---

{{< kicker >}}Advanced Machine Learning · PSL University, M2 IASD{{< /kicker >}}

{{< lede >}}
VeSSAL, for Volume Sampling for Streaming Active Learning, picks which points to label from a
stream. It sees each unlabeled point only once and commits to a decision immediately.
{{< /lede >}}

{{< stats >}}
  {{< stat value="1" label="pass over each unlabeled point, with an immediate commitment" >}}
  {{< stat value="9 / 10" label="distinct classes among the objects VeSSAL selects on CLOW" >}}
  {{< stat value="0" label="hyperparameters to tune" >}}
{{< /stats >}}

{{< meta >}}
  {{< metaitem term="Course" >}}Advanced Machine Learning, M2 IASD, PSL University{{< /metaitem >}}
  {{< metaitem term="With" >}}Nathan Rouillé{{< /metaitem >}}
  {{< metaitem term="Paper" >}}Saran et al., *Streaming Active Learning with Deep Neural Networks*, ICML 2023{{< /metaitem >}}
{{< /meta >}}

## Two design choices

**How to represent an unlabeled sample.** Its last-layer gradient under the predicted label. The
norm of that gradient carries uncertainty, since a confident prediction gives a small gradient
and an uncertain one a large gradient. Its direction carries diversity, since different regions
of input space induce gradients pointing different ways. One object, both quantities.

**How to select a diverse subset.** Approximate volume sampling, a determinantal criterion.

## From batch to stream

Volume sampling normally needs to see every candidate at once. The move that makes it streaming
is to accept an arriving point with probability proportional to its marginal determinantal
contribution given what has already been selected, using the covariance of the points chosen so
far.

That leaves a scaling term, needed so the expected query rate matches a target. A fixed value
fails, because the distribution of the quantity being scaled shifts every time a point enters the
covariance, which leads to drastic over- or under-sampling. The scaling has to be autotuned.

## Results

On i.i.d. streams VeSSAL matches or nearly matches BADGE, the best non-streaming method, despite
the streaming constraint. Under adversarial sorting or natural drift it stays robust and still
competitive with pool-based methods.

The diversity is visible on CLOW, where VeSSAL selects ten objects spanning nine classes while
uniform sampling keeps picking the same one. Its runtime stays nearly constant as the batch size
grows, where BADGE and Coreset scale superlinearly.

## Limitations

The paper assumes the number of classes is known in advance, which is not realistic in open-world
settings. The covariance estimate can be biased under non-i.i.d. ordering, which is empirically
not a major issue but carries no theoretical guarantee. And every query is treated as equally
costly, so variable annotation cost is ignored.

## The document

{{< doc src="slides.pdf" label="Presentation slides" height="560" >}}

## Credits

Presented with **Nathan Rouillé**, for the Advanced Machine Learning course of the M2 IASD.
