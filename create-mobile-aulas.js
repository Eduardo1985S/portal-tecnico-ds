const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'docs', 'tecnico-desenvolvimento-sistemas', '3-semestre', 'programacao-dispositivos-moveis');

// Cria o diretório se não existir
if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
}

const aulas = [
    "Configuração do Ambiente",
    "Componentes Estruturais Básicos",
    "Componentes Interativos e Entrada de Dados",
    "Layout e Posicionamento (Flexbox)",
    "Gerenciamento de Estado Local",
    "Listas Simples e Renderização Condicional",
    "Listas de Alta Performance",
    "Prática: App de Lista de Tarefas",
    "Introdução ao React Navigation",
    "Passando Parâmetros na Navegação",
    "Navegação em Abas (Tab Navigation)",
    "Navegação em Gaveta (Drawer Navigation)",
    "Bibliotecas de Componentes Visuais",
    "Ícones e Fontes Customizadas",
    "Componentes Reutilizáveis Customizados",
    "Efeitos Colaterais e Ciclo de Vida",
    "Introdução a APIs e JSON",
    "Consumindo API (Método GET) com Fetch",
    "Prática Integrada (API + Navegação)",
    "Revisão Geral e Fechamento"
];

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Substitui espaços por -
        .replace(/[^\w\-]+/g, '')       // Remove todos os caracteres não-palavra
        .replace(/\-\-+/g, '-')         // Substitui múltiplos - por um único -
        .replace(/^-+/, '')             // Apara - do início do texto
        .replace(/-+$/, '');            // Apara - do final do texto
}

aulas.forEach((titulo, index) => {
    const numAula = (index + 1).toString().padStart(2, '0');
    const slug = slugify(titulo);
    const fileName = `aula-${numAula}-${slug}.md`;
    const filePath = path.join(baseDir, fileName);
    
    const frontmatterId = `tecnico-desenvolvimento-sistemas-3-semestre-programacao-dispositivos-moveis-aula-${numAula}-${slug}`;
    const slugRoute = `/tecnico-desenvolvimento-sistemas/3-semestre/programacao-dispositivos-moveis/aula-${numAula}-${slug}`;

    const content = `---
id: ${frontmatterId}
slug: ${slugRoute}
sidebar_position: ${index + 1}
title: Aula ${numAula} — ${titulo}
description: Aula ${numAula} do curso de Programação para Dispositivos Móveis
---

# Aula ${numAula} — ${titulo}

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Descreva o objetivo da aula de forma simples e didática.

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Conteúdo 1
- Conteúdo 2
- Conteúdo 3

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

Escreva uma explicação inicial sobre o tema da aula.

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Coloque um exemplo simples relacionado ao tema.

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

Descreva uma atividade para o aluno praticar o conteúdo.

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O aluno realizou a atividade proposta
- [ ] O aluno testou no emulador ou aparelho físico
- [ ] O aluno subiu o código para o GitHub

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Espaço para o desafio final para encorajar o protagonismo do aluno.
`;

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Criado: ${fileName}`);
});

console.log('Todas as aulas foram geradas com sucesso!');
