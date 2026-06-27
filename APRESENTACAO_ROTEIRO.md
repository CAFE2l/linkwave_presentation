# Roteiro de Apresentação — LinkWave

## Visão geral

**Tempo estimado:** 8 a 10 minutos  
**Apresentadores:** Lucas, CAFÉ e Emy  
**Objetivo:** apresentar o problema que motivou o LinkWave, a solução desenvolvida, seu funcionamento técnico, os recursos de análise de dados e os principais resultados do projeto.

---

## Slide 1 — Capa

**Apresentador:** CAFÉ

### Objetivo do slide

Apresentar o projeto, os integrantes e explicar de forma breve o que é o LinkWave.

### Fala sugerida

> Bom dia. Nós somos Lucas, CAFÉ e Emy, e vamos apresentar o LinkWave. O LinkWave é uma plataforma de Link in Bio, criada para reunir a presença digital de uma pessoa ou empresa em uma única página. Em vez de divulgar vários endereços separadamente, o usuário pode organizar seus principais links em um perfil próprio, fácil de acessar e compartilhar. Durante a apresentação, vamos mostrar o problema que identificamos, a solução que desenvolvemos, como o sistema funciona e os resultados do projeto.

### Pontos para lembrar

- Dizer o nome do projeto e dos três integrantes.
- Explicar Link in Bio como uma página que reúne vários links.
- Antecipar que serão mostradas tanto a solução quanto sua construção.

### Transição

> Para começar, vamos entender qual problema levou à criação do LinkWave.

---

## Slide 2 — Problema

**Apresentador:** Lucas

### Objetivo do slide

Mostrar a dificuldade de organizar e compartilhar vários canais digitais ao mesmo tempo.

### Fala sugerida

> Hoje, uma pessoa ou empresa pode estar presente em várias plataformas ao mesmo tempo, como Instagram, YouTube, TikTok, GitHub, Portfólio, Loja Online e WhatsApp. O problema é que esses links acabam espalhados, o que dificulta tanto o compartilhamento quanto o acesso do público. Por exemplo, um criador pode querer divulgar um vídeo, uma loja e um contato, mas ter espaço para apenas um link na biografia. Isso gera desorganização e pode fazer com que oportunidades de acesso, contato ou venda sejam perdidas.

### Pontos para lembrar

- Dar exemplos de links espalhados em diferentes plataformas.
- Explicar que o problema afeta organização, compartilhamento e conversão.
- Usar o limite de um link na biografia como exemplo simples.

### Transição

> Foi para resolver essa dificuldade que desenvolvemos a proposta do LinkWave.

---

## Slide 3 — Solução

**Apresentador:** Emy

### Objetivo do slide

Explicar como o LinkWave centraliza os links e quais usuários e funcionalidades atende.

### Fala sugerida

> O LinkWave resolve esse problema centralizando todos esses endereços em uma única página pública e personalizável. A plataforma atende criadores, empresas, streamers, influenciadores e também profissionais como desenvolvedores, designers, fotógrafos e editores. No sistema, o usuário pode fazer cadastro e login, recuperar a senha, editar o perfil, adicionar links e redes sociais e personalizar sua página. O fluxo é simples: cadastro, login, acesso ao dashboard, criação dos links, personalização do perfil e, por fim, publicação da página.

### Pontos para lembrar

- Destacar que todos os links ficam em uma única página.
- Citar os diferentes públicos atendidos.
- Lembrar o fluxo: cadastro → login → dashboard → criar links → personalizar perfil → publicar página.
- Mencionar a página pública como resultado final.

### Transição

> Para construir essa experiência de forma moderna e segura, utilizamos um conjunto de tecnologias próprias para aplicações web.

---

## Slide 4 — Tecnologias

**Apresentador:** CAFÉ

### Objetivo do slide

Apresentar as principais tecnologias do projeto e a função geral de cada grupo.

### Fala sugerida

> Na base do projeto usamos Next.js, React e TypeScript, que organizam a aplicação e ajudam a criar uma interface confiável e interativa. O visual foi desenvolvido com Tailwind CSS, e o Framer Motion foi usado nas animações. Para formulários e validações, trabalhamos com React Hook Form e Zod. Os dados e a autenticação ficam no Supabase, que utiliza PostgreSQL. Também usamos Recharts nos gráficos de analytics e Playwright nos testes automatizados. Cada ferramenta foi escolhida para atender uma necessidade real do sistema, sem aumentar a complexidade sem motivo.

### Pontos para lembrar

- Next.js, React e TypeScript formam a base da aplicação.
- Tailwind CSS cuida da estilização e Framer Motion das animações.
- Supabase e PostgreSQL armazenam os dados e apoiam a autenticação.
- Zod e React Hook Form apoiam validações e formulários.
- Recharts gera os gráficos e Playwright automatiza testes.

### Transição

> Agora que vimos as ferramentas, vamos entender como elas estão organizadas dentro da arquitetura.

---

## Slide 5 — Arquitetura

**Apresentador:** Lucas

### Objetivo do slide

Explicar, sem excesso de termos técnicos, o caminho percorrido por uma ação do usuário.

### Fala sugerida

> A arquitetura do LinkWave separa a interface, as regras do sistema e o armazenamento dos dados. Quando o usuário realiza uma ação, como criar um link, a interface feita em Next.js envia essa solicitação ao servidor. Nesse ponto, recursos do próprio Next.js, como Server Actions e API Routes, processam a operação. Os dados são validados com Zod, a autenticação é conferida pelo Supabase e só então a informação chega ao PostgreSQL. Depois, a resposta volta para a interface. Essa organização melhora a segurança e facilita a manutenção e a evolução do projeto.

### Pontos para lembrar

- Explicar o caminho: usuário → interface → servidor → validação → autenticação → banco → resposta.
- Server Actions e API Routes são recursos usados dentro do Next.js.
- Validações críticas são feitas no servidor.
- A separação deixa o sistema mais organizado, seguro e escalável.

### Transição

> No centro desse fluxo está o banco de dados, que organiza as informações dos usuários, perfis, links e acessos.

---

## Slide 6 — Banco de Dados

**Apresentador:** Emy

### Objetivo do slide

Apresentar o modelo de dados e explicar como a segurança protege as informações de cada usuário.

### Fala sugerida

> O banco do LinkWave utiliza Supabase com PostgreSQL. O cadastro de autenticação começa em `auth.users` e se relaciona com `public.users`, onde ficam os dados principais do usuário. A tabela `public.profiles` guarda a biografia, o tema e as preferências visuais. Em `public.links` ficam os links criados, e `public.clicks` registra os acessos recebidos. Também temos `registration_rate_limits`, que limita tentativas excessivas de cadastro e ajuda a evitar abusos. Além disso, usamos Row Level Security, ou RLS, para garantir que cada usuário só possa alterar os próprios dados.

### Pontos para lembrar

- O banco é PostgreSQL, fornecido pelo Supabase.
- Citar `auth.users`, `public.users`, `public.profiles`, `public.links`, `public.clicks` e `registration_rate_limits`.
- Explicar as tabelas pela finalidade, sem detalhar todos os campos.
- RLS impede que um usuário modifique dados de outro.

### Transição

> Com os links e os cliques organizados no banco, esses dados também podem gerar informações úteis sobre o uso da plataforma.

---

## Slide 7 — Ciência de Dados / Analytics

**Apresentador:** CAFÉ

### Objetivo do slide

Mostrar como os dados coletados são transformados em métricas e informações compreensíveis.

### Fala sugerida

> O módulo de analytics transforma o uso da plataforma em informações que ajudam a entender seu desempenho. Quando alguém acessa um link público, o sistema registra o clique e dados permitidos, como a data e uma localização aproximada quando disponível. A partir desses registros, conseguimos acompanhar o total de usuários, links criados e cliques, além do ranking dos links mais acessados, da distribuição geográfica e da evolução ao longo do tempo. Essas informações são apresentadas em indicadores e gráficos feitos com Recharts, facilitando a identificação de crescimento e engajamento.

### Pontos para lembrar

- O sistema registra cliques nos links públicos.
- As métricas incluem usuários, links, cliques, ranking, geografia e evolução temporal.
- Os gráficos facilitam a leitura dos dados.
- Analytics ajuda usuários e administradores a tomar decisões.
- São usados dados agregados, sem expor informações pessoais.

### Transição

> Depois de explicar a estrutura e os dados, vamos ver o LinkWave funcionando na prática.

---

## Slide 8 — Demonstração em Vídeo

**Apresentador:** Lucas

### Objetivo do slide

Orientar o público durante o vídeo e relacionar a demonstração às funcionalidades já apresentadas.

### Fala sugerida

> Neste vídeo, vamos acompanhar o fluxo principal do LinkWave. Primeiro, observem o acesso à conta e ao dashboard, que concentra as opções de gerenciamento. Em seguida, mostramos a criação e a organização dos links, a edição das informações do perfil e as opções de personalização. Por último, aparece a página pública pronta, que é o endereço compartilhado com os visitantes. O objetivo do vídeo é mostrar que, mesmo com toda a estrutura que explicamos, a utilização continua simples e não exige conhecimento de programação.

### Pontos para lembrar

- Testar o vídeo, o áudio e o modo de tela cheia antes da apresentação.
- Avisar ao público o que deve ser observado.
- Destacar dashboard, links, perfil, personalização e página pública.
- Se o vídeo falhar, explicar verbalmente o mesmo fluxo.

### Transição

> A demonstração reúne os principais pontos do projeto e nos permite destacar os resultados e diferenciais alcançados.

---

## Slide 9 — Resultados / Diferenciais

**Apresentador:** Emy

### Objetivo do slide

Sintetizar o que foi entregue e por que o LinkWave se diferencia como projeto.

### Fala sugerida

> Como resultado, entregamos uma plataforma funcional que cobre toda a jornada do usuário, desde o cadastro até a publicação de uma página própria. Um dos principais diferenciais é a liberdade de personalização, que permite criar uma identidade visual mais adequada para cada perfil. A interface moderna, inspirada no estilo Frutiger Aero, busca ser agradável e fácil de usar. O projeto também combina recursos importantes, como recuperação de senha, gerenciamento de links, redes sociais, página pública e analytics integrado, mantendo uma base segura e preparada para crescer.

### Pontos para lembrar

- O fluxo completo do usuário foi implementado.
- Personalização e identidade visual são diferenciais.
- A interface foi pensada para ser moderna e intuitiva.
- Analytics, segurança e organização técnica agregam valor.
- A plataforma atende tanto pessoas quanto empresas.

### Transição

> Para finalizar, vamos retomar o que o LinkWave representa e as possibilidades de evolução do projeto.

---

## Slide 10 — Conclusão

**Apresentador:** CAFÉ

### Objetivo do slide

Encerrar a apresentação reforçando a proposta, as qualidades do produto e sua capacidade de evolução.

### Fala sugerida

> Para concluir, o LinkWave nasceu de um problema comum: a dificuldade de organizar e compartilhar vários canais digitais. Nossa solução reúne esses conteúdos em uma página moderna, personalizável, intuitiva e profissional. Ao mesmo tempo, o projeto possui uma estrutura segura e escalável, capaz de receber novas funcionalidades no futuro. Mais do que apenas agrupar links, o LinkWave ajuda cada usuário a apresentar sua identidade e acompanhar o interesse do público. Obrigado pela atenção. Agora ficamos à disposição para perguntas.

### Pontos para lembrar

- Retomar o problema e a solução em uma frase.
- Reforçar: moderno, personalizável, intuitivo, profissional e escalável.
- Agradecer à turma e abrir espaço para perguntas.
- Encerrar com calma, sem correr a última frase.

### Transição

> Obrigado pela atenção. Ficamos à disposição para responder às perguntas.

---

## Dicas para apresentação

- Não leiam o slide inteiro. Usem o conteúdo visual apenas como apoio para a explicação.
- Olhem para a sala e alternem o contato visual entre diferentes partes do público.
- Falem devagar, com volume suficiente e pequenas pausas entre as ideias.
- Expliquem os termos com exemplos simples, principalmente arquitetura, banco de dados e analytics.
- Usem o vídeo como apoio à demonstração, mas saibam explicar o fluxo caso ele não seja reproduzido.
- Cada apresentador deve conhecer bem a própria parte e também ter uma visão geral do projeto.
- Treinem as transições para evitar silêncio ou interrupções durante a troca de apresentador.
- Façam pelo menos um ensaio completo, cronometrando a apresentação.
- Antes de começar, confirmem se o vídeo, os slides e a conexão necessária estão funcionando.
- Evitem decorar palavra por palavra. Memorizem a sequência das ideias e falem com naturalidade.

## Divisão sugerida dos apresentadores

- **CAFÉ:** slides 1, 4, 7 e 10 — abertura, tecnologias, analytics e conclusão.
- **Lucas:** slides 2, 5 e 8 — problema, arquitetura e demonstração.
- **Emy:** slides 3, 6 e 9 — solução, banco de dados e resultados.
