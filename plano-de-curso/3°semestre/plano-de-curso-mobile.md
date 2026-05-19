# Plano de Curso - Programação para Dispositivos Móveis (3º Semestre)

**Carga horária:** 20 Semanas
**Foco:** Fundamentos de React Native, Componentes, Estado, Navegação, UI/UX e Consumo de API (GET).
**Ferramentas:** React Native, Expo, VS Code, React Navigation.

---

### Módulo 1: Fundamentos e Componentes (Semanas 1 a 4)
- **Semana 01:** Configuração do Ambiente
  - Instalação do Node.js, Expo CLI, e VS Code.
  - Como rodar o app no dispositivo físico (Expo Go) e no emulador.
  - O que é o React Native e a diferença para o desenvolvimento Nativo (Java/Swift).
- **Semana 02:** Componentes Estruturais Básicos
  - Hierarquia de componentes.
  - Uso de `<View>`, `<Text>`, e `<StyleSheet>`.
  - Como aplicar estilos inline e via objetos.
- **Semana 03:** Componentes Interativos e Entrada de Dados
  - Uso de `<TextInput>` para capturar digitação.
  - Uso de `<Button>` e `<TouchableOpacity>` para botões customizados.
  - Inserindo imagens com `<Image>` (locais e remotas).
- **Semana 04:** Layout e Posicionamento (Flexbox)
  - Entendendo o motor Flexbox do React Native.
  - `flexDirection` (row vs column), `justifyContent`, e `alignItems`.
  - Prática: Construindo a tela de login estática.

### Módulo 2: Interatividade e Estado (Semanas 5 a 8)
- **Semana 05:** Gerenciamento de Estado Local
  - O que é estado? Diferença entre variáveis comuns e estados.
  - Introdução ao Hook `useState`.
  - Prática: Criando um App de Contador de Cliques.
- **Semana 06:** Listas Simples e Renderização Condicional
  - Ocultando e exibindo elementos com if ternário (`condicao ? verdadeiro : falso`).
  - O problema da `<ScrollView>` em listas grandes.
  - Renderizando listas com `.map()`.
- **Semana 07:** Listas de Alta Performance
  - Introdução a `<FlatList>`.
  - Como usar os atributos `data`, `keyExtractor` e `renderItem`.
  - Criação de uma lista de contatos/itens simples.
- **Semana 08:** Prática Consolidada de UI e Estado
  - Desenvolvimento de um Mini App: **To-Do List (Lista de Tarefas)**.
  - Adicionar, listar e marcar tarefas como concluídas usando Estado e FlatList.

### Módulo 3: Navegação entre Telas (Semanas 9 a 12)
- **Semana 09:** Introdução ao React Navigation
  - Instalação e configuração da biblioteca `react-navigation`.
  - O que é o `<NavigationContainer>`.
  - Configurando a navegação em pilha (`Stack Navigation`).
- **Semana 10:** Passando Parâmetros na Navegação
  - Como navegar de uma tela A para a tela B enviando dados (ex: ID de um produto).
  - Capturando os parâmetros na tela de destino com `route.params`.
- **Semana 11:** Navegação em Abas (Tab Navigation)
  - Configurando o `Bottom Tab Navigation`.
  - Criando uma estrutura clássica de apps com abas no rodapé.
- **Semana 12:** Navegação em Gaveta (Drawer Navigation)
  - Configurando o menu lateral deslizante (`Drawer Navigation`).
  - Como combinar o Drawer com o Stack Navigation.

### Módulo 4: UI/UX e Estética (Semanas 13 a 15)
- **Semana 13:** Bibliotecas de Componentes Visuais (UI/UX)
  - Introdução a bibliotecas de mercado (ex: React Native Paper ou NativeBase).
  - Uso de Cards, botões flutuantes e inputs já estilizados.
- **Semana 14:** Ícones e Fontes Customizadas
  - Utilização do `@expo/vector-icons` para inserir ícones perfeitos (FontAwesome, MaterialIcons).
  - Como importar e aplicar fontes do Google Fonts no projeto Expo.
- **Semana 15:** Componentes Reutilizáveis Customizados
  - Boas práticas de componentização.
  - Criando seu próprio componente de Botão com propriedades (`props`) dinâmicas.

### Módulo 5: Comunicação com a Internet (Semanas 16 a 20)
- **Semana 16:** Efeitos Colaterais e Ciclo de Vida
  - Introdução ao Hook `useEffect`.
  - Como executar um código "logo que a tela abre".
  - Entendendo o array de dependências do `useEffect`.
- **Semana 17:** Introdução a APIs e JSON
  - O que é uma API RESTful? Como a internet conversa.
  - Entendendo o formato de dados JSON.
  - Assincronismo: `Promises`, `async` e `await`.
- **Semana 18:** Consumindo API (Método GET) com Fetch
  - Usando o `fetch` nativo para buscar dados na internet.
  - Prática: Buscando dados de endereço a partir de um CEP (API ViaCEP).
- **Semana 19:** Prática Integrada (API + Navegação + FlatList)
  - Criando um App que lista personagens, filmes ou moedas usando uma API pública (ex: Rick and Morty API ou CoinGecko).
  - Listar dados e, ao clicar, ir para a tela de Detalhes.
- **Semana 20:** Revisão Geral e Desafio Técnico (Simulação Dev Jr)
  - Revisão dos conceitos de navegação, estado e API.
  - **Desafio Técnico Integrador:** Resolução do teste técnico real para vaga de Desenvolvedor Mobile Júnior: [teste-tecnico-dev-jr-mobile](https://github.com/Eduardo1985S/teste-tecnico-dev-jr-mobile).
  - Apresentação final do portfólio desenvolvido no desafio como fechamento do semestre.

