# Plano de Curso: Linguagem de Marcação (20 Semanas)

**Unidade Curricular:** Linguagem de Marcação  
**Carga Horária Total:** 75 horas  
**Carga Semanal:** 5 horas/semana (20 Semanas)  
**Módulo:** Módulo Específico I — 2º Semestre  
**Ferramentas e Recursos:** VS Code, Navegadores Web (DevTools), Git, GitHub, GitHub Pages, Figma (visualização de layout), HTML5 Semântico, CSS3 Moderno, Flexbox e CSS Grid.

---

## 🏗️ Módulo 1: Fundamentos da Web e Estrutura Semântica com HTML5 (Semanas 1 a 4)

* **Semana 01: Introdução ao Desenvolvimento Web e Estrutura Básica do HTML**
  * Como a web funciona: navegador, DNS, servidor web e renderização de páginas.
  * O que são Linguagens de Marcação (HTML) vs. Linguagens de Estilo (CSS) vs. Linguagens de Programação (JS).
  * A estrutura básica de um documento HTML5: `<!DOCTYPE html>`, `<html>`, `<head>`, `<meta charset>`, `<title>`, `<body>`.
  * Criação da primeira página web e inspeção de código no navegador (F12).
* **Semana 02: Tipografia, Textos, Listas e Hierarquia de Cabeçalhos**
  * Hierarquia correta de títulos: do `<h1>` ao `<h6>` (importância para SEO e acessibilidade).
  * Parágrafos (`<p>`), quebras de linha (`<br>`), separadores (`<hr>`).
  * Formatação e ênfase textual: `<strong>`, `<em>`, `<span>`, `<blockquote>`, `<code>`.
  * Listas ordenadas (`<ol>`), listas não ordenadas (`<ul>`), listas de definição (`<dl>`) e itens (`<li>`).
* **Semana 03: Hiperlinks, Navegação e Multimídia**
  * A tag de âncora `<a>`, atributo `href`, links absolutos vs. relativos, abertura em nova aba (`target="_blank"`, `rel="noopener noreferrer"`).
  * Inserindo imagens com `<img>`, atributo `alt` (acessibilidade), caminhos relativos e formatos modernos (WebP, SVG, PNG, JPG).
  * Áudio e vídeo nativos no HTML5 com `<audio>` e `<video>` (controles e formatos).
* **Semana 04: Semântica Estrutural Moderna no HTML5**
  * Por que a "divite" (excesso de divs genéricas) prejudica a acessibilidade e o SEO.
  * Tags semânticas de layout: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
  * Prática: Estruturação semântica completa de um portal de notícias ou blog técnico sem estilização visual.

---

## 🎨 Módulo 2: Estilização Fundamental com CSS3 (Semanas 5 a 8)

* **Semana 05: Introdução ao CSS3 e Métodos de Aplicação**
  * Sintaxe do CSS: seletores, propriedades e valores.
  * Formas de incluir CSS: inline (`style="..."`), interno (`<style>`) e externo (`<link rel="stylesheet">`).
  * O papel fundamental do CSS Reset / Normalize para consistência entre navegadores.
* **Semana 06: O Modelo de Caixas (CSS Box Model)**
  * Os componentes do Box Model: `content`, `padding`, `border` e `margin`.
  * A propriedade crucial `box-sizing: border-box` e seu impacto no dimensionamento de layouts.
  * Margem com colapso (Margin Collapse) e técnicas de centralização de blocos (`margin: 0 auto`).
* **Semana 07: Seletores CSS, Herança e Cascata**
  * Seletores básicos: por tag, classe (`.`), ID (`#`), universal (`*`).
  * Seletores combinados: descendente, filho direto (`>`), irmão adjacente (`+`), atributos (`[type="text"]`).
  * Especificidade do CSS, regra de cascata e a diretiva `!important` (quando evitar).
* **Semana 08: Cores, Fundos, Tipografia e Google Fonts**
  * Modelos de cor: nomes, HEX (`#RRGGBB`), RGB/RGBA, HSL/HSLA.
  * Propriedades de texto: `font-family`, `font-size`, `font-weight`, `line-height`, `letter-spacing`, `text-align`.
  * Importação e aplicação de fontes modernas via Google Fonts (`@import` e `<link>`).
  * Fundos com gradientes lineares e radiais, imagens de fundo (`background-image`, `background-size: cover`).

---

## 📐 Módulo 3: Layouts Modernos com Flexbox e CSS Grid (Semanas 9 a 13)

* **Semana 09: Introdução ao Display e Posicionamento CSS**
  * Propriedades de display: `block`, `inline`, `inline-block`, `none`.
  * Posicionamento CSS (`position`): `static`, `relative`, `absolute`, `fixed` e `sticky`.
  * Contexto de empilhamento com `z-index`.
* **Semana 10: CSS Flexbox — Eixo Principal e Cruzado**
  * O conceito de Flex Container (`display: flex`) e Flex Items.
  * Direcionamento: `flex-direction` (row, column, row-reverse, column-reverse).
  * Alinhamento no eixo principal: `justify-content` (flex-start, center, flex-end, space-between, space-around, space-evenly).
  * Alinhamento no eixo cruzado: `align-items` e quebra de linhas com `flex-wrap`.
* **Semana 11: CSS Flexbox — Dimensionamento dos Itens**
  * Propriedades dos filhos flex: `flex-grow`, `flex-shrink`, `flex-basis` e o atalho `flex`.
  * Alinhamento individual com `align-self`.
  * Prática: Construção de uma barra de navegação responsiva e cards de produtos alinhados perfeitamente com Flexbox.
* **Semana 12: CSS Grid Layout — O Sistema Bidimensional**
  * O conceito de Grid Container (`display: grid`) e Linhas/Colunas.
  * Definindo faixas: `grid-template-columns`, `grid-template-rows` e a unidade flexível `fr`.
  * Espaçamento entre células com `gap` (row-gap, column-gap).
  * Funções utilitárias: `repeat()`, `minmax()`, `auto-fill` e `auto-fit`.
* **Semana 13: CSS Grid — Áreas Nomeadas (Grid Template Areas)**
  * Planejamento de layouts complexos com `grid-template-areas`.
  * Posicionamento semântico: `header`, `sidebar`, `main`, `footer`.
  * Comparativo prático: quando utilizar Flexbox (1D) vs. quando utilizar CSS Grid (2D).

---

## 📱 Módulo 4: Design Responsivo, Formulários e Acessibilidade (Semanas 14 a 17)

* **Semana 14: Design Responsivo e Media Queries**
  * O conceito de Mobile-First vs. Desktop-First.
  * A meta tag viewport: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
  * Sintaxe de Media Queries: `@media (min-width: ...)` e breakpoints padrão de mercado (smartphones, tablets, notebooks, desktops).
* **Semana 15: Formulários Modernos no HTML5**
  * A tag `<form>`, métodos de envio (`GET` e `POST`) e o atributo `action`.
  * Elementos de entrada: `<input>` com tipos semânticos (`text`, `email`, `password`, `number`, `tel`, `date`, `file`, `checkbox`, `radio`).
  * Elementos complementares: `<label>` (com atributo `for`), `<select>`, `<option>`, `<textarea>`, `<button>`.
  * Atributos de validação nativa: `required`, `pattern`, `minlength`, `maxlength`, `min`, `max`, `placeholder`.
* **Semana 16: Estilização Avançada de Formulários e Estados Interativos**
  * Pseudo-classes de interação: `:hover`, `:focus`, `:active`, `:visited`.
  * Pseudo-classes de formulário: `:valid`, `:invalid`, `:disabled`, `:checked`.
  * Estilização de inputs e botões personalizados sem quebrar a usabilidade.
* **Semana 17: Acessibilidade na Web (WCAG e WAI-ARIA)**
  * Princípios da acessibilidade na web (Perceptível, Operável, Compreensível, Robusto).
  * Uso de atributos ARIA (`aria-label`, `aria-expanded`, `role`) para leitores de tela.
  * Contraste de cores adequado, foco visível de teclado e navegação sem mouse.

---

## 🚀 Módulo 5: Microinterações, Publicação e Projeto Integrador (Semanas 18 a 20)

* **Semana 18: Variáveis CSS (Custom Properties) e Transições Suaves**
  * Declaração de variáveis globais no seletor `:root` (`--primary-color`, etc.).
  * Implementação de temas (Dark Mode / Light Mode) apenas com variáveis CSS e media query `@media (prefers-color-scheme: dark)`.
  * Transições suaves com `transition` (propriedade, duração, timing-function, delay).
  * Animações simples com `@keyframes` e propriedade `animation`.
* **Semana 19: Desenvolvimento do Projeto Integrador de Front-End Estático**
  * Desenvolvimento em equipe ou individual de uma Landing Page ou Website Institucional completo e profissional.
  * O projeto deve conter: HTML5 Semântico, CSS Grid / Flexbox, Formulário validado com estilos personalizados, 100% responsivo para mobile e desktop.
* **Semana 20: Apresentação do Projeto e Publicação no GitHub Pages**
  * Publicação gratuita e imediata do site utilizando o GitHub Pages.
  * Teste em dispositivos móveis reais via link publicado.
  * Avaliação das boas práticas de código, validação no W3C Validator e fechamento do semestre.
