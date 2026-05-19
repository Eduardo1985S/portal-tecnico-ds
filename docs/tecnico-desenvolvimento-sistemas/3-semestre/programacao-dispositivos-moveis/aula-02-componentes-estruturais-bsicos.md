---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-dispositivos-moveis-aula-02-componentes-estruturais-bsicos
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-dispositivos-moveis/aula-02-componentes-estruturais-bsicos
sidebar_position: 2
title: Aula 02 — Componentes Estruturais Básicos
description: Aula 02 do curso de Programação para Dispositivos Móveis
---

# Aula 02 — Componentes Estruturais Básicos

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Entender os três pilares visuais do React Native: como criar "caixas", adicionar textos e pintar tudo com estilos.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- A diferença entre as tags HTML e os Componentes Nativos.
- O componente `<View>` (a Div do mobile).
- O componente `<Text>` (o parágrafo do mobile).
- `StyleSheet` para organização visual.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### O Fim do HTML
Você se lembra de usar `<div>`, `<p>` e `<h1>` na web? No celular, o sistema operacional (Android/iOS) não sabe o que é uma div. Precisamos falar a linguagem nativa do aparelho. O React Native faz isso usando **Componentes Nativos**. 

- Sempre que quiser criar um contêiner, caixa, tela ou divisória, use a **`<View>`**.
- Sempre que quiser exibir qualquer letra, título ou palavra, use o **`<Text>`**.

*Atenção: No React Native, todo texto OBRIGATORIAMENTE precisa estar dentro de um componente `<Text>`. Você não pode colocar texto solto dentro de uma `<View>`!*

### Estilização
Não temos arquivos `.css`. No React Native, todo o estilo é feito dentro do próprio JavaScript usando objetos. Nós criamos um dicionário de estilos usando a ferramenta `StyleSheet.create()`.

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como apagamos tudo e deixamos um `App.js` bem simples (faremos tudo no App.js pelas próximas aulas!):

```javascript
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={estilos.telaGeral}>
      <Text style={estilos.titulo}>Olá Mundo Mobile!</Text>
      <View style={estilos.caixaSecundaria}>
        <Text style={estilos.textoCaixa}>Eu sou um texto dentro de outra caixa!</Text>
      </View>
    </View>
  );
}

// O nosso CSS fica aqui embaixo!
const estilos = StyleSheet.create({
  telaGeral: {
    flex: 1, // Ocupa a tela inteira
    backgroundColor: '#1E1E1E',
    justifyContent: 'center', // Centraliza na vertical
    alignItems: 'center' // Centraliza na horizontal
  },
  titulo: {
    color: '#00FF00',
    fontSize: 24,
    fontWeight: 'bold'
  },
  caixaSecundaria: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginTop: 20,
    borderRadius: 10
  },
  textoCaixa: {
    color: '#333333'
  }
});
```

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

Abra o projeto que você criou na Aula 01 (`meu-primeiro-app`) e vá até o arquivo `App.js`.
1. Apague tudo o que está escrito no `return`.
2. Tente recriar a estrutura do exemplo prático acima (digite, evite copiar e colar para o seu cérebro gravar!).
3. Altere as cores: faça a tela principal ter um fundo azul escuro e o título ser branco.
4. Mude a cor da "caixa secundária" para amarelo.

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O arquivo importou corretamente o `View`, `Text` e `StyleSheet` do `'react-native'`.
- [ ] Todo texto do aplicativo está encapsulado em um `<Text>`.
- [ ] O `StyleSheet.create` está bem formatado e sendo referenciado nos componentes via `style={estilos.nomeDoEstilo}`.
- [ ] O aplicativo rodou no celular/emulador sem apresentar tela vermelha de erro.

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Assuma o controle do seu aprendizado: crie mais duas caixas (`<View>`) abaixo da caixa amarela. Pinte uma de vermelho e outra de verde, e coloque textos diferentes dentro de cada uma delas. 

Brinque com propriedades CSS que você já conhece do mundo web dentro do StyleSheet, como `margin`, `padding` e `borderWidth`. O React Native usa a maioria das regras do CSS, com a diferença que escrevemos no formato *camelCase* (em vez de `background-color`, usamos `backgroundColor`). Lembre-se: errar faz parte do processo, se der tela vermelha, leia o erro com calma!
