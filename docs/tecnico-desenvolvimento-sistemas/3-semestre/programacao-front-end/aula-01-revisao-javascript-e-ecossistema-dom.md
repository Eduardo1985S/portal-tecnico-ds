---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-front-end-aula-01-revisao-javascript-e-ecossistema-dom
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-front-end/aula-01-revisao-javascript-e-ecossistema-dom
sidebar_position: 1
title: "Aula 01 — Revisão do JavaScript e o Ecossistema do Navegador"
description: Entenda como os motores JavaScript executam no navegador e domine o acesso à árvore do documento através do DOM.
---

# Aula 01 — Revisão do JavaScript e o Ecossistema do Navegador

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender o papel do JavaScript na tríade clássica da Web (HTML, CSS, JS), desmistificar a arquitetura de execução nos navegadores (Engine V8, Web APIs e Event Loop) e dominar o acesso aos elementos da página através da árvore do **DOM (Document Object Model)** utilizando seletores modernos.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O papel do JavaScript moderno como linguagem client-side imperativa e reativa.
- Objetos globais do ambiente web: `window`, `document`, `navigator` e `location`.
- O que é o DOM (Document Object Model) e sua estrutura hierárquica em árvore (*Tree Nodes*).
- Seletores modernos: `document.querySelector` vs `document.querySelectorAll`.
- Iteração sobre coleções de nós (*NodeList* vs *HTMLCollection*).

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

O navegador da Web não entende comandos de programação diretamente no documento HTML; ele primeiro analisa o código HTML e constrói uma representação em memória chamada **DOM (Document Object Model)**.

### A Hierarquia do Objeto `window`

No navegador, o objeto raiz é o `window`. Tudo o que é global pertence a ele:

```text
window (Janela do Navegador)
 ├── navigator (Informações do navegador e hardware)
 ├── location  (URL atual e métodos de redirecionamento)
 ├── history   (Histórico de navegação da aba)
 └── document  (Árvore DOM da página HTML carregada)
```

### Seletores: Antigos vs Modernos

No passado utilizavam-se métodos específicos como `getElementById` e `getElementsByClassName`. Hoje, a especificação W3C padronizou os métodos de consulta via seletores CSS:

| Método | Retorno | Vantagem / Característica |
| :--- | :--- | :--- |
| `querySelector(seletor)` | O **primeiro** elemento que der match ou `null` | Suporta qualquer seletor CSS válido (`#id`, `.classe`, `input[type="text"]`, etc.). |
| `querySelectorAll(seletor)` | Uma **NodeList** estática com todos os nós encontrados | Permite utilizar métodos de iteração modernos como `.forEach()`. |

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Abra seu editor e crie o arquivo `index.html` para testar os seletores:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Explorando o DOM</title>
</head>
<body>
  <header>
    <h1 id="titulo-principal">Painel de Alunos</h1>
  </header>

  <main>
    <ul id="lista-estudantes">
      <li class="item-aluno ativo" data-matricula="101">Ana Clara</li>
      <li class="item-aluno" data-matricula="102">Bruno Santos</li>
      <li class="item-aluno ativo" data-matricula="103">Carla Dias</li>
    </ul>
  </main>

  <script>
    // 1. Selecionando elemento único por ID
    const titulo = document.querySelector('#titulo-principal');
    console.log('Título encontrado:', titulo.textContent);

    // 2. Selecionando todos os alunos com classe 'ativo'
    const alunosAtivos = document.querySelectorAll('.item-aluno.ativo');
    console.log(`Total de alunos ativos: ${alunosAtivos.length}`);

    // 3. Iterando sobre a NodeList e acessando atributos personalizados (dataset)
    alunosAtivos.forEach((el, index) => {
      const matricula = el.dataset.matricula;
      console.log(`[${index + 1}] Nome: ${el.textContent} - Matrícula: ${matricula}`);
    });
  </script>
</body>
</html>
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie uma pasta `aula-01-dom` e dentro dela um arquivo `index.html`.
2. Monte uma estrutura com um cabeçalho, um campo de busca `<input id="campo-busca">`, e uma lista de 5 produtos de informática com classes de categorias (ex: `informatica`, `perifericos`).
3. No arquivo JavaScript (embutido ou referenciado via `<script src="app.js">`):
   - Capture o input e imprima o seu `placeholder` no console do DevTools (F12).
   - Capture todos os itens de uma categoria específica usando `querySelectorAll` e imprima os nomes em letras maiúsculas no console.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Arquivo HTML válido e bem formatado com tag `<meta charset="UTF-8">`.
- [ ] Uso correto de `document.querySelector` para elementos únicos.
- [ ] Uso de `document.querySelectorAll` e `.forEach()` para percorrer múltiplos nós.
- [ ] Leitura de atributos customizados com a propriedade `dataset`.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Descubra o que a propriedade `document.title` faz ao receber um novo valor em tempo de execução via console do navegador e altere o título dinamicamente a cada 3 segundos usando `setInterval`.
