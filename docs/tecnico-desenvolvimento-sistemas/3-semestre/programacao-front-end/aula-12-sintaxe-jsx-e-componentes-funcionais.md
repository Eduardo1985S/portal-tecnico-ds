---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-front-end-aula-12-sintaxe-jsx-e-componentes-funcionais
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-front-end/aula-12-sintaxe-jsx-e-componentes-funcionais
sidebar_position: 12
title: "Aula 12 — A Sintaxe JSX e Componentes Funcionais"
description: Domine o JSX (JavaScript XML), as regras de sintaxe essenciais e a criação de componentes funcionais modulares.
---

# Aula 12 — A Sintaxe JSX e Componentes Funcionais

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender o que é o **JSX (JavaScript XML)**, entender como ele une a marcação visual com o poder da lógica de programação e criar Componentes Funcionais modulares respeitando as regras estritas da especificação React.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O que é JSX e como o compilador (Babel/SWC) o transforma em `React.createElement`.
- As 3 regras inegociáveis do JSX:
  1. Elemento raiz único (ou o uso do Fragment `<> ... </>`).
  2. Todas as tags devem ser fechadas (`<img />`, `<br />`, `<input />`).
  3. Nomes de atributos em *camelCase* (`className`, `htmlFor`, `tabIndex`).
- Interpolação de valores JavaScript dentro da marcação usando chaves `{}`.
- O conceito de Componentes Funcionais: funções puras que retornam marcação visual.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

O JSX pode parecer com HTML, mas por baixo dos panos é **JavaScript puro**! Por isso, palavras reservadas da linguagem não podem ser usadas como atributos normais:

| HTML Tradicional | JSX no React | Motivo |
| :--- | :--- | :--- |
| `class="card"` | `className="card"` | `class` é palavra reservada em JS para classes OOP. |
| `for="email"` | `htmlFor="email"` | `for` é palavra reservada em JS para loops. |
| `style="color: red;"` | `style={{ color: 'red' }}` | Passado como um objeto literal de estilo JS. |
| `<input>` | `<input />` | No JSX todas as tags vazias devem se autofechar. |

### O React Fragment

Se um componente precisar retornar dois elementos irmãos no mesmo nível, você não precisa poluir seu HTML com uma `<div>` desnecessária. Utilize o Fragment:

```jsx
// Com Fragment transparente:
return (
  <>
    <h1>Título</h1>
    <p>Parágrafo irmão</p>
  </>
);
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como criar múltiplos componentes funcionais no mesmo projeto:

```jsx
// src/components/Header.jsx
export function Header() {
  return (
    <header className="cabecalho">
      <h2>Portal do Aluno SESI SENAI</h2>
      <hr />
    </header>
  );
}

// src/components/PerfilUsuario.jsx
export function PerfilUsuario() {
  const usuario = {
    nome: "Lucas Ferreira",
    modulo: "3º Semestre",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop"
  };

  return (
    <div className="card-perfil" style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
      <img 
        src={usuario.avatarUrl} 
        alt={usuario.nome} 
        style={{ width: '60px', height: '60px', borderRadius: '50%' }} 
      />
      <h3>{usuario.nome}</h3>
      <p>Matriculado no: <strong>{usuario.modulo}</strong></p>
    </div>
  );
}

// src/App.jsx
import { Header } from './components/Header';
import { PerfilUsuario } from './components/PerfilUsuario';

export default function App() {
  return (
    <main style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <Header />
      <PerfilUsuario />
    </main>
  );
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie uma pasta `src/components/` no seu projeto React.
2. Crie 3 componentes separados em arquivos distintos:
   - `Navbar.jsx`: Com logo e 3 links de navegação.
   - `CardCurso.jsx`: Exibindo o nome de uma disciplina técnica, carga horária e uma breve descrição.
   - `Footer.jsx`: Contendo informações de copyright e ano corrente dinâmico `{new Date().getFullYear()}`.
3. Importe os três componentes dentro de `App.jsx` e organize o layout da página.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Componentes nomeados com convenção PascalCase (`MeuComponente`).
- [ ] Exportação e importação modular com ES Modules (`export` / `import`).
- [ ] Atributos de classes CSS definidos com `className`.
- [ ] Interpolação de variáveis e expressões dinâmicas com chaves `{}`.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Crie uma expressão matemática ou ternária dentro das chaves JSX no `CardCurso.jsx` para exibir uma tag visual "Curso Intenso" caso a carga horária seja maior que 100 horas!
