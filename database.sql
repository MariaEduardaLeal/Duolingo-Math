CREATE DATABASE math_duolingo;
USE math_duolingo;

-- Tabela de Usuários
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Armazene hash (ex.: bcrypt)
    avatar VARCHAR(255) DEFAULT 'cute_rocket.png',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Fases
CREATE TABLE phases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phase_number INT NOT NULL UNIQUE, -- 1 a 20
    title VARCHAR(100) NOT NULL, -- Ex.: "Estrelas"
    description TEXT, -- Ex.: "Padrões numéricos simples"
    required_stars INT DEFAULT 3 -- Estrelas necessárias para desbloquear próxima
);

-- Tabela de Progresso do Usuário
CREATE TABLE user_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    phase_id INT NOT NULL,
    stars_earned INT DEFAULT 0, -- 0 a 5
    completed BOOLEAN DEFAULT FALSE,
    last_attempt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (phase_id) REFERENCES phases(id),
    UNIQUE (user_id, phase_id) -- Um progresso por fase por usuário
);



INSERT INTO phases (phase_number, title, description) VALUES
(1, 'Estrelas', 'Padrões numéricos simples'),
(2, 'Foguetes', 'Adição com saltos'),
(3, 'Planeta Vermelho', 'Subtração com inversão'),
(4, 'Lua Cheia', 'Geometria: Perímetros simples'),
(5, 'Anéis de Saturno', 'Equações simples'),
(6, 'Cometas', 'Multiplicação com padrões'),
(7, 'Astronautas', 'Geometria: Áreas de quadrados'),
(8, 'Nebulosa', 'Divisão com grupos'),
(9, 'Estação Espacial', 'Porcentagem simples'),
(10, 'Buraco Negro', 'Equações com duas etapas'),
(11, 'Via Láctea', 'Geometria: Triângulos'),
(12, 'Sol Brilhante', 'Porcentagem com comparação'),
(13, 'Marte', 'Frações visuais'),
(14, 'Júpiter', 'Porcentagem e frações'),
(15, 'Órbita', 'Introdução a expoentes'),
(16, 'Asteroides', 'Geometria: Círculos'),
(17, 'Galáxia', 'Equações com expoentes'),
(18, 'Nave Espacial', 'Porcentagem em problemas'),
(19, 'Planeta Gelado', 'Equações de segundo grau simples'),
(20, 'Universo', 'Desafio cósmico misto');