---
title: "Speaking at the Right Level: Literacy-Controlled Counterspeech Generation with RAG-RL"
collection: publications
category: conferences
permalink: /publication/2025-emnlp-literacy-counterspeech
excerpt: 'We propose a Controlled-Literacy framework that integrates Retrieval-Augmented Generation (RAG) and Reinforcement Learning (RL) to generate counterspeech tailored to different health literacy levels.'
date: 2025-09-22
venue: 'Empirical Methods in Natural Language Processing (EMNLP 2025 Findings) – Accepted'
paperurl: 'https://arxiv.org/abs/2509.01058v3'
citation: 'Xiaoying Song, Anirban Saha Anik, Dibakar Barua, Pengcheng Luo, Junhua Ding, Lingzi Hong. (2025). "Speaking at the Right Level: Literacy-Controlled Counterspeech Generation with RAG-RL." <i>Findings of the Association for Computational Linguistics: EMNLP 2025</i>.'
---

**Abstract**  
Health misinformation poses a critical risk to public well-being. Existing counterspeech approaches often generate uniform responses that fail to account for the audience’s health literacy level, limiting accessibility and effectiveness.  

We propose **Controlled-Literacy**, a framework that combines **Retrieval-Augmented Generation (RAG)** with **Reinforcement Learning (RL)** to adapt counterspeech to different health literacy levels (low, medium, high). The framework retrieves evidence aligned with the target literacy level and optimizes generation using a hybrid reward function incorporating both **readability (Flesch-Kincaid Reading Ease)** and **user preference ratings**.  

Experiments demonstrate that Controlled-Literacy outperforms baselines in **Politeness**, **Readability Alignment (Target Distance)**, **User Preference**, and **Factual Accuracy**, producing counterspeech that is accessible, respectful, and factually grounded. Cross-evaluation further shows that user preference peaks when counterspeech is tailored to the correct literacy level.  

**Keywords**: Health Literacy, Counterspeech, Retrieval-Augmented Generation, Reinforcement Learning, Trustworthy AI  

---

## Contributions

1. **Health Literacy-Aware Counterspeech Framework**  
   - Introduces Controlled-Literacy, integrating RAG + RL to tailor responses to users’ health literacy.  

2. **Hybrid Reward Design**  
   - Combines readability-based scoring with simulated user preference ratings for effective optimization.  

3. **Dataset Creation – MisinfoLiteracy**  
   - A curated dataset of 440 Reddit posts with health misinformation, annotated and paired with counterspeech at different literacy levels.  

4. **Empirical Validation**  
   - Achieves significant gains across politeness, factual accuracy, and target readability alignment compared to RAG and prompting-only baselines.  

---

## Method Overview

![Figure: Controlled-Literacy Framework](/images/Paper-3/literacy_framework.jpg)  

**Figure**: The Controlled-Literacy framework pipeline.  

- **Evidence Retrieval Module** filters documents based on readability (FKRE) and user preference scores.  
- **Counterspeech Generator** produces responses optimized with Group Relative Policy Optimization (GRPO).  
- **Reward Function** balances readability alignment with subjective accessibility.  

---

## Experimental Results

Controlled-Literacy demonstrates superior performance:  

- **Politeness**: 0.84 (LLaMA-8B) vs. 0.41 in prompt-only baseline  
- **Target Distance (↓)**: 0.90 vs. 2.74 baseline (closer to intended readability)  
- **User Preference**: 0.74 vs. 0.71 (RAG baseline)  
- **Factual Accuracy**: 0.91 vs. 0.87 (prompt-only baseline):contentReference[oaicite:1]{index=1}  

Cross-evaluation confirms that audiences rate responses highest when counterspeech matches their literacy level, reinforcing the need for tailored generation.  

---

## Resources

- 📄 **Paper**: [arXiv:2509.01058v3](https://arxiv.org/abs/2509.01058v3)  

---

## BibTeX

```bibtex
@inproceedings{song2025literacy,
  title={Speaking at the Right Level: Literacy-Controlled Counterspeech Generation with RAG-RL},
  author={Song, Xiaoying and Anik, Anirban Saha and Barua, Dibakar and Luo, Pengcheng and Ding, Junhua and Hong, Lingzi},
  booktitle={Findings of the Association for Computational Linguistics: EMNLP 2025},
  year={2025}
}
```
