---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-back-end-aula-16-upload-de-arquivos-com-multer
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-back-end/aula-16-upload-de-arquivos-com-multer
sidebar_position: 16
title: Aula 16 — Upload e Armazenamento de Arquivos com Multer
description: Aprenda a receber arquivos multipart/form-data, validar extensões e salvar imagens de avatar e produtos no Node.js.
---

# Aula 16 — Upload e Armazenamento de Arquivos com Multer

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Compreender como dados binários de arquivos trafegam na web através do formato `multipart/form-data`, configurar a biblioteca **Multer** no Express para receber uploads de imagens, validar extensões e tamanhos máximos e salvar os arquivos de forma segura com nomes únicos.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O formato `multipart/form-data` vs. `application/json`.
- A biblioteca `multer` e a estratégia de armazenamento em disco (`diskStorage`).
- Geração de nomes aleatórios com `crypto.randomBytes` para evitar sobrescrita de arquivos com o mesmo nome.
- Filtros de validação de tipos MIME (permitir apenas imagens JPG, PNG e WebP).
- Disponibilizando arquivos estáticos no Express com `express.static()`.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### Como o JSON lida com arquivos?
O formato JSON tradicional **não** foi projetado para transmitir arquivos binários pesados (como fotos ou PDFs). Tentar converter imagens em strings Base64 aumenta o tamanho do arquivo em cerca de 33% e sobrecarrega a memória do servidor.

Para isso, a web utiliza o padrão **`multipart/form-data`**, que divide o corpo da requisição em múltiplos pedaços (parts), permitindo o envio simultâneo de campos textuais e streams de dados binários brutos.

No Node.js, usamos o middleware **Multer** para interceptar essas partes e salvar os arquivos no disco.

### Instalação:
```bash
npm install multer
```

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

### 1. Configurando o Multer: `src/config/upload.js`
```javascript
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { AppError } from '../errors/AppError.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const pastaUploads = path.resolve(__dirname, '..', '..', 'uploads');

export const configuracaoUpload = {
  directory: pastaUploads,
  storage: multer.diskStorage({
    destination: pastaUploads,
    filename(req, file, callback) {
      // Gera 10 bytes hexadecimais aleatórios para garantir unicidade do nome
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname.replace(/\s+/g, '_')}`;
      return callback(null, fileName);
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024, // Limite de 2 Megabytes
  },
  fileFilter(req, file, callback) {
    const tiposPermitidos = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/webp'];

    if (tiposPermitidos.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new AppError('Formato de arquivo inválido. Envie apenas JPG, PNG ou WebP.', 400));
    }
  },
};

export const upload = multer(configuracaoUpload);
```

### 2. Serviço de Atualização de Avatar: `src/services/AtualizarAvatarUsuarioService.js`
```javascript
import fs from 'fs/promises';
import path from 'path';
import { prisma } from '../database/prisma.js';
import { pastaUploads } from '../config/upload.js';
import { AppError } from '../errors/AppError.js';

export class AtualizarAvatarUsuarioService {
  async execute({ usuarioId, nomeArquivoAvatar }) {
    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId },
    });

    if (!usuario) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    // Se o usuário já tiver um avatar anterior, deleta o arquivo antigo do disco!
    if (usuario.avatar) {
      const caminhoArquivoAntigo = path.join(pastaUploads, usuario.avatar);
      try {
        await fs.unlink(caminhoArquivoAntigo);
      } catch (err) {
        // Ignora caso o arquivo físico já tenha sido deletado
      }
    }

    // Salva o novo nome de arquivo no banco de dados
    const usuarioAtualizado = await prisma.usuario.update({
      where: { id: usuarioId },
      data: { avatar: nomeArquivoAvatar },
      select: { id: true, nome: true, email: true, avatar: true },
    });

    return usuarioAtualizado;
  }
}
```

### 3. Rota de Upload: `src/routes/usuarios.routes.js`
```javascript
import { Router } from 'express';
import { upload } from '../config/upload.js';
import { garantirAutenticacao } from '../middlewares/garantirAutenticacao.js';
import { AtualizarAvatarUsuarioService } from '../services/AtualizarAvatarUsuarioService.js';

const usuariosRoutes = Router();

usuariosRoutes.patch(
  '/avatar',
  garantirAutenticacao,
  upload.single('avatar'), // Intercepta o campo multipart chamado 'avatar'
  async (req, res, next) => {
    try {
      const service = new AtualizarAvatarUsuarioService();
      const usuario = await service.execute({
        usuarioId: req.user.id,
        nomeArquivoAvatar: req.file.filename,
      });

      return res.json(usuario);
    } catch (error) {
      next(error);
    }
  }
);
```

### 4. Servindo os Arquivos Estáticos: `src/server.js`
```javascript
import express from 'express';
import { pastaUploads } from './config/upload.js';

const app = express();
// Disponibiliza as imagens para acesso direto via URL: ex http://localhost:3333/files/nome-foto.jpg
app.use('/files', express.static(pastaUploads));
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Instale o pacote `multer` no seu projeto.
2. Crie uma pasta `uploads/` na raiz do projeto (e adicione `uploads/*` no seu `.gitignore`).
3. Configure o arquivo `src/config/upload.js` com o limite de 2MB e filtro de imagens.
4. No Postman, crie uma requisição `PATCH http://localhost:3333/usuarios/avatar`:
   - Na aba **Authorization**, insira o Bearer Token.
   - Na aba **Body**, selecione a opção **form-data**.
   - Digite a chave `avatar`, mude o tipo de `Text` para `File` e anexe uma imagem do seu computador.
5. Envie a requisição e verifique o arquivo salvo na pasta `uploads/` com o hash gerado.
6. Abra o navegador e acesse a URL `http://localhost:3333/files/<nome-do-arquivo.jpg>` para ver a imagem carregada!

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O pacote `multer` está instalado e configurado com `diskStorage`.
- [ ] Os nomes dos arquivos são prefixados com hash aleatório para evitar colisões.
- [ ] O middleware rejeita arquivos maiores que 2MB e formatos não permitidos.
- [ ] A pasta de uploads está disponibilizada como estática via `express.static`.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Em servidores de nuvem de grande escala (como AWS ou Google Cloud), por que não é recomendável salvar arquivos diretamente no disco rígido local do servidor web? Pesquise sobre serviços de armazenamento de objetos em nuvem (como **Amazon S3** ou **Google Cloud Storage**) e entenda como eles resolvem o problema de servidores que sobem e descem dinamicamente!
