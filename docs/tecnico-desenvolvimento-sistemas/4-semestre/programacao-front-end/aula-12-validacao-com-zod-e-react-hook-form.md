---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-front-end-aula-12-validacao-com-zod-e-react-hook-form
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-front-end/aula-12-validacao-com-zod-e-react-hook-form
sidebar_position: 12
title: "Aula 12 — Validação com Zod e React Hook Form"
description: Garanta a integridade absoluta dos dados de entrada unindo o validador de esquemas Zod ao React Hook Form.
---

# Aula 12 — Validação com Zod e React Hook Form

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a declarar esquemas de validação declarativos, rigorosos e type-safe utilizando a biblioteca **Zod**, conectando-a diretamente ao **React Hook Form** através do resolvedor `@hookform/resolvers/zod`, exibindo mensagens de erro específicas e amigáveis abaixo de cada campo do formulário.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Por que validações manuais com múltiplos `if / else` tornam o código vulnerável e difícil de manter.
- Introdução ao **Zod**: criação de schemas com `z.object()`, `z.string()`, `z.number()`.
- Regras estritas: `.min()`, `.max()`, `.email()`, `.regex()`.
- Validação cruzada com `.refine()`: comparando a senha e a confirmação de senha.
- A biblioteca de ponte `@hookform/resolvers/zod` e a propriedade `resolver: zodResolver(schema)`.
- Renderização visual das mensagens de erro do Zod na interface.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

O **Zod** permite isolar toda a regra de validação em um objeto limpo fora do componente:

```text
┌──────────────────────────────────────────────┐
│             Esquema Zod (Schema)             │
│  - Nome: mínimo 3 letras                     │
│  - E-mail: formato de e-mail válido          │
│  - Senha: mínimo 8 caracteres                │
│  - Confirmar Senha: deve ser igual à Senha   │
└──────────────────────┬───────────────────────┘
                       │
                       ▼ zodResolver(schema)
┌──────────────────────────────────────────────┐
│               React Hook Form                │
│  Bloqueia o envio e entrega erros pontuais   │
│  em formState.errors.campo.message           │
└──────────────────────────────────────────────┘
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como validar um formulário de cadastro com confirmação de senha:

```bash
# Instale o Zod e o resolvedor para React Hook Form
npm install zod @hookform/resolvers
```

```jsx
// src/components/FormularioRegistro.jsx
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// 1. Definição do Esquema de Validação com Zod
const schemaCadastro = z.object({
  nome: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Digite um e-mail válido'),
  idade: z.coerce.number().min(16, 'Você precisa ter no mínimo 16 anos para o curso técnico'),
  senha: z.string().min(8, 'A senha deve conter no mínimo 8 dígitos'),
  confirmarSenha: z.string()
}).refine((dados) => dados.senha === dados.confirmarSenha, {
  message: 'As senhas não coincidem',
  path: ['confirmarSenha'] // Onde o erro será exibido
});

export function FormularioRegistro() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schemaCadastro)
  });

  function aoSalvar(dados) {
    console.log('Dados validados com sucesso pelo Zod:', dados);
    alert('Cadastro realizado com sucesso!');
  }

  return (
    <form onSubmit={handleSubmit(aoSalvar)} style={{ maxWidth: '420px', margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h2>Crie sua Conta de Estudante</h2>

      <div style={{ marginBottom: '10px' }}>
        <label>Nome:</label>
        <input type="text" {...register('nome')} style={{ width: '100%', padding: '8px' }} />
        {errors.nome && <small style={{ color: '#dc2626' }}>{errors.nome.message}</small>}
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>E-mail:</label>
        <input type="email" {...register('email')} style={{ width: '100%', padding: '8px' }} />
        {errors.email && <small style={{ color: '#dc2626' }}>{errors.email.message}</small>}
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Idade:</label>
        <input type="number" {...register('idade')} style={{ width: '100%', padding: '8px' }} />
        {errors.idade && <small style={{ color: '#dc2626' }}>{errors.idade.message}</small>}
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Senha:</label>
        <input type="password" {...register('senha')} style={{ width: '100%', padding: '8px' }} />
        {errors.senha && <small style={{ color: '#dc2626' }}>{errors.senha.message}</small>}
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Confirmar Senha:</label>
        <input type="password" {...register('confirmarSenha')} style={{ width: '100%', padding: '8px' }} />
        {errors.confirmarSenha && <small style={{ color: '#dc2626' }}>{errors.confirmarSenha.message}</small>}
      </div>

      <button type="submit" style={{ width: '100%', padding: '10px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Confirmar Inscrição
      </button>
    </form>
  );
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Instale `zod` e `@hookform/resolvers` no seu projeto.
2. Crie um formulário de cadastro de Novo Projeto Integrador com os campos:
   - `titulo`: Mínimo 5 caracteres e máximo 50.
   - `semestre`: Número inteiro entre 1 e 4.
   - `repositorioUrl`: URL válida (`z.string().url('Informe uma URL válida do GitHub')`).
   - `termoAceito`: Booleano obrigatório (`z.literal(true, { errorMap: () => ({ message: 'Você deve aceitar os termos do projeto' }) })`).
3. Verifique que o formulário recusa submissões inválidas e desenha os erros em vermelho.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Instalação de `zod` e `@hookform/resolvers`.
- [ ] Schema criado com validações semânticas (`.min()`, `.email()`, `.url()`).
- [ ] Validação cruzada de confirmação de senha utilizando `.refine()`.
- [ ] Conexão transparente via `zodResolver(schema)`.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione uma regra de senha forte com Expressão Regular no Zod: a senha deve conter pelo menos uma letra maiúscula, um número e um caractere especial (`@$!%*?&`)!
