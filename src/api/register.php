<?php
// Configura o cabeçalho para JSON

use App\Controllers\AuthController;

header('Content-Type: application/json');

// Importa as dependências necessárias
require_once '../config.php';


// Verifica se a requisição é POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode(['success' => false, 'message' => 'Método não permitido']));
}

// Obtém os dados da requisição
$input = json_decode(file_get_contents('php://input'), true);
$name = filter_var($input['name'] ?? '', FILTER_SANITIZE_STRING);
$email = filter_var($input['email'] ?? '', FILTER_SANITIZE_EMAIL);
$password = filter_var($input['password'] ?? '', FILTER_SANITIZE_STRING);

// Valida os dados
if (!$name || !$email || !$password) {
    http_response_code(400);
    die(json_encode(['success' => false, 'message' => 'Por favor, preencha todos os campos']));
}

// Instancia o controller e chama o método de cadastro
$authController = new AuthController();
$response = $authController->register($name, $email, $password);

// Retorna a resposta
http_response_code($response['status']);
die(json_encode($response));