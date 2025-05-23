// public/js/ranking.js
document.addEventListener('DOMContentLoaded', async () => {
  console.log('ranking.js carregado');

  // Carregar animações de fundo
  if (typeof createStars === 'function') {
    console.log('Executando createStars');
    createStars();
  }
  if (typeof setupPlanet === 'function') {
    console.log('Executando setupPlanet');
    setupPlanet();
  }

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
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    const ranking = await response.json();
    console.log('Dados do ranking recebidos:', ranking);

    rankingList.innerHTML = ''; // Limpar qualquer conteúdo existente

    ranking.forEach((user, index) => {
      const rankItem = document.createElement('div');
      rankItem.classList.add('flex', 'items-center', 'p-4', 'bg-gray-800', 'rounded', 'shadow');
      rankItem.innerHTML = `
        <span class="text-2xl font-bold mr-4">${index + 1}º</span>
        <img src="/assets/${user.avatar}" class="w-12 h-12 rounded-full mr-4" alt="${user.name}" onerror="this.src='/assets/laika_astronaut.png'">
        <span class="flex-1">${user.name}</span>
        <span class="text-yellow-400">${user.totalStars} ⭐</span>
      `;
      rankingList.appendChild(rankItem);

      // Animação GSAP
      gsap.from(rankItem, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        delay: index * 0.2,
        ease: 'power2.out'
      });
    });

    console.log('Ranking renderizado com sucesso, total de usuários:', ranking.length);
  } catch (error) {
    console.error('Erro ao carregar ranking:', error);
    rankingList.innerHTML = '<p class="text-red-600 text-center">Erro ao carregar o ranking. Tente novamente.</p>';
  }
});