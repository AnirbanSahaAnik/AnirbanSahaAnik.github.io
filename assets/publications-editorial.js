/* Progressive enhancement for the existing GitHub Pages publications page.
   Source publication metadata remains in the page's original HTML. */
(function () {
  "use strict";

  function make(tag, className, text) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined && text !== null) el.textContent = text;
    return el;
  }

  function clean(text) {
    return (text || "").replace(/\s+/g, " ").trim();
  }

  function paperTitle(article) {
    var h3 = article.querySelector("h3");
    return clean(h3 ? h3.textContent : "").replace(/\s*[↗→]\s*$/, "");
  }

  function isExternal(href) {
    return /^https?:\/\//i.test(href || "");
  }

  function makeLink(label, href, primary) {
    var a = make("a", "pub-action" + (primary ? " pub-action-primary" : ""), label);
    a.href = href;
    if (isExternal(href)) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    return a;
  }

  function copyText(value, button, original) {
    function feedback(ok) {
      button.textContent = ok ? "Copied ✓" : "Select to copy";
      window.setTimeout(function () {
        button.textContent = original;
      }, 1700);
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(value).then(function () {
        feedback(true);
      }, function () {
        fallback();
      });
      return;
    }
    fallback();

    function fallback() {
      var textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      var copied = false;
      try {
        copied = document.execCommand("copy");
      } catch (_error) {
        copied = false;
      }
      textarea.remove();
      feedback(copied);
    }
  }

  function main() {
    var root = document.querySelector("main.page-shell");
    if (!root || !root.querySelector(".publication-groups") || root.dataset.pubEditorialReady) {
      return;
    }
    var groups = Array.prototype.slice.call(root.querySelectorAll(".publication-year"));
    var articles = Array.prototype.slice.call(root.querySelectorAll(".publication-year .publication"));
    if (!articles.length) return;

    var featuredOverview = "This work proposes a multi-agent retrieval-augmented framework for responding to health misinformation. Specialized language-model agents coordinate evidence gathering, evidence enhancement, response generation, and refinement. The framework combines established knowledge sources with dynamically retrieved evidence and evaluates the quality of its counterspeech across factual accuracy, relevance, and human preference.";

    articles.forEach(function (article, index) {
      var group = article.closest(".publication-year");
      var year = clean(group && group.querySelector("h2") ? group.querySelector("h2").textContent : "");
      var title = paperTitle(article);
      var titleLink = article.querySelector("h3 a");
      var titleHref = titleLink ? titleLink.getAttribute("href") : "";
      var direct = article.querySelector(".pub-direct-link a");
      var directHref = direct ? direct.getAttribute("href") : "";
      var authorsElement = article.querySelector(".authors");
      var authors = clean(authorsElement ? authorsElement.textContent : "");
      var metaFirst = article.querySelector(".pub-meta > span:first-child");
      var venue = clean(metaFirst ? metaFirst.textContent : "");
      var paperHref = directHref || (isExternal(titleHref) ? titleHref : "");
      var projectHref = titleHref && !isExternal(titleHref) ? titleHref : "";
      var identifier = "pub-" + year + "-" + index;

      article.id = identifier;
      article.dataset.year = year;
      article.dataset.search = clean([title, authors, venue, year, article.querySelector(".pub-summary") ? article.querySelector(".pub-summary").textContent : ""].join(" ")).toLowerCase();

      var featured = title.indexOf("Multi-Agent Retrieval-Augmented Framework for Evidence-Based Counterspeech") !== -1;
      if (featured) {
        article.classList.add("pub-featured");
        var label = make("div", "pub-featured-label", "Featured research");
        label.appendChild(make("span", "", "First author"));
        article.insertBefore(label, article.firstChild);
        article.appendChild(make("p", "pub-featured-callout", "A multi-agent approach to more reliable, evidence-based health-misinformation responses."));
      }

      var actions = make("div", "pub-actions");
      actions.setAttribute("aria-label", "Paper links");
      if (paperHref) {
        actions.appendChild(makeLink("Read paper ↗", paperHref, true));
      }
      if (projectHref) {
        actions.appendChild(makeLink("Project details →", projectHref, !paperHref));
      }
      if (actions.children.length) article.appendChild(actions);

      if (featured) {
        var overview = make("details", "pub-citation pub-overview");
        overview.appendChild(make("summary", "", "Research overview"));
        var overviewContent = make("div", "pub-citation-content");
        overviewContent.appendChild(make("p", "pub-citation-text", featuredOverview));
        overview.appendChild(overviewContent);
        article.appendChild(overview);
      }

      // Bibliographic details are constructed only from metadata already
      // visible on this page. The BibTeX is intentionally marked "generated".
      var citation = authors + " (" + year + "). " + title + ". " + venue + "." + (paperHref ? " " + paperHref : "");
      var bibAuthors = authors.replace(/,\s+and\s+/g, " and ").replace(/,\s+/g, " and ");
      var citeKey = "anik" + year + title.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(/\s+/).slice(0, 4).join("");
      var bibtex = "@misc{" + citeKey + ",\n" +
        "  title = {" + title + "},\n" +
        "  author = {" + bibAuthors + "},\n" +
        "  year = {" + year + "},\n" +
        "  note = {" + venue + "}" +
        (paperHref ? ",\n  url = {" + paperHref + "}" : "") +
        "\n}";
      var details = make("details", "pub-citation");
      details.appendChild(make("summary", "", "Citation & BibTeX"));
      var content = make("div", "pub-citation-content");
      content.appendChild(make("p", "citation-label", "Suggested citation"));
      content.appendChild(make("p", "pub-citation-text", citation));
      content.appendChild(make("p", "citation-label", "Generated BibTeX"));
      var pre = make("pre", "pub-bibtex");
      pre.appendChild(make("code", "", bibtex));
      content.appendChild(pre);

      var copyRow = make("div", "pub-copy-row");
      var copyCitation = make("button", "", "Copy citation");
      copyCitation.type = "button";
      copyCitation.addEventListener("click", function () {
        copyText(citation, copyCitation, "Copy citation");
      });
      var copyBib = make("button", "", "Copy BibTeX");
      copyBib.type = "button";
      copyBib.addEventListener("click", function () {
        copyText(bibtex, copyBib, "Copy BibTeX");
      });
      copyRow.appendChild(copyCitation);
      copyRow.appendChild(copyBib);
      content.appendChild(copyRow);
      details.appendChild(content);
      article.appendChild(details);
    });

    var controls = make("div", "pub-controls");
    controls.setAttribute("aria-label", "Filter publications");
    var filters = make("div", "pub-filter-list");
    var types = [
      ["all", "All papers"],
      ["2026", "2026"],
      ["2025", "2025"],
      ["earlier", "2024 & earlier"]
    ];
    var selected = "all";
    var query = "";
    var buttons = [];

    var searchWrap = make("div", "pub-search-wrap");
    searchWrap.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>';
    var search = make("input", "pub-search");
    search.type = "search";
    search.placeholder = "Search publications";
    search.setAttribute("aria-label", "Search publications by title, author, topic, or venue");
    searchWrap.appendChild(search);
    var status = make("span", "pub-results-status", articles.length + " papers");
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");

    function renderFilters() {
      var visible = 0;
      articles.forEach(function (article) {
        var year = Number(article.dataset.year);
        var matchYear = selected === "all" ||
          (selected === "earlier" ? year <= 2024 : String(year) === selected);
        var show = matchYear && (!query || article.dataset.search.indexOf(query) !== -1);
        article.hidden = !show;
        if (show) visible += 1;
      });
      groups.forEach(function (group) {
        group.hidden = !group.querySelector(".publication:not([hidden])");
      });
      buttons.forEach(function (button) {
        button.setAttribute("aria-pressed", button.dataset.value === selected ? "true" : "false");
      });
      status.textContent = visible + " of " + articles.length + " papers";
      var empty = root.querySelector(".pub-empty");
      if (empty) empty.hidden = visible !== 0;
    }

    types.forEach(function (item) {
      var count = articles.filter(function (article) {
        var y = Number(article.dataset.year);
        return item[0] === "all" || (item[0] === "earlier" ? y <= 2024 : String(y) === item[0]);
      }).length;
      var button = make("button", "pub-filter-button", item[1] + " · " + count);
      button.type = "button";
      button.dataset.value = item[0];
      button.setAttribute("aria-pressed", item[0] === selected ? "true" : "false");
      button.addEventListener("click", function () {
        selected = item[0];
        renderFilters();
      });
      filters.appendChild(button);
      buttons.push(button);
    });
    search.addEventListener("input", function () {
      query = clean(search.value).toLowerCase();
      renderFilters();
    });

    controls.appendChild(filters);
    controls.appendChild(searchWrap);
    controls.appendChild(status);
    var note = root.querySelector(".publication-note");
    if (note) {
      note.insertAdjacentElement("afterend", controls);
    } else {
      root.querySelector(".publication-groups").insertAdjacentElement("beforebegin", controls);
    }

    var empty = make("p", "pub-empty", "No publications match this search. Try another keyword or year.");
    empty.hidden = true;
    root.querySelector(".publication-groups").insertAdjacentElement("afterend", empty);

    root.dataset.pubEditorialReady = "true";
    root.classList.add("pub-editorial");
    renderFilters();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main, { once: true });
  } else {
    main();
  }
})();
