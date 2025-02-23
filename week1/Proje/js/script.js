document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Favorite button functionality
    const favoriteBtn = document.getElementById('favorite-btn');
    
    favoriteBtn.addEventListener('click', () => {
        favoriteBtn.classList.toggle('active');
        if (favoriteBtn.classList.contains('active')) {
            favoriteBtn.textContent = 'Added to Favorites';
        } else {
            favoriteBtn.textContent = 'Add to Favorites';
        }
    });
}); 