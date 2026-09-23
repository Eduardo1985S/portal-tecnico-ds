---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-front-end-aula-17-testes-automatizados-no-frontend
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-front-end/aula-17-testes-automatizados-no-frontend
sidebar_position: 17
title: "Aula 17 — Testes Automatizados no Front-End"
description: Escreva testes unitários e de integração confiáveis com Vitest e React Testing Library simulando o comportamento do usuário.
---

# Aula 17 — Testes Automatizados no Front-End

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender a importância dos testes automatizados no ciclo de vida de software (*CI/CD*), configurar o executor de testes moderno **Vitest** integrado ao Vite e dominar a biblioteca **React Testing Library (RTL)** para testar componentes pela ótica do usuário real, validando renderização, cliques e preenchimento de formulários.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- A pirâmide de testes no Front-End: Testes Unitários, Testes de Integração e Testes Fim a Fim (E2E).
- Por que o **Vitest** é muito mais rápido que o Jest no ecossistema Vite.
- A filosofia da **React Testing Library**: *"Quanto mais seus testes se assemelharem à forma como seu software é usado, mais confiança eles podem lhe dar"*.
- Métodos essenciais de consulta do objeto `screen`: `getByRole`, `getByText`, `getByLabelText`.
- Simulação de eventos do usuário com `fireEvent` e `userEvent`.
- Asserções de teste (*matchers*): `toBeInTheDocument()`, `toHaveTextContent()`, `toBeDisabled()`.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

No passado, os testes examinavam o estado interno do componente (`wrapper.state('contador') === 1`). Se você refatorasse o código trocando `useState` por outro hook, o teste quebrava mesmo que a tela continuasse funcionando perfeitamente!

A **React Testing Library** proíbe o acesso ao estado interno. Ela renderiza o componente em um navegador virtual simulado (**jsdom**) e você faz perguntas como um usuário faria:

```text
1. render(<Contador />);
2. "Encontre na tela o botão com texto 'Incrementar'" -> screen.getByRole('button', { name: /incrementar/i })
3. "Clique no botão" -> fireEvent.click(botao)
4. "O texto 'Total: 1' apareceu na tela?" -> expect(screen.getByText('Total: 1')).toBeInTheDocument()
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Configurando o ambiente de testes com Vitest:

```bash
# Instale o Vitest, jsdom e as bibliotecas de teste
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom
```

No arquivo `vite.config.js`, habilite o ambiente de teste:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js'
  }
});
```

Crie o arquivo de inicialização `src/test/setup.js`:

```javascript
import '@testing-library/jest-dom';
```

Agora veja o teste unitário do componente `<BotaoContador>`:

```jsx
// src/components/BotaoContador.jsx
import { useState } from 'react';

export function BotaoContador() {
  const [cliques, setCliques] = useState(0);

  return (
    <div>
      <p>Total de Cliques: {cliques}</p>
      <button onClick={() => setCliques(cliques + 1)}>
        Clique Aqui
      </button>
    </div>
  );
}
```

```jsx
// src/components/BotaoContador.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BotaoContador } from './BotaoContador';

describe('Componente BotaoContador', () => {
  it('deve iniciar exibindo 0 cliques', () => {
    render(<BotaoContador />);

    const textoContador = screen.getByText(/Total de Cliques: 0/i);
    expect(textoContador).toBeInTheDocument();
  });

  it('deve incrementar o valor na tela ao ser clicado pelo usuário', () => {
    render(<BotaoContador />);

    const botao = screen.getByRole('button', { name: /clique aqui/i });
    
    // Simula o clique do usuário
    fireEvent.click(botao);

    // Valida que o texto na tela mudou para 1
    expect(screen.getByText(/Total de Cliques: 1/i)).toBeInTheDocument();
  });
});
```

Para rodar os testes:

```bash
npx vitest run
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Configure o Vitest e o jsdom no seu projeto React.
2. Crie um teste para o componente `<CardCurso>` verificando se o título e a carga horária passados via props são exibidos corretamente na tela.
3. Crie um teste para o componente `<ModalConfirmacao>` garantindo que:
   - Se `aberto === false`, o modal não existe no documento.
   - Se `aberto === true`, o botão de confirmação está presente e dispara a função `aoConfirmar()` quando clicado.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Vitest executando com sucesso no terminal (`npx vitest run`).
- [ ] Uso dos seletores recomendados pela RTL (`getByRole`, `getByText`).
- [ ] Simulação de cliques com `fireEvent.click()`.
- [ ] Todos os testes passando com luz verde (*All tests passed*).

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione o script `"test": "vitest"` e `"test:ui": "vitest --ui"` no `package.json` para abrir a interface gráfica visual do Vitest no navegador!
