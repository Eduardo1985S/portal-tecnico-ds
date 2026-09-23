---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-para-dispositivos-moveis-aula-14-animacoes-e-feedback-haptico
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-para-dispositivos-moveis/aula-14-animacoes-e-feedback-haptico
sidebar_position: 14
title: Aula 14 — Animações Fluidas e Feedback Háptico
description: Crie transições visuais com a API Animated nativa e adicione vibrações táteis precisas com expo-haptics.
---

# Aula 14 — Animações Fluidas e Feedback Háptico

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a elevar a experiência do usuário (UX) a um nível profissional implementando **transições e microanimações fluidas** a 60 quadros por segundo utilizando a API nativa **`Animated`** do React Native, e adicionando **feedback tátil (vibração de precisão)** através da biblioteca **`expo-haptics`**.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O papel das microinterações no engajamento do usuário mobile.
- A API `Animated` nativa do React Native (`Animated.Value`, `Animated.timing`, `Animated.spring`).
- O parâmetro de alta performance `useNativeDriver: true` (execução da animação na thread nativa sem travar o JavaScript).
- O que é feedback háptico (Haptic Feedback) e o pacote `expo-haptics`.
- Padrões de vibração: `notificationAsync`, `impactAsync` (Light, Medium, Heavy) e `selectionAsync`.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### O que é o `useNativeDriver: true`?
Em animações tradicionais sem Native Driver, o JavaScript precisa recalcular a posição ou opacidade a cada frame (16 milissegundos) e enviar comandos pela ponte (*bridge*) para o Android/iOS. Se o app estiver processando dados pesados ao mesmo tempo, a animação sofrerá quedas bruscas de frames (engasgos).

Ao configurar `useNativeDriver: true`, o React Native envia toda a descrição da animação para a **thread nativa do sistema operacional** antes de iniciá-la. A animação executa com fluidez máxima e estabilidade garantida!

### Instalação do Haptics:
```bash
npx expo install expo-haptics
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### Botão com Efeito de Pulso e Vibração: `src/components/BotaoAnimado.js`
```jsx
import React, { useRef } from 'react';
import { Animated, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

export function BotaoAnimado({ titulo, onPress }) {
  // 1. Cria o valor animado para a escala (escala normal = 1)
  const escalaAnimada = useRef(new Animated.Value(1)).current;

  function handlePressIn() {
    // Vibração sutil ao pressionar o botão
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Reduz a escala para 95% do tamanho
    Animated.spring(escalaAnimada, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  }

  function handlePressOut() {
    // Retorna suavemente ao tamanho original com efeito mola (spring)
    Animated.spring(escalaAnimada, {
      toValue: 1,
      friction: 4,    // Controle de atrito da mola
      tension: 40,   // Tensão da mola
      useNativeDriver: true,
    }).start();
  }

  function handlePress() {
    // Vibração de sucesso
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    if (onPress) onPress();
  }

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
    >
      <Animated.View style={[styles.botao, { transform: [{ scale: escalaAnimada }] }]}>
        <Text style={styles.texto}>{titulo}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#10b981',
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  texto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
```

### Fade-In Suave na Abertura de Telas:
```jsx
import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export function TelaComFadeIn({ children }) {
  const opacidade = useRef(new Animated.Value(0)).current; // Inicia invisível

  useEffect(() => {
    // Anima a opacidade de 0 até 1 em 500 milissegundos
    Animated.timing(opacidade, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return <Animated.View style={{ flex: 1, opacity: opacidade }}>{children}</Animated.View>;
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Instale o pacote `expo-haptics` com `npx expo install expo-haptics`.
2. Implemente o componente `BotaoAnimado` com o efeito de mola `Animated.spring`.
3. Substitua os botões principais do seu aplicativo (ex: botão de Login e botão de Adicionar ao Carrinho) pelo `BotaoAnimado`.
4. Teste no smartphone físico:
   - Sinta o clique tátil no motor de vibração do aparelho ao tocar no botão.
   - Observe a animação orgânica de compressão e expansão suave.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Todas as animações configuram `useNativeDriver: true` para máxima performance.
- [ ] O componente `Animated.spring` produz transição de mola sem travamentos.
- [ ] O pacote `expo-haptics` dispara feedback tátil perceptível no aparelho físico.
- [ ] A tela possui transição suave de entrada com opacidade (`Animated.timing`).

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Pesquise sobre a biblioteca **React Native Reanimated** (desenvolvida pela Software Mansion). Por que grandes empresas e aplicativos de topo de mercado utilizam o Reanimated para construir gestos complexos de arrastar e animações com física realista no mobile?
