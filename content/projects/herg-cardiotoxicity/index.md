---
title: "hERG Cardiotoxicity Prediction"
order: 10
summary: "Predicting hERG channel blockade from molecular structure, combining four model families over four molecular representations into a meta-model."
tags:
  - Graph Neural Networks
  - Applied ML
tech_stack:
  - RDKit
  - PyTorch
  - ChemBERTa
  - XGBoost
links:
  - type: github
    url: https://github.com/rayanedkh/hERG-prediction
    label: Code
  - type: file
    url: slides.pdf
    label: Slides
featured: false
status: "Hackathon finalist"
role: "Team of 3"
duration: "Télécom Paris, 56 hours"
highlights:
  - "Four model families, one per molecular representation"
  - "Series-aware cross-validation, since the third task splits by molecular series"
  - "Reached the final pitch"
---

{{< kicker >}}Hackathon · Télécom Paris with Télécom IA, 23 to 25 May 2025{{< /kicker >}}

{{< lede >}}
Build a binary classifier predicting whether a molecule blocks the hERG channel, a cause of
drug-induced heart problems. Organised by MARGO, Qubit Pharmaceuticals and IBM.
{{< /lede >}}

{{< stats >}}
  {{< stat value="4" label="model families, one per molecular representation" >}}
  {{< stat value="9,415" label="molecules in the training set" >}}
  {{< stat value="56" unit="h" label="the length of the hackathon" >}}
{{< /stats >}}

{{< meta >}}
  {{< metaitem term="Event" >}}Hackathon at Télécom Paris with the Télécom IA student association{{< /metaitem >}}
  {{< metaitem term="Organisers" >}}MARGO, Qubit Pharmaceuticals and IBM{{< /metaitem >}}
  {{< metaitem term="Team" >}}Noa A., Alexandre M. and myself{{< /metaitem >}}
  {{< metaitem term="Data" >}}Karim et al., *CardioTox net*, J Cheminform 13, 60 (2021){{< /metaitem >}}
{{< /meta >}}

## One model per representation

Each molecule arrives in four descriptions at once, so the approach was to pair each with the
model family that suits it, rather than force everything through one encoder.

| Representation | Model |
|---|---|
| SMILES strings | Transformers |
| Molecular graphs | Graph convolutional network |
| RDKit descriptors | Deep neural network |
| Morgan and pharmacophore fingerprints | XGBoost and Random Forest |

The transformer branch finetunes `seyonec/ChemBERTa-zinc-base-v1` for the chemical
representations. The graphs are built with RDKit.

## Combining them

The per-model probabilities feed a meta-model, and several combination rules were compared: a
neural network over the probabilities, a weighted average, a majority vote, and a logistic
regression.

That covers the first task, classification, and the third, which asks for the ordering of the
probabilities rather than the labels alone.

## The series task

The second test set carries a `series` column naming the molecular series each molecule belongs
to, which changes what a fair validation split looks like. The approach builds the `ecfc` and
`fcfc` fingerprint vectors, computes a Tanimoto distance matrix, and clusters it with linkage and
`fcluster`.

From there: analysis of the distributions, accuracy per series, a **series-aware**
cross-validation, and a grid search over the parameters.

## The document

{{< doc src="slides.pdf" label="Final pitch slides" height="560" >}}

## Credits

Team work with **Noa A.** and **Alexandre M.**
