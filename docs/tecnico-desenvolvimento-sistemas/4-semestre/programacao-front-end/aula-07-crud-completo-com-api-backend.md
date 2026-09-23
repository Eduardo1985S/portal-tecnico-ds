---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-front-end-aula-07-crud-completo-com-api-backend
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-front-end/aula-07-crud-completo-com-api-backend
sidebar_position: 7
title: "Aula 07 — CRUD Completo Conectado ao Back-End"
description: Integre sua aplicação React às quatro operações RESTful consumindo endpoints reais com feedback instantâneo na tela.
---

# Aula 07 — CRUD Completo Conectado ao Back-End

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Construir a integração completa entre a interface front-end em React e os endpoints de uma API RESTful back-end, executando com maestria as operações de **Criação (`POST`)**, **Leitura (`GET`)**, **Atualização (`PUT`/`PATCH`)** e **Exclusão (`DELETE`)**, sincronizando o estado local imediatamente com as respostas do servidor e implementando diálogos modais de confirmação.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O fluxo de vida de uma requisição CRUD de ponta a ponta.
- `GET`: Listagem e preenchimento de estados.
- `POST`: Envio de payloads a partir de formulários com atualização otimista ou pós-confirmação.
- `PUT` / `PATCH`: Carregamento prévio de dados para edição em formulário.
- `DELETE`: Exclusão de recursos no banco com confirmação prévia em Modal.
- Boas práticas de sincronização: atualizando o array local sem fazer um novo `GET` desnecessário na rede.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Ao realizar um `POST` ou `DELETE`, existem duas estratégias para refletir a mudança na tela:

### 1. Refetch Completo
Fazer um novo `api.get('/itens')` após cada ação. É simples, mas consome o dobro de tráfego de rede e causa pequenos flickers visuais.

### 2. Sincronização Local Imediata (Recomendada)
O back-end retorna o item recém-criado na resposta do `POST`. O React aproveita essa resposta e anexa direto no array com `setItens(prev => [...prev, resposta.data])`.
No `DELETE`, filtramos o item da lista em memória: `setItens(prev => prev.filter(i => i.id !== idExcluido))`.

A sensação de velocidade para o usuário é instantânea!

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como implementar o ciclo completo em um componente:

```jsx
import { useState, useEffect } from 'react';
import { api } from '../services/api';

export function GestaoTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [itemEdicao, setItemEdicao] = useState(null); // null = modo criação

  // 1. READ (GET)
  useEffect(() => {
    carregarTarefas();
  }, []);

  async function carregarTarefas() {
    try {
      const res = await api.get('/tarefas');
      setTarefas(res.data);
    } catch (err) {
      alert('Erro ao carregar dados do servidor.');
    }
  }

  // 2. CREATE (POST) & UPDATE (PUT)
  async function handleSubmit(e) {
    e.preventDefault();
    if (!titulo.trim()) return;

    if (itemEdicao) {
      // MODO EDIÇÃO (PUT)
      try {
        const res = await api.put(`/tarefas/${itemEdicao.id}`, { titulo });
        setTarefas(tarefas.map(t => t.id === itemEdicao.id ? res.data : t));
        setItemEdicao(null);
        setTitulo('');
      } catch (err) {
        alert('Erro ao atualizar item.');
      }
    } else {
      // MODO CRIAÇÃO (POST)
      try {
        const res = await api.post('/tarefas', { titulo });
        setTarefas([...tarefas, res.data]);
        setTitulo('');
      } catch (err) {
        alert('Erro ao cadastrar novo item.');
      }
    }
  }

  // 3. DELETE (DELETE com confirmação)
  async function handleDelete(id) {
    const confirmar = window.confirm('Deseja realmente excluir este registro?');
    if (!confirmar) return;

    try {
      await api.delete(`/tarefas/${id}`);
      // Remove da lista local imediatamente
      setTarefas(tarefas.filter(t => t.id !== id));
    } catch (err) {
      alert('Não foi possível excluir o registro.');
    }
  }

  function iniciarEdicao(tarefa) {
    setItemEdicao(tarefa);
    setTitulo(tarefa.titulo);
  }

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h2>CRUD Integrado com API Back-End</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <input 
          type="text" 
          value={titulo} 
          onChange={(e) => setTitulo(e.target.value)} 
          placeholder="Descrição da tarefa..." 
          style={{ flex: 1, padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', background: itemEdicao ? '#f59e0b' : '#2563eb', color: '#fff', border: 'none', borderRadius: '4px' }}>
          {itemEdicao ? 'Salvar Edição' : 'Cadastrar'}
        </button>
        {itemEdicao && (
          <button type="button" onClick={() => { setItemEdicao(null); setTitulo(''); }}>
            Cancelar
          </button>
        )}
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tarefas.map(tarefa => (
          <li key={tarefa.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ddd' }}>
            <span>{tarefa.titulo}</span>
            <div>
              <button onClick={() => iniciarEdicao(tarefa)} style={{ marginRight: '6px' }}>Editar</button>
              <button onClick={() => handleDelete(tarefa.id)} style={{ color: 'red' }}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Conecte a aplicação à rota de produtos ou alunos da API desenvolvida na disciplina de Back-End.
2. Implemente o formulário completo com nome, categoria e preço.
3. Teste criar um item no Front-End e consulte o banco de dados PostgreSQL via Prisma Studio (`npx prisma studio`) para confirmar que a gravação ocorreu com sucesso!
4. Realize a edição e a exclusão confirmando a integridade das alterações.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Requisições `GET`, `POST`, `PUT` e `DELETE` disparadas para as rotas corretas.
- [ ] Confirmação de segurança exibida antes da ação destrutiva de exclusão.
- [ ] Modo de edição reaproveitando o formulário e alternando o texto do botão.
- [ ] Atualização fluida do estado local sem necessidade de recarregar o navegador com F5.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Substitua o `window.confirm()` nativo por um componente Modal customizado em React com animação suave de abertura e fechamento!
