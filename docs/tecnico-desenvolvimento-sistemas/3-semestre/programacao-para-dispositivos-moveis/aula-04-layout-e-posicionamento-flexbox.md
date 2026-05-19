---
id: "tecnico-desenvolvimento-sistemas-3-semestre-programacao-para-dispositivos-moveis-aula-04-layout-e-posicionamento-flexbox"
slug: "/tecnico-desenvolvimento-sistemas/3-semestre/programacao-para-dispositivos-moveis/aula-04-layout-e-posicionamento-flexbox"
sidebar_position: 4
title: "Aula 04 — Layout e Posicionamento (Flexbox)"
description: "Aula 04 do curso de Programação para Dispositivos Móveis - Alinhamentos e Estruturas Dinâmicas com Flexbox"
---

## Aula 04 — Layout e Posicionamento (Flexbox)

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender o motor de posicionamento do React Native — o **Flexbox** — e aprender a alinhar, distribuir e dimensionar componentes de forma harmônica e totalmente responsiva, criando interfaces que se adaptam a qualquer tamanho de celular.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- A grande diferença do Flexbox Mobile vs Flexbox Web.
- A direção do layout: **`flexDirection`** (`column` e `row`).
- Distribuição de elementos no eixo principal: **`justifyContent`**.
- Distribuição no eixo perpendicular: **`alignItems`**.
- Distribuição proporcional com **`flex`**.
- Espaçamento inteligente entre elementos filhos usando **`gap`**.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

No desenvolvimento mobile, **não temos CSS Grid** nem alinhamentos absolutos baseados em floats. O React Native usa **exclusivamente o Flexbox** para estruturar a tela. Se você já usou Flexbox na Web, o conceito é muito parecido, mas com **duas regras de ouro fundamentais** que mudam tudo:

### Regra de Ouro 01: O Padrão é Vertical (`column`)
Na Web, quando você coloca `display: flex;` em uma div, todos os filhos ficam lado a lado (em linha). No celular, a tela é naturalmente vertical. Por isso, no React Native, **o padrão de direção principal é a coluna (`column`)**. 
Todos os itens que você colocar dentro de uma `<View>` serão empilhados um embaixo do outro por padrão.

### Regra de Ouro 02: Sem `display: flex`
Você não precisa escrever `display: flex` em nenhum estilo! **Todas as Views do React Native já são flex containers por definição.** Você só precisa começar a usar as propriedades de alinhamento diretamente.

---

### Propriedades Essenciais que você deve dominar:

#### 1. `flexDirection` (A Direção do Fluxo)
Define o eixo principal onde os itens serão organizados:
*   `column` *(Padrão)*: Empilha os itens verticalmente. Eixo principal = Vertical.
*   `row`: Organiza os itens horizontalmente (lado a lado). Eixo principal = Horizontal.

#### 2. `justifyContent` (Alinhamento no Eixo Principal)
Define como as caixas são distribuídas ao longo da direção definida em `flexDirection`:
*   `flex-start`: Alinha tudo no início do eixo.
*   `center`: Centraliza os elementos.
*   `flex-end`: Alinha tudo no final do eixo.
*   `space-between`: Distribui o espaço restante igualmente **entre** os elementos (empurrando o primeiro para o início e o último para o fim).
*   `space-around` / `space-evenly`: Distribui os espaços igualmente ao redor de todos os elementos.

#### 3. `alignItems` (Alinhamento no Eixo Perpendicular)
Alinha os elementos na direção oposta ao `flexDirection`. Se os itens estão lado a lado (`row`), o `alignItems` controla a altura deles (vertical).
*   `stretch` *(Padrão)*: Estica os itens para preencher a largura total disponível.
*   `center`: Centraliza perpendicularmente.
*   `flex-start` / `flex-end`: Alinha no topo/base ou esquerda/direita.

#### 4. `flex` (O Crescimento Proporcional)
O `flex` é um número que indica quanta parte da tela a caixa deve ocupar.
*   Se uma `<View>` tem `flex: 1`, ela ocupará **toda a tela** (caso seja o contêiner principal).
*   Se dentro de uma View principal você tiver um Cabeçalho com `flex: 1`, um Conteúdo com `flex: 4` e um Rodapé com `flex: 1`, a tela será dividida em 6 partes (1+4+1): o Conteúdo ocupará 4/6 da tela, enquanto o cabeçalho e rodapé ocuparão 1/6 cada.

#### 5. `gap` (Espaçamento Moderno)
Em vez de ficar colocando `marginTop` ou `marginRight` em cada card de forma manual e sofrida, você pode definir a propriedade **`gap: 16`** na View mãe. Ela cria um espaçamento exato e automático de 16 pixels entre cada filho!

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Abra o seu arquivo `App.js` e substitua o código anterior por esta **Dashboard Financeira Escura**. Ela usa Flexbox de forma avançada para construir um Cabeçalho (`row`), Cards lado a lado (`row` + `gap`) e um painel de transações vertical (`column`):

```javascript
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={estilos.telaPrincipal}>
      
      {/* 1. CABEÇALHO (flexDirection: row) */}
      <View style={estilos.cabecalho}>
        <View>
          <Text style={estilos.textoSaudacao}>Olá, Estudante!</Text>
          <Text style={estilos.textoSubtitulo}>Seu saldo de aprendizado</Text>
        </View>
        {/* Um badge simulado */}
        <View style={estilos.badge}>
          <Text style={estilos.textoBadge}>PRO</Text>
        </View>
      </View>

      {/* 2. AREA DOS CARDS (flexDirection: row com gap) */}
      <View style={estilos.areaCards}>
        {/* Card 01 */}
        <View style={[estilos.card, { backgroundColor: '#10B981' }]}>
          <Text style={estilos.tituloCard}>Aulas</Text>
          <Text style={estilos.valorCard}>04 completas</Text>
        </View>

        {/* Card 02 */}
        <View style={[estilos.card, { backgroundColor: '#3B82F6' }]}>
          <Text style={estilos.tituloCard}>Desafios</Text>
          <Text style={estilos.valorCard}>100% concluídos</Text>
        </View>
      </View>

      {/* 3. PAINEL DE TRANSAÇÕES (flex: 1 para ocupar o restante da tela) */}
      <View style={estilos.painelCentral}>
        <Text style={estilos.tituloPainel}>Próximas Atividades</Text>
        
        <View style={estilos.listaItens}>
          <View style={estilos.itemAtividade}>
            <Text style={estilos.textoAtividade}>🚀 Flexbox e Alinhamento</Text>
            <Text style={estilos.statusAtividade}>Hoje</Text>
          </View>
          
          <View style={estilos.itemAtividade}>
            <Text style={estilos.textoAtividade}>💾 Gerenciamento de Estados</Text>
            <Text style={estilos.statusAtividade}>Semana 05</Text>
          </View>

          <View style={estilos.itemAtividade}>
            <Text style={estilos.textoAtividade}>🎯 App de Lista de Tarefas</Text>
            <Text style={estilos.statusAtividade}>Semana 08</Text>
          </View>
        </View>
      </View>

      {/* 4. RODAPÉ FIXO */}
      <View style={estilos.rodape}>
        <TouchableOpacity style={estilos.botaoRodape}>
          <Text style={estilos.textoBotaoRodape}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.botaoRodape}>
          <Text style={estilos.textoBotaoRodape}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.botaoRodape}>
          <Text style={estilos.textoBotaoRodape}>Ajustes</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const estilos = StyleSheet.create({
  telaPrincipal: {
    flex: 1, // Preenche a tela inteira verticalmente
    backgroundColor: '#0F172A', // Fundo escuro elegante
    paddingTop: 50, // Evita a barra de status do celular
  },
  cabecalho: {
    flexDirection: 'row', // Alinha saudação e badge lado a lado
    justifyContent: 'space-between', // Joga um para cada lado da tela
    alignItems: 'center', // Centraliza os dois no sentido vertical
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  textoSaudacao: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  textoSubtitulo: {
    color: '#94A3B8',
    fontSize: 14,
  },
  badge: {
    backgroundColor: '#F59E0B',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  textoBadge: {
    color: '#0F172A',
    fontWeight: 'bold',
    fontSize: 12,
  },
  areaCards: {
    flexDirection: 'row', // Cards ficam lado a lado
    paddingHorizontal: 20,
    gap: 16, // Espaçamento perfeito entre os cards
    marginBottom: 24,
  },
  card: {
    flex: 1, // Faz os dois cards crescerem proporcionalmente dividindo o espaço meio a meio
    padding: 16,
    borderRadius: 16,
    height: 100,
    justifyContent: 'space-between', // Título no topo, Valor na base do card
  },
  tituloCard: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.8,
  },
  valorCard: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  painelCentral: {
    flex: 1, // Ocupa todo o espaço vertical restante entre os cards e o rodapé
    backgroundColor: '#1E293B',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
  },
  tituloPainel: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listaItens: {
    gap: 12, // Espaço automático de 12px entre os itens da lista
  },
  itemAtividade: {
    backgroundColor: '#0F172A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  textoAtividade: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '500',
  },
  statusAtividade: {
    color: '#3B82F6',
    fontSize: 12,
    fontWeight: 'bold',
  },
  rodape: {
    flexDirection: 'row', // Botões do menu lado a lado
    backgroundColor: '#1E293B',
    height: 70,
    borderTopWidth: 1,
    borderTopColor: '#334155',
    justifyContent: 'space-around', // Distribui os botões igualmente
    alignItems: 'center',
  },
  botaoRodape: {
    padding: 10,
  },
  textoBotaoRodape: {
    color: '#94A3B8',
    fontWeight: '600',
    fontSize: 14,
  },
});
```

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

Abra o seu projeto de testes no VS Code. Vamos criar um layout de **Cardápio de Comida Saudável (Healthy Food Grid)** aplicando tudo o que aprendemos:
1. O aplicativo deve ter um **contêiner principal** com `flex: 1` e fundo preto ou escuro.
2. Crie um **Header** simples com o título da sua hamburgueria ou restaurante.
3. No corpo principal, monte um **Grid de 4 Pratos / Hamburgueres** usando Views empilhadas.
   - *Dica:* Crie duas linhas principais (`flexDirection: 'row'`). Dentro de cada linha, adicione dois cards (`flex: 1` para cada).
   - Use a propriedade `gap` nas Views mães para afastar os cards de forma elegante.
4. Cada Card deve conter:
   - Uma imagem redonda do prato (use imagens da internet com `<Image>`).
   - O Nome do prato em negrito.
   - O Valor do prato destacado em verde.
5. Crie um **Footer** fixo com um botão gigante `<TouchableOpacity>` chamado "Ver Carrinho de Compras".

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] A tela principal ocupa o espaço total disponível (`flex: 1`).
- [ ] Foram utilizadas estruturas com `flexDirection: 'row'` para colocar elementos lado a lado.
- [ ] O espaçamento dos cards foi feito utilizando a propriedade `gap` ao invés de margens manuais repetidas.
- [ ] A distribuição de espaço na tela foi organizada através de proporções dinâmicas de `flex`.
- [ ] O layout responde bem e não corta os cards em celulares menores ou simuladores.

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Assuma o controle e torne o seu app ainda mais dinâmico e polido:
- **Wrap Dinâmico:** Experimente colocar 4 ou 5 cards pequenos dentro de uma única View com `flexDirection: 'row'` e adicione a propriedade **`flexWrap: 'wrap'`**. Olhe para a tela e veja como os cards que não cabem na horizontal quebram para a próxima linha automaticamente!
- **Diferencial de Interação:** Adicione um pequeno botão de "Adicionar" (pode ser apenas o caractere `+`) no canto superior de cada card de comida e estilize-o de forma redonda com fundo colorido usando absolute positioning (`position: 'absolute'`).
- **Navegação visual:** Mude a cor do botão ativo no menu do rodapé (ex: se o aluno está na tela "Início", faça esse texto ficar azul ou verde brilhante, e as outras abas ficarem cinza escuro).
