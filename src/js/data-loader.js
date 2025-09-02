/**
 * Transol Transportation Website
 * Data Loader JavaScript
 * Handles loading and displaying dynamic data from JSON files
 */

document.addEventListener('DOMContentLoaded', function() {
    // Load routes data
    loadRoutes();
    
    // Load stops data
    loadStops();
    
    // Load cards data
    loadCards();
    
    // Setup search functionality
    setupSearch();
});

/**
 * Load and display routes data
 */
function loadRoutes() {
    fetch('data/routes.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayRoutes(data.routes);
        })
        .catch(error => {
            console.error('Error loading routes data:', error);
            // Display fallback content or error message
        });
}

/**
 * Display routes in the UI
 */
function displayRoutes(routes) {
    const routeList = document.querySelector('.route-list ul');
    if (!routeList) return;
    
    // Clear existing content
    routeList.innerHTML = '';
    
    // Display routes (limit to 5 for UI)
    const displayLimit = Math.min(routes.length, 5);
    
    for (let i = 0; i < displayLimit; i++) {
        const route = routes[i];
        
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="route-number">${route.id}</div>
            <div class="route-details">
                <h4>${route.name}</h4>
                <p>Frequency: ${route.frequency}</p>
            </div>
            <a href="#" class="btn btn-small route-details-btn" data-route-id="${route.id}">View</a>
        `;
        
        routeList.appendChild(li);
    }
    
    // Add event listeners to route detail buttons
    document.querySelectorAll('.route-details-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const routeId = parseInt(this.getAttribute('data-route-id'));
            showRouteDetails(routes.find(route => route.id === routeId));
        });
    });
}

/**
 * Show detailed information for a specific route
 */
function showRouteDetails(route) {
    // Create modal for route details
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    // Create stops list
    const stopsList = route.stops.map(stop => `<li>${stop}</li>`).join('');
    
    modalContent.innerHTML = `
        <span class="close-modal">&times;</span>
        <h2>Route ${route.id}: ${route.name}</h2>
        <div class="route-info">
            <p><strong>Frequency:</strong> ${route.frequency}</p>
            
            <div class="schedule-info">
                <h3>Schedule</h3>
                <div class="schedule-grid">
                    <div class="schedule-column">
                        <h4>Weekdays</h4>
                        <p>First departure: ${route.schedule.weekdays.first_departure}</p>
                        <p>Last departure: ${route.schedule.weekdays.last_departure}</p>
                    </div>
                    <div class="schedule-column">
                        <h4>Weekends</h4>
                        <p>First departure: ${route.schedule.weekends.first_departure}</p>
                        <p>Last departure: ${route.schedule.weekends.last_departure}</p>
                    </div>
                </div>
            </div>
            
            <div class="stops-info">
                <h3>Stops</h3>
                <ul class="route-stops-list">
                    ${stopsList}
                </ul>
            </div>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Show modal
    setTimeout(() => {
        modal.style.display = 'flex';
    }, 10);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        setTimeout(() => {
            modal.remove();
        }, 300);
    });
    
    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    });
}

/**
 * Load and display bus stops data
 */
function loadStops() {
    fetch('data/stops.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayStops(data.stops);
        })
        .catch(error => {
            console.error('Error loading stops data:', error);
            // Display fallback content or error message
        });
}

/**
 * Display stops in the UI
 */
function displayStops(stops) {
    const stopsList = document.querySelector('.stops-list ul');
    if (!stopsList) return;
    
    // Clear existing content
    stopsList.innerHTML = '';
    
    // Display stops (limit to 5 for UI)
    const displayLimit = Math.min(stops.length, 5);
    
    for (let i = 0; i < displayLimit; i++) {
        const stop = stops[i];
        
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="stop-icon"><i class="fas fa-bus"></i></div>
            <div class="stop-details">
                <h4>${stop.name}</h4>
                <p>Routes: ${stop.routes.join(', ')}</p>
                <p>${(Math.random() * 2).toFixed(1)} miles away</p>
            </div>
            <a href="#" class="btn btn-small stop-details-btn" data-stop-id="${stop.id}">Details</a>
        `;
        
        stopsList.appendChild(li);
    }
    
    // Add event listeners to stop detail buttons
    document.querySelectorAll('.stop-details-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const stopId = parseInt(this.getAttribute('data-stop-id'));
            showStopDetails(stops.find(stop => stop.id === stopId));
        });
    });
}

/**
 * Show detailed information for a specific stop
 */
function showStopDetails(stop) {
    // Create modal for stop details
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    // Create amenities list
    const amenitiesList = stop.amenities.map(amenity => `<li>${amenity}</li>`).join('');
    
    // Create nearby list
    const nearbyList = stop.nearby.map(place => `<li>${place}</li>`).join('');
    
    modalContent.innerHTML = `
        <span class="close-modal">&times;</span>
        <h2>${stop.name}</h2>
        <div class="stop-info">
            <div class="stop-map">
                <div style="background-color: #e9ecef; width: 100%; height: 200px; display: flex; justify-content: center; align-items: center; margin-bottom: 20px;">
                    <div style="text-align: center;">
                        <i class="fas fa-map-marker-alt" style="font-size: 2rem; color: var(--primary-color); margin-bottom: 10px;"></i>
                        <p>Stop Location Map</p>
                        <p style="font-size: 0.8rem; color: var(--gray-color);">Coordinates: ${stop.location.lat}, ${stop.location.lng}</p>
                    </div>
                </div>
            </div>
            
            <div class="stop-details-grid">
                <div class="stop-details-column">
                    <h3>Routes</h3>
                    <p>This stop serves routes: ${stop.routes.join(', ')}</p>
                    
                    <h3>Amenities</h3>
                    <ul class="amenities-list">
                        ${amenitiesList}
                    </ul>
                </div>
                
                <div class="stop-details-column">
                    <h3>Nearby</h3>
                    <ul class="nearby-list">
                        ${nearbyList}
                    </ul>
                </div>
            </div>
            
            <div class="stop-actions">
                <button class="btn btn-primary">Get Directions</button>
                <button class="btn btn-secondary">View Schedule</button>
            </div>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Show modal
    setTimeout(() => {
        modal.style.display = 'flex';
    }, 10);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        setTimeout(() => {
            modal.remove();
        }, 300);
    });
    
    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    });
    
    // Add event listeners to buttons
    modal.querySelector('.stop-actions .btn-primary').addEventListener('click', function() {
        alert(`This would open directions to ${stop.name} in a maps application.`);
    });
    
    modal.querySelector('.stop-actions .btn-secondary').addEventListener('click', function() {
        alert(`This would show the detailed schedule for all routes serving ${stop.name}.`);
    });
}

/**
 * Load and display transport cards data
 */
function loadCards() {
    fetch('data/cards.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayCards(data.cards);
            setupRechargeOptions(data.recharge_options);
        })
        .catch(error => {
            console.error('Error loading cards data:', error);
            // Display fallback content or error message
        });
}

/**
 * Display transport cards in the UI
 */
function displayCards(cards) {
    const cardsGrid = document.querySelector('.cards-grid');
    if (!cardsGrid) return;
    
    // Clear existing content
    cardsGrid.innerHTML = '';
    
    // Display only the first 3 cards for the main UI
    const displayLimit = Math.min(cards.length, 3);
    
    for (let i = 0; i < displayLimit; i++) {
        const card = cards[i];
        
        const cardElement = document.createElement('div');
        cardElement.className = `card-option${card.featured ? ' featured' : ''}`;
        
        // Add featured badge if applicable
        if (card.featured) {
            cardElement.innerHTML += `<div class="card-badge">Most Popular</div>`;
        }
        
        cardElement.innerHTML += `
            <div class="card-image">
                <img src="images/${card.image}" alt="${card.name}">
            </div>
            <h3>${card.name}</h3>
            <p>${card.description}</p>
            <p class="price">$${card.price.toFixed(2)} / ${card.period}</p>
            <a href="#" class="btn btn-primary card-details-btn" data-card-id="${card.id}">Purchase</a>
        `;
        
        cardsGrid.appendChild(cardElement);
    }
    
    // Add event listeners to card detail buttons
    document.querySelectorAll('.card-details-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const cardId = this.getAttribute('data-card-id');
            showCardDetails(cards.find(card => card.id === cardId));
        });
    });
}

/**
 * Show detailed information for a specific card
 */
function showCardDetails(card) {
    // Create modal for card details
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    // Create benefits list
    const benefitsList = card.benefits.map(benefit => `<li><i class="fas fa-check"></i> ${benefit}</li>`).join('');
    
    // Create restrictions list
    const restrictionsList = card.restrictions.map(restriction => `<li><i class="fas fa-exclamation-circle"></i> ${restriction}</li>`).join('');
    
    modalContent.innerHTML = `
        <span class="close-modal">&times;</span>
        <h2>${card.name}</h2>
        <div class="card-info">
            <div class="card-image-large">
                <img src="images/${card.image}" alt="${card.name}">
            </div>
            
            <div class="card-details-content">
                <p class="card-description">${card.description}</p>
                <p class="card-price">$${card.price.toFixed(2)} / ${card.period}</p>
                
                <div class="card-benefits">
                    <h3>Benefits</h3>
                    <ul class="benefits-list">
                        ${benefitsList}
                    </ul>
                </div>
                
                <div class="card-restrictions">
                    <h3>Restrictions</h3>
                    <ul class="restrictions-list">
                        ${restrictionsList}
                    </ul>
                </div>
                
                <div class="card-actions">
                    <button class="btn btn-primary">Purchase Card</button>
                    <button class="btn btn-secondary">Learn More</button>
                </div>
            </div>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Show modal
    setTimeout(() => {
        modal.style.display = 'flex';
    }, 10);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        setTimeout(() => {
            modal.remove();
        }, 300);
    });
    
    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    });
    
    // Add event listeners to buttons
    modal.querySelector('.card-actions .btn-primary').addEventListener('click', function() {
        alert(`You are about to purchase a ${card.name} for $${card.price.toFixed(2)}. This would redirect to a secure payment page in a production environment.`);
    });
    
    modal.querySelector('.card-actions .btn-secondary').addEventListener('click', function() {
        alert(`This would show more detailed information about the ${card.name}.`);
    });
}

/**
 * Setup recharge options in the dropdown
 */
function setupRechargeOptions(options) {
    const select = document.querySelector('.recharge-form select');
    if (!select) return;
    
    // Clear existing options except the first one
    while (select.options.length > 1) {
        select.remove(1);
    }
    
    // Add options from data
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.amount;
        optionElement.textContent = `$${option.amount.toFixed(2)}${option.bonus > 0 ? ` (+ $${option.bonus.toFixed(2)} bonus)` : ''}`;
        select.appendChild(optionElement);
    });
}

/**
 * Setup search functionality
 */
function setupSearch() {
    // Route search
    const routeSearch = document.getElementById('route-search');
    if (routeSearch) {
        routeSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            // This would filter routes in a real implementation
            // For now, just log the search term
            console.log('Searching for route:', searchTerm);
            
            // Simulate search results
            if (searchTerm.length > 2) {
                // Show a message that this would search in a real implementation
                const routeList = document.querySelector('.route-list');
                if (routeList) {
                    const searchMessage = document.createElement('div');
                    searchMessage.className = 'search-message';
                    searchMessage.textContent = `Searching for routes containing "${searchTerm}"...`;
                    searchMessage.style.padding = '10px';
                    searchMessage.style.marginTop = '10px';
                    searchMessage.style.backgroundColor = '#f8f9fa';
                    searchMessage.style.borderRadius = 'var(--border-radius)';
                    
                    // Remove any existing search message
                    const existingMessage = routeList.querySelector('.search-message');
                    if (existingMessage) {
                        existingMessage.remove();
                    }
                    
                    routeList.appendChild(searchMessage);
                }
            }
        });
    }
    
    // Stop search
    const stopSearch = document.getElementById('stop-search');
    if (stopSearch) {
        stopSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            // This would filter stops in a real implementation
            // For now, just log the search term
            console.log('Searching for stop:', searchTerm);
            
            // Simulate search results
            if (searchTerm.length > 2) {
                // Show a message that this would search in a real implementation
                const stopsList = document.querySelector('.stops-list');
                if (stopsList) {
                    const searchMessage = document.createElement('div');
                    searchMessage.className = 'search-message';
                    searchMessage.textContent = `Searching for stops containing "${searchTerm}"...`;
                    searchMessage.style.padding = '10px';
                    searchMessage.style.marginTop = '10px';
                    searchMessage.style.backgroundColor = '#f8f9fa';
                    searchMessage.style.borderRadius = 'var(--border-radius)';
                    
                    // Remove any existing search message
                    const existingMessage = stopsList.querySelector('.search-message');
                    if (existingMessage) {
                        existingMessage.remove();
                    }
                    
                    stopsList.appendChild(searchMessage);
                }
            }
        });
    }
}

// Add modal styles to the document
function addModalStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: 2000;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        
        .modal-content {
            background-color: white;
            border-radius: var(--border-radius);
            max-width: 800px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            padding: 30px;
            position: relative;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
        
        .close-modal {
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--gray-color);
            transition: var(--transition);
        }
        
        .close-modal:hover {
            color: var(--dark-color);
        }
        
        .route-info, .stop-info, .card-info {
            margin-top: 20px;
        }
        
        .schedule-grid, .stop-details-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-top: 15px;
        }
        
        .route-stops-list, .amenities-list, .nearby-list, .benefits-list, .restrictions-list {
            margin-top: 10px;
            padding-left: 20px;
        }
        
        .route-stops-list li, .amenities-list li, .nearby-list li {
            margin-bottom: 5px;
        }
        
        .stop-actions, .card-actions {
            margin-top: 30px;
            display: flex;
            gap: 15px;
        }
        
        .card-info {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 30px;
        }
        
        .card-image-large {
            background-color: #f8f9fa;
            border-radius: var(--border-radius);
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .card-description {
            margin-bottom: 15px;
            font-size: 1.1rem;
        }
        
        .card-price {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--primary-color);
            margin-bottom: 20px;
        }
        
        .benefits-list li, .restrictions-list li {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
        }
        
        .benefits-list i {
            color: var(--success-color);
            margin-right: 10px;
        }
        
        .restrictions-list i {
            color: var(--danger-color);
            margin-right: 10px;
        }
        
        @media (max-width: 768px) {
            .schedule-grid, .stop-details-grid, .card-info {
                grid-template-columns: 1fr;
            }
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Call to add modal styles
addModalStyles();