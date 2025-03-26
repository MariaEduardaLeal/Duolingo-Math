document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const errorMessage = document.getElementById('error-message');
  
    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email,
        password
      });
  
      // Armazenar o userId e o token no localStorage
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('token', response.data.token);
  
      // Redirecionar para a página de boas-vindas
      window.location.href = '/welcome.html';
    } catch (error) {
      errorMessage.classList.remove('hidden');
      errorMessage.textContent = error.response?.data?.error || 'Erro ao fazer login';
    }
  });