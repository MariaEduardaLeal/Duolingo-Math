document.addEventListener('DOMContentLoaded', () => {
    const phases = document.querySelectorAll('.phase');
    const container = document.querySelector('.phases-container');

    // Função para posicionar as fases de forma orgânica
    const positionPhases = () => {
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const phaseSize = 80; // Tamanho de cada fase (80px)
        const minDistance = 120; // Distância mínima entre fases para evitar sobreposição
        const positions = []; // Array para armazenar as posições das fases

        phases.forEach((phase, index) => {
            let x, y, attempts = 0;
            const maxAttempts = 50; // Máximo de tentativas para encontrar uma posição válida

            // Tenta encontrar uma posição válida
            do {
                // Posição inicial com base na ordem numérica, mas com um deslocamento mais fluido
                const row = Math.floor(index / 4); // Aproximadamente 4 fases por "linha"
                const col = index % 4;
                const baseX = (containerWidth / 4) * col + (containerWidth / 8);
                const baseY = (containerHeight / 5) * row + (containerHeight / 10);

                // Adiciona um deslocamento aleatório maior para um visual mais espalhado
                x = baseX + (Math.random() - 0.5) * 150; // Deslocamento horizontal maior
                y = baseY + (Math.random() - 0.5) * 150; // Deslocamento vertical maior

                // Ajusta para não sair do contêiner
                x = Math.max(phaseSize / 2, Math.min(containerWidth - phaseSize / 2, x));
                y = Math.max(phaseSize / 2, Math.min(containerHeight - phaseSize / 2, y));

                attempts++;
            } while (isTooClose(x, y, positions, minDistance) && attempts < maxAttempts);

            // Se não encontrar uma posição válida, usa a última tentativa
            positions.push({ x, y });

            // Aplica a posição
            phase.style.left = `${x}px`;
            phase.style.top = `${y}px`;
        });

        // Função para verificar se a nova posição está muito próxima de outras
        function isTooClose(x, y, positions, minDistance) {
            return positions.some(pos => {
                const distance = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2);
                return distance < minDistance;
            });
        }
    };

    // Posiciona as fases
    positionPhases();

    // Função para animar a aparição das fases
    const animatePhases = () => {
        phases.forEach((phase, index) => {
            // Atraso para cada fase (0.8s por fase)
            setTimeout(() => {
                // Faz a fase aparecer com um efeito de "pop-in"
                phase.style.opacity = '1';
                phase.style.transform = 'scale(1)';
            }, index * 800); // Cada fase aparece com 0.8s de intervalo
        });
    };

    // Inicia a animação
    animatePhases();

    // Adiciona interatividade de clique
    phases.forEach(phase => {
        phase.addEventListener('click', () => {
            const phaseId = phase.getAttribute('data-phase-id');
            const status = phase.classList.contains('locked') ? 'locked' : 'accessible';

            if (status === 'locked') {
                alert('Esta fase está bloqueada! Complete as fases anteriores para desbloqueá-la.');
                return;
            }

            // Redireciona para a página da fase
            window.location.href = `/public/phase.php?phase_id=${phaseId}`;
        });
    });

    // Re-posiciona as fases ao redimensionar a janela
    window.addEventListener('resize', positionPhases);
});