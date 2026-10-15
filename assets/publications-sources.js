(function(){
"use strict";
const catalog=window.PUBLICATION_CATALOG||[];
function ready(){
 const root=document.querySelector("main.page-shell");if(!root)return;
 const articles=Array.from(root.querySelectorAll(".publication-year .publication"));
 articles.forEach((article,i)=>{
  let p=catalog[i];if(!p)return;
  // Keep the original publication content and link to the deeper paper exploration.
  const actions=article.querySelector(".pub-actions");
  if(actions&&!actions.querySelector('[data-paper-detail]')) {
   const a=document.createElement("a");a.className="pub-action";a.textContent="Research overview →";a.href=p.detailUrl;a.dataset.paperDetail="true";actions.appendChild(a);
   if(p.links) p.links.forEach(pair=>{
    if(!/Underline poster presentation|Poster \(site file\)/.test(pair[0]))return;
    const ext=document.createElement("a");ext.className="pub-action";ext.href=pair[1];ext.textContent=pair[0]+" ↗";
    ext.target="_blank";ext.rel="noopener noreferrer";actions.appendChild(ext);
   });
  }
  const citation=article.querySelector(".pub-citation");
  if(!citation)return;
  const paragraphs=citation.querySelectorAll(".pub-citation-text");
  const pre=citation.querySelector(".pub-bibtex code");
  if(paragraphs[0])paragraphs[0].textContent=p.citation;
  if(pre)pre.textContent=p.sourceBib;
  const labels=citation.querySelectorAll(".citation-label");
  if(labels[1])labels[1].textContent=p.bibStatus==="publisher"?"Publisher BibTeX":"Bibliographic BibTeX (check publisher)";
  const copyBtns=citation.querySelectorAll(".pub-copy-row button");
  const old=copyBtns[0]?.parentElement;if(old){
   const newRow=old.cloneNode(false);
   function bind(label,value){const btn=document.createElement("button");btn.textContent=label;btn.type="button";btn.addEventListener("click",()=>{if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(value).then(()=>{btn.textContent="Copied ✓";setTimeout(()=>btn.textContent=label,1500)});else{const t=document.createElement("textarea");document.body.appendChild(t);t.value=value;t.select();document.execCommand("copy");t.remove();btn.textContent="Copied ✓";setTimeout(()=>btn.textContent=label,1500)}});newRow.appendChild(btn);}
   bind("Copy citation",p.citation);
   bind("Copy BibTeX",p.sourceBib);
   old.replaceWith(newRow);
  }
  if(p.bibStatus!=="publisher"){
   let n=document.createElement("p");n.className="pub-source-label";n.style.cssText="font-size:.73rem;color:#6a7b87;margin:.6rem 0 0";n.textContent="Formatted from available metadata; verify against the official publication record.";citation.querySelector(".pub-citation-content")?.appendChild(n);
  }
 });
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",ready,{once:true});else ready();
})();