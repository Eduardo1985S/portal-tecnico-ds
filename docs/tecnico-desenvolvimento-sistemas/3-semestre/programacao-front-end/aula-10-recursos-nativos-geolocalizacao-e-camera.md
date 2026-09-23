---
id: tecnico-desenvolvimento-sistemas-3-semestre-programacao-front-end-aula-10-recursos-nativos-geolocalizacao-e-camera
slug: /tecnico-desenvolvimento-sistemas/3-semestre/programacao-front-end/aula-10-recursos-nativos-geolocalizacao-e-camera
sidebar_position: 10
title: "Aula 10 — Recursos Nativos: Geolocalização e Câmera Web"
description: Integre APIs modernas de hardware do dispositivo como GPS, Câmera e Arrastar e Soltar (Drag and Drop).
---

# Aula 10 — Recursos Nativos: Geolocalização e Câmera Web

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Explorar as APIs de integração de hardware modernas do navegador web, solicitando permissões seguras do usuário para acessar coordenadas geográficas (GPS) com a Geolocation API e transmitir vídeo ao vivo da webcam via MediaDevices API.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- O modelo de segurança do navegador: contextos seguros (HTTPS / localhost) e consentimento explícito de permissões.
- API de Geolocalização: `navigator.geolocation.getCurrentPosition()`.
- Captura de latitude, longitude e precisão (`coords.accuracy`).
- API de Mídia: `navigator.mediaDevices.getUserMedia()`.
- Transmissão do fluxo de vídeo (*MediaStream*) em um elemento `<video autoplay>`.
- Captura de fotos congelando um frame do vídeo no Canvas.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação teórica

As páginas web modernas deixaram de ser meros documentos estáticos para se tornarem aplicações completas com acesso seguro ao hardware.

```text
[ Aplicação Web ] ── Solicita Permissão ──> [ Navegador / SO ]
                                                   │
                                            [ Usuário Autoriza ]
                                                   │
[ Coordenadas GPS / Stream da Câmera ] <───────────┘
```

Por motivos de privacidade do usuário, qualquer acesso a periféricos exige origem segura (`https://` ou `http://localhost`) e tratamento dos casos onde o usuário clica em "Bloquear" ou "Negar".

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Exemplo prático

Veja como obter a localização e abrir a câmera da webcam:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Acesso a Hardware Web</title>
  <style>
    video { border-radius: 8px; background: #000; width: 320px; height: 240px; }
  </style>
</head>
<body>
  <h2>Recursos de Hardware</h2>

  <button id="btn-gps">Obter Minhas Coordenadas</button>
  <p id="coordenadas">Aguardando solicitação...</p>

  <hr>

  <button id="btn-camera">Ativar Câmera</button><br><br>
  <video id="player-video" autoplay playsinline></video>

  <script>
    // 1. GEOLOCALIZAÇÃO
    const btnGps = document.querySelector('#btn-gps');
    const statusGps = document.querySelector('#coordenadas');

    btnGps.addEventListener('click', () => {
      if (!navigator.geolocation) {
        statusGps.textContent = 'Geolocalização não suportada neste navegador.';
        return;
      }

      statusGps.textContent = 'Solicitando permissão...';

      navigator.geolocation.getCurrentPosition(
        (posicao) => {
          const lat = posicao.coords.latitude.toFixed(5);
          const lng = posicao.coords.longitude.toFixed(5);
          statusGps.innerHTML = `<strong>Localização:</strong> Lat: ${lat}, Long: ${lng} 
            (<a href="https://www.google.com/maps?q=${lat},${lng}" target="_blank">Abrir no Maps</a>)`;
        },
        (erro) => {
          statusGps.textContent = `Erro ao obter localização: ${erro.message}`;
        }
      );
    });

    // 2. CÂMERA (WEBCAM)
    const btnCamera = document.querySelector('#btn-camera');
    const video = document.querySelector('#player-video');

    btnCamera.addEventListener('click', async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
        video.srcObject = stream;
      } catch (err) {
        alert('Não foi possível acessar a câmera: ' + err.message);
      }
    });
  </script>
</body>
</html>
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática

1. Crie uma página de "Check-in de Presença".
2. Adicione um botão "Realizar Check-in".
3. Ao clicar, solicite a geolocalização do aluno e ative a webcam.
4. Adicione um botão "Tirar Foto" que capture a imagem da câmera desenhando o frame atual em um elemento `<canvas>` invisível e mostre a foto capturada em uma tag `<img>`.

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] Verificação da existência de `navigator.geolocation`.
- [ ] Tratamento do callback de sucesso e erro na geolocalização.
- [ ] Fluxo de vídeo integrado com `navigator.mediaDevices.getUserMedia`.
- [ ] Atributos `autoplay` e `playsinline` configurados no elemento `<video>`.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione um botão para parar a câmera (`track.stop()`) liberando a webcam do computador quando o usuário terminar a captura da foto!
