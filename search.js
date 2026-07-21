/**
 * StayUnique - Search Functionality
 * Handles search filtering, sorting, and results display
 */

(function() {
    'use strict';

    // ========================================
    // SEARCH STATE
    // ========================================

    const searchState = {
        location: '',
        checkin: '',
        checkout: '',
        guests: 0,
        category: 'all',
        priceRange: { min: 0, max: Infinity },
        amenities: [],
        sortBy: 'recommended'
    };

    // ========================================
    // FILTER FUNCTIONS
    // ========================================

    function filterByLocation(properties, location) {
        if (!location) return properties;
        const lowerLocation = location.toLowerCase();
        return properties.filter(p => 
            p.location.toLowerCase().includes(lowerLocation) ||
            p.title.toLowerCase().includes(lowerLocation)
        );
    }

    function filterByCategory(properties, category) {
        if (category === 'all') return properties;
        return properties.filter(p => p.category === category);
    }

    function filterByPriceRange(properties, min, max) {
        return properties.filter(p => p.price >= min && p.price <= max);
    }

    function filterByAmenities(properties, amenities) {
        if (amenities.length === 0) return properties;
        // Mock amenity filtering - in real app would check property amenities
        return properties;
    }

    function filterByGuests(properties, guests) {
        if (guests === 0) return properties;
        // Mock guest filtering - in real app would check property capacity
        return properties;
    }

    // ========================================
    // SORT FUNCTIONS
    // ========================================

    const sortFunctions = {
        recommended: (a, b) => b.rating - a.rating,
        price_low: (a, b) => a.price - b.price,
        price_high: (a, b) => b.price - a.price,
        rating: (a, b) => b.rating - a.rating,
        newest: (a, b) => b.id - a.id
    };

    function sortProperties(properties, sortBy) {
        const sortFn = sortFunctions[sortBy] || sortFunctions.recommended;
        return [...properties].sort(sortFn);
    }

    // ========================================
    // APPLY ALL FILTERS
    // ========================================

    function applyFilters() {
        let results = window.StayUnique?.properties || [];

        // Apply location filter
        results = filterByLocation(results, searchState.location);

        // Apply category filter
        results = filterByCategory(results, searchState.category);

        // Apply price range filter
        results = filterByPriceRange(results, searchState.priceRange.min, searchState.priceRange.max);

        // Apply amenities filter
        results = filterByAmenities(results, searchState.amenities);

        // Apply guests filter
        results = filterByGuests(results, searchState.guests);

        // Apply sorting
        results = sortProperties(results, searchState.sortBy);

        return results;
    }

    // ========================================
    // UPDATE RESULTS DISPLAY
    // ========================================

    function updateResultsDisplay(results) {
        const grid = document.querySelector('#listingsGrid');
        const resultsInfo = document.querySelector('.results-info h1');
        
        if (resultsInfo) {
            resultsInfo.textContent = `${results.length} stay${results.length !== 1 ? 's' : ''}`;
        }

        if (grid) {
            if (results.length === 0) {
                grid.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-search"></i>
                        <h3>No results found</h3>
                        <p>Try adjusting your search or filters to find what you're looking for.</p>
                        <button class="clear-filters-btn">Clear all filters</button>
                    </div>
                `;
                
                document.querySelector('.clear-filters-btn')?.addEventListener('click', clearAllFilters);
            } else {
                grid.innerHTML = results.map(createPropertyCard).join('');
                
                // Re-attach event listeners
                attachCardListeners();
            }
        }
    }

    function createPropertyCard(property) {
        return `
            <div class="property-card" data-id="${property.id}" data-category="${property.category}">
                <div class="property-image">
                    <img src="${property.images[0]}" alt="${property.title}" loading="lazy">
                    <button class="wishlist-btn ${property.wishlist ? 'active' : ''}" data-id="${property.id}">
                        <i class="${property.wishlist ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                    <div class="image-slider">
                        ${property.images.map((_, i) => `
                            <span class="slider-dot ${i === 0 ? 'active' : ''}"></span>
                        `).join('')}
                    </div>
                </div>
                <div class="property-info">
                    <div class="property-header-row">
                        <span class="property-location">${property.location}</span>
                        <span class="property-rating">
                            <i class="fas fa-star"></i> ${property.rating}
                        </span>
                    </div>
                    <span class="property-type">${property.type}</span>
                    <span class="property-dates">${property.dates}</span>
                    <span class="property-price"><strong>$${property.price}</strong> night</span>
                </div>
            </div>
        `;
    }

    function attachCardListeners() {
        document.querySelectorAll('.property-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('.wishlist-btn')) return;
                const id = card.dataset.id;
                window.location.href = `property.html?id=${id}`;
            });
        });

        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(btn.dataset.id);
                toggleWishlist(id, btn);
            });
        });
    }

    function toggleWishlist(id, btn) {
        const properties = window.StayUnique?.properties || [];
        const property = properties.find(p => p.id === id);
        if (property) {
            property.wishlist = !property.wishlist;
            btn.classList.toggle('active');
            const icon = btn.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            
            if (window.StayUnique?.showToast) {
                window.StayUnique.showToast(property.wishlist ? 'Saved to wishlist!' : 'Removed from wishlist');
            }
        }
    }

    // ========================================
    // FILTER UI HANDLERS
    // ========================================

    function initFilterHandlers() {
        // Sort dropdown
        const sortBtn = document.querySelector('.action-btn');
        if (sortBtn) {
            sortBtn.addEventListener('click', () => {
                // Toggle sort dropdown (simplified)
                const sorts = ['recommended', 'price_low', 'price_high', 'rating'];
                const currentIndex = sorts.indexOf(searchState.sortBy);
                searchState.sortBy = sorts[(currentIndex + 1) % sorts.length];
                
                const sortLabels = {
                    recommended: 'Recommended',
                    price_low: 'Price: Low to High',
                    price_high: 'Price: High to Low',
                    rating: 'Top Rated'
                };
                
                sortBtn.innerHTML = `<i class="fas fa-sort"></i> ${sortLabels[searchState.sortBy]}`;
                
                const results = applyFilters();
                updateResultsDisplay(results);
            });
        }

        // Filter button
        const filterBtn = document.querySelector('.filter-btn');
        if (filterBtn) {
            filterBtn.addEventListener('click', () => {
                // Show filter modal (simplified)
                showFilterModal();
            });
        }
    }

    function showFilterModal() {
        // Create filter modal
        const modal = document.createElement('div');
        modal.className = 'modal filter-modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                    <h2>Filters</h2>
                    <button class="clear-all">Clear all</button>
                </div>
                <div class="filter-section">
                    <h3>Price range</h3>
                    <div class="price-range">
                        <div class="price-inputs">
                            <div class="price-input">
                                <label>Minimum</label>
                                <input type="number" id="minPrice" placeholder="$0" value="${searchState.priceRange.min || ''}">
                            </div>
                            <span>-</span>
                            <div class="price-input">
                                <label>Maximum</label>
                                <input type="number" id="maxPrice" placeholder="$1000+" value="${searchState.priceRange.max === Infinity ? '' : searchState.priceRange.max}">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="filter-section">
                    <h3>Amenities</h3>
                    <div class="amenities-list">
                        <label class="checkbox-label">
                            <input type="checkbox" value="wifi" ${searchState.amenities.includes('wifi') ? 'checked' : ''}>
                            <span>WiFi</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" value="pool" ${searchState.amenities.includes('pool') ? 'checked' : ''}>
                            <span>Pool</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" value="kitchen" ${searchState.amenities.includes('kitchen') ? 'checked' : ''}>
                            <span>Kitchen</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" value="parking" ${searchState.amenities.includes('parking') ? 'checked' : ''}>
                            <span>Free parking</span>
                        </label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="show-results-btn">Show results</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close handlers
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        // Clear all
        modal.querySelector('.clear-all').addEventListener('click', () => {
            clearAllFilters();
            modal.remove();
        });

        // Show results
        modal.querySelector('.show-results-btn').addEventListener('click', () => {
            const minPrice = parseInt(document.querySelector('#minPrice')?.value) || 0;
            const maxPrice = parseInt(document.querySelector('#maxPrice')?.value) || Infinity;
            
            searchState.priceRange = { min: minPrice, max: maxPrice };
            
            const checkedAmenities = [];
            modal.querySelectorAll('.amenities-list input:checked').forEach(cb => {
                checkedAmenities.push(cb.value);
            });
            searchState.amenities = checkedAmenities;

            const results = applyFilters();
            updateResultsDisplay(results);
            modal.remove();
        });
    }

    function clearAllFilters() {
        searchState.location = '';
        searchState.category = 'all';
        searchState.priceRange = { min: 0, max: Infinity };
        searchState.amenities = [];
        searchState.guests = 0;
        searchState.sortBy = 'recommended';

        // Reset UI
        document.querySelectorAll('.category-item').forEach(cat => {
            cat.classList.toggle('active', cat.dataset.category === 'all');
        });

        const results = applyFilters();
        updateResultsDisplay(results);
    }

    // ========================================
    // PARSE URL PARAMETERS
    // ========================================

    function parseUrlParams() {
        const params = new URLSearchParams(window.location.search);
        
        if (params.has('location')) {
            searchState.location = params.get('location');
            const locationInput = document.querySelector('#locationInput');
            if (locationInput) locationInput.value = searchState.location;
        }
        
        if (params.has('category')) {
            searchState.category = params.get('category');
        }
    }

    // ========================================
    // INITIALIZATION
    // ========================================

    document.addEventListener('DOMContentLoaded', () => {
        parseUrlParams();
        initFilterHandlers();
        
        // Apply initial filters on listings page
        if (window.location.pathname.includes('listings.html')) {
            const results = applyFilters();
            updateResultsDisplay(results);
        }
    });

    // Expose search API
    window.StayUniqueSearch = {
        state: searchState,
        applyFilters,
        updateResultsDisplay,
        clearAllFilters
    };

})();
