// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('nav ul');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    mobileMenuBtn.classList.toggle('active');
});

// Header Scroll Effect
const header = document.querySelector('header');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Add background when scrolled
    if (scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide header when scrolling down, show when scrolling up
    if (scrollY > lastScrollY && scrollY > 200) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }
    
    lastScrollY = scrollY;
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Close mobile menu if open
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                mobileMenuBtn.classList.remove('active');
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Image Lazy Loading
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
});

// Counter Animation
function startCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Lower is faster
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / speed;
        
        const updateCount = () => {
            const count = +counter.innerText;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target + '+';
            }
        };
        
        updateCount();
    });
}

// Start counter when milestones section is visible
const milestonesSection = document.querySelector('.milestones');
let counterStarted = false;

window.addEventListener('scroll', () => {
    if (milestonesSection) {
        const sectionPosition = milestonesSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition < screenPosition && !counterStarted) {
            startCounters();
            counterStarted = true;
        }
    }
});

// Add additional styling to the header CSS class
document.addEventListener('DOMContentLoaded', () => {
    const additionalHeaderStyles = document.createElement('style');
    additionalHeaderStyles.innerHTML = `
        header.scrolled {
            background: rgba(0, 0, 0, 0.95);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        header.hidden {
            transform: translateY(-100%);
        }
        
        nav ul.show {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(0, 0, 0, 0.95);
            padding: 20px 0;
            text-align: center;
        }
        
        nav ul.show li {
            margin: 15px 0;
        }
        
        .mobile-menu-btn.active i::before {
            content: "\\f00d";
        }
    `;
    document.head.appendChild(additionalHeaderStyles);
});

// Simple Animation on Scroll
window.addEventListener('scroll', () => {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    animateElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Create success message
            const formContainer = contactForm.parentElement;
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message animate-on-scroll animate';
            successMessage.innerHTML = `
                <h3>Thank you for your message!</h3>
                <p>We've received your inquiry and will get back to you shortly.</p>
                <button id="newMessage" class="btn">Send Another Message</button>
            `;
            
            // Hide form and show success message
            contactForm.style.display = 'none';
            formContainer.appendChild(successMessage);
            
            // Reset form for future use
            contactForm.reset();
            
            // Add event listener to the "Send Another Message" button
            document.getElementById('newMessage').addEventListener('click', () => {
                successMessage.remove();
                contactForm.style.display = 'block';
            });
        });
    }
});

// Add hover effects to project items
document.addEventListener('DOMContentLoaded', () => {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        const img = item.querySelector('img');
        const info = item.querySelector('.project-info');
        
        // Add mouse enter event
        item.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
            info.style.opacity = '1';
            info.style.transform = 'translateY(0)';
        });
        
        // Add mouse leave event
        item.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
            info.style.opacity = '0';
            info.style.transform = 'translateY(20px)';
        });
    });
});

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to milestone items
    document.querySelectorAll('.milestone-item').forEach(item => {
        item.classList.add('animate-on-scroll');
    });
    
    // Add animation classes to brand items
    document.querySelectorAll('.brand-item, .partner-item').forEach(item => {
        item.classList.add('animate-on-scroll');
    });
    
    // Add animation classes to project items
    document.querySelectorAll('.project-item').forEach(item => {
        item.classList.add('animate-on-scroll');
    });
});

// Add animation styles
document.addEventListener('DOMContentLoaded', () => {
    const animationStyles = document.createElement('style');
    animationStyles.innerHTML = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-on-scroll.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyles);
});

// Hero Content Animation
document.addEventListener('DOMContentLoaded', function() {
    // Add a slight delay to make sure everything is loaded
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-content h1');
        const heroParagraph = document.querySelector('.hero-content p');
        const heroButton = document.querySelector('.hero-content .btn');
        
        if (heroTitle) heroTitle.classList.add('animate');
        if (heroParagraph) heroParagraph.classList.add('animate');
        if (heroButton) heroButton.classList.add('animate');
    }, 300);
});

// Simplified theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Apply saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    console.log('Initial theme:', savedTheme);
    
    // Theme toggle event listener
    if (themeToggle) {
        console.log('Theme toggle button found');
        
        themeToggle.addEventListener('click', function() {
            console.log('Theme toggle clicked');
            
            // Toggle theme
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            console.log('Changing theme from', currentTheme, 'to', newTheme);
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Add transition class for smooth theme change
            html.classList.add('theme-transition');
            
            // Remove transition class after transition completes
            setTimeout(() => {
                html.classList.remove('theme-transition');
            }, 500);
        });
    } else {
        console.error('Theme toggle button not found!');
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav ul');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
});

// Video Background Handler
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('hero-video');
    
    if (video) {
        // Try to play the video
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Video playback started successfully
                console.log('Video playback started');
            })
            .catch(error => {
                // Auto-play was prevented
                console.log('Video autoplay was prevented:', error);
                
                // Add a play button as fallback
                const videoContainer = document.querySelector('.video-container');
                const playButton = document.createElement('button');
                playButton.classList.add('video-play-btn');
                playButton.innerHTML = '<i class="fas fa-play"></i>';
                videoContainer.appendChild(playButton);
                
                // Play video on click
                playButton.addEventListener('click', () => {
                    video.play();
                    playButton.style.display = 'none';
                });
            });
        }
        
        // Fallback to image if video fails to load
        video.addEventListener('error', function() {
            const heroSection = document.querySelector('.hero');
            heroSection.style.backgroundImage = 'linear-gradient(rgba(18, 18, 18, 0.8), rgba(18, 18, 18, 0.8)), url("img/hero-bg.svg")';
            heroSection.style.backgroundSize = 'cover';
            heroSection.style.backgroundPosition = 'center';
            document.querySelector('.video-container').style.display = 'none';
        });
    }
});

// Optimize performance by using requestAnimationFrame and debouncing
document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const header = document.querySelector('header');
    const heroContent = document.querySelector('.hero-content');
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const counterElements = document.querySelectorAll('.counter');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav ul');
    
    // Theme toggle functionality
    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        html.setAttribute('data-theme', savedTheme);
        
        themeToggle.addEventListener('click', function() {
            // Add transition class for smooth theme change
            html.classList.add('theme-transition');
            
            // Toggle theme
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            console.log('Theme toggled to:', newTheme); // Debug log
            
            // Remove transition class after transition completes
            setTimeout(() => {
                html.classList.remove('theme-transition');
            }, 500);
        });
    }
    
    // Mobile menu toggle
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Hero section animation
    if (heroContent) {
        const heroTitle = heroContent.querySelector('h1');
        const heroParagraph = heroContent.querySelector('p');
        const heroButton = heroContent.querySelector('.btn');
        
        if (heroTitle) heroTitle.classList.add('animate');
        if (heroParagraph) heroParagraph.classList.add('animate');
        if (heroButton) heroButton.classList.add('animate');
    }
    
    // Debounce function to limit scroll event firing
    function debounce(func, wait = 10, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // Optimized scroll animation handler
    const handleScroll = debounce(function() {
        // Header scroll effect
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Animate elements when they come into view
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                if (!element.classList.contains('animate')) {
                    element.classList.add('animate');
                }
            }
        });
    }, 10);
    
    // Use passive event listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check for elements in view
    handleScroll();
    
    // Optimized counter animation
    function animateCounter(counter) {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // ms
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        const startTime = performance.now();
        
        function updateCounter(timestamp) {
            const elapsed = timestamp - startTime;
            current = Math.min(Math.floor((elapsed / duration) * target), target);
            counter.textContent = current;
            
            if (current < target) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Intersection Observer for counter elements
    if ('IntersectionObserver' in window && counterElements.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterElements.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                // Form is valid - would normally submit to server
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill out all required fields.');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        });
    });
});

// Growth Chart
const growthCtx = document.getElementById('growthChart');
if (growthCtx) {
    const growthChart = new Chart(growthCtx, {
        type: 'line',
        data: {
            labels: ['2023', '2024', '2025'],
            datasets: [{
                label: 'Company Growth',
                data: [0, 45, 89],
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#10B981',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#fff',
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#fff'
                    }
                }
            }
        }
    });
} 