---
layout: page
title: "Kernel Methods for Image Classification"
description: "CIFAR-10 classification with only kernel methods — Kaggle data challenge"
img: assets/img/kernel.jpg
importance: 4
category: work
---

{% include custom_styles.liquid %}

## Project Overview

This project implements a complete image classification pipeline for a subset of **CIFAR-10**, based **exclusively on kernel methods** — without any deep learning framework. The challenge emphasized robust feature extraction and regularization to handle significant label noise. Our final pipeline ranked **3rd out of 44 teams** on the Kaggle Data Challenge leaderboard.

## Technical Pipeline

- **CKN (Convolutional Kernel Networks)**: Convolutional layer with 512 filters learned via **K-means++ (implemented from scratch)**, ZCA whitening and Spatial Pyramid Pooling
- **HOG (Histogram of Oriented Gradients)**: Manual implementation with 9 orientation bins, 4×4 cells and L2-Hys block normalization
- **PCA**: SVD-based projection onto the top principal components, acting as a powerful regularizer against noisy directions
- **KRR (Kernel Ridge Regression)**: Solved analytically via Cholesky decomposition with an adaptively estimated RBF kernel
- **Robustness**: Multi-crop voting and augmentation to counter heavy training label noise

## Technologies

- **Language**: Python
- **Libraries**: NumPy, cvxopt
- **Methods**: CKN, HOG, K-means++, PCA (SVD), Kernel Ridge Regression, RBF kernel

## Project Report

View or download the full project report:

<div class="pdf-container" style="width: 100%; margin: 1rem 0;">
  <iframe
    src="{{ '/assets/pdf/project_reports/kaggle_kernel_methods_report.pdf' | relative_url }}"
    type="application/pdf"
    width="100%"
    height="600px"
    style="border: 1px solid #ddd; border-radius: 0.25rem;">
    <p>Your browser does not support PDF embedding. <a href="{{ '/assets/pdf/project_reports/kaggle_kernel_methods_report.pdf' | relative_url }}" target="_blank">Download the PDF</a></p>
  </iframe>
</div>

## Links

- [View on GitHub](https://github.com/rayanedkh/Kaggle-challenge-kernel-methods)
- [Kaggle Competition](https://www.kaggle.com/competitions/data-challenge-kernel-methods-2025-2026)
