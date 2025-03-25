# MathLingo 🚀

MathLingo é uma plataforma divertida e interativa para aprender matemática, inspirada no estilo do Duolingo. Com um tema espacial, o projeto guia os usuários por uma jornada de aprendizado com a ajuda da mascote Laika, uma astronauta canina que foi ao espaço em 1957. O objetivo é tornar o aprendizado de matemática envolvente, com desafios diários, recompensas, e um mapa de fases que desbloqueia conforme o progresso do usuário.

Este projeto foi desenvolvido como uma aplicação web com um backend em Node.js (Express e Sequelize) e um frontend estático (HTML, CSS, JavaScript). Ele inclui autenticação de usuários, um mapa de fases dinâmico, e está pronto para ser expandido com desafios de matemática interativos.

## 📋 Funcionalidades
- **Autenticação de Usuários**: Cadastro e login com email e senha, usando bcrypt para hashear senhas.
- **Mapa de Fases**: Um mapa com 20 fases organizadas em 4 linhas, que desbloqueiam conforme o progresso do usuário.
- **Progresso do Usuário**: O progresso é salvo no banco de dados e exibido dinamicamente no mapa de fases.
- **Tema Espacial**: Design com estrelas dinâmicas, planetas, e a mascote Laika, usando Tailwind CSS e animações com GSAP.
- **API REST**: Backend com rotas para autenticação (/api/register, /api/login) e progresso (/api/progress/:userId).

## 🛠️ Tecnologias Utilizadas
- **Backend:**
    - Node.js
    - Express
    - Sequelize (ORM para MySQL)
    - MySQL (banco de dados)
    - Bcrypt (para hashear senhas)
  
- **Frontend:**
    - HTML, CSS, JavaScript
    - Tailwind CSS (framework de estilização)
    - GSAP (animações)
    - Axios (requisições HTTP)
- **Ferramentas de Desenvolvimento:**
    - Nodemon (para reiniciar o servidor automaticamente durante o desenvolvimento)

## 📂 Estrutura do Projeto
```text
mathlingo/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js        # Configuração do Sequelize (MySQL)
│   │   ├── models/
│   │   │   ├── User.js            # Modelo de usuário
│   │   │   ├── Phase.js           # Modelo de fases
│   │   │   └── UserProgress.js    # Modelo de progresso do usuário
│   │   ├── routes/
│   │   │   ├── authRoutes.js      # Rotas de autenticação (login, register)
│   │   │   └── phaseRoutes.js     # Rotas para progresso do usuário
│   │   └── index.js               # Arquivo principal do backend
│   ├── node_modules/
│   ├── package.json
│   └── package-lock.json
├── public/
│   ├── assets/
│   │   ├── phases/
│   │   │   ├── phase_1.png
│   │   │   ├── phase_2.png
│   │   │   └── ...                # Imagens das fases (até phase_20.png)
│   │   ├── laika_astronaut.png    # Imagem da mascote Laika
│   │   └── planet.png             # Imagem de planeta
│   ├── css/
│   │   ├── phases.css             # Estilos do mapa de fases
│   │   └── styles.css             # Estilos gerais
│   ├── js/
│   │   ├── animate/
│   │   │   └── animations.js      # Animações com GSAP
│   │   ├── requests/
│   │   │   ├── loginRequests.js   # Requisições de login
│   │   │   └── registerRequests.js # Requisições de cadastro
│   │   ├── main.js                # Scripts gerais
│   │   ├── phases.js              # Lógica do mapa de fases
│   │   ├── register.js            # Lógica da página de cadastro
│   │   └── welcome.js             # Lógica da página de boas-vindas
│   ├── index.html                 # Página inicial
│   ├── login.html                 # Página de login
│   ├── welcome.html               # Página de boas-vindas
│   ├── register.html              # Página de cadastro
│   ├── phases.html                # Mapa de fases
│   └── phase.html                 # Página de uma fase individual
└── README.md                      # Documentação do projeto
```