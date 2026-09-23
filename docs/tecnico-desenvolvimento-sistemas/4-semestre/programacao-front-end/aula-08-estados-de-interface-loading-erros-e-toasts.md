---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-front-end-aula-08-estados-de-interface-loading-erros-e-toasts
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-front-end/aula-08-estados-de-interface-loading-erros-e-toasts
sidebar_position: 8
title: "Aula 08 — Estados de Interface: Loading, Erros e Toasts"
description: Eleve a experiência do usuário implementando Skeleton Screens, spinners de carregamento e notificações flutuantes Toast.
---

# Aula 08 — Estados de Interface: Loading, Erros e Toasts

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Implementar uma experiência de usuário (UX) de nível profissional em aplicações web, gerenciando rigorosamente os estados de requisição assíncrona, eliminando telas em branco através de esqueletos visuais (*Skeleton Screens*), exibindo indicadores de progresso (*Spinners*) e emitindo notificações flutuantes (*Toast Notifications*) com feedback imediato para ações de sucesso ou falha.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Os quatro estados de uma requisição de dados: *Idle* (ocioso), *Loading* (carregando), *Success* (sucesso) e *Error* (erro).
- Por que Skeleton Screens superam spinners tradicionais em retenção de atenção e percepção de velocidade.
- Criação de animações de pulso para Skeleton Screens com CSS puro.
- Instalação e integração de bibliotecas modernas de Toast (como `react-hot-toast` ou `sonner`).
- Tratamento de mensagens de erro amigáveis para o usuário final sem exibir detalhes técnicos crus do banco.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Quando uma chamada de API demora 1 segundo, o usuário não pode ficar olhando para uma tela vazia sem saber se o sistema travou ou se está processando.

### O Efeito Skeleton Screen

Em vez de exibir um círculo girando no centro da tela, desenhamos blocos cinzas pulsantes que imitam exatamente o formato dos cards que estão por vir:

```text
Carregando Dados...                  Dados Carregados!
┌────────────────────────┐          ┌────────────────────────┐
│ [████████] (Avatar)    │          │ [ 👤 ] Ana Clara        │
│ [████████████████████] │  ─────>  │ Aluna do 3º Semestre   │
│ [████████████]         │          │ Média Geral: 9.5       │
└────────────────────────┘          └────────────────────────┘
  Skeleton com Pulse CSS                Interface Definitiva
```

Estudos de UX comprovam que o usuário percebe o carregamento até **40% mais rápido** quando vê um Skeleton Screen!

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como criar um Skeleton Screen e integrar notificações com `react-hot-toast`:

```bash
# Instale a biblioteca leve de toasts
npm install react-hot-toast
```

```jsx
// src/components/SkeletonCard.jsx
export function SkeletonCard() {
  return (
    <div style={{
      padding: '16px',
      background: '#f1f5f9',
      borderRadius: '8px',
      marginBottom: '12px',
      animation: 'pulse 1.5s infinite ease-in-out'
    }}>
      <div style={{ height: '20px', width: '60%', background: '#cbd5e1', borderRadius: '4px', marginBottom: '8px' }} />
      <div style={{ height: '14px', width: '40%', background: '#e2e8f0', borderRadius: '4px' }} />
    </div>
  );
}

// src/pages/FeedNoticias.jsx
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { SkeletonCard } from '../components/SkeletonCard';

export function FeedNoticias() {
  const [noticias, setNoticias] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Simula atraso de 2.5 segundos do servidor
    setTimeout(() => {
      setNoticias([
        { id: 1, titulo: 'Início das Inscrições para o Hackathon', data: '22/09' },
        { id: 2, titulo: 'Palestra de Inteligência Artificial na Sexta', data: '24/09' }
      ]);
      setCarregando(false);
      toast.success('Notícias atualizadas com sucesso!', { duration: 3000 });
    }, 2500);
  }, []);

  function handleCurtir() {
    toast('Curtido! ❤️', { icon: '👏' });
  }

  return (
    <div style={{ maxWidth: '500px', margin: '30px auto', fontFamily: 'sans-serif' }}>
      {/* Componente container onde os toasts flutuantes serão desenhados */}
      <Toaster position="top-right" />

      <h2>Últimas Notícias do Campus</h2>

      {carregando ? (
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      ) : (
        noticias.map(item => (
          <div key={item.id} style={{ border: '1px solid #e2e8f0', padding: '16px', borderRadius: '8px', marginBottom: '12px' }}>
            <h3>{item.titulo}</h3>
            <small style={{ color: '#64748b' }}>Publicado em: {item.data}</small><br /><br />
            <button onClick={handleCurtir}>Curtir Notícia</button>
          </div>
        ))
      )}
    </div>
  );
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Instale a biblioteca `react-hot-toast` no seu projeto.
2. Posicione o `<Toaster position="top-right" />` no componente raiz `App.jsx` ou `RootLayout.jsx`.
3. Integre os toasts nas operações da sua tela de CRUD:
   - Ao salvar um novo registro: `toast.success('Registro cadastrado!')`.
   - Ao excluir: `toast.error('Registro removido do sistema!')`.
   - Se a API retornar erro: `toast.error('Erro de conexão com o servidor')`.
4. Crie um componente `<SkeletonLinha>` para exibir na tabela de dados enquanto o `GET` inicial estiver carregando.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Instalação e renderização correta do `<Toaster />`.
- [ ] Skeleton Screens sendo exibidos enquanto `carregando === true`.
- [ ] Disparo de toasts em operações de sucesso e erro.
- [ ] Animação CSS suave de pulso para os blocos de esqueleto.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Explore a funcionalidade `toast.promise(promessa, { loading: '...', success: '...', error: '...' })`: ela gerencia automaticamente os três estados do toast acompanhando o ciclo de vida da requisição assíncrona!
