---
id: tecnico-desenvolvimento-sistemas-2-semestre-banco-de-dados-aula-03-relacionamentos-e-cardinalidade
slug: /tecnico-desenvolvimento-sistemas/2-semestre/banco-de-dados/aula-03-relacionamentos-e-cardinalidade
sidebar_position: 3
title: "Aula 03 — Relacionamentos e Cardinalidade no DER"
description: Domine a conexão entre entidades no Diagrama Entidade-Relacionamento e compreenda as cardinalidades 1:1, 1:N e N:M.
---

# Aula 03 — Relacionamentos e Cardinalidade no DER

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a conectar entidades através de **Relacionamentos** no Diagrama Entidade-Relacionamento (DER), dominar a leitura de regras de negócio para determinação da **Cardinalidade Mínima e Máxima** (participação opcional vs obrigatória) e compreender as três relações fundamentais: **Um para Um (1:1)**, **Um para Muitos (1:N)** e **Muitos para Muitos (N:M)**.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O elemento gráfico de Relacionamento no DER (o Losango).
- O conceito de Cardinalidade: expressando limites quantitativos de associação entre instâncias.
- Cardinalidade Mínima (0 = Participação Opcional, 1 = Participação Obrigatória).
- Cardinalidade Máxima (1 = Associação Única, N = Associação Múltipla).
- Os 3 tipos clássicos de relacionamentos:
  - **1:1 (Um para Um)**: Ex: Cidadão possui um Título de Eleitor.
  - **1:N (Um para Muitos)**: Ex: Um Cliente realiza múltiplos Pedidos.
  - **N:M (Muitos para Muitos)**: Ex: Um Aluno cursa várias Disciplinas e uma Disciplina tem vários Alunos.
- Atributos próprios do relacionamento.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Para descobrir a cardinalidade correta de um relacionamento, você deve fazer perguntas nos **dois sentidos**:

```text
[ CLIENTE ] ───────< REALIZA >─────── [ PEDIDO ]
```

1. **Sentido 1: Do Cliente para o Pedido**
   - *"Um cliente pode realizar quantos pedidos no mínimo?"* -> `0` (ele acabou de se cadastrar e ainda não comprou nada).
   - *"Um cliente pode realizar quantos pedidos no máximo?"* -> `N` (pode comprar dezenas de vezes).
   - Cardinalidade: `(0, n)`

2. **Sentido 2: Do Pedido para o Cliente**
   - *"Um pedido pertence a no mínimo quantos clientes?"* -> `1` (não existe pedido órfão sem comprador).
   - *"Um pedido pertence a no máximo quantos clientes?"* -> `1` (a nota fiscal sai em nome de uma única pessoa).
   - Cardinalidade: `(1, 1)`

Ao olhar a cardinalidade máxima dos dois lados, concluímos que este é um relacionamento **1:N (Um para Muitos)**!

### Atributos Próprios de um Relacionamento

Quando duas entidades se associam no modelo N:M, muitas vezes surgem dados que pertencem **à associação entre elas**, e não a nenhuma das duas individualmente.
*Exemplo:* Em um relacionamento entre `ALUNO` e `DISCIPLINA`, onde guardamos a `nota_final`?
- Não pode ser no Aluno (pois ele tem notas diferentes para cada disciplina).
- Não pode ser na Disciplina (pois a disciplina tem notas diferentes para cada aluno).
- **A nota pertence ao relacionamento `CURSA`!**

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja a representação textual de relacionamentos:

```text
1:1 (Um para Um):
[ FUNCIONÁRIO ] (1,1) ───< GERENCIA >─── (0,1) [ DEPARTAMENTO ]
(Cada departamento tem 1 gerente, e cada funcionário gerencia no máximo 1 departamento)

1:N (Um para Muitos):
[ TURMA ] (1,1) ───< POSSUI >─── (1,n) [ ESTUDANTE ]
(Uma turma tem vários estudantes, mas cada estudante está enturmado em 1 turma)

N:M (Muitos para Muitos):
[ MÉDICO ] (0,n) ───< CONSULTA >─── (0,n) [ PACIENTE ]
(Um médico atende vários pacientes, e um paciente pode ser atendido por vários médicos)
* Atributo do Relacionamento CONSULTA: data_hora, diagnostico, valor_pago
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Abra a ferramenta **brModelo**.
2. Modele o cenário de uma **Oficina Mecânica**:
   - Entidade `CLIENTE`: `id_cliente`, `nome`, `telefone`.
   - Entidade `VEICULO`: `placa`, `modelo`, `ano`.
   - Entidade `MECANICO`: `matricula`, `nome`, `especialidade`.
   - Entidade `ORDEM_SERVICO`: `numero_os`, `data_abertura`, `valor_total`.
3. Defina os relacionamentos e cardinalidades:
   - Um cliente é dono de veículos.
   - Uma ordem de serviço é aberta para um veículo específico e executada por um mecânico.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Losango de relacionamento interligando as entidades corretas.
- [ ] Notação de cardinalidade expressa nos dois lados da linha `(min, max)`.
- [ ] Atributos vinculados ao losango caso pertençam ao evento de associação.
- [ ] Diagrama limpo e sem cruzamento desordenado de linhas.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

O que é um **Auto-relacionamento (Relacionamento Recursivo)**? Dê um exemplo prático (como a entidade `FUNCIONARIO` se relacionando com ela mesma para indicar quem é o seu `SUPERVISOR`)!
