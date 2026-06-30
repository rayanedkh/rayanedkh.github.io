---
layout: page
title: "Collaborative Filtering: Kernel Matrix Factorization & Kernel PCA"
description: "Predicting user ratings with kernelized matrix factorization and PCA"
img: assets/img/collaborative_filtering.jpg
importance: 1
category: work
---

## Project Overview

This project explores collaborative filtering methods to predict user ratings on a set of items. We implemented and compared several algorithms, tuning their key hyperparameters to understand how design choices affect performance. Starting from a classical Matrix Factorization baseline, we progressively moved towards kernelized formulations to capture non-linear structure in the user–item interactions.

## Methodology

- **Matrix Factorization (ALS)**: Alternating Least Squares baseline for latent-factor estimation
- **Kernel Matrix Factorization (KMF)**: Non-linear extension of MF using kernels
- **Kernel PCA**: Dimensionality reduction to expose latent structure in the rating matrix
- **Evaluation**: RMSE as the primary metric, with accuracy-oriented variants when relevant

For each algorithm we (i) motivate the switch from the previous approach, (ii) detail the parameters we controlled and how we tuned them, and (iii) present and interpret the results — explaining *why* each method behaves as it does and under which conditions it excels.

## Technologies

- **Language**: Python
- **Libraries**: NumPy, SciPy
- **Methods**: Matrix Factorization (ALS), Kernel Matrix Factorization, Kernel PCA

## Project Report

View or download the full project report:

<div class="pdf-container" style="width: 100%; margin: 1rem 0;">
  <iframe
    src="{{ '/assets/pdf/project_reports/collaborative_filtering_report.pdf' | relative_url }}"
    type="application/pdf"
    width="100%"
    height="600px"
    style="border: 1px solid #ddd; border-radius: 0.25rem;">
    <p>Your browser does not support PDF embedding. <a href="{{ '/assets/pdf/project_reports/collaborative_filtering_report.pdf' | relative_url }}" target="_blank">Download the PDF</a></p>
  </iframe>
</div>

## Repository

[View on GitHub](https://github.com/rayanedkh/collaborative-filtering)
