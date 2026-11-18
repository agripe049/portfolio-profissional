# Portfólio — Matheus Agripe

Portfólio pessoal de desenvolvedor full stack, com projetos reais feitos para negócios locais.

## Seções

- **Início**: apresentação, stack e links (GitHub, LinkedIn, WhatsApp)
- **Projetos**: cards com capa e modal de detalhes de cada sistema
- **Sobre**: quem sou e as tecnologias que uso
- **Contato**: formulário que envia e-mail via EmailJS

## Tecnologias

- React + Vite
- Tailwind CSS
- Framer Motion (animações)
- Lenis (rolagem suave)
- EmailJS (formulário de contato)

## Rodando localmente

```bash
npm install
cp .env.example .env   # e preencha com as chaves do EmailJS
npm run dev
```

Outros comandos:

```bash
npm run build     # gera a versão de produção em dist/
npm run preview   # serve o build localmente
npm run lint      # roda o oxlint
```

## Variáveis de ambiente

| Variável | Onde encontrar |
|---|---|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS → Email Services |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS → Email Templates |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS → Account → Public Key |

O `.env` não vai pro Git. No deploy, cadastre essas variáveis no painel da hospedagem (ex: Vercel → Settings → Environment Variables).

## Editando os projetos

Os projetos ficam em [`src/data/projects.js`](src/data/projects.js). Os campos `demo`, `repo` e `post` são opcionais: quando ficam `null`, o botão correspondente não aparece.
