---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-front-end-aula-06-persistencia-com-web-storage-localstorage
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-front-end/aula-06-persistencia-com-web-storage-localstorage
sidebar_position: 6
title: "Aula 06 — Persistência no Navegador com Web Storage"
description: Salve dados no cliente sem expiração com localStorage e serialize objetos complexos com JSON.
---

# Aula 06 — Persistência no Navegador com Web Storage

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a persistir informações no navegador do usuário de forma confiável utilizando a **Web Storage API**, entendendo as diferenças entre `localStorage`, `sessionStorage` e Cookies, e dominando a serialização e desserialização de dados com `JSON.stringify` e `JSON.parse`.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Comparativo de armazenamento web: Cookies vs `sessionStorage` vs `localStorage` vs `IndexedDB`.
- Métodos essenciais: `setItem(chave, valor)`, `getItem(chave)`, `removeItem(chave)` e `clear()`.
- A limitação de armazenamento por strings e o uso obrigatório de `JSON.stringify()` e `JSON.parse()`.
- Persistindo o CRUD da aplicação para que os dados sobrevivam ao recarregamento ou fechamento da aba.
- Tratamento de exceções com `try/catch` para limites de cota de armazenamento (*QuotaExceededError*).

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

O `localStorage` permite armazenar cerca de **5MB a 10MB** de dados diretamente no navegador sob o mesmo domínio de origem (*Same-Origin Policy*). Os dados nunca expiram automaticamente.

### Comparativo Rápido

| Mecanismo | Capacidade | Tempo de Vida | Trafega em requisições HTTP? |
| :--- | :--- | :--- | :--- |
| **Cookies** | ~4 KB | Definido por expiração (`Max-Age`) | Sim (enviado em todo cabeçalho HTTP) |
| **sessionStorage** | ~5 MB | Apenas enquanto a aba estiver aberta | Não (acesso puramente local via JS) |
| **localStorage** | ~5 a 10 MB | Permanente (até limpeza manual do usuário) | Não (acesso puramente local via JS) |

### Como salvar objetos complexos?

O `localStorage` só aceita dados do tipo texto (**String**). Se você tentar salvar um objeto diretamente (`localStorage.setItem('user', { nome: 'Ana' })`), o navegador converterá para a string `"[object Object]"`, corrompendo os dados!

A forma correta:
```javascript
const usuario = { nome: 'Ana', nivel: 'Admin' };

// 1. Serializar para String JSON
localStorage.setItem('@meuApp:usuario', JSON.stringify(usuario));

// 2. Recuperar e desserializar de volta para Objeto
const usuarioSalvo = JSON.parse(localStorage.getItem('@meuApp:usuario'));
console.log(usuarioSalvo.nome); // "Ana"
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como tornar persistente uma lista de tarefas:

```javascript
// Chave única para o aplicativo
const STORAGE_KEY = '@tarefas_v1';

// Função para carregar tarefas salvas
function carregarTarefas() {
  const dados = localStorage.getItem(STORAGE_KEY);
  return dados ? JSON.parse(dados) : [];
}

// Função para salvar no localStorage
function salvarTarefas(tarefas) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
}

// Exemplo de uso:
let lista = carregarTarefas();

// Adicionando um novo item
lista.push({ id: 1, descricao: 'Estudar Web Storage', feito: false });
salvarTarefas(lista);

console.log('Tarefas salvas com sucesso:', carregarTarefas());
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Abra o projeto de CRUD desenvolvido na Aula 05.
2. Atualize o código para que, sempre que o usuário adicionar, alterar ou remover uma tarefa, a função `salvarTarefas()` seja executada.
3. Ao carregar a página pela primeira vez (`DOMContentLoaded`), leia os dados do `localStorage`. Se houver itens, preencha o array de tarefas e renderize a tela automaticamente.
4. Adicione um botão "Limpar Tudo" que executa `localStorage.removeItem()` e zera a lista na tela.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Dados preservados no navegador após fechar e reabrir a aba.
- [ ] Uso correto de `JSON.stringify` na escrita e `JSON.parse` na leitura.
- [ ] Tratamento para o caso de não haver itens salvos (retornando array vazio padrão `[]`).
- [ ] Inspeção dos dados salva através da aba **Application > Local Storage** do Chrome DevTools.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Crie uma funcionalidade de alternância de tema (**Dark Mode / Light Mode**) persistente: salve a preferência `'dark'` ou `'light'` no `localStorage` e aplique a classe CSS no elemento `<body>` assim que a página for aberta!
