# Plano de Curso: Programação para Dispositivos Móveis II (20 Semanas)

**Unidade Curricular:** Programação para Dispositivos Móveis (Etapa 2)  
**Carga Horária Total:** 60 horas  
**Carga Semanal:** 4 horas/semana (20 Semanas)  
**Módulo:** Módulo Específico II — 4º Semestre  
**Foco:** Operações Avançadas de API (POST, PUT, DELETE) com Axios, Gerenciamento de Estado Global (Context API), Armazenamento Local Persistente (AsyncStorage), Banco de Dados Local Offline-First (SQLite no Expo), Recursos Nativos do Dispositivo (Câmera com Expo Image Picker, Geolocalização com Expo Location, Notificações Push Locais), Backend as a Service com Firebase (Autenticação e Firestore) e Publicação com Geração de APK/AAB via EAS.  
**Ferramentas e Recursos:** React Native, Expo, Axios, AsyncStorage, Expo SQLite, Firebase (Auth e Firestore), EAS CLI, Git, GitHub.

---

### Módulo 1: APIs Avançadas e Estado Global (Semanas 1 a 6)

* **Semana 01: Revisão e Consolidação do Mobile I**
  * Revisão da navegação com React Navigation e requisições GET com `fetch`.
  * Otimização do projeto desenvolvido no 3º semestre: refatoração de componentes e estilos.
* **Semana 02: Requisições POST e PUT no Mobile**
  * Enviando dados do app para a API (criação de novos registros cadastrais).
  * Como estruturar o corpo (body) da requisição em formato JSON.
  * Atualização de dados existentes usando os métodos `PUT` e `PATCH`.
* **Semana 03: Requisições DELETE e Tratamento Robusto de Erros**
  * Excluindo registros via API com confirmação do usuário através do componente nativo `Alert.alert`.
  * Boas práticas de tratamento de erros com blocos `try... catch` e exibição de mensagens amigáveis.
* **Semana 04: Migração para o Cliente Axios no React Native**
  * O que é o Axios e suas vantagens no ambiente mobile.
  * Configuração de uma instância base com `axios.create({ baseURL: '...' })`.
  * Configuração de timeout e interceptors para injeção automática de tokens de autenticação.
* **Semana 05: Gerenciamento de Estado Global com Context API**
  * O problema do "Prop Drilling" em aplicativos com dezenas de telas.
  * Introdução à Context API do React aplicada ao React Native.
  * Criação do `AuthContext` para compartilhamento global do status de login e dados do usuário.
* **Semana 06: Context API na Prática — Carrinho e Troca de Tema**
  * Aplicação prática de estado global: criação de um carrinho de compras ou alternador de tema (Light/Dark Mode).
  * Persistência do estado global durante a navegação entre abas e telas da pilha.

---

### Módulo 2: Armazenamento Local e Banco SQLite Offline-First (Semanas 7 a 10)

* **Semana 07: Introdução ao Armazenamento Local com AsyncStorage**
  * O que é e para que serve o pacote `@react-native-async-storage/async-storage`.
  * Como salvar dados simples em formato chave-valor (strings).
  * Persistindo preferências do usuário (ex: "O usuário já visualizou o tutorial inicial de onboarding?").
* **Semana 08: AsyncStorage com Objetos JSON e Token de Sessão**
  * Serialização e desserialização com `JSON.stringify` e `JSON.parse`.
  * Salvando o token JWT e as informações do usuário após o login para manter o usuário conectado mesmo ao fechar o app.
  * Implementação da função de Logout limpando os dados do storage.
* **Semana 09: Banco de Dados Local Avançado com SQLite no Expo**
  * Quando utilizar SQLite em vez de AsyncStorage (consultas complexas, grandes volumes de dados, relações).
  * Instalação e configuração do `expo-sqlite`.
  * Criação de tabelas com SQL nativo e execução de comandos `INSERT`, `SELECT`, `UPDATE` e `DELETE`.
* **Semana 10: Prática: Aplicativo Offline-First (CRUD Local)**
  * Construção de um aplicativo de controle financeiro ou bloco de notas que funciona 100% offline utilizando o SQLite.
  * Listagem, busca e exclusão instantânea de dados gravados na memória interna do smartphone.

---

### Módulo 3: Recursos Nativos do Dispositivo (Semanas 11 a 14)

* **Semana 11: Trabalhando com Imagens e Câmera do Smartphone**
  * Gerenciamento de permissões de hardware no Android e iOS.
  * Uso do pacote `expo-image-picker` para selecionar fotos da galeria ou tirar fotos diretamente com a câmera.
  * Manipulação da imagem capturada e exibição na tela do perfil.
* **Semana 12: Geolocalização e Mapas Interativos**
  * Uso do pacote `expo-location` para capturar a posição do GPS (Latitude e Longitude) em tempo real.
  * Exibição da localização atual e de marcadores de interesse em um mapa interativo com `react-native-maps`.
* **Semana 13: Notificações Push Locais**
  * Introdução ao sistema de notificações móveis com `expo-notifications`.
  * Solicitando permissão ao usuário para disparar notificações.
  * Programando notificações locais com disparos baseados em horário (ex: lembretes de tarefas).
* **Semana 14: Animações Visuais e Feedback Háptico**
  * Uso do pacote nativo `Animated` do React Native.
  * Criação de botões com animação de pulso, fade-in de cards e modais que sobem suavemente na tela.
  * Feedback tátil com vibração usando o `expo-haptics`.

---

### Módulo 4: Nuvem, Backend as a Service e Publicação (Semanas 15 a 20)

* **Semana 15: Integração com Firebase (Autenticação na Nuvem)**
  * O conceito de Backend as a Service (BaaS) e a plataforma Google Firebase.
  * Criação do projeto no console do Firebase e integração com o app React Native.
  * Criação de fluxos de Cadastro de Usuário e Login por e-mail e senha gerenciados pelo Firebase Auth.
* **Semana 16: Firebase Cloud Firestore (Banco de Dados NoSQL em Tempo Real)**
  * Conceito de banco NoSQL baseado em Coleções e Documentos.
  * Configuração do Cloud Firestore no aplicativo.
  * Salvando, lendo, atualizando e escutando alterações de dados em tempo real (Realtime Listeners).
* **Semana 17: Planejamento do Projeto Final Integrador Mobile**
  * Definição do escopo, requisitos de negócio e refinamento visual das telas.
  * O projeto integrador deve contemplar: Navegação completa, Conexão com API / Firebase, Persistência e UI com ícones e componentes profissionais.
* **Semana 18: Desenvolvimento Supervisionado do Projeto Final (Parte 1)**
  * Construção das telas, rotas de navegação protegidas e componentização visual.
* **Semana 19: Desenvolvimento Supervisionado do Projeto Final (Parte 2)**
  * Conexão dos fluxos de dados, operações de CRUD e caça a bugs (Bug Hunting).
* **Semana 20: Geração do APK/AAB com EAS e Apresentação Final**
  * Como funciona o serviço de nuvem **EAS (Expo Application Services)**.
  * Configuração do arquivo `eas.json` e execução da compilação na nuvem (`eas build -p android --profile preview`).
  * Geração e download do arquivo instalador final `.apk` para instalação direta em celulares Android.
  * Apresentação pública dos aplicativos funcionando nos smartphones da turma e encerramento da disciplina.
