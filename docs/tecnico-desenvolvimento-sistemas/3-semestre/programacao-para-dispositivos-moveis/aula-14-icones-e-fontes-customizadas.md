---
id: "tecnico-desenvolvimento-sistemas-3-semestre-programacao-para-dispositivos-moveis-aula-14-icones-e-fontes-customizadas"
slug: "/tecnico-desenvolvimento-sistemas/3-semestre/programacao-para-dispositivos-moveis/aula-14-icones-e-fontes-customizadas"
sidebar_position: 14
title: "Aula 14 — Ícones e Fontes Customizadas"
description: "Aula 14 do curso de Programação para Dispositivos Móveis - Utilizando @expo/vector-icons e Google Fonts com expo-font"
---

## Aula 14 — Ícones e Fontes Customizadas

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender a importância dos recursos tipográficos e visuais na experiência do usuário (UI/UX) e aprender a utilizar a biblioteca nativa **`@expo/vector-icons`** para carregar ícones vetoriais modernos e as ferramentas do **`expo-font`** para importar e utilizar fontes personalizadas do Google Fonts no React Native.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- A importância da tipografia e da iconografia na identidade visual mobile.
- Utilização de ícones vetoriais com a biblioteca nativa do Expo: **`@expo/vector-icons`**.
- Como pesquisar ícones oficiais na biblioteca de consulta **`icons.expo.fyi`**.
- Importação e carregamento de fontes do Google Fonts usando **`expo-font`**.
- Lidando com carregamento assíncrono de recursos com o hook **`useFonts`**.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

Um dos erros mais comuns de desenvolvedores iniciantes é construir aplicativos inteiros utilizando as fontes padrão do sistema (como a clássica Arial ou Helvetica) e usando imagens rasterizadas comuns para ícones secundários.

Aplicativos premium de alto nível (como Airbnb, Uber e Nubank) utilizam **tipografia customizada** e **ícones vetoriais nítidos** para criar uma experiência visual marcante e ergonômica.

---

### 1. Ícones Vetoriais (`@expo/vector-icons`)

Ao contrário das imagens normais (como PNG ou JPG), os ícones vetoriais são baseados em fórmulas matemáticas. Isso significa que eles **nunca ficam pixelados**, independentemente do tamanho ou da resolução da tela do celular (mesmo em telas AMOLED de alta densidade). Além disso, podemos trocar sua cor e tamanho dinamicamente usando propriedades JavaScript comuns!

No ecossistema Expo, a biblioteca **`@expo/vector-icons`** já vem instalada por padrão! Ela reúne as coleções de ícones mais famosas do mercado mundial (como FontAwesome, Ionicons, MaterialIcons, Feather, etc).

#### Como usar?
Basta importar o conjunto de ícones desejado e declará-lo como um componente:

```javascript
import FontAwesome from '@expo/vector-icons/FontAwesome';

// No JSX:
<FontAwesome name="rocket" size={24} color="#3B82F6" />
```

> [!TIP]
> **Como achar o ícone ideal?** A Expo disponibiliza o site oficial de buscas [icons.expo.fyi](https://icons.expo.fyi). Basta digitar o nome do ícone desejado (ex: "heart", "cart", "user") para obter instantaneamente a linha exata de importação e o nome do parâmetro para colocar no código!

---

### 2. Fontes Customizadas (`expo-font`)

Para carregar fontes do Google Fonts no seu aplicativo móvel, precisamos primeiro carregar os arquivos de fonte tipográfica na memória do celular. Para isso, o Expo oferece o pacote **`expo-font`** que facilita essa integração de forma simples.

#### Passo 01: Instalação das bibliotecas no terminal:
Vamos instalar o carregador de fontes do Expo e, de exemplo, a maravilhosa e moderna fonte **`Outfit`** do Google Fonts:
```bash
npx expo install expo-font @expo-google-fonts/outfit
```

#### Passo 02: Carregar a fonte de forma Assíncrona
Como carregar arquivos da internet ou do disco leva uma fração de segundo, usamos o hook **`useFonts`** para carregar os pesos da fonte (Regular, Bold, etc.) antes de desenhar a tela. Se a tela tentar desenhar antes das fontes carregarem, o app pode quebrar. Veja o fluxo correto:

```javascript
import { useFonts, Outfit_400Regular, Outfit_700Bold } from '@expo-google-fonts/outfit';

export default function App() {
  // O hook useFonts retorna um array. O primeiro item diz se as fontes já estão prontas.
  let [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_700Bold,
  });

  // Enquanto as fontes estiverem carregando, exibe uma tela em branco ou loading
  if (!fontsLoaded) {
    return null; // Retorno defensivo para impedir o crash
  }

  // A partir daqui, as fontes estão prontas para serem usadas no StyleSheet!
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontFamily: 'Outfit_700Bold', fontSize: 24 }}>Texto Lindo! ✨</Text>
    </View>
  );
}
```

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Substitua todo o conteúdo do seu `App.js` por este **Cartão de Links Profissional de Desenvolvedor (Developer Linktree)**. Veja como a fonte `Outfit` deixa o visual sofisticado e minimalista, combinado aos ícones vetoriais de mídia social que mudam de cor ao toque:

```javascript
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useFonts, Outfit_400Regular, Outfit_700Bold } from '@expo-google-fonts/outfit';
import FontAwesome from '@expo-google-icons/FontAwesome' // Pelo buscador
import FontAwesome5 from '@expo-icons/FontAwesome5'
// Para garantir compatibilidade de imports do Expo Icons nâo-nativos:
import { FontAwesome as IconeFA, MaterialIcons } from '@expo/vector-icons';

export default function App() {
  // Carrega as fontes do Google Fonts na inicialização
  let [fontsLoaded] = useFonts({
    'Outfit-Regular': Outfit_400Regular,
    'Outfit-Bold': Outfit_700Bold,
  });

  // Proteção contra renderização precoce
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={estilos.telaGeral}>
      <View style={estilos.cardPerfil}>
        
        {/* FOTO E STATUS */}
        <View style={estilos.areaAvatar}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80' }} 
            style={estilos.avatar}
          />
          <View style={estilos.statusBadge}>
            <Text style={estilos.statusTexto}>Online</Text>
          </View>
        </View>

        {/* INFORMAÇÕES PESSOAIS */}
        <Text style={estilos.nome}>Gustavo Ferreira</Text>
        <Text style={estilos.cargo}>Desenvolvedor Mobile Fullstack</Text>

        <View style={estilos.localizacaoContainer}>
          <MaterialIcons name="location-on" size={16} color="#3B82F6" />
          <Text style={estilos.localizacaoTexto}>São Paulo, Brasil</Text>
        </View>

        <Text style={estilos.bio}>
          Especialista em criar aplicativos React Native fluidos, de alto desempenho tipográfico 
          e com designs futuristas e funcionais.
        </Text>

        {/* LISTA DE CONEXÕES / LINKS */}
        <View style={estilos.areaLinks}>
          
          <TouchableOpacity style={estilos.botaoLink}>
            <IconeFA name="github" size={20} color="#F8FAFC" />
            <Text style={estilos.textoBotaoLink}>Visualizar Portfólio no GitHub</Text>
          </TouchableOpacity>

          <TouchableOpacity style={estilos.botaoLink}>
            <IconeFA name="linkedin-square" size={20} color="#0077B5" />
            <Text style={estilos.textoBotaoLink}>Conectar via LinkedIn</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[estilos.botaoLink, { borderColor: '#10B98120' }]}>
            <MaterialIcons name="email" size={20} color="#10B981" />
            <Text style={estilos.textoBotaoLink}>Enviar E-mail Corporativo</Text>
          </TouchableOpacity>

        </View>

      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  telaGeral: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    padding: 20,
  },
  cardPerfil: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  areaAvatar: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#3B82F6',
  },
  statusBadge: {
    position: 'absolute',
    bottom: 0,
    right: 4,
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#1E293B',
  },
  statusTexto: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
    fontFamily: 'Outfit-Bold',
  },
  nome: {
    fontSize: 22,
    color: '#F8FAFC',
    fontFamily: 'Outfit-Bold', // Aplicando a Google Font carregada!
    marginBottom: 4,
  },
  cargo: {
    fontSize: 14,
    color: '#3B82F6',
    fontFamily: 'Outfit-Regular',
    marginBottom: 12,
  },
  localizacaoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 20,
  },
  localizacaoTexto: {
    color: '#94A3B8',
    fontSize: 13,
    fontFamily: 'Outfit-Regular',
  },
  bio: {
    color: '#94A3B8',
    fontSize: 14,
    fontFamily: 'Outfit-Regular',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 28,
  },
  areaLinks: {
    width: '100%',
    gap: 12,
  },
  botaoLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#0F172A',
    borderColor: '#334155',
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    width: '100%',
  },
  textoBotaoLink: {
    color: '#F8FAFC',
    fontSize: 14,
    fontFamily: 'Outfit-Bold',
  },
});
```

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

Abra o seu aplicativo `meu-primeiro-app` no VS Code. Vamos criar um **Player de Música Premium / Cartão de Áudio (Premium Audio Card)** repleto de tipografia refinada e ícones de toque:
1. Instale no terminal a biblioteca de tipografias **`@expo-google-fonts/inter`** (ou Montserrat).
2. Carregue os pesos `Inter_400Regular` e `Inter_700Bold` de forma assíncrona usando o `useFonts`.
3. No corpo do seu `App.js`, estruture um card de reprodução de música:
   - Exiba uma foto de capa de álbum quadrada e estilizada no centro do card.
   - Escreva o Nome da Música (em negrito usando a fonte carregada) e o Artista (peso regular) logo abaixo.
   - Desenhe uma **Barra de Progresso da Música** (um retângulo longo e fino cinza, com um preenchimento azul/verde simulando que a música está na metade).
   - Coloque uma barra de controles de música na base com **3 ícones vetoriais de toque**:
     - Voltar: `Ionicons` ou `FontAwesome` (ícone de avançar para trás/rewind).
     - Play/Pause: Um ícone grande e redondo no meio (ícone de tocar ou pausar).
     - Avançar: Um ícone de pular música.
4. Adicione na barra superior um ícone de "Coração" para permitir favoritar a música.
5. Estilize todo o app em um elegante e moderno Dark Mode de altíssimo nível.

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] A instalação do pacote `@expo-google-fonts/inter` foi concluída com sucesso sem quebras.
- [ ] O hook `useFonts` foi declarado e a renderização defensiva com `if (!fontsLoaded)` evita bugs.
- [ ] O cartão de música aplica a fonte personalizada carregada no título da faixa e no nome do artista.
- [ ] Os 3 botões de reprodução na base utilizam ícones vetoriais nítidos e do mesmo conjunto tipográfico de forma harmônica.
- [ ] O aplicativo é exibido em Dark Mode refinado com bordas perfeitamente arredondadas e sombras nítidas.

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Destaque o seu design com diferenciais de interação dinâmica:
- **Favoritar com Estado Reativo:** Crie um estado booleano `const [curtido, setCurtido] = useState(false)`. Faça com que o clique no ícone de Coração do cabeçalho alterne o estado. Na renderização condicional, se for `true` exiba o ícone **preenchido e vermelho** (ex: `heart` vermelho), se for `false` exiba o ícone apenas com o **contorno cinza** (ex: `heart-o` cinza)!
- **Volume Dinâmico:** Crie botões de aumentar/diminuir na lateral da barra de progresso. Use ícones vetoriais de alto-falante (`volume-up`, `volume-down`, `volume-off`) e faça o ícone mudar de símbolo dinamicamente de acordo com o nível numérico do volume atual!
- **Combinando Múltiplas Fontes:** Tente carregar e misturar duas fontes diferentes no mesmo aplicativo (ex: use uma fonte elegante com serifa para títulos, e uma fonte sem serifa e limpa para os textos menores).

