<?php
namespace App\Controllers;

require_once __DIR__ . '/../config.php'; // Ajustado para caminho absoluto
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

    /**
     * Realiza o cadastro de um novo usuário.
     *
     * @param string $name
     * @param string $email
     * @param string $password
     * @return array
     */
    public function register($name, $email, $password)
    {
        // Valida o nome (ex.: não pode ser vazio após sanitização)
        $name = trim($name);
        if (empty($name)) {
            return [
                'success' => false,
                'message' => 'O nome não pode estar vazio',
                'status' => 400
            ];
        }

        // Valida o formato do email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return [
                'success' => false,
                'message' => 'Email inválido',
                'status' => 400
            ];
        }

        // Verifica se o email já está cadastrado
        $existingUser = User::where('email', $email)->first();
        if ($existingUser) {
            return [
                'success' => false,
                'message' => 'Este email já está cadastrado',
                'status' => 409
            ];
        }

        // Valida a senha (ex.: mínimo de 6 caracteres)
        if (strlen($password) < 6) {
            return [
                'success' => false,
                'message' => 'A senha deve ter pelo menos 6 caracteres',
                'status' => 400
            ];
        }

        // Criptografa a senha
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Cria o novo usuário
        $user = new User();
        $user->name = $name;
        $user->email = $email;
        $user->password = $hashedPassword;
        $user->save();

        return [
            'success' => true,
            'message' => 'Cadastro realizado com sucesso! Você será redirecionado para o login.',
            'status' => 201
        ];
    }
}