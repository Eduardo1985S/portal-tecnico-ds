---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-front-end-aula-06-cliente-http-axios-e-interceptors
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-front-end/aula-06-cliente-http-axios-e-interceptors
sidebar_position: 6
title: "Aula 06 — Cliente HTTP Axios e Interceptors"
description: Configure o Axios para consumo profissional de APIs RESTful e configure interceptors automáticos com tokens JWT.
---

# Aula 06 — Cliente HTTP Axios e Interceptors

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Substituir o `fetch()` nativo pelo cliente HTTP profissional **Axios**, compreendendo suas vantagens de produtividade (serialização automática de JSON, rejeição direta de erros com códigos HTTP 4xx/5xx), criando uma instância configurada com `baseURL` e dominando o uso de **Interceptors** para injetar automaticamente tokens de autenticação JWT em todos os cabeçalhos de requisição.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Por que o mercado prefere o **Axios** sobre o `fetch` nativo em sistemas corporativos.
- Instalação e configuração de uma instância singleton: `api = axios.create({ baseURL, timeout })`.
- Serialização e desserialização transparente de payloads JSON (`response.data`).
- Tratamento estruturado de erros com `error.response?.data`.
- Interceptadores de Requisição (*Request Interceptors*): injetando o cabeçalho `Authorization: Bearer <token>` de forma centralizada.
- Interceptadores de Resposta (*Response Interceptors*): deslogando automaticamente o usuário em caso de erro HTTP 401 (Não Autorizado).

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Com o `fetch`, você precisaria escrever em dezenas de páginas:
```javascript
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
}
```
Se o token mudar de nome ou se a URL da API mudar de endereço, você teria que alterar dezenas de arquivos!

Com o **Axios e Interceptors**, você configura uma única vez no arquivo `src/services/api.js`:

```text
[ Qualquer Requisição da sua Aplicação ]
                   │
                   ▼
       [ Axios Request Interceptor ]
       -> Lê o token do LocalStorage
       -> Injeta no cabeçalho Authorization: Bearer <token>
                   │
                   ▼
         [ Servidor Back-End ]
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como estruturar o serviço de API centralizado:

```bash
# 1. Instale o Axios no projeto
npm install axios
```

```javascript
// src/services/api.js
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://minha-api-backend.com/api',
  timeout: 10000 // Cancela a requisição se demorar mais que 10 segundos
});

// 1. INTERCEPTOR DE REQUISIÇÃO: Anexa o token JWT se ele existir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@app_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// 2. INTERCEPTOR DE RESPOSTA: Captura sessões expiradas (401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Sessão expirada. Redirecionando para login...');
      localStorage.removeItem('@app_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

Consumindo a API dentro de um componente React com `useEffect`:

```jsx
// src/pages/ListaAlunos.jsx
import { useState, useEffect } from 'react';
import { api } from '../services/api';

export function ListaAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        // O Axios já entrega a resposta convertida em .data!
        const resposta = await api.get('/alunos');
        setAlunos(resposta.data);
      } catch (err) {
        setErro(err.response?.data?.mensagem || 'Falha ao carregar alunos.');
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  if (carregando) return <p>Carregando registros do servidor...</p>;
  if (erro) return <p style={{ color: 'red' }}>{erro}</p>;

  return (
    <div>
      <h3>Alunos Cadastrados</h3>
      <ul>
        {alunos.map(aluno => (
          <li key={aluno.id}>{aluno.nome} ({aluno.email})</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie o arquivo `src/services/api.js` configurando uma instância do Axios apontando para a sua API local do Back-End (`http://localhost:3000/api`) ou para uma API pública (ex: JSONPlaceholder).
2. Configure o interceptor de requisição para injetar o cabeçalho `Authorization`.
3. Crie uma tela que faça uma chamada `api.get('/produtos')` e liste os dados retornados na tela em uma tabela HTML estilizada.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Instalação e importação do Axios.
- [ ] Criação de instância personalizada com `axios.create()`.
- [ ] Interceptor de requisição anexando cabeçalho de autorização.
- [ ] Tratamento de erros utilizando o bloco `try/catch` capturando `error.response`.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione um `console.log` formatado dentro do interceptor de resposta medindo o tempo em milissegundos que cada chamada de API levou para ser respondida pelo servidor!
