---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-front-end-aula-09-graficos-e-desenho-com-html5-canvas
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-front-end/aula-09-graficos-e-desenho-com-html5-canvas
sidebar_position: 9
title: "Aula 09 — Gráficos e Desenho Interativo com HTML5 Canvas"
description: Explore a renderização gráfica bidimensional no navegador criando formas, linhas e gráficos com a Canvas API.
---

# Aula 09 — Gráficos e Desenho Interativo com HTML5 Canvas

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender o funcionamento da tag `<canvas>` do HTML5 e sua API de renderização 2D baseada em pixels, desenhando formas geométricas, caminhos (*paths*), arcos, textos estilizados e construindo um gráfico de barras dinâmico a partir de dados numéricos.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O elemento `<canvas>` e a diferença entre resolução interna (`width`/`height`) e tamanho CSS.
- O contexto de renderização bidimensional: `canvas.getContext('2d')`.
- O sistema de coordenadas cartesiano do Canvas (origem `0,0` no canto superior esquerdo).
- Métodos de desenho: `fillRect`, `strokeRect`, `clearRect`.
- Caminhos complexos: `beginPath()`, `moveTo()`, `lineTo()`, `arc()`, `stroke()` e `fill()`.
- Criação de um gráfico de barras responsivo com dados dinâmicos.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Enquanto o DOM comum desenha nós HTML vetoriais, o `<canvas>` funciona como uma **tela de pintura rasterizada**. Uma vez que um retângulo ou linha é desenhado, o navegador apenas memoriza os pixels coloridos:

```text
(0,0) ────────────── X positivo ──────────────>
  │
  │     [ Canvas 2D Coordinate System ]
  │
  Y positivo
  │
  ▼
```

### O Ciclo Básico de Desenho com Caminhos

```javascript
ctx.beginPath();           // 1. Inicia um novo caminho
ctx.moveTo(50, 50);        // 2. Posiciona a ponta da caneta sem riscar
ctx.lineTo(200, 50);       // 3. Traça uma linha até as coordenadas X, Y
ctx.strokeStyle = '#2563eb'; // 4. Define a cor do traço
ctx.lineWidth = 4;         // 5. Define a espessura da linha
ctx.stroke();              // 6. Efetivamente pinta o traço na tela
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como desenhar um gráfico de barras com JavaScript puro:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Gráficos com Canvas 2D</title>
  <style>
    canvas { border: 1px solid #cbd5e1; background: #f8fafc; border-radius: 8px; }
  </style>
</head>
<body>
  <h2>Vendas por Trimestre (R$ mil)</h2>
  <canvas id="meuGrafico" width="500" height="300"></canvas>

  <script>
    const canvas = document.querySelector('#meuGrafico');
    const ctx = canvas.getContext('2d');

    // Dados para desenhar
    const dados = [
      { rotulo: '1º Tri', valor: 80, cor: '#3b82f6' },
      { rotulo: '2º Tri', valor: 140, cor: '#10b981' },
      { rotulo: '3º Tri', valor: 110, cor: '#f59e0b' },
      { rotulo: '4º Tri', valor: 190, cor: '#8b5cf6' }
    ];

    const larguraBarra = 60;
    const espacamento = 40;
    const margemEsquerda = 50;
    const baseGrafico = 250;

    // Linha de base do chão do gráfico
    ctx.beginPath();
    ctx.moveTo(30, baseGrafico);
    ctx.lineTo(470, baseGrafico);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Desenhando as barras
    dados.forEach((item, index) => {
      const posX = margemEsquerda + index * (larguraBarra + espacamento);
      const posY = baseGrafico - item.valor;

      // Barra colorida
      ctx.fillStyle = item.cor;
      ctx.fillRect(posX, posY, larguraBarra, item.valor);

      // Texto com o valor no topo da barra
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`R$ ${item.valor}k`, posX + (larguraBarra / 2), posY - 8);

      // Rótulo abaixo da barra
      ctx.fillStyle = '#64748b';
      ctx.font = '12px sans-serif';
      ctx.fillText(item.rotulo, posX + (larguraBarra / 2), baseGrafico + 20);
    });
  </script>
</body>
</html>
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie uma página HTML com um elemento `<canvas width="600" height="400">`.
2. Implemente uma lousa de desenho livre (*Paint* simples):
   - Escute os eventos `mousedown`, `mousemove` e `mouseup`.
   - Enquanto o botão do mouse estiver pressionado, desenhe linhas contínuas seguindo o cursor do mouse.
3. Adicione botões com cores (Azul, Vermelho, Preto) e um botão "Limpar Lousa" usando `ctx.clearRect()`.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Canvas declarado com atributos `width` e `height` numéricos.
- [ ] Obtenção correta do contexto 2D com `.getContext('2d')`.
- [ ] Uso dos métodos de caminho (`beginPath`, `moveTo`, `lineTo`, `stroke`).
- [ ] Renderização de texto estilizado com `ctx.fillText`.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione suporte ao método `canvas.toDataURL()` com um botão "Salvar Imagem": ao clicar, gere uma imagem PNG do desenho e dispare o download no navegador do usuário!
