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
DROP TABLE IF EXISTS phases;
CREATE TABLE phases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phase_number INT NOT NULL UNIQUE,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    required_stars INT DEFAULT 3,
    explanation TEXT
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



INSERT INTO phases (phase_number, title, description, explanation) VALUES
(1, 'Estrelas', 'Operações básicas: Adição e subtração', 'Aprenda a somar e subtrair números inteiros para começar sua jornada espacial.'),
(2, 'Foguetes', 'Multiplicação', 'Domine a multiplicação para lançar foguetes ao espaço.'),
(3, 'Planeta Vermelho', 'Divisão', 'Pratique a divisão para explorar o terreno marciano.'),
(4, 'Lua Cheia', 'Equações com operações mistas', 'Resolva equações simples combinando adição, subtração, multiplicação e divisão.'),
(5, 'Anéis de Saturno', 'Geometria: Perímetros de polígonos', 'Calcule perímetros de figuras como triângulos e quadrados.'),
(6, 'Cometas', 'Geometria: Áreas de polígonos', 'Descubra como calcular áreas de figuras planas.'),
(7, 'Astronautas', 'Geometria: Ângulos', 'Entenda ângulos em triângulos e outras figuras.'),
(8, 'Nebulosa', 'Geometria: Círculos (perímetro e área)', 'Explore círculos, calculando circunferência e área.'),
(9, 'Estação Espacial', 'Geometria: Volume de cubos e paralelepípedos', 'Calcule volumes de sólidos tridimensionais simples.'),
(10, 'Buraco Negro', 'Geometria: Teorema de Pitágoras', 'Use o Teorema de Pitágoras para resolver triângulos retângulos.'),
(11, 'Via Láctea', 'Geometria: Semelhança de triângulos', 'Aplique a semelhança para resolver problemas geométricos.'),
(12, 'Sol Brilhante', 'Álgebra: Frações (soma e subtração)', 'Some e subtraia frações com denominadores diferentes.'),
(13, 'Marte', 'Álgebra: Frações (multiplicação e divisão)', 'Multiplique e divida frações para planejar missões.'),
(14, 'Júpiter', 'Álgebra: Expoentes básicos', 'Entenda potências e suas propriedades.'),
(15, 'Órbita', 'Álgebra: Equações lineares com uma variável', 'Resolva equações do tipo ax + b = c.'),
(16, 'Asteroides', 'Álgebra: Sistemas de equações lineares', 'Resolva sistemas com duas variáveis.'),
(17, 'Galáxia', 'Álgebra: Expoentes avançados', 'Trabalhe com expoentes negativos e frações.'),
(18, 'Nave Espacial', 'Álgebra: Inequações lineares', 'Resolva inequações para navegar pelo espaço.'),
(19, 'Planeta Gelado', 'Funções de segundo grau', 'Explore parábolas e resolva equações quadráticas.'),
(20, 'Universo', 'Desafio cósmico misto', 'Resolva problemas que combinam operações, geometria e álgebra!');


CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phase_id INT NOT NULL,
    question_number INT NOT NULL, -- 1 a 5
    question_text TEXT NOT NULL, -- Ex.: "Qual é o valor de y quando x = 2 na equação y = 3x + 1?"
    option_a VARCHAR(255) NOT NULL, -- Ex.: "4"
    option_b VARCHAR(255) NOT NULL, -- Ex.: "7"
    option_c VARCHAR(255) NOT NULL, -- Ex.: "5"
    option_d VARCHAR(255) NOT NULL, -- Ex.: "8"
    correct_option CHAR(1) NOT NULL, -- 'a', 'b', 'c' ou 'd'
    FOREIGN KEY (phase_id) REFERENCES phases(id),
    UNIQUE (phase_id, question_number) -- Uma pergunta por número por fase
);

-- Fase 1
INSERT INTO questions (phase_id, question_number, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES
(1, 1, 'Quanto é 15 + 27?', '40', '42', '45', '38', 'b'),
(1, 2, 'Qual é o resultado de 34 - 19?', '15', '13', '17', '14', 'a'),
(1, 3, 'Quanto é -8 + 12?', '2', '4', '-4', '6', 'b'),
(1, 4, 'Se você subtrai 25 de 50, qual é o resultado?', '20', '25', '30', '15', 'b'),
(1, 5, 'Qual é o valor de 9 + (-5)?', '4', '5', '3', '14', 'a');

-- Fase 2
INSERT INTO questions (phase_id, question_number, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES
(2, 1, 'Quanto é 6 × 7?', '36', '42', '48', '40', 'b'),
(2, 2, 'Qual é o resultado de 9 × 4?', '32', '36', '40', '34', 'b'),
(2, 3, 'Quanto é 12 × 3?', '36', '33', '39', '30', 'a'),
(2, 4, 'Se você multiplica 5 por 8, qual é o resultado?', '35', '40', '45', '50', 'b'),
(2, 5, 'Qual é o valor de 7 × 6?', '42', '48', '36', '40', 'a');

-- Fase 3
INSERT INTO questions (phase_id, question_number, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES
(3, 1, 'Quanto é 24 ÷ 4?', '6', '5', '8', '7', 'a'),
(3, 2, 'Qual é o resultado de 36 ÷ 9?', '3', '4', '5', '6', 'b'),
(3, 3, 'Quanto é 45 ÷ 5?', '8', '9', '10', '7', 'b'),
(3, 4, 'Se você divide 28 por 7, qual é o resultado?', '3', '4', '5', '6', 'b'),
(3, 5, 'Qual é o valor de 60 ÷ 12?', '5', '6', '4', '7', 'a');

-- Fase 4
INSERT INTO questions (phase_id, question_number, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES
(4, 1, 'Resolva: 3 + 4 × 2 = ?', '14', '11', '10', '8', 'b'),
(4, 2, 'Qual é o valor de x em 5x - 8 = 12?', '4', '3', '5', '2', 'a'),
(4, 3, 'Resolva: 20 ÷ 4 + 3 = ?', '8', '7', '9', '6', 'a'),
(4, 4, 'Se 2x + 6 = 14, qual é o valor de x?', '3', '4', '5', '6', 'b'),
(4, 5, 'Qual é o resultado de 15 - 3 × 2?', '9', '12', '6', '10', 'c');

-- Fase 5
INSERT INTO questions (phase_id, question_number, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES
(5, 1, 'Qual é o perímetro de um quadrado com lado 5 cm?', '15 cm', '20 cm', '25 cm', '10 cm', 'b'),
(5, 2, 'Um triângulo tem lados 3 cm, 4 cm e 5 cm. Qual é o perímetro?', '12 cm', '10 cm', '14 cm', '11 cm', 'a'),
(5, 3, 'Qual é o perímetro de um retângulo com comprimento 6 cm e largura 4 cm?', '18 cm', '20 cm', '16 cm', '22 cm', 'b'),
(5, 4, 'Um pentágono regular tem lado 7 cm. Qual é o perímetro?', '28 cm', '35 cm', '30 cm', '40 cm', 'b'),
(5, 5, 'Se um triângulo tem lados 8 cm, 6 cm e 10 cm, qual é o perímetro?', '24 cm', '22 cm', '26 cm', '20 cm', 'a');

-- Fase 6
INSERT INTO questions (phase_id, question_number, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES
(6, 1, 'Qual é a área de um quadrado com lado 4 cm?', '16 cm²', '12 cm²', '20 cm²', '14 cm²', 'a'),
(6, 2, 'Um retângulo tem comprimento 5 cm e largura 3 cm. Qual é a área?', '15 cm²', '18 cm²', '12 cm²', '20 cm²', 'a'),
(6, 3, 'Qual é a área de um triângulo com base 6 cm e altura 4 cm?', '10 cm²', '12 cm²', '14 cm²', '8 cm²', 'b'),
(6, 4, 'Um paralelogramo tem base 7 cm e altura 5 cm. Qual é a área?', '30 cm²', '35 cm²', '28 cm²', '40 cm²', 'b'),
(6, 5, 'Qual é a área de um quadrado com lado 6 cm?', '30 cm²', '36 cm²', '32 cm²', '24 cm²', 'b');

-- Fase 7
INSERT INTO questions (phase_id, question_number, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES
(7, 1, 'Qual é a soma dos ângulos internos de um triângulo?', '180°', '360°', '90°', '270°', 'a'),
(7, 2, 'Um ângulo de 45° e outro de 60° estão em um triângulo. Qual é o terceiro ângulo?', '75°', '60°', '90°', '45°', 'a'),
(7, 3, 'Qual é a soma dos ângulos internos de um quadrado?', '360°', '180°', '270°', '450°', 'a'),
(7, 4, 'Se dois ângulos de um triângulo são 50° e 70°, qual é o terceiro?', '60°', '50°', '70°', '80°', 'a'),
(7, 5, 'Qual é o complemento de um ângulo de 35°?', '55°', '65°', '45°', '75°', 'a');

-- Fase 8
INSERT INTO questions (phase_id, question_number, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES
(8, 1, 'Qual é a circunferência de um círculo com raio 7 cm? (Use π ≈ 3,14)', '43,96 cm', '44 cm', '42 cm', '45 cm', 'a'),
(8, 2, 'Qual é a área de um círculo com raio 5 cm? (Use π ≈ 3,14)', '78,5 cm²', '75 cm²', '80 cm²', '70 cm²', 'a'),
(8, 3, 'Um círculo tem diâmetro 10 cm. Qual é a circunferência? (Use π ≈ 3,14)', '31,4 cm', '30 cm', '32 cm', '28 cm', 'a'),
(8, 4, 'Qual é a área de um círculo com diâmetro 8 cm? (Use π ≈ 3,14)', '50,24 cm²', '48 cm²', '52 cm²', '46 cm²', 'a'),
(8, 5, 'Se a circunferência de um círculo é 25,12 cm, qual é o raio? (Use π ≈ 3,14)', '4 cm', '5 cm', '3 cm', '6 cm', 'a');

-- Fase 9
INSERT INTO questions (phase_id, question_number, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES
(9, 1, 'Qual é o volume de um cubo com aresta 3 cm?', '27 cm³', '24 cm³', '30 cm³', '18 cm³', 'a'),
(9, 2, 'Um paralelepípedo tem 4 cm de comprimento, 3 cm de largura e 5 cm de altura. Qual é o volume?', '60 cm³', '50 cm³', '55 cm³', '65 cm³', 'a'),
(9, 3, 'Qual é o volume de um cubo com aresta 6 cm?', '216 cm³', '200 cm³', '180 cm³', '240 cm³', 'a'),
(9, 4, 'Um paralelepípedo tem base 5 cm × 4 cm e altura 3 cm. Qual é o volume?', '60 cm³', '50 cm³', '70 cm³', '55 cm³', 'a'),
(9, 5, 'Se um cubo tem volume 64 cm³, qual é a aresta?', '4 cm', '5 cm', '3 cm', '6 cm', 'a');

-- Fase 10
INSERT INTO questions (phase_id, question_number, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES
(10, 1, 'Em um triângulo retângulo, os catetos são 3 cm e 4 cm. Qual é a hipotenusa?', '5 cm', '6 cm', '7 cm', '4 cm', 'a'),
(10, 2, 'Qual é o cateto de um triângulo retângulo com hipotenusa 13 cm e outro cateto 5 cm?', '12 cm', '10 cm', '8 cm', '11 cm', 'a'),
(10, 3, 'Um triângulo retângulo tem catetos 6 cm e 8 cm. Qual é a hipotenusa?', '10 cm', '12 cm', '14 cm', '9 cm', 'a'),
(10, 4, 'Se a hipotenusa é 17 cm e um cateto é 8 cm, qual é o outro cateto?', '15 cm', '12 cm', '10 cm', '14 cm', 'a'),
(10, 5, 'Qual é a hipotenusa de um triângulo retângulo com catetos 9 cm e 12 cm?', '15 cm', '13 cm', '14 cm', '16 cm', 'a');

-- Fase 11
INSERT INTO questions (phase_id, question_number, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES
(11, 1, 'Dois triângulos são semelhantes. Um tem lados 3, 4, 5 e o outro 6, 8, x. Qual é x?', '10', '9', '12', '8', 'a'),
(11, 2, 'A razão de semelhança entre dois triângulos é 2:1. Se um lado do menor é 5 cm, qual é o correspondente no maior?', '10 cm', '8 cm', '12 cm', '7 cm', 'a'),
(11, 3, 'Em triângulos semelhantes, um lado é 4 cm e o correspondente é 12 cm. Qual é a razão de semelhança?', '1:3', '3:1', '2:1', '1:2', 'a'),
(11, 4, 'Se um triângulo tem lados 6, 8, 10 e outro semelhante tem lado 9, qual é o perímetro do segundo?', '27', '24', '30', '21', 'a'),
(11, 5, 'A altura de um triângulo é 3 cm e a do semelhante é 9 cm. Qual é a razão de semelhança?', '1:3', '3:1', '2:1', '1:2', 'a');

-- Fase 12
INSERT INTO questions (phase_id, question_number, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES
(12, 1, 'Quanto é 1/2 + 1/4?', '3/4', '2/3', '1/3', '5/6', 'a'),
(12, 2, 'Qual é o resultado de 3/5 - 1/5?', '2/5', '1/5', '3/10', '4/5', 'a'),
(12, 3, 'Some 2/3 + 1/6.', '5/6', '3/6', '4/6', '7/6', 'a'),
(12, 4, 'Subtraia 7/8 - 3/8.', '1/2', '4/8', '1/4', '5/8', 'a'),
(12, 5, 'Qual é o valor de 5/6 - 1/3?', '1/2', '2/3', '1/3', '4/6', 'a');

-- Fase 13
INSERT INTO questions (phase_id, question_number, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES
(13, 1, 'Quanto é 2/3 × 3/4?', '1/2', '3/7', '5/6', '2/4', 'a'),
(13, 2, 'Qual é o resultado de 1/5 ÷ 2/3?', '3/10', '2/5', '1/3', '5/6', 'a'),
(13, 3, 'Multiplique 4/5 por 3/2.', '6/5', '7/10', '5/6', '12/10', 'a'),
(13, 4, 'Divida 3/4 por 1/2.', '3/2', '1/2', '2/3', '4/3', 'a'),
(13, 5, 'Qual é o valor de 5/6 × 2/5?', '1/3', '2/3', '5/15', '10/30', 'a');

-- Fase 14
INSERT INTO questions (phase_id, question_number, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES
(14, 1, 'Quanto é 2³?', '6', '8', '10', '4', 'b'),
(14, 2, 'Qual é o valor de 5²?', '20', '25', '15', '30', 'b'),
(14, 3, 'Resolva 3⁴.', '81', '64', '27', '54', 'a'),
(14, 4, 'Se 4² = x, qual é x?', '12', '16', '20', '8', 'b'),
(14, 5, 'Qual é o resultado de 10¹?', '10', '1', '100', '0', 'a');

-- Fase 15
INSERT INTO questions (phase_id, question_number, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES
(15, 1, 'Resolva: 2x + 3 = 11. Qual é x?', '4', '3', '5', '2', 'a'),
(15, 2, 'Qual é o valor de x em 5x - 7 = 13?', '4', '3', '5', '2', 'a'),
(15, 3, 'Se 3x + 8 = 20, qual é x?', '4', '6', '5', '3', 'a'),
(15, 4, 'Resolva: 4x - 10 = 6. Qual é x?', '4', '2', '3', '5', 'a'),
(15, 5, 'Qual é x em 7x + 5 = 26?', '3', '4', '2', '5', 'a');

-- Fase 16
INSERT INTO questions (phase_id, question_number, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES
(16, 1, 'Resolva: x + y = 5 e x - y = 1. Qual é x?', '3', '2', '4', '5', 'a'),
(16, 2, 'Em 2x + y = 7 e x - y = 2, qual é y?', '1', '-1', '2', '0', 'a'),
(16, 3, 'Se 3x + 2y = 12 e x + y = 5, qual é x?', '2', '3', '4', '1', 'a'),
(16, 4, 'Resolva: 4x - y = 10 e 2x + y = 8. Qual é y?', '2', '1', '3', '-2', 'a'),
(16, 5, 'Qual é x em x + 3y = 7 e 2x - y = 4?', '3', '2', '5', '1', 'a');

-- Fase 17
INSERT INTO questions (phase_id, question_number, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES
(17, 1, 'Quanto é 2⁻²?', '1/4', '1/2', '4', '-4', 'a'),
(17, 2, 'Qual é o valor de (1/3)²?', '1/9', '1/6', '1/3', '9', 'a'),
(17, 3, 'Resolva 5⁰ × 3².', '9', '15', '0', '45', 'a'),
(17, 4, 'Se 4⁻¹ = x, qual é x?', '1/4', '1/2', '4', '-4', 'a'),
(17, 5, 'Qual é o resultado de (2/5)²?', '4/25', '2/25', '4/5', '1/5', 'a');

-- Fase 18
INSERT INTO questions (phase_id, question_number, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES
(18, 1, 'Resolva: 2x + 3 < 9. Qual é o maior valor inteiro de x?', '2', '3', '4', '1', 'a'),
(18, 2, 'Qual é o menor inteiro que satisfaz 5x - 2 > 8?', '3', '2', '4', '1', 'a'),
(18, 3, 'Se 3x + 4 ≤ 13, qual é o maior valor inteiro de x?', '3', '4', '2', '5', 'a'),
(18, 4, 'Resolva: 4x - 5 ≥ 7. Qual é o menor inteiro de x?', '3', '2', '4', '1', 'a'),
(18, 5, 'Qual é o maior inteiro em 7x + 1 < 22?', '2', '3', '4', '1', 'a');

-- Fase 19
INSERT INTO questions (phase_id, question_number, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES
(19, 1, 'Qual é uma raiz de x² - 9 = 0?', '3', '-3', '6', '0', 'a'),
(19, 2, 'Resolva x² + 2x - 3 = 0. Qual é uma solução?', '1', '-3', '2', '0', 'a'),
(19, 3, 'Qual é o vértice de y = x² - 4x + 3?', '(2, -1)', '(1, 0)', '(3, 2)', '(0, 3)', 'a'),
(19, 4, 'Se x² - 5x + 6 = 0, qual é uma raiz?', '2', '3', '1', '4', 'a'),
(19, 5, 'Qual é uma solução de x² + 4x + 4 = 0?', '-2', '2', '-4', '0', 'a');

-- Fase 20
INSERT INTO questions (phase_id, question_number, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES
(20, 1, 'Quanto é 3 × 4 + 6 ÷ 2?', '15', '14', '12', '18', 'a'),
(20, 2, 'Qual é a área de um triângulo com base 8 cm e altura 5 cm?', '20 cm²', '25 cm²', '40 cm²', '15 cm²', 'a'),
(20, 3, 'Resolva: 2x + 3 = 11. Qual é x?', '4', '3', '5', '2', 'a'),
(20, 4, 'Qual é o volume de um cubo com aresta 4 cm?', '64 cm³', '48 cm³', '56 cm³', '72 cm³', 'a'),
(20, 5, 'Se x² - 4 = 0, qual é uma raiz?', '2', '-2', '4', '0', 'a');