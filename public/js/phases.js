document.addEventListener('DOMContentLoaded', async () => {
    const phasesContainer = document.getElementById('phases-container');
    const phaseOrder = [
      1, 2, 3, 4, 5,
      10, 9, 8, 7, 6,
      11, 12, 13, 14, 15,
      20, 19, 18, 17, 16
    ];
  
    const fetchUserProgress = async () => {
      try {
        const userId = localStorage.getItem('userId') || 1;
        const token = localStorage.getItem('token');
        const response = await fetch(`https://mathlingo.onrender.com/api/progress/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Erro na requisição');
        const data = await response.json();
        return data.maxPhaseNumber || 0;
      } catch (error) {
        console.error('Erro ao buscar progresso do usuário:', error);
        return 0;
      }
    };
  
    const userProgress = await fetchUserProgress();
  
    phaseOrder.forEach((phaseId, index) => {
      const status = phaseId <= userProgress ? 'completed' : (phaseId === userProgress + 1 ? 'current' : 'locked');
      const phaseElement = document.createElement('div');
      phaseElement.classList.add('phase', status);
      phaseElement.setAttribute('data-phase-id', phaseId.toString());
      phaseElement.style.setProperty('--phase-index', index.toString());
  
      const image = document.createElement('img');
      image.src = `/assets/phases/phase_${phaseId}.png`;
      image.alt = `Fase ${phaseId}`;
      image.classList.add('phase-image');
      image.onerror = () => {
        image.src = '/assets/phases/phase_1.png';
      };
  
      const phaseNumber = document.createElement('span');
      phaseNumber.classList.add('phase-number');
      phaseNumber.textContent = phaseId.toString();
  
      phaseElement.appendChild(image);
      phaseElement.appendChild(phaseNumber);
      phasesContainer.appendChild(phaseElement);
    });
  
    const phases = document.querySelectorAll('.phase');
    const animatePhases = () => {
      phases.forEach((phase, index) => {
        setTimeout(() => {
          phase.style.opacity = '1';
        }, index * 800);
      });
    };
  
    const setupPhaseInteractions = () => {
      phases.forEach(phase => {
        phase.addEventListener('click', () => {
          const phaseId = phase.getAttribute('data-phase-id');
          const isLocked = phase.classList.contains('locked');
  
          if (isLocked) {
            alert('Esta fase está bloqueada! Complete as fases anteriores para desbloqueá-la.');
            return;
          }
  
          window.location.href = `/phase.html?phase_id=${phaseId}`;
        });
      });
    };
  
    animatePhases();
    setupPhaseInteractions();
  });
