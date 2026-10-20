/* Search, citations and full-size figures for the static publication archive.
   Without JavaScript every paper, figure and citation link remains available. */
(function () {
  'use strict';
  function ready() {
    const root = document.querySelector('main.pub-editorial');
    if (!root || root.dataset.archiveReady) return;
    const catalog = new Map((window.PUBLICATION_CATALOG || []).map(paper => [paper.slug, paper]));
    const articles = Array.from(root.querySelectorAll('.publication'));
    const groups = Array.from(root.querySelectorAll('.publication-year'));
    const controls = root.querySelector('.pub-controls');
    const search = root.querySelector('.pub-search');
    const filters = Array.from(root.querySelectorAll('[data-year-filter]'));
    const status = root.querySelector('.pub-results-status');
    const empty = root.querySelector('.pub-empty');
    const normalize = text => String(text || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
    let selected = 'all';
    articles.forEach(article => {
      const paper = catalog.get(article.dataset.slug);
      article.dataset.search = normalize([article.textContent, paper?.summary, paper?.evidence].join(' '));
    });
    function filter() {
      const words = normalize(search.value).split(' ').filter(Boolean);
      let count = 0;
      articles.forEach(article => {
        const year = article.dataset.year;
        const yearMatch = selected === 'all' || (selected === 'earlier' ? Number(year) < 2025 : year === selected);
        article.hidden = !(yearMatch && words.every(word => article.dataset.search.includes(word)));
        if (!article.hidden) count++;
      });
      groups.forEach(group => { group.hidden = !group.querySelector('.publication:not([hidden])'); });
      filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.yearFilter === selected)));
      status.textContent = selected === 'all' && !words.length ? `${count} publications` : `${count} of ${articles.length} publications`;
      empty.hidden = count !== 0;
    }
    filters.forEach(button => button.addEventListener('click', () => { selected = button.dataset.yearFilter; filter(); }));
    search.addEventListener('input', filter);
    root.querySelector('.pub-reset').addEventListener('click', () => { selected = 'all'; search.value = ''; filter(); search.focus(); });
    controls.hidden = false;
    root.dataset.archiveReady = 'true';

    // Native dialogs provide focus containment, Escape dismissal and focus return.
    if (!window.HTMLDialogElement || !HTMLDialogElement.prototype.showModal) return;
    function el(name, className, text) {
      const node = document.createElement(name);
      if (className) node.className = className;
      if (text !== undefined) node.textContent = text;
      return node;
    }
    function dialog(id, heading, extraClass) {
      const node = el('dialog', 'pub-modal ' + (extraClass || ''));
      node.setAttribute('aria-labelledby', id);
      const inner = el('div', 'pub-modal-inner');
      const top = el('div', 'pub-modal-top');
      const title = el('h2', '', heading); title.id = id;
      const close = el('button', 'pub-modal-close', 'Close ×');
      close.type = 'button'; close.autofocus = true;
      close.addEventListener('click', () => node.close());
      top.append(title, close); inner.append(top); node.append(inner); document.body.append(node);
      node.addEventListener('click', event => {
        const rect = node.getBoundingClientRect();
        if (event.target === node && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) node.close();
      });
      node.addEventListener('close', () => {
        if (!document.querySelector('.pub-modal[open]')) document.body.classList.remove('pub-modal-open');
      });
      return { node, inner };
    }
    function open(node) { node.showModal(); document.body.classList.add('pub-modal-open'); }
    async function copy(text) {
      if (navigator.clipboard && window.isSecureContext) {
        try { await navigator.clipboard.writeText(text); return true; } catch (_) { /* Use selection fallback. */ }
      }
      const field = el('textarea'); field.value = text;
      field.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
      // Keep the fallback inside the active modal, since the rest of the page is inert.
      const parent = document.querySelector('.pub-modal[open] .pub-modal-inner') || document.body;
      parent.append(field); field.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (_) { ok = false; }
      field.remove(); return ok;
    }
    const cite = dialog('pub-citation-heading', 'Cite this paper');
    const citeTitle = el('h3', 'pub-modal-title');
    const citation = el('p', 'pub-modal-citation');
    const bib = el('pre', 'pub-modal-bib'); const code = el('code'); bib.append(code);
    const note = el('p', 'pub-modal-note');
    const actions = el('div', 'pub-modal-actions');
    const copyBib = el('button', '', 'Copy BibTeX'); copyBib.type = 'button';
    const copyCitation = el('button', '', 'Copy citation'); copyCitation.type = 'button';
    const record = el('a', '', 'Publication record ↗'); record.target = '_blank'; record.rel = 'noopener noreferrer';
    actions.append(copyBib, copyCitation, record);
    const feedback = el('p', 'pub-modal-status'); feedback.setAttribute('role', 'status'); feedback.setAttribute('aria-live', 'polite');
    cite.inner.append(citeTitle, citation, bib, note, actions, feedback);
    let currentPaper;
    async function copyValue(value, label, button) {
      const ok = await copy(value);
      feedback.textContent = ok ? `${label} copied.` : 'Copy was unavailable. Select and copy the text above.';
      button.focus();
    }
    copyBib.addEventListener('click', () => copyValue(currentPaper.sourceBib, 'BibTeX', copyBib));
    copyCitation.addEventListener('click', () => copyValue(currentPaper.citation, 'Citation', copyCitation));
    root.querySelectorAll('[data-cite]').forEach(link => link.addEventListener('click', event => {
      const paper = catalog.get(link.dataset.cite); if (!paper) return;
      event.preventDefault(); currentPaper = paper;
      citeTitle.textContent = paper.title; citation.textContent = paper.citation; code.textContent = paper.sourceBib;
      note.textContent = paper.bibStatus === 'publisher' ? 'BibTeX from ACL Anthology.' : 'Formatted from publication metadata. Check the publication record before formal use.';
      record.href = paper.sourceUrl || paper.paperUrl; feedback.textContent = ''; open(cite.node);
    }));
    const figure = dialog('pub-figure-heading', 'Paper figure', 'pub-figure-modal');
    const figureImage = el('img', 'pub-figure-image');
    const caption = el('p', 'pub-figure-caption');
    figure.inner.append(figureImage, caption);
    root.querySelectorAll('[data-figure]').forEach(link => link.addEventListener('click', event => {
      const paper = catalog.get(link.dataset.figure); if (!paper) return;
      event.preventDefault(); figureImage.src = paper.thumbnail; figureImage.alt = paper.imageAlt;
      const description = paper.figureKind === 'preview' ? `Title and abstract preview. ${paper.title}. ` : `${paper.figureCaption} `;
      const source = el('a', '', paper.figureKind === 'summary' ? 'Read the source paper ↗' : 'View in the original paper ↗');
      source.href = paper.figureSource || paper.paperUrl; source.target = '_blank'; source.rel = 'noopener noreferrer';
      caption.replaceChildren(document.createTextNode(description), source); open(figure.node);
    }));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, { once: true });
  else ready();
})();
