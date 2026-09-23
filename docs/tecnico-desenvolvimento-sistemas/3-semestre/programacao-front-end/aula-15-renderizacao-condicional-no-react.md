---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-front-end-aula-15-renderizacao-condicional-no-react
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-front-end/aula-15-renderizacao-condicional-no-react
sidebar_position: 15
title: "Aula 15 — Renderização Condicional no React"
description: Controle a exibição de componentes e fragmentos de interface utilizando operadores lógicos, ternários e retornos antecipados.
---

# Aula 15 — Renderização Condicional no React

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender as técnicas idiomáticas do React para exibir, ocultar ou alternar componentes e elementos visuais na interface com base no estado atual da aplicação, dominando o operador ternário, o operador lógico `&&` (curto-circuito) e retornos antecipados (*Early Return*).

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O conceito de renderização condicional declarativa no JSX.
- A técnica do Operador Ternário (`condicao ? <Verdadeiro /> : <Falso />`).
- O Operador Lógico AND (`condicao && <Elemento />`) e os cuidados com o número `0`.
- Retorno condicional antecipado da função do componente (*Early Return*).
- Alternância de abas de conteúdo (*Tabs*) e fluxos de Login / Dashboard.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

No JSX, não podemos colocar instruções `if / else` normais diretamente no meio da marcação entre as tags HTML. No lugar disso, utilizamos **expressões JavaScript avaliadas**:

### 1. Operador Ternário
Ideal para escolher entre duas opções (A ou B):
```jsx
{estaLogado ? <PainelAdmin /> : <BotaoLogin />}
```

### 2. Operador Lógico `&&` (Curto-Circuito)
Ideal para exibir algo apenas se a condição for verdadeira:
```jsx
{temNotificacao && <span className="ponto-vermelho" />}
```

> **Atenção:** Em JavaScript, `0 && <Elemento />` avalia para `0`, renderizando o número zero na tela! Para listas vazias, prefira sempre testar explicitamente o booleano: `itens.length > 0 && <Lista />`.

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como alternar entre uma tela de login e o painel logado com abas:

```jsx
import { useState } from 'react';

export default function SistemaAutenticacao() {
  const [autenticado, setAutenticado] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState('perfil'); // 'perfil' ou 'aulas'

  // Caso 1: Early Return (Se não estiver autenticado, exibe a tela de login)
  if (!autenticado) {
    return (
      <div style={{ padding: '30px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h2>Área Restrita</h2>
        <p>Você precisa se autenticar para acessar o conteúdo das aulas.</p>
        <button 
          onClick={() => setAutenticado(true)}
          style={{ padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px' }}
        >
          Entrar como Aluno
        </button>
      </div>
    );
  }

  // Caso 2: Usuário Autenticado -> Exibe Painel com Abas
  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Painel do Estudante</h3>
        <button onClick={() => setAutenticado(false)} style={{ color: 'red' }}>Sair</button>
      </header>

      {/* Navegação entre Abas */}
      <nav style={{ display: 'flex', gap: '8px', margin: '16px 0' }}>
        <button 
          onClick={() => setAbaAtiva('perfil')}
          style={{ fontWeight: abaAtiva === 'perfil' ? 'bold' : 'normal' }}
        >
          Meu Perfil
        </button>
        <button 
          onClick={() => setAbaAtiva('aulas')}
          style={{ fontWeight: abaAtiva === 'aulas' ? 'bold' : 'normal' }}
        >
          Próximas Aulas
        </button>
      </nav>

      {/* Renderização Condicional do Conteúdo da Aba */}
      {abaAtiva === 'perfil' ? (
        <div style={{ background: '#f1f5f9', padding: '16px', borderRadius: '8px' }}>
          <h4>Dados Cadastrais</h4>
          <p>Aluno: Eduardo Silva</p>
          <p>Curso: Técnico em Desenvolvimento de Sistemas</p>
        </div>
      ) : (
        <div style={{ background: '#f1f5f9', padding: '16px', borderRadius: '8px' }}>
          <h4>Horários da Semana</h4>
          <ul>
            <li>Front-End: Quarta-feira 08h</li>
            <li>Back-End: Quinta-feira 08h</li>
          </ul>
        </div>
      )}
    </div>
  );
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie um componente `<PainelNotificacoes>` contendo um array de mensagens.
2. Se o array estiver vazio (`mensagens.length === 0`), exiba um card com ícone e o texto: *"Nenhuma notificação recente no momento"*.
3. Se houver itens, exiba uma lista não-ordenada com as mensagens e um botão "Marcar todas como lidas" que limpa o estado.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Uso do operador ternário para alternar entre estados mutuamente exclusivos.
- [ ] Uso do operador `&&` para exibição condicional de alertas simples.
- [ ] Implementação de navegação entre abas ou telas sem recarregar a página.
- [ ] Prevenção de renderização indesejada do valor numérico `0`.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione um alerta de confirmação: antes de alternar o estado para deslogar (`setAutenticado(false)`), abra um diálogo visual pedindo confirmação com "Sim, sair" e "Cancelar"!
