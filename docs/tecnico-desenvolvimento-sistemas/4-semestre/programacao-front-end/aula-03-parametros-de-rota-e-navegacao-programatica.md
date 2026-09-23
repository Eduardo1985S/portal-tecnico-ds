---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-front-end-aula-03-parametros-de-rota-e-navegacao-programatica
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-front-end/aula-03-parametros-de-rota-e-navegacao-programatica
sidebar_position: 3
title: "Aula 03 — Parâmetros de Rota e Navegação Programática"
description: Capture IDs dinâmicos na URL com o hook useParams, execute redirecionamentos via código com useNavigate e trate erros 404.
---

# Aula 03 — Parâmetros de Rota e Navegação Programática

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a capturar identificadores e parâmetros variáveis da URL (como `/cursos/:id`) utilizando o hook `useParams`, realizar redirecionamentos e navegações disparadas por ações do usuário via código com o hook `useNavigate` e criar páginas de erro personalizadas (Erro 404) através da propriedade `errorElement`.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Definição de rotas dinâmicas no React Router com a sintaxe de dois-pontos `:parametro`.
- Captura de parâmetros dinâmicos com o hook `useParams()`.
- O hook `useNavigate()`: redirecionando o usuário programaticamente após cadastros ou cliques.
- Histórico de navegação: voltando telas com `navigate(-1)`.
- Tratamento de rotas inexistentes (Erro 404) com `path: '*'` e `errorElement`.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Muitas vezes uma página precisa carregar dados específicos baseando-se no item clicado. Em vez de criar 50 arquivos para 50 cursos diferentes, criamos **uma única página de detalhes parametrizada**:

```text
URL: /cursos/101 ──────────> React Router extrai: { id: "101" }
                                    │
                                    ▼
                 useParams() captura no componente:
                 const { id } = useParams();
```

### Navegação Programática vs Declarativa

- **Declarativa (`<Link to="...">`)**: Usada quando o usuário clica espontaneamente em um link visível na tela.
- **Programática (`navigate('/painel')`)**: Usada quando a navegação depende de uma lógica de negócio assíncrona prévia (ex: validar formulário, salvar no banco, autenticar e então redirecionar).

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como implementar uma tela de detalhes e uma página de erro 404:

```jsx
// src/pages/DetalheCurso.jsx
import { useParams, useNavigate } from 'react-router-dom';

const cursosDb = [
  { id: '1', nome: 'Front-End com React', ch: '75 horas', descricao: 'Domine SPAs, rotas, hooks e Tailwind.' },
  { id: '2', nome: 'Back-End com Node.js', ch: '120 horas', descricao: 'Construa APIs RESTful com Express, Prisma e PostgreSQL.' }
];

export function DetalheCurso() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Busca o curso correspondente ao ID da URL
  const curso = cursosDb.find(c => c.id === id);

  if (!curso) {
    return (
      <div>
        <h3>Curso não encontrado!</h3>
        <button onClick={() => navigate('/cursos')}>Voltar para lista</button>
      </div>
    );
  }

  return (
    <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px' }}>
      <h2>{curso.nome}</h2>
      <p><strong>Carga Horária:</strong> {curso.ch}</p>
      <p>{curso.descricao}</p>
      
      {/* Navegação programática para voltar */}
      <button 
        onClick={() => navigate(-1)} 
        style={{ padding: '8px 16px', background: '#475569', color: '#fff', border: 'none', borderRadius: '4px' }}
      >
        ← Voltar
      </button>
    </div>
  );
}

// src/pages/NaoEncontrada.jsx
import { Link } from 'react-router-dom';

export function NaoEncontrada() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1 style={{ fontSize: '72px', color: '#ef4444', margin: 0 }}>404</h1>
      <h2>Ops! Página não encontrada</h2>
      <p>A página que você está procurando não existe ou foi removida.</p>
      <Link to="/" style={{ color: '#2563eb', fontWeight: 'bold' }}>Voltar para a Página Inicial</Link>
    </div>
  );
}

// Configuração no routes.jsx:
// { path: 'cursos/:id', element: <DetalheCurso /> }
// { path: '*', element: <NaoEncontrada /> }
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie uma página `ListaCursos.jsx` que liste pelo menos 4 disciplinas técnicas com links apontando para `/cursos/1`, `/cursos/2`, etc.
2. Crie a página `DetalheCurso.jsx` com o hook `useParams()` para exibir os dados da disciplina selecionada.
3. Adicione um botão "Concluir Matrícula": ao clicar, exiba um alerta e redirecione o aluno para a página inicial usando `navigate('/')`.
4. Configure a rota curinga `path: '*'` para renderizar uma página 404 caso o usuário digite uma URL inexistente.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Rota dinâmica declarada com `:` no path (`/cursos/:id`).
- [ ] Leitura do parâmetro dinâmico usando o hook `useParams()`.
- [ ] Redirecionamento executado via código com a função `navigate()`.
- [ ] Rota 404 capturando qualquer URL não mapeada.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Descubra o hook `useSearchParams` do React Router DOM e capture parâmetros de consulta (Query Strings) na URL, como `/cursos?categoria=frontend`!
