"""Rebuild the static publication list from assets/publications-catalog.js.

Run with Python 3. No build dependencies; paper pages share the same catalog.
Original paper diagrams and document previews are tracked under images/publications.
"""
from pathlib import Path
from html import escape
import json
import re

ROOT = Path(__file__).resolve().parents[1]
source = (ROOT / 'assets/publications-catalog.js').read_text()
papers = json.loads(source.split('window.PUBLICATION_CATALOG = ', 1)[1].rstrip().removesuffix(';'))
path = ROOT / 'publications/index.html'
original = path.read_text()
e = lambda value: escape(str(value), quote=True)


def authors(value):
    return e(value.replace('Anirban Saha Anik ,', 'Anirban Saha Anik,')).replace(
        'Anirban Saha Anik', '<strong>Anirban Saha Anik</strong>')


def card(p, index):
    slug = e(p['slug'])
    title_id = 'title-' + slug
    award = {
        'multi-agent-rag-health-misinformation': ('Runner-up', 'Runner-Up, SIG-SM Social Media Research Competition 2025'),
        'literacy-controlled-counterspeech': ('Finalist', 'Finalist, SIG-SM Social Media Research Competition 2025'),
        'verifind-clef-2026': ('2nd place', '2nd Place, CheckThat! Lab 2026 Task 2'),
    }.get(p['slug'])
    badge = f'<span class="pub-award" title="{e(award[1])}">{e(award[0])}</span>' if award else ''
    visual = ''
    if p.get('thumbnail'):
        kind = p.get('figureKind', 'diagram')
        label = {'diagram': 'Method diagram', 'chart': 'Paper figure', 'preview': 'Paper preview'}[kind]
        visual = f'''<a class="pub-visual pub-visual-{kind}" href="{e(p['thumbnail'])}" data-figure="{slug}" aria-label="Enlarge {e(label.lower())}: {e(p['title'])}">
<img src="{e(p['thumbnail'])}" alt="{e(p.get('imageAlt', p['title']))}" width="{p['thumbnailWidth']}" height="{p['thumbnailHeight']}" loading="{'eager' if index < 2 else 'lazy'}" decoding="async"/>
<span class="pub-visual-label">{label}<span aria-hidden="true">⤢</span></span></a>'''
    classes = 'publication' + ('' if visual else ' pub-text-only')
    # Abstracts, posters, datasets and longer summaries live on the paper page.
    return f'''<article class="{classes}" id="pub-{slug}" data-slug="{slug}" data-year="{p['year']}" aria-labelledby="{title_id}">
{visual}<div class="pub-content"><div class="pub-meta"><span>{e(p['venue'])}</span>{badge}</div>
<h3 id="{title_id}"><a href="{e(p['detailUrl'])}">{e(p['title'])}</a></h3>
<p class="authors">{authors(p['authors'])}</p>
<div class="pub-actions" aria-label="Resources for {e(p['title'])}"><a class="pub-action pub-action-paper" href="{e(p['paperUrl'])}" target="_blank" rel="noopener noreferrer">Paper <span aria-hidden="true">↗</span></a><a class="pub-action" href="{e(p['detailUrl'])}">Paper details <span aria-hidden="true">→</span></a><a class="pub-action" href="{e(p['detailUrl'])}#paper-cite" data-cite="{slug}">Cite</a></div>
</div></article>'''


years = sorted({p['year'] for p in papers}, reverse=True)
groups = []
for year in years:
    rows = [card(p, i) for i, p in enumerate(papers) if p['year'] == year]
    groups.append(f'<section class="publication-year" aria-labelledby="year-{year}"><h2 id="year-{year}">{year}</h2><div class="publication-stack">' + '\n'.join(rows) + '</div></section>')

filters = [('all', 'All papers', len(papers)), ('2026', '2026', sum(p['year'] == 2026 for p in papers)), ('2025', '2025', sum(p['year'] == 2025 for p in papers)), ('earlier', 'Earlier', sum(p['year'] < 2025 for p in papers))]
buttons = ''.join(f'<button type="button" class="pub-filter-button" data-year-filter="{key}" aria-pressed="{str(key == "all").lower()}">{label}<span>{count}</span></button>' for key, label, count in filters)
main = f'''<main id="main-content" class="site-container page-shell pub-editorial">
<header class="pub-heading"><div><p class="eyebrow">Research archive</p><h1>Publications<span class="pub-heading-dot">.</span></h1><p class="page-description">Language models, evidence, and human-centered AI.</p></div><a class="pub-scholar" href="https://scholar.google.com/citations?user=yhtMiNoAAAAJ&amp;hl=en" target="_blank" rel="noopener noreferrer">Google Scholar <span aria-hidden="true">↗</span></a></header>
<div class="pub-controls" hidden><div class="pub-filter-list" role="group" aria-label="Filter publications by year">{buttons}</div><label class="pub-search-wrap"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/></svg><span class="sr-only">Search by title, author, topic, or venue</span><input type="search" class="pub-search" placeholder="Search publications" autocomplete="off"/></label></div>
<div class="pub-list-label"><span>By year · newest first</span><span class="pub-results-status" role="status" aria-live="polite" aria-atomic="true">{len(papers)} publications</span></div>
<div class="publication-groups">{''.join(groups)}</div>
<div class="pub-empty" hidden><h2>No matching publications</h2><p>Try a different keyword or year.</p><button type="button" class="pub-reset">Clear filters</button></div>
</main>'''
html = re.sub(r'<main\b.*?</main>', lambda _: main, original, count=1, flags=re.S)
html = re.sub(r'<script[^>]*src="/assets/publications-sources\.js"[^>]*></script>', '', html)
html = re.sub(r'<meta name="codex-preview"[^>]*>', '', html)
for asset in ('publications-editorial.css', 'publications-editorial.js', 'publications-catalog.js'):
    html = re.sub(r'/assets/' + re.escape(asset) + r'(?:\?v=[^"\s]+)?',
                  '/assets/' + asset + '?v=20261020', html)
html = re.sub(r'<link rel="canonical"[^>]*>', '<link rel="canonical" href="https://anirbansahaanik.github.io/publications/"/>', html)
html = html.replace('href="/publications">Publications', 'href="/publications/" aria-current="page">Publications')
path.write_text(html)
print(f'Built {len(papers)} publications in {len(years)} year groups.')
