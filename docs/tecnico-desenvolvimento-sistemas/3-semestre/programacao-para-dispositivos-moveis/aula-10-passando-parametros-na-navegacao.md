---
id: "tecnico-desenvolvimento-sistemas-3-semestre-programacao-para-dispositivos-moveis-aula-10-passando-parametros-na-navegacao"
slug: "/tecnico-desenvolvimento-sistemas/3-semestre/programacao-para-dispositivos-moveis/aula-10-passando-parametros-na-navegacao"
sidebar_position: 10
title: "Aula 10 — Passando Parâmetros na Navegação"
description: "Aula 10 do curso de Programação para Dispositivos Móveis - Transferência de Dados entre Telas com route.params"
---

# Aula 10 — Passando Parâmetros na Navegação

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender como transmitir informações de forma dinâmica entre diferentes telas de um aplicativo e aprender a enviar pacotes de dados (*payloads*) usando a função de navegação e capturá-los na tela de destino utilizando o objeto **`route.params`**.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O problema de criar telas estáticas duplicadas para itens semelhantes.
- Passagem de parâmetros no segundo argumento de **`navigation.navigate`**.
- A prop especial **`route`** injetada nas telas do React Navigation.
- Capturando e lendo parâmetros com o **`route.params`**.
- Criação de telas de detalhe dinâmicas e genéricas.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

Imagine que você está criando um e-commerce com 500 produtos. Seria completamente inviável e amador criar 500 arquivos de tela de detalhes (ex: `XboxScreen.js`, `PlaystationScreen.js`, `NintendoScreen.js`).

A solução profissional da engenharia de software é criar **apenas uma única tela genérica** chamada `DetalhesProduto.js`. Quando o usuário clicar em um produto específico da lista, nós navegamos para essa tela de detalhes enviando as informações do produto clicado "na mala".

### Passo 01: Como Enviar Dados (Origem)
Ao navegar para outra tela, o segundo argumento da função `navigation.navigate` aceita um objeto JavaScript contendo os dados que você deseja transmitir:

```javascript
navigation.navigate('Detalhes', { 
  produtoId: '109', 
  nome: 'Console PlayStation 5', 
  preco: 'R$ 3.999,00' 
});
```

---

### Passo 02: Como Receber Dados (Destino)
Toda tela registrada na nossa Stack recebe duas props automáticas: `navigation` (que você já conhece) e **`route`**. 

O objeto `route` contém dados da rota atual. É dentro de **`route.params`** que o React Navigation coloca as informações que vieram "na mala". Veja como capturá-las:

```javascript
function TelaDetalhes({ route, navigation }) {
  // Fazemos a desestruturação segura do objeto params
  const { produtoId, nome, preco } = route.params || {};

  return (
    <View>
      <Text>ID do Produto: {produtoId}</Text>
      <Text>Nome: {nome}</Text>
      <Text>Preço: {preco}</Text>
    </View>
  );
}
```

> [!IMPORTANT]
> **Dica de Segurança:** Sempre adicione um fallback de objeto vazio (`|| {}`) na desestruturação dos parâmetros do `route.params`. Se alguém tentar abrir a tela sem passar parâmetros por engano, seu aplicativo não irá quebrar!

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Substitua todo o conteúdo do seu `App.js` por este **Catálogo de Games**. Note como ao clicar em um card da lista, nós enviamos o objeto inteiro do jogo para uma única tela de detalhes, que monta o visual dinamicamente:

```javascript
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// ==========================================
// TELA A - CATÁLOGO DE GAMES (LISTA)
// ==========================================
function TelaCatalogo({ navigation }) {
  const games = [
    { id: '1', titulo: 'Cyberpunk 2077', categoria: 'RPG / Ação', preco: 'R$ 199,00', nota: '9.2', descricao: 'Uma história de ação e aventura de ficção científica ambientada em Night City.' },
    { id: '2', titulo: 'Elden Ring', categoria: 'Soulslike / RPG', preco: 'R$ 249,00', nota: '9.8', descricao: 'Levante-se, Maculado, e seja guiado pela graça para portar o poder do Anel Prístino.' },
    { id: '3', titulo: 'Forza Horizon 5', categoria: 'Corrida', preco: 'R$ 229,00', nota: '9.0', descricao: 'Sua derradeira aventura Horizon te espera! Explore as paisagens em constante evolução do México.' },
    { id: '4', titulo: 'Minecraft', categoria: 'Sandbox', preco: 'R$ 99,00', nota: '9.5', descricao: 'Explore mundos gerados aleatoriamente e construa das coisas mais simples às mais complexas.' },
  ];

  return (
    <View style={estilos.telaFundo}>
      <Text style={estilos.subtituloCatalogo}>Selecione um jogo para ver a ementa completa</Text>

      <FlatList 
        data={games}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={estilos.cardGame}
            // Navegamos passando o objeto do game inteiro na mala
            onPress={() => navigation.navigate('Detalhes', { game: item })}
          >
            <View style={estilos.infoCard}>
              <Text style={estilos.tituloGame}>{item.titulo}</Text>
              <Text style={estilos.categoriaGame}>{item.categoria}</Text>
            </View>
            <Text style={estilos.precoCard}>{item.preco}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={estilos.listaContainer}
        ItemSeparatorComponent={() => <View style={estilos.divisor} />}
      />
    </View>
  );
}

// ==========================================
// TELA B - DETALHES DO GAME (DINÂMICA)
// ==========================================
function TelaDetalhes({ route, navigation }) {
  // Resgatamos o game enviado por parâmetro
  const { game } = route.params || {};

  // Se por acaso a tela for aberta sem um game, mostra mensagem amigável
  if (!game) {
    return (
      <View style={estilos.telaFundoCentralizada}>
        <Text style={estilos.textoVazio}>Nenhum jogo selecionado.</Text>
      </View>
    );
  }

  return (
    <View style={estilos.telaFundo}>
      <View style={estilos.containerDetalhes}>
        
        {/* Cabeçalho do Jogo com Nota */}
        <View style={estilos.cabecalhoDetalhe}>
          <View style={{ flex: 1 }}>
            <Text style={estilos.tituloDetalhe}>{game.titulo}</Text>
            <Text style={estilos.categoriaDetalhe}>{game.categoria}</Text>
          </View>
          <View style={estilos.badgeNota}>
            <Text style={estilos.textoNota}>⭐ {game.nota}</Text>
          </View>
        </View>

        {/* Descrição */}
        <Text style={estilos.tituloSecao}>Sinopse do Jogo</Text>
        <Text style={estilos.descricaoDetalhe}>{game.descricao}</Text>

        {/* Preço de Aquisição */}
        <View style={estilos.containerPreco}>
          <Text style={estilos.textoPrecoLabel}>Preço do Jogo:</Text>
          <Text style={estilos.textoPrecoValor}>{game.preco}</Text>
        </View>

        {/* Botão de Voltar */}
        <TouchableOpacity 
          style={estilos.botaoVoltar} 
          onPress={() => navigation.goBack()}
        >
          <Text style={estilos.textoBotaoVoltar}>Voltar ao Catálogo</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

// ==========================================
// CONFIGURAÇÃO DO ROTEADOR
// ==========================================
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#1E293B' },
          headerTintColor: '#F8FAFC',
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen 
          name="Catalogo" 
          component={TelaCatalogo} 
          options={{ title: 'Game Zone 🎮' }} 
        />
        <Stack.Screen 
          name="Detalhes" 
          component={TelaDetalhes} 
          options={{ title: 'Especificações' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ==========================================
// ESTILOS
// ==========================================
const estilos = StyleSheet.create({
  telaFundo: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 20,
  },
  telaFundoCentralizada: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtituloCatalogo: {
    color: '#94A3B8',
    fontSize: 14,
    marginBottom: 20,
  },
  listaContainer: {
    paddingBottom: 20,
  },
  cardGame: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  infoCard: {
    flex: 1,
  },
  tituloGame: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  categoriaGame: {
    color: '#94A3B8',
    fontSize: 12,
  },
  precoCard: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  divisor: {
    height: 12,
  },
  containerDetalhes: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cabecalhoDetalhe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    paddingBottom: 20,
  },
  tituloDetalhe: {
    color: '#F8FAFC',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  categoriaDetalhe: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '500',
  },
  badgeNota: {
    backgroundColor: '#F59E0B20',
    borderColor: '#F59E0B',
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  textoNota: {
    color: '#F59E0B',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tituloSecao: {
    color: '#94A3B8',
    fontSize: 13,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 8,
  },
  descricaoDetalhe: {
    color: '#F8FAFC',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },
  containerPreco: {
    backgroundColor: '#0F172A',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  textoPrecoLabel: {
    color: '#94A3B8',
    fontSize: 14,
  },
  textoPrecoValor: {
    color: '#10B981',
    fontSize: 18,
    fontWeight: 'bold',
  },
  botaoVoltar: {
    borderColor: '#334155',
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  textoBotaoVoltar: {
    color: '#94A3B8',
    fontWeight: 'bold',
    fontSize: 14,
  },
  textoVazio: {
    color: '#64748B',
    fontSize: 16,
  },
});
```

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

Abra o seu aplicativo `meu-primeiro-app` no VS Code. Vamos criar um **Portal de Consulta e Boletim Escolar (Student Grade Portal)**!
1. Crie o aplicativo contendo **duas telas**: `TelaAlunos` e `TelaBoletim`.
2. Na **`TelaAlunos`**, exiba um FlatList de alunos contendo: `id`, `nome`, `turma` e as notas de 3 matérias (ex: `matematica`, `portugues` e `ciencias`).
3. Ao clicar em um aluno da lista, navegue para a **`TelaBoletim`** passando o aluno clicado por parâmetro.
4. Na **`TelaBoletim`**:
   - Capture o aluno de `route.params`.
   - Exiba o nome do aluno e sua turma em destaque no topo.
   - Liste as notas das 3 matérias em formato de tabela ou cards pequenos.
   - **Lógica Dinâmica:** Calcule na hora a **Média Final** das notas desse aluno no Boletim.
   - **Renderização Condicional:** Se a média calculada for **igual ou maior que 7.0**, mostre um selo de **"APROVADO" em verde**. Caso contrário, mostre **"RECUPERAÇÃO" em vermelho**.
5. Estilize com cores elegantes e sóbrias para simular um ambiente acadêmico profissional.

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] A lista de alunos carrega e renderiza dinamicamente usando um `<FlatList>`.
- [ ] O clique em um card de aluno dispara a navegação passando o objeto de notas completo na mala.
- [ ] A tela de Boletim lê com segurança as informações usando a prop `route.params` com tratamento de erro fallback.
- [ ] A Média Final do aluno é calculada reativamente e exibida de forma correta.
- [ ] A tela de Boletim exibe o selo condicional de Aprovado (verde) ou Recuperação (vermelho) baseado na média.

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Domine a navegação elevando a experiência do usuário a outro nível:
- **Título do Cabeçalho Dinâmico:** Que tal mudar o título da barra superior do React Navigation na hora de acordo com o aluno selecionado? Use a função **`navigation.setOptions({ title: aluno.nome })`** dentro do corpo da tela de Boletim e veja o cabeçalho superior atualizar dinamicamente com o nome do aluno!
- **Destaque Visual de Notas:** Adicione uma verificação individual para cada nota exibida no boletim. Se a nota for abaixo de 6.0, faça aquele texto específico de nota ficar vermelho, destacando onde o aluno precisa focar nos estudos.
- **Filtro de Aprovados/Recuperação:** Adicione botões de filtro na tela inicial de alunos para o professor listar de forma rápida apenas os alunos que estão de Recuperação ou apenas os Aprovados na média geral.

