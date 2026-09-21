---
title: "Robust Classification on CIFAR-10"
order: 6
summary: "A CIFAR-10 classifier trained to resist adversarial attacks. Data augmentation, PGD adversarial training and the TRADES objective, compared on the same model."
tags:
  - Robustness
  - Computer Vision
tech_stack:
  - PyTorch
  - PGD
  - FGSM
  - TRADES
links:
  - type: file
    url: report.pdf
    label: Report
  - type: file
    url: slides.pdf
    label: Slides
featured: false
status: "DataScience Lab project"
role: "Team of 3"
duration: "MSc IASD, PSL"
highlights:
  - "TRADES raised robust accuracy under PGD L-infinity from 35% to 41.2%"
  - "Data augmentation alone reached 89% clean accuracy with no robustness"
  - "The wavelet feature extractor was not implemented"
---

{{< kicker >}}DataScience Lab · ENS PSL and Dauphine PSL{{< /kicker >}}

{{< lede >}}
Train a CIFAR-10 classifier that resists adversarial attacks, evaluated on the course testing
platform. The project compares data augmentation, PGD adversarial training and the TRADES
objective on the same model.
{{< /lede >}}

{{< stats >}}
  {{< stat value="89" unit="%" label="clean accuracy from data augmentation alone" >}}
  {{< stat value="35 → 41.2" unit="%" label="robust accuracy under PGD L-infinity, with TRADES" >}}
  {{< stat value="101" label="aggregated score of the best model, against 44.6 for the weakest" >}}
{{< /stats >}}

{{< meta >}}
  {{< metaitem term="Course" >}}DataScience Lab, MSc IASD, PSL{{< /metaitem >}}
  {{< metaitem term="Team" >}}Abel Douzal, Mika Liao and myself{{< /metaitem >}}
  {{< metaitem term="Date" >}}December 2025{{< /metaitem >}}
  {{< metaitem term="Dataset" >}}CIFAR-10{{< /metaitem >}}
{{< /meta >}}

## Data augmentation

Random crop, random horizontal flip, slight colour jitter, the RandAugment policy of Cubuk et al.
(2019), and random erasing.

Without any adversarial defence, the model reaches about 89% clean accuracy. Against PGD it has
almost no robustness. Strong augmentation alone does not suffice.

## Structure and training

Three CNN blocks, each followed by batch normalisation and dropout, then a fully connected
classification head with dropout. In the wavelet variant the three blocks are replaced by the
wavelet feature extractor.

Two adversarial objectives were compared. The PGD loss optimises cross-entropy on adversarial
inputs. The TRADES loss decomposes into a natural accuracy term and a KL divergence penalty
between clean and adversarial predictions, weighted by β.

## Experiments

| Method | Acc Nat | Acc PGD L2 | Acc PGD L-infinity | Aggregated |
|---|---|---|---|---|
| FGSM L2 | 81 | 32 | 12.6 | 44.6 |
| FGSM L-infinity | 78 | 42 | 25.7 | 67.7 |
| PGD L-infinity, CE | 72 | 45 | 34 | 79.0 |
| **PGD L-infinity, TRADES** | 73 | **49** | **42** | **101** |

Replacing cross-entropy with the TRADES loss raised robust L-infinity accuracy from 35% to 41.2%.
Of the objectives tested, TRADES was the most effective, and more stable than standard PGD
adversarial training.

## Perspective

Wavelet feature extraction was studied but not implemented. The Wavelet Scattering Transform is
provably Lipschitz continuous with respect to diffeomorphisms, its coefficients characterise
Besov regularity, and its multiscale decomposition filters high-frequency noise. Meyer's wavelet
is the candidate, since it is differentiable where Daubechies and Haar are not.

## The document

{{< doc src="report.pdf" label="Project report" >}}

## Credits

Joint work with **Abel Douzal** and **Mika Liao**, ENS PSL, for the DataScience Lab of the MSc
IASD programme.
