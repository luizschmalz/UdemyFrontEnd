const imgs = document.querySelectorAll('.imgclass img');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if(!entry.isIntersecting) return;

        const img = entry.target;

        img.src = img.src.replace('w=10', 'w=1000');

        observer.unobserve(img);
    })
}, {});

imgs.forEach((img) => {
    observer.observe(img);
});
