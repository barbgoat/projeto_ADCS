/* ============================================================
   site.js — partilhado por TODAS as páginas
   Injeta o menu e o rodapé, trata do menu mobile e da segurança base.
   Para mudar o menu/rodapé de todo o site, edita AQUI (num só sítio).
   ============================================================ */
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const eur = n => n.toLocaleString("pt-PT",{style:"currency",currency:"EUR"});
// Escapa texto antes de o inserir em HTML (defesa contra XSS).
const esc = s => String(s ?? "").replace(/[&<>"']/g, c =>
  ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));

/* Emblema (SVG). Substitui por aqui quando tiveres o oficial. */
const CREST = `
<svg viewBox="0 0 120 144" xmlns="http://www.w3.org/2000/svg" aria-label="Emblema ADC Sanguedo">
  <path d="M6 6 H114 V86 C114 118 88 134 60 140 C32 134 6 118 6 86 Z" fill="#fff"/>
  <clipPath id="sh"><path d="M6 6 H114 V86 C114 118 88 134 60 140 C32 134 6 118 6 86 Z"/></clipPath>
  <g clip-path="url(#sh)">
    <rect x="18" y="0" width="14" height="144" fill="#000"/><rect x="46" y="0" width="14" height="144" fill="#000"/>
    <rect x="74" y="0" width="14" height="144" fill="#000"/><rect x="102" y="0" width="14" height="144" fill="#000"/>
  </g>
  <path d="M6 6 H114 V86 C114 118 88 134 60 140 C32 134 6 118 6 86 Z" fill="none" stroke="#000" stroke-width="4"/>
  <circle cx="60" cy="66" r="21" fill="#fff" stroke="#000" stroke-width="3"/>
  <path d="M60 52 l4.5 3.3 -1.7 5.3 h-5.6 l-1.7-5.3z M46 63 l5.5 0 1.7 5.3 -4.5 3.3 -4.5-3.3z M74 63 l5.5 0 1.4 4.6 -4.5 3.3 -4.5-3.3z M53 74 l4.5 3.3 -1.7 5.3 h-5.6 l-1.7-5.3z M67 74 l4.5 3.3 -1.4 4.6 -5.3 0 -1.7-5.3z" fill="#000"/>
  <rect x="30" y="98" width="60" height="17" fill="#000"/>
  <text x="60" y="110.5" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="12" fill="#fff" letter-spacing="1">ADCS</text>
</svg>`;

/* Ícones das redes */
const ICON = {
  instagram:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>`,
  facebook:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-8h3l.5-3.5H13V8.3c0-1 .3-1.7 1.7-1.7H17V3.5C16.6 3.4 15.5 3.3 14.3 3.3 11.7 3.3 10 4.9 10 7.9v2.6H7V14h3v8z"/></svg>`,
  tiktok:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.3 2 1.6 3.5 3.5 3.8V9c-1.3 0-2.5-.4-3.5-1v6.2a5.2 5.2 0 1 1-5.2-5.2c.3 0 .6 0 .9.1v2.4a2.8 2.8 0 1 0 2 2.7V3z"/></svg>`,
  email:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
};

/* Páginas do menu (ficheiro → nome) */
const PAGINAS = [
  ["index.html","Início"],
  ["sobre.html","Sobre nós"],
  ["estrutura.html","Estrutura"],
  ["loja.html","Loja"],
  ["alugueres.html","Alugueres"],
  ["contactos.html","Contactos"],
];
const paginaAtual = () => (location.pathname.split("/").pop() || "index.html") || "index.html";

/* ---- MENU ---- */
function montarNav(){
  const host = $("[data-site-nav]"); if(!host) return;
  const atual = document.body.dataset.page ? document.body.dataset.page+".html" : paginaAtual();
  const temLoja = !!$("#shopGrid");
  host.className = "nav";
  host.innerHTML = `
    <div class="wrap nav__in">
      <a href="index.html" class="brand">${CREST}<b>ADC Sanguedo</b></a>
      <nav class="nav__links" id="navlinks">
        ${PAGINAS.map(([f,n])=>`<a href="${f}"${f===atual?' class="is-active"':''}>${n}</a>`).join("")}
      </nav>
      ${temLoja?`<button class="nav__cart" id="cartBtn" aria-label="Abrir carrinho">Encomenda <span id="cartCount">0</span></button>`:``}
      <button class="nav__burger" id="burger" aria-label="Menu">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
    </div>`;
  $("#burger").onclick = () => $("#navlinks").classList.toggle("open");
  $$("#navlinks a").forEach(a => a.onclick = () => $("#navlinks").classList.remove("open"));
}

/* ---- RODAPÉ (modo suporte) ---- */
function montarFooter(){
  const host = $("[data-site-footer]"); if(!host) return;
  host.className = "footer";
  host.innerHTML = `
    <div class="footer__top stripes"></div>
    <div class="wrap footer__grid">
      <div class="footer__col footer__brand-col">
        <div class="footer__brand">${CREST}<b>ADC Sanguedo</b></div>
        <small>${esc(CLUBE.localidade)}</small>
      </div>
      <div class="footer__col">
        <h4>Suporte</h4>
        <p class="footer__help">Precisas de ajuda ou tens uma dúvida? Fala connosco.</p>
        <a href="mailto:${esc(REDES.email)}">${esc(REDES.email)}</a>
        <a href="tel:${esc(CLUBE.telefone)}">${esc(CLUBE.telefone)}</a>
      </div>
      <div class="footer__col">
        <h4>Navegação</h4>
        ${PAGINAS.map(([f,n])=>`<a href="${f}">${n}</a>`).join("")}
      </div>
      <div class="footer__col">
        <h4>Redes</h4>
        <div class="footer__social">
          <a href="${esc(REDES.instagram)}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.instagram}</a>
          <a href="${esc(REDES.facebook)}" target="_blank" rel="noopener" aria-label="Facebook">${ICON.facebook}</a>
          <a href="${esc(REDES.tiktok)}" target="_blank" rel="noopener" aria-label="TikTok">${ICON.tiktok}</a>
          <a href="mailto:${esc(REDES.email)}" aria-label="E-mail">${ICON.email}</a>
        </div>
      </div>
    </div>
    <div class="wrap footer__bar">
      <small>© ${new Date().getFullYear()} Associação Desportiva e Cultural de Sanguedo</small>
      <small>Orgulho preto e branco</small>
    </div>`;
}

montarNav();
montarFooter();
