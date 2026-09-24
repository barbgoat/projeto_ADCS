# ADC Sanguedo — Site do Clube

Site oficial da **Associação Desportiva e Cultural de Sanguedo**. Multi-página, estático.

## Como ver o site
Abre `index.html` no navegador. Para testar como em produção (com a CSP ativa), corre um
servidor local e abre `http://localhost:8000`:
```
python3 -m http.server 8000
```

## Páginas
| Ficheiro | Página |
|---|---|
| `index.html` | Início (emblema + história curta, patrocínios, redes sociais) |
| `sobre.html` | Sobre nós |
| `estrutura.html` | Estrutura (Formação · Séniores · Veteranos) |
| `loja.html` | Loja |
| `alugueres.html` | Alugueres de Campo (Fut 7) |
| `contactos.html` | Contactos |

## Estrutura
```
adc-sanguedo/
├── *.html               ← as 6 páginas (só a estrutura de cada uma)
├── css/style.css         ← todo o visual
├── js/
│   ├── config.js         ← DADOS EDITÁVEIS (tudo o que mudas está aqui)
│   ├── site.js           ← MENU + RODAPÉ partilhados (editas num só sítio)
│   └── pages.js          ← lógica de cada página
├── _headers              ← cabeçalhos de segurança (Netlify / Cloudflare Pages)
├── .well-known/security.txt
├── SECURITY.md           ← postura de segurança
└── dist/index.html       ← versão combinada num ficheiro (só para a pré-visualização)
```

## O que editas
- **`js/config.js`** — clube, redes, **patrocínios**, **estrutura** (formação/séniores/veteranos),
  **alugueres**, produtos da loja, jogos.
- **Menu e rodapé** — em `js/site.js` (uma vez, aplica-se a todas as páginas).
- **Textos longos** (Sobre nós, etc.) — diretamente no HTML da página.
- **Cores** — nos tokens no topo do `css/style.css`.
- **Emblema** — a constante `CREST` no topo do `js/site.js` (troca pelo oficial).

> O menu e o rodapé são **injetados por JavaScript** para não teres de os repetir em 6
> ficheiros. Se um dia quiseres funcionar sem JS, passam-se para HTML em cada página.

## Segurança
Ver `SECURITY.md`. Para os cabeçalhos HTTP completos (HSTS, anti-clickjacking), aloja em
**Netlify** ou **Cloudflare Pages** — o GitHub Pages não permite cabeçalhos.

## Sobre a pasta `dist/`
A pré-visualização só aloja um ficheiro, por isso `dist/index.html` junta as páginas num só
(navegação por `#`). **Não edites o `dist/` à mão.** Em alojamento real usa a estrutura normal.

## Próximas ideias
Notícias/blog (como 7.ª página) · plantel · área de sócios · loja com pagamento online.
