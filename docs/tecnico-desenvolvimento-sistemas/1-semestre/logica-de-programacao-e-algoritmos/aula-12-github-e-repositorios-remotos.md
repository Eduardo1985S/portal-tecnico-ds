---
id: tecnico-desenvolvimento-sistemas-1-semestre-logica-de-programacao-e-algoritmos-aula-12-github-e-repositorios-remotos
slug: /tecnico-desenvolvimento-sistemas/1-semestre/logica-de-programacao-e-algoritmos/aula-12-github-e-repositorios-remotos
sidebar_position: 12
title: Aula 12 — GitHub e Repositórios Remotos
description: Aula 12 do curso de Lógica de Programação e Algoritmos
---

# Aula 12 — GitHub e Repositórios Remotos

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Descobrir como colocar o seu código "nas nuvens", permitindo que outras pessoas vejam e colaborem no seu projeto através do GitHub.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O que é o GitHub e a sua importância como portfólio.
- Comandos de comunicação remota: `git push`, `git pull` e `git clone`.

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### O Git vs GitHub
Enquanto o **Git** é a ferramenta local que roda no seu computador para gerenciar versões, o **GitHub** é um site, uma plataforma online que hospeda os seus repositórios Git na internet. É como se o Git fosse a sua câmera fotográfica, e o GitHub fosse o "Instagram" onde você posta suas fotos de código para o mundo ver.

### Subindo o código para a nuvem
Depois que o seu repositório local está pronto e você tem commits feitos, você precisa enviá-lo.
- **`git remote add origin [URL]`**: "Ensina" ao Git local qual é o endereço do seu repositório lá no GitHub.
- **`git push`**: (Empurrar). Envia os seus commits locais para a nuvem.
- **`git pull`**: (Puxar). Puxa as atualizações que estão na nuvem para o seu computador.
- **`git clone [URL]`**: Baixa um projeto inteiro da nuvem para o seu computador pela primeira vez.

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Vinculando a sua pasta ao GitHub e enviando pela primeira vez:

```bash
# Assumindo que você já tem commits na sua máquina local
git branch -M main
git remote add origin https://github.com/SeuUsuario/nome-do-repo.git
git push -u origin main
```
Após executar esses comandos, ao atualizar a página do GitHub, seus arquivos aparecerão lá como mágica!

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie uma conta no site **GitHub**.
2. Crie um novo repositório (público) chamado `aula-de-git`.
3. Pegue a URL fornecida pelo GitHub e use-a para conectar a pasta local que você criou na aula anterior (`meu-primeiro-projeto`).
4. Faça o `git push` de todos os arquivos.

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] A conta no GitHub foi criada com sucesso.
- [ ] O repositório remoto foi gerado sem erros.
- [ ] Os comandos `remote add` e `push` foram executados no terminal.
- [ ] É possível acessar a página web do repositório e ver os arquivos lá.

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Para dominar a lógica de programação, a prática constante é fundamental! Assuma o controle do seu aprendizado: entre no seu repositório pelo navegador, clique em "Add file" > "Create new file" e crie um arquivo chamado `leia-me.txt` direto pelo GitHub. Salve as alterações. 

Agora, volte para o seu terminal e execute o comando `git pull` para baixar esse arquivo novo da nuvem para o seu computador. Você acabou de simular um trabalho em equipe! Lembre-se: o computador não tem bom senso, ele apenas segue ordens exatas!
