// Utility function for typewriter effect
function typeWriter(elementId, text, speed) {
    let i = 0;
    const element = document.getElementById(elementId);
    if (!element) return; // Exit if element not found

    element.textContent = ''; // Clear any existing text to start fresh

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Typing complete. You can decide if the cursor should stop blinking or remain.
            // If you want the cursor to stop blinking after typing:
            // const cursor = document.querySelector('.cursor');
            // if (cursor) {
            //     cursor.style.animation = 'none';
            //     cursor.style.opacity = '1';
            // }
        }
    }
    type(); // Start the typing process
}

document.addEventListener('DOMContentLoaded', function() {
    // --- Smooth scrolling for navigation links ---
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor click behavior

            const targetId = this.getAttribute('href').substring(1); // Get the target section's ID
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - document.querySelector('header').offsetHeight, // Adjust for fixed header
                    behavior: 'smooth'
                });

                // Optional: Close mobile menu after clicking a link (if menu is open)
                if (navLinksUl.classList.contains('active')) {
                    navLinksUl.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // --- Highlight active navigation link on scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav .nav-links a');
    const header = document.querySelector('header');

    const highlightNavLink = () => {
        let current = '';
        const headerHeight = header.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight;
            const sectionHeight = section.clientHeight;
            // Check if more than 50% of the section is in view, or its top is within viewport
            if (pageYOffset >= sectionTop - sectionHeight / 2 && pageYOffset < sectionTop + sectionHeight / 2) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Call on load to set initial active link

    // --- Mobile Navigation Toggle (Hamburger Menu functionality) ---
    const navLinksUl = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        navLinksUl.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // --- Scroll-based animations for general sections using Intersection Observer ---
    const animatedElements = document.querySelectorAll(
        '.about-section p, .project-item, .contact-form, .contact-info p, .contact-info a'
    );

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of element visible
    };

    const generalObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        generalObserver.observe(element);
    });

    // --- Scroll-based animations for Skills Section with staggered effect ---
    const skillsSection = document.querySelector('.skills-section');
    const skillItems = document.querySelectorAll('.skill-item');

    const skillsObserverOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the section is visible
    };

    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillItems.forEach((item, index) => {
                    item.style.animationDelay = `${index * 0.08}s`;
                    item.classList.add('fade-in-up');
                });
                observer.unobserve(entry.target);
            }
        });
    }, skillsObserverOptions);

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // --- Animate Hero Section elements on initial load and type name ---
    const elementsToFadeInOnLoad = document.querySelectorAll(
        'header, .hero-text-content .tagline, .hero-buttons .btn, .hero-image'
    );

    // Apply staggered fade-in to initial elements (excluding the H1's "Hi, I'm" part initially)
    elementsToFadeInOnLoad.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        el.classList.add('fade-in-on-load');
    });

    // Handle the H1's "Hi, I'm" fade-in and then the typewriter effect
    const heroH1 = document.querySelector('.hero-text-content h1');
    if (heroH1) {
        // Ensure "Hi, I'm" fades in. It starts with an animation delay to follow the other initial elements.
        heroH1.classList.add('fade-in-on-load');
        // Calculate a suitable delay for "Hi, I'm" to start animating after previous elements
        heroH1.style.animationDelay = `${elementsToFadeInOnLoad.length * 0.1}s`;

        // Start the typewriter effect after the "Hi, I'm" fade-in animation has completed
        // The 0.6s is the duration of fade-in-on-load animation (from style.css)
        const typewriterStartDelay = (elementsToFadeInOnLoad.length * 0.1 + 0.6) * 1000;

        setTimeout(() => {
            typeWriter('typed-name', 'Robin Hood', 100); // Type 'Robin Hood' at 100ms speed per character
        }, typewriterStartDelay);
    }
});