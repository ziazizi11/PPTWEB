document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navItems = document.querySelectorAll('.nav-item');
    const btnFullscreen = document.getElementById('btnFullscreen');

    // --- Mobile Menu Toggle ---
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    // --- Theme Handling ---
    const btnLightTheme = document.getElementById('btnLightTheme');
    const btnDarkTheme = document.getElementById('btnDarkTheme');

    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }

    if (btnLightTheme) {
        btnLightTheme.addEventListener('click', () => {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        });
    }

    if (btnDarkTheme) {
        btnDarkTheme.addEventListener('click', () => {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        });
    }

    // --- Fullscreen Handling ---
    if(btnFullscreen) {
        btnFullscreen.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.log(`Error attempting to enable fullscreen: ${err.message}`);
                });
                btnFullscreen.innerHTML = '<i class="fa-solid fa-compress"></i>';
            } else {
                document.exitFullscreen();
                btnFullscreen.innerHTML = '<i class="fa-solid fa-expand"></i>';
            }
        });
    }

    // Handle Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 10) {
            navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
            navbar.style.padding = '10px 0';
        } else {
            navbar.style.boxShadow = 'var(--shadow-sm)';
            navbar.style.padding = '15px 0';
        }
    });
});
