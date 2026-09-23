---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-front-end-aula-20-deploy-na-vercel-e-apresentacao-final
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-front-end/aula-20-deploy-na-vercel-e-apresentacao-final
sidebar_position: 20
title: "Aula 20 — Deploy na Vercel e Apresentação Final"
description: Publique a aplicação completa em nuvem com esteira CI/CD na Vercel e encerre a formação de Programação Front-End.
---

# Aula 20 — Deploy na Vercel e Apresentação Final

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Realizar a publicação final (*Deploy*) em produção da Single Page Application conectando o repositório do GitHub à plataforma em nuvem **Vercel** com integração e entrega contínua (**CI/CD**), configurar as variáveis de ambiente de produção, garantir o correto redirecionamento de rotas SPA no servidor (*Rewrites*) e apresentar a aplicação web completa, responsiva e integrada à banca avaliadora.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O ecossistema de hospedagem de SPAs na nuvem (Vercel, Netlify, Cloudflare Pages).
- O problema do "Erro 404 ao atualizar a página" em SPAs e a regra de reescrita (*Rewrite*) no arquivo `vercel.json`.
- Configuração de Variáveis de Ambiente de Produção (`VITE_API_URL`) no painel da Vercel.
- Esteira de CI/CD: como cada `git push` na branch `main` gera uma nova versão em produção automaticamente.
- Elaboração do `README.md` profissional para apresentação no portfólio do GitHub e LinkedIn.
- Retrospectiva da formação e consolidação do desenvolvedor técnico Full-Stack.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Um erro clássico ao publicar SPAs em servidores estáticos ocorre quando o usuário acessa diretamente `https://meu-app.vercel.app/dashboard` ou pressiona `F5` nessa tela.

Como o arquivo físico `/dashboard/index.html` não existe no servidor (já que o React gerencia as rotas internamente pelo JavaScript), o servidor da nuvem retorna um erro HTTP 404!

### A Solução: Arquivo `vercel.json`

Para resolver isso, instruímos o servidor da Vercel a redirecionar todas as requisições de URL para o arquivo raiz `index.html`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Dessa forma, o `index.html` sempre é entregue e o **React Router DOM** assume o controle e renderiza a tela correta!

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja a estrutura do arquivo de configuração para a raiz do seu projeto:

```json
// vercel.json (na raiz do projeto React)
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Configurando a Variável de Ambiente no Painel da Vercel:

1. No painel do seu projeto na Vercel, acesse **Settings** > **Environment Variables**.
2. Adicione a chave: `VITE_API_URL`.
3. Adicione o valor: a URL pública da sua API Back-End (ex: `https://api-meu-projeto.onrender.com/api`).
4. Clique em **Save**.
5. Dispare um novo deploy no menu **Deployments** > **Redeploy**.

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie o arquivo `vercel.json` na raiz do seu projeto front-end.
2. Envie o commit final para o GitHub:
   ```bash
   git add .
   git commit -m "feat: configuracao final de deploy na vercel e rewrites"
   git push origin main
   ```
3. Conecte o repositório na plataforma Vercel e aguarde a finalização do build.
4. Teste a aplicação ao vivo na URL pública:
   - Navegue até a tela de Dashboard e dê um `F5` (recarregue a página) para comprovar que o erro 404 não acontece.
   - Faça login com uma conta real e comprove a comunicação com o banco de dados.
   - Teste o tema escuro (Dark Mode) e o design responsivo no celular.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Arquivo `vercel.json` configurado com regras de rewrite para SPAs.
- [ ] Variável de ambiente `VITE_API_URL` configurada no painel da Vercel.
- [ ] Link público HTTPS gerado e totalmente funcional.
- [ ] Aplicação apresentada com sucesso demonstrando CRUD completo, autenticação JWT e acessibilidade.

---

## <i className="fa-solid fa-trophy" style={{ color: 'var(--ifm-color-primary)' }}></i> Conclusão da Formação em Front-End!

Parabéns! Você dominou o ciclo completo do desenvolvimento web moderno:
- **JavaScript & DOM**: Seleção, eventos, manipulação e Web Storage.
- **Ecossistema React**: Componentes, JSX, Props e Hooks (`useState`, `useEffect`).
- **Arquitetura SPA**: Roteamento client-side com React Router DOM v6 e rotas protegidas.
- **Gerenciamento de Estado**: Context API global e consumo de APIs REST com Axios.
- **Produtividade e Validação**: React Hook Form, Zod e Tailwind CSS.
- **Qualidade e Entrega**: Acessibilidade WCAG, testes com Vitest e Deploy automatizado na Vercel.

Agora você possui uma aplicação de nível sênior rodando na internet para impulsionar sua carreira profissional!
