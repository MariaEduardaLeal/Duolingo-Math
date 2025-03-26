const express = require('express');
const { authenticateToken } = require('./authRoutes'); // Importar o middleware
const router = express.Router();
const UserProgress = require('../models/UserProgress');
const Phase = require('../models/Phase');

// Rota para obter o progresso do usuário (protegida)
router.get('/progress/:userId', authenticateToken, async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    if (userId !== req.user.id) { // Verifica se o usuário tem permissão
      return res.status(403).json({ error: 'Acesso negado' });
    }
    const progress = await UserProgress.findAll({
      where: { user_id: userId },
      include: [{ model: Phase, attributes: ['phase_number'] }],
      order: [[{ model: Phase, as: 'Phase' }, 'phase_number', 'ASC']]
    });

    if (!progress || progress.length === 0) {
      return res.json({ maxPhaseNumber: 0 });
    }

    const maxPhase = progress.reduce((max, record) => {
      const phaseNumber = record.Phase.phase_number;
      return record.completed && phaseNumber > max ? phaseNumber : max;
    }, 0);

    res.json({ maxPhaseNumber: maxPhase });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar progresso do usuário' });
  }
});

// Rota para atualizar o progresso do usuário (protegida)
router.post('/progress', authenticateToken, async (req, res) => {
  try {
    const { userId, phaseId, starsEarned, completed } = req.body;
    if (userId !== req.user.id) {
      return res.status(403).json({ error: 'Acesso negado' });
    }
    const [progress, created] = await UserProgress.findOrCreate({
      where: { user_id: userId, phase_id: phaseId },
      defaults: { user_id: userId, phase_id: phaseId, stars_earned: starsEarned, completed }
    });

    if (!created) {
      await progress.update({ stars_earned: starsEarned, completed, last_attempt: new Date() });
    }

    res.status(201).json({ message: 'Progresso atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar progresso do usuário' });
  }
});

module.exports = router;