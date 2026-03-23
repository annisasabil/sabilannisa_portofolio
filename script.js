// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth Scroll
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

// Portfolio Data
const projects = [
    {
        title: "Github Finder",
        description: "Aplikasi pencarian user pada platform Github. Menampilkan detail user, followers, following, dan bisa menyimpan favorite user.",
        tech: ["Kotlin", "Retrofit", "Glide", "ViewModel", "Room", "DAO"],
        icon: "fab fa-github",  
        githubLink: "https://github.com/annisasabil/GithubFinder",
        playstoreLink: "https://play.google.com/store/apps/details?id=com.group.githubfinder&pcampaignid=web_share"
    },
    {
        title: "Recipefy",
        description: "Aplikasi yang merekomendasikan resep makanan berdasarkan bahan-bahan yang ada di dapur.",
        tech: ["Kotlin", "Retrofit", "Glide", "ViewModel"],
        icon: "fas fa-utensils",
        githubLink: "https://github.com/Capstone-CH2-PS278/Mobile-Development",  
        playstoreLink: null  
    }
];

// Load Portfolio
function loadPortfolio() {
    const portfolioContainer = document.getElementById('portfolio-container');
    if (portfolioContainer) {
        portfolioContainer.innerHTML = projects.map(project => `
            <div class="portfolio-card">
                <div class="portfolio-image">
                    <i class="${project.icon}"></i>
                </div>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="portfolio-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="portfolio-links">
                    <a href="${project.githubLink}" class="portfolio-link" target="_blank">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                    ${project.playstoreLink ? `
                    <a href="${project.playstoreLink}" class="portfolio-link playstore-link" target="_blank">
                        <i class="fab fa-google-play"></i> Play Store
                    </a>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }
}

// Animate progress bars on scroll
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Contact Form Handler
// Contact Form Handler - Kirim ke WhatsApp (pakai nomor telepon user)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Ambil data dari form
        const name = contactForm.querySelector('input[placeholder="Your Name"]').value;
        const phone = contactForm.querySelector('input[placeholder="Your WhatsApp Number"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Validasi
        if (!name || !phone || !message) {
            alert('Mohon isi semua field ya!');
            return;
        }
        
        // Format pesan untuk WhatsApp kamu
        const whatsappMessage = `Halo Annisa!%0A%0A*Nama:* ${name}%0A*No. WhatsApp:* ${phone}%0A*Pesan:*%0A${message}%0A%0A—%0ADikirim dari portfolio website`;
        
        // Nomor WhatsApp kamu (format internasional tanpa 0 di depan)
        const myPhoneNumber = '6282119592176';
        
        // Buat link WhatsApp
        const whatsappUrl = `https://wa.me/${myPhoneNumber}?text=${whatsappMessage}`;
        
        // Buka WhatsApp di tab baru
        window.open(whatsappUrl, '_blank');
        
        alert('Terima kasih! Kamu akan diarahkan ke WhatsApp untuk mengirim pesan.');
        contactForm.reset();
    });
}

// Navbar background effect on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(11, 16, 32, 0.98)';
            navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
        } else {
            navbar.style.background = 'rgba(11, 16, 32, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        }
    }
});

// Initialize all functions when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadPortfolio();
    loadTestimonials();
    animateProgressBars();
    
    // Add active class to nav links based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
});