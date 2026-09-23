---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-para-dispositivos-moveis-aula-12-geolocalizacao-e-mapas
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-para-dispositivos-moveis/aula-12-geolocalizacao-e-mapas
sidebar_position: 12
title: Aula 12 — Geolocalização GPS com Expo Location
description: Capture as coordenadas de latitude e longitude do GPS do dispositivo utilizando o pacote expo-location.
---

# Aula 12 — Geolocalização GPS com Expo Location

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a acessar o hardware de GPS do smartphone utilizando a biblioteca oficial **`expo-location`**, solicitar permissões de localização em primeiro plano (*Foreground Location Permissions*), obter as coordenadas geográficas precisas de latitude e longitude do usuário e converter coordenadas em endereços amigáveis (*Geocodificação Reversa*).

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O funcionamento do sensor de GPS e triangulação de rede celular/Wi-Fi.
- Permissão de localização em primeiro plano (`requestForegroundPermissionsAsync`).
- Capturando a posição atual instantânea com `getCurrentPositionAsync()`.
- O que é Geocodificação Reversa (*Reverse Geocoding*): transformando coordenadas em Rua, Número, Bairro e Cidade.
- Exibição de coordenadas e precisão do sinal (*accuracy*).

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### O Poder da Geolocalização no Mobile
A grande vantagem de aplicativos móveis em relação a sistemas web é a capacidade de saber onde o usuário físico está localizado em tempo real. Isso viabiliza recursos indispensáveis no mercado moderno:
* Aplicativos de entrega e delivery (ex: rastrear entrega no iFood).
* Aplicativos de transporte e mobilidade urbana (ex: Uber).
* Check-in de técnicos de campo e ponto eletrônico geolocalizado.
* Lojas e serviços mais próximos com base no raio de distância em quilômetros.

### Instalação no Expo:
```bash
npx expo install expo-location
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### Componente de Captura de GPS: `src/components/LocalizacaoAtual.js`
```jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';

export function LocalizacaoAtual() {
  const [localizacao, setLocalizacao] = useState(null);
  const [endereco, setEndereco] = useState(null);
  const [carregandoGps, setCarregandoGps] = useState(false);

  async function handleObterLocalizacao() {
    try {
      setCarregandoGps(true);

      // 1. Solicita permissão de localização
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permissão Negada', 'Autorize o acesso à localização para continuar.');
        return;
      }

      // 2. Obtém as coordenadas atuais do GPS
      const posicao = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High, // Alta precisão
      });

      const { latitude, longitude } = posicao.coords;
      setLocalizacao({ latitude, longitude });

      // 3. Geocodificação Reversa: Descobre o endereço daquelas coordenadas!
      const enderecosEncontrados = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (enderecosEncontrados.length > 0) {
        const item = enderecosEncontrados[0];
        setEndereco(`${item.street || 'Rua'}, ${item.name || ''} - ${item.subregion || item.city} (${item.region})`);
      }
    } catch (error) {
      Alert.alert('Erro de GPS', 'Não foi possível capturar a localização atual.');
    } finally {
      setCarregandoGps(false);
    }
  }

  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>📍 Localização GPS do Dispositivo</Text>

      {localizacao ? (
        <View style={styles.dadosContainer}>
          <Text style={styles.textoCoordenada}>Latitude: {localizacao.latitude.toFixed(6)}</Text>
          <Text style={styles.textoCoordenada}>Longitude: {localizacao.longitude.toFixed(6)}</Text>

          {endereco && (
            <Text style={styles.textoEndereco}>🏠 Endereço aproximado: {endereco}</Text>
          )}
        </View>
      ) : (
        <Text style={styles.placeholder}>Nenhuma localização capturada ainda.</Text>
      )}

      <TouchableOpacity
        style={styles.botao}
        onPress={handleObterLocalizacao}
        disabled={carregandoGps}
        activeOpacity={0.8}
      >
        {carregandoGps ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.textoBotao}>Capturar Minha Localização</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    margin: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  titulo: { color: '#ffffff', fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  placeholder: { color: '#64748b', fontSize: 14, marginBottom: 16 },
  dadosContainer: { marginBottom: 16 },
  textoCoordenada: { color: '#38bdf8', fontSize: 14, fontFamily: 'monospace', marginBottom: 4 },
  textoEndereco: { color: '#10b981', fontSize: 14, marginTop: 8, fontWeight: '500' },
  botao: { backgroundColor: '#10b981', padding: 14, borderRadius: 10, alignItems: 'center' },
  textoBotao: { color: '#ffffff', fontWeight: 'bold', fontSize: 15 },
});
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Instale o pacote `expo-location` no seu projeto Expo.
2. Adicione o componente `LocalizacaoAtual` em uma tela do seu aplicativo.
3. Teste no dispositivo físico:
   - Clique no botão e aceite a permissão "Durante o uso do app".
   - Veja o GPS ativar e retornar suas coordenadas reais de latitude/longitude e o nome da sua rua via Geocodificação Reversa.
4. Salve essas coordenadas junto ao pedido ou check-in do usuário no banco de dados.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] A permissão de primeiro plano é verificada com status `granted`.
- [ ] A precisão `Location.Accuracy.High` obtém coordenadas em alta resolução.
- [ ] A função `reverseGeocodeAsync` traduz com sucesso latitude/longitude em logradouro e cidade.
- [ ] O componente trata com segurança eventuais falhas ou recusa de permissão.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Como você calcularia a **distância em linha reta (em km)** entre a posição atual do usuário e as coordenadas da sua escola SENAI? Pesquise sobre a **Fórmula de Haversine** e crie uma função que receba as duas latitudes e longitudes e devolva a distância calculada!
