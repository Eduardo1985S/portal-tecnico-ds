---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-front-end-aula-18-desenvolvimento-do-projeto-integrador-frontend-2
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-front-end/aula-18-desenvolvimento-do-projeto-integrador-frontend-2
sidebar_position: 18
title: "Aula 18 — Refinamento do Front-End do Projeto Integrador"
description: Integre definitivamente a interface web ao Back-End em produção com autenticação JWT, rotas protegidas e validações.
---

# Aula 18 — Refinamento do Front-End do Projeto Integrador

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Conectar a interface web do Projeto Integrador à API Back-End completa (desenvolvida com Node.js, Express, Prisma ORM e PostgreSQL), consolidando todas as tecnologias da formação técnica: autenticação JWT com Context API, interceptores do Axios, navegação com React Router DOM v6, formulários com React Hook Form + Zod e estilização com Tailwind CSS.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Sincronização definitiva dos ambientes: variáveis de ambiente no Vite (`VITE_API_URL`).
- O fluxo de login e renovação de token JWT de ponta a ponta.
- Telas de Dashboard analíticas com gráficos e tabelas com paginação.
- Tratamento de casos de borda (*Edge Cases*): perda de conexão com a internet, erros 500 do servidor e tokens expirados.
- Testes manuais integrados de usabilidade com a turma.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Durante o desenvolvimento local, a API costuma rodar em `http://localhost:3000`. Quando a API for para a nuvem (ex: Render ou Railway), o front-end precisará apontar para a URL de produção sem que você precise alterar o código-fonte manualmente.

Para isso, usamos **Variáveis de Ambiente no Vite**:

```text
Arquivo .env:
VITE_API_URL=http://localhost:3000/api

Arquivo .env.production:
VITE_API_URL=https://minha-api-senai.onrender.com/api
```

No código do Axios, referenciamos:
```javascript
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como tratar o fluxo completo de login e transição de tela:

```jsx
// src/pages/PaginaLogin.jsx
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

export function PaginaLogin() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(dados) {
    try {
      // 1. Envia credenciais para o Back-End
      const resposta = await api.post('/auth/login', dados);
      const { usuario, token } = resposta.data;

      // 2. Grava no estado global e LocalStorage
      login(usuario, token);

      toast.success(`Bem-vindo de volta, ${usuario.nome}!`);
      
      // 3. Redireciona para o Painel do Sistema
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const mensagem = err.response?.data?.erro || 'Credenciais inválidas. Tente novamente.';
      toast.error(mensagem);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-6">
          Acesso ao Sistema
        </h2>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">E-mail:</label>
            <input 
              type="email" 
              {...register('email', { required: true })}
              className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white" 
              placeholder="seu.email@senai.br"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Senha:</label>
            <input 
              type="password" 
              {...register('senha', { required: true })}
              className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white" 
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
          >
            {isSubmitting ? 'Verificando...' : 'Entrar na Plataforma'}
          </button>
        </form>
      </div>
    </div>
  );
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie o arquivo `.env` com a variável `VITE_API_URL`.
2. Configure a tela de Login conectada ao endpoint real `/auth/login` da sua API Back-End.
3. Teste o fluxo completo de um usuário:
   - Fazer login com e-mail e senha cadastrados no PostgreSQL.
   - Ser redirecionado automaticamente para o Dashboard protegido.
   - Cadastrar um novo recurso no sistema e validar o toast de confirmação.
   - Clicar em "Sair" e verificar o bloqueio imediato do Dashboard.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Variáveis de ambiente com prefixo `VITE_` configuradas.
- [ ] Fluxo de autenticação e persistência do token JWT validado de ponta a ponta.
- [ ] Rotas protegidas impedindo acesso anônimo.
- [ ] Feedback com Toasts em todas as requisições com a API.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione uma barra de progresso superior na página (usando a biblioteca `nprogress`) que anima automaticamente sempre que uma chamada assíncrona do Axios estiver em andamento!
