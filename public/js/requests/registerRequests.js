document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');

    try {
        const response = await axios.post('https://mathlingo.onrender.com/api/register', {
            name,
            email,
            password
        });

        errorMessage.classList.add('hidden');
        successMessage.classList.remove('hidden');
        successMessage.textContent = 'Cadastro realizado com sucesso! Redirecionando para o login...';

        
        setTimeout(() => {
            window.location.href = '/login.html';
        }, 2000);
    } catch (error) {
        successMessage.classList.add('hidden');
        errorMessage.classList.remove('hidden');
        errorMessage.textContent = error.response?.data?.error || 'Erro ao cadastrar';
    }
});
