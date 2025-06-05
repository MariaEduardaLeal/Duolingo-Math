document.addEventListener('DOMContentLoaded', async () => {
  const questionsContainer = document.getElementById('questions-container');
  const phaseTitle = document.getElementById('phase-title');
  const submitButton = document.getElementById('submit-answers');
  const progressBar = document.getElementById('progressBar');
  const timeChange = document.getElementById('timeChange');
  const urlParams = new URLSearchParams(window.location.search);
  const phaseId = urlParams.get('phase_id');
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  createStars();
  setupPlanet();
  setupButtonEffects('submit-answers');

  const loseQuestionSound = new Audio('/musics/lose_question.wav');
  const losePhaseSound = new Audio('/musics/lose_phase.wav');
  const correctQuestionSound = new Audio('/musics/correct_question.wav');
  const phaseWinSound = new Audio('/musics/phase_win.wav');

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

  if (questions.length == 0) return;

  let currentQuestion = 0;
  let errors = 0;
  const maxErrors = 3;
  let totalTime = 90;
  let intervalTime = 0.1;
  let selectedOption = null;
  let interval = null;

  // Atualizar barra de progresso
  const updateProgressBar = () => {
    totalTime -= intervalTime;
    const width = (totalTime / 90) * 100;
    progressBar.style.width = `${width}%`;
    let minutes = Math.floor(totalTime / 60);
    let seconds = Math.floor(totalTime % 60);
    progressBar.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    if (totalTime <= 0) {
      clearInterval(interval);
      losePhase('Seu tempo acabou, criatura inferior!');
    }
  };

  // Iniciar o temporizador
  const startTimer = () => {
    if (!interval) {
      interval = setInterval(updateProgressBar, intervalTime * 1000);
    }
  };

  // Pausar o temporizador
  const pauseTimer = () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  };

  // Iniciar temporizador na primeira carga
  startTimer();

  const showTimeChange = (change) => {
    timeChange.textContent = change > 0 ? `+${change}` : `${change}`;
    timeChange.className = 'time-change ' + (change > 0 ? 'time-gain' : 'time-loss');
    gsap.fromTo(timeChange,
      { opacity: 1, y: 0 },
      { opacity: 0, y: -20, duration: 1, ease: 'power2.out' }
    );
  };

  const carregarPergunta = () => {
    if (currentQuestion >= questions.length) {
      completePhase();
      return;
    }

    const question = questions[currentQuestion];
    questionsContainer.innerHTML = `
      <div class="question-container">
        <p class="text-lg font-semibold mb-2">Questão: ${question.question_text}</p>
        <div class="options">
          <div class="option" data-option="a">${question.option_a}</div>
          <div class="option" data-option="b">${question.option_b}</div>
          <div class="option" data-option="c">${question.option_c}</div>
          <div class="option" data-option="d">${question.option_d}</div>
        </div>
      </div>
      <div id="error-modal" class="hidden fixed top-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 flex items-center justify-center w-full max-w-md">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full">
          <p class="text-lg mb-4">Analise seu erro e, quando estiver pronto, aperte em CONTINUAR para a ir para a próxima questão</p>
          <button id="continue-button" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Continuar</button>
        </div>
      </div>
    `;

    const options = questionsContainer.querySelectorAll('.option');
    options.forEach(option => {
      option.addEventListener('click', () => {
        options.forEach(opt => opt.classList.remove('bg-gray-300'));
        option.classList.add('bg-gray-300');
        selectedOption = option.dataset.option;
      });
    });

    submitButton.classList.remove('hidden');
  };

  const verificarResposta = () => {
    const question = questions[currentQuestion];
    const options = questionsContainer.querySelectorAll('.option');

    options.forEach(option => {
      if (option.dataset.option == question.correct_option) {
        option.classList.add('correct');
      } else if (option.dataset.option == selectedOption) {
        option.classList.add('incorrect');
      }
      option.style.pointerEvents = 'none';
    });

    if (selectedOption == question.correct_option) {
      totalTime += 3;
      showTimeChange(3);
      correctQuestionSound.play();
      currentQuestion++;
      setTimeout(carregarPergunta, 1000);
    } else {
      totalTime -= 5;
      showTimeChange(-5);
      loseQuestionSound.play();
      errors++;
      pauseTimer();
      const errorModal = document.getElementById('error-modal');
      errorModal.classList.remove('hidden');
      const continueButton = document.getElementById('continue-button');
      continueButton.addEventListener('click', () => {
        errorModal.classList.add('hidden');
        if (errors > maxErrors) {
          losePhase('Você é um fracasso total, criatura inferior!');
        } else {
          currentQuestion++;
          carregarPergunta();
          startTimer();
        }
      }, { once: true });
    }
    selectedOption = null;
  };

  const completePhase = () => {
      clearInterval(interval);
      const starsEarned = Math.max(3 - errors, 1); // Mínimo de 1 estrela
      fetch('http://localhost:3000/api/progress', {
    
          method: 'POST',

          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              userId: parseInt(userId),
              phaseId: parseInt(phaseId),
              starsEarned,
              completed: true
          })
      })
      .then(() => {
          questionsContainer.innerHTML = `
              <div class="text-center">
                  <img src="/assets/laika_astronaut.png" class="w-48 mx-auto mb-4" alt="Laika">
                  <p class="text-lg">Oi, eu sou a Laika! Parabéns, você terminou a fase com ${starsEarned} estrela(s)! Vamos continuar aprendendo juntos?</p>
              </div>
          `;
          phaseWinSound.play(); // Toca som de vitória da fase
          submitButton.classList.add('hidden');
          setTimeout(() => window.location.href = '/phases.html', 7000);
      })
      .catch(err => console.error('Erro ao salvar progresso:', err));
  };

  const losePhase = (reason) => {
    questionsContainer.innerHTML = `
      <div class="text-center">
        <img src="/assets/gohan_brabo2.png" class="w-48 mx-auto mb-4" alt="Gohan Brabo">
        <p class="text-lg">Eu sou o Gohan, o melhor de todos! ${reason} Volte quando parar de ser uma vergonha pros meus olhos!</p>
      </div>
    `;
    submitButton.classList.add('hidden');
    losePhaseSound.play();
    setTimeout(() => window.location.href = '/phases.html', 7000);
  };

  submitButton.addEventListener('click', () => {
    if (selectedOption) verificarResposta();
    else alert('Selecione uma opção antes de enviar!');
  });

  carregarPergunta();
});