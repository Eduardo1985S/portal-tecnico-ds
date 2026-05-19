---
id: "tecnico-desenvolvimento-sistemas-3-semestre-programacao-para-dispositivos-moveis-aula-06-listas-simples-e-renderizacao-condicional"
slug: "/tecnico-desenvolvimento-sistemas/3-semestre/programacao-para-dispositivos-moveis/aula-06-listas-simples-e-renderizacao-condicional"
sidebar_position: 6
title: "Aula 06 — Listas Simples e Renderização Condicional"
description: "Aula 06 do curso de Programação para Dispositivos Móveis - Listas com .map() e Renderização Condicional"
---

## Aula 06 — Listas Simples e Renderização Condicional

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a renderizar coleções de dados dinâmicas na tela utilizando estruturas de repetição integradas ao JSX e dominar o uso de condicionais lógicas para exibir ou ocultar componentes visuais na tela com base nas ações do usuário.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Mapeamento de vetores de objetos com o método **`.map()`** do JavaScript.
- A obrigatoriedade e importância da propriedade **`key`** no React.
- O conceito e aplicação de **Renderização Condicional**.
- Uso prático do **Operador Ternário** (`condição ? verdadeiro : falso`).
- Uso prático do **Operador Lógico AND** (`condição && componente`).

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

Em aplicativos do mundo real, raramente criamos linhas de texto repetitivas à mão. Em vez disso, recebemos uma lista de dados (seja de um banco de dados ou de uma API) e precisamos transformá-los em elementos visuais automaticamente.

### 1. Renderizando Listas com `.map()`
No JavaScript, a melhor ferramenta para transformar um array de dados em um array de componentes visuais é o método **`.map()`**. Ele passa por cada elemento do array e "mapeia" (converte) aquele dado em uma tag visual:

```javascript
const alunos = ['Ana', 'Bruno', 'Carlos'];

return (
  <View>
    {alunos.map((nome, index) => (
      <Text key={index}>{nome}</Text>
    ))}
  </View>
);
```

#### A Importância da `key`
Percebeu a propriedade `key={index}` no exemplo acima? O React exige que **todo elemento filho de uma lista tenha uma chave de identificação única**. 
Isso permite que o motor do React saiba exatamente qual item mudou, foi deletado ou adicionado, garantindo alta performance no celular e evitando erros de renderização.

---

### 2. O que é Renderização Condicional?
É o ato de exibir determinados elementos na tela apenas se uma condição lógica for verdadeira. Temos duas formas clássicas de fazer isso em JSX:

#### A. Operador Ternário (`? :`)
Perfeito quando você tem **duas alternativas** (uma se for verdadeiro, e outra se for falso):
```javascript
{logado ? <Text>Bem-vindo!</Text> : <Text>Por favor, faça login.</Text>}
```

#### B. Operador Lógico AND (`&&`)
Ideal quando você tem **apenas uma alternativa** (se for verdadeiro exibe o elemento, se for falso não mostra absolutamente nada):
```javascript
{temErro && <Text style={{ color: 'red' }}>Ocorreu um erro crítico!</Text>}
```

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Substitua o conteúdo do seu `App.js` por este **Menu de Restaurante Premium com Filtro por Categoria**. 

Ele exibe uma lista de pratos que muda dinamicamente ao clicar nos botões de filtro no topo, usando a combinação de `.filter()`, `.map()` e renderizações condicionais:

```javascript
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function App() {
  // Estado para armazenar qual categoria está selecionada
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');

  // Nosso "banco de dados" de produtos
  const produtos = [
    { id: '1', nome: 'Burguer Supremo', preco: 'R$ 38,90', categoria: 'Lanches' },
    { id: '2', nome: 'Batata Rústica', preco: 'R$ 18,50', categoria: 'Acompanhamentos' },
    { id: '3', nome: 'Refrigerante Orgânico', preco: 'R$ 8,00', categoria: 'Bebidas' },
    { id: '4', nome: 'Combo Gigante', preco: 'R$ 55,00', categoria: 'Lanches' },
    { id: '5', nome: 'Suco de Maracujá', preco: 'R$ 10,00', categoria: 'Bebidas' },
  ];

  // Filtramos os produtos com base na categoria selecionada no estado
  const produtosFiltrados = categoriaAtiva === 'Todos' 
    ? produtos 
    : produtos.filter(p => p.categoria === categoriaAtiva);

  return (
    <View style={estilos.telaGeral}>
      <Text style={estilos.titulo}>Cardápio Digital</Text>
      <Text style={estilos.subtitulo}>Escolha uma categoria e saboreie o melhor</Text>

      {/* Botões de Filtros no Topo */}
      <View style={estilos.areaFiltros}>
        {['Todos', 'Lanches', 'Acompanhamentos', 'Bebidas'].map(cat => (
          <TouchableOpacity
            key={cat}
            // Se a categoria deste botão for a ativa, pintamos o botão com uma cor diferente!
            style={[estilos.botaoFiltro, categoriaAtiva === cat && estilos.botaoFiltroAtivo]}
            onPress={() => setCategoriaAtiva(cat)}
          >
            <Text style={[estilos.textoBotao, categoriaAtiva === cat && estilos.textoBotaoAtivo]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista Dinâmica de Produtos */}
      <ScrollView contentContainerStyle={estilos.listaItens}>
        {produtosFiltrados.map(item => (
          <View key={item.id} style={estilos.cardItem}>
            <View>
              <Text style={estilos.nomeItem}>{item.nome}</Text>
              <Text style={estilos.categoriaBadge}>{item.categoria}</Text>
            </View>
            <Text style={estilos.precoItem}>{item.preco}</Text>
          </View>
        ))}

        {/* Renderização Condicional: Se a lista estiver vazia, mostra mensagem */}
        {produtosFiltrados.length === 0 && (
          <Text style={estilos.textoVazio}>Nenhum prato disponível nesta categoria.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  telaGeral: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 24,
  },
  areaFiltros: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Quebra de linha se os botões não couberem lado a lado
    gap: 8,
    marginBottom: 24,
  },
  botaoFiltro: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
  },
  botaoFiltroAtivo: {
    backgroundColor: '#F59E0B', // Amarelo/Laranja premium
    borderColor: '#F59E0B',
  },
  textoBotao: {
    color: '#94A3B8',
    fontWeight: '600',
    fontSize: 13,
  },
  textoBotaoAtivo: {
    color: '#0F172A',
  },
  listaItens: {
    gap: 16,
    paddingBottom: 40,
  },
  cardItem: {
    backgroundColor: '#1E293B',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  nomeItem: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  categoriaBadge: {
    color: '#94A3B8',
    fontSize: 11,
    backgroundColor: '#0F172A',
    alignSelf: 'flex-start', // Ocupa apenas o tamanho do texto
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    overflow: 'hidden',
  },
  precoItem: {
    color: '#F59E0B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textoVazio: {
    color: '#64748B',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 15,
  },
});
```

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

Abra o seu aplicativo `meu-primeiro-app` no VS Code. Vamos criar um **Gerenciador de Lista de Compras Inteligente**!
1. Crie uma lista (array de objetos) de produtos de mercado contendo: `id`, `nome`, `categoria` e `comprado` (boolean). Cada item deve começar com `comprado: false`.
2. Exiba botões de categorias no topo (ex: "Todos", "Hortifruti", "Limpeza", "Bebidas").
3. Mapeie os itens filtrados na tela em formato de cards.
4. Aplique **estilos condicionais** para marcar o status de comprado:
   - Se o produto tiver `comprado: false`, mostre o card com fundo escuro e o texto "Pendente" em cinza.
   - Se o produto tiver `comprado: true`, aplique estilos diferentes: mude a cor do fundo do card para verde-claro/escuro e coloque o texto com efeito riscado ou com uma mensagem de "Comprado! ✅".
5. Crie uma funcionalidade reativa para alternar o status: ao clicar em qualquer card da lista, altere o valor do atributo `comprado` correspondente de `false` para `true` (ou vice-versa) na memória do estado.

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] A lista de compras é gerada dinamicamente mapeando o array de objetos com `.map()`.
- [ ] Cada elemento mapeado possui um atributo `key` único.
- [ ] O filtro de categorias está funcionando e exibe a mensagem condicional de "Lista Vazia" caso nenhum item corresponda à seleção.
- [ ] Ao clicar em um card, a interface se atualiza instantaneamente mudando a estilização do item (pendente vs comprado) sem tela vermelha.
- [ ] O código utiliza o operador ternário ou operadores de curto-circuito (`&&`) para decidir estilos ou exibições condicionais de forma limpa.

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Destaque-se implementando funcionalidades extras:
- **Barra de Pesquisa em Tempo Real:** Adicione um `<TextInput>` no topo do aplicativo. Conforme o usuário digita letras nesse campo, aplique um filtro extra combinando o filtro de categoria com o método `.includes()` do JavaScript, fazendo os itens serem filtrados ao vivo pelo nome!
- **Painel de Resumo / Estatísticas:** Crie uma View condicional que mostra a quantidade total de itens cadastrados e quantos deles já foram marcados como comprados (ex: *"Você já comprou 3 de 5 itens!"*).
- **Adicionar Itens à Lista:** Crie um pequeno campo de texto com um botão de "+" para permitir que os alunos cadastrem novos itens na lista de compras diretamente no celular!

