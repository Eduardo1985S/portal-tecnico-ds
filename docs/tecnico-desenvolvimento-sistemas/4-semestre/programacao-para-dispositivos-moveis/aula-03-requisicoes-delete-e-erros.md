---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-para-dispositivos-moveis-aula-03-requisicoes-delete-e-erros
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-para-dispositivos-moveis/aula-03-requisicoes-delete-e-erros
sidebar_position: 3
title: Aula 03 — Requisições DELETE e Tratamento de Erros no Mobile
description: Implemente a exclusão de itens com diálogo nativo de confirmação e trate erros de rede no React Native.
---

# Aula 03 — Requisições DELETE e Tratamento de Erros no Mobile

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a executar requisições **`DELETE`** via API para remoção de registros no servidor, implementar **caixas de diálogo nativas de confirmação prévia** (`Alert.alert` com múltiplos botões de ação) para evitar exclusões acidentais no mobile e tratar falhas de rede com mensagens claras.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O método HTTP `DELETE` e passagem de ID no caminho da URL (`/recurso/:id`).
- Configurando caixas de diálogo nativas com múltiplos botões no `Alert.alert`.
- Atualização otimista de interface (*Optimistic UI update*) vs. atualização pós-confirmação.
- Tratamento de quedas de rede (dispositivo sem internet).
- Remoção do item da lista local do estado `useState` usando `.filter()`.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### O Cuidado com Operações Destrutivas em Telas Touch
Em smartphones, toques acidentais acontecem com frequência. Por esse motivo, **nenhum aplicativo profissional deve excluir um registro ao primeiro clique** sem antes solicitar confirmação explícita ao usuário:

```javascript
Alert.alert(
  'Excluir Item',
  'Tem certeza de que deseja excluir permanentemente este produto?',
  [
    { text: 'Cancelar', style: 'cancel' },
    { text: 'Excluir', style: 'destructive', onPress: () => executarExclusao(id) },
  ]
);
```

### Atualizando a Lista Local:
Quando o servidor confirma a exclusão com status 200/204, em vez de disparar uma nova requisição pesada para recarregar toda a lista de produtos, basta remover o item excluído do estado do React Native filtrando pelo ID:

```javascript
setProdutos((produtosAtuais) => produtosAtuais.filter((p) => p.id !== idExcluido));
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### Item da Lista com Ação de Exclusão: `src/components/CardProduto.js`
```jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export function CardProduto({ produto, onExcluir }) {
  function confirmarExclusao() {
    Alert.alert(
      'Confirmar Exclusão',
      `Deseja realmente remover o produto "${produto.nome}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sim, Excluir',
          style: 'destructive',
          onPress: () => onExcluir(produto.id),
        },
      ]
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.nome}>{produto.nome}</Text>
        <Text style={styles.preco}>R$ {produto.preco.toFixed(2)}</Text>
      </View>

      <TouchableOpacity
        style={styles.botaoExcluir}
        onPress={confirmarExclusao}
        activeOpacity={0.7}
      >
        <Text style={styles.textoExcluir}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  nome: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  preco: { color: '#10b981', fontSize: 14, fontWeight: '600', marginTop: 4 },
  botaoExcluir: {
    backgroundColor: '#ef444420',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ef444440',
  },
  textoExcluir: { fontSize: 18 },
});
```

### Função de Exclusão no Componente Pai:
```jsx
async function handleExcluirProduto(id) {
  try {
    const resposta = await fetch(`http://10.0.2.2:3333/produtos/${id}`, {
      method: 'DELETE',
    });

    if (!resposta.ok) {
      const erroDados = await resposta.json();
      throw new Error(erroDados.message || 'Falha ao excluir o produto.');
    }

    // Remove instantaneamente da interface visual
    setProdutos((listaAtual) => listaAtual.filter((item) => item.id !== id));

    Alert.alert('Sucesso', 'Produto removido com sucesso!');
  } catch (error) {
    Alert.alert('Erro', error.message || 'Não foi possível completar a exclusão.');
  }
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie o componente `CardProduto` com o botão de lixeira e o diálogo nativo `Alert.alert`.
2. Conecte a função `handleExcluirProduto` à sua tela de listagem de produtos.
3. Teste a exclusão no aplicativo:
   - Clique em excluir e selecione **"Cancelar"** (garanta que o item permanece intocado).
   - Clique em excluir e selecione **"Sim, Excluir"** (garanta que o item desaparece da tela e é deletado do PostgreSQL).
4. Desligue o Wi-Fi da sua máquina e tente excluir para conferir se o erro de conexão é capturado com elegância no `try/catch`.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] A exclusão sempre solicita confirmação prévia com `Alert.alert`.
- [ ] O botão de exclusão no diálogo utiliza o estilo destrutivo (`style: 'destructive'`).
- [ ] A requisição envia o método HTTP `DELETE` com o ID correto na URL.
- [ ] O estado local da lista é atualizado com `.filter()`, refletindo a remoção em tempo real.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Pesquise sobre a técnica de **Swipe to Delete** (arrastar o card para o lado para revelar o botão de exclusão, como no app do Gmail ou WhatsApp). No React Native, qual biblioteca da comunidade (como `react-native-gesture-handler`) permite implementar esse gesto de arrastar com facilidade?
