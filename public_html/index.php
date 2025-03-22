<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MathLingo - Aprenda Matemática de Forma Divertida!</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: radial-gradient(circle, #4b0082, #1e0033);
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            text-align: center;
            color: #333;
        }
        .container {
            background-color: #fff;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 20px;
        }
        h1 {
            color: #4b0082;
            font-size: 2.5em;
            margin-bottom: 20px;
        }
        p {
            font-size: 1.2em;
            line-height: 1.6;
            margin-bottom: 30px;
        }
        .btn {
            display: inline-block;
            padding: 15px 30px;
            background-color:rgb(118, 11, 196);
            color: #fff;
            text-decoration: none;
            border-radius: 25px;
            font-size: 1.1em;
            font-weight: bold;
            transition: background-color 0.3s;
        }
        .btn:hover {
            background-color: #357abd;
        }
        .mascot {
            font-size: 1.5em;
            color: #e94e77;
            margin-top: 20px;
            font-style: italic;
        }
        .mascot img {
            width: 100px; /* Ajuste o tamanho conforme necessário */
            height: auto;
            vertical-align: middle;
            margin-left: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Bem-vindo ao MathLingo!</h1>
        <p>
            O MathLingo é uma plataforma divertida e interativa para aprender matemática, inspirada no estilo do Duolingo! 
            Aqui, você pode praticar conceitos matemáticos de forma simples e envolvente, com desafios diários e recompensas. 
            Conheça a Laika, nossa mascote astronauta, que vai te guiar nessa jornada rumo ao domínio da matemática!
        </p>
        <a href="public/login.php" class="btn">Faça Login e Comece a Aprender!</a>
        <p class="mascot">
            "Oi, eu sou a Laika! Vamos explorar o universo da matemática juntos?"
            <img src="public/assets/laika_astronaut.png" alt="Laika, a mascote astronauta">
        </p>
    </div>
</body>
</html>