/**
 * Transol Transportation Website
 * Loading and Transitions JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Page loader
    const pageLoader = document.querySelector('.page-loader');
    
    if (pageLoader) {
        // Hide loader after page is fully loaded
        window.addEventListener('load', function() {
            setTimeout(function() {
                pageLoader.classList.add('fade-out');
                
                // Enable scrolling after loader is hidden
                setTimeout(function() {
                    document.body.style.overflow = '';
                    pageLoader.style.display = 'none';
                }, 500);
            }, 800); // Adjust timing as needed
        });
    }
    
    // Lazy load images
    const lazyImages = document.querySelectorAll('.lazy-image');
    
    if (lazyImages.length > 0) {
        // Create IntersectionObserver if supported
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');
                        
                        if (src) {
                            img.src = src;
                            img.addEventListener('load', function() {
                                img.classList.add('loaded');
                            });
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });
            
            lazyImages.forEach(function(img) {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            lazyImages.forEach(function(img) {
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.addEventListener('load', function() {
                        img.classList.add('loaded');
                    });
                }
            });
        }
    }
    
    // Page transitions for links
    const pageLinks = document.querySelectorAll('a[href$=".html"]');
    const pageTransition = document.querySelector('.page-transition');
    
    if (pageLinks.length > 0 && pageTransition) {
        pageLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                // Don't transition if it's an external link or has a specific attribute
                if (this.getAttribute('target') === '_blank' || this.hasAttribute('data-no-transition')) {
                    return;
                }
                
                e.preventDefault();
                const href = this.getAttribute('href');
                
                // Activate transition
                pageTransition.classList.add('active');
                
                // Navigate to new page after transition completes
                setTimeout(function() {
                    window.location.href = href;
                }, 500);
            });
        });
    }
    
    // Handle back button and initial page load transition
    window.addEventListener('pageshow', function(event) {
        if (event.persisted && pageTransition) {
            pageTransition.classList.remove('active');
            pageTransition.classList.add('exit');
            
            setTimeout(function() {
                pageTransition.classList.remove('exit');
            }, 500);
        }
    });
});

// Function to preload images
function preloadImages(images) {
    images.forEach(function(src) {
        const img = new Image();
        img.src = src;
    });
}

// Preload important images
document.addEventListener('DOMContentLoaded', function() {
    // List of important images to preload
    const importantImages = [
        'images/hero-bg.jpg',
        'images/about-transol.jpg',
        'images/standard-card.png',
        'images/premium-card.png',
        'images/student-card.png'
    ];
    
    // Preload images
    preloadImages(importantImages);
});