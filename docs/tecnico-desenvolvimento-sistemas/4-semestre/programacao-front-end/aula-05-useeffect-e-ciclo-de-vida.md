---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-front-end-aula-05-useeffect-e-ciclo-de-vida
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-front-end/aula-05-useeffect-e-ciclo-de-vida
sidebar_position: 5
title: "Aula 05 — O Hook useEffect e Ciclo de Vida"
description: Domine os efeitos colaterais no React compreendendo as fases de montagem, atualização e desmontagem do componente.
---

# Aula 05 — O Hook useEffect e Ciclo de Vida

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender o conceito de **Efeitos Colaterais (*Side Effects*)** no React, entender as três fases fundamentais do ciclo de vida de um componente (**Montagem / Mount**, **Atualização / Update** e **Desmontagem / Unmount**) e dominar o hook `useEffect`, seu array de dependências e a função de limpeza (*Cleanup Function*).

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O que são efeitos colaterais: requisições HTTP, timers (`setInterval`), manipuladores de eventos globais e manipulação de títulos de página.
- A anatomia do Hook: `useEffect(callback, [dependencias])`.
- As 3 variações do Array de Dependências:
  1. Sem array: Executa a cada renderização (perigoso!).
  2. Array vazio `[]`: Executa **apenas uma vez** após a montagem do componente na tela (*Mount*).
  3. Com variáveis `[variavel]`: Executa na montagem e sempre que o valor de `variavel` mudar.
- A função de limpeza (*Cleanup Function*): cancelando timers, ouvintes globais e requisições para evitar vazamentos de memória (*Memory Leaks*).

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

O React proíbe que você faça chamadas assíncronas soltas diretamente no corpo do componente, pois cada re-render dispararia uma nova requisição em loop infinito.

O `useEffect` serve para sincronizar o componente com sistemas externos:

```text
[ Renderização Inicial do Componente ]
                 │
                 ▼
[ JSX é desenhado na tela do navegador ]
                 │
                 ▼
[ useEffect é executado assincronamente ]
```

### A Função de Limpeza (Cleanup)

Se o seu componente registra um `setInterval` ou um ouvinte na janela (`window.addEventListener`), quando o usuário troca de rota o componente é desmontado (**Unmount**). Se você não limpar o ouvinte, ele continuará rodando infinitamente em segundo plano, consumindo a bateria e a memória da máquina!

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick...');
  }, 1000);

  // Retorna uma função de limpeza que o React chama ao desmontar o componente!
  return () => {
    clearInterval(timer);
    console.log('Timer cancelado com sucesso!');
  };
}, []);
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como criar um relógio digital e sincronizar o título da aba do navegador:

```jsx
import { useState, useEffect } from 'react';

export default function MonitorAtividade() {
  const [horaAtual, setHoraAtual] = useState(new Date().toLocaleTimeString());
  const [contador, setContador] = useState(0);

  // EFEITO 1: Atualiza o título da aba do navegador sempre que o contador mudar
  useEffect(() => {
    document.title = `Notificações (${contador})`;
  }, [contador]); // Executa na montagem e sempre que 'contador' for alterado

  // EFEITO 2: Registra um temporizador com limpeza obrigatória
  useEffect(() => {
    const intervalo = setInterval(() => {
      setHoraAtual(new Date().toLocaleTimeString());
    }, 1000);

    // CLEANUP: Executado quando o componente sair da tela
    return () => {
      clearInterval(intervalo);
    };
  }, []); // [] = Executa apenas uma vez na montagem

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', background: '#0f172a', color: '#38bdf8', borderRadius: '8px' }}>
      <h2>Painel de Monitoramento</h2>
      <p style={{ fontSize: '24px' }}>Horário: {horaAtual}</p>
      
      <p style={{ color: '#fff' }}>Cliques registrados: <strong>{contador}</strong></p>
      <button 
        onClick={() => setContador(prev => prev + 1)}
        style={{ padding: '8px 16px', background: '#38bdf8', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        Novo Alerta
      </button>
    </div>
  );
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie um componente `<Cronometro>` contendo os botões: "Iniciar", "Pausar" e "Zerar".
2. Use o `useEffect` para gerenciar o `setInterval` apenas enquanto o estado booleano `estaAtivo` for `true`.
3. Garanta que a função de retorno do efeito execute `clearInterval()` para que o cronômetro pause imediatamente e não acumule intervalos na memória.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Importação de `useEffect` a partir do pacote `'react'`.
- [ ] Uso correto do array de dependências vazio `[]` para inicializações pontuais.
- [ ] Inclusão obrigatória de todas as variáveis de estado utilizadas dentro do array de dependências.
- [ ] Retorno da função de limpeza evitando *memory leaks*.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione um ouvinte global de tecla com `window.addEventListener('keydown', aoPressionar)` dentro de um `useEffect`: ao pressionar a tecla `Espaço`, alterne entre iniciar e pausar o cronômetro, e lembre-se de remover o ouvinte com `removeEventListener` na função de cleanup!
