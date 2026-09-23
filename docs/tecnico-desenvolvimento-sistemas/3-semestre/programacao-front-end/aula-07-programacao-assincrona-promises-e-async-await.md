---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-front-end-aula-07-programacao-assincrona-promises-e-async-await
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-front-end/aula-07-programacao-assincrona-promises-e-async-await
sidebar_position: 7
title: "Aula 07 — Programação Assíncrona, Promises e Async/Await"
description: Entenda como o Event Loop funciona e domine o controle de fluxo assíncrono com Promises e a sintaxe async/await.
---

# Aula 07 — Programação Assíncrona, Promises e Async/Await

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender o modelo de execução assíncrono e não-bloqueante (*Single-Threaded Non-Blocking*) do JavaScript no navegador, dominar o funcionamento de **Promises** e utilizar a sintaxe moderna e legível de **async/await** combinada com blocos `try/catch` para tratamento de erros.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- A natureza de thread única (*Single-thread*) do JavaScript e o mecanismo de **Event Loop**.
- Por que operações demoradas (como rede ou timers) não podem travar a interface (*UI Freezing*).
- O inferno das chamadas aninhadas (*Callback Hell*) e a evolução para **Promises**.
- Estados de uma Promise: *Pending*, *Fulfilled* (Resolvida) e *Rejected* (Rejeitada).
- Encadeamento clássico com `.then()`, `.catch()` e `.finally()`.
- A sintaxe moderna com funções `async` e a palavra-chave `await`.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

No navegador, o JavaScript executa na mesma thread principal responsável por desenhar a tela e responder a cliques. Se você executar uma instrução que demore 5 segundos de forma síncrona, toda a página ficará congelada!

Por isso, operações de entrada e saída (I/O) são delegadas às **Web APIs do navegador**:

```text
Código JS: await buscarDados()
     │
     ▼ (Delega requisição à Web API do Navegador)
     ▼ (Thread principal continua livre para animações e cliques!)
     │
Web API finaliza -> Envia resultado para a Fila (Microtask Queue)
     │
Event Loop -> Devolve o resultado para a execução do JS!
```

### De `.then()` para `async/await`

```javascript
// ABORDAGEM COM PROMISES TRADICIONAIS:
function buscarComThen() {
  obterDados()
    .then(resposta => {
      console.log('Sucesso:', resposta);
    })
    .catch(erro => {
      console.error('Falha:', erro);
    });
}

// ABORDAGEM MODERNA COM ASYNC / AWAIT (Mais limpa e linear):
async function buscarComAsync() {
  try {
    const resposta = await obterDados();
    console.log('Sucesso:', resposta);
  } catch (erro) {
    console.error('Falha:', erro);
  }
}
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como criar uma função simulando uma chamada de rede com `Promise`:

```javascript
// Simulador de requisição que demora 2 segundos
function simularChamadaServidor(deveFalhar = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (deveFalhar) {
        reject(new Error('Servidor indisponível no momento.'));
      } else {
        resolve({ id: 101, produto: 'Notebook Pro 16"', estoque: 14 });
      }
    }, 2000);
  });
}

// Consumindo com async / await
async function carregarProduto() {
  console.log('Iniciando busca do produto...');
  
  try {
    const dados = await simularChamadaServidor(false);
    console.log('Produto carregado com sucesso:', dados.produto);
    console.log('Quantidade em estoque:', dados.estoque);
  } catch (error) {
    console.error('Ocorreu um erro:', error.message);
  } finally {
    console.log('Operação finalizada (sucesso ou falha).');
  }
}

carregarProduto();
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie uma página HTML com um botão "Processar Pagamento" e um texto de status `<div id="status">Aguardando...</div>`.
2. Ao clicar no botão:
   - Desabilite o botão (`btn.disabled = true`) e exiba o status "Processando transação com a operadora...".
   - Chame uma função assíncrona que espere 3 segundos (usando `setTimeout` envelopado em uma Promise).
   - Use `Math.random()` para simular 80% de chance de sucesso e 20% de recusa.
   - Trate o resultado com `try/catch`, exibindo o status em verde ("Pagamento Aprovado!") ou vermelho ("Transação Recusada!").
   - Reabilite o botão no bloco `finally`.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Função assíncrona declarada com a palavra-chave `async`.
- [ ] Pausa não-bloqueante utilizando `await`.
- [ ] Tratamento de falhas estruturado com `try... catch`.
- [ ] Desabilitação temporária do botão para evitar múltiplos cliques simultâneos.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Explore o método `Promise.all([promessa1, promessa2])`: crie duas chamadas assíncronas simuladas em paralelo e dispare uma ação apenas quando ambas forem concluídas com sucesso.
