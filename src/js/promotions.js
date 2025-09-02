/**
 * Transol Transportation Website
 * Promotions and Advertising JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Promotional Banner
    initPromoBanner();
    
    // Special Offers Countdown
    initOfferCountdowns();
    
    // Testimonial Carousel
    initTestimonialCarousel();
});

/**
 * Initialize promotional banner functionality
 */
function initPromoBanner() {
    const promoBanner = document.querySelector('.promo-banner');
    const promoCloseBtn = document.querySelector('.promo-close');
    
    if (promoBanner && promoCloseBtn) {
        // Check if banner was previously closed
        const bannerClosed = localStorage.getItem('promoBannerClosed');
        
        if (bannerClosed) {
            promoBanner.style.display = 'none';
        }
        
        // Close banner when clicking the close button
        promoCloseBtn.addEventListener('click', function() {
            promoBanner.style.height = promoBanner.offsetHeight + 'px';
            
            // Trigger reflow
            promoBanner.offsetHeight;
            
            // Add transition and collapse
            promoBanner.style.transition = 'height 0.3s ease, opacity 0.3s ease, padding 0.3s ease';
            promoBanner.style.height = '0';
            promoBanner.style.opacity = '0';
            promoBanner.style.padding = '0';
            
            // Store in localStorage
            localStorage.setItem('promoBannerClosed', 'true');
            
            // Remove from DOM after animation
            setTimeout(function() {
                promoBanner.style.display = 'none';
            }, 300);
        });
    }
}

/**
 * Initialize countdown timers for special offers
 */
function initOfferCountdowns() {
    const offerTimers = document.querySelectorAll('.offer-timer span');
    
    if (offerTimers.length > 0) {
        offerTimers.forEach(function(timer) {
            // Get end time from data attribute
            const endTime = timer.getAttribute('data-end-time');
            
            if (endTime) {
                // Update timer every second
                updateCountdown(timer, endTime);
                setInterval(function() {
                    updateCountdown(timer, endTime);
                }, 1000);
            }
        });
    }
}

/**
 * Update countdown timer
 */
function updateCountdown(timerElement, endTimeStr) {
    // Parse end time
    const endTime = new Date(endTimeStr).getTime();
    const now = new Date().getTime();
    const timeLeft = endTime - now;
    
    if (timeLeft <= 0) {
        timerElement.textContent = 'Offer expired';
        return;
    }
    
    // Calculate days, hours, minutes, seconds
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    // Format and display countdown
    let countdownText = '';
    
    if (days > 0) {
        countdownText += days + 'd ';
    }
    
    countdownText += hours.toString().padStart(2, '0') + ':';
    countdownText += minutes.toString().padStart(2, '0') + ':';
    countdownText += seconds.toString().padStart(2, '0');
    
    timerElement.textContent = countdownText;
}

/**
 * Initialize testimonial carousel
 */
function initTestimonialCarousel() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    if (testimonialCards.length > 3) {
        let currentIndex = 0;
        const testimonialContainer = document.querySelector('.testimonials-grid');
        
        // Add navigation buttons
        const navContainer = document.createElement('div');
        navContainer.className = 'testimonial-nav';
        navContainer.innerHTML = `
            <button class="nav-prev"><i class="fas fa-chevron-left"></i></button>
            <div class="nav-dots"></div>
            <button class="nav-next"><i class="fas fa-chevron-right"></i></button>
        `;
        
        const testimonialsSection = document.querySelector('.testimonials');
        testimonialsSection.appendChild(navContainer);
        
        // Create dots
        const dotsContainer = navContainer.querySelector('.nav-dots');
        const totalPages = Math.ceil(testimonialCards.length / 3);
        
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('span');
            dot.className = 'nav-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('data-index', i);
            dotsContainer.appendChild(dot);
            
            // Add click event to dots
            dot.addEventListener('click', function() {
                currentIndex = parseInt(this.getAttribute('data-index'));
                updateTestimonials();
            });
        }
        
        // Add click events to navigation buttons
        const prevBtn = navContainer.querySelector('.nav-prev');
        const nextBtn = navContainer.querySelector('.nav-next');
        
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + totalPages) % totalPages;
            updateTestimonials();
        });
        
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % totalPages;
            updateTestimonials();
        });
        
        // Function to update testimonials display
        function updateTestimonials() {
            // Update active dot
            document.querySelectorAll('.nav-dot').forEach(function(dot, index) {
                dot.classList.toggle('active', index === currentIndex);
            });
            
            // Calculate translation
            const translateValue = -currentIndex * 100 + '%';
            testimonialContainer.style.transform = 'translateX(' + translateValue + ')';
        }
        
        // Add CSS for carousel
        const style = document.createElement('style');
        style.textContent = `
            .testimonials-grid {
                display: flex;
                transition: transform 0.5s ease;
                width: 300%;
            }
            
            .testimonial-card {
                flex: 1;
                min-width: calc(33.333% - 20px);
                margin: 0 10px;
            }
            
            .testimonial-nav {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 30px;
            }
            
            .nav-prev, .nav-next {
                background: none;
                border: none;
                font-size: 1.2rem;
                color: var(--primary-color);
                cursor: pointer;
                padding: 5px 10px;
            }
            
            .nav-dots {
                display: flex;
                margin: 0 15px;
            }
            
            .nav-dot {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: #ddd;
                margin: 0 5px;
                cursor: pointer;
                transition: var(--transition);
            }
            
            .nav-dot.active {
                background-color: var(--primary-color);
            }
            
            @media (max-width: 992px) {
                .testimonials-grid {
                    width: 200%;
                }
                
                .testimonial-card {
                    min-width: calc(50% - 20px);
                }
            }
            
            @media (max-width: 768px) {
                .testimonials-grid {
                    width: 100%;
                }
                
                .testimonial-card {
                    min-width: calc(100% - 20px);
                }
            }
        `;
        
        document.head.appendChild(style);
        
        // Initialize testimonials
        updateTestimonials();
    }
}