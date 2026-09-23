# Plano de Curso: Programação para Dispositivos Móveis I (20 Semanas)

**Unidade Curricular:** Programação para Dispositivos Móveis (Etapa 1)  
**Carga Horária Total:** 60 horas  
**Carga Semanal:** 4 horas/semana (20 Semanas)  
**Módulo:** Módulo Específico I — 3º Semestre  
**Foco:** Fundamentos de React Native, Componentes Estruturais e Interativos, Flexbox Mobile, Gerenciamento de Estado (`useState`), Listas de Alta Performance (`FlatList`), Navegação (Stack, Bottom Tab, Drawer), UI/UX e Consumo de APIs (GET).  
**Ferramentas e Recursos:** React Native, Expo, VS Code, React Navigation, Expo Go / Emuladores Android/iOS, Git, GitHub.

---

### Módulo 1: Fundamentos e Componentes (Semanas 1 a 4)

* **Semana 01: Introdução ao Desenvolvimento Mobile e Configuração do Ambiente**
  * O que é o React Native e a diferença para o desenvolvimento Nativo puro (Java/Kotlin e Swift) e WebViews.
  * O ecossistema Expo: vantagens, Managed Workflow vs. Bare Workflow.
  * Instalação do Node.js, Expo CLI, VS Code e extensões recomendadas.
  * Executando o app no dispositivo físico via aplicativo **Expo Go** (QR Code) e em emuladores locais.
* **Semana 02: Componentes Estruturais Básicos e Estilização**
  * Hierarquia e anatomia de componentes no React Native.
  * Os blocos fundamentais: `<View>`, `<Text>`, e a abstração de estilos com `<StyleSheet>`.
  * Como aplicar estilos inline vs. objetos de estilo (`StyleSheet.create`).
  * Densidade de pixels e unidades de medida no mobile (pontos independentes de densidade - DP).
* **Semana 03: Componentes Interativos e Entrada de Dados**
  * Uso de `<TextInput>` para capturar texto, tipos de teclado (`keyboardType`) e placeholder.
  * Botões nativos (`<Button>`) vs. botões customizados com feedback tátil (`<TouchableOpacity>`).
  * Inserção e dimensionamento de imagens com `<Image>` (imagens locais via `require` e remotas via `uri`).
* **Semana 04: Layout e Posicionamento com Flexbox no Mobile**
  * Entendendo o motor Yoga / Flexbox no React Native (atenção: `flexDirection: 'column'` é o padrão!).
  * Alinhamento nos eixos: `flexDirection` (row vs. column), `justifyContent` e `alignItems`.
  * Prática: Construção da tela de Login estática profissional com logotipo, inputs estilizados e botão de acesso.

---

### Módulo 2: Interatividade e Estado (Semanas 5 a 8)

* **Semana 05: Gerenciamento de Estado Local (`useState`)**
  * O que é estado? Diferença crucial entre variáveis locais comuns e estados reativos.
  * Introdução ao Hook `useState` aplicado a telas mobile.
  * Prática: Criando um App de Contador de Pessoas em Estabelecimento com botões de incremento e decremento.
* **Semana 06: Listas Simples e Renderização Condicional**
  * Ocultando e exibindo elementos com if ternário (`condicao ? <Verdadeiro /> : <Falso />`).
  * O problema de performance da `<ScrollView>` em listagens longas (renderização de todos os itens de uma vez).
  * Renderizando pequenas coleções com `.map()`.
* **Semana 07: Listas de Alta Performance com `<FlatList>`**
  * Como a `<FlatList>` recicla elementos fora da tela para economizar memória do smartphone.
  * Os atributos obrigatórios e essenciais: `data`, `keyExtractor` e `renderItem`.
  * Customização de separadores (`ItemSeparatorComponent`) e tela vazia (`ListEmptyComponent`).
* **Semana 08: Prática Consolidada de UI e Estado (Mini App To-Do)**
  * Desenvolvimento guiado de um Mini App: **Lista de Tarefas (To-Do List)**.
  * Adicionar tarefas dinamicamente, listar na FlatList e marcar tarefas como concluídas ou excluí-las com toque.

---

### Módulo 3: Navegação entre Telas com React Navigation (Semanas 9 a 12)

* **Semana 09: Introdução ao React Navigation e Navegação em Pilha (Stack)**
  * Instalação e configuração das bibliotecas `@react-navigation/native` e `@react-navigation/native-stack`.
  * O container raiz de navegação: `<NavigationContainer>`.
  * Configurando a navegação em pilha (`createNativeStackNavigator`): empilhando telas e botão nativo de voltar.
* **Semana 10: Passando Parâmetros entre Telas na Navegação**
  * Como navegar de uma tela A para a tela B enviando dados (ex: ID ou objeto completo de um item selecionado).
  * Capturando e utilizando os parâmetros na tela de destino através de `route.params`.
  * Prática: Tela de Catálogo de Produtos que navega para a Tela de Detalhes do Produto selecionado.
* **Semana 11: Navegação em Abas Inferiores (Bottom Tab Navigation)**
  * Configurando o pacote `@react-navigation/bottom-tabs`.
  * Criando a estrutura clássica de aplicativos modernos com abas no rodapé (Home, Busca, Perfil).
  * Customização de cores ativas/inativas da barra e rótulos das abas.
* **Semana 12: Navegação em Gaveta Lateral (Drawer Navigation)**
  * Configurando o menu lateral deslizante com `@react-navigation/drawer`.
  * Como aninhar navegadores: combinando o Drawer com Stack Navigation e Tab Navigation no mesmo app.
  * Customização do cabeçalho (Header) do Drawer com avatar e nome do usuário.

---

### Módulo 4: UI/UX, Ícones e Componentização Avançada (Semanas 13 a 15)

* **Semana 13: Bibliotecas de Componentes Visuais (UI/UX)**
  * Introdução a bibliotecas de design de mercado (ex: React Native Paper).
  * Uso de Cards elegantes, botões flutuantes (FAB - Floating Action Button) e caixas de diálogo (Modals).
  * Padronização de margens e hierarquia tipográfica no mobile.
* **Semana 14: Ícones Vetoriais e Fontes Customizadas**
  * Utilização do pacote nativo `@expo/vector-icons` para inserir ícones perfeitos (FontAwesome, MaterialIcons, Feather, Ionicons).
  * Como carregar e aplicar fontes personalizadas do Google Fonts usando o hook `useFonts` do Expo.
* **Semana 15: Componentes Reutilizáveis e Customizados**
  * Boas práticas de componentização e Clean Code no React Native.
  * Criando seus próprios componentes reutilizáveis com props flexíveis (ex: `CustomButton`, `CustomInput`, `HeaderBar`).

---

### Módulo 5: Comunicação com a Internet e Projeto Prático (Semanas 16 a 20)

* **Semana 16: Efeitos Colaterais e Ciclo de Vida com o Hook `useEffect`**
  * Introdução ao Hook `useEffect`: executando código na montagem da tela.
  * O array de dependências do `useEffect` e como evitar loops infinitos de re-renderização.
  * Exibindo o indicador de carregamento nativo `<ActivityIndicator>` enquanto os dados carregam.
* **Semana 17: Introdução a APIs RESTful e Formato JSON no Mobile**
  * O que é uma API RESTful e como os aplicativos móveis se comunicam com a nuvem.
  * Entendendo o formato de dados JSON e assincronismo (`Promises`, `async` e `await`).
* **Semana 18: Consumindo APIs com o Método GET via Fetch Nativo**
  * Usando o `fetch` para buscar dados na internet.
  * Prática: Buscando dados de endereço em tempo real a partir de um CEP digitado pelo usuário (API ViaCEP).
* **Semana 19: Prática Integrada (API + Navegação + FlatList)**
  * Criando um aplicativo que consome uma API pública (ex: Rick and Morty API, CoinGecko ou PokeAPI).
  * Listar os itens na `<FlatList>` e, ao clicar em um card, navegar para a tela de Detalhes passando os parâmetros.
* **Semana 20: Revisão Geral e Desafio Técnico Integrador (Simulação Dev Jr Mobile)**
  * Revisão integrada dos conceitos: Flexbox, Componentes, Estado, Navegação e Consumo de APIs.
  * **Desafio Técnico Integrador:** Resolução do teste técnico real para vaga de Desenvolvedor Mobile Júnior ([teste-tecnico-dev-jr-mobile](https://github.com/Eduardo1985S/teste-tecnico-dev-jr-mobile)).
  * Apresentação dos aplicativos funcionando no celular e encerramento da Etapa 1.
