---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-back-end-aula-15-paginacao-filtros-e-ordenacao
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-back-end/aula-15-paginacao-filtros-e-ordenacao
sidebar_position: 15
title: Aula 15 — Otimização de Consultas, Paginação e Filtros
description: Aprenda a implementar paginação profissional com limit e offset, filtros dinâmicos e metadados no Prisma.
---

# Aula 15 — Otimização de Consultas, Paginação e Filtros

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a otimizar endpoints de consulta para lidar com grandes volumes de registros no banco de dados, implementando **Paginação profissional baseada em parâmetros de consulta (Query Params)**, filtros dinâmicos de busca e retorno padronizado com metadados de paginação.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O perigo de performance em consultas `SELECT *` sem limites em bancos de produção.
- Parâmetros de consulta HTTP (`req.query.pagina`, `req.query.limite`, `req.query.busca`).
- As cláusulas `take` e `skip` no Prisma Client (equivalentes a `LIMIT` e `OFFSET` no SQL).
- Contagem total de registros com `prisma.modelo.count()`.
- Estruturação do objeto de resposta com metadados para consumo no Front-End e Mobile.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### Por que paginar dados?
Se o seu banco de dados possuir 100.000 produtos ou usuários cadastrados e o endpoint `GET /produtos` tentar devolver todos de uma única vez:
1. O banco de dados consumirá alta memória e CPU para carregar tudo.
2. O servidor Node.js ficará bloqueado serializando uma string JSON gigantesca de dezenas de megabytes.
3. O aplicativo mobile do usuário sofrerá travamentos para renderizar milhares de itens.

A solução padrão na indústria é a **Paginação**: dividir o resultado em páginas de tamanho fixo (ex: 10 ou 20 itens por página).

### Como o Prisma lida com Paginação?
* `take`: Quantos registros devem ser retornados (o tamanho da página).
* `skip`: Quantos registros devem ser "pulados" a partir do início.

A fórmula matemática para calcular o deslocamento (`skip`) a partir do número da página é:
$$\text{skip} = (\text{pagina} - 1) \times \text{limite}$$

* Página 1 com limite 10: $\text{skip} = (1 - 1) \times 10 = 0$ (traz registros de 1 a 10).
* Página 2 com limite 10: $\text{skip} = (2 - 1) \times 10 = 10$ (pula os 10 primeiros e traz de 11 a 20).

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### Serviço de Listagem Paginada: `src/services/ListarProdutosPaginadosService.js`
```javascript
import { prisma } from '../database/prisma.js';

export class ListarProdutosPaginadosService {
  async execute({ pagina = 1, limite = 10, busca = '', categoria = '' }) {
    // Garante que são números inteiros positivos
    const numPagina = Math.max(1, Number(pagina));
    const numLimite = Math.max(1, Math.min(100, Number(limite))); // Limita a no máximo 100 por página
    const skip = (numPagina - 1) * numLimite;

    // Constrói os filtros dinâmicos
    const where = {};

    if (busca) {
      where.nome = {
        contains: busca,
        mode: 'insensitive', // Não diferencia maiúsculas de minúsculas
      };
    }

    // Executa a busca dos dados e a contagem total em paralelo com Promise.all!
    const [produtos, totalRegistros] = await Promise.all([
      prisma.produto.findMany({
        where,
        take: numLimite,
        skip: skip,
        orderBy: { nome: 'asc' },
      }),
      prisma.produto.count({ where }),
    ]);

    const totalPaginas = Math.ceil(totalRegistros / numLimite);

    // Retorno padronizado de mercado com dados e metadados
    return {
      dados: produtos,
      paginacao: {
        totalRegistros,
        totalPaginas,
        paginaAtual: numPagina,
        itensPorPagina: numLimite,
        temProximaPagina: numPagina < totalPaginas,
        temPaginaAnterior: numPagina > 1,
      },
    };
  }
}
```

### Controlador: `src/controllers/ProdutosController.js`
```javascript
import { ListarProdutosPaginadosService } from '../services/ListarProdutosPaginadosService.js';

export class ProdutosController {
  async listar(req, res, next) {
    try {
      const { pagina, limite, busca, categoria } = req.query;

      const service = new ListarProdutosPaginadosService();
      const resultado = await service.execute({ pagina, limite, busca, categoria });

      return res.json(resultado);
    } catch (error) {
      next(error);
    }
  }
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie o serviço `ListarProdutosPaginadosService` conforme apresentado.
2. No seu banco de dados, certifique-se de ter pelo menos 15 produtos cadastrados.
3. Teste no Postman com diferentes combinações de parâmetros na URL:
   - `GET http://localhost:3333/produtos?pagina=1&limite=5`
   - `GET http://localhost:3333/produtos?pagina=2&limite=5`
   - `GET http://localhost:3333/produtos?busca=notebook`
4. Inspecione o objeto `paginacao` retornado e verifique se o cálculo de `totalPaginas` e `temProximaPagina` reflete a realidade dos dados.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] A consulta utiliza `take` e `skip` para limitar os registros devolvidos.
- [ ] A busca com filtro textual é insensível a maiúsculas/minúsculas (`mode: 'insensitive'`).
- [ ] O total de registros é computado com `prisma.modelo.count()`.
- [ ] A resposta contém metadados claros que facilitam a criação da paginação no Front-End e no Mobile.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Pesquise sobre a diferença entre **Offset-based Pagination** (a que usamos hoje com `skip` e `take`) e **Cursor-based Pagination** (paginação baseada em ponteiros/IDs como a do feed do Instagram ou Twitter). Por que a paginação por cursor é mais performática para bancos de dados com milhões de registros que sofrem inserções em tempo real?
