/**
 * StayUnique - Booking Widget Functionality
 * Handles date selection, price calculations, and reservation
 */

(function() {
    'use strict';

    // ========================================
    // BOOKING STATE
    // ========================================

    const bookingState = {
        checkin: null,
        checkout: null,
        guests: 2,
        nightlyRate: 450,
        cleaningFee: 150,
        serviceFeePercent: 0.12,
        minNights: 1,
        maxNights: 30
    };

    // ========================================
    // DATE UTILITIES
    // ========================================

    function parseDate(dateString) {
        if (!dateString) return null;
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? null : date;
    }

    function formatDate(date) {
        if (!date) return '';
        return date.toISOString().split('T')[0];
    }

    function formatDisplayDate(date) {
        if (!date) return '';
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });
    }

    function getNightsBetween(checkin, checkout) {
        if (!checkin || !checkout) return 0;
        const msPerDay = 1000 * 60 * 60 * 24;
        const diffMs = checkout - checkin;
        return Math.ceil(diffMs / msPerDay);
    }

    function addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    function isDateAvailable(date) {
        // Mock availability check - in real app would check against booked dates
        return true;
    }

    // ========================================
    // PRICE CALCULATIONS
    // ========================================

    function calculatePrices() {
        const nights = getNightsBetween(bookingState.checkin, bookingState.checkout);
        
        if (nights < bookingState.minNights) {
            return null;
        }

        const subtotal = nights * bookingState.nightlyRate;
        const serviceFee = Math.round(subtotal * bookingState.serviceFeePercent);
        const total = subtotal + bookingState.cleaningFee + serviceFee;

        return {
            nights,
            nightlyRate: bookingState.nightlyRate,
            subtotal,
            cleaningFee: bookingState.cleaningFee,
            serviceFee,
            total
        };
    }

    function updatePriceDisplay() {
        const prices = calculatePrices();
        
        const nightsCount = document.querySelector('#nightsCount');
        const subtotalEl = document.querySelector('#subtotal');
        const serviceFeeEl = document.querySelector('#serviceFee');
        const totalPriceEl = document.querySelector('#totalPrice');
        const reserveBtn = document.querySelector('#reserveBtn');

        if (!prices) {
            if (nightsCount) nightsCount.textContent = '0';
            if (subtotalEl) subtotalEl.textContent = '$0';
            if (serviceFeeEl) serviceFeeEl.textContent = '$0';
            if (totalPriceEl) totalPriceEl.textContent = '$0';
            if (reserveBtn) {
                reserveBtn.textContent = 'Select dates';
                reserveBtn.disabled = true;
            }
            return;
        }

        if (nightsCount) nightsCount.textContent = prices.nights;
        if (subtotalEl) subtotalEl.textContent = `$${prices.subtotal.toLocaleString()}`;
        if (serviceFeeEl) serviceFeeEl.textContent = `$${prices.serviceFee.toLocaleString()}`;
        if (totalPriceEl) totalPriceEl.textContent = `$${prices.total.toLocaleString()}`;
        
        if (reserveBtn) {
            reserveBtn.textContent = 'Reserve';
            reserveBtn.disabled = false;
        }
    }

    // ========================================
    // DATE INPUT HANDLERS
    // ========================================

    function initDateInputs() {
        const checkinInput = document.querySelector('#checkinDate');
        const checkoutInput = document.querySelector('#checkoutDate');

        if (!checkinInput || !checkoutInput) return;

        // Set minimum dates
        const today = new Date();
        const tomorrow = addDays(today, 1);
        
        checkinInput.min = formatDate(today);
        checkoutInput.min = formatDate(tomorrow);

        // Checkin change handler
        checkinInput.addEventListener('change', (e) => {
            const date = parseDate(e.target.value);
            bookingState.checkin = date;

            // Update checkout minimum
            if (date) {
                const minCheckout = addDays(date, 1);
                checkoutInput.min = formatDate(minCheckout);
                
                // Auto-set checkout if not set or invalid
                const currentCheckout = parseDate(checkoutInput.value);
                if (!currentCheckout || currentCheckout <= date) {
                    const defaultCheckout = addDays(date, 5);
                    checkoutInput.value = formatDate(defaultCheckout);
                    bookingState.checkout = defaultCheckout;
                }
            }

            updatePriceDisplay();
        });

        // Checkout change handler
        checkoutInput.addEventListener('change', (e) => {
            const date = parseDate(e.target.value);
            bookingState.checkout = date;
            updatePriceDisplay();
        });

        // Set default dates (5 nights from today)
        const defaultCheckin = addDays(today, 30);
        const defaultCheckout = addDays(defaultCheckin, 5);
        
        checkinInput.value = formatDate(defaultCheckin);
        checkoutInput.value = formatDate(defaultCheckout);
        
        bookingState.checkin = defaultCheckin;
        bookingState.checkout = defaultCheckout;

        updatePriceDisplay();
    }

    // ========================================
    // GUESTS SELECTOR
    // ========================================

    function initGuestsSelector() {
        const guestsSelect = document.querySelector('#guestsSelect');
        
        if (guestsSelect) {
            guestsSelect.addEventListener('change', (e) => {
                bookingState.guests = parseInt(e.target.value);
            });
        }
    }

    // ========================================
    // RESERVATION HANDLER
    // ========================================

    function initReservation() {
        const reserveBtn = document.querySelector('#reserveBtn');
        
        if (reserveBtn) {
            reserveBtn.addEventListener('click', () => {
                const prices = calculatePrices();
                
                if (!prices) {
                    showBookingError('Please select valid dates');
                    return;
                }

                // Show confirmation modal
                showBookingConfirmation(prices);
            });
        }
    }

    function showBookingConfirmation(prices) {
        const modal = document.createElement('div');
        modal.className = 'modal booking-modal active';
        modal.innerHTML = `
            <div class="modal-content booking-confirmation">
                <button class="modal-close"><i class="fas fa-times"></i></button>
                <div class="confirmation-header">
                    <i class="fas fa-check-circle"></i>
                    <h2>Booking Request Sent!</h2>
                    <p>The host will review your request and respond within 24 hours.</p>
                </div>
                <div class="booking-summary">
                    <h3>Booking Summary</h3>
                    <div class="summary-row">
                        <span>Dates</span>
                        <span>${formatDisplayDate(bookingState.checkin)} - ${formatDisplayDate(bookingState.checkout)}</span>
                    </div>
                    <div class="summary-row">
                        <span>Guests</span>
                        <span>${bookingState.guests} guest${bookingState.guests > 1 ? 's' : ''}</span>
                    </div>
                    <div class="summary-divider"></div>
                    <div class="summary-row">
                        <span>$${bookingState.nightlyRate} x ${prices.nights} nights</span>
                        <span>$${prices.subtotal.toLocaleString()}</span>
                    </div>
                    <div class="summary-row">
                        <span>Cleaning fee</span>
                        <span>$${prices.cleaningFee.toLocaleString()}</span>
                    </div>
                    <div class="summary-row">
                        <span>Service fee</span>
                        <span>$${prices.serviceFee.toLocaleString()}</span>
                    </div>
                    <div class="summary-row total">
                        <span>Total</span>
                        <span>$${prices.total.toLocaleString()}</span>
                    </div>
                </div>
                <button class="done-btn">Done</button>
            </div>
        `;

        document.body.appendChild(modal);

        // Close handlers
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });

        modal.querySelector('.done-btn').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        // Show toast
        if (window.StayUnique?.showToast) {
            window.StayUnique.showToast('Booking request sent to host!');
        }
    }

    function showBookingError(message) {
        const toast = document.createElement('div');
        toast.className = 'toast error active';
        toast.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // ========================================
    // BOOKING CARD STICKY BEHAVIOR
    // ========================================

    function initStickyBookingCard() {
        const bookingCard = document.querySelector('.booking-card');
        const container = document.querySelector('.booking-card-container');
        
        if (!bookingCard || !container) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    bookingCard.style.position = 'sticky';
                    bookingCard.style.top = '100px';
                }
            },
            { threshold: 0 }
        );

        observer.observe(container);
    }

    // ========================================
    // DATE PICKER ENHANCEMENT
    // ========================================

    function initDatePickerEnhancement() {
        const dateInputs = document.querySelectorAll('.date-input input');
        
        dateInputs.forEach(input => {
            // Add calendar icon click handler
            const dateInput = input.closest('.date-input');
            if (dateInput) {
                dateInput.addEventListener('click', () => {
                    input.showPicker?.();
                });
            }
        });
    }

    // ========================================
    // PRICE BREAKDOWN TOGGLE
    // ========================================

    function initPriceBreakdown() {
        const priceBreakdown = document.querySelector('#priceBreakdown');
        
        if (priceBreakdown) {
            // Add hover effect to show breakdown details
            priceBreakdown.addEventListener('mouseenter', () => {
                priceBreakdown.classList.add('expanded');
            });

            priceBreakdown.addEventListener('mouseleave', () => {
                priceBreakdown.classList.remove('expanded');
            });
        }
    }

    // ========================================
    // DYNAMIC PRICING UPDATES
    // ========================================

    function initDynamicPricing() {
        // Simulate dynamic pricing based on demand
        const demandFactors = {
            weekend: 1.15,
            holiday: 1.25,
            peak: 1.3
        };

        function applyDynamicPricing() {
            const checkin = bookingState.checkin;
            if (!checkin) return;

            let multiplier = 1;
            const dayOfWeek = checkin.getDay();
            
            // Weekend pricing (Friday, Saturday)
            if (dayOfWeek === 5 || dayOfWeek === 6) {
                multiplier *= demandFactors.weekend;
            }

            // Apply to base rate
            const baseRate = 450;
            bookingState.nightlyRate = Math.round(baseRate * multiplier);

            // Update display if price element exists
            const priceAmount = document.querySelector('.booking-header .amount');
            if (priceAmount) {
                priceAmount.textContent = `$${bookingState.nightlyRate}`;
            }

            updatePriceDisplay();
        }

        // Apply on date change
        const checkinInput = document.querySelector('#checkinDate');
        if (checkinInput) {
            checkinInput.addEventListener('change', applyDynamicPricing);
        }
    }

    // ========================================
    // SAVE FOR LATER
    // ========================================

    function initSaveForLater() {
        const saveBtn = document.querySelector('.action-link .fa-heart')?.closest('.action-link');
        
        if (saveBtn) {
            saveBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                const icon = saveBtn.querySelector('i');
                const isSaved = icon.classList.contains('fas');
                
                icon.classList.toggle('far');
                icon.classList.toggle('fas');
                saveBtn.classList.toggle('saved');
                
                if (window.StayUnique?.showToast) {
                    window.StayUnique.showToast(isSaved ? 'Removed from saved' : 'Saved for later');
                }
            });
        }
    }

    // ========================================
    // SHARE FUNCTIONALITY
    // ========================================

    function initShareFunctionality() {
        const shareBtn = document.querySelector('.action-link .fa-share-alt')?.closest('.action-link');
        
        if (shareBtn) {
            shareBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                
                const shareData = {
                    title: 'Check out this amazing stay on StayUnique!',
                    text: 'Luxury Beachfront Villa with Infinity Pool in Malibu',
                    url: window.location.href
                };

                if (navigator.share) {
                    try {
                        await navigator.share(shareData);
                    } catch (err) {
                        console.log('Share cancelled');
                    }
                } else {
                    // Fallback - copy to clipboard
                    navigator.clipboard.writeText(window.location.href);
                    if (window.StayUnique?.showToast) {
                        window.StayUnique.showToast('Link copied to clipboard!');
                    }
                }
            });
        }
    }

    // ========================================
    // INITIALIZATION
    // ========================================

    document.addEventListener('DOMContentLoaded', () => {
        // Only initialize on property page
        if (!document.querySelector('.booking-card')) return;

        initDateInputs();
        initGuestsSelector();
        initReservation();
        initStickyBookingCard();
        initDatePickerEnhancement();
        initPriceBreakdown();
        initDynamicPricing();
        initSaveForLater();
        initShareFunctionality();
    });

    // Expose booking API
    window.StayUniqueBooking = {
        state: bookingState,
        calculatePrices,
        formatDate,
        formatDisplayDate,
        getNightsBetween
    };

})();
