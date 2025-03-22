<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Importa o namespace no nível superior
use App\Controllers\AuthController;

try {
    require_once __DIR__ . '/src/controllers/AuthController.php';
    $authController = new AuthController();
    echo "AuthController carregado com sucesso.";
} catch (Exception $e) {
    echo "Erro ao carregar AuthController: " . $e->getMessage();
}