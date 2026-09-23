---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-back-end-aula-19-testes-de-api-e-preparacao-para-producao
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-back-end/aula-19-testes-de-api-e-preparacao-para-producao
sidebar_position: 19
title: Aula 19 — Testes de API, Caça a Bugs e Preparação para Produção
description: Execute baterias de testes automatizados com Postman Runner, investigue casos de borda e prepare a API para produção.
---

# Aula 19 — Testes de API, Caça a Bugs e Preparação para Produção

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a automatizar baterias de testes em lote utilizando o **Postman Collection Runner**, realizar sessões estruturadas de caça a bugs (*Bug Hunting*) cobrindo casos de borda e preparar os scripts de inicialização otimizados para ambientes de produção.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O conceito de testes de regressão de API.
- Automação de testes de endpoints com **Postman Collection Runner**.
- Escrevendo asserções em JavaScript no Postman (`pm.test`, `pm.response.to.have.status`).
- Simulação de casos de borda (dados nulos, strings gigantescas, SQL Injection malicioso, tokens forjados).
- Diferença entre o ambiente de desenvolvimento (`nodemon`) e produção (`node`).

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### O que é o Postman Collection Runner?
Testar endpoints manualmente clicando em "Send" um a um consome tempo e deixa passar falhas em rotas antigas quando adicionamos um novo recurso.

O **Collection Runner** permite executar uma sequência de dezenas ou centenas de requisições de forma encadeada em poucos segundos, validando se todos os status codes e formatos de JSON esperados foram respeitados.

### Asserções no Postman:
Na aba **Scripts → Post-response** de qualquer requisição no Postman, podemos escrever asserções automáticas:

```javascript
// Verifica se o status retornado foi 201 Created:
pm.test('Status code deve ser 201 Created', function () {
  pm.response.to.have.status(201);
});

// Verifica se o corpo da resposta contém um token JWT:
pm.test('Resposta deve conter o token JWT', function () {
  const jsonData = pm.response.json();
  pm.expect(jsonData).to.have.property('token');
  pm.expect(jsonData.token).to.be.a('string');
});
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Preparação para Produção

No ambiente de produção, **nunca** usamos ferramentas de desenvolvimento como o `nodemon`, pois elas consomem mais memória monitorando o disco.

### 1. Atualizando o `package.json`
```json
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js",
    "prisma:migrate:prod": "prisma migrate deploy"
  }
}
```

* Em desenvolvimento: usamos `prisma migrate dev` (cria novas migrações e atualiza o banco).
* Em produção: usamos `prisma migrate deploy` (apenas aplica as migrações já existentes sem pedir confirmações interativas).

### 2. Tratamento Seguro de Falhas Não Capturadas: `src/server.js`
```javascript
// Captura erros críticos não tratados para evitar que a aplicação caia silenciosamente:
process.on('unhandledRejection', (reason, promise) => {
  console.error('⚠️ Rejeição de Promise não tratada:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('💥 Exceção não capturada:', error);
  process.exit(1);
});
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática: Sessão de Bug Hunting

1. Na sua coleção do Postman, crie testes automatizados (`pm.test`) para as rotas:
   - `POST /sessions` (verificando status 200 e presença do token).
   - `GET /perfil/me` (verificando status 200 e dados do usuário).
   - `POST /produtos` (verificando status 201 e dados gravados).
2. Execute a coleção completa pelo **Postman Runner** e confira a barra verde de 100% dos testes aprovados.
3. Troque a coleção com outra equipe da sala:
   - Tente "quebrar" a API do outro time enviando valores negativos, strings de 10.000 caracteres, datas impossíveis ou caracteres especiais.
   - Anote os bugs encontrados e ajude a equipe a blindar o código com o Zod.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] A coleção do Postman executa de ponta a ponta no Collection Runner.
- [ ] O script `npm start` inicializa a aplicação de forma limpa sem dependências de desenvolvimento.
- [ ] O script `npm run prisma:migrate:prod` está configurado para deploy em nuvem.
- [ ] Todos os casos de borda testados retornam erros controlados (sem expor o stack trace do Node.js).

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Pesquise sobre a ferramenta **Newman** (`npm install -g newman`), o executor de linha de comando do Postman. Como o Newman permite que empresas executem todos os testes da API automaticamente dentro de uma esteira de CI/CD (como GitHub Actions) antes de publicar a versão final?
