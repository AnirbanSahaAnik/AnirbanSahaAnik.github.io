---
title: "Multi-Agent Retrieval-Augmented Framework for Evidence-Based Counterspeech Against Health Misinformation"
collection: publications
category: conferences
permalink: /publication/2025-colm-multiagent-counterspeech
excerpt: 'We present a multi-agent LLM framework for generating evidence-based counterspeech grounded in dynamic and static retrieval sources.'
date: 2025-03-21
venue: 'Conference on Language Models (COLM 2025) – Accepted'
paperurl: 'https://arxiv.org/abs/2507.07307'
dataseturl: 'https://github.com/AnirbanSahaAnik/health-misinformation-reddit-dataset'
citation: 'Anirban Saha Anik, Xiaoying Song, Elliott Wang, Bryan Wang, Bengisu Yarimbas, Lingzi Hong. (2025). "Multi-Agent Retrieval-Augmented Framework for Evidence-Based Counterspeech Against Health Misinformation." <i>Conference on Language Models (COLM 2025)</i>.'
---

**Abstract**  
Large language models (LLMs) integrated with Retrieval-Augmented Generation (RAG) have shown strong potential in generating counterspeech against misinformation. However, existing methods often rely on limited evidence and offer minimal control over generated responses.

To overcome these limitations, we propose a **Multi-Agent Retrieval-Augmented Framework** for generating evidence-based counterspeech targeting health misinformation. This framework coordinates multiple LLM agents responsible for evidence retrieval, summarization, generation, and refinement. By integrating both static and dynamic sources, the framework ensures that responses are timely, well-supported, and contextually appropriate.

Our approach significantly outperforms single-agent and traditional RAG baselines across multiple metrics, including **Politeness (0.88)**, **Relevance (0.70)**, **Informativeness (0.78)**, and **Factual Accuracy (0.86)**. Human evaluations further validate the quality and credibility of the responses, showing consistent preference for outputs from our multi-agent system.

**Keywords**: Large Language Models, Multi-Agent Systems, Retrieval-Augmented Generation, Health Misinformation, Counterspeech

---

### Dataset

We release a **curated Reddit health misinformation dataset** as part of this work:  
**[Health Misinformation Reddit Dataset](https://github.com/AnirbanSahaAnik/health-misinformation-reddit-dataset)**  

- **Topics Covered**: COVID-19, Influenza (Flu), and HIV misinformation posts  
- **Annotation**: Classifier-assisted labeling and expert validation  
- **License**: Creative Commons Attribution 4.0 International (CC BY 4.0)

This dataset provides a benchmark resource for studying health misinformation and developing counterspeech strategies.

---

### Contributions

Our key contributions are as follows:
1. **Multi-Agent Retrieval-Augmented Framework Specialized for Counterspeech Generation Against Health Misinformation**  
   A modular multi-agent pipeline integrating static and dynamic evidence retrieval, summarization, counterspeech generation, and iterative refinement.  
   → Achieves strong performance across evaluation metrics: **Politeness (0.88)**, **Relevance (0.70)**, **Informativeness (0.78)**, and **Factual Accuracy (0.86)**, with higher human preference ratings compared to baselines.

2. **Integration of Static and Dynamic Knowledge Sources**  
   Combining curated medical guidelines with real-time web evidence ensures authoritative and contextually up-to-date responses, improving factual grounding.

3. **Ablation Studies and Prompting Strategy Comparison**  
   Extensive ablation studies and prompting strategy experiments (e.g., Guided Prompting vs. Chain-of-Thought) demonstrate the critical role of each agent and the robustness of our architecture.

4. **Curated Dataset on Diverse Health Misinformation Topics**  
   We introduce a high-quality Reddit health misinformation dataset covering COVID-19, influenza, and HIV, publicly released for future research.

---

### Method Overview

![Figure 1: Multi-Agent Counterspeech Framework](\images\Paper-2\marf_page-0001.jpg)

**Figure 1**: Overview of our proposed multi-agent counterspeech framework.  
- **Static Retrieval Agent** collects background evidence from trusted offline sources.  
- **Dynamic Retrieval Agent** fetches real-time web content using DuckDuckGo search.  
- **Summarization Agent** ranks and filters combined evidence for clarity and relevance.  
- **Counterspeech Generation Agent** produces a response grounded in summarized evidence.  
- **Refinement Agent** polishes the response to enhance clarity, politeness, and factual accuracy.  

This modular design promotes transparency, adaptability, and reliability, ensuring counterspeech remains respectful and evidence-based in dynamic misinformation scenarios.

---

### Experimental Results

![Figure 2: Evaluation Results](\images\Paper-2\bar_chart_with_std_page-0001.jpg)

**Figure 2**: Performance comparison across four evaluation metrics: **Politeness**, **Relevance**, **Informativeness**, and **Factual Accuracy**.  
Our multi-agent framework consistently outperforms static RAG, dynamic RAG, and prompting-only baselines, with error bars showing annotator standard deviation.

---

### Full Paper and Code

- **Paper**: [https://arxiv.org/abs/2507.07307](https://arxiv.org/abs/2507.07307)  
- **Dataset**: [https://github.com/AnirbanSahaAnik/health-misinformation-reddit-dataset](https://github.com/AnirbanSahaAnik/health-misinformation-reddit-dataset)

---

### BibTeX

```bibtex
@article{anik2025multi,
  title={Multi-Agent Retrieval-Augmented Framework for Evidence-Based Counterspeech Against Health Misinformation},
  author={Anik, Anirban Saha and Song, Xiaoying and Wang, Elliott and Wang, Bryan and Yarimbas, Bengisu and Hong, Lingzi},
  journal={arXiv preprint arXiv:2507.07307},
  year={2025}
}
```