// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todas as fases
    const phases = document.querySelectorAll('.phase');

    /**
     * Anima a aparição das fases com um efeito de fade-in
     */
    const animatePhases = () => {
        phases.forEach((phase, index) => {
            // Atraso para cada fase (0.8s por fase)
            setTimeout(() => {
                phase.style.opacity = '1';
            }, index * 800);
        });
    };

    /**
     * Adiciona interatividade de clique às fases
     */
    const setupPhaseInteractions = () => {
        phases.forEach(phase => {
            phase.addEventListener('click', () => {
                const phaseId = phase.getAttribute('data-phase-id');
                const isLocked = phase.classList.contains('locked');

                if (isLocked) {
                    alert('Esta fase está bloqueada! Complete as fases anteriores para desbloqueá-la.');
                    return;
                }

                // Redireciona para a página da fase
                window.location.href = `/public/phase.php?phase_id=${phaseId}`;
            });
        });
    };

    // Inicializa as animações e interações
    animatePhases();
    setupPhaseInteractions();
});