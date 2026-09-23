---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-para-dispositivos-moveis-aula-09-banco-de-dados-sqlite-no-expo
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-para-dispositivos-moveis/aula-09-banco-de-dados-sqlite-no-expo
sidebar_position: 9
title: Aula 09 — Banco de Dados Local com SQLite no Expo
description: Crie bancos relacionais locais dentro do smartphone utilizando a biblioteca expo-sqlite com suporte a SQL nativo.
---

# Aula 09 — Banco de Dados Local com SQLite no Expo

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender as limitações do AsyncStorage para grandes volumes de dados ou consultas com filtros e ordenações, instalar e configurar a biblioteca **`expo-sqlite`**, e aprender a criar tabelas e executar queries relacionais com SQL nativo diretamente no armazenamento interno do celular.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- AsyncStorage (Chave-Valor simples) vs. **SQLite (Banco de Dados Relacional Embarcado)**.
- O que é o motor SQLite e por que ele equipa 100% dos smartphones do mundo (Android e iOS).
- Instalação e uso da API moderna do `expo-sqlite`.
- Execução de comandos DDL (`CREATE TABLE IF NOT EXISTS`) na inicialização do app.
- Consultas parametrizadas para evitar falhas e injeções de SQL.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### Quando usar SQLite em vez de AsyncStorage?
O AsyncStorage é ótimo para guardar um token de 100 caracteres ou o nome do usuário. No entanto, se o seu aplicativo precisar:
* Salvar 1.000 produtos ou notas fiscais para consulta offline.
* Fazer buscas por nome com `LIKE '%termo%'`.
* Filtrar por faixa de preço ou categoria com `WHERE`.
* Ordenar por data ou valor com `ORDER BY`.

Fazer isso com AsyncStorage exigiria carregar uma string gigantesca em memória, desserializar com `JSON.parse` e filtrar em JavaScript toda vez — o que causaria travamentos severos no celular!

O **SQLite** é um banco de dados relacional SQL completo que roda direto em um arquivo local no smartphone com extrema velocidade e baixo consumo de bateria.

### Instalação no Expo:
```bash
npx expo install expo-sqlite
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### 1. Inicializando o Banco e Tabelas: `src/database/sqlite.js`
```javascript
import * as SQLite from 'expo-sqlite';

// Abre ou cria o arquivo do banco no dispositivo
export const db = SQLite.openDatabaseSync('meuapp.db');

export function inicializarBanco() {
  // Cria a tabela de notas/tarefas locais se ela ainda não existir
  db.execSync(`
    CREATE TABLE IF NOT EXISTS notas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      conteudo TEXT,
      criado_em TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);
}
```

### 2. Funções de Repositório Local: `src/database/notasRepository.js`
```javascript
import { db } from './sqlite';

// Inserir registro
export function criarNota(titulo, conteudo) {
  const statement = db.prepareSync(
    'INSERT INTO notas (titulo, conteudo) VALUES ($titulo, $conteudo)'
  );
  try {
    const result = statement.executeSync({ $titulo: titulo, $conteudo: conteudo });
    return result.lastInsertRowId;
  } finally {
    statement.finalizeSync();
  }
}

// Consultar todos os registros ordenados pelos mais recentes
export function listarNotas() {
  const statement = db.prepareSync('SELECT * FROM notas ORDER BY id DESC');
  try {
    const result = statement.executeSync();
    return result.getAllSync(); // Retorna array com todos os objetos!
  } finally {
    statement.finalizeSync();
  }
}

// Excluir registro por ID
export function excluirNota(id) {
  const statement = db.prepareSync('DELETE FROM notas WHERE id = $id');
  try {
    statement.executeSync({ $id: id });
  } finally {
    statement.finalizeSync();
  }
}
```

### 3. Chamando a Inicialização no `App.js`:
```jsx
import React, { useEffect } from 'react';
import { inicializarBanco } from './src/database/sqlite';
import { Routes } from './src/routes';

export default function App() {
  useEffect(() => {
    // Garante que o banco e as tabelas estejam prontos ao abrir o app
    inicializarBanco();
  }, []);

  return <Routes />;
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Instale o `expo-sqlite` no seu projeto.
2. Crie a pasta `src/database/` com os arquivos `sqlite.js` e `notasRepository.js`.
3. Crie uma tela simples chamada `NotasScreen`:
   - Um campo para digitar o título da nota e outro para o conteúdo.
   - Um botão "Salvar Nota Local" que chama `criarNota(titulo, conteudo)`.
   - Uma `<FlatList>` que renderiza as notas gravadas no SQLite.
   - Um botão de lixeira em cada card que chama `excluirNota(id)` e atualiza a listagem.
4. Feche o app, reinicie e comprove que todas as notas continuam salvas no banco de dados SQLite local!

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O pacote `expo-sqlite` está instalado e funcional.
- [ ] A tabela é criada automaticamente via `CREATE TABLE IF NOT EXISTS`.
- [ ] As consultas utilizam comandos parametrizados (`prepareSync`).
- [ ] A listagem exibe registros lidos diretamente do banco interno do celular.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione uma função `buscarNotasPorTermo(termo)` no seu repositório que execute `SELECT * FROM notas WHERE titulo LIKE '%' || $termo || '%'`. Conecte essa busca a um campo de pesquisa no topo da tela e veja as notas sendo filtradas instantaneamente no banco SQLite conforme o usuário digita!
