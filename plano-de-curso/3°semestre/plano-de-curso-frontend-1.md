# Plano de Curso: Programação Front-End I (20 Semanas)

**Unidade Curricular:** Programação Front-End (Etapa 1)  
**Carga Horária Total:** 75 horas  
**Carga Semanal:** 5 horas/semana (20 Semanas)  
**Módulo:** Módulo Específico I — 3º Semestre  
**Foco:** JavaScript Moderno aplicado ao Navegador, Manipulação Dinâmica do DOM, Eventos, Web Storage (LocalStorage), Recursos e APIs do Navegador (Canvas, Câmera, Geolocalização), Introdução a SPAs com React e Vite, Componentes, Props e Estado Local (`useState`).  
**Ferramentas e Recursos:** VS Code, Navegadores Modernos (DevTools), Node.js, Vite, React, JavaScript ES6+, Git, GitHub.

---

## ⚡ Módulo 1: JavaScript Moderno e Manipulação do DOM (Semanas 1 a 5)

* **Semana 01: Revisão do JavaScript e o Ecossistema do Navegador**
  * O papel do JavaScript na tríade do Front-End (HTML, CSS e JS).
  * O objeto global `window` e a árvore do documento: `document` (DOM - Document Object Model).
  * Métodos modernos de seleção de elementos: `querySelector` e `querySelectorAll`.
* **Semana 02: Manipulação Dinâmica de Elementos e Conteúdos**
  * Alterando textos e HTML: `textContent`, `innerText` e `innerHTML` (e cuidados contra XSS).
  * Criação e inserção de novos nós no DOM: `createElement`, `appendChild`, `append`, `remove`.
  * Manipulação dinâmica de atributos e estilos inline (`classList.add`, `classList.remove`, `classList.toggle`).
* **Semana 03: Eventos do Navegador e Interatividade do Usuário**
  * O modelo de eventos e escutas com `addEventListener`.
  * Eventos de mouse (`click`, `dblclick`, `mousemove`), teclado (`keydown`, `keyup`) e formulário (`submit`, `change`, `input`).
  * O objeto do evento (`event`), prevenindo comportamentos padrão (`event.preventDefault()`) e propagação (Event Bubbling).
* **Semana 04: Validação de Formulários com JavaScript**
  * Captura e validação dinâmica de dados digitados em tempo real.
  * Exibição de mensagens visuais de erro e estados de sucesso.
  * Formatação de máscaras de campos (ex: CPF, Telefone, CEP) com manipulação de strings e Regex.
* **Semana 05: Prática de DOM — Construindo um CRUD Dinâmico na Página**
  * Construção de uma aplicação prática sem recarregamento (ex: Gerenciador de Despesas ou Lista de Tarefas).
  * Criação, listagem, exclusão e alteração de itens diretamente nos nós HTML.

---

## 💾 Módulo 2: Armazenamento no Navegador e APIs da Web (Semanas 6 a 10)

* **Semana 06: Persistência no Navegador com Web Storage**
  * Diferença entre Cookies, `sessionStorage` e `localStorage`.
  * Métodos do `localStorage`: `setItem`, `getItem`, `removeItem`, `clear`.
  * Salvando coleções complexas com serialização JSON (`JSON.stringify` e `JSON.parse`).
  * Prática: Tornando o CRUD de tarefas persistente mesmo ao fechar ou atualizar o navegador.
* **Semana 07: Programação Assíncrona no Front-End**
  * Como a web lida com operações demoradas: Event Loop, Callbacks e o surgimento das Promises.
  * A sintaxe moderna `async` / `await` e tratamento de falhas com `try... catch`.
  * Introdução à função nativa `fetch()` para requisições de rede.
* **Semana 08: Consumo de APIs Públicas (Método GET)**
  * Como o front-end conversa com servidores remotos.
  * Consumindo dados de APIs reais (ex: ViaCEP para autopreenchimento de endereço, PokéAPI ou API de Clima).
  * Tratamento de estados de carregamento (Loading) e mensagens de erro amigáveis para o usuário.
* **Semana 09: Gráficos e Desenho Interativo com HTML5 Canvas**
  * A tag `<canvas>` e o contexto 2D (`getContext('2d')`).
  * Desenhando formas geométricas: retângulos, círculos, linhas e textos.
  * Renderização de gráficos de barras simples gerados dinamicamente a partir de dados numéricos.
* **Semana 10: Recursos Nacionais do Navegador (Geolocalização, Câmera e Drag & Drop)**
  * API de Geolocalização (`navigator.geolocation.getCurrentPosition`): capturando latitude e longitude com permissão.
  * Acesso à Câmera com `navigator.mediaDevices.getUserMedia()` e exibição em elemento `<video>`.
  * Eventos nativos de Arrastar e Soltar (HTML5 Drag and Drop API: `dragstart`, `dragover`, `drop`).

---

## ⚛️ Módulo 3: O Paradigma de Componentes e Introdução ao React (Semanas 11 a 15)

* **Semana 11: Por que usar Frameworks/Bibliotecas? Introdução ao React**
  * As limitações da manipulação direta do DOM em aplicações de grande porte.
  * O que é o React, o conceito de Virtual DOM e a arquitetura SPA (Single Page Application).
  * Criação do primeiro projeto React moderno utilizando a ferramenta de build rápida **Vite**.
* **Semana 12: A Sintaxe JSX e a Estrutura de Componentes**
  * O que é JSX (JavaScript XML) e suas regras essenciais (uma única tag raiz, `className` em vez de `class`, tags autofechadas).
  * Criação de Componentes Funcionais reutilizáveis.
  * Interpolação de variáveis e expressões JavaScript dentro do JSX com chaves `{}`.
* **Semana 13: Propriedades de Componentes (`props`)**
  * Passagem de dados de componentes pais para componentes filhos através de `props`.
  * Desestruturação de props na assinatura da função do componente.
  * Uso de `props.children` para componentes de container/layout (ex: Card, Modal).
* **Semana 14: Gerenciamento de Estado Local com o Hook `useState`**
  * O que é Estado (State) e por que variáveis normais não re-renderizam a tela.
  * A sintaxe do Hook `useState`: valor atual e função atualizadora (`const [count, setCount] = useState(0)`).
  * Prática: Construção de um componente de contador interativo e formulário controlado.
* **Semana 15: Renderização Condicional no React**
  * Exibindo e ocultando elementos na interface.
  * Técnicas: Operador ternário (`condicao ? <ComponenteA /> : <ComponenteB />`) e operador lógico AND (`condicao && <Elemento />`).
  * Prática: Alternando estados visuais de login/logout ou abas de conteúdo.

---

## 🎨 Módulo 4: Listas, Estilização e Projeto Integrador (Semanas 16 a 20)

* **Semana 16: Renderização de Listas e a Propriedade `key`**
  * Mapeando coleções de dados para JSX com a função `.map()`.
  * Por que o React exige a propriedade `key` única em listas e como o algoritmo de reconciliação a utiliza.
  * Filtragem dinâmica de listas na interface com base no que o usuário digita.
* **Semana 17: Estilização em Componentes React**
  * Comparativo de abordagens: CSS Tradicional, CSS Modules (`Componente.module.css`) e introdução a utilitários modernos (Tailwind CSS).
  * Estilização condicional baseada no estado do componente.
* **Semana 18: Arquitetura e Organização de Pastas em Projetos React**
  * Boas práticas na estrutura de pastas (`src/components`, `src/assets`, `src/utils`).
  * Separação de componentes "burros" (presentational) de componentes "inteligentes" (com estado).
* **Semana 19: Desenvolvimento do Projeto Integrador de Front-End I**
  * Construção de uma SPA interativa completa em React/Vite (ex: Catálogo de Filmes/Produtos ou Gerenciador de Tarefas com LocalStorage).
  * Acompanhamento docente e refinamento da componentização e estado.
* **Semana 20: Apresentação do Projeto e Encerramento da Etapa 1**
  * Apresentação da SPA desenvolvida pela turma.
  * Publicação na plataforma Vercel ou Netlify em poucos cliques.
  * Alinhamento para a Etapa 2 (4º Semestre): React Router, Hooks avançados, Context API e integração total com a API Back-End.
