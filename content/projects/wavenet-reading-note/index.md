---
title: "WaveNet: A Generative Model for Raw Audio"
order: 3
summary: "A reading note on van den Oord et al., covering the causal dilated convolutions, the gated units and the conditioning, then the strengths and limits of the design."
tags:
  - Generative Models
  - Paper Reading
tech_stack:
  - Autoregressive models
  - Dilated convolutions
  - Gated activations
links:
  - type: file
    url: report.pdf
    label: Reading note
featured: true
status: "Reading note"
role: "Solo"
duration: "4AI04, Télécom Paris"
highlights:
  - "Dilations 1 to 512 give a receptive field of about 1,024 samples per block"
  - "8-bit mu-law companding keeps the softmax at 256 classes instead of 65,536"
  - "Training parallelises under teacher forcing, generation cannot"
---

{{< kicker >}}Reading note · 4AI04, Télécom Paris{{< /kicker >}}

{{< lede >}}
WaveNet models raw audio directly, at 16,000 samples per second or more. I chose the paper to see
at a fundamental level, one individual sample at a time, how a network can model complex temporal
signals and what that costs.
{{< /lede >}}

{{< stats >}}
  {{< stat value="1,024" unit="samples" label="receptive field per block, from dilations 1 to 512" >}}
  {{< stat value="256" unit="classes" label="after 8-bit mu-law companding, against 65,536 for 16-bit" >}}
  {{< stat value=">4.0" label="MOS score, over 50% closer to human speech than prior methods" >}}
{{< /stats >}}

{{< meta >}}
  {{< metaitem term="Course" >}}4AI04, Télécom Paris{{< /metaitem >}}
  {{< metaitem term="Teachers" >}}Roland Badeau and Geoffroy Peeters{{< /metaitem >}}
  {{< metaitem term="Paper" >}}van den Oord et al., Google DeepMind{{< /metaitem >}}
{{< /meta >}}

## The architecture

WaveNet factorises the joint distribution of a waveform into an autoregressive product of
conditionals, so each sample is generated from all previous ones. Causal convolutions prevent
future leakage during training, by shifting filters or masking.

**Dilated convolutions** widen the window without adding parameters. Doubling the dilation at
each layer grows the receptive field exponentially with depth: a stack of 1, 2, 4 up to 512
covers about 1,024 samples per block, and stacking blocks reaches a few hundred milliseconds.

**Gated activation units**, borrowed from PixelCNN, run two parallel filters per layer, one
through a tanh and one through a sigmoid, multiplied element-wise. The sigmoid gates the tanh.

**Residual and skip connections** stabilise a deep stack and carry each layer's contribution
intact to the final softmax.

**Mu-law companding** quantises the output to 8 bits, keeping the softmax at 256 classes rather
than 65,536, with the non-linear compression preserving fidelity. Generation samples from that
distribution rather than taking the mode, which gives varied intonation.

## Conditioning

Global conditioning uses one vector for the whole waveform, such as speaker identity, injected as
a bias at every layer. Local conditioning upsamples a feature time-series to the audio rate and
injects it through learned convolutions, which is what turns WaveNet into a neural vocoder.

## Critical assessment

**Strengths.** A record MOS above 4.0, closing more than half the gap to human speech. End to end
on the raw waveform, so no vocoder artefacts. Flexible across speech, music and discriminative
tasks. An explicit computable log-likelihood, which makes hyperparameter tuning rigorous.

**Limitations.** Training parallelises under teacher forcing but generation is strictly
sequential, which limits real-time use. Long-term memory stays weak, so coherence over a full
song or a long sentence is not maintained. Quality depends heavily on receptive field size, which
is expensive to grow. And prosody needs explicit conditioning such as F0, not just more context.

## The document

{{< doc src="report.pdf" label="Full reading note" >}}
