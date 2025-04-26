// index.js
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="loader">
            <div class="loader-logo">
                <i class="fas fa-feather-alt"></i>
            </div>
        </div>
    `;
    document.body.appendChild(preloader);

    // Hide preloader after page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });

    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Clone auth buttons for mobile
            if (!document.querySelector('.auth-buttons.mobile-visible') && navLinks.classList.contains('active')) {
                const authButtons = document.querySelector('.auth-buttons').cloneNode(true);
                authButtons.classList.add('mobile-visible');
                navLinks.appendChild(authButtons);
            }
        });
    }

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;

    function showSlide(index) {
        testimonials.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    if (prevBtn && nextBtn && dots.length) {
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
            showSlide(currentSlide);
        });

        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % testimonials.length;
            showSlide(currentSlide);
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
            });
        });

        // Auto slide
        let slideInterval = setInterval(function() {
            currentSlide = (currentSlide + 1) % testimonials.length;
            showSlide(currentSlide);
        }, 5000);

        // Pause auto slide on hover
        const testimonialSlider = document.getElementById('testimonialSlider');
        if (testimonialSlider) {
            testimonialSlider.addEventListener('mouseenter', function() {
                clearInterval(slideInterval);
            });

            testimonialSlider.addEventListener('mouseleave', function() {
                slideInterval = setInterval(function() {
                    currentSlide = (currentSlide + 1) % testimonials.length;
                    showSlide(currentSlide);
                }, 5000);
            });
        }

        // Show first slide initially
        showSlide(0);
    }

    // Count Animation
    function animateCount(element, target) {
        let count = 0;
        const increment = Math.ceil(target / 100);
        const duration = 2000; // ms
        const interval = Math.floor(duration / (target / increment));
        
        const counter = setInterval(() => {
            count += increment;
            if (count >= target) {
                element.textContent = target + '+';
                clearInterval(counter);
            } else {
                element.textContent = count + '+';
            }
        }, interval);
    }

    // Intersection Observer for animation triggers
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'userCount') {
                    animateCount(entry.target, 5000);
                } else if (entry.target.id === 'topicCount') {
                    animateCount(entry.target, 2500);
                } else if (entry.target.id === 'skillCount') {
                    animateCount(entry.target, 300);
                } else if (entry.target.classList.contains('feature-card')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.stat-number').forEach(stat => {
        observer.observe(stat);
    });

    // Animate feature cards on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Flying birds animation
    function createFlyingBirds() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const bird = document.createElement('div');
                bird.className = 'flying-bird';
                bird.style.top = `${Math.random() * 70 + 10}vh`;
                bird.style.animationDuration = `${Math.random() * 10 + 15}s`;
                document.querySelector('.birds-container').appendChild(bird);

                // Remove bird after animation ends
                setTimeout(() => {
                    bird.remove();
                }, parseFloat(bird.style.animationDuration) * 1000);
            }, i * 3000);
        }
    }

    // Create initial birds
    createFlyingBirds();

    // Create new birds every 15 seconds
    setInterval(createFlyingBirds, 15000);

    // Add back to top button
    const backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(backToTopBtn);

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }

    // 3D hover effect for feature cards
    featureCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const maxRotate = 5;
            
            const rotateX = ((y - centerY) / centerY) * -maxRotate;
            const rotateY = ((x - centerX) / centerX) * maxRotate;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Add background particle effect
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '5px';
        particle.style.height = '5px';
        particle.style.background = `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, 0.7)`;
        particle.style.borderRadius = '50%';
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '-1';
        document.body.appendChild(particle);

        // Animate particle
        const animationDuration = Math.random() * 30 + 10;
        particle.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 0.7 },
            { transform: `translateY(-100vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: animationDuration * 1000,
            easing: 'linear',
            iterations: 1
        });

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, animationDuration * 1000);
    }

    // Create particles periodically
    setInterval(createParticle, 2000);

    // Create initial particles
    for (let i = 0; i < 10; i++) {
        setTimeout(createParticle, i * 200);
    }
});