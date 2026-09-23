---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-para-dispositivos-moveis-aula-13-notificacoes-push-locais
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-para-dispositivos-moveis/aula-13-notificacoes-push-locais
sidebar_position: 13
title: Aula 13 — Notificações Locais com Expo Notifications
description: Programe notificações locais com títulos, ícones e disparos agendados no smartphone usando o expo-notifications.
---

# Aula 13 — Notificações Locais com Expo Notifications

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender o funcionamento das notificações no sistema operacional móvel, diferenciar **Notificações Locais** (disparadas pelo próprio app no aparelho) de **Notificações Push Remotas** (enviadas por servidores em nuvem via APNs/FCM), e aprender a agendar alertas com títulos, corpos e sons usando a biblioteca **`expo-notifications`**.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O ecossistema de notificações móveis.
- Permissão de notificação no Android e iOS (`requestPermissionsAsync()`).
- O manipulador de exibição de notificação em primeiro plano (`setNotificationHandler`).
- Disparando notificações locais imediatas (`scheduleNotificationAsync`).
- Agendando notificações com gatilhos temporais baseados em segundos (*triggers*).

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### Notificação Local vs. Notificação Push
* **Notificação Local:** O próprio código JavaScript rodando no smartphone agenda o alarme no sistema operacional do aparelho (ex: "Lembrete: você tem aula em 10 minutos" ou "Alarme de remédio às 14h"). **Não precisa de servidor nem de internet!**
* **Notificação Push Remota:** Um servidor na nuvem envia uma mensagem para a Apple (APNs) ou Google (FCM), que por sua vez entrega a mensagem na bandeja do celular do usuário (ex: "Sua pizza acabou de sair para entrega").

### Instalação no Expo:
```bash
npx expo install expo-notifications
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### 1. Configurando o Manipulador Global: `src/services/notifications.js`
```javascript
import * as Notifications from 'expo-notifications';

// Configura o comportamento da notificação quando o app estiver ABERTO em primeiro plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function solicitarPermissaoNotificacao() {
  const { status: statusExistente } = await Notifications.getPermissionsAsync();
  let statusFinal = statusExistente;

  if (statusExistente !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    statusFinal = status;
  }

  return statusFinal === 'granted';
}

export async function dispararNotificacaoLocal(titulo, corpo) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: titulo,
      body: corpo,
      sound: true,
    },
    trigger: null, // null = dispara imediatamente!
  });
}

export async function agendarNotificacaoEmSegundos(titulo, corpo, segundos) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: titulo,
      body: corpo,
      sound: true,
    },
    trigger: {
      seconds: segundos, // Dispara após X segundos
    },
  });
}
```

### 2. Tela de Teste de Notificações: `src/screens/LembretesScreen.js`
```jsx
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import {
  solicitarPermissaoNotificacao,
  dispararNotificacaoLocal,
  agendarNotificacaoEmSegundos,
} from '../services/notifications';

export function LembretesScreen() {
  useEffect(() => {
    solicitarPermissaoNotificacao();
  }, []);

  function handleNotificacaoImediata() {
    dispararNotificacaoLocal(
      '🎉 Notificação do Portal Técnico DS!',
      'Parabéns! Sua primeira notificação local foi disparada com sucesso no React Native.'
    );
  }

  function handleLembreteAgendado() {
    agendarNotificacaoEmSegundos(
      '⏰ Hora da Revisão de Código!',
      'Você agendou este lembrete há 10 segundos. É hora de praticar no laboratório!',
      10
    );

    Alert.alert(
      'Lembrete Agendado!',
      'Sua notificação chegará em 10 segundos. Você pode inclusive minimizar o app para testar!'
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Central de Lembretes 🔔</Text>

      <TouchableOpacity style={styles.botao} onPress={handleNotificacaoImediata}>
        <Text style={styles.textoBotao}>Disparar Imediatamente</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.botao, styles.botaoAgendado]} onPress={handleLembreteAgendado}>
        <Text style={styles.textoBotao}>Agendar para daqui a 10 Segundos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 24, justifyContent: 'center' },
  titulo: { color: '#ffffff', fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 32 },
  botao: { backgroundColor: '#10b981', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 16 },
  botaoAgendado: { backgroundColor: '#3b82f6' },
  textoBotao: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
});
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Instale o pacote `expo-notifications` no seu projeto.
2. Configure o arquivo `notifications.js` com o `setNotificationHandler`.
3. Teste no smartphone físico com o Expo Go:
   - Clique em "Disparar Imediatamente" e veja o banner de notificação descer no topo da tela do celular emitindo som.
   - Clique em "Agendar para daqui a 10 Segundos", **bloqueie a tela do celular ou volte para a tela inicial do aparelho**, e aguarde os 10 segundos passarem para ver a notificação acender a tela bloqueada!

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] A permissão de notificação foi solicitada e aceita no aparelho.
- [ ] O `setNotificationHandler` garante que a notificação apareça mesmo com o app aberto.
- [ ] O gatilho de 10 segundos aciona a notificação com som e vibração nativos.
- [ ] O texto e título da notificação são exibidos com clareza na bandeja do sistema.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Como você adicionaria dados extras (metadados invisíveis) à notificação? Pesquise sobre a propriedade `data: { pedidoId: '12345' }` do objeto `content` e o listener `addNotificationResponseReceivedListener` para fazer o app navegar automaticamente para a tela daquele pedido quando o usuário tocar na notificação!
