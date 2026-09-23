---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-para-dispositivos-moveis-aula-02-requisicoes-post-e-put
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-para-dispositivos-moveis/aula-02-requisicoes-post-e-put
sidebar_position: 2
title: Aula 02 — Requisições POST e PUT no Mobile
description: Aprenda a enviar dados do formulário mobile para servidores remotos criando e atualizando registros via API.
---

# Aula 02 — Requisições POST e PUT no Mobile

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a capturar dados de formulários mobile digitados pelo usuário, estruturar payloads em formato JSON e enviá-los através de requisições **`POST`** (para criação) e **`PUT`** (para edição/atualização) para uma API Back-End, controlando o estado de carregamento (*Loading*) e fornecendo feedback visual com `Alert`.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O método `fetch` configurado para operações com corpo (`body: JSON.stringify(...)`).
- O cabeçalho essencial `Content-Type: application/json`.
- Desabilitando botões durante o processamento para evitar envios duplicados (*double submit*).
- O componente nativo `<ActivityIndicator>` do React Native.
- O componente de alerta nativo do sistema operacional (`Alert.alert`).

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

Diferente do método `GET` (que apenas busca dados e não envia corpo), as requisições `POST` e `PUT` exigem:
1. Definir o `method: 'POST'` ou `method: 'PUT'`.
2. Informar explicitamente no cabeçalho `headers` que estamos transmitindo JSON: `'Content-Type': 'application/json'`.
3. Serializar o objeto JavaScript em uma string válida com `JSON.stringify(dados)`.

### Boas Práticas de UX Mobile:
Em smartphones com conexões móveis (3G/4G/5G instáveis), a requisição pode demorar alguns segundos. **Nunca deixe o usuário sem resposta!**
* Exiba um indicador de carregamento (`ActivityIndicator`).
* Desabilite o botão de envio (`disabled={carregando}`).
* Limpe os campos ou volte para a tela anterior após a confirmação de sucesso.

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### Tela de Cadastro de Produtos: `src/screens/CriarProdutoScreen.js`
```jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export function CriarProdutoScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleSalvarProduto() {
    // 1. Validação local simples
    if (!nome.trim() || !preco.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    const valorNumerico = parseFloat(preco.replace(',', '.'));
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert('Valor Inválido', 'Informe um preço numérico válido.');
      return;
    }

    try {
      setCarregando(true);

      // 2. Envio da requisição POST para a API Back-End
      // Dica: No emulador Android use 10.0.2.2 em vez de localhost!
      const resposta = await fetch('http://10.0.2.2:3333/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome.trim(),
          preco: valorNumerico,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.message || 'Falha ao cadastrar produto.');
      }

      // 3. Sucesso!
      Alert.alert('Sucesso!', 'Produto cadastrado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Erro', error.message || 'Não foi possível conectar ao servidor.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.form}>
        <Text style={styles.label}>Nome do Produto</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Teclado Mecânico"
          placeholderTextColor="#64748b"
          value={nome}
          onChangeText={setNome}
          editable={!carregando}
        />

        <Text style={styles.label}>Preço (R$)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 250.00"
          placeholderTextColor="#64748b"
          keyboardType="numeric"
          value={preco}
          onChangeText={setPreco}
          editable={!carregando}
        />

        <TouchableOpacity
          style={[styles.button, carregando && styles.buttonDisabled]}
          onPress={handleSalvarProduto}
          disabled={carregando}
          activeOpacity={0.8}
        >
          {carregando ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Cadastrar Produto</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  form: { flex: 1, padding: 24, justifyContent: 'center' },
  label: { color: '#f8fafc', fontSize: 14, fontWeight: '600', marginBottom: 6 },
  input: {
    backgroundColor: '#1e293b',
    color: '#ffffff',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  button: {
    backgroundColor: '#10b981',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: { backgroundColor: '#059669', opacity: 0.7 },
  buttonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
});
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie a tela `CriarProdutoScreen` no seu projeto.
2. Certifique-se de que a API Back-End (desenvolvida no módulo anterior) está em execução na sua máquina.
3. Configure o endereço IP correto:
   - Se testar no **dispositivo físico via Expo Go**: use o IP da sua rede local (ex: `http://192.168.1.100:3333/produtos`).
   - Se testar no **emulador Android Studio**: use `http://10.0.2.2:3333/produtos`.
4. Preencha o formulário e dispare o cadastro.
5. Verifique no terminal da API o status 201 e o produto persistido no PostgreSQL!

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] A requisição envia cabeçalho `'Content-Type': 'application/json'` e corpo serializado.
- [ ] O componente `ActivityIndicator` é exibido enquanto a requisição está pendente.
- [ ] O teclado numérico é acionado no campo de preço (`keyboardType="numeric"`).
- [ ] A tela navega de volta automaticamente após o alerta de sucesso (`navigation.goBack()`).

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Crie uma tela similar chamada `EditarProdutoScreen`. Ela deve receber o objeto do produto via `route.params`, preencher os inputs com os dados atuais e disparar uma requisição `PUT` para `/produtos/:id` salvando as alterações no servidor!
