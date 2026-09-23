---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-front-end-aula-18-arquitetura-e-organizacao-de-pastas-react
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-front-end/aula-18-arquitetura-e-organizacao-de-pastas-react
sidebar_position: 18
title: "Aula 18 — Arquitetura e Organização de Pastas em React"
description: Estruture projetos profissionais escaláveis separando componentes apresentacionais de componentes com estado e lógica de negócio.
---

# Aula 18 — Arquitetura e Organização de Pastas em React

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a estruturar e modularizar aplicações React de médio e grande porte, adotando padrões de arquitetura de diretórios reconhecidos pela indústria, separando componentes visuais (*Presentational/Dumb Components*) de componentes lógicos (*Smart/Container Components*) e organizando utilitários e constantes.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O padrão de estrutura de diretórios em projetos front-end modernos.
- Organização da pasta `src/`: `components/`, `pages/`, `assets/`, `utils/`, `services/`.
- Componentes Inteligentes (*Containers / Smart*) vs Componentes Visuais (*Presentational / Dumb*).
- Boas práticas de nomenclatura de arquivos e exportações limpas com `index.js`.
- Isolamento de regras de formatação e validações na pasta `utils/`.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Uma das grandes causas do "código espaguete" no React é misturar lógica pesada de cálculo, requisições de rede e chamadas de API dentro de botões e cards visuais.

### Arquitetura de Diretórios Recomendada

```text
meu-projeto/
├── public/              # Arquivos públicos e estáticos (favicon, manifest)
└── src/
    ├── assets/          # Imagens, logos, fontes e vetores SVG locais
    ├── components/      # Componentes reutilizáveis e visuais
    │   ├── Button/      # Pasta por componente com JSX e CSS Module
    │   │   ├── Button.jsx
    │   │   └── Button.module.css
    │   └── Header/
    ├── pages/           # Telas completas da aplicação (Home, Login, Dashboard)
    ├── services/        # Configuração de clientes HTTP (fetch, axios)
    ├── utils/           # Funções auxiliares puras (formatação de moeda, datas)
    ├── App.jsx          # Montagem principal da aplicação
    └── main.jsx         # Ponto de entrada do React DOM
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como isolar utilitários de formatação para manter os componentes enxutos:

```javascript
// src/utils/formatadores.js
export function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
}

export function formatarDataBrasileira(dataISO) {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(dataISO));
}
```

```jsx
// src/components/ExtratoItem/ExtratoItem.jsx
import { formatarMoeda, formatarDataBrasileira } from '../../utils/formatadores';

export function ExtratoItem({ descricao, valor, data, tipo }) {
  const ehEntrada = tipo === 'entrada';

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
      <div>
        <strong>{descricao}</strong><br />
        <small style={{ color: '#888' }}>{formatarDataBrasileira(data)}</small>
      </div>
      <span style={{ color: ehEntrada ? '#16a34a' : '#dc2626', fontWeight: 'bold' }}>
        {ehEntrada ? '+' : '-'} {formatarMoeda(valor)}
      </span>
    </div>
  );
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. No seu projeto React com Vite, reestruture a árvore de arquivos criando as pastas `src/components`, `src/utils` e `src/assets`.
2. Mova todas as funções puras de formatação (como máscaras de CPF, CEP ou moeda) para `src/utils/formatadores.js`.
3. Organize cada componente em sua respectiva subpasta dentro de `src/components/`, acompanhado de seu arquivo de estilo.
4. Atualize os caminhos de importação no `App.jsx` e garanta que o projeto continue compilando sem erros (`npm run dev`).

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Árvore de diretórios estruturada conforme o padrão profissional (`components`, `utils`, `assets`).
- [ ] Separação clara entre lógica pura (JS) e componentes visuais (JSX).
- [ ] Imports limpos e sem caminhos quebrados.
- [ ] Nenhuma dependência circular entre pastas.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Configure um **Path Alias** no arquivo `vite.config.js` (como `@/components` e `@/utils`) para não precisar usar caminhos relativos longos como `../../components`!
