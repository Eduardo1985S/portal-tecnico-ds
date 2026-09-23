---
id: tecnico-desenvolvimento-sistemas-2-semestre-banco-de-dados-aula-04-pratica-modelagem-conceitual
slug: /tecnico-desenvolvimento-sistemas/2-semestre/banco-de-dados/aula-04-pratica-modelagem-conceitual
sidebar_position: 4
title: "Aula 04 — Prática de Modelagem Conceitual em Cenários Reais"
description: Pratique a interpretação de regras de negócio complexas e construa Diagramas Entidade-Relacionamento profissionais.
---

# Aula 04 — Prática de Modelagem Conceitual em Cenários Reais

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Consolidar a capacidade analítica de interpretar entrevistas, levantamentos de requisitos e regras de negócio textuais de clientes do mundo real, extraindo com precisão as entidades de negócio, seus respectivos atributos e os relacionamentos com cardinalidades adequadas, construindo um DER completo e validado em equipe.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Técnica de análise gramatical de requisitos para modelagem:
  - **Substantivos** costumam se tornar **Entidades** ou **Atributos**.
  - **Verbos** costumam se tornar **Relacionamentos**.
- Resolução de ambiguidades comuns em regras de negócio.
- O estudo de caso clássico de um **E-commerce Completo**: Clientes, Pedidos, Itens do Pedido, Produtos e Categorias.
- Revisão por pares (*Peer Review*) de diagramas conceituais.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Um dos erros mais comuns de iniciantes é confundir uma **entidade** com um **atributo**. 

> **Regra prática:** Se você deseja armazenar múltiplos fatos sobre algo (ex: o produto tem nome, peso, preço, estoque e fotos), isso é uma **Entidade**! Se for apenas uma característica isolada (ex: cor dos olhos), é um **Atributo**.

### O Caso Crítico: O Item do Pedido

Em um sistema de vendas:
- Um `CLIENTE` realiza `PEDIDOS`.
- Um `PEDIDO` contém `PRODUTOS`.
- Mas um produto pode estar em vários pedidos e um pedido tem vários produtos (**N:M**).
- No momento da compra, o cliente pode comprar 3 unidades de um produto e 1 unidade de outro. Além disso, o preço do produto pode mudar amanhã, mas o valor cobrado naquele pedido específico deve ficar congelado!
- Por isso, a quantidade e o preço unitário praticado na venda pertencem à relação entre Pedido e Produto (**Item do Pedido**)!

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja a descrição textual do cenário de E-commerce:

```text
1. O CLIENTE possui id, nome, cpf, email e múltiplos telefones de contato.
2. Cada CLIENTE pode realizar diversos PEDIDOS, mas cada PEDIDO pertence a um único CLIENTE.
3. O PEDIDO possui numero_pedido, data_hora, status (Pendente/Pago/Enviado) e valor_total.
4. Cada PEDIDO é composto por um ou mais ITENS de PRODUTOS.
5. Cada PRODUTO possui codigo, nome, descricao, preco_atual e quantidade_estoque.
6. Um PRODUTO pertence obrigatoriamente a uma CATEGORIA (ex: Eletrônicos, Livros, Móveis).
7. Uma CATEGORIA pode agrupar infinitos PRODUTOS.
```

O DER desse cenário conecta:
- `CLIENTE` (1,1) ---< REALIZA >--- (0,N) `PEDIDO`
- `PEDIDO` (1,N) ---< CONTÉM (quantidade, preco_venda) >--- (0,N) `PRODUTO`
- `CATEGORIA` (1,1) ---< CLASSIFICA >--- (0,N) `PRODUTO`

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Abra a ferramenta **brModelo**.
2. Construa o Diagrama Entidade-Relacionamento completo para um **Sistema de Gestão Hospitalar**:
   - `PACIENTE`: prontuário, nome, cpf, data_nasc.
   - `MEDICO`: crm, nome, especialidade, telefone.
   - `CONSULTA`: data_hora, diagnostico, receita_medicamentos.
   - `LEITO_INTERNACAO`: numero_quarto, andar, status (Livre/Ocupado).
3. Determine as cardinalidades mínimas e máximas de todas as pontas.
4. Salve o diagrama como imagem PNG para anexar à documentação do projeto.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Identificação de todas as entidades substantivas do sistema hospitalar.
- [ ] Atributos vinculados sem redundâncias desnecessárias.
- [ ] Cardinalidades refletindo com fidelidade a realidade médica.
- [ ] Exportação do arquivo em formato legível.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione ao sistema hospitalar a entidade `EXAME` e relacione com o `PACIENTE` e com o `MEDICO` solicitante: um exame pode ser solicitado em uma consulta específica!
