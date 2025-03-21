// Função para animar a introdução da Laika
function animateIntroduction() {
    const laika = document.getElementById("laika");
    const introMessage = document.getElementById("intro-message");
    const startButton = document.getElementById("start-lessons");

    // Animação da Laika (aparece com um leve salto)
    gsap.from(laika, {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
    });

    // Efeito de "latido" (leve rotação)
    gsap.to(laika, {
        rotation: 5,
        duration: 0.3,
        repeat: 3,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1
    });

    // Efeito de flutuação (simula a Laika no espaço)
    gsap.to(laika, {
        y: -10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5
    });

    // Animação da mensagem (aparece com fade-in)
    gsap.from(introMessage, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.5,
        ease: "power2.out"
    });

    // Mostra o botão após a animação da mensagem
    gsap.to(startButton, {
        opacity: 1,
        duration: 0.5,
        delay: 1.5,
        onStart: () => {
            startButton.classList.remove("hidden");
        }
    });

    // Animação do botão
    setupButtonEffects("start-lessons");
}

// Função para redirecionar para a trilha de lições
function setupStartButton() {
    const startButton = document.getElementById("start-lessons");
    startButton.addEventListener("click", () => {
        window.location.href = "phases.php";
    });
}

// Função para inicializar a página
function init() {
    // Inicializa as animações de fundo
    createStars();
    setupPlanet();

    // Anima a introdução da Laika
    animateIntroduction();

    // Configura o botão para iniciar as lições
    setupStartButton();
}

// Inicializa quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", init);