// Função para gerar as estrelas dinamicamente
function createStars() {
    const starsContainer = document.getElementById("stars-container");
    const numStars = 20;

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement("img");
        star.src = "assets/star_smile.png";
        star.className = "star";
        star.style.left = Math.random() * 100 + "vw";
        star.style.top = Math.random() * 100 + "vh";
        starsContainer.appendChild(star);

        gsap.to(star, {
            opacity: Math.random() * 0.5 + 0.3,
            duration: 1 + Math.random(),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        gsap.to(star, {
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 100,
            duration: 5 + Math.random() * 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
}

// Função para posicionar e animar o planeta
function setupPlanet() {
    const planet = document.getElementById("planet");

    planet.onerror = () => {
        console.error("Imagem do planeta não carregada. Verifique o caminho: assets/planet.png");
    };
    planet.onload = () => {
        console.log("Imagem do planeta carregada com sucesso!");
        planet.style.left = Math.random() * 100 + "vw";
        planet.style.top = Math.random() * 100 + "vh";

        gsap.to(planet, {
            opacity: Math.random() * 0.5 + 0.3,
            duration: 1 + Math.random(),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        gsap.to(planet, {
            x: (Math.random() - 0.5) * 100,
            duration: 5 + Math.random() * 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        gsap.to(planet, {
            rotation: "+=360",
            duration: 3,
            repeat: -1,
            ease: "none",
            transformOrigin: "center center"
        });
    };
}

// Função para adicionar efeitos ao botão
function setupButtonEffects(buttonId) {
    const button = document.getElementById(buttonId);
    if (!button) {
        console.warn(`Botão com ID "${buttonId}" não encontrado.`);
        return;
    }
    button.addEventListener("mouseenter", () => {
        gsap.to(button, {
            scale: 1.1,
            duration: 0.3,
            ease: "elastic.out(1, 0.3)"
        });
    });
    button.addEventListener("mouseleave", () => {
        gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: "elastic.out(1, 0.3)"
        });
    });
}