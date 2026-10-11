// Garante que o JavaScript só execute DEPOIS que todo o HTML for carregado
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Animação ao scroll (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 1s ease-out forwards';
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hidden-scroll').forEach((el) => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // 2. Configuração do Contador
    // Usando o formato ISO (Ano-Mês-DiaTHora:Minuto:Segundo) que funciona perfeitamente em iPhones/Safari
    const countDownDate = new Date("2027-01-23T19:30:00").getTime();

    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        // Se a data já passou, encerra o contador
        if (distance < 0) {
            clearInterval(x);
            const contadorDiv = document.querySelector(".countdown");
            if(contadorDiv) {
                contadorDiv.innerHTML = "<div class='time-box'><span>Chegou o grande dia!</span></div>";
            }
            return; // Para a execução do restante da função
        }

        // Cálculos matemáticos de tempo
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Preenche os elementos, garantindo que eles existem antes de inserir
        const elDays = document.getElementById("days");
        const elHours = document.getElementById("hours");
        const elMinutes = document.getElementById("minutes");
        const elSeconds = document.getElementById("seconds");

        if(elDays) elDays.innerHTML = days < 10 ? "0" + days : days;
        if(elHours) elHours.innerHTML = hours < 10 ? "0" + hours : hours;
        if(elMinutes) elMinutes.innerHTML = minutes < 10 ? "0" + minutes : minutes;
        if(elSeconds) elSeconds.innerHTML = seconds < 10 ? "0" + seconds : seconds;

    }, 1000);
});
