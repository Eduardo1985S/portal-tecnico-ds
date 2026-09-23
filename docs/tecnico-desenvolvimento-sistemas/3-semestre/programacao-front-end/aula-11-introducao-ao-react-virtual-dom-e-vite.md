---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-front-end-aula-11-introducao-ao-react-virtual-dom-e-vite
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-front-end/aula-11-introducao-ao-react-virtual-dom-e-vite
sidebar_position: 11
title: "Aula 11 — Introdução ao React, Virtual DOM e Vite"
description: Entenda as limitações do DOM tradicional, a arquitetura reativa do React com Virtual DOM e crie seu primeiro projeto com Vite.
---

# Aula 11 — Introdução ao React, Virtual DOM e Vite

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender as limitações de escalabilidade e performance da manipulação direta do DOM em grandes aplicações web, entender a arquitetura declarativa do **React**, o conceito revolucionário do **Virtual DOM** com o algoritmo de reconciliação (*diffing*) e inicializar um projeto moderno em segundos utilizando o **Vite**.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O problema da programação imperativa vs declarativa no front-end.
- O que é o React e o conceito de SPA (*Single Page Application*).
- Como funciona o **Virtual DOM** e o algoritmo de reconciliação (*Diffing*).
- Ferramentas de build modernas: por que o Vite substituiu o Create React App (CRA).
- Inicialização do projeto: Node.js, `npm create vite@latest` e estrutura de pastas gerada.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Nas aulas anteriores, manipulamos o DOM diretamente com `document.querySelector` e `innerHTML`. Em páginas simples isso funciona bem, mas em sistemas com centenas de componentes e atualizações simultâneas de dados:
1. O código vira uma teia confusa de ouvintes e seletores.
2. Cada alteração direta no Real DOM força o navegador a recalcular posições e repintar a tela (*Reflow & Repaint*), o que degrada drasticamente a performance.

### A Solução do React: O Virtual DOM

O React cria uma cópia virtual leve de toda a árvore da interface na memória RAM. Quando o estado dos dados muda:
1. O React cria uma nova árvore Virtual DOM com os novos dados.
2. Compara a árvore nova com a anterior (**Diffing Algorithm**).
3. Identifica com precisão matemática apenas os nós que realmente mudaram.
4. Aplica as mudanças no Real DOM do navegador em lote (*Batch Update*).

Veja a representação esquemática desse processo na imagem abaixo:

![Comparativo Real DOM vs React Virtual DOM](/img/dom_virtual_dom_comparativo.jpg)

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja o passo a passo para criar e iniciar seu primeiro projeto React com Vite:

```bash
# 1. Crie o projeto interativo com Vite
npm create vite@latest meu-primeiro-react -- --template react

# 2. Acesse a pasta criada
cd meu-primeiro-react

# 3. Instale as dependências do ecossistema
npm install

# 4. Inicie o servidor local de desenvolvimento ultrarrápido
npm run dev
```

Abra o arquivo `src/App.jsx` e observe como a interface é escrita de forma limpa e declarativa:

```jsx
// src/App.jsx
function App() {
  const nomeCurso = "Técnico em Desenvolvimento de Sistemas";

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>Bem-vindo ao Ecossistema React! ⚛️</h1>
      <p>Curso: <strong>{nomeCurso}</strong></p>
      <p>Construindo aplicações modernas, declarativas e de alta performance.</p>
    </div>
  );
}

export default App;
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Abra o terminal e crie seu projeto React com Vite na pasta da disciplina.
2. Execute `npm run dev` e abra o endereço exibido no navegador (`http://localhost:5173`).
3. Abra a pasta do projeto no VS Code e analise os arquivos principais:
   - `index.html`: O único arquivo HTML da SPA contendo `<div id="root"></div>`.
   - `src/main.jsx`: Ponto de entrada do JavaScript que monta o React no elemento `#root`.
   - `src/App.jsx`: Componente raiz da interface.
4. Modifique o texto do `src/App.jsx` para exibir seu nome, turma e uma lista de 3 expectativas para o semestre. Salve e observe o recurso de **Hot Module Replacement (HMR)** atualizando a tela instantaneamente!

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Projeto React criado com sucesso via Vite.
- [ ] Servidor de desenvolvimento rodando na porta local padrão 5173.
- [ ] Compreensão da árvore de arquivos (`index.html`, `main.jsx`, `App.jsx`).
- [ ] Modificação do componente raiz com Hot Reloading funcional.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Instale a extensão oficial **React Developer Tools** no Google Chrome ou Firefox e inspecione a aba "Components" para visualizar a árvore de componentes em execução!
