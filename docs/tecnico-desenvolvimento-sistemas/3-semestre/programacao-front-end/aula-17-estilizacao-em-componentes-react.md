---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-front-end-aula-17-estilizacao-em-componentes-react
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-front-end/aula-17-estilizacao-em-componentes-react
sidebar_position: 17
title: "Aula 17 — Estilização em Componentes React"
description: Explore abordagens modernas de estilo no ecossistema React, desde CSS Modules isolados até utilitários com Tailwind CSS.
---

# Aula 17 — Estilização em Componentes React

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Comparar as principais abordagens de estilização no ecossistema React, entender o problema de conflito de classes globais e dominar o uso de **CSS Modules** para escopo local e os fundamentos da abordagem *Utility-First* com o **Tailwind CSS**.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O problema do CSS tradicional: colisões de nomes de classes globais em projetos grandes.
- **CSS Modules** nativos do Vite (`Componente.module.css`) e escopo isolado por hash.
- Estilos inline condicionais com `style={{ ... }}`: vantagens e limitações.
- Introdução ao conceito de classes utilitárias e o ecossistema **Tailwind CSS**.
- Aplicação de classes dinâmicas e condicionais baseadas no estado do componente.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Quando importamos um arquivo `.css` normal no React (`import './estilos.css'`), suas regras se tornam **globais**. Se dois componentes criarem uma classe `.titulo`, o último que carregar sobrescreverá o primeiro!

### A Solução dos CSS Modules

O Vite suporta CSS Modules nativamente sem precisar de nenhuma configuração extra. Basta nomear o arquivo como `Nome.module.css`:

```text
Arquivo: Card.module.css
.container { background: #fff; }

        │ Vite compila e gera um hash único
        ▼
HTML Gerado:
<div class="_container_3x8a1_1">...</div>
```

Dessa forma, a classe `.container` nunca colidirá com a classe `.container` de outro componente!

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como utilizar CSS Modules em um componente Card:

```css
/* src/components/CardAluno.module.css */
.card {
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
}

.titulo {
  color: #1e293b;
  font-size: 1.25rem;
  margin-bottom: 8px;
}

.aprovado {
  color: #16a34a;
  font-weight: bold;
}

.reprovado {
  color: #dc2626;
  font-weight: bold;
}
```

```jsx
// src/components/CardAluno.jsx
import styles from './CardAluno.module.css';

export function CardAluno({ nome, nota }) {
  const estaAprovado = nota >= 6.0;

  return (
    <div className={styles.card}>
      <h3 className={styles.titulo}>{nome}</h3>
      <p>Nota Final: <strong>{nota.toFixed(1)}</strong></p>
      
      {/* Classe CSS dinâmica combinada com template string */}
      <span className={estaAprovado ? styles.aprovado : styles.reprovado}>
        {estaAprovado ? 'Aprovado ✅' : 'Em Recuperação ⚠️'}
      </span>
    </div>
  );
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie um componente `<Alerta>` com seu respectivo `Alerta.module.css`.
2. Crie variações de estilo no CSS Module para os tipos:
   - `.sucesso`: Fundo verde claro e texto verde escuro.
   - `.perigo`: Fundo vermelho claro e texto vermelho escuro.
   - `.info`: Fundo azul claro e texto azul escuro.
3. Receba as props `tipo` e `mensagem` e aplique dinamicamente a classe correspondente.
4. Renderize três alertas no `App.jsx` para validar o isolamento dos estilos.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Arquivo de estilo nomeado estritamente com a extensão `.module.css`.
- [ ] Importação de estilos como objeto (`import styles from './...'`).
- [ ] Aplicação de classes via `styles.nomeDaClasse`.
- [ ] Aplicação de estilos condicionais com base nas props ou no estado.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Experimente a biblioteca utilitária `clsx` (`npm install clsx`) para combinar múltiplas classes condicionais de forma ainda mais limpa e elegante!
