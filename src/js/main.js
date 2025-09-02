/**
 * Transol Transportation Website
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create menu overlay element
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
            
            // Change icon based on menu state
            const icon = this.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking overlay
    menuOverlay.addEventListener('click', function() {
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
            
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (nav.classList.contains('active') && 
            !nav.contains(event.target) && 
            !mobileMenuBtn.contains(event.target)) {
            nav.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
            
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active menu item based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    function highlightNavItem() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Handle case when at the top of the page
        if (scrollPosition < 100) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#') {
                    link.classList.add('active');
                }
            });
        }
    }
    
    window.addEventListener('scroll', highlightNavItem);
    highlightNavItem(); // Call once on page load
    
    // Initialize Maps (Placeholder for actual map implementation)
    initMaps();
    
    // Form Validation
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let valid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            if (!name.value.trim()) {
                showError(name, 'Name is required');
                valid = false;
            } else {
                removeError(name);
            }
            
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                valid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                valid = false;
            } else {
                removeError(email);
            }
            
            if (!subject.value.trim()) {
                showError(subject, 'Subject is required');
                valid = false;
            } else {
                removeError(subject);
            }
            
            if (!message.value.trim()) {
                showError(message, 'Message is required');
                valid = false;
            } else {
                removeError(message);
            }
            
            if (valid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                setTimeout(() => {
                    // Reset form
                    contactForm.reset();
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Your message has been sent successfully!';
                    successMessage.style.color = 'var(--success-color)';
                    successMessage.style.padding = '10px';
                    successMessage.style.marginTop = '10px';
                    successMessage.style.backgroundColor = '#d4edda';
                    successMessage.style.borderRadius = 'var(--border-radius)';
                    
                    contactForm.appendChild(successMessage);
                    
                    // Reset button
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                }, 1500);
            }
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button');
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                emailInput.style.borderColor = 'var(--danger-color)';
                return;
            }
            
            emailInput.style.borderColor = '';
            
            // Simulate subscription
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = '...';
            
            setTimeout(() => {
                // Reset form
                newsletterForm.reset();
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.textContent = 'Subscribed successfully!';
                successMessage.style.color = 'white';
                successMessage.style.marginTop = '10px';
                
                newsletterForm.appendChild(successMessage);
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 1500);
        });
    }
    
    // Transport card purchase buttons
    const purchaseButtons = document.querySelectorAll('.card-option .btn');
    purchaseButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const cardName = this.closest('.card-option').querySelector('h3').textContent;
            alert(`You are about to purchase a ${cardName}. This would redirect to a secure payment page in a production environment.`);
        });
    });
    
    // Recharge form
    const rechargeForm = document.querySelector('.recharge-form');
    if (rechargeForm) {
        const rechargeButton = rechargeForm.querySelector('button');
        
        rechargeButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const cardNumber = rechargeForm.querySelector('input').value;
            const amount = rechargeForm.querySelector('select').value;
            
            if (!cardNumber.trim()) {
                alert('Please enter a card number');
                return;
            }
            
            if (!amount) {
                alert('Please select an amount');
                return;
            }
            
            alert(`You are about to recharge card ${cardNumber} with $${amount}. This would redirect to a secure payment page in a production environment.`);
        });
    }
    
    // Route search functionality
    const routeSearch = document.getElementById('route-search');
    if (routeSearch) {
        routeSearch.addEventListener('input', function() {
            // This would filter routes in a real implementation
            console.log('Searching for:', this.value);
        });
    }
    
    // Bus stop search functionality
    const stopSearch = document.getElementById('stop-search');
    if (stopSearch) {
        stopSearch.addEventListener('input', function() {
            // This would filter stops in a real implementation
            console.log('Searching for stop:', this.value);
        });
    }
});

// Helper Functions

// Initialize maps (placeholder)
function initMaps() {
    // This would be replaced with actual map initialization code
    console.log('Maps initialized');
    
    // Simulate map loading
    setTimeout(() => {
        const mapPlaceholders = document.querySelectorAll('#map-placeholder, #stops-map-placeholder');
        
        mapPlaceholders.forEach(placeholder => {
            placeholder.innerHTML = `
                <div style="background-color: #e9ecef; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
                    <div style="text-align: center;">
                        <i class="fas fa-map-marked-alt" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 15px;"></i>
                        <p>Interactive Map</p>
                        <p style="font-size: 0.8rem; color: var(--gray-color);">This would be an interactive map in the production version</p>
                    </div>
                </div>
            `;
        });
    }, 1000);
}

// Email validation
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Show error message
function showError(input, message) {
    const formGroup = input.parentElement;
    
    // Remove existing error message if any
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error class
    input.style.borderColor = 'var(--danger-color)';
    
    // Create and append error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    errorMessage.style.color = 'var(--danger-color)';
    errorMessage.style.fontSize = '0.8rem';
    errorMessage.style.marginTop = '5px';
    
    formGroup.appendChild(errorMessage);
}

// Remove error message
function removeError(input) {
    const formGroup = input.parentElement;
    
    // Remove error class
    input.style.borderColor = '';
    
    // Remove error message if any
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}