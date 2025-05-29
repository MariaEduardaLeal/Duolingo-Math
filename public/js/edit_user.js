document.addEventListener('DOMContentLoaded', async () => {
  // Obtém userId e token do localStorage
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  console.log('User ID:', userId, 'Token:', token);

  if (!userId || !token) {
    showMessage('Faça login para editar o perfil', 'error');
    window.location.href = '/login.html';
    return;
  }

  // Carrega os dados do usuário
  try {
    console.log('Fazendo requisição para:', `/api/user/${userId}`);
    const response = await fetch(`/api/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log('Resposta da API:', response.status, response.statusText);
    const user = await response.json();
    console.log('Dados do usuário:', user);

    if (response.ok) {
      if (!user.name || !user.email) {
        console.warn('Dados do usuário incompletos:', user);
        showMessage('Dados do usuário incompletos', 'error');
        return;
      }
      document.getElementById('name').value = user.name;
      document.getElementById('email').value = user.email;
    } else {
      showMessage(user.error || `Erro ao carregar dados do usuário (Status: ${response.status})`, 'error');
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        window.location.href = '/login.html';
      }
    }
  } catch (error) {
    console.error('Erro ao buscar usuário:', error.message);
    showMessage('Erro ao conectar com o servidor: ' + error.message, 'error');
  }

  // Manipula o envio do formulário
  const form = document.getElementById('edit-user-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    try {
      console.log('Enviando atualização para:', `/api/user/${userId}`);
      const response = await fetch(`/api/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });
      console.log('Resposta da API (PUT):', response.status, response.statusText);
      const result = await response.json();
      console.log('Resultado da atualização:', result);
      if (response.ok) {
        showMessage(result.message, 'success');
      } else {
        showMessage(result.error || `Erro ao atualizar perfil (Status: ${response.status})`, 'error');
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('userId');
          localStorage.removeItem('token');
          window.location.href = '/login.html';
        }
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error.message);
      showMessage('Erro ao conectar com o servidor: ' + error.message, 'error');
    }
  });

  function showMessage(message, type) {
    const messageElement = document.getElementById('form-message');
    messageElement.textContent = message;
    messageElement.className = `text-center mt-4 ${type === 'success' ? 'text-green-500' : 'text-red-500'}`;
    messageElement.classList.remove('hidden');
    setTimeout(() => {
      messageElement.classList.add('hidden');
    }, 5000);
  }

  document.getElementById('logout').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    window.location.href = '/login.html';
  });
});