document.addEventListener('DOMContentLoaded', function() {
    const carouselEl = document.getElementById('carouselExampleControls');
    const toateSlideurile = Array.from(document.querySelectorAll('.carousel-item'));
    const indicators = document.getElementById('indicators');

    function afiseaza5Random() {
        const random5 = [...toateSlideurile]
            .sort(() => Math.random() - 0.5)
            .slice(0, 5);

        // Ascunde toate
        toateSlideurile.forEach(s => {
            s.style.display = 'none';
            s.classList.remove('active');
        });

        // Rebuild indicatori
        indicators.innerHTML = random5.map((s, i) => `
            <button type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide-to="${i}"
                class="${i === 0 ? 'active' : ''}">
            </button>
        `).join('');

        // Arata 5 random
        random5.forEach((s, i) => {
            s.style.display = 'block';
            if (i === 0) s.classList.add('active');
        });

        // Reporneste Bootstrap 5 carousel
        bootstrap.Carousel.getOrCreateInstance(carouselEl, {
            interval: 3000,
            ride: 'carousel'
        }).cycle();
    }

    afiseaza5Random();
    setInterval(afiseaza5Random, 15000);
});