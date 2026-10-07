/* ============================================================
   pages.js: lógica de cada página (cada bloco corre só onde existe)
   Depende de site.js (esc, $, eur, waLink, mailLink…) e de config.js (dados).
   ============================================================ */

// Camisola em SVG (usada na loja)
function jersey(estilo){
  const stripes = estilo==="listada"
    ? `<rect x="26" y="28" width="8" height="64" fill="#000"/><rect x="42" y="28" width="8" height="64" fill="#000"/><rect x="58" y="28" width="8" height="64" fill="#000"/><rect x="74" y="28" width="8" height="64" fill="#000"/>`
    : "";
  const accent = estilo==="treino" ? `<rect x="18" y="60" width="72" height="6" fill="#000"/>` : "";
  return `<svg viewBox="0 0 108 108" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g stroke="#000" stroke-width="3" stroke-linejoin="round"><path d="M40 14 L18 26 L10 44 L22 52 L26 44 L26 96 L82 96 L82 44 L86 52 L98 44 L90 26 L68 14 C64 22 44 22 40 14Z" fill="#fff"/></g>
    <g>${stripes}${accent}</g>
    <path d="M40 14 C44 22 64 22 68 14" fill="none" stroke="#000" stroke-width="3"/></svg>`;
}

// Foto do produto (img/produtos/…) ou, se não houver, o desenho da camisola
const fotoProduto = p => p.imagem
  ? `<img src="${esc(p.imagem)}" alt="${esc(p.nome)}" loading="lazy" />`
  : jersey(p.estilo);

// Mensagem por baixo de um formulário (substitui os alert())
function aviso(el, html){ el.innerHTML = html; el.hidden = !html; }

// Jogos de hoje em diante, do mais próximo para o mais distante
function proximosJogos(){
  const hoje = new Date(); hoje.setHours(0,0,0,0);
  return JOGOS.filter(j=>new Date(j.data)>=hoje).sort((a,b)=>new Date(a.data)-new Date(b.data));
}
const jogoTitulo = j => j.casa ? `Sanguedo vs ${esc(j.adversario)}` : `${esc(j.adversario)} vs Sanguedo`;
const horaJogo = d => d.toLocaleTimeString("pt-PT",{hour:"2-digit",minute:"2-digit"});

/* ---------- INÍCIO: próximo jogo ---------- */
if ($("#proximoJogo")) {
  const j = proximosJogos()[0];
  if (j) {
    const d = new Date(j.data);
    const dia = d.toLocaleDateString("pt-PT",{weekday:"long",day:"numeric",month:"long"});   // "domingo, 11 de outubro"
    $("#pjJogo").innerHTML = jogoTitulo(j);
    $("#pjInfo").innerHTML = `<span>${dia[0].toUpperCase() + dia.slice(1)} · ${horaJogo(d)}</span>
      <span>${esc(j.competicao)}</span><span class="fx__ha ${j.casa?"casa":""}">${j.casa?"Casa":"Fora"}</span>`;
    $("#proximoJogo").hidden = false;
  }
}

/* ---------- INÍCIO: herói (emblema + meta) ---------- */
if ($("#heroCrest")) {
  $("#heroCrest").innerHTML = crest();
  $("#heroKicker").textContent = CLUBE.localidade;
  $("#heroMeta").innerHTML =
    `<span><i>Fundado</i> ${esc(CLUBE.anoFundacao)}</span><span><i>Associação</i> ${esc(CLUBE.associacao)}</span><span><i>Casa</i> ${esc(CLUBE.estadio)}</span>`;
  $("#statAno").textContent = CLUBE.anoFundacao;
}

/* ---------- INÍCIO: patrocínios + redes ---------- */
if ($("#patrocinios")) {
  $("#patrocinios").innerHTML = PATROCINIOS.map(p=>{
    const inner = p.logo
      ? `<img class="spon__logo" src="${esc(p.logo)}" alt="${esc(p.nome)}" loading="lazy" />`
      : `<span class="spon__name">${esc(p.nome)}</span>`;
    // Com logo: cartão branco. Sem logo nem link: cartão tracejado (lugar livre)
    const cls = "spon" + (p.logo ? " spon--logo" : "") + (!p.logo && !p.url ? " spon--empty" : "");
    return p.url
      ? `<a class="${cls}" href="${esc(p.url)}" target="_blank" rel="noopener">${inner}</a>`
      : `<div class="${cls}">${inner}</div>`;
  }).join("") + `<a class="spon spon--cta stripes" href="contactos.html"><span class="spon__name">Quer ser patrocinador?</span></a>`;
}
if ($("#redes")) {
  const item = (href,label,icon) => `<a class="social-tile" href="${esc(href)}" ${href.startsWith("mailto")?"":'target="_blank" rel="noopener"'}>${icon}<span>${label}</span></a>`;
  $("#redes").innerHTML =
    item(REDES.instagram,"Instagram",ICON.instagram) +
    item(REDES.facebook,"Facebook",ICON.facebook) +
    item("mailto:"+REDES.email,"E-mail",ICON.email) +
    item(REDES.tiktok,"TikTok",ICON.tiktok);
}

/* ---------- ESTRUTURA: formação / séniores / veteranos ---------- */
if ($("#escaloes")) {
  $("#fIntro").textContent = ESTRUTURA.formacao.intro;
  $("#sIntro").textContent = ESTRUTURA.seniores.intro;
  $("#vIntro").textContent = ESTRUTURA.veteranos.intro;
  $("#escaloes").innerHTML = ESTRUTURA.formacao.escaloes.map(e=>
    `<div class="esc"><b>${esc(e.nome)}</b><span>${esc(e.faixa)}</span></div>`).join("");

  const factos = (sel, arr) =>
    $(sel).innerHTML = arr.map(f=>`<div class="facto"><span class="k">${esc(f.k)}</span><span class="v">${esc(f.v)}</span></div>`).join("");
  factos("#seniores-factos", ESTRUTURA.seniores.factos);
  factos("#veteranos-factos", ESTRUTURA.veteranos.factos);

  $("#zerozeroLink").href = CLUBE.zerozero;

  const MESES=["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"];
  const futuros = proximosJogos();
  $("#seniores-jogos").innerHTML = futuros.length ? futuros.map(j=>{
    const d=new Date(j.data);
    return `<div class="fx"><div class="fx__date"><div class="d">${d.getDate()}</div><div class="m">${MESES[d.getMonth()]}</div></div>
      <div class="fx__main"><b>${jogoTitulo(j)}</b><span>${esc(j.competicao)} · ${horaJogo(d)}</span></div>
      <div class="fx__ha ${j.casa?"casa":""}">${j.casa?"Casa":"Fora"}</div></div>`;
  }).join("") : `<p class="fx fx--empty">Consulta os próximos jogos e resultados no <a href="${esc(CLUBE.zerozero)}" target="_blank" rel="noopener">calendário oficial do zerozero</a>.</p>`;
}

/* ---------- LOJA: produtos + carrinho ---------- */
if ($("#shopGrid")) {
  const QTD_MAX = 99;
  $("#shopGrid").innerHTML = PRODUTOS.map(p=>`
    <article class="product">
      <div class="product__img">${fotoProduto(p)}</div>
      <div class="product__b">
        <h3>${esc(p.nome)}</h3>
        <p class="desc">${esc(p.desc)}</p>
        <div class="product__price">${eur(p.preco)}</div>
        <div class="row2">
          <div class="field"><label for="size-${p.id}">Tamanho</label><select id="size-${p.id}">${TAMANHOS.map(t=>`<option>${esc(t)}</option>`).join("")}</select></div>
          <div class="field"><label for="qty-${p.id}">Quantidade</label><input type="number" min="1" max="${QTD_MAX}" value="1" id="qty-${p.id}" /></div>
        </div>
        <div class="perso row2">
          <div class="field"><label for="name-${p.id}">Nome (costas)</label><input maxlength="20" placeholder="opcional" id="name-${p.id}" /></div>
          <div class="field"><label for="num-${p.id}">Número</label><input maxlength="3" placeholder="opcional" inputmode="numeric" id="num-${p.id}" /></div>
        </div>
        <button class="btn btn--solid" data-add="${p.id}">Adicionar à encomenda</button>
      </div>
    </article>`).join("");

  /* O carrinho fica guardado no navegador, para não se perder ao mudar de página.
     Guarda-se só o id do produto: nome e preço vêm sempre do config.js. */
  const CHAVE = "adcs-encomenda";
  const produto = id => PRODUTOS.find(x=>x.id===id);
  let carrinho = [];
  try {
    const guardado = JSON.parse(localStorage.getItem(CHAVE) || "[]");
    if (Array.isArray(guardado)) carrinho = guardado.filter(i => i && produto(i.id) && TAMANHOS.includes(i.size));
  } catch {}
  const guardar = () => { try { localStorage.setItem(CHAVE, JSON.stringify(carrinho)); } catch {} };
  const total = () => carrinho.reduce((s,i)=>s+produto(i.id).preco*i.qty,0);

  // Gaveta do carrinho: enquanto está aberta, o resto da página fica inativo (foco preso lá dentro)
  const cart = $("#cart"), overlay = $("#overlay"), cartBtn = $("#cartBtn");
  const fundo = () => $$("body > header, body > main, body > footer");
  const setCart = aberto => {
    cart.classList.toggle("open", aberto); overlay.classList.toggle("open", aberto);
    cart.inert = !aberto; fundo().forEach(el => el.inert = aberto);
    cartBtn.setAttribute("aria-expanded", aberto);
    (aberto ? $("#cartClose") : cartBtn).focus();
  };
  cart.inert = true;
  cartBtn.onclick = () => setCart(true);
  $("#cartClose").onclick = () => setCart(false);
  overlay.onclick = () => setCart(false);
  document.addEventListener("keydown", e=>{ if(e.key==="Escape" && cart.classList.contains("open")) setCart(false); });

  $$("[data-add]").forEach(btn => btn.addEventListener("click", () => {
    const id=btn.dataset.add;
    const size=$(`#size-${id}`).value;
    const qty=Math.min(QTD_MAX, Math.max(1, parseInt($(`#qty-${id}`).value)||1));
    const nome=$(`#name-${id}`).value.trim().slice(0,20);
    const num=$(`#num-${id}`).value.trim().replace(/\D/g,"").slice(0,3);
    // Mesmo produto, tamanho e personalização → soma à linha que já existe
    const igual = carrinho.find(i=>i.id===id && i.size===size && i.nome===nome && i.num===num);
    if (igual) igual.qty = Math.min(QTD_MAX, igual.qty+qty);
    else carrinho.push({ id, size, qty, nome, num });
    renderCart(); setCart(true);
  }));

  function renderCart(){
    guardar();
    $("#cartCount").textContent = carrinho.reduce((s,i)=>s+i.qty,0);
    if(!carrinho.length){
      $("#cartItems").innerHTML = `<p class="cart__empty">A encomenda está vazia.<br>Escolhe uma camisola na loja.</p>`;
    } else {
      $("#cartItems").innerHTML = carrinho.map((i,idx)=>{ const p=produto(i.id); return `
        <div class="citem"><div class="citem__thumb">${fotoProduto(p)}</div>
          <div class="citem__info"><b>${esc(p.nome)}</b>
            <span>Tam. ${esc(i.size)} · Qtd ${i.qty}${i.nome?` · ${esc(i.nome)}`:""}${i.num?` #${esc(i.num)}`:""}</span><br>
            <span>${eur(p.preco*i.qty)}</span></div>
          <button class="citem__x" data-rm="${idx}" aria-label="Remover ${esc(p.nome)}">✕</button></div>`; }).join("");
      $$("[data-rm]").forEach(b=>b.onclick=()=>{ carrinho.splice(+b.dataset.rm,1); renderCart(); $("#cartClose").focus(); });
    }
    $("#cartTotal").textContent = eur(total());
    $("#checkoutWa").disabled = $("#checkoutMail").disabled = !carrinho.length;
  }
  renderCart();

  function resumo(){
    const l=carrinho.map(i=>{ const p=produto(i.id);
      return `• ${i.qty}x ${p.nome} (Tam. ${i.size}${i.nome?`, ${i.nome}`:""}${i.num?` #${i.num}`:""}): ${eur(p.preco*i.qty)}`; });
    return `Olá! Gostaria de encomendar:\n${l.join("\n")}\n\nTotal: ${eur(total())}`;
  }
  $("#checkoutWa").addEventListener("click", ()=> window.open(waLink(resumo()),"_blank","noopener"));
  $("#checkoutMail").addEventListener("click", ()=>{
    window.location.href = mailLink("Nova encomenda da loja do clube", resumo());
    aviso($("#checkoutMsg"), `Se o teu programa de e-mail não abrir, envia a encomenda para <a href="mailto:${esc(CLUBE.email)}">${esc(CLUBE.email)}</a> ou usa o WhatsApp.`);
  });
}

/* ---------- ALUGUERES: condições + pedido ---------- */
if ($("#alugForm")) {
  $("#alugIntro").textContent = ALUGUERES.intro;
  $("#alugPreco").textContent = ALUGUERES.precoHora;
  $("#alugHorario").textContent = ALUGUERES.horario;
  $("#alugCond").innerHTML = ALUGUERES.condicoes.map(c=>`<li>${esc(c)}</li>`).join("");

  // Não deixa escolher dias passados nem horas fora do horário
  const h = new Date(), p2 = n => String(n).padStart(2,"0");
  $("#aData").min = `${h.getFullYear()}-${p2(h.getMonth()+1)}-${p2(h.getDate())}`;
  $("#aHora").min = ALUGUERES.horaPrimeira;
  $("#aHora").max = ALUGUERES.horaUltima;
  $("#aHoraAjuda").textContent = `Entre as ${ALUGUERES.horaPrimeira} e as ${ALUGUERES.horaUltima}.`;

  const pedido = () => {
    const nome=$("#aNome").value.trim(), tel=$("#aTel").value.trim();
    const data=new Date($("#aData").value+"T00:00").toLocaleDateString("pt-PT",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
    return `Olá! Gostaria de alugar o campo de Fut 7:\n• Nome: ${nome}${tel?`\n• Contacto: ${tel}`:""}\n• Data: ${data}\n• Hora: ${$("#aHora").value}`;
  };
  // O navegador valida os campos obrigatórios antes de chegar aqui
  $("#alugForm").addEventListener("submit", e=>{
    e.preventDefault();
    if (e.submitter?.value === "email") {
      window.location.href = mailLink("Pedido de aluguer do campo de Fut 7", pedido());
      aviso($("#alugMsg"), `Se o teu programa de e-mail não abrir, envia o pedido para <a href="mailto:${esc(CLUBE.email)}">${esc(CLUBE.email)}</a> ou usa o WhatsApp.`);
    } else {
      window.open(waLink(pedido()),"_blank","noopener");
    }
  });
}

/* ---------- SÓCIOS: quotas, pagamento e pedido de renovação ---------- */
if ($("#socioForm")) {
  const P = SOCIOS.pagamento;
  $("#sociosIntro").textContent = SOCIOS.intro;
  $("#sociosEpoca").textContent = SOCIOS.epoca;
  $("#quotas").innerHTML = SOCIOS.quotas.map(q=>`
    <div class="quota"><span class="k">${esc(q.nome)}</span><span class="v">${esc(q.valor || "Valor a confirmar")}</span><span class="d">${esc(q.desc)}</span></div>`).join("");

  // Só aparecem os meios de pagamento que estão preenchidos no config.js
  const meios = [
    P.mbway && { id:"MB WAY", titulo:"MB WAY", valor:P.mbway, copiar:P.mbway.replace(/\s/g,"") },
    P.iban  && { id:"Transferência bancária", titulo:"Transferência bancária", valor:P.iban, extra:P.titular, copiar:P.iban.replace(/\s/g,"") },
    P.presencial && { id:"Presencial", titulo:"Presencial", valor:P.presencial },
  ].filter(Boolean);
  $("#pagamentos").innerHTML = meios.map(m=>`
    <div class="pag"><span class="k">${esc(m.titulo)}</span>
      <span class="v">${esc(m.valor)}</span>${m.extra?`<span class="d">${esc(m.extra)}</span>`:""}
      ${m.copiar?`<button type="button" class="pag__copy" data-copy="${esc(m.copiar)}">Copiar</button>`:""}</div>`).join("")
    + (P.mbway || P.iban ? "" : `<p class="pag__nota">Os dados para pagamento por MB WAY ou transferência são enviados pela direção na resposta ao teu pedido.</p>`);
  $$("[data-copy]").forEach(b => b.onclick = async () => {
    try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent = "Copiado"; }
    catch { b.textContent = b.dataset.copy; }
    setTimeout(() => b.textContent = "Copiar", 2000);
  });

  $("#sQuota").innerHTML = SOCIOS.quotas.map(q=>`<option value="${esc(q.id)}">${esc(q.nome)}${q.valor?` (${esc(q.valor)})`:""}</option>`).join("");
  $("#sPagamento").innerHTML = ["MB WAY", "Transferência bancária", P.presencial && "Presencial"]
    .filter(Boolean).map(m=>`<option>${m}</option>`).join("");

  // "Quero ser sócio" não precisa de número de sócio
  $("#sTipo").onchange = () => {
    const novo = $("#sTipo").value === "novo";
    $("#sNumCampo").hidden = novo;
    $("#sNum").required = !novo;
    $("#socioTitulo").textContent = novo ? "Inscrição de sócio" : "Renovar quota";
  };

  const pedido = () => {
    const novo = $("#sTipo").value === "novo";
    const q = SOCIOS.quotas.find(x=>x.id===$("#sQuota").value);
    const contacto = $("#sContacto").value.trim();
    const linhas = [
      novo ? `Olá! Gostaria de me inscrever como sócio do ADC Sanguedo (época ${SOCIOS.epoca}):`
           : `Olá! Gostaria de renovar a minha quota de sócio (época ${SOCIOS.epoca}):`,
      !novo && `• Nº de sócio: ${$("#sNum").value.trim()}`,
      `• Nome: ${$("#sNome").value.trim()}`,
      `• Quota: ${q.nome}${q.valor?` (${q.valor})`:""}`,
      `• Pagamento: ${$("#sPagamento").value}`,
      contacto && `• Contacto: ${contacto}`,
    ];
    return linhas.filter(Boolean).join("\n");
  };
  $("#socioForm").addEventListener("submit", e=>{
    e.preventDefault();
    const assunto = $("#sTipo").value === "novo" ? "Inscrição de sócio" : "Renovação de quota";
    if (e.submitter?.value === "email") {
      window.location.href = mailLink(assunto, pedido());
      aviso($("#socioMsg"), `Se o teu programa de e-mail não abrir, envia o pedido para <a href="mailto:${esc(CLUBE.email)}">${esc(CLUBE.email)}</a> ou usa o WhatsApp.`);
    } else {
      window.open(waLink(pedido()),"_blank","noopener");
    }
  });
}

/* ---------- CONTACTOS: info + formulário ---------- */
if ($("#contactInfo")) {
  $("#contactInfo").innerHTML = `
    <div class="info__row"><span class="k">Morada</span><span>${esc(CLUBE.morada)}<br>${esc(CLUBE.localidade)}</span></div>
    <div class="info__row"><span class="k">E-mail</span><a href="mailto:${esc(CLUBE.email)}">${esc(CLUBE.email)}</a></div>
    <div class="info__row"><span class="k">Telefone</span><a href="tel:${esc(CLUBE.telefone)}">${esc(telFmt(CLUBE.telefone))}</a></div>
    <div class="info__row"><span class="k">Estádio</span><span>${esc(CLUBE.estadio)}</span></div>`;
  $("#socials").innerHTML = redesLinks();

  $("#contactForm").addEventListener("submit", e=>{
    e.preventDefault();
    const texto = `Olá! Sou ${$("#cn").value.trim()}.\n\n${$("#cm").value.trim()}`;
    if (e.submitter?.value === "email") {
      window.location.href = mailLink("Contacto pelo site", texto);
      aviso($("#contactMsg"), `Se o teu programa de e-mail não abrir, escreve-nos para <a href="mailto:${esc(CLUBE.email)}">${esc(CLUBE.email)}</a> ou usa o WhatsApp.`);
    } else {
      window.open(waLink(texto),"_blank","noopener");
    }
  });
}
