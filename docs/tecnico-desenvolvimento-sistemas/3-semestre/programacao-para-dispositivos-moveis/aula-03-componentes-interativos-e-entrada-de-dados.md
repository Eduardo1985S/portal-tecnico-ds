---
id: "tecnico-desenvolvimento-sistemas-3-semestre-programacao-para-dispositivos-moveis-aula-03-componentes-interativos-e-entrada-de-dados"
slug: "/tecnico-desenvolvimento-sistemas/3-semestre/programacao-para-dispositivos-moveis/aula-03-componentes-interativos-e-entrada-de-dados"
sidebar_position: 3
title: "Aula 03 — Componentes Interativos e Entrada de Dados"
description: "Aula 03 do curso de Programação para Dispositivos Móveis - Inputs, Botões Personalizados e Imagens"
---

# Aula 03 — Componentes Interativos e Entrada de Dados

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Sair da estrutura estática das caixas de texto e permitir que o usuário interaja diretamente com o aplicativo: digitando dados, clicando em botões personalizados com efeitos visuais e visualizando imagens.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O componente de entrada de texto: **`<TextInput>`**.
- O componente de botão dinâmico: **`<TouchableOpacity>`**.
- O componente de renderização de imagens: **`<Image>`**.
- Introdução prática à captura de dados em tempo real com **`useState`** e feedback visual com **`Alert.alert`**.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

Até o momento, criamos layouts que apenas exibem informações estáticas. Mas um aplicativo real precisa ouvir o usuário! Hoje conheceremos os três componentes essenciais para criar formulários e fluxos de interação.

### 1. Capturando Textos com `<TextInput>`
O `<TextInput>` é o equivalente à tag `<input type="text">` do HTML. Ele permite que o usuário digite letras, números e símbolos. Algumas propriedades cruciais dele são:
- `placeholder`: O texto de dica que some quando o usuário começa a digitar.
- `placeholderTextColor`: A cor da dica.
- `secureTextEntry`: Se definido como `true`, transforma o texto em bolinhas (usado para senhas).
- `keyboardType`: Altera o layout do teclado virtual do celular (ex: `'email-address'` para mostrar o `@` com facilidade, ou `'numeric'` para mostrar apenas números).

### 2. Criando Botões com `<TouchableOpacity>`
O React Native possui um componente chamado `<Button>`, mas ele tem um grande problema: **ele não pode ser estilizado livremente** (no iOS ele fica apenas como um texto clicável azul, e no Android como um retângulo rígido). 

Por isso, desenvolvedores profissionais usam o **`<TouchableOpacity>`**. Ele funciona como um contêiner (como uma `<View>`) que aceita qualquer estilo, mas com uma mágica especial: **quando o usuário clica nele, sua opacidade diminui levemente por uma fração de segundo**, dando um efeito de "clique físico" muito agradável ao usuário.

### 3. Exibindo Imagens com `<Image>`
Para exibir logos, fotos de perfil ou banners, usamos o `<Image>`. Ele suporta dois formatos de origem:
* **Locais (salvas no projeto):** Usamos a função `require` informando o caminho do arquivo.
  ```javascript
  source={require('./assets/minha-imagem.png')}
  ```
* **Remotas (da internet):** Passamos um objeto contendo a propriedade `uri`. **Atenção:** Imagens remotas exigem que você defina a largura (`width`) e altura (`height`) manualmente no StyleSheet, senão elas não aparecem!
  ```javascript
  source={{ uri: 'https://site.com/foto.jpg' }}
  ```

### 4. Uma espiadinha no Estado (`useState`)
Para que o botão saiba o que foi digitado no input, precisamos salvar essa informação temporariamente. Usamos um "bloco de notas" da memória do React chamado **`useState`**. Ele cria uma variável reativa que guarda o texto conforme ele é digitado.

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Abaixo está o código completo para um **Formulário de Login Premium** com tema escuro e efeitos visuais modernos. Copie essa estrutura para o seu `App.js` para ver o resultado:

```javascript
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';

export default function App() {
  // Criamos as caixas de memória para o Email e a Senha
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Função disparada ao clicar no botão de Entrar
  const lidarComLogin = () => {
    if (email === '' || senha === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
    } else {
      Alert.alert('Sucesso', `Login efetuado com o email:\n${email}`);
    }
  };

  return (
    <View style={estilos.telaGeral}>
      {/* Exibindo uma imagem remota de logo */}
      <Image 
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} 
        style={estilos.logo}
      />

      <Text style={estilos.titulo}>Acesso ao Portal</Text>
      <Text style={estilos.subtitulo}>Faça login para continuar seus estudos</Text>

      {/* Caixa de Entrada de Email */}
      <TextInput 
        style={estilos.campoEntrada}
        placeholder="Digite seu email"
        placeholderTextColor="#888888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail} // Atualiza a memória de email a cada letra digitada
      />

      {/* Caixa de Entrada de Senha */}
      <TextInput 
        style={estilos.campoEntrada}
        placeholder="Digite sua senha"
        placeholderTextColor="#888888"
        secureTextEntry={true} // Esconde os caracteres
        value={senha}
        onChangeText={setSenha} // Atualiza a memória de senha
      />

      {/* Botão de Ação Estilizado */}
      <TouchableOpacity 
        style={estilos.botao}
        onPress={lidarComLogin}
        activeOpacity={0.7} // Controla a intensidade do efeito visual do clique
      >
        <Text style={estilos.textoBotao}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  telaGeral: {
    flex: 1,
    backgroundColor: '#0F172A', // Azul escuro premium
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginBottom: 24,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 32,
    textAlign: 'center',
  },
  campoEntrada: {
    width: '100%',
    height: 55,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: 16,
    color: '#F8FAFC',
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  botao: {
    width: '100%',
    height: 55,
    backgroundColor: '#3B82F6', // Azul brilhante
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4, // Sombra para Android
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
```

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

Abra o seu aplicativo `meu-primeiro-app` no VS Code. Vamos transformar a interface antiga em um **Cartão de Feedback e Cadastro**.
1. Modifique o `App.js` para exibir uma imagem remota de avatar (por exemplo, uma foto de perfil simulada da internet).
2. Adicione **três** campos de entrada de texto:
   - **Nome do Usuário** (Teclado padrão).
   - **Telefone** (Teclado numérico - `keyboardType="phone-pad"`).
   - **Comentário / Feedback** (Teclado padrão).
3. Estilize os inputs com cantos arredondados, fundo cinza-claro ou escuro, e uma borda sutil.
4. Crie um botão `<TouchableOpacity>` personalizado com fundo verde (`#10B981`) chamado "Enviar Comentários".
5. Quando o botão for clicado, exiba um alerta contendo o nome e o comentário digitados pelo usuário.

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] A tela usa `<Image>` com largura e altura explicitadas.
- [ ] Foram utilizados pelo menos 3 `<TextInput>` com propriedades coerentes (`keyboardType` corretos).
- [ ] O botão foi construído usando `<TouchableOpacity>` e estilizado com `StyleSheet`.
- [ ] A interação com `useState` funciona e captura as alterações em tempo real.
- [ ] Ao clicar em enviar, a validação impede campos vazios e mostra as informações corretas usando `Alert.alert`.

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Para expandir sua autonomia como desenvolvedor, tente implementar esses recursos extras no seu cartão:
- **Teclado Multilinhas:** No campo de Comentário, adicione as propriedades `multiline={true}` e `numberOfLines={4}` no seu `<TextInput>`. Perceba como o campo se comporta como uma área de texto grande.
- **Feedback Focado:** Mude a cor da borda do input selecionado! Para isso, você pode pesquisar sobre a propriedade `onFocus` ou simplesmente criar estilos elegantes de contorno.
- **Desafio Estético:** Deixe o seu botão com gradientes ou adicione um ícone ou emoji ao lado do texto dentro dele (lembre-se: ícones e emojis também são strings e devem ficar dentro de um componente `<Text>`).

