---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-front-end-aula-13-componentes-de-formulario-reutilizaveis
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-front-end/aula-13-componentes-de-formulario-reutilizaveis
sidebar_position: 13
title: "Aula 13 — Componentes de Formulário Reutilizáveis"
description: Construa um conjunto modular de inputs, selects e botões integrados com forwardRef para formulários elegantes e acessíveis.
---

# Aula 13 — Componentes de Formulário Reutilizáveis

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a encapsular elementos de formulário em componentes reutilizáveis e acessíveis (`<Input />`, `<Select />`, `<TextArea />`), utilizando a função `forwardRef` do React para que bibliotecas baseadas em referências (como o React Hook Form) funcionem de maneira transparente e padronizada em toda a aplicação.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Por que tags nativas soltas (`<input>`, `<label>`) espalhadas pelo projeto geram inconsistências de design e acessibilidade.
- A função especial `forwardRef`: repassando a referência do DOM para dentro de componentes customizados.
- Padrões de acessibilidade: vinculando `<label htmlFor={id}>` ao `<input id={id}>`.
- Renderização automática de mensagens de erro abaixo do input.
- Composição com propriedades nativas do HTML via desestruturação rest/spread (`...props`).

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Por padrão, componentes React normais não aceitam a prop `ref`. Se você passar `{...register('nome')}` para um componente customizado `<MeuInput />`, o React disparará um aviso no console e o formulário não conseguirá ler o valor!

Para permitir que componentes filhos recebam referências do pai, envelopamos a função com **`forwardRef`**:

```text
React Hook Form (Pai)  ──(passa ref interna)──>  forwardRef(MeuInput)  ──>  <input ref={ref} />
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como construir o componente universal `<CampoTexto>`:

```jsx
// src/components/CampoTexto/CampoTexto.jsx
import { forwardRef } from 'react';

export const CampoTexto = forwardRef(({ label, nome, erro, ...props }, ref) => {
  return (
    <div style={{ marginBottom: '14px', display: 'flex', flexDirection: 'column' }}>
      {label && (
        <label 
          htmlFor={nome} 
          style={{ marginBottom: '4px', fontWeight: 'bold', fontSize: '14px', color: '#334155' }}
        >
          {label}
        </label>
      )}

      <input
        id={nome}
        name={nome}
        ref={ref} // Conecta a ref do React Hook Form ao input real!
        style={{
          padding: '10px 12px',
          borderRadius: '6px',
          border: erro ? '2px solid #ef4444' : '1px solid #cbd5e1',
          outline: 'none',
          fontSize: '15px'
        }}
        {...props} // Repassa placeholder, type, maxLength, etc.
      />

      {erro && (
        <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
          {erro}
        </span>
      )}
    </div>
  );
});

CampoTexto.displayName = 'CampoTexto';
```

Agora, o seu formulário fica extremamente limpo e elegante:

```jsx
// src/components/FormularioExemplo.jsx
import { useForm } from 'react-hook-form';
import { CampoTexto } from './CampoTexto/CampoTexto';

export function FormularioExemplo() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  function salvar(dados) {
    console.log(dados);
  }

  return (
    <form onSubmit={handleSubmit(salvar)} style={{ maxWidth: '400px' }}>
      <CampoTexto 
        label="Nome Completo" 
        nome="nome" 
        placeholder="Ex: Carlos Eduardo" 
        erro={errors.nome?.message}
        {...register('nome', { required: 'Nome é obrigatório' })}
      />

      <CampoTexto 
        label="E-mail" 
        nome="email" 
        type="email"
        placeholder="seu.email@senai.br" 
        erro={errors.email?.message}
        {...register('email', { required: 'E-mail é obrigatório' })}
      />

      <button type="submit" style={{ padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px' }}>
        Salvar Registro
      </button>
    </form>
  );
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie o componente `<CampoTexto>` com `forwardRef` no seu projeto.
2. Crie também o componente `<CampoSelect>` com `forwardRef` que receba um array de opções `options={[{ label: '...', value: '...' }]}`.
3. Substitua todos os inputs manuais da sua tela de cadastro pelos novos componentes reutilizáveis.
4. Inspecione no DevTools e valide que o atributo `htmlFor` do `<label>` bate exatamente com o `id` do `<input>`, tornando o formulário acessível para leitores de tela.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Uso da função `forwardRef((props, ref) => ...)` da biblioteca `'react'`.
- [ ] Atribuição de `displayName` para facilitar o debug nas ferramentas de desenvolvedor.
- [ ] Associação correta entre `label` e `input` para acessibilidade (WCAG).
- [ ] Integração transparente com `{...register('campo')}` do React Hook Form.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione suporte a um ícone decorativo dentro do `<CampoTexto>` (ex: ícone de lupa ou de cadeado posicionado à esquerda dentro do input com CSS `position: absolute`)!
