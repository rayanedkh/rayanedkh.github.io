---
layout: page
title: "DeepSDF: Learning Continuous Signed Distance Functions for 3D Shapes"
description: "Implicit neural 3D shape representation via auto-decoders and signed distance functions"
img: assets/img/deepsdf.jpg
importance: 5
category: work
---

## Project Overview

Prepared for the **3D Point Cloud and Modeling (NPM3D)** course of the IASD Master's program, this project presents an in-depth study of *DeepSDF: Learning Continuous Signed Distance Functions for Shape Representation* (Park et al.). DeepSDF represents surfaces **implicitly** as the zero-level-set of a neural network conditioned on a latent code, encoding an entire class of 3D shapes within a compact latent space — rather than relying on discrete voxel grids or parametric meshes.

## Key Concepts

- **Implicit surfaces**: Shapes represented as the zero-level-set of a learned continuous SDF
- **Auto-decoder formulation**: A decoder-only network trained by jointly optimizing the network weights and per-shape latent vectors
- **Inference from partial data**: MAP estimation recovers shapes from partial observations
- **Reproduced experiments**: Shape reconstruction and latent-space interpolation, confirming the paper's central claims

## Technologies

- **Language**: Python
- **Framework**: PyTorch
- **Techniques**: Signed Distance Functions, Auto-decoders, Marching Cubes, Latent-space interpolation

## Project Report

View or download the full project report:

<div class="pdf-container" style="width: 100%; margin: 1rem 0;">
  <iframe
    src="{{ '/assets/pdf/project_reports/deepsdf_report.pdf' | relative_url }}"
    type="application/pdf"
    width="100%"
    height="600px"
    style="border: 1px solid #ddd; border-radius: 0.25rem;">
    <p>Your browser does not support PDF embedding. <a href="{{ '/assets/pdf/project_reports/deepsdf_report.pdf' | relative_url }}" target="_blank">Download the PDF</a></p>
  </iframe>
</div>
