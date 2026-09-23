---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-para-dispositivos-moveis-aula-06-context-api-na-pratica
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-para-dispositivos-moveis/aula-06-context-api-na-pratica
sidebar_position: 6
title: Aula 06 — Context API na Prática (Carrinho e Temas)
description: Crie contextos adicionais para gerenciar o carrinho de compras e alternar entre Dark e Light mode no aplicativo.
---

# Aula 06 — Context API na Prática (Carrinho e Temas)

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprofundar o uso da **Context API** no React Native criando contextos especializados adicionais (como um **Carrinho de Compras** com cálculo dinâmico de totais e um alternador de **Tema Claro/Escuro**), aprendendo a aninhar múltiplos *Providers* de forma limpa e organizada.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Aninhamento de múltiplos provedores de contexto (`AuthProvider`, `CartProvider`, `ThemeProvider`).
- Modelagem de estado complexo em coleções (adicionar, remover, incrementar quantidade).
- Cálculo reativo derivado de valores (total em R$ e quantidade total de itens no carrinho).
- Criação de um badge numérico flutuante sobre o ícone do carrinho na barra de abas.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

Um erro comum em iniciantes é tentar colocar todo o estado do aplicativo em um único e gigantesco contexto ("God Context"). Isso causa re-renderizações desnecessárias em telas que nada têm a ver com aquele dado.

A boa prática consiste em **separar contextos por domínio de responsabilidade**:
* `AuthContext`: gerencia credenciais, token e usuário logado.
* `CartContext`: gerencia itens selecionados, quantidades e subtotal de compras.
* `ThemeContext`: gerencia paleta de cores ativas (Dark/Light).

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### 1. Criando o Contexto do Carrinho: `src/contexts/CartContext.js`
```jsx
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext({});

export function CartProvider({ children }) {
  const [itens, setItens] = useState([]);

  function adicionarItem(produto) {
    setItens((itensAtuais) => {
      // Verifica se o item já existe no carrinho
      const itemExistente = itensAtuais.find((i) => i.id === produto.id);

      if (itemExistente) {
        // Se já existe, apenas incrementa a quantidade
        return itensAtuais.map((i) =>
          i.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i
        );
      }

      // Se for novo, adiciona com quantidade 1
      return [...itensAtuais, { ...produto, quantidade: 1 }];
    });
  }

  function removerItem(produtoId) {
    setItens((itensAtuais) => itensAtuais.filter((i) => i.id !== produtoId));
  }

  function limparCarrinho() {
    setItens([]);
  }

  // Cálculos dinâmicos derivados do estado
  const quantidadeTotal = itens.reduce((acc, item) => acc + item.quantidade, 0);
  const valorTotal = itens.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  return (
    <CartContext.Provider
      value={{
        itens,
        quantidadeTotal,
        valorTotal,
        adicionarItem,
        removerItem,
        limparCarrinho,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser utilizado dentro de um CartProvider');
  }
  return context;
}
```

### 2. Compondo Provedores no `App.js`:
```jsx
import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import { CartProvider } from './src/contexts/CartContext';
import { Routes } from './src/routes';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes />
      </CartProvider>
    </AuthProvider>
  );
}
```

### 3. Usando o Carrinho na Tela de Produtos:
```jsx
import { useCart } from '../contexts/CartContext';

export function CardCatalogo({ produto }) {
  const { adicionarItem } = useCart();

  return (
    <View style={styles.card}>
      <Text style={styles.nome}>{produto.nome}</Text>
      <Text style={styles.preco}>R$ {produto.preco.toFixed(2)}</Text>
      <TouchableOpacity 
        style={styles.botaoAdicionar}
        onPress={() => adicionarItem(produto)}
      >
        <Text style={styles.textoBotao}>Adicionar ao Carrinho 🛒</Text>
      </TouchableOpacity>
    </View>
  );
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Implemente o `CartContext.js` conforme o exemplo prático e integre-o no `App.js`.
2. Na tela de catálogo de produtos, adicione o botão para colocar itens no carrinho.
3. Crie uma nova tela chamada `CarrinhoScreen`:
   - Liste os itens adicionados com suas respectivas quantidades e preços parciais.
   - Exiba o valor total em destaque no rodapé da tela.
   - Adicione botões de `+` e `-` para alterar a quantidade de cada item.
   - Adicione um botão "Finalizar Pedido" que limpa o carrinho e exibe um alerta de agradecimento.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O `CartProvider` está aninhado e disponível em todas as rotas do app.
- [ ] Adicionar o mesmo item múltiplas vezes incrementa a quantidade em vez de duplicar linhas.
- [ ] O valor total é recalculado automaticamente em tempo real.
- [ ] Remover um item atualiza a interface instantaneamente.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

No componente de navegação em abas (`BottomTabNavigator`), adicione a propriedade `tabBarBadge: quantidadeTotal` no ícone do carrinho da tela `CarrinhoScreen`. Comprove que o número de itens adicionados aparece em uma bolinha vermelha estilizada sobre a aba do rodapé!
