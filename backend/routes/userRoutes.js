const express = require('express');
const bcrypt = require('bcrypt');
const { authenticateToken } = require('./authRoutes');
const User = require('../models/User');
const router = express.Router();

// Rota para obter os dados do usuário
router.get('/user/:userId', authenticateToken, async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    console.log('Buscando usuário com ID:', userId, 'req.user:', req.user);
    if (isNaN(userId)) {
      console.log('userId inválido:', req.params.userId);
      return res.status(400).json({ error: 'ID do usuário inválido' });
    }
    if (userId !== req.user.id) {
      console.log('Acesso negado: userId não corresponde ao token');
      return res.status(403).json({ error: 'Acesso negado' });
    }
    const user = await User.findByPk(userId, {
      attributes: ['id', 'name', 'email', 'avatar'],
    });
    if (!user) {
      console.log('Usuário não encontrado para ID:', userId);
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    console.log('Usuário encontrado:', user.toJSON());
    res.json(user);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error.message, error.stack);
    res.status(500).json({ error: 'Erro ao buscar usuário', details: error.message });
  }
});

// Rota para atualizar os dados do usuário
router.put('/user/:userId', authenticateToken, async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    console.log('Atualizando usuário com ID:', userId, 'req.user:', req.user, 'Body:', req.body);
    if (isNaN(userId)) {
      console.log('userId inválido:', req.params.userId);
      return res.status(400).json({ error: 'ID do usuário inválido' });
    }
    if (userId !== req.user.id) {
      console.log('Acesso negado: userId não corresponde ao token');
      return res.status(403).json({ error: 'Acesso negado' });
    }
    const { name, email, password, confirmPassword } = req.body;

    // Validações
    if (!name || !email) {
      console.log('Nome ou e-mail ausentes:', { name, email });
      return res.status(400).json({ error: 'Nome e e-mail são obrigatórios' });
    }
    if (password && password !== confirmPassword) {
      console.log('Senhas não coincidem');
      return res.status(400).json({ error: 'As senhas não coincidem' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      console.log('Usuário não encontrado para ID:', userId);
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Atualiza os campos
    user.name = name;
    user.email = email;
    if (password) {
      const saltRounds = 10;
      user.password = await bcrypt.hash(password, saltRounds);
    }

    await user.save();
    console.log('Usuário atualizado:', user.toJSON());
    res.json({ message: 'Perfil atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error.message, error.stack);
    if (error.name === 'SequelizeUniqueConstraintError') {
      const field = error.errors[0].path === 'email' ? 'E-mail' : 'Nome';
      console.log('Erro de unicidade:', field);
      return res.status(400).json({ error: `${field} já está em uso` });
    }
    res.status(500).json({ error: 'Erro ao atualizar perfil', details: error.message });
  }
});

module.exports = router;