---
title: "Reinforcement Learning for Inventory Control"
order: 7
summary: "A retail store inventory MDP solved four ways, from Monte Carlo evaluation of fixed policies to policy iteration, asynchronous Q-learning and REINFORCE."
tags:
  - Reinforcement Learning
tech_stack:
  - Python
  - NumPy
  - Policy Iteration
  - Q-Learning
  - REINFORCE
links:
  - type: file
    url: notebook.ipynb
    label: Notebook
featured: false
status: "Course assignment"
role: "Solo"
duration: "Reinforcement Learning, M2 IASD"
highlights:
  - "Learning rate exponent 0.7 was the compromise between speed and stability"
  - "The optimal policy is a threshold rule, and the value function is concave"
  - "Fixed-ordering policies ignore the state, which is what makes them suboptimal"
---

{{< kicker >}}Reinforcement Learning · M2 IASD, PSL University{{< /kicker >}}

{{< lede >}}
A retail store decides how many items to order each week. Holding stock costs money, running out
loses sales, and demand is random. The assignment solves the same MDP four ways.
{{< /lede >}}

{{< stats >}}
  {{< stat value="4" label="methods on one environment: Monte Carlo, policy iteration, Q-learning, REINFORCE" >}}
  {{< stat value="1,000" label="Monte Carlo trajectories, at horizon 100" >}}
  {{< stat value="0.7" label="the learning rate exponent that balanced speed against stability" >}}
{{< /stats >}}

{{< meta >}}
  {{< metaitem term="Course" >}}Reinforcement Learning, M2 IASD, PSL University{{< /metaitem >}}
  {{< metaitem term="Role" >}}Solo{{< /metaitem >}}
  {{< metaitem term="Environment" >}}Capacity 9, holding cost 0.1, mean demand 4, discount 0.875{{< /metaitem >}}
{{< /meta >}}

## Fixed-ordering policies

First the simplest family: always order the same quantity. Their value functions are estimated by
Monte Carlo over 1,000 trajectories at horizon 100, then every fixed quantity is swept.

Ordering **three** comes out best, and the reason is readable from the parameters: mean demand is
four, so ordering three keeps the stock near the level demand will consume.

The useful part is knowing why this family cannot be optimal. A fixed rule ignores the current
stock. An optimal policy has to order more when stock is low and less when it is already high,
because ordering too little forfeits sales while ordering too much pays holding cost and
saturates a warehouse that caps at nine.

## Policy iteration

With the dynamics known, policy iteration converges to the exact optimum. The stopping criterion
comes from the policy improvement lemma: once the greedy policy equals the one just evaluated,
that value function satisfies the Bellman optimality equation. In practice, convergence is
detected when the policy stops changing between two successive iterations.

The optimal policy turns out to be a **threshold policy**: the action brings the stock up to a
target level, or as close to it as the capacity allows.

The optimal value function increases with stock up to a point, then flattens. It is **concave**,
because the marginal benefit of more stock falls as sales saturate while holding cost and the
risk of exceeding capacity keep rising.

## Q-learning

Asynchronous Q-learning, driven by a purely random behaviour policy, drops the model. What
matters then is the learning rate schedule, taken as a power of the visit count.

| Exponent | Behaviour |
|---|---|
| 0.5 | decays too slowly, unstable |
| **0.7** | compromise between speed and stability |
| 0.8 | decays too quickly, slow convergence |

The Robbins-Monro conditions, a divergent sum of step sizes with a convergent sum of squares,
hold for any exponent in the half-open interval above 0.5, so the choice inside that range is
about behaviour rather than validity.

The policy converges **before** Q does. Once Q is close enough to the optimum, its argmax already
matches the optimal action even though the values themselves have not settled.

## Policy gradient

REINFORCE on a softmax policy, with the gradient estimated from simulated trajectories.

The algorithm is stochastic, so convergence differs from run to run. Too high a learning rate
oscillates, too low a one crawls, decaying it too fast locks into a local optimum prematurely,
and decaying it too slowly leaves persistent instability.

## The document

{{< doc src="/uploads/rl-retail-store.html" label="Notebook, with derivations and plots" >}}
