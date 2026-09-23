---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-front-end-aula-13-propriedades-props-e-composicao
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-front-end/aula-13-propriedades-props-e-composicao
sidebar_position: 13
title: "Aula 13 — Propriedades (Props) e Composição de Componentes"
description: Torne seus componentes dinâmicos e reutilizáveis passando propriedades (props), desestruturação e children.
---

# Aula 13 — Propriedades (Props) e Composição de Componentes

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a parametrizar componentes React através de propriedades (**props**), permitindo reutilizar o mesmo bloco de interface com dados distintos, dominar a desestruturação de objetos na assinatura da função e criar componentes de container flexíveis com `props.children`.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O conceito de Props: passagem unidirecional de dados de pai para filho (*Top-Down Data Flow*).
- Imutabilidade das props: por que componentes nunca devem alterar suas próprias props diretamente (*Pure Functions*).
- Desestruturação elegante de props e definição de valores padrão (*Default Props*).
- A propriedade especial `props.children` para composição de layouts (Cards, Modais, Wrappers).

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

No React, os componentes funcionam de maneira análoga a funções matemáticas: recebem entradas (**props**) e produzem uma saída visual (**JSX**).

```text
[ Componente Pai: App ]
          │
     passa props: { titulo, preco, destaque }
          │
          ▼
[ Componente Filho: CardProduto ] ──> Renderiza JSX personalizado
```

### Composição com `children`

Muitas vezes queremos criar um container estilizado (como uma caixa com sombra e borda arredondada) sem nos preocuparmos com o que estará dentro dele. Para isso, utilizamos a prop especial `children`:

```jsx
export function CardContainer({ children, corBorda = '#e2e8f0' }) {
  return (
    <div style={{ border: `2px solid ${corBorda}`, borderRadius: '12px', padding: '16px' }}>
      {children}
    </div>
  );
}
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como construir um sistema de botões e cards altamente reutilizáveis:

```jsx
// src/components/Botao.jsx
export function Botao({ texto, variante = "primario", aoClicar }) {
  const estilos = {
    padding: "10px 18px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    backgroundColor: variante === "primario" ? "#2563eb" : "#e2e8f0",
    color: variante === "primario" ? "#ffffff" : "#1e293b"
  };

  return (
    <button style={estilos} onClick={aoClicar}>
      {texto}
    </button>
  );
}

// src/components/CardDisciplina.jsx
export function CardDisciplina({ titulo, professor, horas, concluida = false }) {
  return (
    <div style={{
      borderLeft: `5px solid ${concluida ? '#16a34a' : '#f59e0b'}`,
      background: '#ffffff',
      padding: '16px',
      margin: '12px 0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      borderRadius: '4px'
    }}>
      <h3 style={{ margin: '0 0 6px 0' }}>{titulo}</h3>
      <p style={{ margin: '4px 0', color: '#64748b' }}>Professor(a): {professor}</p>
      <small style={{ color: '#0284c7' }}>Carga Horária: {horas} horas</small>
    </div>
  );
}

// src/App.jsx
import { Botao } from './components/Botao';
import { CardDisciplina } from './components/CardDisciplina';

export default function App() {
  function dispararMatricula() {
    alert('Matrícula confirmada no sistema!');
  }

  return (
    <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Minhas Unidades Curriculares</h2>

      <CardDisciplina 
        titulo="Programação Front-End I" 
        professor="Eduardo" 
        horas={75} 
        concluida={false} 
      />

      <CardDisciplina 
        titulo="Programação Back-End I" 
        professor="Carlos" 
        horas={105} 
        concluida={true} 
      />

      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <Botao texto="Confirmar Inscrição" variante="primario" aoClicar={dispararMatricula} />
        <Botao texto="Cancelar" variante="secundario" aoClicar={() => console.log('Cancelado')} />
      </div>
    </div>
  );
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie um componente `<Badge texto="..." cor="..." />` que renderize uma etiqueta pequena arredondada (ex: "Em andamento", "Pendente", "Concluído").
2. Crie um componente `<CardAluno>` que receba:
   - `nome` (string)
   - `foto` (url da imagem)
   - `turma` (string)
   - `status` (string passada para o componente `<Badge>`)
3. No `App.jsx`, renderize pelo menos 3 cartões de alunos diferentes passando props variadas.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Propriedades recebidas e desestruturadas nos parâmetros do componente.
- [ ] Uso de valores padrão (*default parameters*) para props opcionais.
- [ ] Eventos repassados via props através de funções de callback (`onClick={aoClicar}`).
- [ ] Renderização reutilizada com múltiplos conjuntos de dados no `App.jsx`.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Crie um componente `<Modal>` que use `props.children` e uma prop booleana `aberto`. Se `aberto === true`, exiba o conteúdo no centro da tela com um fundo escuro semi-transparente!
