document.addEventListener("DOMContentLoaded", function() {
    // کد شمارنده متحرک برای بخش آمار
    const counters = document.querySelectorAll('.animated-counter');
    const speed = 200; // سرعت شمارش

    const runCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const countElement = counter.querySelector('h4');
                let count = +countElement.innerText.replace(/[^\d]/g, ''); 
                
                const increment = target / speed;

                if (count < target) {
                    countElement.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 1);
                } else {
                    countElement.innerText = target + (counter.innerText.match(/(\+|%)/g) || ['']).join(''); 
                }
            };
            if (counter.querySelector('h4')) {
                 updateCount();
            }
        });
    };
    
    // اجرای شمارنده هنگام اسکرول و رسیدن به بخش
    const casesSection = document.getElementById('cases');
    if (casesSection) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        counterObserver.observe(casesSection);
    }
});