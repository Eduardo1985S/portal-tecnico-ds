---
id: "tecnico-desenvolvimento-sistemas-3-semestre-programacao-para-dispositivos-moveis-aula-07-listas-de-alta-performance"
slug: "/tecnico-desenvolvimento-sistemas/3-semestre/programacao-para-dispositivos-moveis/aula-07-listas-de-alta-performance"
sidebar_position: 7
title: "Aula 07 — Listas de Alta Performance"
description: "Aula 07 do curso de Programação para Dispositivos Móveis - Listas otimizadas com FlatList"
---

# Aula 07 — Listas de Alta Performance

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender o gargalo de performance gerado ao renderizar grandes volumes de dados no celular e dominar o uso do componente **`<FlatList>`** para criar listas fluidas, otimizadas, com reciclagem de memória e alto desempenho.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O gargalo de performance no mobile: **`<ScrollView>`** vs **`<FlatList>`**.
- O conceito de renderização sob demanda (*lazy rendering*) e reciclagem de células.
- Propriedades fundamentais do `<FlatList>`: **`data`**, **`renderItem`** e **`keyExtractor`**.
- Customização de listas com **`ItemSeparatorComponent`** e **`ListEmptyComponent`**.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

Até o momento, usamos a renderização simples mapeando arrays em Views comuns. Porém, no desenvolvimento de aplicativos mobile, **o uso de memória e processamento é extremamente restrito**.

### O Problema do `<ScrollView>`
Quando usamos um `<ScrollView>` para listar itens, o celular renderiza **absolutamente todos os elementos da lista na memória de uma só vez**, mesmo se a lista tiver 1000 itens e a tela do celular só consiga mostrar 5 por vez. 

Se você tiver imagens ou textos complexos, isso causará travamento no scroll do usuário, superaquecimento do processamento e, nos piores casos, o encerramento forçado do aplicativo (crash) em celulares mais antigos.

### A Otimização com o `<FlatList>`
O **`<FlatList>`** é o componente inteligente e otimizado do React Native feito especificamente para lidar com listas gigantescas de forma ultra fluida. Ele funciona baseado em duas regras de eficiência:
1.  **Renderização sob demanda (Lazy Rendering):** Ele cria os contêineres visuais apenas para os itens que estão visíveis na tela no exato momento.
2.  **Reciclagem de Células:** Conforme o usuário faz o scroll para baixo e um item sai do topo da tela, o contêiner visual daquele item é reutilizado e repintado com os dados do novo item que está entrando pela parte inferior da tela. A memória é reciclada!

---

### Anatomia de um `<FlatList>`

Diferente do `.map()`, o `<FlatList>` é um componente auto-fechado que recebe propriedades prontas:

```javascript
<FlatList
  data={meusDados} // O array (vetor) de objetos com os dados
  keyExtractor={item => item.id} // Diz qual atributo do objeto é a chave única
  renderItem={({ item }) => (
    // Função que desenha o layout de um único item
    <Text>{item.titulo}</Text>
  )}
/>
```

#### Outras propriedades fantásticas:
*   **`ItemSeparatorComponent`**: Permite renderizar um divisor personalizado (uma linha, um ponto ou um espaçamento) entre os itens automaticamente, evitando que você precise colocar margens manuais.
*   **`ListEmptyComponent`**: Uma View bonita que aparece automaticamente caso o seu array esteja vazio, eliminando a necessidade de fazer validações manuais com ternários na tela!

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Copie o código abaixo no seu `App.js` para rodar esta **Lista de Contatos Premium**. Ela possui uma barra de pesquisa que filtra uma lista de contatos instantaneamente e a renderiza de forma extremamente eficiente usando o `<FlatList>`:

```javascript
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';

export default function App() {
  const [pesquisa, setPesquisa] = useState('');

  // Vetor de contatos fictícios
  const contatos = [
    { id: '1', nome: 'Ana Carolina', telefone: '(11) 98888-7777', email: 'ana@email.com' },
    { id: '2', nome: 'Bruno Silva', telefone: '(11) 97777-6666', email: 'bruno@email.com' },
    { id: '3', nome: 'Carlos Eduardo', telefone: '(19) 96666-5555', email: 'carlos@email.com' },
    { id: '4', nome: 'Daniela Souza', telefone: '(21) 95555-4444', email: 'daniela@email.com' },
    { id: '5', nome: 'Eduardo Martins', telefone: '(47) 94444-3333', email: 'eduardo@email.com' },
    { id: '6', nome: 'Fernanda Oliveira', telefone: '(31) 93333-2222', email: 'fernanda@email.com' },
  ];

  // Filtramos os contatos conforme o usuário digita na barra de pesquisa
  const contatosFiltrados = contatos.filter(contato => 
    contato.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  // Componente que desenha o layout de cada contato
  const desenharContato = ({ item }) => {
    // Pegamos a primeira letra do nome para fazer uma foto/avatar redondo
    const inicial = item.nome.charAt(0);

    return (
      <View style={estilos.cardContato}>
        {/* Avatar Redondo */}
        <View style={estilos.avatar}>
          <Text style={estilos.textoAvatar}>{inicial}</Text>
        </View>

        {/* Informações do Contato */}
        <View style={estilos.infoContato}>
          <Text style={estilos.nomeContato}>{item.nome}</Text>
          <Text style={estilos.detalheContato}>{item.telefone} • {item.email}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={estilos.telaGeral}>
      <Text style={estilos.titulo}>Contatos Acadêmicos</Text>
      <Text style={estilos.subtitulo}>Pesquise por nome na lista otimizada com FlatList</Text>

      {/* Input de Pesquisa */}
      <TextInput 
        style={estilos.barraPesquisa}
        placeholder="Pesquisar contato..."
        placeholderTextColor="#64748B"
        value={pesquisa}
        onChangeText={setPesquisa}
      />

      {/* A Lista de Alta Performance */}
      <FlatList 
        data={contatosFiltrados}
        keyExtractor={item => item.id}
        renderItem={desenharContato}
        // Separador automático de itens
        ItemSeparatorComponent={() => <View style={estilos.divisor} />}
        // Layout exibido se a pesquisa não encontrar ninguém
        ListEmptyComponent={() => (
          <View style={estilos.containerVazio}>
            <Text style={estilos.textoVazio}>Nenhum contato encontrado.</Text>
          </View>
        )}
        contentContainerStyle={estilos.listaContainer}
      />
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 20,
  },
  barraPesquisa: {
    height: 50,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: 16,
    color: '#F8FAFC',
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 20,
  },
  listaContainer: {
    paddingBottom: 40,
  },
  cardContato: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textoAvatar: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContato: {
    flex: 1,
  },
  nomeContato: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  detalheContato: {
    color: '#64748B',
    fontSize: 13,
  },
  divisor: {
    height: 1,
    backgroundColor: '#1E293B',
    marginVertical: 4,
  },
  containerVazio: {
    alignItems: 'center',
    marginTop: 40,
  },
  textoVazio: {
    color: '#64748B',
    fontSize: 15,
  },
});
```

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

Abra o seu aplicativo `meu-primeiro-app` no VS Code. Vamos criar um **Extrato de Transações Financeiras Recentes (Fintech App)** totalmente otimizado!
1. Crie uma lista com **pelo menos 8 transações** fictícias. Cada objeto de transação no array deve conter: `id`, `descricao`, `data`, `tipo` ("entrada" ou "saida"), e `valor` (número real).
2. Adicione um cabeçalho que simula o saldo total do usuário (ex: um valor estático de R$ 2.450,00 destacado em cima).
3. Use o componente **`<FlatList>`** para renderizar a lista de transações com alto desempenho.
4. Desenhe um layout de card limpo para cada transação:
   - Se for do tipo "entrada", exiba o valor formatado com o símbolo de mais e em cor verde (ex: `+ R$ 150,00`).
   - Se for do tipo "saida", exiba o valor formatado com o símbolo de menos em vermelho ou branco (ex: `- R$ 42,90`).
   - Coloque um ícone ou caractere de seta apontando para cima (para entrada) ou para baixo (para saída) do lado esquerdo do card.
5. Adicione uma linha de separação elegante entre as transações usando a propriedade `ItemSeparatorComponent` do `<FlatList>`.
6. Adicione um campo `<TextInput>` no topo para permitir que o usuário digite o nome de um recebedor ou descrição para filtrar as transações em tempo real.

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] A lista de transações é renderizada usando `<FlatList>` ao invés de `.map()`.
- [ ] Foram informadas corretamente as propriedades `data`, `renderItem` e `keyExtractor`.
- [ ] A cor do valor e o sinal (`+` ou `-`) são renderizados de forma condicional dinâmica baseada no tipo de transação.
- [ ] Os cards estão separados de forma elegante através do uso da propriedade `ItemSeparatorComponent`.
- [ ] A barra de pesquisa filtra o extrato de forma reativa e exibe a View de "Lista Vazia" se nenhum resultado for encontrado.

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Leve a sua aplicação financeira ao nível profissional:
- **Puxar para Atualizar (Pull to Refresh):** O FlatList possui duas propriedades nativas maravilhosas para puxar a tela para recarregar! Pesquise e adicione as propriedades `onRefresh` e `refreshing` (vinculada a um estado boolean). Simule um carregamento de 2 segundos que limpa a barra de pesquisa ou sorteia uma nova transação!
- **Totalizadores em Tempo Real:** Conforme o usuário filtra as transações na barra de pesquisa, calcule dinamicamente e mostre na tela a soma total apenas dos valores filtrados que aparecem na lista!
- **Rolagem Horizontal:** O FlatList pode rolar na horizontal com uma única propriedade! Pesquise e tente criar uma segunda lista pequena horizontal (`horizontal={true}`) acima do extrato mostrando atalhos de contatos frequentes para transferir dinheiro.
