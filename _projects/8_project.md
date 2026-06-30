---
layout: page
title: "2PAC: Asynchronous Blockchain Consensus Implementation"
description: "Implementing and benchmarking the 2PAC BIG consensus protocol against GradedDAG"
img: assets/img/2PAC.jpg
importance: 8
category: work
---

## Project Overview

This project implements the **2PAC BIG** blockchain consensus protocol and benchmarks it against **GradedDAG**. 2PAC BIG is a more complex variant of 2PAC, developed in response to a vulnerability found in the *Ditto* consensus of Facebook's *Diem* blockchain. The aim was to demonstrate empirically that 2PAC BIG can commit blocks faster and more reliably than the previous state-of-the-art asynchronous consensus protocol under adverse network conditions.

## Methodology

- **Protocol implementation**: Full 2PAC BIG and GradedDAG node logic with leader election, voting and block commitment
- **Network simulation**: Multithreading and sockets to simulate concurrent nodes, with controlled per-node delays (a randomly delayed node 4)
- **Key scenario**: In the delay window where GradedDAG stalls, 2PAC is still able to commit blocks
- **Results**: Across 1,000 simulations, 2PAC showed a **~7.2% higher commit success rate**, closely matching the ~8% theoretical advantage from the paper

## Technologies

- **Language**: Python
- **Libraries**: PyNaCl, NumPy
- **Methods**: Distributed consensus, Multithreading, Sockets, Cryptographic signatures

## Project Poster

View or download the project poster:

<div class="pdf-container" style="width: 100%; margin: 1rem 0;">
  <iframe
    src="{{ '/assets/pdf/project_reports/2pac_blockchain_poster.pdf' | relative_url }}"
    type="application/pdf"
    width="100%"
    height="600px"
    style="border: 1px solid #ddd; border-radius: 0.25rem;">
    <p>Your browser does not support PDF embedding. <a href="{{ '/assets/pdf/project_reports/2pac_blockchain_poster.pdf' | relative_url }}" target="_blank">Download the PDF</a></p>
  </iframe>
</div>

## Repository

[View on GitHub](https://github.com/rayanedkh/blockchain-2PAC)
