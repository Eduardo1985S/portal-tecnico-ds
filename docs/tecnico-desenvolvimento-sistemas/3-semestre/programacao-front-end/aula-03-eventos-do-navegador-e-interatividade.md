---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-front-end-aula-03-eventos-do-navegador-e-interatividade
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-front-end/aula-03-eventos-do-navegador-e-interatividade
sidebar_position: 3
title: "Aula 03 — Eventos do Navegador e Interatividade do Usuário"
description: Domine os ouvintes de eventos com addEventListener, o objeto Event, preventDefault e o fluxo de propagação (Event Bubbling).
---

# Aula 03 — Eventos do Navegador e Interatividade do Usuário

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender o modelo orientado a eventos do navegador web, registrar ouvintes assíncronos com `addEventListener`, interceptar informações com o objeto `Event`, cancelar comportamentos padrão de formulários e links com `event.preventDefault()` e dominar a delegação de eventos explorando o borbulhamento (*Event Bubbling*).

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O método moderno `element.addEventListener('evento', callback)`.
- Eventos de mouse: `click`, `dblclick`, `mouseenter`, `mouseleave`.
- Eventos de teclado e entrada: `keydown`, `keyup`, `input`, `change`.
- O objeto de evento `event`: propriedades `target`, `key`, `clientX`, `clientY`.
- Prevenção de ações padrão: `event.preventDefault()`.
- Propagação de eventos (*Event Bubbling*) e `event.stopPropagation()`.
- Técnica avançada de **Delegação de Eventos** (*Event Delegation*).

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

O navegador executa uma fila de eventos disparada pelas ações do usuário ou do sistema.

### O Borbulhamento de Eventos (Event Bubbling)

Quando um botão dentro de uma lista é clicado, o evento não é disparado apenas nele. Ele "sobe" pela árvore como uma bolha de ar:

```text
[ document ]
     ▲
[  <body>  ]
     ▲
[  <ul>    ]  <-- Ouvinte único aqui captura todos os itens (Event Delegation)
     ▲
[  <li>    ]
     ▲
[ <button> ]  <-- Origem do clique (event.target)
```

Graças à **Delegação de Eventos**, podemos colocar um único `addEventListener` no elemento pai (`<ul>`) em vez de centenas de ouvintes em cada botão filho, economizando muita memória RAM!

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como implementar uma lista de tarefas com delegação de eventos e prevenção de submit:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Interatividade com Eventos</title>
</head>
<body>
  <form id="form-tarefa">
    <input type="text" id="campo-texto" placeholder="Digite uma tarefa..." required>
    <button type="submit">Adicionar</button>
  </form>

  <ul id="lista-tarefas"></ul>

  <script>
    const form = document.querySelector('#form-tarefa');
    const input = document.querySelector('#campo-texto');
    const lista = document.querySelector('#lista-tarefas');

    // 1. Interceptando o envio do formulário
    form.addEventListener('submit', (e) => {
      // Impede o recarregamento da página (comportamento padrão do submit)
      e.preventDefault();

      const texto = input.value.trim();
      if (!texto) return;

      const li = document.createElement('li');
      li.innerHTML = `
        <span>${texto}</span>
        <button class="btn-excluir" style="margin-left: 10px; color: red;">Excluir</button>
      `;

      lista.appendChild(li);
      input.value = ''; // Limpa o campo
      input.focus();
    });

    // 2. DELEGAÇÃO DE EVENTOS no elemento pai (lista)
    lista.addEventListener('click', (e) => {
      // Verifica se o elemento clicado foi o botão de exclusão
      if (e.target.classList.contains('btn-excluir')) {
        // Encontra o item <li> mais próximo e o remove
        const itemLi = e.target.closest('li');
        itemLi.remove();
      }
    });
  </script>
</body>
</html>
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie uma página com um formulário de login contendo campos de e-mail, senha e botão "Entrar".
2. No evento `submit`, previna o recarregamento da página.
3. Adicione um evento `input` no campo de senha para verificar o tamanho da senha digitada:
   - Se for menor que 6 caracteres, exiba uma mensagem abaixo do campo em vermelho: "A senha deve ter no mínimo 6 caracteres".
   - Se atingir 6 ou mais caracteres, mude a cor do texto para verde: "Tamanho de senha aceitável".

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Registro de ouvintes com a sintaxe padrão `addEventListener`.
- [ ] Bloqueio do reload padrão de formulários com `event.preventDefault()`.
- [ ] Leitura de valores digitados com `event.target.value` ou `input.value`.
- [ ] Implementação de lógica no evento `input` ou `change`.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione um atalho de teclado global: quando o usuário pressionar a tecla `Escape` (`e.key === 'Escape'`), todos os campos do formulário devem ser esvaziados e o foco deve voltar para o primeiro campo.
