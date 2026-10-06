# Imagens e logos

Põe aqui as imagens do site. Depois de copiares o ficheiro para a pasta certa, escreve o
caminho em `js/config.js` e o site passa a usá-lo sozinho. Enquanto o campo estiver vazio
(`""`), aparece o desenho provisório.

| Pasta | O que vai lá | Onde ligar em `js/config.js` | Formato e tamanho |
|---|---|---|---|
| `emblema/` | Emblema oficial do clube | `CLUBE.emblema: "img/emblema/emblema.svg"` | **SVG** de preferência; senão PNG transparente, ~600 px de altura |
| `patrocinadores/` | Logos dos patrocinadores | `logo: "img/patrocinadores/nome.png"` em cada patrocinador | SVG ou PNG transparente, ~400 px de largura |
| `produtos/` | Fotos das camisolas da loja | `imagem: "img/produtos/principal-2526.jpg"` em cada produto | JPG ou WebP, **formato 4:3** (ex.: 1200×900), fundo neutro |
| `fotos/` | Fotos do clube (equipas, campo, história) | Para usar nas páginas mais tarde | JPG ou WebP, máx. ~1600 px de largura |

## Regras para não dar problemas
- **Nomes de ficheiro:** só minúsculas, números e hífens, sem espaços nem acentos.
  ✅ `padaria-silva.png`  ❌ `Padaria Silva Logótipo.PNG`
- **Peso:** tenta ficar abaixo de **300 KB** por imagem (o [Squoosh](https://squoosh.app) comprime bem).
- **Imagens do próprio site:** guarda sempre o ficheiro aqui. Links para imagens noutros sites
  são bloqueados pela política de segurança (CSP).
- **Direitos:** usa só logos e fotos que o clube tem autorização para publicar.
  Fotos com menores precisam de autorização dos pais (RGPD).
- **Emblema:** quando trocares o emblema, atualiza também o `favicon.svg` na raiz
  (o ícone do separador do navegador).
