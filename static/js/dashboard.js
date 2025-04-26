// dashboard.js
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const profileToggle = document.getElementById('profileToggle');
    const profileOptions = document.getElementById('profileOptions');
    const replyToggles = document.querySelectorAll('.reply-toggle');
    const likeButtons = document.querySelectorAll('.like-button');
    const topics = document.querySelectorAll('.topic');

    // Toggle sidebar
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        if (window.innerWidth <= 768) {
            sidebar.classList.toggle('expanded');
        }
    });

    // Toggle profile options
    profileToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        profileOptions.classList.toggle('active');
    });

    // Close profile options when clicking elsewhere
    document.addEventListener('click', function(e) {
        if (!profileToggle.contains(e.target) && profileOptions.classList.contains('active')) {
            profileOptions.classList.remove('active');
        }
    });

    // Toggle replies section
    replyToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const topicId = this.getAttribute('data-topic-id');
            const repliesSection = document.getElementById(`replies-${topicId}`);
            
            // Toggle active class
            repliesSection.classList.toggle('active');
            
            // Change button text based on state
            if (repliesSection.classList.contains('active')) {
                this.innerHTML = `<i class="fas fa-times"></i> Hide Replies`;
            } else {
                const replyCount = repliesSection.querySelectorAll('.reply').length;
                this.innerHTML = `<i class="fas fa-comment"></i> Replies (${replyCount})`;
            }
        });
    });

    // Like button functionality
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            const likeCount = this.querySelector('.like-count');
            
            if (this.classList.contains('active')) {
                likeCount.textContent = parseInt(likeCount.textContent) + 1;
                
                // Add like animation
                const heart = document.createElement('span');
                heart.classList.add('heart-animation');
                heart.innerHTML = '<i class="fas fa-heart"></i>';
                this.appendChild(heart);
                
                setTimeout(() => {
                    heart.remove();
                }, 1000);
            } else {
                likeCount.textContent = parseInt(likeCount.textContent) - 1;
            }
        });
    });

    // Add staggered animation to topics
    topics.forEach((topic, index) => {
        topic.style.animationDelay = `${0.1 * index}s`;
    });

    // Add hover effect to topics with mouse movement
    topics.forEach(topic => {
        topic.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate distance from center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Max rotation in degrees
            const maxRotate = 2;
            
            // Calculate rotation based on mouse position
            const rotateX = ((y - centerY) / centerY) * -maxRotate;
            const rotateY = ((x - centerX) / centerX) * maxRotate;
            
            // Apply subtle 3D transform
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        topic.addEventListener('mouseleave', function() {
            // Reset transform on mouse leave
            this.style.transform = '';
        });
    });

    // Responsive behavior for sidebar
    function handleResize() {
        if (window.innerWidth <= 768) {
            sidebar.classList.add('collapsed');
            sidebar.classList.remove('expanded');
        } else if (window.innerWidth <= 992) {
            sidebar.classList.add('collapsed');
        } else {
            sidebar.classList.remove('collapsed');
        }
    }

    // Call on load and window resize
    handleResize();
    window.addEventListener('resize', handleResize);

    // Add CSS animation class when scrolling into view
    function handleScroll() {
        const elements = document.querySelectorAll('.topic');
        
        elements.forEach(element => {
            const position = element.getBoundingClientRect();
            
            // Check if element is in viewport
            if (position.top >= 0 && position.bottom <= window.innerHeight) {
                element.classList.add('in-view');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on load

    // Add textarea auto-resize
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button, .add-skill-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        button, .add-skill-button {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .heart-animation {
            position: absolute;
            font-size: 1.5rem;
            color: #dc3545;
            pointer-events: none;
            animation: float-up 1s forwards;
            top: -5px;
            right: 0;
        }
        
        @keyframes float-up {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-20px) scale(1.5);
            }
        }
    `;
    
    document.head.appendChild(style);
});