(function(){
"use strict";
const data=window.PUBLICATION_CATALOG||[];
const paper=data.find(p=>location.pathname.replace(/\/+$/,"").endsWith("/"+p.slug));
if(!paper)return;
const main=document.querySelector("main");if(!main)return;
const tag=(name,cls,txt)=>{let el=document.createElement(name);if(cls)el.className=cls;if(txt!==undefined)el.textContent=txt;return el;};
const add=(el,child)=>{el.appendChild(child);return child;};
const link=(label,url,primary)=>{const a=tag("a","paper-btn"+(primary?" primary":""),label);a.href=url;if(/^https?:/.test(url)){a.target="_blank";a.rel="noopener noreferrer";}return a;};
function block(parent,kicker,heading){let s=add(parent,tag("section","paper-block"));add(s,tag("p","paper-eyebrow",kicker));add(s,tag("h2","",heading));return s;}
function copy(txt,btn,base){if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(txt).then(()=>{btn.textContent="Copied ✓";setTimeout(()=>btn.textContent=base,1400);});else {let input=tag("textarea");input.value=txt;document.body.appendChild(input);input.select();try{document.execCommand("copy");btn.textContent="Copied ✓";}catch(e){btn.textContent="Copy manually";}input.remove();setTimeout(()=>btn.textContent=base,1400);}}
function authorElement(p){let e=tag("p","paper-authors");let pieces=p.authors.split("Anirban Saha Anik");pieces.forEach((piece,i)=>{if(i)e.appendChild(tag("strong","", "Anirban Saha Anik"));e.appendChild(document.createTextNode(piece));});return e;}
const shell=tag("div","paper-site");
const hero=add(shell,tag("header","paper-hero"));let hc=add(hero,tag("div","paper-container"));add(hc,link("← All publications","/publications/"));add(hc,tag("p","paper-tagline",paper.venue+" · "+paper.year));add(hc,tag("h1","",paper.title));add(hc,authorElement(paper));add(hc,tag("p","paper-hero-summary",paper.summary));
const buttons=add(hc,tag("div","paper-buttons"));
if(paper.paperUrl)add(buttons,link("Read full paper ↗",paper.paperUrl,true));
if(paper.doiUrl&&paper.doiUrl!==paper.paperUrl)add(buttons,link("DOI ↗",paper.doiUrl));
if((paper.sourceBib||paper.doi)) {const a=link("Citation ↓","#paper-cite");buttons.appendChild(a);}
(paper.links||[]).forEach(x=>add(buttons,link(x[0]+" ↗",x[1])));
const grid=add(shell,tag("div","paper-container paper-main"));
const body=add(grid,tag("div","paper-content"));
let s=block(body,"Overview","Research problem");add(s,tag("p","",paper.summary)); if(paper.evidence)add(s,tag("div","paper-insight",paper.evidence));
s=block(body,"Methods","Approach & evidence");
if(paper.image){const figure=add(s,tag("figure","paper-figure"));const img=add(figure,tag("img"));img.src=paper.image;img.alt=paper.imageAlt||"Research method visual";img.loading="lazy";add(figure,tag("figcaption","",paper.figureCaption||paper.imageAlt));}
else {add(s,tag("p","", "The complete methodological figures and diagrams are available in the research paper. The original document is the authoritative visual source."));}
if(paper.figureUrl||paper.paperUrl)add(s,link("Explore original paper figures ↗",paper.figureUrl||paper.paperUrl));
s=block(body,"Contribution","What the paper adds");const ul=add(s,tag("ul","paper-notes"));(paper.tips&&paper.tips.length?paper.tips:[paper.evidence||paper.summary,"See the linked peer-reviewed or archival paper for complete methodology and evaluations."]).forEach(t=>add(ul,tag("li","",t)));
s=block(body,"Evaluation","Results & reported findings");
if(paper.table?.length){const wrap=add(s,tag("div","paper-table-wrap"));const table=add(wrap,tag("table","paper-table"));let th=add(table,tag("thead")),tr=add(th,tag("tr"));paper.table[0].forEach(c=>add(tr,tag("th","",c)));let tbody=add(table,tag("tbody"));paper.table.slice(1).forEach(row=>{let tr=add(tbody,tag("tr"));row.forEach(c=>add(tr,tag("td","",c)));});add(s,tag("p","paper-table-note",paper.tableCaption));}
else add(s,tag("p","", "For original quantitative tables, evaluation settings, and ablations, consult the linked full-text paper. No unsupported numbers have been inserted into this summary."));
s=block(body,"Bibliography","Cite this work");s.id="paper-cite";
add(s,tag("p","paper-cite-note",paper.bibStatus==="publisher"?"Publisher-provided BibTeX (ACL Anthology).":"Bibliographic entry assembled from available publication metadata. For authoritative export, use the publisher or DOI record."));
const pre=add(s,tag("pre","paper-citation"));add(pre,tag("code","",paper.sourceBib||paper.citation));let row=add(s,tag("div","paper-buttons"));let cb=add(row,tag("button","paper-btn","Copy BibTeX"));cb.type="button";cb.onclick=()=>copy(paper.sourceBib,cb,"Copy BibTeX");let cp=add(row,tag("button","paper-btn","Copy citation"));cp.type="button";cp.onclick=()=>copy(paper.citation,cp,"Copy citation");if(paper.sourceUrl)add(row,link("Publication record ↗",paper.sourceUrl));
if(paper.sourceUrl&&paper.bibStatus!=="publisher")add(s,tag("p","paper-cite-note","Note: This entry is formatted from available metadata; verify author order, venue, and publication details before formal use."));
const aside=add(grid,tag("aside","paper-sidebar"));let box=add(aside,tag("section","paper-sidecard"));add(box,tag("h3","", "Publication details"));
const dl=add(box,tag("dl"));function pair(k,v){if(!v)return;add(dl,tag("dt","",k));add(dl,tag("dd","",v));}pair("Venue",paper.venueFull||paper.venue);pair("Year",paper.year);pair("Authors",paper.authors);pair("Pages",paper.pages?paper.pages.replace("--","–"):"");pair("DOI",paper.doi||"");
box=add(aside,tag("section","paper-sidecard"));add(box,tag("h3","", "Research materials"));
const links=[["Read paper",paper.paperUrl],["Publication record",paper.sourceUrl],...(paper.links||[])];let used=new Set();links.forEach(([label,url])=>{if(!url||used.has(url))return;used.add(url);const a=add(box,tag("a","paper-side-link",label+" ↗"));a.href=url;if(/^https?:/.test(url)){a.target="_blank";a.rel="noopener noreferrer";}});
main.replaceWith(shell);
})();
