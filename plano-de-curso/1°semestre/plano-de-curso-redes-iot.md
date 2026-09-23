# Plano de Curso: Arquitetura de Redes com IoT (20 Semanas)

**Unidade Curricular:** Arquitetura de Redes com IoT  
**Carga Horária Total:** 75 horas  
**Carga Semanal:** 5 horas/semana (20 Semanas)  
**Módulo:** Módulo Básico — 1º Semestre  
**Ferramentas e Recursos:** Cisco Packet Tracer, Wireshark, VS Code, Simuladores Wokwi / ESP32, Terminal Linux/Windows, Protocolo MQTT, Brokers de teste (HiveMQ/Mosquitto).

---

## 🌐 Módulo 1: Fundamentos de Redes e Topologias (Semanas 1 a 4)

* **Semana 01: Introdução às Redes de Computadores**
  * Conceito de rede, histórico e evolução da comunicação de dados.
  * Classificação de redes por alcance geográfico: PAN, LAN, MAN, WAN e WLAN.
  * Tipos de conexões: ponto a ponto e multiponto.
* **Semana 02: Topologias de Rede e Meios de Transmissão**
  * Topologias físicas e lógicas: Barramento, Anel, Estrela, Malha e Híbrida.
  * Meios de transmissão guiados: Cabos de par trançado (Cat5e, Cat6), fibra óptica e coaxial.
  * Meios de transmissão não guiados: Wi-Fi (802.11), Bluetooth, Zigbee e Radiofrequência.
* **Semana 03: Ativos e Passivos de Rede**
  * Elementos passivos: Conectores RJ45, patch panels, racks e cabeamento estruturado.
  * Elementos ativos: Placas de rede (NIC), hubs, switches, roteadores e access points.
  * Diferença operacional entre hub, switch e roteador.
* **Semana 04: Simulação Inicial com Cisco Packet Tracer**
  * Instalação e navegação na interface do Cisco Packet Tracer.
  * Montagem da primeira rede local (LAN) com computadores conectados a um switch.
  * Realização de testes de conectividade básica (comando `ping`).

---

## 📡 Módulo 2: Modelos em Camadas e Endereçamento IP (Semanas 5 a 8)

* **Semana 05: O Modelo de Referência OSI vs. Modelo TCP/IP**
  * As 7 camadas do modelo OSI e suas funções específicas.
  * As 4 camadas da pilha TCP/IP e seu mapeamento com a internet real.
  * Encapsulamento e desencapsulamento de dados (PDU: Dados, Segmento, Pacote, Quadro, Bits).
* **Semana 06: Endereçamento Físico (MAC) e Lógico (IPv4)**
  * Endereço físico MAC e protocolo ARP (Address Resolution Protocol).
  * Estrutura do endereço IPv4: 32 bits, notação decimal com pontos e classes (A, B, C).
  * Endereços públicos vs. endereços privados (RFC 1918) e funcionamento do NAT.
* **Semana 07: Máscaras de Rede, CIDR e Sub-redes Simples**
  * Função da máscara de sub-rede padrão.
  * Notação CIDR (ex: `/24`, `/28`).
  * Identificação de Endereço de Rede, Primeiro IP útil, Último IP útil e Endereço de Broadcast.
* **Semana 08: Introdução ao IPv6**
  * O esgotamento do IPv4 e a necessidade do IPv6.
  * Estrutura de 128 bits e representação hexadecimal.
  * Tipos de endereços IPv6: Unicast, Anycast e Multicast.

---

## 🛠️ Módulo 3: Protocolos de Transporte, Aplicação e Serviços de Rede (Semanas 9 a 12)

* **Semana 09: Camada de Transporte — TCP vs. UDP**
  * Protocolo TCP: orientado à conexão, Three-Way Handshake, controle de fluxo e confiabilidade.
  * Protocolo UDP: não orientado à conexão, baixa latência e casos de uso (streaming, jogos, DNS).
  * Portas lógicas bem conhecidas (0 a 1023), registradas e dinâmicas.
* **Semana 10: Serviços Fundamentais — DNS e DHCP**
  * Protocolo DHCP: atribuição dinâmica de configurações de rede (Processo DORA).
  * Protocolo DNS: resolução de nomes em endereços IP e hierarquia da internet.
  * Prática: Configuração de servidores DNS e DHCP no Packet Tracer.
* **Semana 11: Protocolos Web — HTTP, HTTPS e SSH**
  * Funcionamento do HTTP/1.1 e HTTP/2, métodos de requisição e códigos de resposta.
  * Segurança com HTTPS, certificados digitais e criptografia TLS/SSL.
  * Conexão remota segura via SSH vs. insegurança do Telnet.
* **Semana 12: Análise de Tráfego com Wireshark**
  * Introdução ao analisador de pacotes Wireshark.
  * Captura e filtragem de pacotes na interface local (filtros `http`, `dns`, `icmp`, `tcp.port`).
  * Inspeção de cabeçalhos e compreensão do fluxo real de pacotes.

---

## 🤖 Módulo 4: Arquitetura de Hardware e Redes em IoT (Semanas 13 a 16)

* **Semana 13: Introdução à Internet das Coisas (IoT)**
  * Conceito, pilares e aplicações da IoT e IIoT (IoT Industrial).
  * Diferença entre microprocessadores (Raspberry Pi) e microcontroladores (Arduino, ESP32, ESP8266).
  * Mapeamento de componentes: sensores (temperatura, presença, luz) e atuadores (relés, motores, LEDs).
* **Semana 14: Hardware IoT e Conectividade sem Fio**
  * Especificações e recursos do microcontrolador ESP32 (Wi-Fi e Bluetooth nativos).
  * Pinos GPIO: entradas e saídas digitais e analógicas (ADC/DAC).
  * Simulação de circuitos no simulador virtual Wokwi.
* **Semana 15: Protocolos Específicos para IoT — MQTT vs. HTTP**
  * As limitações do protocolo HTTP em redes IoT com restrição de banda e energia.
  * O padrão MQTT: arquitetura Publish/Subscribe (Publisher, Broker, Subscriber).
  * Tópicos MQTT, níveis de QoS (Quality of Service) e mensagens Keep-Alive.
* **Semana 16: Redes IoT de Longo Alcance e Baixo Consumo (LPWAN)**
  * Introdução a tecnologias LPWAN: LoRaWAN, Sigfox e NB-IoT.
  * Características de alcance (km) vs. taxa de transferência de dados.
  * Cenários de aplicação no agronegócio, cidades inteligentes e rastreamento.

---

## ☁️ Módulo 5: Nuvem, Integração de Dados e Projeto Prático (Semanas 17 a 20)

* **Semana 17: Conectando Dispositivos IoT a Brokers na Nuvem**
  * Conexão do ESP32 (Wokwi) ao Wi-Fi.
  * Envio de telemetria simulada para um broker público MQTT (HiveMQ / EMQX).
  * Subscrição em tópicos para acionamento remoto de atuadores via aplicativo ou web.
* **Semana 18: Armazenamento e Visualização de Dados de Telemetria**
  * Integração de dados de IoT com plataformas de dashboards (ThingSpeak / Adafruit IO / Node-RED).
  * Criação de gráficos em tempo real de temperatura e umidade.
  * Configuração de alertas automáticos baseados em limites de sensores.
* **Semana 19: Segurança em Redes e Ambientes IoT**
  * Vulnerabilidades comuns em dispositivos IoT e botnets famosas (ex: Mirai).
  * Boas práticas: alteração de credenciais padrão, atualização de firmware, segmentação de rede (VLAN para IoT).
  * Autenticação e criptografia no MQTT com MQTTS (porta 8883).
* **Semana 20: Apresentação do Projeto Integrador de Redes e IoT**
  * Entrega do projeto funcional: Topologia de rede simulada com dispositivos IoT publicando dados em tempo real em broker na nuvem.
  * Demonstração do dashboard de monitoramento.
  * Avaliação das competências técnicas de conectividade e documentação no GitHub.
