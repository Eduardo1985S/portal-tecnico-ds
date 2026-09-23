---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-para-dispositivos-moveis-aula-18-desenvolvimento-do-projeto-final-parte-1
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-para-dispositivos-moveis/aula-18-desenvolvimento-do-projeto-final-parte-1
sidebar_position: 18
title: "Aula 18 — Desenvolvimento do Projeto Final (Parte 1: Telas e Navegação)"
description: Construção supervisionada da estrutura visual, temas e fluxo completo de navegação do aplicativo de formatura.
---

# Aula 18 — Desenvolvimento do Projeto Final (Parte 1: Telas e Navegação)

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Executar a primeira etapa prática de construção do aplicativo mobile do Projeto Integrador, implementando a malha completa de navegação, a padronização do Design System (cores, tipografia e espaçamentos) e as telas estruturais semânticas com componentes reutilizáveis.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Criação e montagem da árvore de navegação aninhada (AuthStack + MainTabs + DetailsStack).
- Padronização de tokens de design em `src/theme/colors.js`.
- Construção de cabeçalhos customizados (`CustomHeader`) e barras de navegação com ícones vetoriais `@expo/vector-icons`.
- Implementação de estados vazios (*Empty States*) para listas sem registros.
- Tratamento de telas de formulário com `KeyboardAvoidingView` e `ScrollView`.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### O Desafio do Teclado no Mobile (KeyboardAvoidingView)
Em telas de cadastro e formulários, quando o usuário clica em um `TextInput` na parte inferior da tela, o teclado virtual do Android/iOS sobe e cobre os campos de digitação e o botão de salvar.

Para evitar que o usuário digite "às cegas", envolvemos o formulário em dois componentes complementares:
1. `<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>`: Desloca a tela para cima conforme a altura do teclado.
2. `<ScrollView keyboardShouldPersistTaps="handled">`: Garante que, mesmo em telas de smartphones pequenos, o usuário possa rolar o formulário e tocar fora do teclado para fechá-lo.

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático: Template de Formulário com Tratamento de Teclado

```jsx
import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function FormContainer({ children }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0f172a' },
  keyboardContainer: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: 24, justifyContent: 'center' },
});
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática: Sessão de Codificação em Equipe

1. Organize os arquivos de rotas da sua equipe:
   - `src/routes/auth.routes.js`: Telas de Login e Cadastro de Usuário.
   - `src/routes/app.routes.js`: Bottom Tab com as telas Home, Catálogo/Lista, Notificações/Lembretes e Perfil.
2. Padronize os botões e inputs de todas as telas com os componentes reutilizáveis criados ao longo do semestre.
3. Garanta que todas as telas de cadastro e formulários utilizem o `FormContainer` com suporte ao teclado.
4. Execute o app no Expo Go e navegue por todas as abas e telas empilhadas para garantir que não há erros de navegação.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Todas as telas principais do aplicativo estão navegáveis e com visual padronizado.
- [ ] O teclado virtual não esconde os inputs nos formulários em nenhum smartphone.
- [ ] Os ícones da Bottom Tab Navigation estão bem alinhados e utilizam a paleta de cores oficial.
- [ ] O código visual foi comitado na branch da equipe no GitHub.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione um componente de **Lista Vazia (Empty State)** na sua `<FlatList>` usando a propriedade `ListEmptyComponent`. Se a lista estiver sem nenhum item, exiba um ícone grande, um título ("Nenhum registro encontrado") e um botão incentivando o usuário a criar o primeiro item!
