const express = require('express');
const router = express.Router();
const UserProgress = require('../models/UserProgress');
const Phase = require('../models/Phase');

// Rota para obter o progresso do usuário
router.get('/progress/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
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

// Rota para atualizar o progresso do usuário
router.post('/progress', async (req, res) => {
  try {
    const { userId, phaseId, starsEarned, completed } = req.body;
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

router.get('/questions/:phaseId', async (req, res) => {
  try {
    const questions = await Question.findAll({ where: { phase_id: req.params.phaseId } });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar perguntas' });
  }
});

module.exports = router;