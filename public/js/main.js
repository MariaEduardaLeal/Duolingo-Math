// Função para inicializar a página
function init() {
    // Inicializa as animações
    createStars();
    setupPlanet();
    setupButtonEffects("decolar");

    // Configura o formulário de login
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const errorMessage = document.getElementById("error-message");
        errorMessage.textContent = "";
        errorMessage.classList.add("hidden");

        const formData = new FormData(loginForm);
        const email = formData.get("email");
        const password = formData.get("password");

        if (!email || !password) {
            errorMessage.textContent = "Por favor, preencha todos os campos!";
            errorMessage.classList.remove("hidden");
            return;
        }

        login(email, password);
    });
}

// Inicializa quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", init);