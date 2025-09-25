---
title: "Multi-Agent Retrieval-Augmented Framework for Evidence-Based Counterspeech Against Health Misinformation"
collection: publications
category: conferences
permalink: /publication/2025-colm-multiagent-counterspeech
excerpt: 'A multi-agent LLM framework that generates evidence-based counterspeech grounded in dynamic and static retrieval sources, achieving significant improvements over RAG baselines.'
date: 2025-03-21
venue: 'Conference on Language Models (COLM 2025) – Accepted'
paperurl: 'https://arxiv.org/abs/2507.07307'
dataseturl: 'https://github.com/AnirbanSahaAnik/health-misinformation-reddit-dataset'
citation: 'Anirban Saha Anik, Xiaoying Song, Elliott Wang, Bryan Wang, Bengisu Yarimbas, Lingzi Hong. (2025). "Multi-Agent Retrieval-Augmented Framework for Evidence-Based Counterspeech Against Health Misinformation." <i>Conference on Language Models (COLM 2025)</i>.'
---

**Abstract**  
Large Language Models (LLMs) integrated with Retrieval-Augmented Generation (RAG) have shown strong potential in generating counterspeech against misinformation. However, existing approaches often rely on limited evidence and provide little control over the quality of generated responses.  

We introduce a **Multi-Agent Retrieval-Augmented Framework** for generating evidence-based counterspeech targeting health misinformation. The framework orchestrates multiple LLM agents for **evidence retrieval, summarization, generation, and refinement**, leveraging both static (curated guidelines) and dynamic (real-time web) sources. This design ensures counterspeech that is timely, accurate, and contextually appropriate.  

Our system outperforms single-agent and traditional RAG baselines across multiple metrics, including **Politeness (0.88)**, **Relevance (0.70)**, **Informativeness (0.78)**, and **Factual Accuracy (0.86)**. Human evaluations further validate that responses from our framework are consistently preferred over baseline outputs.  

**Keywords**: Large Language Models, Multi-Agent Systems, Retrieval-Augmented Generation, Health Misinformation, Counterspeech  

---

## Dataset

We release a curated **Reddit Health Misinformation Dataset** to support further research:  
👉 [Health Misinformation Reddit Dataset](https://github.com/AnirbanSahaAnik/health-misinformation-reddit-dataset)  

- **Topics Covered**: COVID-19, Influenza (Flu), HIV misinformation posts  
- **Annotation**: Classifier-assisted labeling + expert validation  
- **License**: Creative Commons Attribution 4.0 International (CC BY 4.0)  

This dataset serves as a benchmark for misinformation detection and counterspeech generation.  

---

## Contributions

Our main contributions are:  

1. **Multi-Agent Framework for Counterspeech Generation**  
   - Modular pipeline with specialized agents for retrieval, summarization, generation, and refinement.  
   - Achieves superior performance across metrics: **Politeness (0.88)**, **Relevance (0.70)**, **Informativeness (0.78)**, and **Factual Accuracy (0.86)**.  

2. **Integration of Static + Dynamic Knowledge Sources**  
   - Combines trusted medical guidelines with real-time web evidence for both authority and timeliness.  

3. **Ablation Studies & Prompting Comparisons**  
   - Demonstrates the role of each agent and compares prompting strategies (e.g., guided prompting vs. chain-of-thought).  

4. **Public Dataset Release**  
   - Introduces a high-quality dataset on health misinformation, publicly released to advance future research.  

---

## Method Overview

![Figure 1: Multi-Agent Counterspeech Framework](/images/Paper-2/marf_page-0001.jpg)  

**Figure 1**: Overview of the multi-agent counterspeech framework.  
- **Static Retrieval Agent**: Collects evidence from authoritative offline sources.  
- **Dynamic Retrieval Agent**: Fetches real-time web evidence.  
- **Summarization Agent**: Filters and ranks evidence for clarity and relevance.  
- **Generation Agent**: Produces counterspeech grounded in summarized evidence.  
- **Refinement Agent**: Improves clarity, politeness, and factuality.  

This modular design enhances transparency, adaptability, and reliability in dynamic misinformation scenarios.  

---

## Experimental Results

![Figure 2: Evaluation Results](/images/Paper-2/bar_chart_with_std_page-0001.jpg)  

**Figure 2**: Comparison of our framework with baseline systems across **Politeness, Relevance, Informativeness, and Factual Accuracy**.  
Our multi-agent approach consistently outperforms static RAG, dynamic RAG, and prompting-only methods. Error bars denote annotator standard deviation.  

---

## Resources
- 📄 **Paper**: [arXiv Link](https://arxiv.org/abs/2507.07307)  
- 📂 **Dataset**: [Health Misinformation Reddit Dataset](https://github.com/AnirbanSahaAnik/health-misinformation-reddit-dataset)  

---

## BibTeX

```bibtex
@inproceedings{anik2025multi,
  title={Multi-Agent Retrieval-Augmented Framework for Evidence-Based Counterspeech Against Health Misinformation},
  author={Anik, Anirban Saha and Song, Xiaoying and Wang, Elliott and Wang, Bryan and Yarimbas, Bengisu and Hong, Lingzi},
  booktitle={Proceedings of the Conference on Language Models (COLM 2025)},
  year={2025}
}
```
