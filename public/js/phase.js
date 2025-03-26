document.addEventListener('DOMContentLoaded', async () => {
    const questionsContainer = document.getElementById('questions-container');
    const phaseTitle = document.getElementById('phase-title');
    const submitButton = document.getElementById('submit-answers');
    const urlParams = new URLSearchParams(window.location.search);
    const phaseId = urlParams.get('phase_id');
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
  
    // Inicializar animações de fundo
    createStars();
    setupPlanet();
  
    // Buscar questões da fase
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/questions/${phaseId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Erro ao buscar questões');
        const questions = await response.json();
        return questions;
      } catch (error) {
        console.error('Erro:', error);
        questionsContainer.innerHTML = '<p class="text-red-600">Erro ao carregar questões.</p>';
        return [];
      }
    };
  
    // Buscar título da fase
    const fetchPhaseTitle = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/phases/${phaseId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const phase = await response.json();
        return phase.title;
      } catch (error) {
        return `Fase ${phaseId}`;
      }
    };
  
    const questions = await fetchQuestions();
    phaseTitle.textContent = await fetchPhaseTitle();
  
    if (questions.length === 0) return;
  
    let answers = {};
  
    // Exibir questões
    questions.forEach((question, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('question-container');
      questionDiv.innerHTML = `
        <p class="text-lg font-semibold mb-2">Questão ${question.question_number}: ${question.question_text}</p>
        <div class="options">
          <div class="option" data-option="a">${question.option_a}</div>
          <div class="option" data-option="b">${question.option_b}</div>
          <div class="option" data-option="c">${question.option_c}</div>
          <div class="option" data-option="d">${question.option_d}</div>
        </div>
      `;
  
      const options = questionDiv.querySelectorAll('.option');
      options.forEach(option => {
        option.addEventListener('click', () => {
          options.forEach(opt => opt.classList.remove('bg-gray-300')); // Remove seleção anterior
          option.classList.add('bg-gray-300');
          answers[question.id] = option.dataset.option;
          if (Object.keys(answers).length === questions.length) {
            submitButton.classList.remove('hidden');
          }
        });
      });
  
      questionsContainer.appendChild(questionDiv);
    });
  
    // Enviar respostas
    submitButton.addEventListener('click', async () => {
      let starsEarned = 0;
      questions.forEach(question => {
        const userAnswer = answers[question.id];
        const optionDiv = questionsContainer.querySelector(`[data-option="${userAnswer}"]`);
        if (userAnswer === question.correct_option) {
          starsEarned++;
          optionDiv.classList.add('correct');
        } else {
          optionDiv.classList.add('incorrect');
          questionsContainer.querySelector(`[data-option="${question.correct_option}"]`).classList.add('correct');
        }
      });
  
      // Desabilitar cliques após envio
      document.querySelectorAll('.option').forEach(option => option.style.pointerEvents = 'none');
      submitButton.disabled = true;
  
      // Atualizar progresso
      try {
        await fetch('http://localhost:3000/api/progress', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: parseInt(userId),
            phaseId: parseInt(phaseId),
            starsEarned,
            completed: starsEarned >= 3 // Completa se ganhar 3+ estrelas
          })
        });
        alert(`Você ganhou ${starsEarned} estrela(s)! ${starsEarned >= 3 ? 'Fase concluída!' : 'Tente novamente para mais estrelas.'}`);
        setTimeout(() => window.location.href = '/phases.html', 2000);
      } catch (error) {
        console.error('Erro ao atualizar progresso:', error);
      }
    });
  });