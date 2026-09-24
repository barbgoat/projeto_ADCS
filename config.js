/* ============================================================
   ⚙️  CONFIGURAÇÃO DO CLUBE  — o que mais vais editar está aqui
   ============================================================ */
const CLUBE = {
  anoFundacao: "19XX",                        // <-- ANO REAL de fundação
  escalao: "Futebol Distrital",
  divisao: "1.ª Divisão Distrital · A.F. Aveiro",
  localidade: "Sanguedo · Santa Maria da Feira",
  estadio: "Campo do Sanguedo",
  email: "geral@adcsanguedo.pt",              // <-- e-mail do clube
  telefone: "+351912345678",                  // <-- WhatsApp (formato internacional, sem espaços)
  morada: "Rua do Clube, Sanguedo",
};

/* 🔗 REDES SOCIAIS ------------------------------------------- */
const REDES = {
  instagram: "https://instagram.com/",        // <-- links reais
  facebook:  "https://facebook.com/",
  tiktok:    "https://www.tiktok.com/@",
  email:     "geral@adcsanguedo.pt",
};

/* 🤝 PATROCÍNIOS  — acrescenta patrocinadores (nome + link) --- */
const PATROCINIOS = [
  { nome:"Patrocinador Principal", url:"" },
  { nome:"Patrocinador Oficial",   url:"" },
  { nome:"Parceiro Local",         url:"" },
  { nome:"Parceiro Local",         url:"" },
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
    intro: "A equipa principal, o rosto competitivo do Sanguedo. Compete no futebol distrital com a ambição de subir.",
    factos: [
      { k:"Competição", v:"1.ª Divisão Distrital · A.F. Aveiro" },
      { k:"Casa",       v:"Campo do Sanguedo" },
      { k:"Objetivo",   v:"Subir de divisão" },
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
  condicoes: [
    "Marcação prévia obrigatória (sujeito a disponibilidade).",
    "Inclui balneários e iluminação.",
    "Duração mínima de 1 hora.",
    "Pagamento no local à chegada.",
  ],
};

/* 👕 PRODUTOS DA LOJA ---------------------------------------- */
const PRODUTOS = [
  { id:"principal",  nome:"Camisola Principal 25/26",  desc:"O clássico às listas preto e branco.",           preco:25, estilo:"listada" },
  { id:"alternativa",nome:"Camisola Alternativa 25/26",desc:"Fundo branco, detalhes a preto. Elegante fora.",  preco:25, estilo:"solida"  },
  { id:"treino",     nome:"Camisola de Treino",        desc:"Leve e respirável para o dia a dia do clube.",    preco:18, estilo:"treino"  },
];
const TAMANHOS = ["XS","S","M","L","XL","XXL","Criança 8","Criança 10","Criança 12"];

/* 📅 PRÓXIMOS JOGOS (mostrados na secção Séniores) ----------- */
const JOGOS = [
  { data:"2026-09-28T15:00", casa:false, adversario:"F.C. Arrifana",  competicao:"1.ª Distrital" },
  { data:"2026-10-05T16:00", casa:true,  adversario:"A.D. Ovarense",  competicao:"1.ª Distrital" },
  { data:"2026-10-12T11:00", casa:false, adversario:"S.C. Espinho B", competicao:"Taça A.F.A." },
];
