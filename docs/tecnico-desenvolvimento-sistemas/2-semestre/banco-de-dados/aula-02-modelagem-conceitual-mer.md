---
id: tecnico-desenvolvimento-sistemas-2-semestre-banco-de-dados-aula-02-modelagem-conceitual-mer
slug: /tecnico-desenvolvimento-sistemas/2-semestre/banco-de-dados/aula-02-modelagem-conceitual-mer
sidebar_position: 2
title: "Aula 02 — Modelagem Conceitual: O Modelo Entidade-Relacionamento"
description: Aprenda a modelar o mundo real de forma abstrata identificando Entidades, Atributos e Chaves no MER.
---

# Aula 02 — Modelagem Conceitual: O Modelo Entidade-Relacionamento

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a abstrair as regras do mundo real para uma representação gráfica formal e independente de tecnologia computacional utilizando o **Modelo Entidade-Relacionamento (MER)** formulado por Peter Chen, identificando Entidades fortes e fracas, classificando os tipos de Atributos e determinando Identificadores únicos.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O que é Modelagem de Dados e as fases do projeto: Conceitual, Lógica e Física.
- Conceito de **Entidade**: objetos do mundo real sobre os quais desejamos registrar dados (ex: Cliente, Produto, Médico).
- Entidades Fortes (independentes) vs Entidades Fracas (dependentes de existência).
- Classificação dos **Atributos**:
  - Simples (atômicos) vs Compostos (ex: Endereço dividido em rua, número, bairro).
  - Monovalorados (um único valor por linha) vs Multivalorados (ex: telefones).
  - Derivados / Calculados (ex: Idade calculada a partir da Data de Nascimento).
- Atributos Identificadores (Chave Candidata / Identificador Único).

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

O **Modelo Conceitual** é o nível de modelagem mais próximo do ser humano e dos clientes de negócio. Ele não se preocupa com comandos SQL, se a chave é inteira ou UUID, nem com qual SGBD será contratado.

### Elementos Gráficos Clássicos (Notação de Peter Chen)

```text
┌─────────────────┐
│     CLIENTE     │   <── Retângulo: Representa a ENTIDADE
└────────┬────────┘
         │
    (● id_cliente)    <── Círculo Preenchido: Atributo IDENTIFICADOR
    (○ nome)          <── Círculo Vazio: Atributo MONOVALORADO
    (◎ telefones)     <── Círculo Duplo: Atributo MULTIVALORADO
    ( ╌ idade ╌ )     <── Círculo Tracejado: Atributo DERIVADO
```

### Tipos Especiais de Atributos:

1. **Atributo Composto**: Pode ser desmembrado em partes menores com significado próprio (ex: `Endereço` -> `Rua`, `Número`, `CEP`, `Cidade`).
2. **Atributo Multivalorado**: Uma entidade pode possuir zero, um ou vários valores para aquele campo (ex: um Cliente que possui 3 números de telefone diferentes).
3. **Atributo Derivado**: Não deve ser armazenado fisicamente para evitar inconsistência temporal, mas pode ser calculado sob demanda (ex: a `Idade` pode ser deduzida calculando `Hoje - Data_Nascimento`).

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Considere a seguinte regra de negócio de uma clínica veterinária:

> *"A clínica atende tutores que possuem nome, CPF e e-mail. Cada tutor possui animais de estimação. Um animal possui um nome, espécie, raça e data de nascimento."*

No modelo conceitual:
- **Entidade 1**: `TUTOR`
  - Atributos: `cpf` (identificador), `nome`, `email`.
- **Entidade 2**: `PET`
  - Atributos: `id_pet` (identificador), `nome`, `especie`, `raca`, `data_nascimento`.

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Instale ou acesse uma ferramenta de modelagem conceitual (como **brModelo**, **draw.io** ou **Lucidchart**).
2. Modele o cenário conceitual de uma **Biblioteca Escolar**:
   - Entidade `LIVRO`: Identificador, título, ano de publicação, autores (multivalorado).
   - Entidade `USUARIO`: Matrícula (identificador), nome, endereço completo (composto), e-mail.
3. Marque visualmente quais são os atributos identificadores de cada entidade.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Identificação correta de entidades substantivas do domínio.
- [ ] Atributos vinculados às entidades corretas.
- [ ] Diferenciação visual entre atributos identificadores e comuns.
- [ ] Identificação de atributos compostos e multivalorados.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Descubra o que é uma **Especialização / Generalização** no MER (como a entidade genérica `PESSOA` dividida em `PESSOA_FISICA` e `PESSOA_JURIDICA`) e represente no seu diagrama!
