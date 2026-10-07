/* ============================================================
   site.js: partilhado por TODAS as páginas
   Injeta o menu e o rodapé, trata do menu mobile e da segurança base.
   Para mudar o menu/rodapé de todo o site, edita AQUI (num só sítio).
   ============================================================ */
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const eur = n => n.toLocaleString("pt-PT",{style:"currency",currency:"EUR"});
// Escapa texto antes de o inserir em HTML (defesa contra XSS).
const esc = s => String(s ?? "").replace(/[&<>"']/g, c =>
  ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
// "+351912345678" → "+351 912 345 678" (só para mostrar; o link usa o número cru)
const telFmt = t => String(t).replace(/^\+351(\d{3})(\d{3})(\d{3})$/, "+351 $1 $2 $3");
// Links de contacto prontos a usar
const waLink   = texto => `https://wa.me/${CLUBE.telefone.replace(/\D/g,"")}?text=${encodeURIComponent(texto)}`;
const mailLink = (assunto, corpo) => `mailto:${CLUBE.email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;

/* Emblema. Se CLUBE.emblema tiver um ficheiro (img/emblema/…), usa esse;
   senão desenha o provisório em SVG. É uma função porque aparece várias vezes
   na mesma página e cada cópia precisa de um id próprio para o recorte (clipPath). */
let crestN = 0;
function crest(){
  if (CLUBE.emblema) return `<img src="${esc(CLUBE.emblema)}" alt="Emblema ADC Sanguedo" />`;
  const id = "crest-clip-" + (++crestN);
  return `
<svg viewBox="0 0 120 144" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Emblema ADC Sanguedo">
  <path d="M6 6 H114 V86 C114 118 88 134 60 140 C32 134 6 118 6 86 Z" fill="#fff"/>
  <clipPath id="${id}"><path d="M6 6 H114 V86 C114 118 88 134 60 140 C32 134 6 118 6 86 Z"/></clipPath>
  <g clip-path="url(#${id})">
    <rect x="18" y="0" width="14" height="144" fill="#000"/><rect x="46" y="0" width="14" height="144" fill="#000"/>
    <rect x="74" y="0" width="14" height="144" fill="#000"/><rect x="102" y="0" width="14" height="144" fill="#000"/>
  </g>
  <path d="M6 6 H114 V86 C114 118 88 134 60 140 C32 134 6 118 6 86 Z" fill="none" stroke="#000" stroke-width="4"/>
  <circle cx="60" cy="66" r="21" fill="#fff" stroke="#000" stroke-width="3"/>
  <path d="M60 52 l4.5 3.3 -1.7 5.3 h-5.6 l-1.7-5.3z M46 63 l5.5 0 1.7 5.3 -4.5 3.3 -4.5-3.3z M74 63 l5.5 0 1.4 4.6 -4.5 3.3 -4.5-3.3z M53 74 l4.5 3.3 -1.7 5.3 h-5.6 l-1.7-5.3z M67 74 l4.5 3.3 -1.4 4.6 -5.3 0 -1.7-5.3z" fill="#000"/>
  <rect x="30" y="98" width="60" height="17" fill="#000"/>
  <text x="60" y="110.5" text-anchor="middle" font-family="Oswald, sans-serif" font-weight="700" font-size="12" fill="#fff" letter-spacing="1">ADCS</text>
</svg>`;
}

/* Ícones das redes */
const ICON = {
  instagram:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>`,
  facebook:`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 22v-8h3l.5-3.5H13V8.3c0-1 .3-1.7 1.7-1.7H17V3.5C16.6 3.4 15.5 3.3 14.3 3.3 11.7 3.3 10 4.9 10 7.9v2.6H7V14h3v8z"/></svg>`,
  tiktok:`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.5 3c.3 2 1.6 3.5 3.5 3.8V9c-1.3 0-2.5-.4-3.5-1v6.2a5.2 5.2 0 1 1-5.2-5.2c.3 0 .6 0 .9.1v2.4a2.8 2.8 0 1 0 2 2.7V3z"/></svg>`,
  email:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
};

/* Botões das redes (rodapé e Contactos) */
const redesLinks = () => `
  <a href="${esc(REDES.instagram)}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.instagram}</a>
  <a href="${esc(REDES.facebook)}" target="_blank" rel="noopener" aria-label="Facebook">${ICON.facebook}</a>
  <a href="${esc(REDES.tiktok)}" target="_blank" rel="noopener" aria-label="TikTok">${ICON.tiktok}</a>
  <a href="mailto:${esc(REDES.email)}" aria-label="E-mail">${ICON.email}</a>`;

/* Páginas do menu (ficheiro → nome) */
const PAGINAS = [
  ["index.html","Início"],
  ["sobre.html","Sobre nós"],
  ["estrutura.html","Estrutura"],
  ["socios.html","Sócios"],
  ["loja.html","Loja"],
  ["alugueres.html","Alugueres"],
  ["contactos.html","Contactos"],
];

/* ---- MENU ---- */
function montarNav(){
  const host = $("[data-site-nav]"); if(!host) return;
  const atual = (document.body.dataset.page || "index") + ".html";
  const temLoja = !!$("#shopGrid");
  host.className = "nav";
  host.innerHTML = `
    <div class="wrap nav__in">
      <a href="index.html" class="brand">${crest()}<b>ADC Sanguedo</b></a>
      <nav class="nav__links" id="navlinks" aria-label="Principal">
        ${PAGINAS.map(([f,n])=>`<a href="${f}"${f===atual?' class="is-active" aria-current="page"':''}>${n}</a>`).join("")}
      </nav>
      ${temLoja?`<button class="nav__cart" id="cartBtn" aria-label="Encomenda" aria-controls="cart" aria-expanded="false"><span class="nav__cart-txt">Encomenda</span><svg class="nav__cart-ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 7h12l-1 14H7z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg> <span id="cartCount">0</span></button>`:``}
      <button class="nav__burger" id="burger" aria-label="Menu" aria-controls="navlinks" aria-expanded="false">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
    </div>`;
  const links = $("#navlinks"), burger = $("#burger");
  const setMenu = aberto => { links.classList.toggle("open", aberto); burger.setAttribute("aria-expanded", aberto); };
  burger.onclick = () => setMenu(!links.classList.contains("open"));
  $$("a", links).forEach(a => a.onclick = () => setMenu(false));
  document.addEventListener("keydown", e => { if(e.key==="Escape" && links.classList.contains("open")){ setMenu(false); burger.focus(); } });
}

/* ---- RODAPÉ (modo suporte) ---- */
function montarFooter(){
  const host = $("[data-site-footer]"); if(!host) return;
  host.className = "footer";
  host.innerHTML = `
    <div class="footer__top stripes"></div>
    <div class="wrap footer__grid">
      <div class="footer__col footer__brand-col">
        <div class="footer__brand">${crest()}<b>ADC Sanguedo</b></div>
        <small>${esc(CLUBE.localidade)}<br>Desde ${esc(CLUBE.anoFundacao)}</small>
      </div>
      <div class="footer__col">
        <h2>Suporte</h2>
        <p class="footer__help">Precisas de ajuda ou tens uma dúvida? Fala connosco.</p>
        <a href="mailto:${esc(REDES.email)}">${esc(REDES.email)}</a>
        <a href="tel:${esc(CLUBE.telefone)}">${esc(telFmt(CLUBE.telefone))}</a>
      </div>
      <div class="footer__col">
        <h2>Navegação</h2>
        ${PAGINAS.map(([f,n])=>`<a href="${f}">${n}</a>`).join("")}
      </div>
      <div class="footer__col">
        <h2>Redes</h2>
        <div class="footer__social">${redesLinks()}</div>
      </div>
    </div>
    <div class="wrap footer__bar">
      <small>© ${new Date().getFullYear()} Associação Desportiva e Cultural de Sanguedo</small>
      <span class="footer__slogan">${esc(CLUBE.slogan)}</span>
    </div>`;
}

/* Dados do clube escritos nos textos: <span data-clube="anoFundacao">1975</span>
   O valor vem sempre do config.js (o que está no HTML só aparece sem JavaScript). */
function preencherDados(){
  $$("[data-clube]").forEach(el => { const v = CLUBE[el.dataset.clube]; if (v) el.textContent = v; });
}

montarNav();
montarFooter();
preencherDados();
