# Site do ADC Sanguedo

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
├── fonts/                ← fonte dos títulos (Oswald) + licença OFL
├── img/                  ← IMAGENS: emblema/, patrocinadores/, produtos/, fotos/ (ver img/README.md)
├── js/
│   ├── config.js         ← DADOS EDITÁVEIS (tudo o que mudas está aqui)
│   ├── site.js           ← MENU + RODAPÉ partilhados (editas num só sítio)
│   └── pages.js          ← lógica de cada página
├── favicon.svg           ← ícone do separador do navegador
├── _headers              ← cabeçalhos de segurança (Netlify / Cloudflare Pages)
├── .well-known/security.txt
└── SECURITY.md           ← postura de segurança
```

## O que editas
- **`js/config.js`**: clube, redes, **patrocínios**, **estrutura** (formação/séniores/veteranos),
  **alugueres**, produtos da loja, jogos.
- **Menu e rodapé**: em `js/site.js` (uma vez, aplica-se a todas as páginas).
- **Textos longos** (Sobre nós, etc.): diretamente no HTML da página.
- **Cores**: nos tokens no topo do `css/style.css`.
- **Emblema**: a função `crest()` no topo do `js/site.js` (troca pelo oficial) e o `favicon.svg`.
- **Jogos**: os que já passaram desaparecem sozinhos, só tens de acrescentar os novos.

> **Depois de mudares o CSS ou os JS**, sobe o número `?v=2` → `?v=3` nas 6 páginas HTML
> (ex.: `css/style.css?v=3`). Assim os navegadores dos visitantes vão buscar a versão nova
> em vez de mostrarem a antiga guardada em cache.

> O menu e o rodapé são **injetados por JavaScript** para não teres de os repetir em 6
> ficheiros. Sem JS aparece um menu simples de recurso (`<noscript>` em cada página).

## Segurança
Ver `SECURITY.md`. O site é para alojar em **Netlify** ou **Cloudflare Pages**, que leem o
`_headers` (HSTS, anti-clickjacking). Se mudares a CSP, muda-a na `<meta>` das 6 páginas **e** no `_headers`.

## Próximas ideias
Notícias/blog (como 7.ª página) · plantel · área de sócios · loja com pagamento online.
