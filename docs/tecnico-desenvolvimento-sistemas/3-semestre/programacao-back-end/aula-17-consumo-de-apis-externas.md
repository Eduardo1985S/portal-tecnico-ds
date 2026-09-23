---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-back-end-aula-17-consumo-de-apis-externas
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-back-end/aula-17-consumo-de-apis-externas
sidebar_position: 17
title: Aula 17 — Integração e Consumo de APIs Externas no Back-End
description: Aprenda como um servidor Node.js consome serviços externos de terceiros (ViaCEP, gateways, cotações) usando Axios e Fetch.
---

# Aula 17 — Integração e Consumo de APIs Externas no Back-End

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender como aplicações Back-End interagem com serviços de terceiros na internet (como gateways de pagamento, APIs de geolocalização e serviços de consulta de CEP), aprender a utilizar clientes HTTP assíncronos no Node.js e tratar adequadamente falhas e timeouts em serviços externos.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O ecossistema de APIs de terceiros na engenharia de software moderna.
- A função nativa `fetch()` do Node.js moderno vs. o cliente **Axios**.
- Autenticação com APIs externas através de chaves de API (*API Keys / Bearer Tokens*).
- Tratamento de falhas, respostas de erro e controle de tempo limite (*timeout*).
- Prática: Autopreenchimento de dados de endereço via API pública do **ViaCEP**.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### O Servidor como Cliente HTTP
Frequentemente associamos clientes HTTP a navegadores ou aplicativos mobile. No entanto, na arquitetura de microsserviços e sistemas integrados, **o nosso servidor Back-End frequentemente atua como cliente**, disparando requisições contra outros servidores na nuvem:

```
[ Usuário / Mobile ] 
        ↓ (1. Envia CEP "01001000")
[ Nossa API Node.js ] 
        ↓ (2. Dispara requisição HTTP GET para https://viacep.com.br/ws/01001000/json/)
[ Servidor do ViaCEP ] 
        ↓ (3. Retorna Logradouro, Bairro, Cidade, UF)
[ Nossa API Node.js ] 
        ↓ (4. Salva endereço no PostgreSQL e responde ao Mobile)
[ Usuário / Mobile ]
```

### Por que fazer a integração pelo Back-End em vez do Front-End?
1. **Segurança de Credenciais:** Se a API de pagamento exigir uma chave secreta privada (`API_SECRET_KEY`), colocá-la no frontend exporia a chave a qualquer usuário inspecionando o código. No backend, ela fica 100% protegida dentro do arquivo `.env`.
2. **Consistência de Dados:** O backend pode salvar os dados retornados no banco local antes de devolver a resposta.
3. **Evitar Bloqueios de CORS:** Requisições disparadas de servidor para servidor **não sofrem restrição de CORS (Cross-Origin Resource Sharing)**.

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### 1. Criando um Serviço Integrador: `src/services/BuscarEnderecoViaCepService.js`
```javascript
import { AppError } from '../errors/AppError.js';

export class BuscarEnderecoViaCepService {
  async execute(cep) {
    // 1. Limpa a string do CEP removendo pontos e traços
    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
      throw new AppError('O CEP informado deve conter exatamente 8 dígitos.', 400);
    }

    try {
      // 2. Dispara a requisição contra a API pública do ViaCEP
      const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`, {
        method: 'GET',
        headers: { 'User-Agent': 'PortalTecnicoDS-NodeAPI' },
      });

      if (!resposta.ok) {
        throw new AppError('Falha ao comunicar com o serviço de CEP.', 502);
      }

      const dados = await resposta.json();

      // O ViaCEP retorna { erro: "true" } quando o CEP não existe
      if (dados.erro) {
        throw new AppError('CEP não encontrado na base dos Correios.', 404);
      }

      // 3. Normaliza e retorna apenas os dados essenciais para o nosso sistema
      return {
        cep: dados.cep,
        logradouro: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Serviço de consulta de endereço temporariamente indisponível.', 503);
    }
  }
}
```

### 2. Controlador e Rota:
```javascript
// src/controllers/EnderecosController.js
import { BuscarEnderecoViaCepService } from '../services/BuscarEnderecoViaCepService.js';

export class EnderecosController {
  async consultarCep(req, res, next) {
    try {
      const { cep } = req.params;
      const service = new BuscarEnderecoViaCepService();
      const endereco = await service.execute(cep);

      return res.json(endereco);
    } catch (error) {
      next(error);
    }
  }
}

// src/routes/enderecos.routes.js
import { Router } from 'express';
import { EnderecosController } from '../controllers/EnderecosController.js';

const enderecosRoutes = Router();
const controller = new EnderecosController();

enderecosRoutes.get('/cep/:cep', (req, res, next) => controller.consultarCep(req, res, next));

export { enderecosRoutes };
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Implemente o serviço `BuscarEnderecoViaCepService` no seu projeto.
2. Registre a rota `GET /enderecos/cep/:cep` no seu servidor.
3. Teste no Postman com:
   - Um CEP válido (ex: `01001-000` da Praça da Sé em SP).
   - Um CEP com menos dígitos para verificar a validação de 400.
   - Um CEP de 8 dígitos inexistente (ex: `99999999`) para conferir o erro 404.
4. Integre a consulta de CEP ao serviço de cadastro de usuários ou clientes, preenchendo automaticamente os campos de endereço no banco de dados.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] A chamada para a API externa utiliza tratamento de assincronismo (`async/await`).
- [ ] A resposta do serviço externo é normalizada para a nomenclatura interna do sistema.
- [ ] Falhas de conexão externa são tratadas com mensagens claras sem quebrar o servidor.
- [ ] Caracteres não numéricos do CEP são higienizados antes da requisição.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Pesquise sobre a API pública do **CoinGecko** ou da **AwesomeAPI** (cotação de moedas em tempo real: `https://economia.awesomeapi.com.br/last/USD-BRL`). Crie um endpoint `GET /cotacao/dolar` no seu servidor que consulte essa API e devolva o valor atual de compra e venda do Dólar em Reais formatado!
