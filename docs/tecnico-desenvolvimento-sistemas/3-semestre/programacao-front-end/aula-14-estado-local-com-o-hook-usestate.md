---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-front-end-aula-14-estado-local-com-o-hook-usestate
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-front-end/aula-14-estado-local-com-o-hook-usestate
sidebar_position: 14
title: "Aula 14 — Gerenciamento de Estado Local com useState"
description: Dê vida e reatividade à sua interface compreendendo o conceito de State e dominando o hook useState do React.
---

# Aula 14 — Gerenciamento de Estado Local com useState

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender o conceito fundamental de **Estado (State)** em aplicações reativas, entender por que alterações em variáveis JavaScript normais não disparam atualizações na tela e dominar o hook `useState` para criar interfaces interativas e formulários controlados.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O que são Hooks no React e suas regras fundamentais.
- O que é o Estado: a memória interna e reativa do componente.
- Anatomia do Hook: `const [valor, setValor] = useState(valorInicial)`.
- O gatilho de re-renderização disparado pela função `setValor`.
- O conceito de **Componentes Controlados** (*Controlled Components*) em inputs de formulário.
- Atualização funcional de estado baseada no valor anterior: `setContador(prev => prev + 1)`.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Em JavaScript comum, se fizermos `let contador = 0; contador++;`, o navegador não tem como saber que um número na memória mudou para atualizar a tag HTML.

No React, utilizamos o hook `useState`:

```text
[ const [contador, setContador] = useState(0) ]
                      │
            setContador(contador + 1)
                      │
                      ▼
[ React detecta a alteração de Estado ]
                      │
                      ▼
[ Dispara Nova Execução da Função do Componente (Re-render) ]
                      │
                      ▼
[ Virtual DOM atualiza apenas o número na tela! ]
```

### Regras dos Hooks

1. Só podem ser chamados no topo de **Componentes Funcionais** ou **Custom Hooks**.
2. **Nunca** chame hooks dentro de loops (`for`, `while`), condicionais (`if`) ou funções aninhadas.

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como criar um contador e um campo de texto sincronizado em tempo real:

```jsx
import { useState } from 'react';

export default function ContadorInterativo() {
  // 1. Estado numérico para o contador
  const [quantidade, setQuantidade] = useState(1);

  // 2. Estado de texto para um input controlado
  const [cupom, setCupom] = useState('');

  const precoUnitario = 150.00;
  const valorTotal = (quantidade * precoUnitario).toFixed(2);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '400px' }}>
      <h3>Carrinho de Ingressos</h3>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '16px 0' }}>
        <button 
          onClick={() => setQuantidade(prev => Math.max(1, prev - 1))}
          style={{ padding: '8px 14px', fontSize: '18px' }}
        >
          -
        </button>

        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{quantidade}</span>

        <button 
          onClick={() => setQuantidade(prev => prev + 1)}
          style={{ padding: '8px 14px', fontSize: '18px' }}
        >
          +
        </button>
      </div>

      <p>Valor Total: <strong>R$ {valorTotal}</strong></p>

      <hr />

      <label>Cupom de Desconto:</label><br />
      <input 
        type="text" 
        value={cupom} 
        onChange={(e) => setCupom(e.target.value.toUpperCase())}
        placeholder="Ex: SENAI10" 
        style={{ padding: '8px', width: '100%', marginTop: '6px' }}
      />

      {cupom && (
        <small style={{ color: '#0284c7', display: 'block', marginTop: '6px' }}>
          Cupom digitado: <strong>{cupom}</strong>
        </small>
      )}
    </div>
  );
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie um componente `<CalculadoraSimples>` que possua:
   - Dois campos numéricos controlados (`numeroA` e `numeroB`).
   - Quatro botões: Somar (+), Subtrair (-), Multiplicar (x) e Dividir (/).
   - Um estado `resultado` que armazene o valor calculado.
2. Exiba o resultado com destaque visual na interface assim que o aluno clicar em uma das operações matemáticas.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Importação de `useState` do pacote `'react'`.
- [ ] Inicialização correta de estados com tipos primitivos (número, string, booleano).
- [ ] Atribuição de valor (`value`) e escuta de alteração (`onChange`) nos inputs.
- [ ] Atualização de estado disparando re-render imediato na tela.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Crie um botão "Ver Senha / Ocultar Senha" em um campo de formulário: alterne o estado booleano `mostrarSenha` entre `true` e `false`, mudando dinamicamente o atributo `type` do `<input>` entre `"password"` e `"text"`.
