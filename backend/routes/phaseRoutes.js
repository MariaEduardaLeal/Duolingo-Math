const express = require('express');
const { authenticateToken } = require('./authRoutes');
const router = express.Router();
const UserProgress = require('../models/UserProgress');
const Phase = require('../models/Phase');
const Question = require('../models/Question'); // Importar o modelo Question

// Rota para obter o progresso do usuário (protegida)
router.get('/progress/:userId', authenticateToken, async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    if (userId !== req.user.id) {
      return res.status(403).json({ error: 'Acesso negado' });
    }
    const progress = await UserProgress.findAll({
      where: { user_id: userId },
      include: [{ model: Phase, attributes: ['id'] }],
      order: [[{ model: Phase, as: 'Phase' }, 'id', 'ASC']]
    });

    if (!progress || progress.length === 0) {
      return res.json({ maxPhaseNumber: 0 });
    }

    const maxPhase = progress.reduce((max, record) => {
      const phaseNumber = record.Phase.id;
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

// Nova rota para buscar questões de uma fase (protegida)
router.get('/questions/:phaseId', authenticateToken, async (req, res) => {
  try {
    const phaseId = parseInt(req.params.phaseId);
    const questions = await Question.findAll({
      where: { phase_id: phaseId },
      order: [['question_number', 'ASC']]
    });

    if (!questions || questions.length === 0) {
      return res.status(404).json({ error: 'Nenhuma questão encontrada para esta fase' });
    }

    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar questões' });
  }
});

router.get('/phases/:phaseId', authenticateToken, async (req, res) => {
  try {
    const phase = await Phase.findByPk(req.params.phaseId);
    if (!phase) return res.status(404).json({ error: 'Fase não encontrada' });
    res.json(phase);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar fase' });
  }
});

module.exports = router;