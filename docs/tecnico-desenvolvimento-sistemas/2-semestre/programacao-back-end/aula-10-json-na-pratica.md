---
id: tecnico-desenvolvimento-sistemas-2-semestre-programacao-back-end-aula-10-json-na-pratica
slug: /tecnico-desenvolvimento-sistemas/2-semestre/programacao-back-end/aula-10-json-na-pratica
sidebar_position: 10
title: Aula 10 — JSON na Prática
description: Aprenda as regras do formato JSON, domine a conversão entre objetos JavaScript e JSON (JSON.parse / JSON.stringify) e manipule coleções de dados no Back-End.
---

# Aula 10 — JSON na Prática

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender o formato universal **JSON (JavaScript Object Notation)**, dominar a conversão e serialização de dados com `JSON.stringify()` e `JSON.parse()`, tratar erros de sintaxe com blocos `try/catch` e manipular coleções JSON no Back-End.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O que é o formato JSON e por que ele é o padrão da Web.
- Regras estritas de sintaxe do JSON (Aspas duplas, tipos suportados).
- Serialização: Convertendo objetos para string JSON com `JSON.stringify()`.
- Deserialização: Convertendo strings JSON para objetos com `JSON.parse()`.
- Tratamento de erros de conversão com blocos `try/catch`.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### 1. O que é o JSON?
**JSON (JavaScript Object Notation)** é um formato de texto leve, legível por humanos e independente de linguagem de programação, utilizado para trocar dados entre o cliente (navegador/app) e o servidor Back-End.

Apesar de ser derivado da sintaxe do JavaScript, o JSON pode ser lido e gerado por praticamente qualquer linguagem de programação moderna (Python, Java, C#, PHP, etc.).

---

### 2. Regras Rígidas de Sintaxe JSON

Diferente do JavaScript convencional, o JSON possui regras de sintaxe bem estritas:

| Regra | Válido no JSON | Inválido no JSON |
| :--- | :--- | :--- |
| **Aspas em Chaves e Strings** | `"nome": "Carlos"` | `'nome': 'Carlos'` ou `nome: "Carlos"` |
| **Vírgula no último item** | `{"a": 1, "b": 2}` | `{"a": 1, "b": 2,}` (Trailing comma) |
| **Tipos Suportados** | String, Number, Boolean, Null, Array, Object | Funções, `undefined`, `Symbol` |

#### Exemplo de um arquivo JSON válido (`usuario.json`):
```json
{
  "id": 101,
  "nome": "Mariana Costa",
  "ativo": true,
  "habilidades": ["Node.js", "SQL", "Git"],
  "endereco": {
    "cidade": "São Paulo",
    "uf": "SP"
  }
}
```

---

### 3. Serialização e Deserialização em JS

No Node.js, temos dois métodos globais nativos para manipular JSON:

#### 1. `JSON.stringify(objeto, replacer, espacos)` (Serializar)
Converte um objeto ou array JavaScript em uma **string em formato JSON** para ser enviada pela rede ou salva em disco.

```javascript
const usuarioObj = { id: 1, nome: 'Ana', admin: true };

// Convertendo para String JSON formatada (com recuo de 2 espaços)
const jsonString = JSON.stringify(usuarioObj, null, 2);

console.log(typeof jsonString); // "string"
console.log(jsonString);
```

#### 2. `JSON.parse(textoJson)` (Deserializar)
Converte uma **string em formato JSON** de volta para um **Objeto JavaScript** operável.

```javascript
const entrada = '{"id": 2, "nome": "Pedro", "saldo": 150.50}';

// Convertendo String JSON em Objeto JS
const produto = JSON.parse(entrada);

console.log(produto.nome);  // "Pedro"
console.log(produto.saldo); // 150.5
```

---

### 4. Tratamento de Erros com `try/catch`
Se uma string JSON malformatada for passada ao `JSON.parse()`, a aplicação lançará um erro do tipo `SyntaxError` que interromperá o servidor. Por isso, **sempre protegemos a deserialização com `try/catch`**:

```javascript
const jsonInvalido = '{"nome": "Lucas",}'; // Erro: vírgula sobrando

try {
  const dados = JSON.parse(jsonInvalido);
  console.log(dados);
} catch (erro) {
  console.log("❌ Falha ao processar JSON:", erro.message);
}
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### Módulo de Processamento e Formatação JSON com ES Modules

Vamos construir um utilitário Back-End para validar e manipular coleções JSON.

#### Arquivo 1: `jsonHelper.js`
```javascript
// jsonHelper.js

export const converterParaJson = (dados) => {
  return JSON.stringify(dados, null, 2);
};

export const parsearJsonSeguro = (stringJson) => {
  try {
    const objeto = JSON.parse(stringJson);
    return { sucesso: true, dados: objeto };
  } catch (erro) {
    return { sucesso: false, erro: erro.message };
  }
};
```

#### Arquivo 2: `app.js`
```javascript
// app.js
import { converterParaJson, parsearJsonSeguro } from './jsonHelper.js';

console.log("==========================================");
console.log("📄 PROCESSADOR E FORMATADOR JSON BACK-END");
console.log("==========================================");

// 1. Serializando um objeto JS
const novoCliente = {
  codigo: "CLI-998",
  nome: "Fernanda Lima",
  compras: [
    { item: "Teclado", valor: 250 },
    { item: "Mousepad", valor: 50 }
  ]
};

const jsonString = converterParaJson(novoCliente);
console.log("✅ Objeto JS convertido para JSON String:\n", jsonString);

// 2. Deserializando uma string JSON válida
const jsonValido = '{"status": "sucesso", "codigoHTTP": 200, "itens": [10, 20, 30]}';
const resultadoSucesso = parsearJsonSeguro(jsonValido);

if (resultadoSucesso.sucesso) {
  console.log("\n✅ JSON parsed com sucesso! Primeiro item:", resultadoSucesso.dados.itens[0]);
}

// 3. Tentando deserializar um JSON inválido (Protegido por try/catch)
const jsonErronado = '{"usuario": "Carlos", "idade": }'; // Sintaxe errada
const resultadoErro = parsearJsonSeguro(jsonErronado);

if (!resultadoErro.sucesso) {
  console.log("\n⚠️ Tratamento de erro disparado:", resultadoErro.erro);
}
```

#### Arquivo 3: `package.json`
```json
{
  "name": "json-na-pratica",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node app.js"
  }
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

### Validador e Sanitizador de Payloads JSON

**Objetivo:** Praticar a criação de funções de conversão, tratamento de exceções com `try/catch` e manipulação de arrays JSON.

**Instruções:**
1. Crie uma pasta `atividade-aula-10` com `"type": "module"` no `package.json`.
2. Crie o arquivo `payloadManager.js` com duas funções exportadas:
   - `sanitizarPayload(stringEntrada)`: Tenta converter a string recebida com `JSON.parse()`. Se der erro, retorna `{ valido: false, erro: "JSON inválido" }`. Se der certo, remove qualquer propriedade que seja do tipo string vazia e retorna `{ valido: true, dados: objetoFiltrado }`.
   - `gerarRespostaHttp(status, dados)`: Recebe um status numérico e um objeto de dados, retornando uma string JSON gerada por `JSON.stringify()`.
3. No arquivo `index.js`, teste a sanitização com um JSON válido com campos vazios e com um JSON malformatado.
4. Execute com `npm start`.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O aluno compreendeu as regras de sintaxe do formato JSON (aspas duplas, tipos permitidos).
- [ ] O aluno utilizou `JSON.stringify()` para serializar objetos JS.
- [ ] O aluno utilizou `JSON.parse()` para deserializar textos JSON.
- [ ] O aluno protegeu a chamada `JSON.parse()` usando um bloco `try/catch`.
- [ ] O aluno organizou o código em ES Modules e executou no terminal com `npm start`.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

O JSON é o "idioma nativo" da Web e das APIs RESTful. Todas as requisições que chegam de clientes web/mobile e todas as respostas enviadas pelo servidor utilizam este formato!

**Desafio Extra:** Use o segundo argumento de `JSON.stringify(objeto, ['nome', 'email'])` (array de substituição/replacer) para serializar apenas os campos `nome` e `email` de um objeto com múltiplos atributos!
