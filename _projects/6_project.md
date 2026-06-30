---
layout: page
title: "Streaming Active Learning"
description: "VeSSAL (ICML 2023): batch active learning for deep neural networks"
img: assets/img/Vessal.jpg
importance: 6
category: work
---

{% include custom_styles.liquid %}

## Project Overview

A presentation, prepared for the Advanced Machine Learning course of the IASD Master's program, of **VeSSAL** (Saran et al., *ICML 2023*) — *Streaming Active Learning with Deep Neural Networks*. The paper introduces a method for selecting informative batches of examples in a **streaming** setting, where data arrives sequentially and decisions must be made on the fly, making it well suited to large-scale deep learning pipelines.

## Key Ideas

- **Streaming active learning**: Selecting points to label as they arrive, without access to the full pool
- **Volume sampling**: Choosing diverse and informative batches via a determinantal/covariance-based criterion
- **Scalability**: A practical selection rule that scales to deep networks and large datasets
- **Empirical study**: Trade-offs between labeling budget, batch diversity and downstream accuracy

## Topics

- Active Learning, Streaming selection, Deep Neural Networks, Batch diversity

## Presentation Slides

View or download the presentation slides:

<div class="pdf-container" style="width: 100%; margin: 1rem 0;">
  <iframe
    src="{{ '/assets/pdf/project_reports/vessal_icml2023_slides.pdf' | relative_url }}"
    type="application/pdf"
    width="100%"
    height="600px"
    style="border: 1px solid #ddd; border-radius: 0.25rem;">
    <p>Your browser does not support PDF embedding. <a href="{{ '/assets/pdf/project_reports/vessal_icml2023_slides.pdf' | relative_url }}" target="_blank">Download the PDF</a></p>
  </iframe>
</div>
