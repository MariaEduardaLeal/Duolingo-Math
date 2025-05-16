// public/js/ranking.js
document.addEventListener('DOMContentLoaded', async () => {
  console.log('ranking.js carregado');

  if (typeof createStars === 'function') createStars();
  if (typeof setupPlanet === 'function') setupPlanet();

  const toggleButton = document.getElementById('toggle-sidebar');
  const sidebar = document.getElementById('sidebar');
  const logoutButton = document.getElementById('logout');

  if (toggleButton && sidebar && logoutButton) {
    toggleButton.addEventListener('click', () => {
      sidebar.classList.toggle('translate-x-0');
      sidebar.classList.toggle('-translate-x-full');
    });

    logoutButton.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      window.location.href = '/login.html';
    });
  } else {
    console.error('Elementos do sidebar não encontrados');
  }

  const rankingList = document.getElementById('ranking-list');
  const token = localStorage.getItem('token');

  try {
    const response = await fetch('http://localhost:3000/api/ranking', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Erro ao buscar ranking');
    const ranking = await response.json();

    ranking.forEach((user, index) => {
      const rankItem = document.createElement('div');
      rankItem.classList.add('flex', 'items-center', 'p-4', 'bg-gray-800', 'rounded', 'shadow');
      rankItem.innerHTML = `
        <span class="text-2xl font-bold mr-4">${index + 1}º</span>
        <img src="/assets/${user.avatar}" class="w-12 h-12 rounded-full mr-4" alt="${user.name}">
        <span class="flex-1">${user.name}</span>
        <span class="text-yellow-400">${user.totalStars} ⭐</span>
      `;
      rankingList.appendChild(rankItem);

      gsap.from(rankItem, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        delay: index * 0.2,
        ease: 'power2.out'
      });
    });
  } catch (error) {
    console.error('Erro:', error);
    rankingList.innerHTML = '<p class="text-red-600">Erro ao carregar ranking.</p>';
  }
});