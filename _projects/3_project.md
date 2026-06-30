---
layout: page
title: "Adversarial Robustness"
description: "PGD attacks, TRADES and strong augmentation on CIFAR-10"
img: assets/img/ADV_Training.jpg
importance: 3
category: work
---

{% include custom_styles.liquid %}

## Project Overview

Deep neural networks achieve impressive performance on image classification yet remain highly vulnerable to adversarial perturbations. In this project we study adversarial robustness on **CIFAR-10**, reproducing and analyzing established methods rather than proposing new ones. The work focuses on two practical levers: the impact of **strong data augmentation** on clean performance, and the effectiveness of the **TRADES** objective in improving robustness.

## Methodology

- **Lightweight CNN**: A fast-inference architecture, essential for iterative attacks such as PGD
- **Data augmentation**: Random crops, flips and wavelet-based feature extraction to improve generalization
- **Adversarial attacks**: Standard gradient-based attacks (PGD) for evaluation and adversarial example generation
- **Training objectives**: Comparing classical PGD adversarial training against the TRADES formulation, which explicitly balances natural accuracy and robustness through a KL-regularized loss

## Technologies

- **Language**: Python
- **Framework**: PyTorch
- **Methods**: PGD attacks, TRADES, Wavelet feature extraction, Data augmentation

## Project Report

View or download the full project report:

<div class="pdf-container" style="width: 100%; margin: 1rem 0;">
  <iframe
    src="{{ '/assets/pdf/project_reports/adversarial_cifar10_report.pdf' | relative_url }}"
    type="application/pdf"
    width="100%"
    height="600px"
    style="border: 1px solid #ddd; border-radius: 0.25rem;">
    <p>Your browser does not support PDF embedding. <a href="{{ '/assets/pdf/project_reports/adversarial_cifar10_report.pdf' | relative_url }}" target="_blank">Download the PDF</a></p>
  </iframe>
</div>
