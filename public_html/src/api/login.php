<?php
// Configura o cabeçalho para JSON

use App\Controllers\AuthController;

header('Content-Type: application/json');

// Importa as dependências necessárias
require_once '../config.php';
require_once '../controllers/AuthController.php';

// Inicia a sessão
session_start();

// Verifica se a requisição é POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode(['success' => false, 'message' => 'Método não permitido']));
}

// Obtém os dados da requisição
$input = json_decode(file_get_contents('php://input'), true);
$email = filter_var($input['email'] ?? '', FILTER_SANITIZE_EMAIL);
$password = filter_var($input['password'] ?? '', FILTER_SANITIZE_STRING);

// Valida os dados
if (!$email || !$password) {
    http_response_code(400);
    die(json_encode(['success' => false, 'message' => 'Por favor, preencha todos os campos']));
}

// Instancia o controller e chama o método de login
$authController = new AuthController();
$response = $authController->login($email, $password);

// Retorna a resposta
http_response_code($response['status']);
die(json_encode($response));