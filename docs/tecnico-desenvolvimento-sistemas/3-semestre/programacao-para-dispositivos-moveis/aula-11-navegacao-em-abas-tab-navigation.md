---
id: "tecnico-desenvolvimento-sistemas-3-semestre-programacao-para-dispositivos-moveis-aula-11-navegacao-em-abas-tab-navigation"
slug: "/tecnico-desenvolvimento-sistemas/3-semestre/programacao-para-dispositivos-moveis/aula-11-navegacao-em-abas-tab-navigation"
sidebar_position: 11
title: "Aula 11 — Navegação em Abas (Tab Navigation)"
description: "Aula 11 do curso de Programação para Dispositivos Móveis - Menus Inferiores com Bottom Tab Navigation"
---

# Aula 11 — Navegação em Abas (Tab Navigation)

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender o conceito de navegação paralela em dispositivos móveis e aprender a instalar, configurar e customizar um menu inferior em abas (**Bottom Tab Navigation**) utilizando o React Navigation para estruturar a navegação raiz de aplicativos modernos.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Diferença conceitual: Navegação em Pilha (Stack) vs. Navegação em Abas (Tabs).
- Instalação e integração do pacote **`@react-navigation/bottom-tabs`**.
- Criação e configuração do roteador **`createBottomTabNavigator`**.
- Customização estética da barra inferior (cores ativas, inativas e tamanho).
- Substituição de ícones de forma simples e livre de erros.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

Na aula passada, aprendemos a navegar empilhando telas (Stack). Contudo, a grande maioria dos aplicativos que você usa diariamente (Instagram, Spotify, YouTube, WhatsApp) adota um padrão de menu fixo no rodapé. Esse padrão é chamado de **Navegação em Abas (Bottom Tab Navigation)**.

### A Diferença entre Stack e Tabs

*   **Pilha (Stack):** As telas são hierárquicas. Uma entra por cima da outra, escondendo a anterior. Há um fluxo linear de "ir e voltar" (avançar para os detalhes, voltar para a lista).
*   **Abas (Tabs):** As telas são paralelas e vivem no mesmo nível. Clicar em "Perfil" e depois em "Início" não cria pilhas; apenas alterna o foco visual. A barra inferior se mantém fixa na base do celular em todas as abas.

```mermaid
graph TD
    subgraph Bottom Tab Navigation (Menu Fixo)
    T["[Barra Inferior do App]"] --> S1["Tela Início 🏠"]
    T --> S2["Tela Buscar 🔍"]
    T --> S3["Tela Perfil 👤"]
    end
```

---

### Instalação da Biblioteca de Abas

Para usar menus em abas na base do app, execute este comando no terminal do seu VS Code:

```bash
npm install @react-navigation/bottom-tabs
```

---

### Configurando o Bottom Tab Navigator

Assim como na pilha, nós instanciamos o navegador e declaramos as abas mapeando cada uma delas para sua respectiva tela:

```javascript
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
```

Dentro da nossa função principal, estruturamos os componentes:

```javascript
<NavigationContainer>
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#1DB954', // Cor da aba quando está selecionada
      tabBarInactiveTintColor: '#888888', // Cor da aba desmarcada
    }}
  >
    <Tab.Screen name="Inicio" component={TelaInicio} />
    <Tab.Screen name="Perfil" component={TelaPerfil} />
  </Tab.Navigator>
</NavigationContainer>
```

#### Customização com Emojis (Livre de Erros)
Para evitar falhas de carregamento de ícones SVG externos durante a fase de aprendizado autoguiado, usaremos uma técnica inteligente: definir **Emojis** como ícones das abas através do método `tabBarIcon` presente nas `options` das telas!

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Substitua o conteúdo do seu `App.js` por esta réplica do player **Music Stream App (Estilo Spotify)**. Note o design escuro premium e o menu inferior que alterna perfeitamente entre as três telas sem criar pilhas:

```javascript
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// ==========================================
// TELA 1 - INÍCIO (HOME)
// ==========================================
function TelaInicio() {
  return (
    <ScrollView style={estilos.telaGeral}>
      <Text style={estilos.saudacao}>Bom dia, Ouvinte!</Text>
      <Text style={estilos.subtitulo}>Tocadas recentemente</Text>
      
      {/* Scroll de Álbuns fictícios */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={estilos.scrollHorizontal}>
        {['Cyberpunk Hits', 'Lofi Study', 'Coding Mode', 'Rock Classics'].map((album, idx) => (
          <View key={idx} style={estilos.cardAlbum}>
            <View style={estilos.capaAlbum} />
            <Text style={estilos.tituloAlbum}>{album}</Text>
          </View>
        ))}
      </ScrollView>

      <Text style={estilos.subtitulo}>Recomendado para você</Text>
      <View style={estilos.listaRecomendados}>
        {['Relaxing Acoustic', 'Synthwave Glow', 'Productivity Boost'].map((playlist, idx) => (
          <View key={idx} style={estilos.cardPlaylist}>
            <View style={estilos.miniatura} />
            <Text style={estilos.textoPlaylist}>{playlist}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// ==========================================
// TELA 2 - BUSCAR (SEARCH)
// ==========================================
function TelaBuscar() {
  return (
    <View style={estilos.telaGeralCentrada}>
      <Text style={estilos.tituloPagina}>Buscar Músicas 🔍</Text>
      <View style={estilos.barraPesquisaSimulada}>
        <Text style={estilos.textoPlaceholder}>Artistas, músicas ou podcasts...</Text>
      </View>
      <Text style={estilos.subtituloCategorias}>Navegar por todas as seções</Text>
      
      <View style={estilos.gridCategorias}>
        <View style={[estilos.cardCategoria, { backgroundColor: '#E8115B' }]}><Text style={estilos.textoCategoria}>Pop</Text></View>
        <View style={[estilos.cardCategoria, { backgroundColor: '#148A08' }]}><Text style={estilos.textoCategoria}>Hip-Hop</Text></View>
        <View style={[estilos.cardCategoria, { backgroundColor: '#509BF5' }]}><Text style={estilos.textoCategoria}>Podcast</Text></View>
        <View style={[estilos.cardCategoria, { backgroundColor: '#BC4620' }]}><Text style={estilos.textoCategoria}>Treino</Text></View>
      </View>
    </View>
  );
}

// ==========================================
// TELA 3 - BIBLIOTECA (LIBRARY)
// ==========================================
function TelaBiblioteca() {
  return (
    <View style={estilos.telaGeralCentrada}>
      <Text style={estilos.tituloPagina}>Sua Biblioteca 📚</Text>
      <View style={estilos.listaBiblioteca}>
        <View style={estilos.itemBiblioteca}>
          <Text style={estilos.itemTitulo}>❤️ Músicas Curtidas</Text>
          <Text style={estilos.itemSubtitulo}>Playlist • 145 músicas</Text>
        </View>
        <View style={estilos.itemBiblioteca}>
          <Text style={estilos.itemTitulo}>🎧 Dev Playlist</Text>
          <Text style={estilos.itemSubtitulo}>Playlist • Criada por você</Text>
        </View>
      </View>
    </View>
  );
}

// ==========================================
// CONFIGURAÇÃO DO BOTTOM TAB ROTEADOR
// ==========================================
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#121212', borderBottomWidth: 0 },
          headerTintColor: '#FFFFFF',
          headerTitleAlign: 'center',
          tabBarStyle: {
            backgroundColor: '#1E1E1E', // Fundo escuro premium da barra
            borderTopWidth: 0,
            height: 65,
            paddingBottom: 8,
          },
          tabBarActiveTintColor: '#1DB954', // Verde Spotify ativo
          tabBarInactiveTintColor: '#94A3B8', // Cinza inativo
          tabBarLabelStyle: { fontSize: 11, fontWeight: 'bold' },
        }}
      >
        <Tab.Screen 
          name="Inicio" 
          component={TelaInicio} 
          options={{
            title: 'Início',
            // Substituímos o ícone por uma função simples que retorna um Emoji
            tabBarIcon: ({ focused }) => (
              <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.6 }}>🏠</Text>
            ),
          }} 
        />
        <Tab.Screen 
          name="Buscar" 
          component={TelaBuscar} 
          options={{
            title: 'Buscar',
            tabBarIcon: ({ focused }) => (
              <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.6 }}>🔍</Text>
            ),
          }} 
        />
        <Tab.Screen 
          name="Biblioteca" 
          component={TelaBiblioteca} 
          options={{
            title: 'Biblioteca',
            tabBarIcon: ({ focused }) => (
              <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.6 }}>📚</Text>
            ),
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// ==========================================
// ESTILOS
// ==========================================
const estilos = StyleSheet.create({
  telaGeral: {
    flex: 1,
    backgroundColor: '#121212', // Preto profundo estilo Spotify
    padding: 20,
  },
  telaGeralCentrada: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  saudacao: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  scrollHorizontal: {
    marginBottom: 32,
  },
  cardAlbum: {
    marginRight: 16,
    width: 110,
  },
  capaAlbum: {
    width: 110,
    height: 110,
    borderRadius: 8,
    backgroundColor: '#282828',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#3E3E3E',
  },
  tituloAlbum: {
    color: '#B3B3B3',
    fontSize: 12,
    fontWeight: '500',
  },
  listaRecomendados: {
    gap: 12,
    paddingBottom: 40,
  },
  cardPlaylist: {
    backgroundColor: '#282828',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  miniatura: {
    width: 48,
    height: 48,
    borderRadius: 4,
    backgroundColor: '#1DB95430',
    marginRight: 16,
  },
  textoPlaylist: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tituloPagina: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  barraPesquisaSimulada: {
    backgroundColor: '#FFFFFF',
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  textoPlaceholder: {
    color: '#7F7F7F',
    fontSize: 14,
  },
  subtituloCategorias: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  gridCategorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  cardCategoria: {
    width: '47%',
    height: 85,
    borderRadius: 8,
    padding: 12,
    justifyContent: 'space-between',
  },
  textoCategoria: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listaBiblioteca: {
    gap: 16,
  },
  itemBiblioteca: {
    borderBottomWidth: 1,
    borderBottomColor: '#282828',
    paddingBottom: 16,
  },
  itemTitulo: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemSubtitulo: {
    color: '#B3B3B3',
    fontSize: 12,
  },
});
```

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

Abra o seu aplicativo `meu-primeiro-app` no VS Code. Vamos criar um layout estrutural para um **Aplicativo de Delivery de Comida (Food Delivery Tab Layout)**:
1. Instale a biblioteca `@react-navigation/bottom-tabs`.
2. No seu arquivo `App.js`, estruture **três telas de abas**:
   - **`AbaCardapio` (Menu)**: Exiba uma lista de pratos de comida usando FlatList (ex: Pizza, Hambúrguer, Sushi) com botões para adicionar ao carrinho.
   - **`AbaCarrinho` (Cart)**: Exiba o resumo das compras (pode ser com itens estáticos, ex: 1x Pizza de Calabresa por R$ 45,00) e um botão de "Finalizar Compra".
   - **`AbaPerfil` (Profile)**: Exiba as informações cadastrais do usuário (Nome, Telefone e Endereço de Entrega) em uma View estilizada.
3. Configure o Roteador de Abas (`Tab.Navigator`) ligando as três abas na base.
4. Mude os ícones de aba usando **Emojis adequados**:
   - Cardápio: 🍕
   - Carrinho: 🛒
   - Perfil: 👤
5. Estilize a barra de abas inferior e a cor ativa para um tom de vermelho vibrante (`#EF4444`) para simular apps populares de delivery (como o iFood).

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] A dependência `@react-navigation/bottom-tabs` foi instalada e declarada no código corretamente.
- [ ] O menu inferior com as 3 abas (Cardápio, Carrinho, Perfil) carrega de forma correta e sem erros.
- [ ] Os ícones de aba estão mapeados e exibem emojis reativos focados/desfocados.
- [ ] Clicar nas abas alterna a tela no topo sem reiniciar o estado global do app.
- [ ] A estilização do menu inferior (tabBarStyle) está polida, com altura adequada e sem sobrepor elementos visuais das telas.

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione diferenciais dinâmicos de navegação:
- **Badge no Carrinho:** Você sabia que pode exibir balões de contagem em cima das abas inferior do React Navigation? Adicione a propriedade **`tabBarBadge: 3`** nas options da tela de Carrinho e veja um círculo de aviso vermelho com a quantidade de itens no carrinho aparecer perfeitamente sobre a aba!
- **Combinando Stack com Tabs:** Tente criar um fluxo onde, dentro da aba de Cardápio, clicar em um prato abre uma tela de detalhes que cobre a barra de abas! Para fazer isso, você precisa aninhar o roteador Tab dentro de um roteador Stack raiz.
- **Header Oculto nas Abas:** Experimente ocultar as barras de cabeçalho superiores padrões apenas na aba de Perfil para criar uma interface mais imersiva, mantendo a barra visível nas abas de Cardápio e Carrinho.

