---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-para-dispositivos-moveis-aula-11-trabalhando-com-imagens-e-camera
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-para-dispositivos-moveis/aula-11-trabalhando-com-imagens-e-camera
sidebar_position: 11
title: Aula 11 — Acesso à Câmera e Galeria com Expo Image Picker
description: Solicite permissões de hardware no Android e iOS, abra a câmera nativa e selecione fotos da galeria no React Native.
---

# Aula 11 — Acesso à Câmera e Galeria com Expo Image Picker

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a acessar os recursos de hardware do smartphone utilizando a biblioteca oficial **`expo-image-picker`**, solicitar permissões de privacidade no Android e iOS, abrir a câmera nativa para captura de fotos em tempo real e selecionar imagens da galeria de fotos com opções de corte (*crop/editing*).

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O modelo de segurança e permissões em tempo de execução (*Runtime Permissions*).
- O pacote `expo-image-picker`:
  - `requestCameraPermissionsAsync()`
  - `requestMediaLibraryPermissionsAsync()`
  - `launchCameraAsync()`
  - `launchImageLibraryAsync()`
- Manipulação da URI local da foto capturada.
- Exibição de pré-visualização da imagem no componente `<Image>`.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### Permissões no Mobile Moderno
Diferente da web desktop antiga, sistemas operacionais modernos como Android 13+ e iOS exigem que o aplicativo **peça autorização explícita ao usuário** antes de acessar a câmera ou ler fotos da galeria privada.

Se o usuário rejeitar a permissão, o aplicativo não deve travar, mas sim exibir uma mensagem educada explicando por que aquela funcionalidade é necessária (ex: "Precisamos da câmera para você tirar sua foto de perfil").

### Instalação no Expo:
```bash
npx expo install expo-image-picker
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### Componente de Seleção de Avatar: `src/components/FotoPerfilPicker.js`
```jsx
import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export function FotoPerfilPicker({ onImagemSelecionada }) {
  const [imagemUri, setImagemUri] = useState(null);

  async function handleTirarFoto() {
    // 1. Solicita permissão da câmera
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permissão Negada', 'Precisamos da permissão da câmera para tirar a foto.');
      return;
    }

    // 2. Abre a câmera nativa
    const resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true, // Permite cortar a foto
      aspect: [1, 1],      // Força proporção quadrada 1:1
      quality: 0.7,        // Otimiza o tamanho do arquivo
    });

    // 3. Se o usuário não cancelou, captura a URI
    if (!resultado.canceled) {
      const uri = resultado.assets[0].uri;
      setImagemUri(uri);
      if (onImagemSelecionada) onImagemSelecionada(uri);
    }
  }

  async function handleEscolherDaGaleria() {
    // 1. Solicita permissão da galeria
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permissão Negada', 'Precisamos de acesso às suas fotos.');
      return;
    }

    // 2. Abre a galeria de imagens
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!resultado.canceled) {
      const uri = resultado.assets[0].uri;
      setImagemUri(uri);
      if (onImagemSelecionada) onImagemSelecionada(uri);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.circuloFoto}>
        {imagemUri ? (
          <Image source={{ uri: imagemUri }} style={styles.foto} />
        ) : (
          <Text style={styles.placeholderTexto}>Sem Foto 📷</Text>
        )}
      </View>

      <View style={styles.botoesContainer}>
        <TouchableOpacity style={styles.botao} onPress={handleTirarFoto}>
          <Text style={styles.textoBotao}>Abrir Câmera</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, styles.botaoGaleria]} onPress={handleEscolherDaGaleria}>
          <Text style={styles.textoBotao}>Galeria</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginVertical: 20 },
  circuloFoto: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#10b981',
    overflow: 'hidden',
    marginBottom: 16,
  },
  foto: { width: '100%', height: '100%' },
  placeholderTexto: { color: '#64748b', fontSize: 14 },
  botoesContainer: { flexDirection: 'row', gap: 12 },
  botao: { backgroundColor: '#10b981', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 },
  botaoGaleria: { backgroundColor: '#3b82f6' },
  textoBotao: { color: '#ffffff', fontWeight: 'bold', fontSize: 14 },
});
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Instale o pacote `expo-image-picker` com `npx expo install expo-image-picker`.
2. Adicione o componente `FotoPerfilPicker` na tela de Perfil do usuário.
3. Teste no dispositivo físico:
   - Clique em "Abrir Câmera" e conceda a permissão solicitada pelo Android/iOS.
   - Tire uma foto real, ajuste a área de corte quadrada e confirme.
   - Veja a foto ser renderizada imediatamente no círculo do perfil.
4. Teste também a seleção a partir das imagens salvas na galeria do aparelho.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O app solicita as permissões adequadas antes de invocar a câmera ou galeria.
- [ ] O usuário consegue cancelar a ação sem gerar falhas no app (`resultado.canceled`).
- [ ] A proporção 1:1 é aplicada para padronizar fotos de perfil.
- [ ] O componente `<Image>` exibe a URI local com sucesso.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Como você enviaria a foto capturada pelo celular (`imagemUri`) para a rota `PATCH /usuarios/avatar` da API Back-End que criamos na Aula 16? Construa o objeto `FormData` com `{ uri, name, type }` e dispare o upload usando o Axios!
