---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-front-end-aula-19-desenvolvimento-do-projeto-integrador-frontend-1
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-front-end/aula-19-desenvolvimento-do-projeto-integrador-frontend-1
sidebar_position: 19
title: "Aula 19 — Desenvolvimento do Projeto Integrador de Front-End I"
description: Construa uma aplicação SPA interativa completa em React integrando componentes, estados, persistência em localStorage e validações.
---

# Aula 19 — Desenvolvimento do Projeto Integrador de Front-End I

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Integrar todas as competências desenvolvidas ao longo das 18 semanas de Front-End I — componentização com JSX, fluxo de props, gerenciamento de estado local com `useState`, renderização condicional, iteração de listas com chave única e persistência no `localStorage` — construindo uma **Single Page Application (SPA)** completa e funcional.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Planejamento da arquitetura da aplicação: identificando quais componentes serão necessários e onde o estado deve residir (*Lifting State Up*).
- Implementação de um fluxo completo de ponta a ponta:
  - Cadastro de itens com validação em tempo real.
  - Listagem com filtro dinâmico por texto e categoria.
  - Alternância de status com feedback visual.
  - Persistência automática em `localStorage`.
- Revisão de código (*Code Review*) e boas práticas de UX.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

O segredo de uma aplicação React limpa é a **Elevação de Estado (Lifting State Up)**:

```text
               ┌───────────────────────┐
               │    App (Estado Raiz)  │ <── Mantém a lista e o filtro
               └───────────┬───────────┘
                 │                   │
                 ▼                   ▼
    ┌───────────────────────┐     ┌───────────────────────┐
    │   FormularioCadastro  │     │      ListaItens       │
    │  (recebe onAdicionar) │     │ (recebe itens e onRem)│
    └───────────────────────┘     └───────────────────────┘
```

Quando dois componentes irmãos precisam compartilhar a mesma lista (um para cadastrar e o outro para renderizar), o estado deve ficar no componente **Pai comum mais próximo** (`App`), e as funções modificadoras são repassadas via **props**!

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja a estrutura do hook personalizado ou do componente mestre para persistência integrada:

```jsx
// src/App.jsx
import { useState, useEffect } from 'react';

const STORAGE_KEY = '@senai_app_itens_v1';

export default function App() {
  // Inicializa o estado diretamente do LocalStorage
  const [itens, setItens] = useState(() => {
    const salvos = localStorage.getItem(STORAGE_KEY);
    return salvos ? JSON.parse(salvos) : [];
  });

  const [busca, setBusca] = useState('');

  // Salva no LocalStorage sempre que o estado sofrer mutação
  function salvarAlteracoes(novosItens) {
    setItens(novosItens);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(novosItens));
  }

  function adicionarItem(novoTitulo, novaCategoria) {
    const item = {
      id: Date.now(),
      titulo: novoTitulo,
      categoria: novaCategoria,
      concluido: false,
      criadoEm: new Date().toISOString()
    };
    salvarAlteracoes([item, ...itens]);
  }

  function alternarStatus(id) {
    const atualizados = itens.map(i => i.id === id ? { ...i, concluido: !i.concluido } : i);
    salvarAlteracoes(atualizados);
  }

  function removerItem(id) {
    const filtrados = itens.filter(i => i.id !== id);
    salvarAlteracoes(filtrados);
  }

  const itensFiltrados = itens.filter(i => 
    i.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '650px', margin: '30px auto', padding: '20px', fontFamily: 'system-ui' }}>
      <h1>Painel de Controle — Projeto Front-End I</h1>
      
      {/* Aqui são montados os componentes menores */}
      <input 
        type="text" 
        placeholder="Filtrar por nome..." 
        value={busca} 
        onChange={(e) => setBusca(e.target.value)}
        style={{ padding: '10px', width: '100%', marginBottom: '16px' }}
      />

      <p>Total de registros cadastrados: <strong>{itensFiltrados.length}</strong></p>
    </div>
  );
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Conclua a implementação do seu Projeto Integrador de Front-End I (opções de temas sugeridos):
   - **Sistema de Controle de Finanças Pessoais** (Entradas, saídas, cálculo do saldo e filtro por mês).
   - **Gerenciador de Tarefas Kanban Simples** (A Fazer, Fazendo, Concluído).
   - **Catálogo de Filmes / Séries Assistidos** (com nota de avaliação de 1 a 5 estrelas e filtro por gênero).
2. Garanta que todas as ações persistam no `localStorage`.
3. Separe o projeto em pelo menos 4 componentes modulares.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Aplicação React criada e inicializada com Vite.
- [ ] Operações completas de CRUD operando sem falhas no console.
- [ ] Persistência robusta no `localStorage`.
- [ ] Interface visual amigável e responsiva em telas pequenas.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione um modal de confirmação antes de remover itens para evitar exclusões acidentais!
