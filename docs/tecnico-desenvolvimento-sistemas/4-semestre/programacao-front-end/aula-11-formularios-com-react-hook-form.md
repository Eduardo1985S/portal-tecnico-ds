---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-front-end-aula-11-formularios-com-react-hook-form
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-front-end/aula-11-formularios-com-react-hook-form
sidebar_position: 11
title: "Aula 11 — Formulários com React Hook Form"
description: Elimine re-renderizações desnecessárias e aumente a produtividade utilizando a biblioteca React Hook Form.
---

# Aula 11 — Formulários com React Hook Form

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender os gargalos de performance causados por formulários controlados via `useState` em telas com dezenas de campos, entender o paradigma de componentes não-controlados baseados em referências (*Uncontrolled Components / Refs*) e dominar o pacote profissional **React Hook Form**.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O problema de performance de formulários controlados: por que digitar uma letra re-renderizava a tela inteira.
- O conceito do **React Hook Form**: alta performance sem re-renderizações através do método `register`.
- O método `handleSubmit(aoSubmeter)`: captura segura dos dados sem precisar de `event.preventDefault()`.
- O objeto de estado `formState`: detectando `isSubmitting`, `isDirty` e erros de preenchimento.
- Resetando os campos após envio bem-sucedido com `reset()`.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Com `useState`, a cada caractere digitado, o componente inteiro re-executa do início ao fim:

```text
Usuário digita a letra "A"
          │
          ▼
setCampo("A") ──> Re-renderiza o Formulário Inteiro (Botões, Inputs, Labels...)
```

O **React Hook Form** utiliza referências diretas aos nós do DOM (`useRef` interno). O React só lê os valores quando o usuário clica no botão "Enviar", garantindo **zero re-renderizações durante a digitação**:

```text
Usuário digita "Lucas" ──> DOM atualiza nativamente sem mexer no React
          │
          ▼
Usuário clica em "Cadastrar" ──> handleSubmit extrai os dados instantaneamente!
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como é simples e limpo construir um formulário com React Hook Form:

```bash
# Instale a biblioteca
npm install react-hook-form
```

```jsx
// src/components/FormularioCadastro.jsx
import { useForm } from 'react-hook-form';

export function FormularioCadastro() {
  const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm();

  async function submeterFormulario(dados) {
    // Simula uma chamada assíncrona para a API
    console.log('Dados prontos para envio:', dados);
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert(`Usuário ${dados.nome} cadastrado com sucesso!`);
    reset(); // Limpa os campos
  }

  return (
    <form onSubmit={handleSubmit(submeterFormulario)} style={{ maxWidth: '400px', margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h2>Novo Aluno</h2>

      <div style={{ marginBottom: '12px' }}>
        <label>Nome Completo:</label><br />
        <input 
          type="text" 
          {...register('nome', { required: 'O nome é obrigatório' })} 
          style={{ width: '100%', padding: '8px' }}
        />
        {errors.nome && <small style={{ color: 'red' }}>{errors.nome.message}</small>}
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label>E-mail:</label><br />
        <input 
          type="email" 
          {...register('email', { required: 'Informe seu e-mail institucional' })} 
          style={{ width: '100%', padding: '8px' }}
        />
        {errors.email && <small style={{ color: 'red' }}>{errors.email.message}</small>}
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label>Semestre:</label><br />
        <select {...register('semestre')} style={{ width: '100%', padding: '8px' }}>
          <option value="1">1º Semestre</option>
          <option value="2">2º Semestre</option>
          <option value="3">3º Semestre</option>
          <option value="4">4º Semestre</option>
        </select>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        style={{ padding: '10px 20px', background: isSubmitting ? '#94a3b8' : '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        {isSubmitting ? 'Salvando...' : 'Cadastrar Aluno'}
      </button>
    </form>
  );
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Instale o pacote `react-hook-form` no seu projeto React com Vite.
2. Crie um formulário de cadastro de Chamados de Suporte contendo:
   - Título do chamado (obrigatório, mínimo de 5 caracteres).
   - Descrição detalhada.
   - Nível de prioridade (Baixa, Média, Alta).
   - Checkbox "Notificar por e-mail".
3. Use o `register` para mapear todos os campos e desabilite o botão enquanto `isSubmitting` for `true`.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Instalação e importação correta do `useForm`.
- [ ] Uso da sintaxe spread `{...register('campo')}` nos inputs.
- [ ] Tratamento do envio encapsulado pelo método `handleSubmit()`.
- [ ] Feedback visual durante o envio com a propriedade `isSubmitting`.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione a propriedade `defaultValues` dentro do `useForm({ defaultValues: { ... } })` para preencher previamente o formulário quando a tela for aberta em modo de edição!
