---
title: "A Dynamic Fusion Model for Consistent Crisis Response"
collection: publications
category: conferences
permalink: /publication/2025-emnlp-fusion
excerpt: 'We introduce a dynamic fusion framework that integrates multiple LLMs to generate consistent, high-quality crisis responses across professionalism, actionability, and relevance dimensions.'
date: 2025-12-01
venue: 'The 2025 Conference on Empirical Methods in Natural Language Processing (EMNLP 2025)'
paperurl: 'https://arxiv.org/abs/2509.01053'
slidesurl: '/files/MC-2_Anik.pdf'
citation: 'Song, X., Saha Anik, A., Blanco, E., Frías-Martínez, V., & Hong, L. (2025). "A Dynamic Fusion Model for Consistent Crisis Response." <i>The 2025 Conference on Empirical Methods in Natural Language Processing (EMNLP 2025)</i>. arXiv:2509.01053.'
---

## Overview
This paper presents a **dynamic fusion framework** that integrates multiple **Large Language Models (LLMs)** to generate **consistent and high-quality crisis responses**.  
Our approach addresses a critical gap in **crisis communication**: ensuring that AI-generated responses maintain uniform **professionalism**, **actionability**, and **relevance** across diverse crisis needs and user queries.

We introduce:
- A **new evaluation metric — Consistency**, to measure stylistic stability.
- A **fusion-based response generation pipeline** that combines outputs from Instructional Prompts and Retrieval-Augmented Generation (RAG).
- Empirical validation across multiple LLMs (**LLaMA 3.1 8B** and **Mistral 8B**) and crisis datasets.

---

## Motivation
During disasters, affected individuals often rely on social media for **real-time guidance** and **verified information**.  
While LLMs can generate informative responses, they often vary in style and tone:
- Some are **professional and actionable**, others **vague or inconsistent**.
- Inconsistent responses **erode trust** and **reduce usability** in high-stakes scenarios.

Our goal:  
➡️ **Guarantee stylistic consistency** across all responses, so every user receives the same quality of help — regardless of their query or crisis type.

---

## Methodology
We propose a **two-stage fusion framework**:
1. **Candidate Generation:**  
   - **Instructional Prompting**: Zero-shot structured prompts for general reasoning.  
   - **Retrieval-Augmented Generation (RAG)**: Injects verified knowledge from **FEMA**’s official documents (e.g., Individual Assistance Guide).
2. **Fusion Mechanism:**  
   - Evaluates candidate responses across three dimensions: **Professionalism**, **Actionability**, **Relevance**.  
   - Synthesizes a final response using **weighted evaluation guidance**, ensuring balanced optimization.

We test several fusion variants:
- Fusion w/o Eval  
- Fusion w/ Eval  
- Fusion w/ Eval & Instruct  
- **Fusion w/ Eval & Weight Instruct (Best-performing)**

---

## Consistency Metric
We define **Consistency** as the inverse of variance across the three communicative dimensions:

\[
\text{Consistency Score} = 1 - \frac{1}{3}(Var_{prof} + Var_{act} + Var_{rel})
\]

Higher score → more uniform style and quality.

---

## Experiments
**Dataset:**  
- 540 need-related tweets from hurricanes Harvey, Irma, and Maria.  
- Additional experiments on **CrisisBench** (earthquakes, typhoons).

**Models:**  
- LLaMA 3.1 8B-Instruct  
- Mistral 8B-Instruct  
- GPT-4o-mini (for evaluation)

**Evaluation Metrics:**  
- Professionalism  
- Actionability  
- Relevance  
- Consistency  
- Human Preference (qualitative study)

---

## Results
| Model | Method | Professionalism | Actionability | Relevance | Consistency |
|--------|---------|------------------|----------------|-------------|--------------|
| **LLaMA** | Instructional Prompt | 0.74 | 0.52 | 0.80 | 0.76 |
| **LLaMA** | RAG | 0.96 | 0.63 | 0.80 | 0.84 |
| **LLaMA** | **Fusion w/ Eval & Weight Instruct** | **0.99** | **0.99** | **0.79** | **0.94** |

✅ **Fusion outperforms all baselines**, delivering the **most consistent and highest-quality** responses.  
✅ **Cross-crisis generalization** (earthquake, typhoon): maintains >0.95 overall quality.  
✅ **Human evaluations** show **86% preference** for fused responses.

---

## Key Findings
- Mid-range **temperature (0.6)** yields optimal consistency.
- Fusion with **evaluation guidance** essential for stable outputs.
- **Few-shot learning** helps but fusion is **more scalable and generalizable**.
- **Sentiment and linguistic style** affect consistency (neutral and formal queries yield higher stability).

---

## Impact
- **Improves trust** in AI-assisted crisis communication.
- Provides **uniform-quality responses** across diverse users.
- Applicable to **emergency management agencies** and **NGO communication platforms**.
- Framework can extend to **health misinformation**, **public safety**, and **customer support**.

---
## Resources
- 📄 **Paper**: [arXiv:2509.01053v3](https://arxiv.org/abs/2509.01053v3)  

---

## BibTeX

```bibtex
@article{song2025dynamic,
  title={A Dynamic Fusion Model for Consistent Crisis Response},
  author={Song, Xiaoying and Anik, Anirban Saha and Blanco, Eduardo and Frias-Martinez, Vanessa and Hong, Lingzi},
  journal={arXiv preprint arXiv:2509.01053},
  year={2025}
}

```
