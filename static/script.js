document.addEventListener('DOMContentLoaded', function () {
    // Configurar la imagen de fondo del hero
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const backgroundImage = heroSection.getAttribute('data-background');
        if (backgroundImage) {
            heroSection.style.setProperty('--bg-image', `url('${backgroundImage}')`);
        }
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    let mobileMenu;

    menuToggle.addEventListener('click', function () {
        if (!mobileMenu) {
            mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';

            const navCategories = document.querySelector('.nav-categories').cloneNode(true);
            const navIcons = document.querySelector('.nav-icons').cloneNode(true);

            mobileMenu.appendChild(navCategories);
            mobileMenu.appendChild(navIcons);

            document.querySelector('header .container').appendChild(mobileMenu);

            // Estilos básicos para mobile menu
            Object.assign(mobileMenu.style, {
                position: 'absolute',
                top: '100%',
                left: '0',
                width: '100%',
                backgroundColor: 'white',
                padding: '20px',
                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
                display: 'none',
            });

            const mobileNavCategories = mobileMenu.querySelector('.nav-categories');
            mobileNavCategories.style.display = 'flex';
            mobileNavCategories.style.flexDirection = 'column';

            mobileNavCategories.querySelectorAll('li').forEach(item => {
                item.style.margin = '10px 0';
            });

            const mobileNavIcons = mobileMenu.querySelector('.nav-icons');
            mobileNavIcons.style.display = 'flex';
            mobileNavIcons.style.justifyContent = 'center';
            mobileNavIcons.style.marginTop = '20px';
        }

        if (mobileMenu.style.display === 'none' || mobileMenu.style.display === '') {
            mobileMenu.style.display = 'block';
            menuToggle.classList.add('active');
        } else {
            mobileMenu.style.display = 'none';
            menuToggle.classList.remove('active');
        }
    });

    // Cerrar menú móvil al hacer clic en enlace dentro del menú
    document.addEventListener('click', function (e) {
        if (mobileMenu && e.target.closest('a') && e.target.closest('.mobile-menu')) {
            mobileMenu.style.display = 'none';
            menuToggle.classList.remove('active');
        }
    });

    // Scroll suave para enlaces ancla
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Botones WhatsApp para consulta de producto
    document.querySelectorAll('.whatsapp-btn').forEach(button => {
        button.addEventListener('click', function () {
            const product = this.getAttribute('data-product');
            const message = encodeURIComponent(`Hola, estoy interesada en este producto: ${product}`);
            window.open(`https://wa.me/573001112233?text=${message}`, '_blank');
        });
    });

    // Intersection Observer para animación fade-in
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.product-card, .about-content, .contact-content');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('visible');
        } else {
            observer.observe(el);
        }
    });

    // Al añadir la clase visible, activar estilos
    document.querySelectorAll('.visible').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
});
