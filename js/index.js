document.addEventListener('DOMContentLoaded', () => {
    // Toggle Navbar for mobile view
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    
    navbarToggle.addEventListener('click', () => {
        navbarMenu.classList.toggle('hidden');
    });

    // Language toggle functionality
    const storedLang = localStorage.getItem('language');
    if (storedLang) {
        setLanguage(storedLang === 'cy');
    }

    document.getElementById('toggleLanguage').addEventListener('click', () => {
        const isCymraeg = document.getElementById('toggleLanguage').innerText === 'Cymraeg';
        setLanguage(isCymraeg);
        localStorage.setItem('language', isCymraeg ? 'cy' : 'en');
    });

    function setLanguage(isCymraeg) {
        const langElements = document.querySelectorAll('.lang');
        langElements.forEach(el => {
            el.style.opacity = 0;
            setTimeout(() => {
                el.innerText = isCymraeg ? el.getAttribute('data-cy') : el.getAttribute('data-en');
                el.style.opacity = 1;
            }, 300);
        });
        document.getElementById('toggleLanguage').innerText = isCymraeg ? 'English' : 'Cymraeg';
    }
});
