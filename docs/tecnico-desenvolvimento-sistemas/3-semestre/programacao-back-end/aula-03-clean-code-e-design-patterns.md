---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-back-end-aula-03-clean-code-e-design-patterns
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-back-end/aula-03-clean-code-e-design-patterns
sidebar_position: 3
title: Aula 03 — Clean Code e Princípios SOLID no Node.js
description: Melhore a qualidade e manutenibilidade do código back-end aplicando Clean Code e princípios fundamentais do SOLID.
---

# Aula 03 — Clean Code e Princípios SOLID no Node.js

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender e aplicar os princípios fundamentais de Código Limpo (Clean Code) e as diretrizes do SOLID no ecossistema Node.js, tornando as aplicações fáceis de ler, refatorar, testar e expandir.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Princípios de Clean Code: Nomes significativos, funções pequenas com responsabilidade única e redução de aninhamento (Early Return).
- O acrônimo SOLID com foco prático em:
  - **S — Single Responsibility Principle (SRP):** Princípio da Responsabilidade Única.
  - **O — Open/Closed Principle (OCP):** Aberto para extensão, fechado para modificação.
  - **D — Dependency Inversion Principle (DIP):** Inversão de Dependências.
- Como evitar "Código Espaguete" e débitos técnicos em APIs.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### 1. Nomes Significativos e Autoexplicativos
Um dos maiores desperdícios de tempo na engenharia de software é tentar decifrar o que uma variável ou função faz. 

> *"Qualquer tolo pode escrever código que um computador entende. Bons programadores escrevem código que humanos podem entender."* — Martin Fowler.

* **Ruim:** `const d = new Date();` ou `const u = await getUsr(id);`
* **Bom:** `const dataCriacao = new Date();` ou `const usuarioEncontrado = await buscarUsuarioPorId(id);`

### 2. A Técnica do Retorno Precoce (Early Return / Guard Clauses)
Evite encadear múltiplos blocos de `if/else` aninhados (o famoso código em formato de pirâmide). Em vez disso, verifique os casos de erro primeiro e retorne imediatamente:

```javascript
// Ruim: Pirâmide de if/else difícil de ler
function processarPagamento(pedido, usuario) {
  if (usuario.ativo) {
    if (pedido.valor > 0) {
      if (pedido.itens.length > 0) {
        // executa pagamento...
      } else {
        throw new Error('Pedido sem itens');
      }
    } else {
      throw new Error('Valor inválido');
    }
  } else {
    throw new Error('Usuário inativo');
  }
}

// Bom: Guard Clauses (Retorno Precoce)
function processarPagamento(pedido, usuario) {
  if (!usuario.ativo) throw new AppError('Usuário inativo', 403);
  if (pedido.valor <= 0) throw new AppError('Valor inválido', 400);
  if (pedido.itens.length === 0) throw new AppError('Pedido sem itens', 400);

  // Fluxo feliz executado com clareza na raiz da função!
  return executarTransacao(pedido);
}
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### Aplicando SRP e Inversão de Dependência (DIP)

Imagine um serviço de cancelamento de pedido. O serviço não deve saber os detalhes de como o e-mail é disparado ou se o repositório salva em memória ou no PostgreSQL:

```javascript
// src/services/CancelarPedidoService.js
export class CancelarPedidoService {
  // Recebe as dependências no construtor (Inversão de Dependência)
  constructor(pedidosRepository, provedorDeEmail) {
    this.pedidosRepository = pedidosRepository;
    this.provedorDeEmail = provedorDeEmail;
  }

  async execute(pedidoId) {
    const pedido = await this.pedidosRepository.buscarPorId(pedidoId);
    if (!pedido) {
      throw new AppError('Pedido não encontrado.', 404);
    }

    if (pedido.status === 'CANCELADO') {
      throw new AppError('Este pedido já se encontra cancelado.', 400);
    }

    pedido.status = 'CANCELADO';
    pedido.canceladoEm = new Date();

    await this.pedidosRepository.salvar(pedido);

    // O serviço apenas delega a responsabilidade de envio
    await this.provedorDeEmail.enviarNotificacao({
      destinatario: pedido.clienteEmail,
      assunto: `Pedido #${pedidoId} cancelado com sucesso`,
      mensagem: 'Seu pedido foi cancelado e o estorno processado.',
    });

    return pedido;
  }
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Analise o código de um dos controladores desenvolvidos no semestre anterior.
2. Identifique trechos com mais de 3 níveis de aninhamento de `if/else` e refatore utilizando **Guard Clauses**.
3. Renomeie variáveis abreviadas ou genéricas para nomes semânticos que revelem sua real intenção.
4. Garanta que cada função tenha no máximo 25 linhas e execute apenas uma única ação com perfeição.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Todas as funções aplicam a técnica de Guard Clauses para validação de erros.
- [ ] Nenhum nome de variável possui abreviações confusas ou caracteres únicos (com exceção de contadores `i`).
- [ ] As regras de negócio foram segregadas em serviços isolados.
- [ ] O código foi formatado de acordo com padrões consistentes (ex: Prettier / ESLint).

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Pesquise sobre o princípio **KISS (Keep It Simple, Stupid)** e o princípio **YAGNI (You Aren't Gonna Need It)**. Escreva um parágrafo no seu caderno ou repositório explicando por que tentar antecipar funcionalidades que o cliente não pediu gera complexidade desnecessária no Back-End!
