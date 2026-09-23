---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-front-end-aula-19-otimizacao-de-performance-e-build
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-front-end/aula-19-otimizacao-de-performance-e-build
sidebar_position: 19
title: "Aula 19 — Otimização de Performance e Build"
description: Reduza drasticamente o tamanho do bundle JavaScript da sua SPA com divisão de código (Code Splitting) e React.lazy.
---

# Aula 19 — Otimização de Performance e Build

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a auditar e otimizar a performance de aplicações React de grande porte, aplicando técnicas de divisão de código (**Code Splitting**) e carregamento sob demanda (**Lazy Loading**) com `React.lazy()` e `<Suspense />`, analisando o impacto no tamanho do bundle gerado pelo Vite e reduzindo o tempo de carregamento inicial (*First Contentful Paint*).

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O problema do Bundle Monolítico: por que carregar telas de administração para usuários comuns consome banda desnecessária.
- O conceito de **Code Splitting** (divisão de código em pedaços menores / *chunks*).
- As APIs nativas do React: `React.lazy()` e o componente `<Suspense fallback={<Loading />} />`.
- Lazy Loading de páginas no React Router DOM.
- Otimização de imagens e ícones SVG.
- Auditoria de bundle com `rollup-plugin-visualizer`.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Sem otimização, o Vite gera um único arquivo gigante `index.js` contendo todas as páginas da sua aplicação. Um usuário que entra apenas para ver a Home é forçado a baixar o código do painel financeiro, relatórios gráficos e configurações!

Com **Code Splitting por Rotas**:

```text
Entrada na Home ──> Baixa apenas: home.js (40 KB)
         │
         │ (Usuário navega para /dashboard)
         ▼
Navegador baixa sob demanda: dashboard.js (80 KB)
```

O tempo de carregamento da primeira tela cai pela metade!

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como aplicar `React.lazy` no seu arquivo de rotas:

```jsx
// src/routes.jsx
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './components/RootLayout';

// Componente simples de fallback enquanto o chunk é baixado
function IndicadorCarregamento() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
      <p style={{ color: '#2563eb', fontWeight: 'bold' }}>Carregando módulo...</p>
    </div>
  );
}

// 1. IMPORTAÇÃO DINÂMICA SOB DEMANDA COM React.lazy
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const Relatorios = lazy(() => import('./pages/Relatorios').then(m => ({ default: m.Relatorios })));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<IndicadorCarregamento />}>
            <Home />
          </Suspense>
        )
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<IndicadorCarregamento />}>
            <Dashboard />
          </Suspense>
        )
      },
      {
        path: 'relatorios',
        element: (
          <Suspense fallback={<IndicadorCarregamento />}>
            <Relatorios />
          </Suspense>
        )
      }
    ]
  }
]);
```

Ao executar o build de produção:

```bash
npm run build
```

Observe no terminal que o Vite agora gera múltiplos arquivos `chunks` separados na pasta `dist/assets/`, em vez de um único arquivo!

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Converta as rotas do seu projeto para utilizar `lazy()` e `<Suspense />`.
2. Crie um componente `<SkeletonPagina>` para ser exibido no `fallback` do Suspense durante a troca de abas.
3. Execute `npm run build` e analise o tamanho dos arquivos gerados.
4. Abra o DevTools na aba **Network**, marque a opção de velocidade de rede como "Fast 3G" e observe o download sob demanda dos arquivos JavaScript ao clicar em cada rota!

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Todas as rotas secundárias carregadas com `lazy()`.
- [ ] Envelopamento das rotas com o componente `<Suspense fallback={...}>`.
- [ ] Divisão dos chunks confirmada na saída do comando `npm run build`.
- [ ] Transições de rota sem travamentos de tela.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione o plugin `rollup-plugin-visualizer` no seu `vite.config.js` para gerar um mapa gráfico visual em formato de pizza (`stats.html`) mostrando quais bibliotecas estão ocupando mais espaço no seu bundle!
