// // Aguarda o carregamento completo do DOM antes de executar o script
// document.addEventListener('DOMContentLoaded', () => {
//     // Seleciona todas as fases
//     const phases = document.querySelectorAll('.phase');

//     /**
//      * Anima a aparição das fases com um efeito de fade-in
//      */
//     const animatePhases = () => {
//         phases.forEach((phase, index) => {
//             // Atraso para cada fase (0.8s por fase)
//             setTimeout(() => {
//                 phase.style.opacity = '1';
//                 // Adiciona um atraso aleatório à animação de flutuação para um efeito mais natural
//                 const floatDelay = Math.random() * 2; // Entre 0 e 2 segundos
//                 phase.style.animationDelay = `${floatDelay}s`;
//             }, index * 800);
//         });
//     };

//     /**
//      * Adiciona interatividade de clique às fases
//      */
//     const setupPhaseInteractions = () => {
//         phases.forEach(phase => {
//             phase.addEventListener('click', () => {
//                 const phaseId = phase.getAttribute('data-phase-id');
//                 const isLocked = phase.classList.contains('locked');

//                 if (isLocked) {
//                     alert('Esta fase está bloqueada! Complete as fases anteriores para desbloqueá-la.');
//                     return;
//                 }

//                 // Redireciona para a página da fase
//                 window.location.href = `/public/phase.php?phase_id=${phaseId}`;
//             });
//         });
//     };

//     // Inicializa as animações e interações
//     animatePhases();
//     setupPhaseInteractions();
// });

document.addEventListener('DOMContentLoaded', async () => {
    const phasesContainer = document.getElementById('phases-container');
    const phaseOrder = [
        1, 2, 3, 4, 5,
        10, 9, 8, 7, 6,
        11, 12, 13, 14, 15,
        20, 19, 18, 17, 16
    ];

    // Função para buscar o progresso do usuário
    const fetchUserProgress = async () => {
        try {
            const userId = localStorage.getItem('userId') || 1; // Usa 1 como fallback
            const response = await fetch(`http://localhost:3000/api/progress/${userId}`);
            const data = await response.json();
            return data.maxPhaseNumber || 0;
        } catch (error) {
            console.error('Erro ao buscar progresso do usuário:', error);
            return 0;
        }
    };

    // Obtém o progresso do usuário
    const userProgress = await fetchUserProgress();

    // Renderiza as fases
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
            image.src = '/assets/phases/phase_1.png'; // Fallback para uma imagem padrão
        };

        const phaseNumber = document.createElement('span');
        phaseNumber.classList.add('phase-number');
        phaseNumber.textContent = phaseId.toString();

        phaseElement.appendChild(image);
        phaseElement.appendChild(phaseNumber);
        phasesContainer.appendChild(phaseElement);
    });

    // Animação de aparição das fases
    const phases = document.querySelectorAll('.phase');
    const animatePhases = () => {
        phases.forEach((phase, index) => {
            setTimeout(() => {
                phase.style.opacity = '1';
            }, index * 800);
        });
    };

    // Interatividade de clique
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