---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-para-dispositivos-moveis-aula-01-revisao-e-consolidacao
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-para-dispositivos-moveis/aula-01-revisao-e-consolidacao
sidebar_position: 1
title: Aula 01 — Revisão e Consolidação do Mobile I
description: Revisão das bases de React Native, componentes estruturais, navegação e preparação do ambiente para o Mobile II.
---

# Aula 01 — Revisão e Consolidação do Mobile I

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Revisar os conceitos fundamentais de desenvolvimento mobile com **React Native e Expo** aprendidos no 3º semestre, consolidar a estrutura de componentes funcionais, estilização com Flexbox e navegação com React Navigation, preparando a base de código para operações avançadas de rede, persistência local e recursos nativos.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O ecossistema React Native: Managed Workflow do Expo e JSX.
- Componentes fundamentais: `<View>`, `<Text>`, `<TextInput>`, `<TouchableOpacity>`, `<FlatList>`.
- O motor Flexbox no mobile (`flexDirection: 'column'` por padrão).
- Revisão do Hook `useState` e re-renderização de telas.
- Estruturação de projetos com React Navigation (Stack e Tabs).

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### A Evolução para o Mobile II
No 3º semestre, aprendemos a construir interfaces visuais limpas e a consumir dados de servidores através do método `GET` com `fetch`. 

No **4º Semestre (Mobile II)**, daremos o salto para aplicativos de nível profissional de mercado:
1. **Operações Completas de Rede:** Criação, edição e exclusão de dados (`POST`, `PUT`, `DELETE`) usando o cliente **Axios**.
2. **Estado Global:** Compartilhamento de dados de autenticação e temas através da **Context API**.
3. **Persistência Local e Offline-First:** Armazenamento seguro de sessões com **AsyncStorage** e banco relacional embarcado no celular com **SQLite**.
4. **Recursos de Hardware:** Integração com Câmera do smartphone (`expo-image-picker`), Geolocalização GPS (`expo-location`) e Notificações Push locais.
5. **Backend as a Service:** Autenticação e banco NoSQL em nuvem com **Firebase**.
6. **Publicação:** Geração de instaladores finais `.apk` para Android utilizando o **EAS Build**.

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### Estrutura de Pastas Recomendada para o Mobile II
```
meu-app-mobile/
├── assets/
├── src/
│   ├── components/       # Botões, Inputs, Cards reutilizáveis
│   ├── contexts/         # AuthContext, ThemeContext
│   ├── database/         # SQLite e migrations locais
│   ├── routes/           # Stack, Tabs e Navegadores
│   ├── screens/          # Telas completas (Login, Home, Perfil)
│   ├── services/         # Configuração do Axios e chamadas de API
│   └── theme/            # Cores, fontes e espaçamentos
├── App.js
├── app.json
└── package.json
```

### Inicializando um Projeto Expo Limpo:
```bash
# Criação do projeto com template limpo
npx create-expo-app meu-app-mobile --template blank

# Instalando dependências essenciais de navegação
npx expo install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context
```

### Exemplo de Tela Padrão com SafeArea: `src/screens/HomeScreen.js`
```jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo ao Mobile II 📱</Text>
        <Text style={styles.subtitle}>
          Desenvolvimento Mobile Avançado com React Native & Expo
        </Text>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Detalhes')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Acessar Recursos</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#10b981',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie um novo projeto Expo ou abra o projeto consolidado do 3º semestre.
2. Certifique-se de que o aplicativo executa no seu smartphone físico através do **Expo Go** (via QR Code) ou no emulador Android/iOS.
3. Crie a estrutura de pastas recomendada dentro de `src/`.
4. Configure a navegação Stack com duas telas simples (`Login` e `Home`) com transição suave entre elas.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O projeto Expo está inicializado e configurado na versão mais recente.
- [ ] O aplicativo executa sem erros no dispositivo físico ou emulador.
- [ ] O componente `SafeAreaView` protege a interface das barras de status do smartphone.
- [ ] A navegação entre telas funciona perfeitamente.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione à sua tela inicial um componente `<StatusBar style="light" />` do pacote `expo-status-bar` para garantir que o relógio, bateria e ícones do topo do smartphone fiquem brancos sobre o fundo escuro do app!
