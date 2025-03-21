<?php
require_once '../src/config.php';
use App\Models\User;

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $user = User::where('email', $email)->first();

    if ($user && password_verify($password, $user->password)) {
        $_SESSION['user_id'] = $user->id;
        header("Location: phases.php");
        exit;
    } else {
        $error = "Email ou senha inválidos!";
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Entrar na Nave</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>
    <style>
        body {
            background: radial-gradient(circle, #4b0082, #1e0033);
            overflow: hidden;
        }
        .star {
            position: absolute;
            width: 40px;
            opacity: 0.7;
        }
        .planet {
            position: absolute;
            width: 100px;
            z-index: 5;
        }
        .form-container {
            position: relative;
            z-index: 10;
        }
    </style>
</head>
<body class="flex items-center justify-center min-h-screen text-white">
    <!-- Estrelas dinâmicas -->
    <div id="stars-container"></div>

    <!-- Planeta orbitando -->
    <img src="assets/planet.png" class="planet" id="planet" alt="Planeta">

    <!-- Formulário de Login -->
    <div class="form-container bg-blue-200 p-8 rounded-lg shadow-lg text-purple-900 w-full max-w-md">
        <h2 class="text-4xl font-bold mb-6 text-center">Entrar na Nave</h2>
        <?php if (isset($error)) echo "<p class='text-red-600 text-center'>$error</p>"; ?>
        <form method="POST">
            <div class="mb-4">
                <input type="email" name="email" placeholder="astro@exemplo.com" class="w-full p-3 rounded-lg border-2 border-purple-900 focus:outline-none focus:border-yellow-400" required>
            </div>
            <div class="mb-6">
                <input type="password" name="password" placeholder="Senha" class="w-full p-3 rounded-lg border-2 border-purple-900 focus:outline-none focus:border-yellow-400" required>
            </div>
            <button type="submit" id="decolar" class="w-full bg-yellow-500 text-purple-900 p-3 rounded-full font-bold hover:bg-yellow-400 transition-all">Decolar!</button>
        </form>
    </div>

    <!-- Animações GSAP -->
    <script>
        // Gerar várias estrelas
        const starsContainer = document.getElementById("stars-container");
        const numStars = 20; // Número de estrelas
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement("img");
            star.src = "assets/star_smile.png";
            star.className = "star";
            star.style.left = Math.random() * 100 + "vw";
            star.style.top = Math.random() * 100 + "vh";
            starsContainer.appendChild(star);

            // Animação de piscar e mover
            gsap.to(star, {
                opacity: Math.random() * 0.5 + 0.3,
                duration: 1 + Math.random(),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
            gsap.to(star, {
                x: (Math.random() - 0.5) * 100,
                y: (Math.random() - 0.5) * 100,
                duration: 5 + Math.random() * 5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }

        // Animação do planeta orbitando o formulário
        const planet = document.getElementById("planet");
        const form = document.querySelector(".form-container");
        const formRect = form.getBoundingClientRect();
        const centerX = formRect.left + formRect.width / 2;
        const centerY = formRect.top + formRect.height / 2;
        const radiusX = formRect.width / 2 + 150; // Raio da órbita (horizontal)
        const radiusY = formRect.height / 2 + 100; // Raio da órbita (vertical)

        // Órbita elíptica ao redor do formulário
        gsap.to(planet, {
            x: () => centerX + radiusX * Math.cos(gsap.getProperty(planet, "rotation")),
            y: () => centerY + radiusY * Math.sin(gsap.getProperty(planet, "rotation")),
            rotation: "+=360", // Rotação para a órbita
            duration: 10,
            repeat: -1,
            ease: "none",
            transformOrigin: "center center"
        });

        // Rotação do planeta sobre seu próprio eixo
        gsap.to(planet, {
            rotation: "+=360", // Gira 360 graus continuamente
            duration: 3, // Duração da rotação (mais rápida que a órbita)
            repeat: -1,
            ease: "none",
            transformOrigin: "center center"
        });

        // Efeito no botão "Decolar!"
        const decolar = document.getElementById("decolar");
        decolar.addEventListener("mouseenter", () => {
            gsap.to(decolar, { scale: 1.1, duration: 0.3, ease: "elastic.out(1, 0.3)" });
        });
        decolar.addEventListener("mouseleave", () => {
            gsap.to(decolar, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.3)" });
        });
    </script>
</body>
</html>