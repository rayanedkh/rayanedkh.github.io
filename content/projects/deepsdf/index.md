---
title: "DeepSDF: Implicit Neural 3D Shape Representation"
order: 2
summary: "Reproducing DeepSDF on three ShapeNet objects, with a latent interpolation across categories and an ablation on the latent dimension and the skip connection."
tags:
  - 3D Vision
  - Representation Learning
tech_stack:
  - PyTorch
  - Signed Distance Functions
  - Auto-decoders
  - Marching Cubes
links:
  - type: file
    url: report.pdf
    label: Report
featured: true
status: "Course project"
role: "Solo"
duration: "NPM3D, Télécom Paris"
highlights:
  - "Latent dimension 128 cut Chamfer Distance by 54% against the baseline"
  - "Cross-category interpolation produced valid watertight meshes throughout"
  - "Without the two-level near-surface sampling the reconstructions collapsed"
---

{{< kicker >}}NPM3D course · Télécom Paris, PSL University{{< /kicker >}}

{{< lede >}}
A study and reproduction of *DeepSDF* (Park et al.), which represents a surface as the
zero-level-set of a neural network conditioned on a latent code, with an auto-decoder trained by
optimising the weights and the per-shape codes together.
{{< /lede >}}

{{< stats >}}
  {{< stat value="0.00207" label="best mean Chamfer Distance, at latent dimension 128" >}}
  {{< stat value="54" unit="%" label="improvement over the latent 64 baseline" >}}
  {{< stat value="275,000" label="SDF samples per shape, following the paper" >}}
{{< /stats >}}

{{< meta >}}
  {{< metaitem term="Course" >}}NPM3D, 3D Point Clouds and Modeling{{< /metaitem >}}
  {{< metaitem term="School" >}}Télécom Paris, PSL University{{< /metaitem >}}
  {{< metaitem term="Paper" >}}Park et al., *DeepSDF*{{< /metaitem >}}
  {{< metaitem term="Hardware" >}}One NVIDIA T4{{< /metaitem >}}
{{< /meta >}}

## Setup

The official Facebook Research repository turned out to be unusable. Its C++ preprocessing
binaries no longer build against CUDA 11 and later, between CMake dependency conflicts and ABI
incompatibilities introduced since the 2019 release, and it expects the full ShapeNet archive in
a specific directory structure. I used a Python-only reimplementation instead, replacing the C++
step with `point-cloud-utils` for the SDF computation.

Training ran on three ShapeNet objects from distinct categories, a bottle, a camera and a mug,
which is far fewer than the hundreds per category of the paper but enough to reproduce the
qualitative behaviour on one T4.

Data preparation follows the paper: 250,000 near-surface points perturbed with Gaussian noise at
σ = 0.0025 and σ = 0.00025, plus 25,000 uniform points, for 275,000 samples per shape. Eight
fully connected layers, inner dimension 512, latent code 64, weight normalisation, skip
connection at layer 4, 500 epochs.

## Reconstruction

Evaluating the learned SDF on a 128³ grid and extracting the zero-level-set with Marching Cubes
gives three clearly identifiable objects. The cross-sections show a field that is smooth and
continuous across the domain, with the sharp blue to red transition near the surface expected of
a metric SDF.

The mug is the instructive one. Its handle creates a genus-1 topology that the SDF captures with
no explicit topology constraint, which is exactly the advantage over template-based approaches
such as AtlasNet.

## Latent interpolation

Interpolating linearly between the bottle and the camera codes at seven values of α gives a
continuous geometric transition, and every intermediate shape is a valid watertight mesh.

The paper interpolates within one category. This one crosses categories, which is harder, and it
still holds together. That suggests the auto-decoder learns a representation continuous with
respect to geometric similarity rather than semantic class.

## Ablation

Four variants, 200 epochs each, everything else fixed, scored by mean Chamfer Distance over the
three shapes.

| Config | Skip | Latent | CD |
|---|---|---|---|
| Baseline | yes | 64 | 0.00452 |
| No skip connection | no | 64 | 0.00361 |
| **Latent 128** | yes | 128 | **0.00207** |
| Latent 256 | yes | 256 | 0.00417 |

Latent dimension 128 is the clear optimum, 54% better than the 64 baseline. Going to 256 degrades
it, which is consistent with overfitting: with three shapes the extra capacity has nothing to
generalise from. The paper identifies 256 as optimal for datasets of hundreds of shapes.

The skip connection result is **inconclusive**, and the aggregate is misleading. The no-skip
variant wins on the mean, but on the camera the baseline with skip scores 0.00186 against 0.00613
without, a factor of three the other way. With three shapes, per-object variance swamps the
effect entirely.

## What did not work at first

An initial version of the implementation sampled only on the surface and in the bounding box,
without the Gaussian perturbation. The reconstructions collapsed into featureless blobs. Only
after adopting the paper's two-level scheme, at σ = 0.0025 and σ = 0.00025, did the network learn
a usable SDF gradient near the zero-level-set.

The paper does describe this, but it is easy to read past, and it decides whether Marching Cubes
recovers clean geometry or nothing at all.

## Where it sits today

DeepSDF directly inspired Occupancy Networks and IM-Net, which swap the SDF for binary occupancy,
and NeRF, which applies the same decoder-with-latent-code idea to volumetric radiance fields.

Screened Poisson Reconstruction remains competitive for single-shape reconstruction from dense,
well-oriented point clouds, and is much faster, but it has no shape prior and so cannot complete
a shape from a partial depth map. That gap is what DeepSDF fills.

For real-time rendering, 3D Gaussian Splatting and surface-aware variants have largely superseded
implicit representations. Neural SDFs stay relevant where geometric fidelity matters more than
rendering speed, such as robotics and industrial inspection.

## The document

{{< doc src="report.pdf" label="Project report" >}}
