---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-front-end-aula-16-acessibilidade-wcag-e-seo-frontend
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-front-end/aula-16-acessibilidade-wcag-e-seo-frontend
sidebar_position: 16
title: "Aula 16 — Acessibilidade na Prática (WCAG) e SEO"
description: Torne suas aplicações web inclusivas para pessoas com deficiência e otimizadas para motores de busca com WCAG e SEO.
---

# Aula 16 — Acessibilidade na Prática (WCAG) e SEO

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender as diretrizes internacionais de acessibilidade para conteúdo web (**WCAG 2.1**), implementar navegação completa por teclado com foco visível, utilizar semântica HTML e atributos **WAI-ARIA** para suporte a leitores de tela e otimizar metadados para motores de busca (**SEO**) e compartilhamento em redes sociais.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Os quatro princípios da acessibilidade digital (WCAG): Perceptível, Operável, Compreensível e Robusto.
- Navegação exclusiva por teclado: a tecla `Tab`, a importância de `focus-visible` e o anel de foco (*Focus Ring*).
- Contraste de cores: garantindo proporção mínima de 4.5:1 para textos comuns.
- O que são atributos WAI-ARIA (`aria-label`, `aria-expanded`, `aria-hidden`, `role`).
- Otimização para mecanismos de busca (**SEO**) em SPAs: títulos dinâmicos de página e meta tags OpenGraph (`og:image`, `og:title`).

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Criar aplicações acessíveis não é apenas uma exigência legal e ética; melhora a experiência para **todos os usuários**, inclusive idosos ou pessoas com dificuldades temporárias de visão.

### Anti-Padrão Comum vs Padrão Acessível

```jsx
// ANTI-PADRÃO TERRÍVEL (Inacessível por teclado e leitor de tela):
<div onClick={fecharModal} className="fechar">X</div>

// PADRÃO ACESSÍVEL PROFISSIONAL:
<button 
  type="button" 
  onClick={fecharModal}
  aria-label="Fechar janela de diálogo"
  className="focus:ring-2 focus:ring-blue-500 rounded p-1"
>
  <span aria-hidden="true">✕</span>
</button>
```

No segundo exemplo:
- O leitor de tela lê em voz alta: *"Botão, Fechar janela de diálogo"*.
- Um usuário sem mouse consegue navegar até o botão usando a tecla `Tab` e ativá-lo com `Enter` ou `Espaço`!

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como criar um botão com foco acessível e atributos ARIA no Tailwind CSS:

```jsx
// src/components/BotaoMenuAcessivel.jsx
import { useState } from 'react';

export function BotaoMenuAcessivel() {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setAberto(!aberto)}
        aria-haspopup="true"
        aria-expanded={aberto}
        aria-label="Menu de opções do usuário"
        className="inline-flex items-center px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg 
                   hover:bg-slate-700 
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
      >
        <span>Opções</span>
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {aberto && (
        <div 
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 border border-slate-200 dark:border-slate-700 focus:outline-none"
        >
          <a href="#perfil" role="menuitem" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
            Meu Perfil
          </a>
          <a href="#sair" role="menuitem" className="block px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950">
            Encerrar Sessão
          </a>
        </div>
      )}
    </div>
  );
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Abra a extensão **Lighthouse** no Google Chrome DevTools (aba Lighthouse > categoria *Accessibility*).
2. Execute a auditoria na sua aplicação SPA e anote a nota inicial obtida (de 0 a 100).
3. Corrija os apontamentos reportados pelo Lighthouse:
   - Adicione textos alternativos `alt="..."` descritivos em todas as tags `<img>`.
   - Adicione `aria-label` em botões que só possuem ícones gráficos.
   - Corrija problemas de contraste em textos cinzas claros.
4. Execute novamente a auditoria e atinja uma pontuação de **100% de Acessibilidade**!

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Todas as imagens possuem o atributo `alt` preenchido.
- [ ] O anel de foco (`focus-visible`) é visível ao navegar exclusivamente com a tecla `Tab`.
- [ ] Atributos `aria-label` e `aria-expanded` utilizados em menus e botões interativos.
- [ ] Relatório do Lighthouse atingindo índice de acessibilidade superior a 90%.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Navegue por toda a sua aplicação usando **apenas o teclado**, sem encostar as mãos no mouse ou touchpad! Se você conseguir preencher formulários, abrir modais e navegar entre as páginas, sua aplicação está verdadeiramente acessível!
