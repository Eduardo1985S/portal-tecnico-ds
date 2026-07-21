---
id: tecnico-desenvolvimento-sistemas-2-semestre-programacao-back-end-aula-01-introducao-a-web-e-arquitetura-back-end
slug: /tecnico-desenvolvimento-sistemas/2-semestre/programacao-back-end/aula-01-introducao-a-web-e-arquitetura-back-end
sidebar_position: 1
title: Aula 01 — Introdução à Web e Arquitetura Back-End
description: Compreenda o funcionamento da Web, a arquitetura Cliente-Servidor e as diferenças fundamentais entre Front-End e Back-End.
---

# Aula 01 — Introdução à Web e Arquitetura Back-End

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender o funcionamento fundamental da Web, entender a arquitetura Cliente-Servidor, diferenciar as responsabilidades do Front-End e do Back-End e mapear o fluxo de requisição e resposta na troca de dados na rede.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O funcionamento da Internet e da World Wide Web (IP, DNS, Servidores).
- A Arquitetura Cliente-Servidor (Client-Server Architecture).
- Diferenças conceituais e práticas: Front-End vs Back-End.
- O Fluxo de Dados: Requisição (Request) e Resposta (Response).
- O papel do desenvolvedor Back-End no mercado de tecnologia.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### 1. Internet vs World Wide Web
Antes de construir aplicações servidoras, é essencial entender o ambiente onde elas executam:
- **Internet:** É a infraestrutura física global composta por computadores, cabos submarinos, roteadores e redes conectadas entre si.
- **Web (WWW):** É um serviço que roda sobre a Internet, permitindo a visualização de documentos e aplicações acessadas por meio de navegadores usando o protocolo HTTP/HTTPS.

Para que dois computadores se comuniquem na rede:
- **Endereço IP:** Cada dispositivo possui uma identificação única na rede (ex: `192.168.1.1` ou `142.250.190.46`).
- **DNS (Domain Name System):** Funciona como a "agenda telefônica" da Internet, traduzindo nomes de domínio amigáveis (como `www.senai.br`) no endereço IP correspondente do servidor.

### 2. A Arquitetura Cliente-Servidor
Toda aplicação web moderna opera sobre o modelo **Cliente-Servidor**:

1. **Cliente (Client):** É quem solicita recursos ou serviços. Pode ser um navegador web (Chrome, Firefox), um aplicativo mobile (iOS/Android) ou outro sistema computacional.
2. **Servidor (Server):** É uma máquina dedicada (ou instância em nuvem) configurada para escutar requisições, processar a lógica de negócio, consultar banco de dados e devolver a resposta adequada.

### 3. Front-End vs Back-End: A Analogia do Restaurante
Para entender a divisão de responsabilidades em desenvolvimento de software, imagine um **restaurante**:

| Conceito | Restaurante | Desenvolvimento Web |
| :--- | :--- | :--- |
| **Front-End** | O salão, as mesas, a decoração, o cardápio visual e o garçom que atende o cliente. | A interface do usuário (HTML, CSS, JS/React), com a qual o usuário interage visualmente no navegador. |
| **Back-End** | A cozinha, os cozinheiros, a despensa e o controle de estoque. | O servidor, os scripts Node.js/Java/Python, regras de validação, segurança e o banco de dados. |

#### Responsabilidades do Back-End:
- **Regras de Negócio:** Validar se um usuário pode realizar um Pix, se o produto tem estoque ou se a senha está correta.
- **Segurança e Autenticação:** Garantir que dados sensíveis não fiquem expostos no navegador.
- **Persistência de Dados:** Salvar e consultar informações com eficiência em Banco de Dados (SQL/NoSQL).
- **Integração:** Conectar-se a serviços externos (gateways de pagamento, envio de e-mails/SMS, APIs de mapas).

### 4. O Ciclo Requisição e Resposta (Request-Response Cycle)
Toda interação web segue este ciclo fundamental:

```
[ Cliente / Browser ]  --- (1) HTTP Request (Requisição) --->  [ Servidor Back-End ]
                       <--- (2) HTTP Response (Resposta) ----  [ Banco de Dados / Lógica ]
```

1. **Requisição (Request):** O cliente envia uma intenção (ex: "Quero listar os alunos da turma").
2. **Processamento:** O servidor recebe, valida quem está pedindo, busca os dados e monta a resposta.
3. **Resposta (Response):** O servidor responde com o status apropriado (ex: `200 OK`) e os dados formatados (geralmente em formato JSON).

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### Analisando o Fluxo de Dados com as Ferramentas do Desenvolvedor (DevTools)

Vamos observar o ciclo requisição/resposta acontecendo na prática usando o próprio navegador:

1. Abra qualquer site no seu navegador (ex: `https://api.github.com/users/github`).
2. Pressione `F12` (ou clique com botão direito > **Inspecionar**) e acesse a aba **Rede (Network)**.
3. Recarregue a página (`F5`).
4. Clique no primeiro item da lista de rede para examinar os detalhes:

#### O que o Cliente Enviou (Headers de Requisição / Request):
- **URL solicitada:** `https://api.github.com/users/github`
- **Método HTTP:** `GET` (solicitação de leitura)

#### O que o Servidor Back-End Respondeu (Response):
- **Código de Status:** `200 OK`
- **Tipo de Conteúdo (Content-Type):** `application/json`
- **Corpo da Resposta (JSON):**
```json
{
  "login": "github",
  "id": 9919,
  "type": "Organization",
  "name": "GitHub",
  "public_repos": 500
}
```

Neste exemplo, o navegador (Front-End) recebe exatamente este código JSON gerado pelo servidor do GitHub (Back-End) e renderiza na tela de forma amigável para o usuário.

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

### Mapeando a Arquitetura de um Sistema Real

**Objetivo:** Identificar os elementos Cliente, Servidor e Dados em uma aplicação do cotidiano.

**Instruções:**
1. Escolha uma das aplicações abaixo:
   - **Sistema de Login de uma Rede Social (ex: Instagram/LinkedIn)**
   - **Sistema de Compra de um E-commerce (ex: Mercado Livre/Amazon)**
   - **Sistema de Reserva de Filmes/Cinema**
2. Em um documento ou caderno, faça um diagrama textual respondendo:
   - **a) O que faz parte da camada Front-End?** (Quais telas, botões e campos o usuário interage?)
   - **b) Qual é o papel da camada Back-End?** (Quais validações e regras de negócio o servidor deve processar por trás dos panos?)
   - **c) Quais dados precisam ser salvos ou consultados no Banco de Dados?**
3. Abra a aba **Network** do navegador em um site à sua escolha, tire um print ou anote:
   - Qual a URL de uma requisição realizada?
   - Qual foi o Método (GET, POST) e o Status da resposta (ex: 200)?

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O aluno compreendeu a diferença entre Internet, Web e IP/DNS.
- [ ] O aluno sabe explicar o modelo Cliente-Servidor e a analogia do restaurante.
- [ ] O aluno diferencou claramente as responsabilidades de Front-End e Back-End.
- [ ] O aluno inspecionou uma requisição de rede utilizando o DevTools do navegador.
- [ ] O aluno entregou a atividade prática com o mapeamento do sistema escolhido.

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

No desenvolvimento Back-End, a curiosidade de entender "o que acontece debaixo do capô" é a sua maior ferramenta. Sempre que usar um site ou aplicativo no seu dia a dia, pergunte-se: *Quais dados o meu aplicativo está enviando ao servidor? Onde essa informação fica armazenada? Como o servidor garante que outro usuário não acesse a minha conta?*

Nas próximas aulas, começaremos a construir o nosso próprio ambiente de servidor usando **Node.js**!
