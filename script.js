// Mobile menu functionality
const mobileMenuButton = document.querySelector('button.md\\:hidden');
const mobileMenu = document.createElement('div');
mobileMenu.className = 'mobile-menu';
mobileMenu.innerHTML = `
    <div class="flex justify-between items-center mb-8">
        <div class="text-2xl font-playfair font-bold text-blue-900">Hotel Limoeiro</div>
        <button class="close-menu">
            <i class="fas fa-times text-2xl text-blue-900"></i>
        </button>
    </div>
    <div class="flex flex-col space-y-4">
        <a href="#inicio" class="text-xl text-gray-700 hover:text-blue-900">Início</a>
        <a href="#sobre" class="text-xl text-gray-700 hover:text-blue-900">Sobre</a>
        <a href="#galeria" class="text-xl text-gray-700 hover:text-blue-900">Galeria</a>
        <a href="#servicos" class="text-xl text-gray-700 hover:text-blue-900">Serviços</a>
        <a href="#contato" class="text-xl text-gray-700 hover:text-blue-900">Contato</a>
    </div>
`;
document.body.appendChild(mobileMenu);

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.add('active');
});

mobileMenu.querySelector('.close-menu').addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

// Close mobile menu when clicking on a link
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Gallery images
const galleryImages = [
    { src: 'images/quarto1.jpg', alt: 'Quarto Standard' },
    { src: 'images/quarto2.jpg', alt: 'Quarto Luxo' },
    { src: 'images/quarto3.jpg', alt: 'Suíte Executiva' },
    { src: 'images/piscina.jpg', alt: 'Piscina' },
    { src: 'images/restaurante.jpg', alt: 'Restaurante' },
    { src: 'images/lobby.jpg', alt: 'Lobby' }
];

// Populate gallery
const galleryContainer = document.querySelector('#galeria .grid');
galleryImages.forEach(image => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item rounded-lg overflow-hidden shadow-xl';
    galleryItem.innerHTML = `
        <img src="${image.src}" alt="${image.alt}" class="w-full h-64 object-cover">
    `;
    galleryContainer.appendChild(galleryItem);
});

// Intersection Observer for section animations
const sections = document.querySelectorAll('section');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Form submission
const contactForm = document.querySelector('form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', { nome, email, mensagem });
    
    // Show success message
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    
    // Reset form
    contactForm.reset();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to navigation links based on scroll position
const navLinks = document.querySelectorAll('nav a');
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-blue-900');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('text-blue-900');
        }
    });
}); 