# Plano de Curso - Programação para Dispositivos Móveis (4º Semestre)

**Carga horária:** 20 Semanas
**Foco:** Operações avançadas de API (POST/PUT/DELETE), Armazenamento Local, Funcionalidades Nativas (Câmera, Mapas), Firebase e Publicação.
**Ferramentas:** React Native, Expo, Axios, AsyncStorage, Firebase.

---

### Módulo 1: APIs Avançadas e Estado Global (Semanas 1 a 6)
- **Semana 01:** Revisão e Consolidação
  - Revisão de React Navigation e Requisições GET com `fetch`.
  - Otimização do projeto final do 3º semestre.
- **Semana 02:** Requisições POST e PUT
  - Enviando dados para uma API (Criação de registros).
  - Como enviar um JSON no corpo (body) da requisição.
  - Atualizando dados existentes (PUT/PATCH).
- **Semana 03:** Requisições DELETE e Tratamento de Erros
  - Excluindo registros via API.
  - Boas práticas de tratamento de erros com blocos `try/catch`.
  - Usando `Alert` para informar o usuário.
- **Semana 04:** Migração para o Axios
  - O que é o Axios e suas vantagens sobre o `fetch`.
  - Instalação e uso em métodos HTTP (get, post, delete).
  - Configurando uma "base URL" com `axios.create()`.
- **Semana 05:** Gerenciamento de Estado Global (Context API)
  - O problema do "Prop Drilling" (passar props por várias telas).
  - Introdução à Context API do React.
  - Criando um contexto global.
- **Semana 06:** Context API na Prática
  - Aplicação de estado global: Criando um carrinho de compras simples ou um sistema de troca de Tema (Light/Dark Mode).

### Módulo 2: Armazenamento e Bancos Locais (Semanas 7 a 10)
- **Semana 07:** Introdução ao Armazenamento Local (AsyncStorage)
  - O que é e para que serve o AsyncStorage.
  - Como salvar dados em texto/string.
  - Persistindo estados simples (ex: "O usuário já viu o tutorial?").
- **Semana 08:** AsyncStorage com Objetos JSON
  - Serialização e Deserialização (`JSON.stringify` e `JSON.parse`).
  - Salvando informações de Login do usuário.
- **Semana 09:** Banco de Dados Local Avançado (SQLite no Expo)
  - Quando usar SQLite ao invés de AsyncStorage.
  - Configuração do `expo-sqlite`.
  - Criação de tabelas e comandos SQL básicos dentro do App.
- **Semana 10:** Prática: App Offline-First (CRUD Local)
  - Construção de um pequeno sistema de controle financeiro 100% offline utilizando o SQLite.

### Módulo 3: Recursos Nativos do Dispositivo (Semanas 11 a 14)
- **Semana 11:** Trabalhando com Imagens e Câmera
  - Permissões de dispositivo.
  - Uso do `expo-image-picker` para abrir a galeria e tirar fotos.
  - Exibindo a foto capturada no App.
- **Semana 12:** Mapas e Geolocalização
  - Uso do `expo-location` para capturar a posição do GPS (Latitude e Longitude).
  - Exibindo a localização em um mapa interativo com `react-native-maps`.
- **Semana 13:** Notificações Push Locais
  - Introdução ao `expo-notifications`.
  - Solicitando permissão e enviando uma notificação local programada.
- **Semana 14:** Animações Visuais
  - Uso do pacote nativo `Animated`.
  - Criando botões que pulsam ou modais que sobem suavemente na tela.

### Módulo 4: Nuvem e Publicação (Semanas 15 a 20)
- **Semana 15:** Integração com Firebase (Autenticação)
  - O que é o Firebase (BaaS).
  - Configurando o projeto no Console do Firebase.
  - Criando sistema de Login e Cadastro de usuários por E-mail/Senha.
- **Semana 16:** Firebase Firestore (Banco de dados na nuvem)
  - Configuração do Firestore (banco NoSQL Real-time).
  - Salvando e lendo dados de coleções e documentos na nuvem.
- **Semana 17:** Planejamento do Projeto Final Integrador
  - Definição do escopo, requisitos e rascunho de telas (Figma/Wireframe).
  - O projeto deve usar: Navegação, Firebase (Auth + Firestore) e UI organizada.
- **Semana 18:** Desenvolvimento do Projeto Final (Parte 1)
  - Construção de telas, rotas de navegação e componentização.
- **Semana 19:** Desenvolvimento do Projeto Final (Parte 2)
  - Conexões com banco de dados, fluxos de autenticação e refinamento de bugs.
- **Semana 20:** Apresentação e Geração do APK/AAB
  - Como funciona o EAS (Expo Application Services).
  - Gerando o arquivo final `.apk` para instalação em Android.
  - Apresentação final dos projetos para a turma.
