// Função para realizar o login via API
function login(email, password) {
    axios.post('/src/api/login.php', {
        email: email,
        password: password
    })
    .then(response => {
        if (response.data.success) {
            window.location.href = "welcome.php";
        } else {
            throw new Error(response.data.message || "Erro ao realizar login");
        }
    })
    .catch(error => {
        const errorMessage = document.getElementById("error-message");
        errorMessage.textContent = error.message;
        errorMessage.classList.remove("hidden");
    });
}