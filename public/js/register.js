// Função para inicializar a página
function init() {
    // Inicializa as animações
    createStars();
    setupPlanet();
    setupButtonEffects("cadastrar");

    // Configura o formulário de cadastro
    const registerForm = document.getElementById("register-form");
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const errorMessage = document.getElementById("error-message");
        const successMessage = document.getElementById("success-message");
        errorMessage.textContent = "";
        errorMessage.classList.add("hidden");
        successMessage.textContent = "";
        successMessage.classList.add("hidden");

        const formData = new FormData(registerForm);
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");

        if (!name || !email || !password) {
            errorMessage.textContent = "Por favor, preencha todos os campos!";
            errorMessage.classList.remove("hidden");
            return;
        }

        register(name, email, password);
    });
}

// Inicializa quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", init);