# Plano de Curso: Programação Front-End II (20 Semanas)

**Unidade Curricular:** Programação Front-End (Etapa 2)  
**Carga Horária Total:** 75 horas  
**Carga Semanal:** 5 horas/semana (20 Semanas)  
**Módulo:** Módulo Específico II — 4º Semestre  
**Foco:** React Avançado, Roteamento SPA com React Router DOM v6, Ciclo de Vida e Efeitos (`useEffect`), Consumo de APIs RESTful com Axios, Gerenciamento de Estado Global (Context API), Formulários Complexos com Validação (React Hook Form + Zod), Estilização com Tailwind CSS, Acessibilidade (WCAG) e Deploy em Nuvem.  
**Ferramentas e Recursos:** React, Vite, React Router DOM, Axios, React Hook Form, Zod, Tailwind CSS, VS Code, Git, GitHub, Vercel / Netlify.

---

## 🧭 Módulo 1: Roteamento SPA e Navegação Profissional (Semanas 1 a 4)

* **Semana 01: Revisão de React e Introdução ao Roteamento Moderno**
  * Revisão da componentização, props e estado local (`useState`).
  * O conceito de roteamento no lado do cliente (Client-Side Routing) sem recarregamento da página.
  * Instalação e configuração da biblioteca **React Router DOM v6** com `createBrowserRouter` e `<RouterProvider>`.
* **Semana 02: Páginas, Layouts Compartilhados e `<Outlet>`**
  * Estruturação de páginas (`/home`, `/produtos`, `/sobre`, `/contato`).
  * Criação de Layouts mestres persistentes (Navbar e Footer fixos) usando o componente `<Outlet>`.
  * Navegação declarativa com `<Link>` e `<NavLink>` (estilizando links ativos).
* **Semana 03: Parâmetros de Rota e Navegação Programática**
  * Parâmetros dinâmicos na URL (ex: `/produtos/:id`) capturados com o hook `useParams`.
  * Navegação programática com o hook `useNavigate` (ex: redirecionar após login ou clique).
  * Criação de tela amigável de erro 404 (Página Não Encontrada) com `errorElement`.
* **Semana 04: Rotas Protegidas e Controle de Acesso**
  * Criação de componente de ordem superior (Higher-Order Component / Wrapper) para proteção de rotas privadas.
  * Verificação de token de autenticação: redirecionando usuários não autenticados para a tela de Login.
  * Preservação da rota de origem para redirecionamento pós-login.

---

## 🔄 Módulo 2: Efeitos Colaterais, Ciclo de Vida e Consumo de APIs (Semanas 5 a 8)

* **Semana 05: O Hook `useEffect` e Ciclo de Vida do Componente**
  * As três fases do ciclo de vida: Montagem (Mount), Atualização (Update) e Desmontagem (Unmount).
  * O array de dependências do `useEffect`: quando executar apenas uma vez `[]` e quando escutar variáveis de estado `[variavel]`.
  * Função de limpeza (Cleanup function) para cancelar assinaturas, timers ou requisições pendentes.
* **Semana 06: Migração para o Cliente HTTP Axios**
  * Vantagens do Axios sobre o `fetch` nativo: interceptadores, cancelamento de requisição, serialização automática de JSON e tratamento facilitado de erros.
  * Configuração de uma instância customizada com `axios.create({ baseURL: '...' })`.
  * Interceptors do Axios: injetando automaticamente o token JWT no cabeçalho `Authorization: Bearer <token>` de todas as requisições.
* **Semana 07: Operações Completas de CRUD Conectadas à API Back-End**
  * Implementação integrada de requisições:
    * `GET`: Carregamento e renderização de tabelas e grids de cards.
    * `POST`: Criação de novos registros a partir de formulários.
    * `PUT` / `PATCH`: Edição de registros existentes.
    * `DELETE`: Exclusão de registros com confirmação prévia em Modal.
* **Semana 08: Estados de Interface — Loading, Erros e Mensagens Toast**
  * Gerenciamento de múltiplos estados de requisição (`isLoading`, `error`, `data`).
  * Indicadores visuais: Skeleton Screens (esqueletos de carregamento) e Spinners.
  * Notificações flutuantes de feedback ao usuário com bibliotecas modernas (ex: `react-hot-toast` ou `sonner`).

---

## 🌐 Módulo 3: Estado Global, Formulários e Validação Rigorosa (Semanas 9 a 13)

* **Semana 09: O Problema do Prop Drilling e a Context API do React**
  * Por que passar propriedades através de dezenas de componentes filhos prejudica a manutenibilidade.
  * A arquitetura da **Context API**: `createContext`, `Provider` e o hook `useContext`.
  * Criação do Contexto de Autenticação (`AuthContext`): compartilhando dados do usuário logado e funções `login()` e `logout()` por toda a aplicação.
* **Semana 10: Contextos Adicionais — Tema e Carrinho de Compras**
  * Criação de um `ThemeContext` para alternar entre Dark Mode e Light Mode em tempo real.
  * Criação de um `CartContext` para gerenciar itens adicionados, quantidades, remoção e cálculo do total da compra.
* **Semana 11: Formulários de Alta Performance com React Hook Form**
  * O problema de re-renderizações desnecessárias em formulários controlados por `useState`.
  * Introdução ao **React Hook Form**: formulários não-controlados performáticos via referências (`register`).
  * Manipulação de estados de submissão (`handleSubmit`, `isSubmitting`).
* **Semana 12: Validação de Esquemas com Zod Integrado ao React Hook Form**
  * Integração com o resolvedor `@hookform/resolvers/zod`.
  * Definição de regras estritas: e-mails válidos, senhas fortes com critérios múltiplos, confirmação de senha idêntica, campos numéricos e datas.
  * Exibição limpa de mensagens de erro específicas abaixo de cada campo do formulário.
* **Semana 13: Criação de Componentes de Formulário Reutilizáveis**
  * Criação de componentes universais e acessíveis: `<Input>`, `<Select>`, `<Checkbox>`, `<Textarea>`.
  * Suporte a rótulos acessíveis, mensagens de erro automáticas e ícones decorativos.

---

## 🎨 Módulo 4: Estilização Moderna, Design System e Acessibilidade (Semanas 14 a 17)

* **Semana 14: Estilização com Tailwind CSS**
  * O paradigma utility-first: vantagens de produtividade e manutenção.
  * Instalação e configuração do Tailwind CSS no projeto Vite.
  * Utilitários fundamentais: espaçamentos (`p-`, `m-`), tipografia, cores, Flexbox, Grid e pseudo-classes (`hover:`, `focus:`, `dark:`).
* **Semana 15: Componentes Visuais com Shadcn/UI ou Tailwind UI**
  * Introdução ao ecossistema moderno de componentes baseados em Tailwind e Radix UI.
  * Utilização de Modais/Dialogs, Dropdowns, Tabs, Avatares e Badges altamente estilizados.
  * Responsividade fluida aplicando breakpoints do Tailwind (`sm:`, `md:`, `lg:`, `xl:`).
* **Semana 16: Acessibilidade na Prática (WCAG 2.1) e SEO no Front-End**
  * Verificação de contraste de cores, suporte completo à navegação por teclado (foco visível).
  * Uso correto de tags semânticas e atributos ARIA em componentes complexos.
  * Otimização de metadados e tags OpenGraph para compartilhamento em redes sociais.
* **Semana 17: Testes Automatizados no Front-End**
  * Introdução a testes unitários de componentes com Vitest e React Testing Library.
  * Testando se um componente renderiza corretamente e se dispara eventos ao clicar em botões.

---

## 🚀 Módulo 5: Projeto Final Integrador, Nuvem e Publicação (Semanas 18 a 20)

* **Semana 18: Desenvolvimento e Refinamento do Front-End do Projeto Integrador**
  * Conexão definitiva de todas as telas da aplicação web com a API Back-End em produção.
  * Revisão da experiência do usuário (UX), tempo de resposta e feedback visual.
* **Semana 19: Otimização de Performance e Build de Produção**
  * Otimização de imagens, Lazy Loading de rotas com `React.lazy()` e `<Suspense>`.
  * Execução do build de produção (`npm run build`) e análise do tamanho do bundle.
* **Semana 20: Publicação (Deploy) na Vercel e Apresentação Final**
  * Conexão do repositório GitHub à plataforma Vercel com deploy contínuo (CI/CD).
  * Apresentação da aplicação web completa e responsiva rodando publicamente na internet.
  * Encerramento da formação em Programação Front-End com portfólio profissional publicado.
