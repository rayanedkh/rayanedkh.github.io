---
layout: page
title: "hERG Cardiotoxicity Prediction — Hackathon Finalist (Top 4/25)"
description: "Predicting hERG channel blockade from molecular descriptors — hackathon finalist"
img: assets/img/herg.jpg
importance: 7
category: work
---

## Project Overview

Built during a hackathon at **Télécom Paris** (organized with MARGO, Qubit-Pharmaceuticals and IBM), this project tackles the prediction of **hERG inhibition** — a key cause of drug-induced cardiac toxicity. The goal was to build a binary classifier predicting whether a molecule blocks the hERG channel. Working in a team of three, we reached the **finals (top 4 out of 25 teams)**.

## Methodology

- **Molecular representations**: RDKit descriptors, Morgan fingerprints (ECFC) and pharmacophore fingerprints (FCFC), and raw SMILES
- **Descriptor-based models**: Deep Neural Networks trained on engineered molecular features
- **Graph-based models**: Graph Neural Networks operating directly on molecular graphs
- **Sequence models**: Transformers on SMILES representations
- **Ensembling**: Combining complementary model families for robust toxicity prediction

## Technologies

- **Language**: Python
- **Libraries**: RDKit, PyTorch
- **Methods**: GNNs, DNNs, Transformers, Molecular fingerprints

## Presentation Slides

View or download the presentation slides:

<div class="pdf-container" style="width: 100%; margin: 1rem 0;">
  <iframe
    src="{{ '/assets/pdf/project_reports/herg_hackathon_slides.pdf' | relative_url }}"
    type="application/pdf"
    width="100%"
    height="600px"
    style="border: 1px solid #ddd; border-radius: 0.25rem;">
    <p>Your browser does not support PDF embedding. <a href="{{ '/assets/pdf/project_reports/herg_hackathon_slides.pdf' | relative_url }}" target="_blank">Download the PDF</a></p>
  </iframe>
</div>

## Repository

[View on GitHub](https://github.com/rayanedkh/hERG-prediction)
