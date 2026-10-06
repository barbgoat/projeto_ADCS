/* ============================================================
   ⚙️  CONFIGURAÇÃO DO CLUBE: o que mais vais editar está aqui
   ============================================================ */
const CLUBE = {
  dataFundacao: "1975-05-02",                 // AAAA-MM-DD
  associacao: "AF Aveiro",
  presidente: "Artur Príncipe",
  marcaEquipamento: "Zemig",
  divisao: "1.ª Divisão Zona Norte · AF Aveiro",
  localidade: "Sanguedo · Santa Maria da Feira",
  estadio: "Campo de Jogos da ADC Sanguedo",
  zerozero: "https://www.zerozero.pt/equipa/sanguedo/6472",   // calendário e resultados oficiais
  email: "adcsanguedo@hotmail.com",           // <-- e-mail do clube (recebe os formulários e encomendas)
  telefone: "+351968483067",                  // <-- WhatsApp (formato internacional, sem espaços)
  morada: "Rua Professor Domingues Henriques Ferreira, nº390",
  emblema: "",                                // <-- ex.: "img/emblema/emblema.svg" (vazio = desenho provisório)
};
// Calculados a partir da data de fundação (não precisas de mexer)
CLUBE.anoFundacao = CLUBE.dataFundacao.slice(0, 4);
CLUBE.dataFundacaoExtenso = new Date(CLUBE.dataFundacao + "T00:00")
  .toLocaleDateString("pt-PT", { day:"numeric", month:"long", year:"numeric" });   // "2 de maio de 1975"

/* 🔗 REDES SOCIAIS ------------------------------------------- */
const REDES = {
  instagram: "https://www.instagram.com/adcsanguedo.oficial",
  facebook:  "https://www.facebook.com/adcsanguedo.oficial2023",
  tiktok:    "https://www.tiktok.com/@adc.sanguedo",
  email:     CLUBE.email,
};

/* 🤝 PATROCÍNIOS: acrescenta patrocinadores (nome + link + logo) ---
   logo: ex. "img/patrocinadores/padaria-silva.png" (vazio = mostra só o nome) */
const PATROCINIOS = [
  { nome:"Patrocinador Principal", url:"", logo:"" },
  { nome:"Patrocinador Oficial",   url:"", logo:"" },
  { nome:"Parceiro Local",         url:"", logo:"" },
  { nome:"Parceiro Local",         url:"", logo:"" },
];

/* 🏛️ ESTRUTURA DO CLUBE  (Formação · Séniores · Veteranos) --- */
const ESTRUTURA = {
  formacao: {
    intro: "A base do clube. Formamos jovens no desporto e como pessoas, do primeiro pontapé até à entrada nos séniores.",
    escaloes: [
      { nome:"Petizes",  faixa:"Sub-7" },
      { nome:"Traquinas",faixa:"Sub-9" },
      { nome:"Benjamins",faixa:"Sub-11" },
      { nome:"Infantis", faixa:"Sub-13" },
      { nome:"Iniciados",faixa:"Sub-15" },
      { nome:"Juvenis",  faixa:"Sub-17" },
      { nome:"Juniores", faixa:"Sub-19" },
    ],
  },
  seniores: {
    intro: "A equipa principal, o rosto competitivo do Sanguedo. Compete na 1.ª Divisão Zona Norte da AF Aveiro.",
    factos: [
      { k:"Competição", v:CLUBE.divisao },
      { k:"Casa",       v:CLUBE.estadio },
      { k:"Equipamentos", v:CLUBE.marcaEquipamento },
    ],
  },
  veteranos: {
    intro: "A memória viva do clube. Antigos jogadores que continuam a vestir o preto e branco, no desporto e no convívio.",
    factos: [
      { k:"Espírito",  v:"Convívio e camaradagem" },
      { k:"Jogos",     v:"Amigáveis e torneios de veteranos" },
      { k:"Aberto a",  v:"Antigos atletas e sócios" },
    ],
  },
};

/* 🥅 ALUGUERES DE CAMPO (Fut 7) ------------------------------ */
const ALUGUERES = {
  intro: "O campo de Futebol de 7 do clube está disponível para aluguer. Junta a malta e reserva o teu horário.",
  precoHora: "30 €/hora",                      // <-- preço real
  horario:   "Todos os dias · 9h00 às 23h00",
  horaPrimeira: "09:00",                       // primeira hora que se pode marcar
  horaUltima:   "22:00",                       // última hora de início (fecha às 23h, mínimo 1h)
  condicoes: [
    "Marcação prévia obrigatória (sujeito a disponibilidade).",
    "Inclui balneários e iluminação.",
    "Duração mínima de 1 hora.",
    "Pagamento no local à chegada.",
  ],
};

/* 🎫 SÓCIOS: quotas e pagamento -----------------------------
   Os dados de pagamento vazios ("") não aparecem no site. */
const SOCIOS = {
  intro: "Ser sócio é a forma mais direta de apoiar o clube. Renova aqui a tua quota ou inscreve-te como novo sócio.",
  epoca: "2026/27",
  quotas: [                                    // <-- VALORES DE EXEMPLO: troca pelos reais
    { id:"efetivo", nome:"Sócio efetivo", desc:"Maiores de 18 anos.",  valor:"20 € / ano" },
    { id:"jovem",   nome:"Sócio jovem",   desc:"Até aos 17 anos.",     valor:"10 € / ano" },
    { id:"senior",  nome:"Sócio sénior",  desc:"A partir dos 65 anos.", valor:"10 € / ano" },
  ],
  pagamento: {
    mbway:      "",                            // <-- nº MB WAY do clube, ex.: "912 345 678"
    iban:       "",                            // <-- IBAN do clube, ex.: "PT50 0000 0000 0000 0000 0000 0"
    titular:    "Associação Desportiva e Cultural de Sanguedo",
    presencial: "Na sede do clube ou no campo, em dias de jogo em casa.",
  },
};

/* 👕 PRODUTOS DA LOJA ----------------------------------------
   imagem: ex. "img/produtos/principal-2526.jpg" (vazio = desenho da camisola) */
const PRODUTOS = [
  { id:"principal",  nome:"Camisola Principal 25/26",  desc:"O clássico às listas preto e branco.",           preco:25, estilo:"listada", imagem:"" },
  { id:"alternativa",nome:"Camisola Alternativa 25/26",desc:"Fundo branco, detalhes a preto. Elegante fora.",  preco:25, estilo:"solida",  imagem:"" },
  { id:"treino",     nome:"Camisola de Treino",        desc:"Leve e respirável para o dia a dia do clube.",    preco:18, estilo:"treino",  imagem:"" },
];
const TAMANHOS = ["XS","S","M","L","XL","XXL","Criança 8","Criança 10","Criança 12"];

/* 📅 PRÓXIMOS JOGOS (mostrados na secção Séniores) -----------
   Copia do calendário do zerozero (link em CLUBE.zerozero).
   Os jogos já passados escondem-se sozinhos, podes deixá-los aqui.
   data: "AAAA-MM-DDTHH:MM" · casa: true = em casa, false = fora */
const JOGOS = [
  { data:"2026-10-11T15:30", casa:false, adversario:"ACRD Mosteirô",    competicao:"1.ª Divisão Zona Norte" },
  { data:"2026-10-18T15:30", casa:true,  adversario:"Real Nogueirense", competicao:"1.ª Divisão Zona Norte" },
  { data:"2026-10-25T15:30", casa:false, adversario:"Mansores",         competicao:"1.ª Divisão Zona Norte" },
];
