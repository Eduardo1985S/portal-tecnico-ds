---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-front-end-aula-04-rotas-protegidas-e-controle-de-acesso
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-front-end/aula-04-rotas-protegidas-e-controle-de-acesso
sidebar_position: 4
title: "Aula 04 — Rotas Protegidas e Controle de Acesso"
description: Proteja páginas confidenciais e dashboards impedindo o acesso de usuários não autenticados com componentes de guarda de rotas.
---

# Aula 04 — Rotas Protegidas e Controle de Acesso

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a implementar mecanismos de segurança na camada de roteamento do front-end, criando componentes de guarda (*Route Guards / Protected Routes*) para restringir o acesso a dashboards e telas restritas, redirecionando usuários não autenticados para a página de Login e preservando o histórico para retorno após autenticação.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O conceito de autenticação client-side em SPAs.
- Criação de um componente de ordem superior (*Wrapper Component*) para proteção de rotas.
- O componente `<Navigate to="..." replace />` do React Router.
- Verificação de token de acesso (armazenado em memória ou `localStorage`).
- Preservação da rota de origem usando o hook `useLocation` e o atributo `state`.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Em uma SPA, qualquer pessoa pode digitar `/admin` na barra de endereços do navegador. Uma rota desprotegida mostraria a tela confidencial antes mesmo de validar com o servidor!

Para evitar isso, encapsulamos as rotas sensíveis dentro de um componente de proteção:

```text
[ Usuário digita /admin ]
            │
            ▼
[ Rota Protegida (Guarda de Rota) ]
            │
   ¿Usuário possui token?
     ├── SIM  ──> Renderiza <Outlet /> (Acesso concedido ao Painel)
     └── NÃO  ──> Redireciona via <Navigate to="/login" replace />
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como construir o componente `RotaProtegida` e aplicá-lo na árvore de rotas:

```jsx
// src/components/RotaProtegida.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export function RotaProtegida() {
  const location = useLocation();

  // Simulação de verificação de autenticação (ex: token JWT no LocalStorage)
  const token = localStorage.getItem('@app_token');

  if (!token) {
    // Redireciona para o login e salva a página que ele tentou acessar
    return <Navigate to="/login" state={{ de: location }} replace />;
  }

  // Se estiver autenticado, renderiza a página filha solicitada
  return <Outlet />;
}

// src/pages/Login.jsx
import { useNavigate, useLocation } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // Verifica se havia uma página de origem salva antes do redirect
  const destino = location.state?.de?.pathname || '/dashboard';

  function efetuarLogin() {
    // Simula gravação do token após autenticação bem-sucedida
    localStorage.setItem('@app_token', 'token_jwt_valido_xyz123');
    // Redireciona para onde o usuário queria ir antes do bloqueio
    navigate(destino, { replace: true });
  }

  return (
    <div style={{ padding: '30px', textAlign: 'center' }}>
      <h2>Acesso Restrito ao Sistema</h2>
      <p>Você precisa estar logado para continuar.</p>
      <button onClick={efetuarLogin} style={{ padding: '10px 24px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px' }}>
        Efetuar Login
      </button>
    </div>
  );
}

// src/routes.jsx
import { createBrowserRouter } from 'react-router-dom';
import { RotaProtegida } from './components/RotaProtegida';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Configuracoes } from './pages/Configuracoes';

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    element: <RotaProtegida />, // Wrapper que bloqueia todas as rotas filhas
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/configuracoes', element: <Configuracoes /> }
    ]
  }
]);
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie uma página `/dashboard` contendo dados de métricas (número de alunos, turmas, notas).
2. Crie o componente `RotaProtegida.jsx` que lê a chave `@usuario_logado` do `localStorage`.
3. Teste o comportamento:
   - Abra uma aba anônima e tente acessar `http://localhost:5173/dashboard`. Verifique que você é imediatamente chutado para `/login`.
   - Clique no botão "Logar", verifique a gravação do token e certifique-se de que o acesso ao `/dashboard` é liberado.
   - Adicione um botão "Sair / Logout" que remove o token e recarrega para testar a re-proteção.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Componente `RotaProtegida` utilizando `<Navigate replace />`.
- [ ] Rotas privadas agrupadas como filhas dentro do wrapper de proteção.
- [ ] Redirecionamento instantâneo caso o token não exista.
- [ ] Função de Logout limpando o token e invalidando a sessão.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione controle de níveis de acesso (*Role-Based Access Control*): permita que usuários com papel `aluno` vejam o `/dashboard`, mas apenas usuários com papel `coordenador` possam acessar a rota `/coordenacao`!
