# ApoloPi 🚀🌌 - Plataforma de Aprendizagem de Matemática

Bem-vindo ao ApoloPi! Uma plataforma interativa e divertida para aprender matemática, inspirada no formato do Duolingo. Prepare-se para uma jornada espacial de conhecimento com nossa mascote, a Laika!

## Sumário

- [ApoloPi 🚀🌌 - Plataforma de Aprendizagem de Matemática](#apolopi----plataforma-de-aprendizagem-de-matemática)
  - [Sumário](#sumário)
  - [Descrição](#descrição)
  - [Funcionalidades Principais](#funcionalidades-principais)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [Banco de Dados](#banco-de-dados)
  - [Estrutura de Pastas](#estrutura-de-pastas)
  - [Pré-requisitos](#pré-requisitos)
  - [Configuração e Instalação do Projeto](#configuração-e-instalação-do-projeto)
    - [Backend](#backend-1)
    - [Banco de Dados](#banco-de-dados-1)
  - [Como Rodar a Aplicação](#como-rodar-a-aplicação)
    - [1. Iniciar o Servidor Backend](#1-iniciar-o-servidor-backend)
    - [2. Acessar o Frontend](#2-acessar-o-frontend)
  - [Scripts Disponíveis (Backend)](#scripts-disponíveis-backend)
  - [Principais Endpoints da API](#principais-endpoints-da-api)
    - [Autenticação (`/api`)](#autenticação-api)
    - [Usuário (`/api`)](#usuário-api)
    - [Fases e Progresso (`/api`)](#fases-e-progresso-api)
  - [Licença](#licença)

## Descrição

O ApoloPi é um projeto web full-stack projetado para tornar o aprendizado da matemática uma experiência engajadora e gamificada. Os usuários podem se registrar, fazer login, progredir através de diferentes fases temáticas de matemática, responder a questões de múltipla escolha dentro de um limite de tempo, ganhar estrelas com base em seu desempenho e acompanhar seu progresso em um ranking geral. A aplicação combina um backend robusto construído com Node.js e Express, utilizando Sequelize como ORM para interagir com um banco de dados MySQL, e um frontend dinâmico composto por HTML, CSS (incluindo Tailwind CSS) e JavaScript para interatividade e animações (GSAP).

## Funcionalidades Principais

* **Autenticação de Usuários:**
    * Cadastro de novos usuários com hashing de senha (bcrypt).
    * Login de usuários existentes.
    * Autenticação baseada em JSON Web Tokens (JWT) para proteger rotas.
* **Gerenciamento de Perfil:**
    * Visualização e edição das informações do perfil do usuário (nome, email, senha).
    * Avatar padrão para usuários.
* **Sistema de Fases e Progressão:**
    * Mapa de fases visualmente organizado, mostrando fases completas, fase atual e fases bloqueadas.
    * Cada fase possui um título, descrição e conteúdo explicativo.
    * Progressão baseada na conclusão de fases anteriores.
* **Mecânica de Jogo por Fase:**
    * Apresentação de 10 questões aleatórias por fase.
    * Limite de tempo regressivo para completar a fase.
    * Ganho de tempo adicional por resposta correta.
    * Perda de tempo por resposta incorreta.
    * Limite de 3 erros permitidos por fase.
    * Feedback visual e sonoro para acertos e erros.
* **Acompanhamento de Progresso:**
    * Sistema de estrelas ganhas por fase (1 a 3 estrelas).
    * Registro de fases completas e última tentativa.
* **Ranking de Usuários:**
    * Exibição de um ranking geral dos usuários com base no total de estrelas acumuladas.
* **Interface de Usuário Temática:**
    * Design com tema espacial, incluindo a mascote Laika.
    * Animações (GSAP) para estrelas de fundo, planetas e interações de UI.
    * Sidebar de navegação responsiva.
* **Efeitos Sonoros:**
    * Sons para acerto/erro de questão.
    * Sons para vitória/derrota na fase.

## Tecnologias Utilizadas

### Backend
* **Node.js:** Ambiente de execução JavaScript.
* **Express.js:** Framework web para Node.js, usado para criar a API RESTful.
* **Sequelize:** ORM (Object-Relational Mapper) para Node.js, facilitando a interação com o banco de dados MySQL.
* **MySQL (via `mysql2`):** Driver para o banco de dados relacional MySQL.
* **bcrypt:** Biblioteca para hashing seguro de senhas.
* **jsonwebtoken (JWT):** Para implementação de autenticação baseada em tokens.
* **cors:** Middleware para habilitar Cross-Origin Resource Sharing.
* **dotenv:** Para carregar variáveis de ambiente a partir de um arquivo `.env`.
* **nodemon:** Ferramenta para reiniciar automaticamente o servidor Node.js durante o desenvolvimento.

### Frontend
* **HTML5:** Linguagem de marcação para a estrutura das páginas.
* **CSS3:** Para estilização, incluindo:
    * **Tailwind CSS:** Framework CSS utility-first para desenvolvimento rápido de UI.
    * CSS customizado (`styles.css`, `phases.css`, `sidebar.css`) para estilos específicos e animações.
* **JavaScript (ES6+):** Para lógica do lado do cliente, manipulação do DOM e interatividade.
    * **Fetch API / Axios:** Para realizar requisições assíncronas à API backend.
    * **GSAP (GreenSock Animation Platform):** Biblioteca para animações fluidas e complexas.
* **Assets:** Imagens (PNGs para fases, avatar, mascote) e arquivos de áudio (WAV para efeitos sonoros).

### Banco de Dados
* **MySQL (versão 8.0.41 conforme `database.sql`):** Sistema de Gerenciamento de Banco de Dados Relacional.
    * O schema inclui tabelas para `users`, `phases`, `questions`, e `user_progress`.

## Estrutura de Pastas

.├── backend/│   ├── config/│   │   └── database.js         # Configuração da conexão Sequelize│   ├── models/                 # Definições dos modelos Sequelize│   │   ├── User.js│   │   ├── Phase.js│   │   ├── Question.js│   │   └── UserProgress.js│   ├── routes/                 # Arquivos de rotas da API│   │   ├── authRoutes.js       # Rotas de autenticação (registro, login)│   │   ├── phaseRoutes.js      # Rotas relacionadas a fases e questões│   │   └── userRoutes.js       # Rotas de perfil de usuário e ranking│   ├── .env                    # Arquivo para variáveis de ambiente (NÃO versionar)│   ├── index.js                # Ponto de entrada do servidor Express│   ├── package-lock.json│   └── package.json│├── public/                     # Arquivos estáticos do frontend│   ├── assets/                 # Imagens e outros assets visuais│   │   ├── laika_astronaut.png│   │   ├── gohan_brabo2.png│   │   ├── planet.png│   │   └── phases/             # Imagens das fases (phase_1.png, etc.)│   ├── css/                    # Folhas de estilo CSS│   │   ├── phases.css│   │   ├── sidebar.css│   │   └── styles.css│   ├── js/                     # Scripts JavaScript do frontend│   │   ├── animate/│   │   │   └── animations.js   # Lógica para animações (estrelas, planetas)│   │   ├── requests/           # Scripts para requisições à API│   │   │   ├── loginRequests.js│   │   │   └── registerRequests.js│   │   ├── edit_user.js│   │   ├── main.js             # Script principal para login (pode ser refatorado)│   │   ├── phase.js            # Lógica da página de uma fase específica│   │   ├── phases.js           # Lógica da página do mapa de fases│   │   ├── ranking.js          # Lógica da página de ranking│   │   ├── register.js         # Script principal para registro (pode ser refatorado)│   │   └── sidebar.js          # Lógica para o menu lateral│   ├── musics/                 # Arquivos de áudio para efeitos sonoros│   │   ├── correct_question.wav│   │   ├── lose_phase.wav│   │   ├── lose_question.wav│   │   └── phase_win.wav│   ├── edit_user.html│   ├── index.html              # Página inicial da aplicação│   ├── login.html│   ├── phase.html│   ├── phases.html│   ├── ranking.html│   └── register.html│└── database.sql                # Script SQL para criar o banco de dados e tabelas
## Pré-requisitos

Antes de iniciar, certifique-se de ter o seguinte instalado em seu sistema:
* [Node.js](https://nodejs.org/) (versão LTS recomendada, que inclui npm)
* Servidor de Banco de Dados MySQL (ou um SGBD compatível com Sequelize e `mysql2`)
* Uma ferramenta de gerenciamento de banco de dados (ex: MySQL Workbench, DBeaver, HeidiSQL) ou acesso à linha de comando do MySQL.

## Configuração e Instalação do Projeto

Siga os passos abaixo para configurar o ambiente e rodar o projeto localmente.

### Backend

1.  **Clone o Repositório (se aplicável):**
    Se você obteve o projeto de um repositório Git:
    ```bash
    git clone <URL_DO_REPOSITORIO_GIT>
    cd <NOME_DA_PASTA_DO_PROJETO>
    ```
    Navegue até a subpasta `backend`:
    ```bash
    cd backend
    ```

2.  **Instale as Dependências:**
    Dentro da pasta `backend`, execute o comando:
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Na raiz da pasta `backend`, crie um arquivo chamado `.env`. Copie o conteúdo abaixo e substitua pelos seus dados de configuração:

    ```env
    # Configurações do Banco de Dados
    DB_HOST=127.0.0.1
    DB_PORT=3306 # Porta padrão do MySQL. Ajuste se o seu MySQL usar outra porta. O código tem um fallback para 4000 se DB_PORT não for definido.
    DB_DATABASE=math_duolingo # Nome do banco de dados que você criará
    DB_USERNAME=root # Seu nome de usuário do MySQL
    DB_PASSWORD=sua_senha_aqui # Sua senha do MySQL

    # Segredo para JWT
    JWT_SECRET=seu_segredo_super_secreto_e_longo_para_jwt # Use uma string longa e aleatória

    # Porta da Aplicação (opcional, padrão 3000)
    # PORT=3000
    ```
    **Importante:** O arquivo `config/database.js` possui uma configuração `ssl: { require: false, rejectUnauthorized: false }`. Isso geralmente é para desenvolvimento local ou bancos que não exigem SSL. Se for conectar a um banco de dados em produção que exija SSL (como algumas instâncias do TiDB Cloud ou outros DBaaS), essa configuração pode precisar ser ajustada.

### Banco de Dados

1.  **Crie o Banco de Dados:**
    Usando sua ferramenta de gerenciamento de banco de dados ou a linha de comando, crie um novo banco de dados com o nome que você especificou na variável `DB_DATABASE` do arquivo `.env` (ex: `math_duolingo`).
    Exemplo SQL: `CREATE DATABASE math_duolingo;`

2.  **Importe o Schema e Dados Iniciais:**
    Use o arquivo `database.sql` (localizado na raiz do projeto ou onde você o salvou) para criar as tabelas e popular alguns dados iniciais.
    * **Via Ferramenta Gráfica:** A maioria das ferramentas (MySQL Workbench, DBeaver, HeidiSQL) permite abrir um arquivo `.sql` e executá-lo no banco de dados selecionado.
    * **Via Linha de Comando MySQL:**
        ```bash
        mysql -u SEU_USUARIO_MYSQL -p NOME_DO_SEU_BANCO < /caminho/completo/para/database.sql
        ```
        Você será solicitado a digitar a senha do seu usuário MySQL.

## Como Rodar a Aplicação

### 1. Iniciar o Servidor Backend

1.  Certifique-se de que seu servidor de banco de dados MySQL esteja em execução.
2.  Abra um terminal e navegue até a pasta `backend` do projeto.
3.  Execute um dos seguintes comandos:
    * Para desenvolvimento (com reinício automático usando `nodemon`):
        ```bash
        npm run dev
        ```
    * Para produção:
        ```bash
        npm start
        ```
4.  Se tudo estiver correto, você verá mensagens no console indicando que o servidor está rodando (normalmente na porta 3000) e que a conexão com o banco de dados foi bem-sucedida.

### 2. Acessar o Frontend

1.  Após o servidor backend ser iniciado com sucesso.
2.  Abra seu navegador web de preferência.
3.  Navegue para o endereço: `http://localhost:3000` (ou a porta que seu servidor estiver usando).
4.  Isso deverá carregar a página `index.html` da aplicação ApoloPi.

## Scripts Disponíveis (Backend)

Localizados no `package.json` dentro da pasta `backend`:

* `npm start`: Executa `node index.js`. Usado para iniciar o servidor em um ambiente de produção ou de forma simples.
* `npm run dev`: Executa `nodemon index.js`. Usado durante o desenvolvimento para que o servidor reinicie automaticamente ao detectar alterações nos arquivos.

## Principais Endpoints da API

Todas as rotas da API são prefixadas com `/api`. A autenticação (envio de `Bearer Token` no header `Authorization`) é necessária para a maioria dos endpoints, exceto registro e login.

### Autenticação (`/api`)
* `POST /register`: Registra um novo usuário.
    * Corpo: `{ "name": "Seu Nome", "email": "email@example.com", "password": "sua_senha" }`
* `POST /login`: Autentica um usuário existente e retorna um token JWT.
    * Corpo: `{ "email": "email@example.com", "password": "sua_senha" }`

### Usuário (`/api`)
* `GET /user/:userId`: Obtém os dados do perfil do usuário especificado. (Requer autenticação)
* `PUT /user/:userId`: Atualiza os dados do perfil do usuário. (Requer autenticação)
    * Corpo: `{ "name": "Novo Nome", "email": "novo_email@example.com", "password": "(opcional) nova_senha", "confirmPassword": "(opcional) nova_senha" }`
* `GET /ranking`: Obtém a lista de usuários ranqueados por total de estrelas. (Requer autenticação)

### Fases e Progresso (`/api`)
* `GET /progress/:userId`: Obtém o progresso do usuário, incluindo a fase máxima alcançada. (Requer autenticação)
* `POST /progress`: Cria ou atualiza o registro de progresso de um usuário para uma fase. (Requer autenticação)
    * Corpo: `{ "userId": ID_DO_USUARIO, "phaseId": ID_DA_FASE, "starsEarned": NUMERO_DE_ESTRELAS, "completed": true/false }`
* `GET /questions/:phaseId`: Obtém 10 questões aleatórias para uma fase específica. (Requer autenticação)
* `GET /phases/:phaseId`: Obtém detalhes de uma fase específica (título, descrição, etc.). (Requer autenticação)

## Licença

Este projeto é licenciado sob a Licença ISC (conforme `package.json`).

---

Sinta-se à vontade para adicionar mais seções ou detalhes conforme seu projeto evolui!
