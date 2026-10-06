# Segurança do site ADC Sanguedo

## Reportar um problema
Se encontrares uma falha de segurança no site, escreve para **adcsanguedo@hotmail.com**
(ver também `/.well-known/security.txt`). Respondemos assim que possível.

## Postura do site
- **Site estático:** não há servidor, base de dados, contas nem pagamentos online.
- **Sem dados guardados por nós:** os formulários (contactos, alugueres, loja) apenas abrem o
  WhatsApp ou o programa de e-mail do visitante com a mensagem preenchida. Nada é enviado para
  um servidor do clube.
- **Carrinho da loja:** fica só no navegador do visitante (`localStorage`), nunca sai dele.
- **Sem serviços de terceiros:** fontes, scripts e imagens são todos servidos pelo próprio site
  (sem Google Fonts, sem analytics, sem cookies).
- **Content-Security-Policy restritiva** em todas as páginas: só código e estilos do próprio site,
  sem `unsafe-inline`.
- **Escape de HTML:** todo o texto vindo de `js/config.js` passa por `esc()` antes de entrar na página.
- **Cabeçalhos HTTP** (`_headers`): HSTS, anti-clickjacking (`frame-ancestors 'none'`,
  `X-Frame-Options`), `nosniff`, `Referrer-Policy` e `Permissions-Policy`.
  Funcionam no Netlify e no Cloudflare Pages.

## Manutenção
- Renovar a data `Expires` do `security.txt` todos os anos.
- Ao acrescentar algo externo (ex.: mapa, formulário Formspree), atualizar a CSP **nos dois sítios**:
  na `<meta>` de cada página HTML e no `_headers`.
