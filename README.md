# ApoloPi 🚀🧮

## Bem-vindo ao ApoloPi!

ApoloPi é uma plataforma divertida e interativa para aprender matemática, inspirada no estilo do Duolingo. Pratique conceitos matemáticos de forma gamificada com desafios cronometrados, recompensas e mascotes carismáticos que guiam sua jornada de aprendizado.

## Visão Geral

ApoloPi é um projeto full-stack desenvolvido com:
- Backend: Node.js
- Frontend: HTML/CSS/JavaScript
- Banco de Dados: MySQL

## Funcionalidades

### Autenticação
- Registro e login de usuários
- Criptografia de senhas com bcrypt

### Mapa de Fases
- Mapa visual com 20 fases
- Status das fases: concluído, atual, bloqueado

### Desafios de Matemática
- Questões por fase
- Temporizador de 90 segundos
  - +3 segundos ao acertar
  - -5 segundos ao errar
- Limite de 3 erros por fase
- Sistema de estrelas baseado em erros

### Mascotes
1. **Laika**: Cadela astronauta alegre
   - Celebra vitórias com mensagens motivadoras
2. **Gohan**: Gato mal-humorado
   - Zomba em caso de derrota

### Efeitos Sonoros
- `correct_question.wav`: Acerto de questão
- `lose_question.wav`: Erro de questão
- `phase_win.wav`: Completar fase
- `lose_phase.wav`: Perder fase

### Animações
- Estrelas e planetas animados com GSAP
- Barra de progresso com indicadores de tempo

## Estrutura do Projeto

```
ApoloPi/
├── .gitignore
├── arvore_filtrada.txt
├── database.sql
├── README.md
├── backend/
│   ├── .env
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── Phase.js
│   │   ├── Question.js
│   │   ├── User.js
│   │   └── UserProgress.js
│   └── routes/
│       ├── authRoutes.js
│       └── phaseRoutes.js
└── public/
    ├── index.html
    ├── login.html
    ├── phase.html
    ├── phases.html
    ├── register.html
    ├── welcome.html
    ├── assets/
    │   ├── gohan_brabo1.png
    │   ├── gohan_brabo2.png
    │   ├── gohan_brabo3.png
    │   ├── laika_astronat3.png
    │   ├── laika_astronaut.png
    │   ├── laika_astronaut2.png
    │   ├── laika_astronaut3.png
    │   ├── laika_no_satelite.png
    │   ├── laika_varios_angulos.jpeg
    │   ├── planet.jpg
    │   ├── planet.png
    │   ├── planets_and_stars.png
    │   ├── star.jpg
    │   ├── star_smile.png
    │   └── phases/
    │       ├── phase_1.png
    │       ├── phase_2.png
    │       ├── phase_3.png
    │       ├── ...
    │       └── phase_20.png
    ├── css/
    │   ├── phases.css
    │   └── styles.css
    ├── js/
    │   ├── main.js
    │   ├── phase.js
    │   ├── phases.js
    │   ├── register.js
    │   ├── welcome.js
    │   ├── animate/
    │   │   └── animations.js
    │   └── requests/
    │       ├── loginRequests.js
    │       └── registerRequests.js
    └── musics/
        ├── correct_question.wav
        ├── lose_phase.wav
        ├── lose_question.wav
        └── phase_win.wav
```

## Tecnologias Utilizadas

### Backend
- Node.js
- Express
- Sequelize
- MySQL
- bcrypt
- JWT

### Frontend
- HTML
- CSS (Tailwind CSS)
- JavaScript
- GSAP
- Axios

## Pré-requisitos

- Node.js
- MySQL

## Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/ApoloPi.git
cd ApoloPi
```

2. Instale as dependências do backend
```bash
cd backend
npm install
```

3. Configure o arquivo `.env`
```
DB_HOST=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
JWT_SECRET=
```

4. Banco de Dados
- Crie o banco de dados `math_duolingo` no MySQL
- Sequelize sincronizará as tabelas automaticamente

## Como Jogar

1. Faça login ou registre-se
2. Acesse o mapa de fases
3. Escolha uma fase desbloqueada
4. Responda às questões matemáticas
   - Acerte para ganhar 3 segundos
   - Erre e perca 5 segundos
5. Complete todas as questões ou perca após 3 erros/tempo esgotado

## Próximos Passos

- [ ] Adicionar mais questões matemáticas
- [ ] Implementar níveis de dificuldade
- [ ] Criar tela de perfil com estatísticas
- [ ] Adicionar animações para mascotes
- [ ] Integrar sistema de conquistas/recompensas

## Contribuições

Contribuições são bem-vindas! Abra issues ou envie pull requests com melhorias ou correções.

