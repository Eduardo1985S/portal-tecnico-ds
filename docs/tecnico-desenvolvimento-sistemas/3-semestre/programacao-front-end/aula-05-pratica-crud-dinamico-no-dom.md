---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-front-end-aula-05-pratica-crud-dinamico-no-dom
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-front-end/aula-05-pratica-crud-dinamico-no-dom
sidebar_position: 5
title: "Aula 05 — Prática de DOM: Construindo um CRUD Dinâmico"
description: Integre criação, leitura, atualização e exclusão de itens diretamente nos nós HTML sem recarregar a página.
---

# Aula 05 — Prática de DOM: Construindo um CRUD Dinâmico

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Consolidar todos os conceitos de seleção, criação, manipulação de nós e escuta de eventos desenvolvendo uma aplicação interativa completa do tipo **CRUD (Create, Read, Update, Delete)** diretamente no DOM sem recarregar o navegador.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Arquitetura de estado em memória (vetor de objetos JavaScript) sincronizada com o DOM.
- Renderização limpa baseada em dados: separando a fonte da verdade (*Single Source of Truth*) da apresentação visual.
- Operações completas:
  - **Create**: Adicionar novos itens a partir de inputs.
  - **Read**: Renderizar a listagem completa dinamicamente.
  - **Update**: Alternar status (ex: concluído/pendente) e editar texto inline.
  - **Delete**: Remover o item do vetor e do DOM.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

O erro mais comum ao programar com JavaScript puro é manipular o DOM diretamente sem manter um estado em memória. A boa prática que prepara para frameworks modernos (como React e Vue) é:

```text
[ Interação do Usuário (Clique/Submit) ]
                  │
                  ▼
[ Atualizar Array de Dados em Memória ]  <-- Estado da Aplicação
                  │
                  ▼
[ Função render(): Reconstrói o HTML ]   <-- Atualização do DOM
```

Dessa forma, o DOM torna-se apenas o reflexo visual dos seus dados!

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja a estrutura do CRUD de Gerenciador de Tarefas:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>CRUD Dinâmico no DOM</title>
  <style>
    .concluida { text-decoration: line-through; opacity: 0.6; }
    li { display: flex; align-items: center; justify-content: space-between; padding: 8px; border-bottom: 1px solid #ddd; }
  </style>
</head>
<body>
  <h1>Gerenciador de Tarefas</h1>

  <form id="form-crud">
    <input type="text" id="input-titulo" placeholder="Nome da tarefa" required>
    <button type="submit">Cadastrar</button>
  </form>

  <ul id="lista-crud"></ul>

  <script>
    // 1. ESTADO EM MEMÓRIA
    let tarefas = [
      { id: 1, titulo: 'Configurar ambiente VS Code', concluida: true },
      { id: 2, titulo: 'Estudar seletores do DOM', concluida: false }
    ];

    const form = document.querySelector('#form-crud');
    const input = document.querySelector('#input-titulo');
    const lista = document.querySelector('#lista-crud');

    // 2. FUNÇÃO DE RENDERIZAÇÃO
    function renderizar() {
      lista.innerHTML = ''; // Limpa a lista antes de desenhar

      tarefas.forEach(tarefa => {
        const li = document.createElement('li');

        li.innerHTML = `
          <span class="${tarefa.concluida ? 'concluida' : ''}">${tarefa.titulo}</span>
          <div>
            <button onclick="alternarStatus(${tarefa.id})">${tarefa.concluida ? 'Desmarcar' : 'Concluir'}</button>
            <button onclick="removerTarefa(${tarefa.id})" style="color: red; margin-left: 6px;">Excluir</button>
          </div>
        `;

        lista.appendChild(li);
      });
    }

    // 3. OPERAÇÃO CREATE
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const novoItem = {
        id: Date.now(),
        titulo: input.value.trim(),
        concluida: false
      };
      tarefas.push(novoItem);
      input.value = '';
      renderizar();
    });

    // 4. OPERAÇÃO UPDATE
    window.alternarStatus = function(id) {
      tarefas = tarefas.map(t => t.id === id ? { ...t, concluida: !t.concluida } : t);
      renderizar();
    };

    // 5. OPERAÇÃO DELETE
    window.removerTarefa = function(id) {
      tarefas = tarefas.filter(t => t.id !== id);
      renderizar();
    };

    // Inicialização
    renderizar();
  </script>
</body>
</html>
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Adicione um contador no topo da tela mostrando o número total de tarefas e quantas já foram concluídas (ex: "Tarefas concluídas: 1/3").
2. Adicione um campo de busca `<input id="busca">` que filtre a listagem em tempo de execução conforme o usuário digita no evento `input`.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Array de objetos utilizado como fonte da verdade dos dados.
- [ ] Formulário criando novos objetos e adicionando ao array.
- [ ] Exclusão filtrando o array pelo ID único (`Date.now()`).
- [ ] Atualização alternando o estado booleano de conclusão.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione a funcionalidade de editar o texto da tarefa: ao clicar duas vezes no título (`dblclick`), transforme-o em um campo de texto para renomear e salvar ao pressionar Enter!
