---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-para-dispositivos-moveis-aula-04-migracao-para-o-axios
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-para-dispositivos-moveis/aula-04-migracao-para-o-axios
sidebar_position: 4
title: Aula 04 — Migração para o Cliente HTTP Axios
description: Substitua o fetch nativo pelo Axios, configure instâncias base e intercepte requisições no React Native.
---

# Aula 04 — Migração para o Cliente HTTP Axios

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender as vantagens de utilizar uma biblioteca dedicada de cliente HTTP, instalar e configurar o **Axios** no React Native, criar uma instância centralizada com URL base (*BaseURL*) e controle de tempo limite (*timeout*), simplificando todas as chamadas assíncronas do aplicativo.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Limitações do `fetch` nativo no mobile (ausência de timeouts, parsing manual de JSON, repetição de headers).
- Instalação e vantagens da biblioteca **Axios**.
- Criação de uma instância singleton: `axios.create({ baseURL, timeout })`.
- Sintaxe limpa: `api.get()`, `api.post()`, `api.put()`, `api.delete()`.
- Captura unificada de erros com `error.response.data`.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### Por que migrar do `fetch` para o Axios?

| Recurso | `fetch` Nativo | Axios |
| :--- | :--- | :--- |
| **Conversão JSON** | Exige duas etapas manuais: `await res.json()` | Automático: `response.data` já vem como objeto |
| **URL Base** | É preciso repetir `http://meu-ip:3333` em toda chamada | Centralizado na instância com `baseURL` |
| **Tratamento de Status 4xx/5xx** | Não rejeita a Promise! É preciso checar `if (!res.ok)` | Lança automaticamente para o bloco `catch` |
| **Timeout de Rede** | Muito complexo (exige `AbortController`) | Propriedade nativa simples (ex: `timeout: 10000`) |
| **Interceptadores** | Não suporta nativamente | Permite injetar tokens JWT em todas as chamadas |

### Instalação:
```bash
npm install axios
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### 1. Centralizando a Conexão: `src/services/api.js`
```javascript
import axios from 'axios';
import { Platform } from 'react-native';

// Define o endereço IP inteligente dependendo de onde o app está executando
const getBaseUrl = () => {
  if (Platform.OS === 'android') {
    // 10.0.2.2 é o alias do emulador oficial do Android para o localhost do PC
    return 'http://10.0.2.2:3333';
  }
  // No iOS ou dispositivo físico via Expo Go na mesma rede Wi-Fi:
  return 'http://192.168.1.100:3333'; // Substitua pelo IP da sua máquina!
};

export const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000, // Se demorar mais de 10s, cancela e avisa sobre timeout
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### 2. Comparando a Produtividade do Código nas Telas:

#### Antes (com Fetch):
```javascript
const res = await fetch('http://10.0.2.2:3333/produtos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nome, preco }),
});
const dados = await res.json();
if (!res.ok) throw new Error(dados.message);
```

#### Agora (com Axios):
```javascript
import { api } from '../services/api';

// Muito mais limpo, direto e legível!
const { data } = await api.post('/produtos', { nome, preco });
```

### 3. Tratamento Padronizado de Erros:
```javascript
try {
  const { data } = await api.get('/produtos');
  setProdutos(data);
} catch (error) {
  if (error.response) {
    // O servidor respondeu com status 4xx ou 5xx
    Alert.alert('Erro do Servidor', error.response.data.message || 'Falha na requisição.');
  } else if (error.request) {
    // A requisição foi feita mas não houve resposta (timeout ou sem internet)
    Alert.alert('Falha de Conexão', 'Não foi possível alcançar o servidor. Verifique sua rede.');
  } else {
    Alert.alert('Erro', error.message);
  }
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Instale o pacote `axios` no seu projeto Expo.
2. Crie a pasta `src/services/` e configure o arquivo `api.js`.
3. Refatore todas as telas criadas nas aulas anteriores (`CriarProdutoScreen` e a lista de produtos) para utilizar os métodos `api.get()`, `api.post()` e `api.delete()`.
4. Teste as operações e comprove a redução de linhas de código e a facilidade de manutenção.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O pacote `axios` está instalado no projeto.
- [ ] O arquivo `src/services/api.js` exporta a instância configurada com `baseURL`.
- [ ] As chamadas de API nas telas utilizam a instância `api` sem URLs duplicadas.
- [ ] Erros retornados pelo backend (como status 400 ou 409) são lidos em `error.response.data.message`.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Como o Axios permite configurar **interceptadores de resposta** (`api.interceptors.response.use(...)`), pesquise como interceptar globalmente qualquer erro `401 Unauthorized` para deslogar o usuário e redirecioná-lo automaticamente para a tela de Login caso o token expire enquanto ele estiver usando o app!
