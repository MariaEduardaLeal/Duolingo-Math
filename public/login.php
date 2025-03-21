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
    <title>Entrar na Nave</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-purple-900 text-white flex items-center justify-center min-h-screen">
    <div class="bg-blue-200 p-8 rounded-lg shadow-lg text-purple-900">
        <h2 class="text-3xl font-bold mb-6">Entrar na Nave</h2>
        <?php if (isset($error)) echo "<p class='text-red-600'>$error</p>"; ?>
        <form method="POST">
            <input type="email" name="email" placeholder="astro@exemplo.com" class="w-full p-2 mb-4 rounded" required>
            <input type="password" name="password" placeholder="Senha" class="w-full p-2 mb-4 rounded" required>
            <button type="submit" class="bg-yellow-500 w-full p-2 rounded hover:bg-yellow-400">Decolar!</button>
        </form>
    </div>
</body>
</html>