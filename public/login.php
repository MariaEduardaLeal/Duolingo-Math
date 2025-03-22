<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Entrar na Nave</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body class="flex items-center justify-center min-h-screen text-white">
    <!-- Estrelas dinâmicas -->
    <div id="stars-container"></div>

    <!-- Planeta em posição aleatória -->
    <img src="assets/planet.png" class="planet" id="planet" alt="Planeta">

    <!-- Formulário de Login -->
    <div class="form-container bg-blue-200 p-8 rounded-lg shadow-lg text-purple-900 w-full max-w-md">
        <h2 class="text-4xl font-bold mb-6 text-center">Entrar na Nave</h2>
        <div id="error-message" class="text-red-600 text-center hidden"></div>
        <form id="login-form">
            <div class="mb-4">
                <input type="email" name="email" placeholder="astro@exemplo.com" class="w-full p-3 rounded-lg border-2 border-purple-900 focus:outline-none focus:border-yellow-400" required>
            </div>
            <div class="mb-6">
                <input type="password" name="password" placeholder="Senha" class="w-full p-3 rounded-lg border-2 border-purple-900 focus:outline-none focus:border-yellow-400" required>
            </div>
            <button type="submit" id="decolar" class="w-full bg-yellow-500 text-purple-900 p-3 rounded-full font-bold hover:bg-yellow-400 transition-all">Decolar!</button>
        </form>
        <p class="text-center mt-4">
            Não tem uma conta? <a href="/public/register.php" class="text-purple-700 hover:underline">Cadastrar</a>
        </p>
    </div>

    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="js/animate/animations.js"></script>
    <script src="js/requests/loginRequests.js"></script>
    <script src="js/main.js"></script>
</body>
</html>