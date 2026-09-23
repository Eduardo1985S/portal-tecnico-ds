---
id: tecnico-desenvolvimento-sistemas-4-semestre-programacao-para-dispositivos-moveis-aula-19-desenvolvimento-do-projeto-final-parte-2
slug: /tecnico-desenvolvimento-sistemas/4-semestre/programacao-para-dispositivos-moveis/aula-19-desenvolvimento-do-projeto-final-parte-2
sidebar_position: 19
title: "Aula 19 — Desenvolvimento do Projeto Final (Parte 2: Integração e Estabilidade)"
description: Conecte o aplicativo à API Back-End em produção, finalize os recursos nativos e execute a caça a bugs no mobile.
---

# Aula 19 — Desenvolvimento do Projeto Final (Parte 2: Integração e Estabilidade)

## <i className="fa-solid fa-bullseye" style={{ color: 'var(--ifm-color-primary)' }}></i> Objetivo da aula

Executar a segunda etapa de desenvolvimento do aplicativo mobile, realizando a conexão definitiva de todos os formulários e listagens com a API Back-End hospedada na nuvem (ou Firebase), integrando os recursos nativos de hardware e executando uma rodada intensiva de testes funcionais em aparelhos físicos.

---

## <i className="fa-solid fa-book" style={{ color: 'var(--ifm-color-primary)' }}></i> Conteúdos trabalhados

- Configuração da URL de produção da API no Axios (`https://api-meu-projeto.onrender.com`).
- Fluxo completo: Login → Armazenamento de Token → Chamadas Autenticadas → Logout.
- Integração do recurso nativo (Câmera, Localização, Notificações ou SQLite).
- Otimização do consumo de memória em listas longas com `removeClippedSubviews` e `initialNumToRender`.
- Sessão de Caça a Bugs em diferentes modelos e tamanhos de telas de celular.

---

## <i className="fa-solid fa-brain" style={{ color: 'var(--ifm-color-primary)' }}></i> Explicação

### Do `localhost` para a Nuvem de Produção
Até as aulas anteriores, utilizávamos endereços locais (`10.0.2.2` ou o IP da rede Wi-Fi da escola). Para que o aplicativo funcione em qualquer lugar do mundo (no celular de qualquer pessoa na rua via 4G), configuramos a URL definitiva gerada pelo deploy da API Back-End:

```javascript
// src/services/api.js
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api-tds-turma.onrender.com', // API hospedada com HTTPS!
  timeout: 15000,
});
```

Com a API em nuvem, não há mais problemas de queda de Wi-Fi local ou troca de IPs da máquina do laboratório!

---

## <i className="fa-solid fa-laptop-code" style={{ color: 'var(--ifm-color-primary)' }}></i> Dicas de Performance para a `<FlatList>`

Em aplicativos móveis profissionais, uma lista que engasga arruína a impressão da banca avaliadora. Aplique estas propriedades na sua `<FlatList>`:

```jsx
<FlatList
  data={produtos}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <CardProduto produto={item} />}
  // Otimizações de Memória e Fluidez:
  initialNumToRender={10}           // Renderiza apenas os 10 primeiros inicialmente
  maxToRenderPerBatch={10}          // Renderiza em lotes de 10 conforme o scroll
  windowSize={5}                    // Mantém na memória apenas o equivalente a 5 telas
  removeClippedSubviews={true}      // Desaloca elementos que saíram da visão no Android
/>
```

---

## <i className="fa-solid fa-flask" style={{ color: 'var(--ifm-color-primary)' }}></i> Atividade prática: Sessão de Homologação em Aparelhos Reais

1. Atualize a `baseURL` da `api.js` com a URL real da sua API publicada no Render/Railway.
2. Execute todos os fluxos críticos diretamente no seu smartphone via Expo Go:
   - Crie uma nova conta com seu e-mail real.
   - Faça login e comprove a persistência fechando e reabrindo o app.
   - Cadastre um item anexando foto da câmera do celular.
   - Visualize a lista e execute uma alteração e uma exclusão.
3. Peça para dois colegas de outros grupos testarem o app e anotarem qualquer comportamento estranho (texto cortado, botões pequenos, travamentos).
4. Corrija todas as inconsistências visuais e lógicas antes da aula de geração do APK!

---

## <i className="fa-solid fa-list-check" style={{ color: 'var(--ifm-color-primary)' }}></i> Checklist de entrega

- [ ] O app consome a API oficial hospedada em nuvem com HTTPS.
- [ ] O fluxo de login e logout está 100% estável e não trava em nenhuma condição.
- [ ] A captura de fotos ou GPS funciona em aparelhos físicos reais.
- [ ] Todas as listas rolam suavemente a 60 FPS com os parâmetros de otimização aplicados.

---

## <i className="fa-solid fa-rocket" style={{ color: 'var(--ifm-color-primary)' }}></i> Agora é com você!

Adicione o recurso de **Pull-to-Refresh** na sua lista usando a propriedade `refreshing={carregando}` e `onRefresh={buscarDados}` da `<FlatList>`. Quando o usuário puxar a lista de cima para baixo, o aplicativo deve buscar os dados mais recentes do servidor exibindo o indicador giratório nativo!
