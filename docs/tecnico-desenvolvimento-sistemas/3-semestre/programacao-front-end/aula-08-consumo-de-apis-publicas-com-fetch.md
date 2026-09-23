---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-front-end-aula-08-consumo-de-apis-publicas-com-fetch
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-front-end/aula-08-consumo-de-apis-publicas-com-fetch
sidebar_position: 8
title: "Aula 08 — Consumo de APIs Públicas com Fetch"
description: Integre sua página a servidores externos consumindo endpoints RESTful e tratando estados de carregamento e erro.
---

# Aula 08 — Consumo de APIs Públicas com Fetch

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender como o front-end se comunica com serviços remotos através de requisições HTTP, utilizando a função nativa `fetch()` do navegador para consumir dados no formato JSON, manipulando respostas de APIs públicas e exibindo estados visuais de carregamento (*Loading Spinners*).

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O protocolo HTTP no navegador: métodos (GET, POST), URLs e códigos de status (200, 400, 404, 500).
- A API nativa `window.fetch()` e a leitura da resposta com `.json()`.
- Verificação de sucesso na resposta HTTP com `response.ok`.
- Gerenciamento de estados de interface: *Idle*, *Loading*, *Success* e *Error*.
- Consumo prático da API gratuita do **ViaCEP** para preenchimento automático de endereço.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

O `fetch()` retorna uma Promise que resolve em um objeto `Response`. Atenção para a pegadinha clássica do `fetch`: **ele não rejeita a promise em erros HTTP 404 ou 500!** Ele só rejeita em caso de falha de conexão com a rede.

Por isso, devemos sempre inspecionar a propriedade `response.ok`:

```javascript
const response = await fetch('https://viacep.com.br/ws/01001000/json/');

if (!response.ok) {
  throw new Error(`Erro na requisição: ${response.status}`);
}

const dados = await response.json();
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como criar um formulário com autopreenchimento de endereço por CEP:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Autopreenchimento de Endereço - ViaCEP</title>
  <style>
    .campo { margin-bottom: 12px; }
    #loader { display: none; color: #2563eb; font-weight: bold; }
  </style>
</head>
<body>
  <h2>Cadastro de Endereço</h2>

  <div class="campo">
    <label>CEP:</label>
    <input type="text" id="cep" placeholder="Apenas números (8 dígitos)" maxlength="8">
    <span id="loader">Buscando CEP...</span>
  </div>

  <div class="campo">
    <label>Rua / Logradouro:</label>
    <input type="text" id="logradouro" readonly>
  </div>

  <div class="campo">
    <label>Bairro:</label>
    <input type="text" id="bairro" readonly>
  </div>

  <div class="campo">
    <label>Cidade / UF:</label>
    <input type="text" id="cidade" readonly>
  </div>

  <script>
    const inputCep = document.querySelector('#cep');
    const loader = document.querySelector('#loader');

    inputCep.addEventListener('blur', async () => {
      const cep = inputCep.value.replace(/\D/g, '');

      if (cep.length !== 8) {
        alert('Por favor, informe um CEP válido com 8 dígitos.');
        return;
      }

      try {
        loader.style.display = 'inline'; // Ativa feedback visual

        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await response.json();

        if (dados.erro) {
          alert('CEP não localizado na base dos Correios.');
          return;
        }

        // Preenche os campos do formulário
        document.querySelector('#logradouro').value = dados.logradouro;
        document.querySelector('#bairro').value = dados.bairro;
        document.querySelector('#cidade').value = `${dados.localidade} - ${dados.uf}`;

      } catch (error) {
        console.error('Falha na requisição:', error);
        alert('Não foi possível consultar o CEP no momento. Verifique sua conexão.');
      } finally {
        loader.style.display = 'none'; // Desativa feedback visual
      }
    });
  </script>
</body>
</html>
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie uma aplicação que consuma a API pública gratuita da **PokéAPI** (`https://pokeapi.co/api/v2/pokemon/{nome_ou_id}`) ou a API de cotação de moedas AwesomeAPI (`https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL`).
2. Adicione um campo de busca e um botão "Pesquisar".
3. Enquanto a requisição estiver ocorrendo, exiba uma mensagem ou ícone giratório de carregamento.
4. Renderize na tela o nome, imagem oficial e atributos retornados pela API.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Requisição assíncrona executada com `fetch` e `await`.
- [ ] Conversão da resposta HTTP para JSON com `response.json()`.
- [ ] Indicador visual de carregamento enquanto aguarda a resposta do servidor.
- [ ] Tratamento amigável para termos pesquisados que não existem (ex: 404).

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione um cache em memória com um objeto simples: se o usuário já consultou o CEP ou Pokémon anteriormente, exiba direto da memória sem fazer um novo `fetch` na rede!
