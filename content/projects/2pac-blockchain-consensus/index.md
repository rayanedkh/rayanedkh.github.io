---
title: "2PAC Blockchain Consensus"
order: 11
summary: "Implementing the 2PAC BIG asynchronous consensus and measuring, over 1,000 simulations, the delay window where it commits blocks and GradedDAG cannot."
tags:
  - Distributed Systems
  - Consensus Protocols
tech_stack:
  - Python
  - PyNaCl
  - Sockets
  - Multithreading
links:
  - type: github
    url: https://github.com/rayanedkh/blockchain-2PAC
    label: Code
  - type: file
    url: poster.pdf
    label: Poster
featured: false
status: "Supervised by M. Rambaud"
role: "Team of 5"
duration: "Télécom Paris"
highlights:
  - "96.1% commit rate against 88.9% for GradedDAG, over 1,000 simulations"
  - "Close to the 8% predicted analytically in the paper"
  - "The gap appears only in a narrow delay window"
---

{{< kicker >}}Télécom Paris, Institut Polytechnique de Paris · supervised by M. Rambaud{{< /kicker >}}

{{< lede >}}
2PAC is the asynchronous consensus M. Rambaud designed after finding a flaw in the safety of
2-Phase-VABA. We implemented 2PAC BIG and benchmarked it against GradedDAG, to check empirically
the advantage the paper predicts.
{{< /lede >}}

{{< stats >}}
  {{< stat value="96.1 / 88.9" unit="%" label="commit rate of 2PAC against GradedDAG" >}}
  {{< stat value="8" unit="%" label="the advantage predicted analytically in the paper" >}}
  {{< stat value="1,000" label="simulations run per protocol" >}}
{{< /stats >}}

{{< meta >}}
  {{< metaitem term="School" >}}Télécom Paris, Institut Polytechnique de Paris{{< /metaitem >}}
  {{< metaitem term="Supervisor" >}}M. Rambaud{{< /metaitem >}}
  {{< metaitem term="Team" >}}Nathan Rouillé, Titouan Duhazé, Adam Chgour, Aymane Hamdaoui and myself{{< /metaitem >}}
  {{< metaitem term="Paper" >}}[eprint.iacr.org/2024/1108](https://eprint.iacr.org/2024/1108.pdf){{< /metaitem >}}
{{< /meta >}}

## Where the two protocols differ

Abraxas combines two consensuses: Jolteon while the blockchain runs normally, and 2-Phase-VABA
when it is under attack. Before implementing anything we had to understand Jolteon and write out
a proof of its safety, meaning a proof that a validated transaction is immutable.

The simulation gives node 4 an extra delay drawn from the absolute value of a normal distribution
with mean 0 and standard deviation 0.7s, against a 0.5s communication delay between the other
nodes. Three regimes follow:

| Extra delay on node 4 | 2PAC | GradedDAG |
|---|---|---|
| Below 0.5s | commits | commits |
| **Between 0.5s and 1s** | **commits** | **cannot commit** |
| Above 1s | cannot commit | cannot commit |

The middle band is the whole question. It occurs in about 32% of draws within that range, which
works out to roughly 8% of all cases.

## Result

Over 1,000 simulations per protocol, 2PAC committed in **96.1%** of runs against **88.9%** for
GradedDAG, a gap of 7.2 points. That sits close to the 8% the paper predicts analytically. More
simulations, and larger node networks, would be needed for a statistically stronger claim.

## The hard part

Handling simultaneous communication between nodes with multithreading and sockets, while
injecting a precise delay on one node only. Keeping messages ordered under those conditions
needed careful threading and error handling to avoid deadlocks and race conditions.

## The document

{{< doc src="poster.pdf" label="Project poster" >}}

## Credits

Joint work with **Nathan Rouillé**, **Titouan Duhazé**, **Adam Chgour** and **Aymane Hamdaoui**,
supervised by **M. Rambaud** at Télécom Paris.
