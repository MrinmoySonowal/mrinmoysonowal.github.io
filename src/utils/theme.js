// Theme management (dark/light mode)
export const initializeTheme = () => {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;
    
    // Get saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
    
    function setTheme(theme) {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        
        // Update particles color based on theme
        updateParticlesTheme(theme);
    }
    
    function updateParticlesTheme(theme) {
        // This would update particles.js colors if needed
        const particlesColor = theme === 'dark' ? '#ffffff' : '#6366f1';
        
        // Update particles if they exist
        if (window.pJSDom && window.pJSDom[0]) {
            const particles = window.pJSDom[0].pJS.particles;
            particles.color.value = particlesColor;
            particles.line_linked.color = particlesColor;
        }
    }
};