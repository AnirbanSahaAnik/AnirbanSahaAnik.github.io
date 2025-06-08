# Anirban Saha Anik — Academic Portfolio Website

This is the source code for my personal academic website:  
👉 https://anirbansahaanik.github.io

The website is built using AcademicPages (https://github.com/academicpages/academicpages.github.io), a flexible GitHub Pages template powered by Jekyll and designed for researchers, students, and academics.

---

## 👨‍💻 About Me

I’m a Graduate Researcher at the University of North Texas pursuing an MS in Data Science. My research interests include:

- Large Language Models (LLaMA, GPT, Mistral)
- Retrieval-Augmented Generation (RAG)
- Crisis Informatics and Health Misinformation
- Fact-Checking and Counterspeech Generation

I’ve published papers at ISCRAM, ICCIT, NCIM, and ICMI, and actively participate in shared tasks like CLEF CheckThat!

---

## 🧭 Website Features

This academic portfolio includes:

- 📰 Publications – Conference and journal papers
- 📄 CV – Curriculum Vitae in Markdown and downloadable PDF
- 📫 Contact – Email and social links in the sidebar

---

## ⚙️ Local Development

You can preview and run the site locally using Jekyll:

### Requirements
- Ruby, Bundler, Node.js

### Commands
```bash
# Install dependencies
bundle install

# Serve locally
bundle exec jekyll serve
```

Visit http://localhost:4000 in your browser to see the local site.

If needed:
```bash
sudo apt install build-essential ruby-dev bundler nodejs
```

---

## 🐳 Docker (Optional)

If you prefer to use Docker:
```bash
docker compose up
```

Then visit: http://localhost:4000

---

## 🧱 Site Structure

| Folder               | Purpose                                    |
|----------------------|--------------------------------------------|
| _publications/       | Markdown files for each publication        |
| _pages/              | Main pages like cv.md, index.md            |
| _data/navigation.yml | Controls top navigation links              |
| files/               | PDFs (e.g., downloadable CV)               |
| _config.yml          | Global site configuration                  |

---

## 📜 License

This site is open source, based on the MIT-licensed AcademicPages Jekyll Theme (https://github.com/academicpages/academicpages.github.io).

Originally derived from Minimal Mistakes (https://mmistakes.github.io/minimal-mistakes/).

Maintained by: Anirban Saha Anik (https://github.com/anirbansahaanik)

---

<div align="center">

[![GitHub license](https://img.shields.io/github/license/academicpages/academicpages.github.io?color=blue)](https://github.com/academicpages/academicpages.github.io/blob/master/LICENSE)

</div>