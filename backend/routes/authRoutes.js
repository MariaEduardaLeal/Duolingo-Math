const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// Rota para registrar um novo usuário
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Verificar se o email já está registrado
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email já registrado' });
        }

        // Hashear a senha
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Criar o novo usuário
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            avatar: 'cute_rocket.png' // Avatar padrão
        });

        res.status(201).json({ message: 'Usuário registrado com sucesso', userId: user.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
});

// Rota para login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar se o usuário existe
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'Email ou senha inválidos' });
        }

        // Verificar a senha
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Email ou senha inválidos' });
        }

        res.status(200).json({ message: 'Login bem-sucedido', userId: user.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
});

module.exports = router;