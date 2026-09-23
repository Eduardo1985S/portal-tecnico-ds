---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-front-end-aula-20-apresentacao-do-projeto-e-deploy-na-vercel
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-front-end/aula-20-apresentacao-do-projeto-e-deploy-na-vercel
sidebar_position: 20
title: "Aula 20 — Apresentação do Projeto e Deploy na Vercel"
description: Gere o pacote de produção otimizado com npm run build e publique sua SPA globalmente com a plataforma Vercel.
---

# Aula 20 — Apresentação do Projeto e Deploy na Vercel

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Aprender a gerar o pacote de distribuição otimizado para produção com `npm run build`, compreender o processo de minificação e geração de bundles estáticos (HTML, JS, CSS) e realizar a publicação global (*Deploy*) da aplicação conectando o repositório GitHub à plataforma em nuvem **Vercel** ou **Netlify**, finalizando o ciclo de Front-End I com um link público funcional no portfólio.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O comando de compilação para produção: `npm run build` e a pasta de saída `dist/`.
- O que é minificação, otimização de imagens e empacotamento de assets (*Bundling* com Rollup/Vite).
- Testando a versão de produção localmente com `npm run preview`.
- Versionamento final no GitHub com commit semântico.
- Configuração de Deploy Contínuo (CI/CD) com a Vercel.
- Retrospectiva da Unidade Curricular e preparação para **Front-End II** (React Router DOM, Hooks avançados, Context API e Tailwind CSS).

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

Durante o desenvolvimento (`npm run dev`), o Vite prioriza a velocidade imediata de edição. Para colocar o site no ar para milhões de usuários, precisamos compilar e otimizar tudo:

```text
Código de Desenvolvimento (JSX, múltiplos arquivos, espaços)
                        │
                        ▼ npm run build
Pasta dist/ (HTML comprimido, JS minificado com hash, CSS enxuto)
                        │
                        ▼ Deploy (Vercel / Netlify / GitHub Pages)
Servidor Web Global (CDN de alta velocidade com HTTPS gratuito!)
```

### O Fluxo de CI/CD da Vercel

1. Você faz `git push origin main` no seu repositório GitHub.
2. A Vercel detecta automaticamente o novo commit através de webhooks.
3. Executa o build nos servidores em nuvem.
4. Se o build for bem-sucedido, publica a nova versão em poucos segundos sem interrupção de serviço (*Zero-Downtime Deployment*).

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja o fluxo de comandos no terminal para gerar o build e testar:

```bash
# 1. Gerar o pacote otimizado de produção
npm run build

# O Vite exibirá algo como:
# dist/index.html                   0.46 kB │ gzip:  0.30 kB
# dist/assets/index-Dk8A1s9a.css    1.25 kB │ gzip:  0.64 kB
# dist/assets/index-B7j23a1z.js   142.10 kB │ gzip: 45.30 kB
# ✓ built in 420ms

# 2. Testar o build localmente antes de enviar para nuvem
npm run preview
```

### Passo a Passo para Deploy na Vercel:

1. Acesse [vercel.com](https://vercel.com) e faça login com sua conta do **GitHub**.
2. Clique no botão **"Add New..."** > **"Project"**.
3. Selecione o repositório do seu projeto React.
4. A Vercel detectará automaticamente o framework `Vite`.
5. Clique em **"Deploy"**. Em cerca de 30 segundos, você receberá sua URL pública HTTPS (ex: `https://meu-projeto.vercel.app`)!

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Gere o build de produção do seu projeto com `npm run build` e certifique-se de que não há nenhum erro de compilação ou importação.
2. Envie todo o código para o seu repositório no GitHub.
3. Conecte o repositório à Vercel e faça o deploy da sua SPA.
4. Adicione o link público gerado no arquivo `README.md` do seu GitHub e compartilhe com o professor e colegas de turma para a apresentação final.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Build de produção gerado com sucesso sem erros (`exit code 0`).
- [ ] Repositório no GitHub atualizado com README contendo instruções do projeto.
- [ ] Aplicação publicada na Vercel com link HTTPS acessível publicamente.
- [ ] Apresentação funcional demonstrando cadastro, filtros, exclusão e persistência.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Rumo ao 4º Semestre!

Parabéns por concluir **Programação Front-End I**! No 4º Semestre, em **Programação Front-End II**, daremos o próximo salto profissional:
- Roteamento SPA com **React Router DOM v6** (múltiplas páginas sem reload).
- Gerenciamento de Estado Global com **Context API**.
- Consumo de APIs RESTful profissionais com **Axios**.
- Formulários performáticos validados com **React Hook Form + Zod**.
- Estilização moderna com **Tailwind CSS**.
