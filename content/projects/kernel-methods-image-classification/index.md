---
title: "Kernel Methods for Image Classification"
order: 5
summary: "A CIFAR-10 classifier built only from kernel methods, no deep learning framework. From 25% on raw pixels to about 70% on the Kaggle leaderboard."
tags:
  - Kernel Methods
  - Computer Vision
tech_stack:
  - NumPy
  - Convolutional Kernel Networks
  - HOG
  - Kernel Ridge Regression
  - cvxopt
links:
  - type: github
    url: https://github.com/rayanedkh/Kaggle-challenge-kernel-methods
    label: Code
  - type: file
    url: report.pdf
    label: Report
  - type: live
    url: https://www.kaggle.com/competitions/data-challenge-kernel-methods-2025-2026
    label: Kaggle
featured: true
status: "3rd of 44 teams"
role: "With Alexandre Mallez"
duration: "Kernel Methods, MVA / IASD"
highlights:
  - "3rd of 44 teams on the Kaggle data challenge"
  - "CKN, HOG, K-means++ and PCA implemented from scratch in NumPy"
  - "RBF outperformed every other kernel at every step"
---

{{< kicker >}}Data challenge · Kernel Methods, MVA / IASD{{< /kicker >}}

{{< lede >}}
Classify a CIFAR-10 subset using kernel methods only, with no deep learning framework. 5,000
training and 2,000 test images, ten balanced classes.
{{< /lede >}}

{{< stats >}}
  {{< stat value="3rd" unit="/ 44 teams" label="on the Kaggle data challenge leaderboard" >}}
  {{< stat value="25 → 70" unit="%" label="accuracy, across five steps" >}}
  {{< stat value="192" label="effective rank of the fused features, out of 5,376 dimensions" >}}
{{< /stats >}}

{{< meta >}}
  {{< metaitem term="Course" >}}Machine Learning with Kernel Methods, MVA / IASD{{< /metaitem >}}
  {{< metaitem term="With" >}}Alexandre Mallez{{< /metaitem >}}
  {{< metaitem term="Code" >}}[github.com/rayanedkh/Kaggle-challenge-kernel-methods](https://github.com/rayanedkh/Kaggle-challenge-kernel-methods){{< /metaitem >}}
{{< /meta >}}

## Label noise sets the ceiling

A first visual inspection showed a non-negligible fraction of the training set visually
misclassified, a dog labelled as a cat and the like. That puts an empirical ceiling on achievable
accuracy, and it is why the design favoured soft-margin classifiers and feature-averaging
strategies, both of which tolerate label noise.

## The progression

| Step | Method | Val. acc. |
|---|---|---|
| 1 | Raw pixels + RBF-SVM | ≈ 25% |
| 2 | HOG + RBF-SVM | ≈ 57% |
| 2b | HOG + augmentation + RBF-SVM | ≈ 59% |
| 3 | HOG + augmentation + RBF-KRR | ≈ 62% |
| 4 | CKN (256 filters) + PCA + RBF-KRR | ≈ 63% |
| **5** | **CKN + HOG + PCA + RBF-KRR** | **≈ 69%** |

Raw pixels stall at 25%, since pixel space carries no invariance to translation, lighting or
viewpoint. HOG descriptors, implemented manually with 9 orientation bins and 4×4 cells, lift that
to about 56% at C = 20, and augmentation to 59%.

Kernel ridge regression solves the multi-class problem in closed form through a Cholesky solve,
reaching 62% and replacing the SVM from then on. Throughout every experiment, RBF outperformed
the linear, polynomial, χ² and histogram-intersection kernels.

## Why CKN

A Convolutional Kernel Network gives a finite-dimensional feature map approximating the order-1
arc-cosine kernel, through the randomised map $\varphi(x) = \mathrm{ReLU}(Wx)$ on L2-normalised
filters. Using k-means centroids as those filters rather than random Gaussian ones concentrates
the approximation budget on the directions of highest data density.

Per image: 3×3 patches on a dense grid, ZCA whitening, L2 normalisation, 512 k-means++ filters,
average pooling, spatial pyramid matching at levels 1, 2 and 4 for 10,752 dimensions, then power
normalisation.

## Fusion

CKN and HOG were standardised and concatenated with a mixing weight. A grid search peaked at 0.3,
weighted towards HOG, for about 69% validation accuracy.

PCA then reduced the result to 2,048 components. The diagnostic that justified it: cumulative
explained variance reaches 90% in about 300 components, and the effective rank is about **192 out
of 5,376**.

Final submission: about **70% on the Kaggle public leaderboard**.

## What did not work

Training the CKN filters by backpropagation, hand-implemented in NumPy, plateaued at about 50%
after 150 epochs. The report attributes this to an issue in the implementation, and the path was
abandoned for that reason and for its runtime.

## The document

{{< doc src="report.pdf" label="Project report" >}}

## Credits

Joint work with **Alexandre Mallez**, for the Kernel Methods course of the MVA / IASD programme.
