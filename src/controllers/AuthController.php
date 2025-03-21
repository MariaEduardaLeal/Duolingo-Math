<?php
namespace App\Controllers;

require_once '../config.php';
use App\Models\User;

class AuthController
{
    /**
     * Realiza o login do usuário.
     *
     * @param string $email
     * @param string $password
     * @return array
     */
    public function login($email, $password)
    {
        // Valida o formato do email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return [
                'success' => false,
                'message' => 'Email inválido',
                'status' => 400
            ];
        }

        // Busca o usuário pelo email usando Eloquent
        $user = User::where('email', $email)->first();

        // Verifica se o usuário existe e se a senha está correta
        if ($user && password_verify($password, $user->password)) {
            // Armazena o ID do usuário na sessão
            $_SESSION['user_id'] = $user->id;

            return [
                'success' => true,
                'message' => 'Login realizado com sucesso',
                'status' => 200
            ];
        }

        return [
            'success' => false,
            'message' => 'Email ou senha inválidos',
            'status' => 401
        ];
    }
}