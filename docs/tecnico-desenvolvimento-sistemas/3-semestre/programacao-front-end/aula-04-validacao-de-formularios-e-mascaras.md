---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-front-end-aula-04-validacao-de-formularios-e-mascaras
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-front-end/aula-04-validacao-de-formularios-e-mascaras
sidebar_position: 4
title: "Aula 04 — Validação de Formulários e Máscaras com Regex"
description: Construa validações dinâmicas no front-end em tempo real e aplique máscaras de formatação com Expressões Regulares.
---

# Aula 04 — Validação de Formulários e Máscaras com Regex

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Implementar validações ricas e interativas de formulários no lado do cliente, fornecendo feedback visual imediato ao usuário e formatando dinamicamente campos sensíveis (como CPF, telefone e CEP) utilizando manipulação de strings e Expressões Regulares (**Regex**).

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Validação nativa do HTML5 (`required`, `type`, `pattern`, `minlength`) vs Validação programática com JavaScript.
- A API de validação de restrições do navegador: `checkValidity()` e `validity.valid`.
- Feedback em tempo real com eventos `input` e `blur`.
- O que são Expressões Regulares (**RegEx**) e como testar padrões com `regex.test()` e `.replace()`.
- Criação de máscaras dinâmicas de preenchimento (CEP e Telefone).

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

A validação client-side é essencial para a **Experiência do Usuário (UX)**, pois evita o envio desnecessário de dados incorretos para o servidor.

### Sintaxe Básica de Expressões Regulares (Regex)

| Padrão | Significado | Exemplo |
| :--- | :--- | :--- |
| `\d` | Qualquer dígito numérico (0 a 9) | `\d{3}` = 3 dígitos seguidos |
| `\D` | Qualquer caractere que **NÃO** seja número | Usado para limpar pontos e traços |
| `^` e `$` | Início e Fim da string | `^\d{5}-\d{3}$` = formato exato de CEP |
| `[a-zA-Z]` | Letras maiúsculas e minúsculas | Permite apenas texto alfabético |

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como criar uma máscara de CEP com validação de formato:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Validação e Máscaras</title>
  <style>
    .campo { margin-bottom: 16px; }
    .erro { color: #dc2626; font-size: 13px; display: none; }
    .invalido { border: 2px solid #dc2626; outline: none; }
    .valido   { border: 2px solid #16a34a; outline: none; }
  </style>
</head>
<body>
  <form id="meu-formulario">
    <div class="campo">
      <label for="campo-cep">CEP:</label><br>
      <input type="text" id="campo-cep" placeholder="00000-000" maxlength="9">
      <div id="erro-cep" class="erro">CEP inválido! Digite 8 dígitos.</div>
    </div>
    <button type="submit">Cadastrar</button>
  </form>

  <script>
    const inputCep = document.querySelector('#campo-cep');
    const erroCep = document.querySelector('#erro-cep');

    // Máscara dinâmica enquanto o usuário digita
    inputCep.addEventListener('input', (e) => {
      // 1. Remove qualquer caractere que não seja número
      let valor = e.target.value.replace(/\D/g, '');

      // 2. Aplica o traço após os 5 primeiros dígitos
      if (valor.length > 5) {
        valor = valor.replace(/^(\d{5})(\d)/, '$1-$2');
      }

      e.target.value = valor;
    });

    // Validação ao perder o foco (blur)
    inputCep.addEventListener('blur', () => {
      const regexCep = /^\d{5}-\d{3}$/;
      const cepValido = regexCep.test(inputCep.value);

      if (!cepValido && inputCep.value.length > 0) {
        inputCep.classList.add('invalido');
        inputCep.classList.remove('valido');
        erroCep.style.display = 'block';
      } else if (cepValido) {
        inputCep.classList.remove('invalido');
        inputCep.classList.add('valido');
        erroCep.style.display = 'none';
      }
    });
  </script>
</body>
</html>
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Adicione um campo de **Telefone / WhatsApp** ao formulário.
2. Implemente uma máscara dinâmica que aceite o formato `(XX) XXXXX-XXXX`.
3. Ao submeter o formulário (`submit`), verifique se todos os campos estão com a classe `.valido`. Se houver algum campo inválido, bloqueie o envio e exiba um alerta.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Campo com máscara automática ao digitar sem travar o teclado.
- [ ] Validação por Expressão Regular com `.test()`.
- [ ] Estilização visual clara de campos válidos (verde) e inválidos (vermelho).
- [ ] Mensagem de erro descritiva exibida e oculta dinamicamente.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Construa uma validação de confirmação de senha: ao digitar no campo "Confirmar Senha", verifique em tempo real se o valor é idêntico ao campo "Senha" e exiba um aviso caso não confiram.
