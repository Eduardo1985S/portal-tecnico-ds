---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-front-end-aula-02-manipulacao-dinamica-de-elementos-e-estilos
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-front-end/aula-02-manipulacao-dinamica-de-elementos-e-estilos
sidebar_position: 2
title: "Aula 02 — Manipulação Dinâmica de Elementos e Estilos"
description: Crie, altere e remova elementos HTML dinamicamente e manipule classes CSS com classList.
---

# Aula 02 — Manipulação Dinâmica de Elementos e Estilos

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a modificar o conteúdo textual e estrutural de uma página web em tempo de execução, criando e inserindo novos elementos no DOM com `document.createElement` e controlando a aparência visual com a API `classList`.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Propriedades de texto e HTML: `textContent`, `innerText` e os riscos de segurança de `innerHTML` (Cross-Site Scripting — XSS).
- Criação e montagem de nós: `document.createElement`, `element.appendChild` e `element.append`.
- Remoção de elementos com `element.remove()`.
- Gerenciamento de classes CSS com `element.classList` (`add`, `remove`, `toggle`, `contains`).
- Modificação de estilos inline com `element.style`.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

A manipulação dinâmica é o coração das interfaces modernas. Existem duas formas principais de alterar o conteúdo de um nó:

### `textContent` vs `innerHTML`

```javascript
// SEGURO: Apenas texto puro. Caracteres < e > são tratados como texto literal.
card.textContent = "Olá, <strong>Visitante</strong>"; 
// Resultado exibido: Olá, <strong>Visitante</strong>

// ATENÇÃO: Interpreta tags HTML. Se receber dados de formulários não sanitizados,
// abre brechas graves de injeção de scripts (XSS).
card.innerHTML = "Olá, <strong>Visitante</strong>"; 
// Resultado exibido: Olá, Visitante (em negrito)
```

### O Ciclo de Criação e Inserção Programática

Ao criar elementos via código, o elemento nasce isolado na memória RAM. Ele só passa a ser visível quando é conectado a um pai existente no DOM:

```text
1. document.createElement('div')  ---> Cria nó isolado na memória
2. card.classList.add('alerta')   ---> Configura atributos/estilos
3. card.textContent = 'Mensagem'  ---> Preenche o conteúdo
4. container.appendChild(card)    ---> Anexa à árvore DOM (fica visível)
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como criar um sistema simples de notificações (toasts) dinâmicas:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Notificações Dinâmicas</title>
  <style>
    .notificacao {
      padding: 12px 20px;
      margin-bottom: 8px;
      border-radius: 6px;
      background: #2563eb;
      color: white;
      font-family: sans-serif;
      transition: all 0.3s ease;
    }
    .notificacao.sucesso { background: #16a34a; }
    .notificacao.alerta  { background: #dc2626; }
  </style>
</head>
<body>
  <div id="painel-notificacoes"></div>

  <script>
    function criarNotificacao(mensagem, tipo = 'sucesso') {
      const painel = document.querySelector('#painel-notificacoes');

      // 1. Cria o elemento div na memória
      const toast = document.createElement('div');

      // 2. Adiciona as classes CSS
      toast.classList.add('notificacao', tipo);

      // 3. Define o texto de forma segura
      toast.textContent = mensagem;

      // 4. Insere no container da página
      painel.appendChild(toast);

      // 5. Remove automaticamente após 3 segundos
      setTimeout(() => {
        toast.remove();
      }, 3000);
    }

    // Disparando notificações de teste
    criarNotificacao('Arquivo salvo com sucesso!', 'sucesso');
    setTimeout(() => {
      criarNotificacao('Atenção: Conexão instável.', 'alerta');
    }, 1000);
  </script>
</body>
</html>
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie uma página com um botão "Adicionar Card de Produto".
2. Crie uma função JavaScript que, a cada clique, gere dinamicamente um card contendo:
   - Uma tag `<h3>` com o título do produto.
   - Um parágrafo `<p>` com o preço formatado em Real (`R$ 99,90`).
   - Um botão "Remover" que, ao ser acionado, remove aquele card específico com o método `.remove()`.
3. Utilize `classList.add('card-produto')` para estilizar com bordas arredondadas e sombra suave.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Criação de elementos com `document.createElement`.
- [ ] Inserção de filhos com `appendChild` ou `append`.
- [ ] Remoção pontual de nós com o método `.remove()`.
- [ ] Uso de `classList.toggle` ou `classList.add` para alternar estados visuais.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione uma animação CSS de `fade-out` antes de chamar o método `.remove()`, aguardando a animação terminar com o evento `transitionend`.
