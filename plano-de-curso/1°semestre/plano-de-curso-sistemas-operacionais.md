# Plano de Curso: Sistemas Operacionais (20 Semanas)

**Unidade Curricular:** Sistemas Operacionais  
**Carga Horária Total:** 90 horas  
**Carga Semanal:** 6 horas/semana (20 Semanas)  
**Módulo:** Módulo Básico — 1º Semestre  
**Ferramentas e Recursos:** Terminal Bash (Linux/Ubuntu), PowerShell, VirtualBox / WSL2 (Windows Subsystem for Linux), Docker Desktop, VS Code.

---

## 💻 Módulo 1: Arquitetura de Computadores e Hardware (Semanas 1 a 4)

* **Semana 01: Introdução aos Sistemas Operacionais e Arquitetura Von Neumann**
  * O que é um Sistema Operacional e seu papel como intermediário entre hardware e aplicações.
  * O modelo de Von Neumann: CPU (ULA, UC, Registradores), Memória Principal e Dispositivos de E/S.
  * O ciclo de instrução (Busca, Decodificação e Execução).
* **Semana 02: Componentes Físicos de Hardware e Barramentos**
  * Processadores (núcleos, threads, clock, arquiteturas x86_64 e ARM).
  * Memória RAM (DDR4/DDR5), memória ROM/BIOS/UEFI e processo de Boot (inicialização).
  * Barramentos de dados, controle e endereços; interfaces de armazenamento (SATA, NVMe PCIe).
* **Semana 03: Tipos e Evolução dos Sistemas Operacionais**
  * Sistemas Monotarefa vs. Multitarefa, Monousuário vs. Multiusuário.
  * Sistemas de Tempo Real (RTOS), Sistemas Embarcados e Sistemas de Servidores/Nuvem.
  * Comparativo estrutural: Família Windows NT vs. Família Unix/Linux vs. macOS.
* **Semana 04: Camadas do Sistema Operacional e o Núcleo (Kernel)**
  * Modo Usuário vs. Modo Kernel (Privilegiado).
  * Chamadas de Sistema (System Calls) e interrupções de hardware/software.
  * Tipos de Kernel: Monolítico, Microkernel e Híbrido.

---

## ⚙️ Módulo 2: Gerenciamento de Processos, Threads e Memória (Semanas 5 a 8)

* **Semana 05: Gerenciamento de Processos**
  * Conceito de Processo e Bloco de Controle de Processo (PCB).
  * Ciclo de vida e estados do processo: Novo, Pronto, Executando, Esperando e Terminado.
  * Comandos de inspeção de processos no terminal (`ps`, `top`, `htop`, `kill`).
* **Semana 06: Threads e Concorrência**
  * O que são Threads e a diferença entre Processo e Thread (espaço de memória compartilhado).
  * Programação Concorrente vs. Programação Paralela.
  * Problemas clássicos de concorrência: Condição de Corrida (Race Condition), Seção Crítica e Impasse (Deadlock).
* **Semana 07: Escalonamento de Processos (CPU Scheduling)**
  * Objetivos do escalonador: Throughput, tempo de resposta e justiça.
  * Algoritmos Preemptivos vs. Não-Preemptivos.
  * Algoritmos clássicos: FIFO (First In, First Out), SJF (Shortest Job First), Round Robin (Quantum de tempo) e Prioridades.
* **Semana 08: Gerenciamento de Memória Principal e Memória Virtual**
  * Alocação de memória: estática, dinâmica e fragmentação (interna e externa).
  * Conceito de Paginação e Tabela de Páginas (Page Table).
  * Memória Virtual, Swapping e falta de página (Page Fault).

---

## 📁 Módulo 3: Sistemas de Arquivos e Armazenamento (Semanas 9 a 11)

* **Semana 09: Estrutura dos Sistemas de Arquivos**
  * O que é um sistema de arquivos e como dados são organizados no disco em blocos/setores.
  * Comparativo de sistemas de arquivos: NTFS, FAT32/exFAT, ext4 e Btrfs.
  * Metadados, ponteiros de arquivos e Inodes no Linux.
* **Semana 10: Estrutura de Diretórios e Navegação no Linux**
  * A hierarquia da árvore de diretórios do Linux (`/`, `/bin`, `/etc`, `/home`, `/var`, `/tmp`).
  * Comandos essenciais de navegação e manipulação de arquivos: `pwd`, `cd`, `ls`, `mkdir`, `cp`, `mv`, `rm`.
  * Criação de links simbólicos (`ln -s`) e físicos.
* **Semana 11: Permissões de Acesso e Segurança de Arquivos**
  * Modelo de usuários, grupos e outros (`u`, `g`, `o`).
  * Tipos de permissões: Leitura (`r`), Escrita (`w`) e Execução (`x`).
  * Notação octal (ex: `chmod 755`, `chmod 644`, `chown`).
  * Prática: Configuração rigorosa de diretórios restritos para grupos específicos.

---

## 🐧 Módulo 4: Linha de Comando (CLI), Shell Script e Automação (Semanas 12 a 16)

* **Semana 12: Produtividade na Linha de Comando Bash**
  * Redirecionamento de Entrada/Saída padrão (`>`, `>>`, `<`) e Pipe (`|`).
  * Filtros e utilitários poderosos de texto: `grep`, `cat`, `less`, `wc`, `sort`, `uniq`.
  * Editores de texto no terminal: `nano` e conceitos fundamentais do `vim`.
* **Semana 13: Fundamentos de Shell Scripting**
  * Criação do primeiro script executável (`#!/bin/bash`).
  * Variáveis, constantes, parâmetros posicionais (`$1`, `$2`, `$#`, `$?`).
  * Comandos de leitura interativa (`read`) e saída formatada (`echo`).
* **Semana 14: Estruturas de Decisão e Operadores em Shell Script**
  * Estruturas condicionais: `if`, `elif`, `else` e `fi`.
  * Operadores de teste numérico (`-eq`, `-ne`, `-gt`, `-lt`) e de arquivos (`-f`, `-d`, `-e`, `-r`).
  * Estrutura de múltipla escolha: `case... in... esac`.
* **Semana 15: Laços de Repetição e Automação de Tarefas**
  * Laços de repetição: `for`, `while` e `until` no Bash.
  * Automação de tarefas recorrentes com o agendador `cron` e arquivo `crontab`.
  * Prática: Script automatizado de backup compactado de diretórios de projetos com carimbo de data.
* **Semana 16: Gerenciamento de Pacotes e Rede no Linux**
  * Gerenciadores de pacotes: `apt` (Debian/Ubuntu) e atualização de repositórios.
  * Diagnóstico de rede no terminal: `ip a`, `ping`, `traceroute`, `netstat`/`ss`, `curl`.
  * Gerenciamento de serviços com Systemd (`systemctl start`, `stop`, `status`, `enable`).

---

## 📦 Módulo 5: Virtualização, Contêineres e Projeto Prático (Semanas 17 a 20)

* **Semana 17: Virtualização de Sistemas**
  * O que é virtualização e Hypervisors: Tipo 1 (Bare Metal) vs. Tipo 2 (Hosted).
  * Criação e configuração de uma máquina virtual Linux no VirtualBox.
  * Instantâneos (Snapshots), clonagem e compartilhamento de pastas host-guest.
* **Semana 18: Introdução à Conteinerização com Docker**
  * Diferença essencial entre Máquina Virtual e Contêiner Docker (compartilhamento do Kernel).
  * Conceito de Imagens vs. Contêineres.
  * Primeiros comandos Docker: `docker run`, `docker ps`, `docker stop`, `docker images`.
* **Semana 19: Dockerfile e Criação de Imagens Customizadas**
  * Estrutura do `Dockerfile` (`FROM`, `WORKDIR`, `COPY`, `RUN`, `EXPOSE`, `CMD`).
  * Construção e execução de uma imagem contendo um ambiente de desenvolvimento Node.js/Linux.
  * Mapeamento de portas e volumes locais para persistência.
* **Semana 20: Fechamento, Projeto Prático e Avaliação**
  * Entrega do Projeto Final: Máquina virtual ou ambiente Docker provisionado com script de inicialização e rotinas de backup automatizadas.
  * Demonstração das rotinas de administração de sistemas via terminal.
  * Consolidação do portfólio de infraestrutura no GitHub.
