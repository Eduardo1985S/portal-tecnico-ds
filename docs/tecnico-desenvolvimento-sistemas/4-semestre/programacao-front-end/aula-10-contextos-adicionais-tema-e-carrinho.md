---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-front-end-aula-10-contextos-adicionais-tema-e-carrinho
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-front-end/aula-10-contextos-adicionais-tema-e-carrinho
sidebar_position: 10
title: "Aula 10 — Contextos Adicionais: Tema e Carrinho"
description: Pratique a criação de múltiplos contextos globais implementando um alternador de Tema (Dark Mode) e um Carrinho de Compras.
---

# Aula 10 — Contextos Adicionais: Tema e Carrinho

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprofundar o domínio da Context API do React construindo múltiplos contextos especializados e independentes: um contexto de personalização de interface (**ThemeContext**) para alternância fluida entre Dark Mode e Light Mode e um contexto de e-commerce (**CartContext**) para gerenciar adição, remoção de itens, quantidades e cálculo dinâmico do subtotal da compra.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O padrão de composição de múltiplos Providers no arquivo raiz.
- Implementação de um alternador de Tema global (*Dark Mode / Light Mode*).
- Manipulação da classe `.dark` no elemento `document.documentElement`.
- Criação do `CartContext`: adicionando produtos, incrementando quantidades e removendo itens.
- Cálculo automático de totais com `.reduce()` memorizado.
- Persistência das preferências e do carrinho no `localStorage`.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Uma aplicação não precisa (e não deve!) colocar tudo dentro de um único contexto gigante. A melhor prática é criar **contextos com responsabilidade única**:

```text
<AuthProvider>
  <ThemeProvider>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </ThemeProvider>
</AuthProvider>
```

Se o usuário adicionar um item ao carrinho, apenas os componentes inscritos no `CartContext` serão notificados, sem disparar renderizações desnecessárias em componentes que cuidam apenas de autenticação ou tema!

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como construir o contexto de tema:

```jsx
// src/contexts/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({});

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState(() => {
    return localStorage.getItem('@app:tema') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('@app:tema', tema);
    // Aplica ou remove a classe no elemento HTML raiz
    if (tema === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [tema]);

  function alternarTema() {
    setTema(prev => prev === 'light' ? 'dark' : 'light');
  }

  return (
    <ThemeContext.Provider value={{ tema, alternarTema, ehDark: tema === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
```

E o contexto de carrinho de compras:

```jsx
// src/contexts/CartContext.jsx
import { createContext, useContext, useState } from 'react';

const CartContext = createContext({});

export function CartProvider({ children }) {
  const [itens, setItens] = useState([]);

  function adicionarItem(produto) {
    setItens(prev => {
      const existe = prev.find(item => item.id === produto.id);
      if (existe) {
        return prev.map(item => 
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  }

  function removerItem(id) {
    setItens(prev => prev.filter(item => item.id !== id));
  }

  function limparCarrinho() {
    setItens([]);
  }

  // Calcula o valor total do carrinho
  const valorTotal = itens.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
  const totalItens = itens.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <CartContext.Provider value={{ itens, totalItens, valorTotal, adicionarItem, removerItem, limparCarrinho }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie os arquivos `ThemeContext.jsx` e `CartContext.jsx` na pasta `src/contexts/`.
2. Envolva o aplicativo com ambos os provedores.
3. No cabeçalho da sua página:
   - Adicione um botão com ícone de Sol ☀️ / Lua 🌙 que alterna o tema ao clicar.
   - Adicione um ícone de carrinho 🛒 com uma bolha vermelha (*badge*) exibindo `totalItens`.
4. Crie uma página de listagem de produtos com botão "Adicionar ao Carrinho" e veja o contador do cabeçalho subindo em tempo real!

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Separação clara de contextos com escopos isolados.
- [ ] Provedores aninhados corretamente no arquivo de montagem.
- [ ] Custom hooks `useTheme()` e `useCart()` funcionando sem erros.
- [ ] Cálculo de total do carrinho atualizando automaticamente ao somar ou remover itens.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione botões de incremento (+) e decremento (-) na quantidade de cada produto dentro de uma gaveta lateral (*Drawer*) de visualização do carrinho de compras!
