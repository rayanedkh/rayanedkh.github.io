---
title: "Collaborative Filtering"
order: 9
summary: "Predicting movie ratings three ways: matrix factorisation, kernelised matrix factorisation, and PCA on the rating matrix."
tags:
  - Recommender Systems
  - Kernel Methods
tech_stack:
  - NumPy
  - Matrix factorisation
  - Kernel methods
  - PCA
links:
  - type: github
    url: https://github.com/rayanedkh/collaborative-filtering
    label: Code
  - type: file
    url: report.pdf
    label: Report
  - type: file
    url: slides.pdf
    label: Slides
featured: false
status: "Datalab project 1"
role: "Team of 3"
duration: "MSc IASD, PSL"
highlights:
  - "Four-way kernel mixture reached RMSE 0.8963"
  - "PCA on 8 components, each aligning with a film genre"
  - "Linear kernel trained 600 epochs in 1.46s against 5.29s for RBF"
---

{{< kicker >}}Datalab project 1 · MSc IASD, PSL{{< /kicker >}}

{{< lede >}}
Predict user ratings on a set of films. Three families of method were implemented and compared:
matrix factorisation, its kernelised variant, and PCA on the rating matrix.
{{< /lede >}}

{{< stats >}}
  {{< stat value="0.8963" label="RMSE of the four-way kernel mixture, the best model" >}}
  {{< stat value="8" label="principal components, one per dominant film genre" >}}
  {{< stat value="1.46" unit="s" label="linear kernel over 600 epochs, against 5.29s for RBF" >}}
{{< /stats >}}

{{< meta >}}
  {{< metaitem term="Course" >}}Datalab, MSc IASD, PSL{{< /metaitem >}}
  {{< metaitem term="Team" >}}Nathan Rouillé, Sacha Khosrowshahi and myself, group Regelegorilab{{< /metaitem >}}
  {{< metaitem term="Metric" >}}RMSE, with accuracy-oriented variants where the course leaderboard ranked on accuracy{{< /metaitem >}}
{{< /meta >}}

## Matrix factorisation

**ALS** converges fast and monotonically on MSE, with an early stop around 10 to 30 iterations.
The best test RMSE in the sweep was about 0.97, at λ = 0.30, μ = 0.30 and k = 80.

**SGD** reaches better quality with careful learning rate and regularisation, but needs more
tuning and more time. Low regularisation overfits visibly: the test RMSE starts rising while the
training RMSE keeps falling.

## Kernelised matrix factorisation

Following Liu et al. (2016), the inner product between user and item factors is replaced by a
kernel, so the prediction becomes a global mean plus user and item biases plus a kernelised
interaction.

| Kernel | Test RMSE | 600 epochs |
|---|---|---|
| Linear | 0.9139 | 1.46 s |
| RBF | 0.9921 | 5.29 s |
| Sigmoid | 1.0615 | 4.29 s |

A separate **genre kernel** builds a multi-hot item matrix from the pipe-separated genres and
gives a neighbourhood predictor at RMSE 0.9483 with 99.3% coverage.

The mixture weights are found by Dirichlet random search on the simplex. Mixing only the three
kernels is revealing: the search puts **0.939 on the linear model** and almost nothing on the
other two, for RMSE 0.906. The kernels barely add anything to each other.

Adding the genre predictor as a fourth column is what moves the number, down to **RMSE 0.8963**,
beating the uniform average of the same four by 4.6%. The gain comes from a different kind of
information, not from more kernels.

## PCA

Partial covariance, eigenvalue decomposition, then rounding. Sweeping the number of components
put the reconstruction error at its lowest for **k = 8**, giving RMSE 0.92 and accuracy 0.24.

Those eight components turned out to be readable. Taking the most correlated genre for each:

| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|
| Comedy | Romance | Fantasy | Drama | Children | Drama and Horror | Film-Noir | Crime |

Three extensions were tried. **Iterative PCA through EM**, imputing the missing entries at the
E-step and recomputing the PCA at the M-step, where hard rounding was the obstacle and smooth
linear or sigmoid rounding was tested instead, both landing at RMSE 0.93. **Kernel PCA**
following Sanguinetti and Lawrence, implemented in MATLAB, proved computationally expensive. And
a **hybrid** using the PCA solution to initialise the matrix factorisation.

## The documents

{{< doc src="report.pdf" label="Project report" >}}

{{< doc src="slides.pdf" label="Presentation slides" height="560" >}}

## Credits

Joint work with **Nathan Rouillé** and **Sacha Khosrowshahi**, group Regelegorilab, for the
Datalab of the MSc IASD programme.
