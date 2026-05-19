---
id: "tecnico-desenvolvimento-sistemas-3-semestre-programacao-para-dispositivos-moveis-aula-15-componentes-reutilizaveis-customizados"
slug: "/tecnico-desenvolvimento-sistemas/3-semestre/programacao-para-dispositivos-moveis/aula-15-componentes-reutilizaveis-customizados"
sidebar_position: 15
title: "Aula 15 — Componentes Reutilizáveis Customizados"
description: "Aula 15 do curso de Programação para Dispositivos Móveis - Criando componentes com props dinâmicas no React Native"
---

# Aula 15 — Componentes Reutilizáveis Customizados

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender as boas práticas de modularização de código em projetos React Native e aprender a projetar, construir e instanciar seus próprios componentes customizados reutilizáveis alimentados por propriedades (**`props`**) dinâmicas.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O princípio de engenharia de software "Don't Repeat Yourself" (DRY).
- Como declarar funções secundárias para gerar novas tags JSX.
- A anatomia e fluxo de dados unidirecional através das **`props`**.
- Passando dados de texto, estilo, cores e ações (*callbacks* com `onPress`).
- Mesclando estilos fixos com estilos customizados dinâmicos.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

Imagine que você está criando uma tela de configurações que possui 10 botões. Todos eles têm exatamente as mesmas bordas, sombras e tamanhos, mudando apenas o texto e a cor de fundo. 

Fazer o clássico "copiar e colar" do código do botão 10 vezes aumentaria o arquivo `App.js` em centenas de linhas repetidas à toa. E pior: se o designer pedir para arredondar mais as bordas dos botões, você terá que alterar o código manual em 10 lugares diferentes.

A solução profissional da engenharia de software é aplicar o princípio **DRY (Don't Repeat Yourself - Não se Repita)**. Nós isolamos a lógica e o estilo do botão em um único componente customizado e o instanciamos passando as diferenças "por parâmetro".

### O que são Props?
Em React, **`props`** (abreviação de *properties* - propriedades) são argumentos que passamos para os nossos componentes customizados, funcionando de maneira parecida com os atributos das tags nativas (como a propriedade `source` da `<Image>`).

#### Exemplo de criação de um componente personalizado:

```javascript
// Criamos o componente customizado recebendo as propriedades por desestruturação
function MeuBotao({ titulo, corFundo, aoPressionar }) {
  return (
    <TouchableOpacity 
      style={[estilos.botaoPadrao, { backgroundColor: corFundo }]} // Mescla estilo fixo com a cor dinâmica
      onPress={aoPressionar}
    >
      <Text style={estilos.textoBotao}>{titulo}</Text>
    </TouchableOpacity>
  );
}
```

#### Como instanciá-lo na tela:

```javascript
// Agora podemos chamar nosso componente MeuBotao como se fosse uma tag nativa!
<MeuBotao 
  titulo="Confirmar Compra" 
  corFundo="#10B981" 
  aoPressionar={() => Alert.alert('Sucesso', 'Comprado!')} 
/>

<MeuBotao 
  titulo="Cancelar" 
  corFundo="#EF4444" 
  aoPressionar={() => console.log('Cancelado')} 
/>
```

> [!IMPORTANT]
> **Fluxo Unidirecional de Dados:** Lembre-se que em React, as props são **estritamente somente leitura (read-only)**. Um componente filho nunca pode alterar o valor de uma propriedade recebida diretamente. Os dados sempre descem do pai para o filho de forma limpa.

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Substitua todo o conteúdo do seu `App.js` por esta **Carteira Financeira (Wallet Hub)**. Note como criamos dois componentes customizados e reutilizáveis altamente inteligentes logo acima e os utilizamos de forma limpa no aplicativo principal:

```javascript
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

// =========================================================
// COMPONENTE CUSTOMIZADO 1: CARD DE SALDO (CardFinanceiro)
// =========================================================
function CardFinanceiro({ titulo, valor, tipo }) {
  // Escolhe a cor da borda lateral esquerda dependendo do tipo de movimentação
  const corLateral = tipo === 'receita' ? '#10B981' : '#EF4444';
  const icone = tipo === 'receita' ? '📈' : '📉';

  return (
    <View style={[estilos.card, { borderLeftColor: corLateral }]}>
      <View style={estilos.linhaCard}>
        <Text style={estilos.tituloCard}>{titulo}</Text>
        <Text style={estilos.iconeCard}>{icone}</Text>
      </View>
      <Text style={estilos.valorCard}>{valor}</Text>
    </View>
  );
}

// =========================================================
// COMPONENTE CUSTOMIZADO 2: BOTÃO GLOW DE AÇÃO (BotaoAcao)
// =========================================================
function BotaoAcao({ rotulo, cor, onPress }) {
  return (
    <TouchableOpacity 
      style={[estilos.botao, { backgroundColor: cor }]}
      onPress={onPress}
    >
      <Text style={estilos.textoBotao}>{rotulo}</Text>
    </TouchableOpacity>
  );
}

// =========================================================
// APLICATIVO PRINCIPAL
// =========================================================
export default function App() {
  const [saldo, setSaldo] = useState(2500);

  const depositar = () => {
    setSaldo(saldo + 500);
    Alert.alert('Transação', 'Depósito rápido de R$ 500,00 concluído!');
  };

  const sacar = () => {
    if (saldo < 200) {
      Alert.alert('Erro', 'Saldo insuficiente para saque de R$ 200,00!');
      return;
    }
    setSaldo(saldo - 200);
    Alert.alert('Transação', 'Saque rápido de R$ 200,00 efetuado!');
  };

  return (
    <View style={estilos.telaGeral}>
      <Text style={estilos.header}>Wallet Master 💳</Text>
      <Text style={estilos.subHeader}>Gerenciamento de ativos unificado</Text>

      {/* RENDERIZANDO CARDS CUSTOMIZADOS REUTILIZÁVEIS */}
      <View style={estilos.containerCards}>
        
        <CardFinanceiro 
          titulo="Saldo Atual em Conta" 
          valor={`R$ ${saldo.toFixed(2)}`} 
          tipo="receita" 
        />

        <CardFinanceiro 
          titulo="Despesas Agendadas" 
          valor="R$ 480,00" 
          tipo="despesa" 
        />

      </View>

      <Text style={estilos.secaoTitulo}>Ações Rápidas em Conta</Text>

      {/* RENDERIZANDO BOTÕES CUSTOMIZADOS REUTILIZÁVEIS COM FUNÇÕES DIFERENTES */}
      <View style={estilos.containerBotoes}>
        
        <BotaoAcao 
          rotulo="Receber Depósito (+500)" 
          cor="#10B981" 
          onPress={depositar} 
        />

        <BotaoAcao 
          rotulo="Efetuar Saque (-200)" 
          cor="#EF4444" 
          onPress={sacar} 
        />

        <BotaoAcao 
          rotulo="Consultar Efetivações" 
          cor="#3B82F6" 
          onPress={() => Alert.alert('Extrato', 'Sem movimentações pendentes de efetivação.')} 
        />

      </View>
    </View>
  );
}

// =========================================================
// ESTILOS UNIFICADOS
// =========================================================
const estilos = StyleSheet.create({
  telaGeral: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    color: '#F8FAFC',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeader: {
    color: '#94A3B8',
    fontSize: 14,
    marginBottom: 32,
  },
  containerCards: {
    gap: 16,
    marginBottom: 40,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 6, // Cria a borda grossa colorida na esquerda!
    borderWidth: 1,
    borderColor: '#334155',
  },
  linhaCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tituloCard: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: 'bold',
  },
  iconeCard: {
    fontSize: 18,
  },
  valorCard: {
    color: '#F8FAFC',
    fontSize: 24,
    fontWeight: 'bold',
  },
  secaoTitulo: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  containerBotoes: {
    gap: 12,
  },
  botao: {
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
```

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

Abra o seu aplicativo `meu-primeiro-app` no VS Code. Vamos criar um **Painel de Avaliação de Restaurante (Restaurant Review Dashboard)** modularizado:
1. No topo do seu arquivo `App.js`, crie **dois componentes customizados**:
   - **`ReviewCard`**: Um card que exibe o comentário sobre um restaurante. Ele deve receber as propriedades: `nomeRestaurante`, `comentario`, `nota` (um número de 1 a 5) e `categoria` (ex: "Japonesa", "Italiana").
     - **Lógica Dinâmica:** Se a nota recebida por propriedade for **igual ou maior que 4**, mostre dentro do card um pequeno selo em verde escrito "Recomendado 👍". Caso contrário, mostre um selo cinza ou amarelo escrito "Normal 😐".
   - **`FiltroBadge` (Botão de Categoria)**: Um pequeno botão arredondado (estilo pílula) para filtrar categorias de restaurantes. Deve receber: `titulo`, `ativo` (um booleano) e `onPress`.
     - **Estilo Dinâmico:** Se a propriedade `ativo` for **verdadeira**, pinte a pílula de azul/verde brilhante com texto branco. Se for **falsa**, deixe apenas o contorno cinza com fundo escuro.
2. Na função principal do seu `App.js`, instancie pelo menos 3 pílulas de filtro lado a lado e mostre uma lista de pelo menos 3 cards de avaliações de restaurantes utilizando os seus componentes customizados.

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Os dois componentes customizados (`ReviewCard` e `FiltroBadge`) estão declarados de forma legível com desestruturação de props.
- [ ] O componente `ReviewCard` exibe a avaliação de forma correta e calcula o selo dinâmico de recomendação reativamente.
- [ ] O componente `FiltroBadge` aplica estilizações de contorno e fundo diferentes dependendo da propriedade booleana `ativo`.
- [ ] A tela do aplicativo consome e exibe múltiplos exemplares dos componentes reutilizando a mesma estrutura base.
- [ ] O aplicativo roda perfeitamente sem erros de compilação ou loopings infinitos.

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Descubra mais recursos avançados de arquitetura de software:
- **A Propriedade Especial `children`:** Você sabia que pode criar componentes contêineres que servem para envelopar outros elementos? Crie um componente chamado `CaixaGlow` que renderiza uma View com bordas neon e receba a propriedade **`children`** no JSX. Tudo que for escrito dentro de `<CaixaGlow> ... </CaixaGlow>` será desenhado no meio do contêiner!
- **Propriedades Opcionais com Valores Padrão (Default Props):** No JavaScript moderno, você pode definir um valor padrão na própria desestruturação das propriedades (ex: `function Card({ tipo = 'receita' })`). Faça com que, se o usuário não passar a cor do botão, o componente adote uma cor cinza padrão automaticamente de forma defensiva!
- **Feedback Hárptico ou de Toque de Escrita:** Crie um componente de entrada de texto reutilizável `InputCustomizado` que recebe uma prop `icone` e monta uma caixa estilizada contendo um ícone interno e validação automática de dados.

