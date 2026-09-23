---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-back-end-aula-11-seguranca-e-hashing-de-senhas-com-bcrypt
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-back-end/aula-11-seguranca-e-hashing-de-senhas-com-bcrypt
sidebar_position: 11
title: Aula 11 — Segurança e Hashing de Senhas com Bcrypt
description: Proteja os dados dos usuários criptografando senhas com algoritmos de hash unidirecional e salt no Node.js.
---

# Aula 11 — Segurança e Hashing de Senhas com Bcrypt

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender as diretrizes de segurança da informação e a Lei Geral de Proteção de Dados (LGPD) no armazenamento de credenciais, diferenciar criptografia bidirecional de funções de hash unidirecionais e utilizar a biblioteca **Bcrypt** para aplicar hash seguro com geração de salt no cadastro de usuários.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- A regra de ouro da segurança de software: **Nunca armazene senhas em texto puro!**
- O que é uma função de hash criptográfica (MD5 e SHA-1 vs. Bcrypt e Argon2).
- O que é o Salt (salto) e por que ele anula ataques com Tabelas Rainbow (*Rainbow Tables*).
- O fator de custo (*work factor / rounds*).
- Criptografando senhas no cadastro com `bcrypt.hash()` e comparando no login com `bcrypt.compare()`.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### Hash vs. Criptografia Tradicional
* **Criptografia Bidirecional:** Você possui uma chave para criptografar e uma chave para descriptografar (ex: AES, RSA).
* **Hash Criptográfico (Unidirecional):** É uma via de mão única. Um dado de entrada passa pela função matemática e gera uma sequência fixa de caracteres. É matematicamente impossível reverter o hash de volta para a senha original!

### Por que o Bcrypt é o padrão da indústria?
Algoritmos rápidos como MD5 ou SHA-256 foram feitos para verificar integridade de arquivos, não para senhas. Um computador moderno consegue testar bilhões de hashes MD5 por segundo em ataques de força bruta.

O **Bcrypt** é propositalmente adaptável e lento: ele consome tempo e recursos da CPU (determinado pelo número de rounds, geralmente `10` ou `12`). Além disso, o Bcrypt adiciona uma string aleatória única chamada **Salt** a cada senha, garantindo que dois usuários com a mesma senha (ex: `"123456"`) tenham hashes completamente diferentes no banco de dados!

### Instalação:
```bash
npm install bcryptjs
```
*(Usamos `bcryptjs`, uma implementação em JavaScript puro sem dependência de compiladores C++ nativos no Windows).*

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### 1. Aplicando Hash no Cadastro: `src/services/CriarUsuarioService.js`
```javascript
import bcrypt from 'bcryptjs';
import { prisma } from '../database/prisma.js';
import { AppError } from '../errors/AppError.js';

export class CriarUsuarioService {
  async execute({ nome, email, senha }) {
    const usuarioJaExiste = await prisma.usuario.findUnique({
      where: { email },
    });

    if (usuarioJaExiste) {
      throw new AppError('Este e-mail já está cadastrado.', 409);
    }

    // 1. Gera o hash da senha com 10 rounds de salt
    const senhaHash = await bcrypt.hash(senha, 10);

    // 2. Grava apenas o HASH no banco de dados!
    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaHash,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        criadoEm: true,
      },
    });

    return usuario;
  }
}
```

### 2. Comparando a Senha no Login: `src/services/VerificarSenhaService.js`
```javascript
import bcrypt from 'bcryptjs';
import { prisma } from '../database/prisma.js';
import { AppError } from '../errors/AppError.js';

export class VerificarSenhaService {
  async execute({ email, senhaDigitada }) {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      throw new AppError('E-mail ou senha incorretos.', 401);
    }

    // O bcrypt extrai o salt do hash salvo e verifica se batem!
    const senhaValida = await bcrypt.compare(senhaDigitada, usuario.senha);

    if (!senhaValida) {
      // Dica de Segurança: Nunca diga se o erro foi no e-mail ou na senha!
      throw new AppError('E-mail ou senha incorretos.', 401);
    }

    return usuario;
  }
}
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Instale o pacote `bcryptjs` no seu projeto (`npm install bcryptjs`).
2. Atualize o seu `CriarUsuarioService` para criptografar a senha com `bcrypt.hash(senha, 10)` antes de persistir no banco.
3. Cadastre dois novos usuários utilizando exatamente a mesma senha (ex: `"minhasenha123"`).
4. Abra o **DBeaver** ou o **Prisma Studio** e inspecione a coluna `senha` dos dois registros.
5. Verifique que ambos os hashes começam com `$2a$10$` (ou `$2b$10$`) mas o restante dos caracteres é totalmente diferente devido ao salt aleatório!

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O pacote `bcryptjs` foi instalado com sucesso.
- [ ] A senha recebida em texto puro é criptografada antes da chamada `prisma.usuario.create`.
- [ ] O hash gerado é gravado com sucesso no campo `senha` do PostgreSQL.
- [ ] O método `bcrypt.compare()` valida com precisão senhas corretas e rejeita senhas incorretas.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Por que em mensagens de erro de login devemos sempre exibir `"E-mail ou senha incorretos"` em vez de mensagens como `"E-mail não encontrado"` ou `"Senha incorreta para este usuário"`? Pesquise sobre a vulnerabilidade conhecida como **User Enumeration (Enumeração de Usuários)** e anote a resposta!
