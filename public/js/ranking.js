document.addEventListener('DOMContentLoaded', async () => {
  console.log('ranking.js carregado');



  console.log('Chamadas de animação comentadas temporariamente.'); // Novo log

  const rankingList = document.getElementById('ranking-list');
  const token = localStorage.getItem('token');

  if (!rankingList) {
    console.error('Elemento #ranking-list não encontrado');
    return;
  }

  try {
    console.log('Buscando dados do ranking'); 
    const response = await fetch('http://localhost:3000/api/ranking', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
      
      let errorData = { message: `Erro na requisição: ${response.status}` };
      try {
        errorData = await response.json(); 
      } catch (e) {
       
        errorData.message = response.statusText;
      }
      throw new Error(errorData.message || `Erro na requisição: ${response.status}`);
    }

    const ranking = await response.json();
    console.log('Dados do ranking recebidos:', ranking);

    rankingList.innerHTML = ''; 

    if (ranking.length === 0) {
      console.log('Ranking vazio recebido da API.');
      rankingList.innerHTML = '<p class="text-white text-center">Nenhum astronauta no ranking ainda!</p>';
    } else {
      ranking.forEach((user, index) => {
        const rankItem = document.createElement('div');
        rankItem.classList.add('flex', 'items-center', 'p-4', 'bg-gray-800', 'bg-opacity-75', 'rounded', 'shadow');
          rankItem.innerHTML = `
             <span class="text-2xl font-bold mr-4 text-yellow-400">${index + 1}º</span>
             <span class="flex-1">${user.name}</span>
             <span class="text-yellow-400">${user.totalStars} ⭐</span>
           `;
        rankingList.appendChild(rankItem);

        // Animação GSAP
        if (typeof gsap !== 'undefined') { 
             gsap.from(rankItem, {
             opacity: 0,
             y: 20,
             duration: 0.5,
             delay: index * 0.2,
             ease: 'power2.out'
             });
        } else {
            console.warn('GSAP não está carregado, animações de item do ranking desabilitadas.');
        }
      });
    }
    console.log('Ranking renderizado, total de usuários:', ranking.length);

  } catch (error) {
    console.error('Erro ao carregar ranking:', error.message);
    const rankingMessageElement = document.getElementById('ranking-message');
    const messageToDisplay = error.message || 'Erro ao carregar o ranking. Tente novamente.';
    if (rankingList) { // Garante que rankingList não é null antes de tentar modificar
         rankingList.innerHTML = `<p class="text-red-500 text-center">${messageToDisplay}</p>`;
    }
    if (rankingMessageElement) {
        rankingMessageElement.textContent = messageToDisplay;
        rankingMessageElement.className = 'text-center text-red-500 mt-4';
    }
  }
});