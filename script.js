document.addEventListener('DOMContentLoaded', () => {

    // 1. Fonction pour le compteur de chiffres
    const startCounter = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        let count = 0;
        const duration = 2000; // 2 secondes
        const increment = target / (duration / 16);

        const updateCount = () => {
            count += increment;
            if (count < target) {
                el.innerText = Math.ceil(count);
                requestAnimationFrame(updateCount);
            } else {
                el.innerText = target;
            }
        };
        updateCount();
    };

    // 2. Intersection Observer pour les animations au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si c'est la section héritage, on lance les compteurs
                if (entry.target.id === 'heritage') {
                    const numbers = entry.target.querySelectorAll('.stat-number');
                    numbers.forEach(num => {
                        if (num.classList.contains('infinity')) {
                            num.classList.add('animate-inf');
                        } else {
                            startCounter(num);
                        }
                    });
                }
                // Effet d'apparition classique pour les autres sections
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    // Cibles de l'observer
    const sections = document.querySelectorAll('section, blockquote');
    sections.forEach(sec => {
        sec.style.opacity = "0";
        sec.style.transform = "translateY(30px)";
        sec.style.transition = "all 0.8s ease-out";
        observer.observe(sec);
    });

    // 3. Petit effet Parallaxe sur le titre
    window.addEventListener('scroll', () => {
        const title = document.querySelector('.hero-content');
        let scroll = window.scrollY;
        title.style.transform = `translateY(${scroll * 0.5}px)`;
        title.style.opacity = 1 - (scroll / 500);
    });
});