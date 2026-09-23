# Plano de Curso: Internet das Coisas — IoT (20 Semanas)

**Unidade Curricular:** Internet das Coisas (IoT)  
**Carga Horária Total:** 75 horas  
**Carga Semanal:** 5 horas/semana (20 Semanas)  
**Módulo:** Módulo Específico I / II — 4º Semestre  
**Foco:** Implementação de soluções de Internet das Coisas (IoT e IIoT), Hardware Embarcado (ESP32), Sensores e Atuadores, Protocolos de Comunicação (MQTT, HTTP, BLE), Plataformas e Brokers na Nuvem, Edge Computing e Integração com Interfaces Gráficas Web/Mobile.  
**Ferramentas e Recursos:** Microcontrolador ESP32 (físico ou simulador Wokwi), VS Code com PlatformIO / Arduino IDE, Protocolo MQTT (Mosquitto / HiveMQ), Node-RED, Plataformas Cloud IoT (ThingSpeak, Adafruit IO, AWS IoT Core / Azure IoT Hub), C/C++ ou MicroPython.

---

## 🔌 Módulo 1: Fundamentos de IoT, IIoT e Arquitetura de Hardware (Semanas 1 a 4)

* **Semana 01: O Ecossistema da Internet das Coisas e Indústria 4.0**
  * Conceito, pilares e dimensões da IoT (Automação Residencial, Cidades Inteligentes, Agro 4.0 e Saúde).
  * Diferença essencial entre IoT e **IIoT (Industrial Internet of Things)**: tolerância a falhas, segurança e protocolos industriais.
  * A arquitetura de camadas em IoT: Percepção (Sensoriamento), Rede (Comunicação) e Aplicação (Nuvem/Decisão).
* **Semana 02: Hardware Embarcado e o Microcontrolador ESP32**
  * Especificações detalhadas do processador ESP32 (Dual-core, clock de 240MHz, memória SRAM, Wi-Fi e Bluetooth BLE nativos).
  * Mapeamento dos pinos GPIO (General Purpose Input/Output): entradas, saídas, pull-up/pull-down internos.
  * Ambiente de desenvolvimento: configuração do VS Code com extensão PlatformIO ou Arduino IDE.
* **Semana 03: Sensores — Leitura de Entradas Digitais e Analógicas**
  * O que são transdutores e sensores.
  * Entradas digitais: botões, sensores de presença infravermelho (PIR), chaves fim de curso.
  * Entradas analógicas e o conversor ADC (Analog-to-Digital Converter) de 12 bits do ESP32: sensores de luminosidade (LDR), temperatura/umidade (DHT11/DHT22) e potenciômetros.
* **Semana 04: Atuadores e Modulação por Largura de Pulso (PWM)**
  * O que são atuadores e como interagem com o mundo físico: relés (chaveamento de cargas de 110V/220V), motores DC, servomotores e sinalizadores visuais/sonoros (LEDs e Buzzers).
  * Controle de intensidade e velocidade usando sinal PWM (Pulse Width Modulation).
  * Prática: Montagem de circuito de alarme e controle de luminosidade no simulador Wokwi.

---

## 📡 Módulo 2: Protocolos de Comunicação e Mensageria (Semanas 5 a 8)

* **Semana 05: Comparativo de Protocolos de Conectividade em IoT**
  * Classificação por alcance, taxa de dados e consumo de bateria.
  * Redes locais de curto alcance: Wi-Fi (802.11 b/g/n) e Bluetooth Low Energy (BLE).
  * Redes em malha (Mesh): Zigbee e ESP-NOW.
  * Redes de longa distância e baixo consumo (LPWAN): LoRaWAN, Sigfox e NB-IoT (redes celulares para IoT).
* **Semana 06: O Protocolo MQTT na Prática**
  * Arquitetura Publish/Subscribe: Publishers (dispositivos sensores), Broker (servidor central de mensagens) e Subscribers (aplicações/painéis).
  * Estrutura de tópicos hierárquicos (ex: `senai/predioA/sala10/temperatura`).
  * Níveis de Garantia de Entrega (QoS 0, QoS 1, QoS 2) e mensagens de retenção (Retained Messages).
* **Semana 07: Conectando o ESP32 a um Broker MQTT na Nuvem**
  * Conexão do ESP32 à rede Wi-Fi com reconexão automática em caso de queda de sinal.
  * Instalação e uso da biblioteca cliente MQTT (`PubSubClient`).
  * Publicação contínua de telemetria em formato JSON para um broker público em nuvem (ex: HiveMQ / EMQX).
* **Semana 08: Controle Bidirecional via MQTT**
  * Subscrição do ESP32 em tópicos de comando (ex: `casa/quarto/rele/set`).
  * Recepção de payloads de comando (`LIGAR`, `DESLIGAR`) e acionamento físico do relé/atuador correspondente.
  * Retorno de confirmação de estado através de tópico de status (`casa/quarto/rele/state`).

---

## ⚙️ Módulo 3: Plataformas Cloud, Node-RED e Regras de Decisão (Semanas 9 a 13)

* **Semana 09: Integração com Plataformas IoT na Nuvem (ThingSpeak / Adafruit IO)**
  * Configuração de Feeds e Channels em plataformas gratuitas de IoT.
  * Envio de telemetria via REST API (HTTP POST) e MQTT.
  * Construção rápida de dashboards com mostradores de ponteiro (gauges), gráficos de linha históricos e botões liga/desliga.
* **Semana 10: Automação e Fluxos de Dados com Node-RED**
  * O que é o Node-RED e sua importância na orquestração de sistemas IoT e IIoT.
  * Instalação local ou em nuvem e navegação na interface visual baseada em nós.
  * Criação do primeiro fluxo: nó MQTT In → nó de função (transformação de dados) → nó de depuração (Debug).
* **Semana 11: Criação de Dashboards Visuais no Node-RED**
  * Instalação do módulo `node-red-dashboard`.
  * Criação de interfaces gráficas completas: gráficos temporais, chaves de controle, medidores e sliders.
  * Acessando o dashboard através de qualquer navegador ou smartphone conectado à rede.
* **Semana 12: Regras de Negócio e Automação Inteligente**
  * Configuração de nós de decisão lógica no Node-RED (nós de Switch e Function em JavaScript).
  * Exemplo prático: "Se a temperatura for maior que 28°C por mais de 5 minutos, ligue o exaustor e envie uma notificação".
* **Semana 13: Disparo de Alertas e Notificações (Telegram / E-mail)**
  * Integração do Node-RED com bots do Telegram via webhook.
  * Envio automático de mensagens de alerta no grupo de manutenção em caso de detecção de vazamento de gás ou calor excessivo.
  * Registro de logs de eventos em arquivo ou banco de dados.

---

## 🧠 Módulo 4: Edge Computing, Segurança e Protocolos Industriais (Semanas 14 a 17)

* **Semana 14: Edge Computing (Computação na Borda)**
  * O conceito de Edge Computing vs. Cloud Computing: por que processar dados no próprio dispositivo antes de enviar para a nuvem.
  * Filtragem de ruídos de sensores e cálculo de médias locais no ESP32 para economizar banda de rede.
  * Introdução conceitual a TinyML (Machine Learning embarcado em microcontroladores).
* **Semana 15: Segurança em Ambientes e Redes IoT**
  * Principais vetores de ataque em dispositivos IoT: portas abertas desnecessárias, senhas fracas, ausência de criptografia.
  * Conexão segura MQTT sobre TLS/SSL (MQTTS na porta 8883) com validação de certificados.
  * Boas práticas de isolamento de dispositivos em VLANs específicas.
* **Semana 16: Conexão Direta entre Aplicações Web/Mobile e Dispositivos IoT**
  * Como a aplicação React ou React Native consome dados de sensores em tempo real.
  * Conexão via WebSockets e clientes MQTT em JavaScript (MQTT.js).
  * Exibição de dados de sensores diretamente na interface desenvolvida pelos alunos nas outras UCs.
* **Semana 17: Introdução a Protocolos da Automação Industrial (Modbus / OPC UA)**
  * O que é o protocolo Modbus (RTU sobre RS485 e TCP sobre Ethernet).
  * O padrão OPC UA (Open Platform Communications Unified Architecture) como elo entre o chão de fábrica e a TI.
  * Simulação de leitura de variáveis industriais com Node-RED.

---

## 🏆 Módulo 5: Projeto Integrador IoT e Apresentação (Semanas 18 a 20)

* **Semana 18: Desenvolvimento do Módulo IoT do Projeto Final**
  * Integração da solução IoT desenvolvida com o sistema principal da equipe (ex: Totem inteligente, Monitoramento de Energia, Fechadura Inteligente com App ou Estufa Automatizada).
  * Conexão do hardware embarcado ao backend e banco de dados do projeto.
* **Semana 19: Testes de Campo, Estabilidade e Calibração de Sensores**
  * Testes de estresse da conexão Wi-Fi e tempo de resposta dos atuadores.
  * Calibração das leituras de grandezas físicas e ajustes finais na interface gráfica de monitoramento.
* **Semana 20: Fechamento, Demonstração do Protótipo Físico e Encerramento**
  * Demonstração ao vivo do hardware coletando dados reais e acionando atuadores integrado ao sistema web/mobile.
  * Apresentação da documentação técnica e esquemáticos de circuito.
  * Conclusão da Unidade Curricular de Internet das Coisas.
