---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-front-end-aula-02-paginas-layouts-e-outlet
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-front-end/aula-02-paginas-layouts-e-outlet
sidebar_position: 2
title: "Aula 02 — Páginas, Layouts Compartilhados e Outlet"
description: Estruture layouts mestres persistentes com Navbar e Footer utilizando rotas aninhadas e o componente Outlet do React Router.
---

# Aula 02 — Páginas, Layouts Compartilhados e Outlet

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a estruturar layouts mestres reutilizáveis (como barras de navegação superiores, barras laterais e rodapés fixos) utilizando o padrão de **Rotas Aninhadas (*Nested Routes*)** do React Router DOM e o componente especial `<Outlet />`, além de dominar a navegação declarativa com `<Link>` e `<NavLink>`.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O conceito de Rotas Aninhadas (*Nested Routes*) e layouts compartilhados.
- O componente especial `<Outlet />`: o ponto de encaixe onde as páginas filhas são renderizadas.
- Navegação declarativa: por que nunca devemos usar `<a href="...">` dentro de uma SPA.
- Os componentes `<Link to="...">` e `<NavLink to="...">`.
- Estilização automática de links ativos com `isActive` no `NavLink`.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Em uma aplicação profissional, o cabeçalho (Navbar) e o rodapé (Footer) não devem ser recarregados ou remontados sempre que o usuário troca de tela. Eles devem permanecer fixos na memória enquanto apenas o miolo da página se transforma.

Veja na arquitetura esquemática abaixo como o componente mestre **Layout / App** renderiza a barra de navegação superior fixa e delega o conteúdo dinâmico ao **`<Router Outlet />`**:

![Arquitetura de Aplicação React Moderna: Árvore de Componentes, Router Outlet e Estado](/img/react_architecture_state.jpg)

### Por que usar `<Link>` e `<NavLink>`?

Se você usar a tag comum `<a href="/sobre">`, o navegador interromperá a SPA e fará um reload completo! O componente `<Link to="/sobre">` do React Router previne o comportamento padrão e executa a transição interna sem recarregar nada.

Além disso, o `<NavLink>` permite saber dinamicamente se o link corresponde à rota atual:

```jsx
<NavLink 
  to="/cursos"
  className={({ isActive }) => isActive ? 'link-ativo' : 'link-comum'}
>
  Cursos
</NavLink>
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como criar um layout mestre com rotas aninhadas:

```jsx
// src/components/RootLayout.jsx
import { NavLink, Outlet } from 'react-router-dom';

export function RootLayout() {
  return (
    <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Header persistente */}
      <header style={{ background: '#1e293b', padding: '16px 24px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>Portal Dev SENAI</h3>
        <nav style={{ display: 'flex', gap: '16px' }}>
          <NavLink 
            to="/" 
            style={({ isActive }) => ({ color: isActive ? '#38bdf8' : '#94a3b8', textDecoration: 'none', fontWeight: 'bold' })}
          >
            Início
          </NavLink>
          <NavLink 
            to="/cursos" 
            style={({ isActive }) => ({ color: isActive ? '#38bdf8' : '#94a3b8', textDecoration: 'none', fontWeight: 'bold' })}
          >
            Cursos
          </NavLink>
        </nav>
      </header>

      {/* 2. O Outlet renderiza a página da rota atual aqui! */}
      <main style={{ flex: 1, padding: '24px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <Outlet />
      </main>

      {/* 3. Rodapé persistente */}
      <footer style={{ background: '#0f172a', color: '#64748b', textAlign: 'center', padding: '12px' }}>
        <small>© {new Date().getFullYear()} Técnico em Desenvolvimento de Sistemas</small>
      </footer>
    </div>
  );
}

// src/routes.jsx
import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './components/RootLayout';
import { Home } from './pages/Home';
import { Cursos } from './pages/Cursos';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, // Rota pai que contém o Header, Footer e <Outlet />
    children: [
      {
        index: true, // Rota padrão ao acessar '/'
        element: <Home />
      },
      {
        path: 'cursos',
        element: <Cursos />
      }
    ]
  }
]);
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie o componente `RootLayout.jsx` com cabeçalho contendo logotipo e links estilizados com `<NavLink>`.
2. Configure as rotas aninhadas dentro da propriedade `children` no arquivo `routes.jsx`.
3. Adicione pelo menos 3 telas filhas (`Home`, `Produtos`, `Contato`).
4. Verifique visualmente que, ao navegar entre os menus, o cabeçalho e o rodapé permanecem intactos enquanto apenas o miolo do `<Outlet />` se transforma.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Layout principal estruturado com o componente `<Outlet />`.
- [ ] Rotas aninhadas configuradas com a propriedade `children` no `createBrowserRouter`.
- [ ] Uso de `<NavLink>` aplicando estilos visuais destacados para a aba selecionada.
- [ ] Zero recarregamento de página (*Full Page Reload*) durante as transições de rota.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Crie uma barra lateral (*Sidebar*) no layout: posicione a barra à esquerda com links de administração e o `<Outlet />` à direita ocupando o espaço restante com Flexbox!
