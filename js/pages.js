/* ============================================================
   pages.js — lógica de cada página (cada bloco corre só onde existe)
   Depende de site.js (esc, $, eur) e de config.js (dados).
   ============================================================ */

// Camisola em SVG (usada na loja)
function jersey(estilo){
  const stripes = estilo==="listada"
    ? `<rect x="26" y="28" width="8" height="64" fill="#000"/><rect x="42" y="28" width="8" height="64" fill="#000"/><rect x="58" y="28" width="8" height="64" fill="#000"/><rect x="74" y="28" width="8" height="64" fill="#000"/>`
    : "";
  const accent = estilo==="treino" ? `<rect x="18" y="60" width="72" height="6" fill="#B58A2E"/>` : "";
  return `<svg viewBox="0 0 108 108" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#000" stroke-width="3" stroke-linejoin="round"><path d="M40 14 L18 26 L10 44 L22 52 L26 44 L26 96 L82 96 L82 44 L86 52 L98 44 L90 26 L68 14 C64 22 44 22 40 14Z" fill="#fff"/></g>
    <g>${stripes}${accent}</g>
    <path d="M40 14 C44 22 64 22 68 14" fill="none" stroke="#000" stroke-width="3"/></svg>`;
}

/* ---------- INÍCIO: patrocínios + redes ---------- */
if ($("#patrocinios")) {
  $("#patrocinios").innerHTML = PATROCINIOS.map(p=>{
    const inner = `<span class="spon__name">${esc(p.nome)}</span>`;
    return p.url
      ? `<a class="spon" href="${esc(p.url)}" target="_blank" rel="noopener">${inner}</a>`
      : `<div class="spon spon--empty">${inner}</div>`;
  }).join("") + `<a class="spon spon--cta" href="contactos.html"><span class="spon__name">Quer ser patrocinador?</span></a>`;
}
if ($("#redes")) {
  const item = (href,label,icon) => `<a class="social-tile" href="${esc(href)}" ${href.startsWith("mailto")?"":'target="_blank" rel="noopener"'} aria-label="${label}">${icon}<span>${label}</span></a>`;
  $("#redes").innerHTML =
    item(REDES.instagram,"Instagram",ICON.instagram) +
    item(REDES.facebook,"Facebook",ICON.facebook) +
    item("mailto:"+REDES.email,"E-mail",ICON.email) +
    item(REDES.tiktok,"TikTok",ICON.tiktok);
}

/* ---------- ESTRUTURA: formação / séniores / veteranos ---------- */
if ($("#escaloes")) {
  $("#escaloes").innerHTML = ESTRUTURA.formacao.escaloes.map(e=>
    `<div class="esc"><b>${esc(e.nome)}</b><span>${esc(e.faixa)}</span></div>`).join("");
}
function factos(sel, arr){
  const el = $(sel); if(!el) return;
  el.innerHTML = arr.map(f=>`<div class="facto"><span class="k">${esc(f.k)}</span><span class="v">${esc(f.v)}</span></div>`).join("");
}
factos("#seniores-factos", ESTRUTURA.seniores.factos);
factos("#veteranos-factos", ESTRUTURA.veteranos.factos);
if ($("#seniores-jogos") && typeof JOGOS!=="undefined") {
  const MESES=["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"];
  const futuros=[...JOGOS].sort((a,b)=>new Date(a.data)-new Date(b.data));
  $("#seniores-jogos").innerHTML = futuros.map(j=>{
    const d=new Date(j.data), adv=esc(j.adversario);
    const c=j.casa?`Sanguedo vs ${adv}`:`${adv} vs Sanguedo`;
    return `<div class="fx"><div class="fx__date"><div class="d">${d.getDate()}</div><div class="m">${MESES[d.getMonth()]}</div></div>
      <div class="fx__main"><b>${c}</b><span>${esc(j.competicao)} · ${d.toLocaleTimeString("pt-PT",{hour:"2-digit",minute:"2-digit"})}</span></div>
      <div class="fx__ha ${j.casa?"casa":""}">${j.casa?"Casa":"Fora"}</div></div>`;
  }).join("");
}

/* ---------- LOJA: produtos + carrinho ---------- */
if ($("#shopGrid")) {
  $("#shopGrid").innerHTML = PRODUTOS.map(p=>`
    <article class="product">
      <div class="product__img">${jersey(p.estilo)}</div>
      <div class="product__b">
        <h3>${esc(p.nome)}</h3>
        <p class="desc">${esc(p.desc)}</p>
        <div class="product__price">${eur(p.preco)}</div>
        <div class="row2">
          <div class="field"><label>Tamanho</label><select data-size="${p.id}">${TAMANHOS.map(t=>`<option>${esc(t)}</option>`).join("")}</select></div>
          <div class="field"><label>Quantidade</label><input type="number" min="1" value="1" data-qty="${p.id}" /></div>
        </div>
        <div class="perso row2">
          <div class="field"><label>Nome (costas)</label><input maxlength="20" placeholder="opcional" data-name="${p.id}" /></div>
          <div class="field"><label>Número</label><input maxlength="3" placeholder="opcional" inputmode="numeric" data-num="${p.id}" /></div>
        </div>
        <button class="btn btn--solid" data-add="${p.id}">Adicionar à encomenda</button>
      </div>
    </article>`).join("");

  let carrinho = [];
  const openCart = () => { $("#cart").classList.add("open"); $("#overlay").classList.add("open"); };
  const closeCart = () => { $("#cart").classList.remove("open"); $("#overlay").classList.remove("open"); };
  $("#cartBtn") && ($("#cartBtn").onclick = openCart);
  $("#cartClose").onclick = closeCart;
  $("#overlay").onclick = closeCart;
  document.addEventListener("keydown", e=>{ if(e.key==="Escape") closeCart(); });

  $$("[data-add]").forEach(btn => btn.addEventListener("click", () => {
    const id=btn.dataset.add, p=PRODUTOS.find(x=>x.id===id);
    const size=$(`[data-size="${id}"]`).value;
    const qty=Math.max(1, parseInt($(`[data-qty="${id}"]`).value)||1);
    const nome=$(`[data-name="${id}"]`).value.trim().slice(0,20);
    const num=$(`[data-num="${id}"]`).value.trim().replace(/\D/g,"").slice(0,3);
    carrinho.push({ produto:p.nome, estilo:p.estilo, preco:p.preco, size, qty, nome, num });
    renderCart(); openCart();
  }));

  function renderCart(){
    $("#cartCount").textContent = carrinho.reduce((s,i)=>s+i.qty,0);
    if(!carrinho.length){
      $("#cartItems").innerHTML = `<p class="cart__empty">A encomenda está vazia.<br>Escolhe uma camisola na loja.</p>`;
    } else {
      $("#cartItems").innerHTML = carrinho.map((i,idx)=>`
        <div class="citem"><div class="citem__thumb">${jersey(i.estilo)}</div>
          <div class="citem__info"><b>${esc(i.produto)}</b>
            <span>Tam. ${esc(i.size)} · Qtd ${i.qty}${i.nome?` · ${esc(i.nome)}`:""}${i.num?` #${esc(i.num)}`:""}</span><br>
            <span>${eur(i.preco*i.qty)}</span></div>
          <button class="citem__x" data-rm="${idx}" aria-label="Remover">✕</button></div>`).join("");
      $$("[data-rm]").forEach(b=>b.onclick=()=>{ carrinho.splice(+b.dataset.rm,1); renderCart(); });
    }
    $("#cartTotal").textContent = eur(carrinho.reduce((s,i)=>s+i.preco*i.qty,0));
  }
  renderCart();

  function resumo(){
    const l=carrinho.map(i=>`• ${i.qty}x ${i.produto} (Tam. ${i.size}${i.nome?`, ${i.nome}`:""}${i.num?` #${i.num}`:""}) — ${eur(i.preco*i.qty)}`);
    return `Olá! Gostaria de encomendar:\n${l.join("\n")}\n\nTotal: ${eur(carrinho.reduce((s,i)=>s+i.preco*i.qty,0))}`;
  }
  $("#checkoutWa").addEventListener("click", e=>{
    if(!carrinho.length){ e.preventDefault(); return; }
    window.open(`https://wa.me/${CLUBE.telefone.replace(/\D/g,"")}?text=${encodeURIComponent(resumo())}`,"_blank","noopener");
  });
  $("#checkoutMail").addEventListener("click", ()=>{
    if(!carrinho.length) return;
    window.location.href = `mailto:${CLUBE.email}?subject=${encodeURIComponent("Nova encomenda — loja do clube")}&body=${encodeURIComponent(resumo())}`;
  });
}

/* ---------- ALUGUERES: condições + pedido ---------- */
if ($("#alugCond")) {
  $("#alugIntro").textContent = ALUGUERES.intro;
  $("#alugPreco").textContent = ALUGUERES.precoHora;
  $("#alugHorario").textContent = ALUGUERES.horario;
  $("#alugCond").innerHTML = ALUGUERES.condicoes.map(c=>`<li>${esc(c)}</li>`).join("");

  const pedido = () => {
    const nome=$("#aNome").value.trim(), tel=$("#aTel").value.trim();
    const data=$("#aData").value, hora=$("#aHora").value;
    return `Olá! Gostaria de alugar o campo de Fut 7:\n• Nome: ${nome}\n• Contacto: ${tel}\n• Data: ${data}\n• Hora: ${hora}`;
  };
  const validar = () => {
    if($("#aHp").value) return false; // honeypot
    if(!$("#aNome").value.trim() || !$("#aData").value || !$("#aHora").value){ alert("Preenche nome, data e hora."); return false; }
    return true;
  };
  $("#alugWa").addEventListener("click", ()=>{ if(!validar()) return;
    window.open(`https://wa.me/${CLUBE.telefone.replace(/\D/g,"")}?text=${encodeURIComponent(pedido())}`,"_blank","noopener"); });
  $("#alugMail").addEventListener("click", ()=>{ if(!validar()) return;
    window.location.href = `mailto:${CLUBE.email}?subject=${encodeURIComponent("Pedido de aluguer — Campo Fut 7")}&body=${encodeURIComponent(pedido())}`; });
}

/* ---------- CONTACTOS: info + formulário ---------- */
if ($("#contactInfo")) {
  $("#contactInfo").innerHTML = `
    <div class="info__row"><span class="k">Morada</span><span>${esc(CLUBE.morada)}<br>${esc(CLUBE.localidade)}</span></div>
    <div class="info__row"><span class="k">E-mail</span><a href="mailto:${esc(CLUBE.email)}">${esc(CLUBE.email)}</a></div>
    <div class="info__row"><span class="k">Telefone</span><a href="tel:${esc(CLUBE.telefone)}">${esc(CLUBE.telefone)}</a></div>
    <div class="info__row"><span class="k">Estádio</span><span>${esc(CLUBE.estadio)}</span></div>`;
  $("#socials").innerHTML = `
    <a href="${esc(REDES.instagram)}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.instagram}</a>
    <a href="${esc(REDES.facebook)}" target="_blank" rel="noopener" aria-label="Facebook">${ICON.facebook}</a>
    <a href="${esc(REDES.tiktok)}" target="_blank" rel="noopener" aria-label="TikTok">${ICON.tiktok}</a>
    <a href="mailto:${esc(REDES.email)}" aria-label="E-mail">${ICON.email}</a>`;
  $("#sendMsg").addEventListener("click", ()=>{
    if($("#hp").value) return; // honeypot
    const n=$("#cn").value.trim(), e=$("#ce").value.trim(), m=$("#cm").value.trim();
    if(!n || !m){ alert("Preenche o nome e a mensagem."); return; }
    if(e && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)){ alert("Verifica o e-mail."); return; }
    const body = encodeURIComponent(`Nome: ${n}\nE-mail: ${e}\n\n${m}`);
    window.location.href = `mailto:${CLUBE.email}?subject=${encodeURIComponent("Contacto pelo site")}&body=${body}`;
  });
}

/* ---------- INÍCIO: herói (emblema + meta) ---------- */
if ($("#heroCrest")) {
  $("#heroCrest").innerHTML = CREST;
  $("#heroKicker") && ($("#heroKicker").textContent = CLUBE.localidade);
  $("#heroMeta") && ($("#heroMeta").innerHTML =
    `<span><i>Fundado</i> ${esc(CLUBE.anoFundacao)}</span><span><i>Escalão</i> ${esc(CLUBE.escalao)}</span><span><i>Casa</i> ${esc(CLUBE.estadio)}</span>`);
  $("#statAno") && ($("#statAno").innerHTML = String(CLUBE.anoFundacao).replace(/(\d{2})(.*)/,"$1<small>$2</small>"));
}
