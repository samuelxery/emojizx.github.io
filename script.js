document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Carousel functionality
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.querySelector('#prev');
    const nextBtn = document.querySelector('#next');

    // Set up the carousel
    let counter = 0;
    const size = carouselImages[0].clientWidth + 20; // Image width + margin

    // Clone first image and append to end for infinite loop effect
    const firstClone = carouselImages[0].cloneNode(true);
    const lastClone = carouselImages[carouselImages.length - 1].cloneNode(true);
    
    carouselSlide.appendChild(firstClone);
    carouselSlide.insertBefore(lastClone, carouselImages[0]);
    
    carouselSlide.style.transform = `translateX(${-size * (counter + 1)}px)`;
    
    // Button listeners
    nextBtn.addEventListener('click', () => {
        if (counter >= carouselImages.length - 1) return;
        carouselSlide.style.transition = "transform 0.5s ease-in-out";
        counter++;
        carouselSlide.style.transform = `translateX(${-size * (counter + 1)}px)`;
    });
    
    prevBtn.addEventListener('click', () => {
        if (counter <= 0) return;
        carouselSlide.style.transition = "transform 0.5s ease-in-out";
        counter--;
        carouselSlide.style.transform = `translateX(${-size * (counter + 1)}px)`;
    });
    
    // Jump to first/last when reaching clones
    carouselSlide.addEventListener('transitionend', () => {
        if (carouselImages[counter + 1] === firstClone) {
            carouselSlide.style.transition = "none";
            counter = 0;
            carouselSlide.style.transform = `translateX(${-size * (counter + 1)}px)`;
        }
        if (carouselImages[counter + 1] === lastClone) {
            carouselSlide.style.transition = "none";
            counter = carouselImages.length - 1;
            carouselSlide.style.transform = `translateX(${-size * (counter + 1)}px)`;
        }
    });

    // Auto slide
    let interval = setInterval(() => {
        if (counter >= carouselImages.length - 1) return;
        carouselSlide.style.transition = "transform 0.5s ease-in-out";
        counter++;
        carouselSlide.style.transform = `translateX(${-size * (counter + 1)}px)`;
    }, 5000);

    // Stop auto slide on hover
    document.querySelector('.featured-carousel').addEventListener('mouseenter', () => {
        clearInterval(interval);
    });

    document.querySelector('.featured-carousel').addEventListener('mouseleave', () => {
        interval = setInterval(() => {
            if (counter >= carouselImages.length - 1) return;
            carouselSlide.style.transition = "transform 0.5s ease-in-out";
            counter++;
            carouselSlide.style.transform = `translateX(${-size * (counter + 1)}px)`;
        }, 5000);
    });

    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = "Sending...";
            submitButton.disabled = true;
            
            // Simulate API call with timeout
            setTimeout(() => {
                // Show success message
                const formGroups = contactForm.querySelectorAll('.form-group');
                formGroups.forEach(group => {
                    group.style.display = 'none';
                });
                
                submitButton.style.display = 'none';
                
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle" style="color: var(--accent-color-3); font-size: 3rem; margin-bottom: 1rem;"></i>
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. We'll get back to you soon!</p>
                `;
                successMessage.style.textAlign = 'center';
                successMessage.style.padding = '2rem';
                
                contactForm.appendChild(successMessage);
                
                // Reset after 5 seconds
                setTimeout(() => {
                    formGroups.forEach(group => {
                        group.style.display = 'block';
                    });
                    contactForm.reset();
                    successMessage.remove();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.display = 'block';
                }, 5000);
                
            }, 2000);
        });
    }

    // Product buttons
    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.parentElement.querySelector('h3').textContent;
            alert(`${productName} added to cart!`);
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
            nav.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.backgroundColor = 'rgba(18, 18, 18, 0.9)';
            nav.style.boxShadow = 'none';
        }
    });
});

