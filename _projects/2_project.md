---
layout: page
title: "GAN Latent Space Tuning"
description: "Controlling the precision–recall trade-off of GANs with f-divergences"
img: assets/img/gan.jpg
importance: 2
category: work
---

{% include custom_styles.liquid %}

## Project Overview

Generative Adversarial Networks (GANs) have become a cornerstone of modern generative modeling, yet they often suffer from an inherent trade-off between **precision** (the realism of generated samples) and **recall** (the diversity or coverage of the data distribution). In practice many GANs favor one at the expense of the other, leading to mode collapse or low-fidelity outputs. This project explores and improves this balance through the lens of **f-divergence–based GANs (f-GANs)**.

## Methodology

- **f-GAN framework**: Generalizing the adversarial objective beyond the original Jensen–Shannon formulation
- **Divergence study**: Systematically varying the underlying divergence (KL, Pearson, reverse-KL) to control generator behavior
- **Precision–Recall analysis**: Empirically measuring how each training objective shifts the precision/recall characteristics
- **Quality metrics**: FID and precision/recall curves to quantify fidelity and coverage

## Technologies

- **Language**: Python
- **Framework**: PyTorch
- **Methods**: f-GANs, f-divergences (KL, Pearson, reverse-KL)
- **Metrics**: Precision, Recall, FID (Fréchet Inception Distance)

## Project Report

View or download the full project report:

<div class="pdf-container" style="width: 100%; margin: 1rem 0;">
  <iframe
    src="{{ '/assets/pdf/project_reports/gan_latent_space_report.pdf' | relative_url }}"
    type="application/pdf"
    width="100%"
    height="600px"
    style="border: 1px solid #ddd; border-radius: 0.25rem;">
    <p>Your browser does not support PDF embedding. <a href="{{ '/assets/pdf/project_reports/gan_latent_space_report.pdf' | relative_url }}" target="_blank">Download the PDF</a></p>
  </iframe>
</div>

## Repository

[View on GitHub](https://github.com/rayanedkh/GAN-Latent-Space-Tuning)
