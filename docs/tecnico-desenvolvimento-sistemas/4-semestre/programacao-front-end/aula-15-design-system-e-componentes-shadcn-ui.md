---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-front-end-aula-15-design-system-e-componentes-shadcn-ui
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-front-end/aula-15-design-system-e-componentes-shadcn-ui
sidebar_position: 15
title: "Aula 15 — Design Systems e Componentes Visuais com Shadcn/UI"
description: Integre componentes modernos, acessíveis e altamente customizáveis baseados em Tailwind CSS e Radix UI.
---

# Aula 15 — Design Systems e Componentes Visuais com Shadcn/UI

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender o conceito e a importância dos **Design Systems** no desenvolvimento front-end moderno, entender a evolução de bibliotecas monolíticas (como Bootstrap) para componentes *headless* acessíveis e dominar a utilização do padrão **Shadcn/UI** e **Radix UI** para compor interfaces de padrão internacional.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O que é um Design System e tokens de design (cores, raios de borda, tipografia).
- O problema das bibliotecas de UI clássicas: dependência pesada de pacotes externos no `node_modules` que limitam customizações.
- A filosofia do **Shadcn/UI**: componentes que você copia para dentro da sua própria pasta `src/components/ui/` e possui controle total sobre o código-fonte.
- Componentes essenciais de alta complexidade: Modais/Diálogos (`Dialog`), Menus suspensos (`DropdownMenu`), Abas (`Tabs`) e Etiquetas (`Badge`).
- Garantia de conformidade com padrões de acessibilidade WAI-ARIA.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

No passado, os desenvolvedores instalavam bibliotecas de componentes inteiras (`npm install @material-ui/core`). Quando o cliente pedia para mudar a animação de um botão ou o espaçamento de um modal, era quase impossível sobrescrever os estilos internos.

O **Shadcn/UI** revolucionou esse paradigma:
1. Ele não é uma dependência que fica trancada no `node_modules`.
2. É uma coleção de componentes em React e Tailwind que você **adiciona diretamente ao seu código-fonte**.
3. Por baixo dos panos, utiliza as primitivas do **Radix UI**, que cuidam de todo o comportamento difícil de acessibilidade (foco por teclado, tecla ESC para fechar, anúncios de leitor de tela).

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja a estrutura de um componente de Diálogo Modal customizado com Tailwind CSS e acessibilidade:

```jsx
// src/components/ModalConfirmacao.jsx
export function ModalConfirmacao({ aberto, titulo, descricao, aoConfirmar, aoFechar }) {
  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          {titulo}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {descricao}
        </p>

        <div className="flex justify-end space-x-3 pt-2">
          <button 
            type="button" 
            onClick={aoFechar}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
          >
            Cancelar
          </button>
          <button 
            type="button" 
            onClick={aoConfirmar}
            className="px-4 py-2 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition"
          >
            Sim, Excluir Registro
          </button>
        </div>
      </div>
    </div>
  );
}
```

Utilizando o modal na interface:

```jsx
// src/pages/GestaoAlunos.jsx
import { useState } from 'react';
import { ModalConfirmacao } from '../components/ModalConfirmacao';

export function GestaoAlunos() {
  const [modalAberto, setModalAberto] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);

  function solicitarExclusao(aluno) {
    setAlunoSelecionado(aluno);
    setModalAberto(true);
  }

  function confirmarExclusao() {
    console.log(`Excluindo aluno: ${alunoSelecionado?.nome}`);
    setModalAberto(false);
  }

  return (
    <div className="p-6">
      <button 
        onClick={() => solicitarExclusao({ id: 1, nome: 'Matheus Lima' })}
        className="px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg text-sm font-semibold transition"
      >
        Excluir Estudante
      </button>

      <ModalConfirmacao 
        aberto={modalAberto}
        titulo="Tem certeza absoluta?"
        descricao={`Esta ação não pode ser desfeita. O cadastro de ${alunoSelecionado?.nome} será apagado permanentemente.`}
        aoConfirmar={confirmarExclusao}
        aoFechar={() => setModalAberto(false)}
      />
    </div>
  );
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Construa um conjunto de componentes visuais baseados em Tailwind CSS para o seu sistema:
   - `<Badge variante="sucesso | perigo | alerta">`: Etiquetas arredondadas.
   - `<Card>`: Com cabeçalho, corpo e rodapé.
   - `<ModalConfirmacao>`: Com fundo translúcido escurecido (*backdrop blur*).
2. Substitua os botões e alertas nativos do navegador da sua aplicação pelos novos componentes do seu Design System.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Componentes desacoplados de regras de negócio específicas.
- [ ] Uso de classes do Tailwind para espaçamento, sombras e cantos arredondados.
- [ ] Efeito de desfoque translúcido no fundo do modal (`backdrop-blur-sm`).
- [ ] Fechamento do modal ao clicar em Cancelar ou no fundo escuro.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione um ouvinte para que pressionar a tecla `Escape` feche automaticamente qualquer modal aberto na tela!
