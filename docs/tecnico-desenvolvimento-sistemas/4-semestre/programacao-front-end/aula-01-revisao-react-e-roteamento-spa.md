---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-front-end-aula-01-revisao-react-e-roteamento-spa
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-front-end/aula-01-revisao-react-e-roteamento-spa
sidebar_position: 1
title: "Aula 01 — Revisão de React e Roteamento SPA"
description: Compreenda o conceito de roteamento client-side em Single Page Applications e configure o React Router DOM v6.
---

# Aula 01 — Revisão de React e Roteamento SPA

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Revisar os fundamentos de componentização, propriedades e estado local adquiridos na Etapa 1, compreender a diferença radical entre a navegação web tradicional com recarregamento de página e o **Roteamento no Lado do Cliente (Client-Side Routing)** em Single Page Applications (SPAs), e configurar a biblioteca **React Router DOM v6** com a API moderna de roteamento por dados.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Revisão: Componentes funcionais, props e o hook `useState`.
- Navegação tradicional (Multi-Page Apps com requisições HTTP a cada clique) vs Navegação SPA (Client-Side Routing).
- Como o navegador controla o histórico sem recarregar a tela: a History API do HTML5 (`pushState` e `popstate`).
- Instalação do pacote oficial `react-router-dom`.
- Configuração moderna do roteador com `createBrowserRouter` e `<RouterProvider />`.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Nas aplicações tradicionais, ao clicar em `<a href="/produtos">`, o navegador faz uma nova requisição ao servidor, recebe outro arquivo HTML inteiro e a tela pisca em branco.

Em uma **Single Page Application (SPA)**:
1. O navegador carrega o HTML e os scripts JavaScript uma única vez.
2. Quando o usuário clica em um link de rota, o **React Router** intercepta o evento do clique.
3. Altera a URL no navegador através de `window.history.pushState()` sem fazer reload na página.
4. Desmonta o componente da tela anterior e monta instantaneamente o componente da nova tela!

```text
Usuário clica em "Produtos"
          │
          ▼ (Interceptado pelo React Router)
Altera URL para /produtos (Sem recarregar a página!)
          │
          ▼
Substitui <Home /> por <Produtos /> no DOM instantaneamente!
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como configurar o roteador no seu projeto Vite:

```bash
# 1. Instale o React Router DOM
npm install react-router-dom
```

Crie as páginas e configure o roteador:

```jsx
// src/pages/Home.jsx
export function Home() {
  return <h2>Página Inicial — Bem-vindo ao Portal! 🏠</h2>;
}

// src/pages/Sobre.jsx
export function Sobre() {
  return <h2>Sobre Nós — Formação Técnica SESI SENAI 🚀</h2>;
}

// src/routes.jsx
import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { Sobre } from './pages/Sobre';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/sobre',
    element: <Sobre />
  }
]);

// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie um novo projeto React com Vite: `npm create vite@latest portal-spa -- --template react`.
2. Instale o pacote `react-router-dom`.
3. Crie uma pasta `src/pages/` contendo 3 páginas:
   - `Home.jsx`
   - `Cursos.jsx`
   - `Contato.jsx`
4. Configure as três rotas no arquivo `routes.jsx` e teste acessando diretamente pela URL do navegador: `http://localhost:5173/`, `http://localhost:5173/cursos` e `http://localhost:5173/contato`.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Instalação bem-sucedida do `react-router-dom`.
- [ ] Configuração do roteador via `createBrowserRouter`.
- [ ] Uso do `<RouterProvider router={router} />` no `main.jsx`.
- [ ] Navegação entre as 3 rotas alternando os componentes sem reload da página.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione uma rota `/faq` com perguntas frequentes e verifique no painel Network do DevTools que nenhuma nova requisição de página HTML é feita ao alternar entre as rotas!
