---
id: "tecnico-desenvolvimento-sistemas-3-semestre-programacao-para-dispositivos-moveis-aula-05-gerenciamento-de-estado-local"
slug: "/tecnico-desenvolvimento-sistemas/3-semestre/programacao-para-dispositivos-moveis/aula-05-gerenciamento-de-estado-local"
sidebar_position: 5
title: "Aula 05 — Gerenciamento de Estado Local"
description: "Aula 05 do curso de Programação para Dispositivos Móveis - Reatividade e Estados com useState"
---

# Aula 05 — Gerenciamento de Estado Local

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender o conceito de **reatividade** no React Native e dominar a utilização do Hook **`useState`** para armazenar e atualizar dados dinamicamente, fazendo com que a tela do aplicativo se modifique instantaneamente com base nas interações do usuário.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Variáveis normais vs Variáveis de Estado (Reativas).
- A anatomia do Hook **`useState`** do React.
- O ciclo de renderização (re-render) e atualização automática da interface.
- Manipulação de estados através de ações de cliques (`onPress`).
- Estilização condicional dinâmica com base no valor de um estado.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### O Problema do JavaScript Tradicional
Imagine que você crie uma variável normal no seu código:
```javascript
let curtidas = 0;

function curtir() {
  curtidas = curtidas + 1;
  console.log(curtidas); // Exibe no terminal o valor atualizado (1, 2, 3...)
}
```
Se você associar essa variável a um texto `<Text>{curtidas}</Text>` e criar um botão que chama a função `curtir`, você perceberá algo muito frustrante: **a variável muda nos bastidores, mas o número na tela do celular continua sendo 0!**

Isso acontece porque o React Native precisa de um sinal oficial para redesenhar a tela. Variáveis tradicionais são ignoradas pela interface. Para resolver isso, usamos o **Estado (State)**!

### O que é o Estado?
O Estado é uma caixa de memória especial do React. Sempre que o valor armazenado nessa caixa de memória é alterado, o React automaticamente faz um **re-render (redesenho)** do componente na tela do usuário, aplicando a mudança instantaneamente.

### A Anatomia do `useState`
Para usar o estado, primeiro importamos o Hook `useState` do React e depois o declaramos dentro da nossa função assim:

```javascript
const [valor, setValor] = useState(valorInicial);
```

Vamos dissecar essa linha que parece confusa, mas é muito simples:
1.  **`valor`**: A variável que guarda o dado atual (ex: `0`, `""`, `true`). Você pode lê-la em qualquer lugar do seu layout.
2.  **`setValor`**: A **função modificadora**. É a **única** forma permitida de alterar o valor. Você nunca deve fazer `valor = 10` diretamente; você precisa fazer `setValor(10)`. Ao usar esta função, você aciona o redesenho da tela.
3.  **`useState(valorInicial)`**: Onde definimos como o nosso estado começará quando o aplicativo abrir pela primeira vez.

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Abra o seu `App.js` e substitua o código pelo **Super Contador Reativo com Estilos Condicionais**. Note como a cor de fundo do display muda automaticamente no StyleSheet dependendo se o número é positivo, negativo ou neutro:

```javascript
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  // Criamos o estado "contador" iniciando em 0
  const [contador, setContador] = useState(0);

  // Funções de alteração do estado
  const incrementar = () => setContador(contador + 1);
  const decrementar = () => setContador(contador - 1);
  const resetar = () => setContador(0);

  // Função para decidir a cor do display dinamicamente
  const obterCorDisplay = () => {
    if (contador > 0) return '#10B981'; // Verde para positivo
    if (contador < 0) return '#EF4444'; // Vermelho para negativo
    return '#64748B'; // Cinza para zero
  };

  return (
    <View style={estilos.telaGeral}>
      <Text style={estilos.titulo}>Contador Reativo</Text>
      <Text style={estilos.subtitulo}>A tela atualiza automaticamente usando useState</Text>

      {/* Display centralizado que altera a cor de fundo dinamicamente inline */}
      <View style={[estilos.display, { borderColor: obterCorDisplay() }]}>
        <Text style={[estilos.textoDisplay, { color: obterCorDisplay() }]}>
          {contador}
        </Text>
      </View>

      {/* Área dos Botões de Ação */}
      <View style={estilos.areaBotoes}>
        {/* Botão de Menos */}
        <TouchableOpacity style={estilos.botao} onPress={decrementar}>
          <Text style={estilos.textoBotao}>-</Text>
        </TouchableOpacity>

        {/* Botão de Reset */}
        <TouchableOpacity style={[estilos.botao, estilos.botaoReset]} onPress={resetar}>
          <Text style={estilos.textoBotaoReset}>Reset</Text>
        </TouchableOpacity>

        {/* Botão de Mais */}
        <TouchableOpacity style={estilos.botao} onPress={incrementar}>
          <Text style={estilos.textoBotao}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  telaGeral: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 40,
    textAlign: 'center',
  },
  display: {
    width: 180,
    height: 180,
    borderRadius: 90, // Perfeitamente redondo
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: '#1E293B',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  textoDisplay: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  areaBotoes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  botao: {
    width: 65,
    height: 65,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  botaoReset: {
    paddingHorizontal: 24,
    height: 65,
    width: 'auto',
    borderRadius: 20,
    backgroundColor: '#1E293B',
    borderColor: '#334155',
    borderWidth: 1,
    justifyContent: 'center',
  },
  textoBotaoReset: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
```

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

Abra o seu aplicativo escolar `meu-primeiro-app` no VS Code. Vamos criar um **Controlador de Consumo de Água (Water Intake Tracker)** reativo e motivacional!
1. O aplicativo deve iniciar exibindo o total de água consumido no dia. O estado inicial deve ser **`0`** (mililitros).
2. Adicione uma imagem divertida de copo ou gota d'água no centro da tela.
3. Adicione **três botões personalizados** usando `<TouchableOpacity>`:
   - **Copinho (+250 ml)**: Incrementa 250ml ao estado.
   - **Garrafinha (+500 ml)**: Incrementa 500ml ao estado.
   - **Limpar / Reiniciar**: Reseta o contador para 0ml.
4. Exiba uma **Mensagem Motivacional** dinâmica baseada no consumo atual utilizando condições na renderização:
   - Se o consumo for **menor que 1000 ml**: exiba *"Beba mais água! O seu corpo precisa de hidratação! 💧"*.
   - Se o consumo estiver **entre 1000 ml e 1999 ml**: exiba *"Ótimo progresso! Você está no caminho certo! 🥤"*.
   - Se o consumo for **2000 ml ou mais**: exiba *"Meta atingida! Parabéns! Você está super hidratado hoje! 🎉🥳"*.
5. Estilize tudo com cores harmônicas e sofisticadas (ex: variações de azul-celeste e azul-marinho).

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O arquivo importa corretamente o Hook `{ useState }` do `'react'`.
- [ ] O aplicativo inicializa o estado de ml em 0.
- [ ] Os botões de +250ml, +500ml e reset atualizam o estado da tela corretamente através das funções modificadoras do useState.
- [ ] As mensagens motivacionais mudam dinamicamente na tela sem travar ou exigir recarregamento.
- [ ] O design é limpo, legível e responsivo, sem sobrepor os botões.

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Vá além e desafie-se com recursos avançados:
- **Meta Customizada:** Permita que o próprio usuário digite qual é a sua meta de água diária! Crie um `<TextInput>` para receber essa meta em texto, salve-o em outro estado e substitua o valor fixo de 2000ml da condição pela meta digitada pelo usuário.
- **Alertas Sonoros / Visuais:** Quando o usuário atingir a meta digitada ou ultrapassar os 2000ml pela primeira vez no dia, dispare um alerta pop-up usando `Alert.alert('Parabéns!', 'Você atingiu sua meta de hidratação!')`.
- **Animações de Escala:** Pesquise ou imagine como você faria para o copo de água crescer levemente de tamanho na tela conforme o progresso do usuário aumenta, adicionando um dinamismo visual interativo de progresso.

