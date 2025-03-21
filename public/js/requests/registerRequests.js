// Função para realizar o cadastro via API
function register(name, email, password) {
    axios.post('/src/api/register.php', {
        name: name,
        email: email,
        password: password
    })
    .then(response => {
        if (response.data.success) {
            // Exibe mensagem de sucesso
            const successMessage = document.getElementById("success-message");
            successMessage.textContent = response.data.message;
            successMessage.classList.remove("hidden");

            // Limpa o formulário
            document.getElementById("register-form").reset();

            // Opcional: redireciona para a tela de login após 2 segundos
            setTimeout(() => {
                window.location.href = "login.php";
            }, 2000);
        } else {
            throw new Error(response.data.message || "Erro ao realizar cadastro");
        }
    })
    .catch(error => {
        const errorMessage = document.getElementById("error-message");
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage.textContent = error.response.data.message;
        } else {
            errorMessage.textContent = error.message || "Erro ao realizar cadastro";
        }
        errorMessage.classList.remove("hidden");
    });
}