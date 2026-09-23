---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-front-end-aula-16-renderizacao-de-listas-e-a-propriedade-key
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-front-end/aula-16-renderizacao-de-listas-e-a-propriedade-key
sidebar_position: 16
title: "Aula 16 — Renderização de Listas e a Propriedade key"
description: Itere sobre coleções de dados transformando arrays em JSX com .map() e compreenda a função da prop key no Virtual DOM.
---

# Aula 16 — Renderização de Listas e a Propriedade key

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a transformar coleções de dados em elementos visuais na interface utilizando o método funcional `.map()`, compreender por que o React exige obrigatoriamente a propriedade especial `key` única em cada item e aplicar filtros dinâmicos de busca em tempo de digitação.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O método `Array.prototype.map()` e a transformação de dados em nós JSX.
- O papel da propriedade `key`: auxiliando o algoritmo de reconciliação do Virtual DOM.
- Os perigos de utilizar o índice do array (`index`) como chave (*key anti-pattern*).
- Filtragem dinâmica com `.filter()` combinada com `.map()`.
- Criação de listas interativas com remoção de itens específicos.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

No React não usamos loops imperativos como `for` ou `while` dentro do JSX. Usamos métodos funcionais que retornam uma nova coleção:

```jsx
const produtos = ['Mouse', 'Teclado', 'Monitor'];

return (
  <ul>
    {produtos.map((item, index) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);
```

### Por que a `key` é fundamental?

Quando a lista muda (um item é excluído, inserido no meio ou reordenado), o React precisa saber **qual elemento específico mudou** sem precisar re-renderizar todos os outros elementos do zero.

Se você usar o índice `index` como `key`: ao remover o primeiro item, todos os itens subsequentes mudam de índice, forçando o React a redesenhar todos os elementos da lista e gerando bugs em inputs com foco ou estados visuais!

> **Regra de ouro:** Use sempre identificadores únicos permanentes do seu banco de dados (ex: `item.id`), nunca índices temporários.

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como construir uma lista de produtos com filtro de busca em tempo real:

```jsx
import { useState } from 'react';

export default function CatalogoProdutos() {
  const [filtro, setFiltro] = useState('');
  const [produtos, setProdutos] = useState([
    { id: 1, nome: 'Teclado Mecânico RGB', categoria: 'Periféricos', preco: 250 },
    { id: 2, nome: 'Monitor UltraWide 29"', categoria: 'Monitores', preco: 1200 },
    { id: 3, nome: 'Mouse Ergonômico Sem Fio', categoria: 'Periféricos', preco: 180 },
    { id: 4, nome: 'Headset Gamer 7.1', categoria: 'Áudio', preco: 320 }
  ]);

  // Filtra a lista com base no termo digitado
  const produtosFiltrados = produtos.filter(p => 
    p.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  function removerProduto(id) {
    setProdutos(produtos.filter(p => p.id !== id));
  }

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto' }}>
      <h3>Catálogo de Periféricos</h3>

      <input 
        type="text" 
        placeholder="Buscar pelo nome..." 
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        style={{ padding: '8px 12px', width: '100%', marginBottom: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
      />

      {produtosFiltrados.length === 0 ? (
        <p style={{ color: '#888' }}>Nenhum produto encontrado com esse termo.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {produtosFiltrados.map((item) => (
            <li 
              key={item.id} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '12px', 
                marginBottom: '8px', 
                background: '#f8fafc', 
                border: '1px solid #e2e8f0', 
                borderRadius: '6px' 
              }}
            >
              <div>
                <strong>{item.nome}</strong><br />
                <small style={{ color: '#64748b' }}>{item.categoria} - R$ {item.preco}</small>
              </div>
              <button 
                onClick={() => removerProduto(item.id)}
                style={{ color: '#dc2626', background: 'transparent', border: '1px solid #fecaca', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer' }}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie uma aplicação de **Lista de Contatos**:
   - Cada contato possui `id`, `nome`, `email` e `telefone`.
2. Adicione um formulário acima da lista para cadastrar novos contatos (com ID gerado via `Date.now()`).
3. Renderize a lista com `.map()` e garanta que cada contato tenha sua `key={contato.id}`.
4. Adicione um botão para ordenar a lista em ordem alfabética de nomes.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Uso do método `.map()` retornando elementos JSX.
- [ ] Atribuição da prop `key` com ID único em cada elemento iterado.
- [ ] Implementação de filtro com `.filter()` antes da renderização.
- [ ] Ausência de alertas de `Each child in a list should have a unique "key" prop` no console do DevTools.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione um filtro por botões de categorias (ex: "Todos", "Periféricos", "Monitores"): ao clicar em uma categoria, a lista deve exibir apenas os produtos correspondentes!
