document.addEventListener('DOMContentLoaded', () => {
    // Elementos do sidebar
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('toggle-sidebar');
    const closeButton = document.getElementById('close-sidebar');
    const logoutButton = document.getElementById('logout');

    // Função para abrir o sidebar
    const openSidebar = () => {
        sidebar.classList.remove('-translate-x-full');
        sidebar.classList.add('translate-x-0');
    };

    // Função para fechar o sidebar
    const closeSidebar = () => {
        sidebar.classList.remove('translate-x-0');
        sidebar.classList.add('-translate-x-full');
    };

    // Event listeners
    toggleButton.addEventListener('click', openSidebar);
    closeButton.addEventListener('click', closeSidebar);

    // Fechar o sidebar quando clicar fora dele
    document.addEventListener('click', (event) => {
        const isOutside = !sidebar.contains(event.target) && !toggleButton.contains(event.target);
        if (isOutside && sidebar.classList.contains('translate-x-0')) {
            closeSidebar();
        }
    });

    // Função de logout
    logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        // Limpar o localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        // Redirecionar para a página de login
        window.location.href = '/index.html';
    });
});