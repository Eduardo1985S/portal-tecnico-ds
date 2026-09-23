---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-front-end-aula-09-context-api-estado-global
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-front-end/aula-09-context-api-estado-global
sidebar_position: 9
title: "Aula 09 — O Problema do Prop Drilling e Context API"
description: Elimine o repasse excessivo de propriedades e centralize estados compartilhados globalmente com a Context API do React.
---

# Aula 09 — O Problema do Prop Drilling e Context API

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender o problema do **Prop Drilling** em aplicações complexas, entender como a arquitetura da **Context API** nativa do React resolve o compartilhamento de dados transversais e construir um **Contexto de Autenticação (`AuthContext`)** que disponibiliza o usuário logado e métodos de `login()` e `logout()` para qualquer componente da árvore sem intermediários.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O que é Prop Drilling e por que repassar props através de 5 níveis de componentes prejudica o código.
- A tríade da Context API: `createContext()`, `<Context.Provider value={...}>` e o hook `useContext()`.
- Criação de um Custom Hook de conveniência: `useAuth()`.
- Gerenciamento global de autenticação: usuário conectado, token e permissões.
- Sincronização entre o estado global em memória e a persistência em `localStorage`.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Imagine que você precisa exibir o nome do usuário logado no componente `<AvatarUsuario>`, que fica dentro de `<MenuSuperior>`, que fica dentro de `<Navbar>`, que fica dentro de `<App>`:

```text
COM PROP DRILLING (Doloroso e frágil):
[ App ]  ──(prop: usuario)──>  [ Navbar ]  ──(prop: usuario)──>  [ MenuSuperior ]  ──(prop: usuario)──>  [ AvatarUsuario ]
(Navbar e MenuSuperior nem usam o usuário, só repassam adiante!)

COM CONTEXT API (Teletransporte de Dados):
[ AuthContext.Provider (Armazena: usuario, login, logout) ]
                     │
                     │  (Disponível globalmente para qualquer componente)
                     ▼
             [ AvatarUsuario ] ──> const { usuario } = useAuth();
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como construir um contexto de autenticação completo e reutilizável:

```jsx
// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

// 1. Cria o contexto
const AuthContext = createContext({});

// 2. Cria o Provedor do Contexto
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Lê a sessão salva ao inicializar a aplicação
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('@app:usuario');
    const tokenSalvo = localStorage.getItem('@app:token');

    if (usuarioSalvo && tokenSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
    setCarregando(false);
  }, []);

  function login(dadosUsuario, token) {
    setUsuario(dadosUsuario);
    localStorage.setItem('@app:usuario', JSON.stringify(dadosUsuario));
    localStorage.setItem('@app:token', token);
  }

  function logout() {
    setUsuario(null);
    localStorage.removeItem('@app:usuario');
    localStorage.removeItem('@app:token');
  }

  return (
    <AuthContext.Provider value={{ usuario, estaAutenticado: !!usuario, login, logout, carregando }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Custom Hook para consumo facilitado
export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return contexto;
}
```

Consumindo em um componente qualquer:

```jsx
// src/components/Header.jsx
import { useAuth } from '../contexts/AuthContext';

export function Header() {
  const { usuario, estaAutenticado, logout } = useAuth();

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 20px', background: '#1e293b', color: '#fff' }}>
      <h2>Portal SESI SENAI</h2>
      <div>
        {estaAutenticado ? (
          <>
            <span>Olá, <strong>{usuario.nome}</strong> ({usuario.perfil}) </span>
            <button onClick={logout} style={{ marginLeft: '10px' }}>Sair</button>
          </>
        ) : (
          <span>Visitante (Não Conectado)</span>
        )}
      </div>
    </header>
  );
}
```

No `src/main.jsx`, basta envolver a aplicação com o `<AuthProvider>`:

```jsx
<AuthProvider>
  <RouterProvider router={router} />
</AuthProvider>
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie a pasta `src/contexts/` e implemente o `AuthContext.jsx`.
2. Envolva o roteador no `main.jsx` com o `<AuthProvider>`.
3. Atualize o componente `<Header>` para exibir os dados do usuário conectado.
4. Crie uma tela de Login que chama a função `login({ nome: 'Seu Nome', email: 'aluno@senai.br', perfil: 'Aluno' }, 'token-jwt-123')` e veja o cabeçalho atualizar instantaneamente!

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Criação do contexto com `createContext()`.
- [ ] Componente Provedor (`AuthProvider`) gerenciando o estado e renderizando `children`.
- [ ] Criação do custom hook `useAuth()` com validação de escopo.
- [ ] Consumo de dados e funções em componentes em níveis profundos sem repasse de props intermediárias.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Integre o `useAuth()` diretamente com o componente `RotaProtegida.jsx`: substitua a leitura manual do `localStorage` pelo booleano reativo `estaAutenticado` retornado pelo contexto!
