/**
 * StayUnique - Image Slider/Carousel Functionality
 * Handles property image sliders and gallery navigation
 */

(function() {
    'use strict';

    // ========================================
    // SLIDER CLASS
    // ========================================

    class ImageSlider {
        constructor(container, images, options = {}) {
            this.container = container;
            this.images = images;
            this.currentIndex = 0;
            this.options = {
                autoplay: false,
                autoplayDelay: 5000,
                showDots: true,
                showArrows: true,
                loop: true,
                ...options
            };
            
            this.autoplayTimer = null;
            this.touchStartX = 0;
            this.touchEndX = 0;
            
            this.init();
        }

        init() {
            this.createSlider();
            this.attachEvents();
            
            if (this.options.autoplay) {
                this.startAutoplay();
            }
        }

        createSlider() {
            this.container.innerHTML = '';
            this.container.classList.add('image-slider-container');

            // Create slides wrapper
            const slidesWrapper = document.createElement('div');
            slidesWrapper.className = 'slides-wrapper';
            
            this.images.forEach((image, index) => {
                const slide = document.createElement('div');
                slide.className = `slide ${index === 0 ? 'active' : ''}`;
                slide.innerHTML = `<img src="${image}" alt="Property image ${index + 1}" loading="lazy">`;
                slidesWrapper.appendChild(slide);
            });

            this.container.appendChild(slidesWrapper);
            this.slidesWrapper = slidesWrapper;
            this.slides = slidesWrapper.querySelectorAll('.slide');

            // Create navigation arrows
            if (this.options.showArrows && this.images.length > 1) {
                const prevBtn = document.createElement('button');
                prevBtn.className = 'slider-arrow prev';
                prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
                
                const nextBtn = document.createElement('button');
                nextBtn.className = 'slider-arrow next';
                nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';

                this.container.appendChild(prevBtn);
                this.container.appendChild(nextBtn);

                this.prevBtn = prevBtn;
                this.nextBtn = nextBtn;
            }

            // Create dots
            if (this.options.showDots && this.images.length > 1) {
                const dotsContainer = document.createElement('div');
                dotsContainer.className = 'slider-dots';
                
                this.images.forEach((_, index) => {
                    const dot = document.createElement('button');
                    dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
                    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
                    dotsContainer.appendChild(dot);
                });

                this.container.appendChild(dotsContainer);
                this.dotsContainer = dotsContainer;
                this.dots = dotsContainer.querySelectorAll('.slider-dot');
            }

            // Counter
            if (this.images.length > 1) {
                const counter = document.createElement('div');
                counter.className = 'slider-counter';
                counter.innerHTML = `<span>1</span> / ${this.images.length}`;
                this.container.appendChild(counter);
                this.counter = counter;
            }
        }

        attachEvents() {
            // Arrow navigation
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.prev();
                });
            }

            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.next();
                });
            }

            // Dot navigation
            if (this.dots) {
                this.dots.forEach((dot, index) => {
                    dot.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.goTo(index);
                    });
                });
            }

            // Touch/swipe support
            this.container.addEventListener('touchstart', (e) => {
                this.touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            this.container.addEventListener('touchend', (e) => {
                this.touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
            }, { passive: true });

            // Mouse drag support
            let isDragging = false;
            let startX = 0;

            this.container.addEventListener('mousedown', (e) => {
                isDragging = true;
                startX = e.pageX;
            });

            this.container.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                e.preventDefault();
            });

            this.container.addEventListener('mouseup', (e) => {
                if (!isDragging) return;
                isDragging = false;
                
                const diff = startX - e.pageX;
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        this.next();
                    } else {
                        this.prev();
                    }
                }
            });

            this.container.addEventListener('mouseleave', () => {
                isDragging = false;
            });

            // Pause autoplay on hover
            if (this.options.autoplay) {
                this.container.addEventListener('mouseenter', () => {
                    this.stopAutoplay();
                });

                this.container.addEventListener('mouseleave', () => {
                    this.startAutoplay();
                });
            }

            // Keyboard navigation
            this.container.setAttribute('tabindex', '0');
            this.container.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    this.prev();
                } else if (e.key === 'ArrowRight') {
                    this.next();
                }
            });
        }

        handleSwipe() {
            const diff = this.touchStartX - this.touchEndX;
            const threshold = 50;

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        }

        goTo(index) {
            if (index < 0) {
                index = this.options.loop ? this.images.length - 1 : 0;
            } else if (index >= this.images.length) {
                index = this.options.loop ? 0 : this.images.length - 1;
            }

            this.currentIndex = index;

            // Update slides
            this.slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });

            // Update dots
            if (this.dots) {
                this.dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }

            // Update counter
            if (this.counter) {
                this.counter.innerHTML = `<span>${index + 1}</span> / ${this.images.length}`;
            }

            // Reset autoplay
            if (this.options.autoplay) {
                this.stopAutoplay();
                this.startAutoplay();
            }
        }

        next() {
            this.goTo(this.currentIndex + 1);
        }

        prev() {
            this.goTo(this.currentIndex - 1);
        }

        startAutoplay() {
            if (this.autoplayTimer) return;
            this.autoplayTimer = setInterval(() => {
                this.next();
            }, this.options.autoplayDelay);
        }

        stopAutoplay() {
            if (this.autoplayTimer) {
                clearInterval(this.autoplayTimer);
                this.autoplayTimer = null;
            }
        }

        destroy() {
            this.stopAutoplay();
            this.container.innerHTML = '';
            this.container.classList.remove('image-slider-container');
        }
    }

    // ========================================
    // LIGHTBOX GALLERY
    // ========================================

    class LightboxGallery {
        constructor(images, options = {}) {
            this.images = images;
            this.currentIndex = 0;
            this.options = {
                startIndex: 0,
                ...options
            };
            
            this.currentIndex = this.options.startIndex;
            this.init();
        }

        init() {
            this.createLightbox();
            this.attachEvents();
            this.show();
        }

        createLightbox() {
            this.lightbox = document.createElement('div');
            this.lightbox.className = 'lightbox';
            this.lightbox.innerHTML = `
                <div class="lightbox-overlay"></div>
                <div class="lightbox-content">
                    <button class="lightbox-close"><i class="fas fa-times"></i></button>
                    <button class="lightbox-nav prev"><i class="fas fa-chevron-left"></i></button>
                    <button class="lightbox-nav next"><i class="fas fa-chevron-right"></i></button>
                    <div class="lightbox-image-container">
                        <img src="${this.images[this.currentIndex]}" alt="Gallery image">
                    </div>
                    <div class="lightbox-counter">${this.currentIndex + 1} / ${this.images.length}</div>
                    <div class="lightbox-thumbnails">
                        ${this.images.map((img, i) => `
                            <div class="thumbnail ${i === this.currentIndex ? 'active' : ''}" data-index="${i}">
                                <img src="${img}" alt="Thumbnail ${i + 1}">
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;

            document.body.appendChild(this.lightbox);
            document.body.style.overflow = 'hidden';
        }

        attachEvents() {
            // Close
            this.lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
                this.close();
            });

            this.lightbox.querySelector('.lightbox-overlay').addEventListener('click', () => {
                this.close();
            });

            // Navigation
            this.lightbox.querySelector('.lightbox-nav.prev').addEventListener('click', () => {
                this.prev();
            });

            this.lightbox.querySelector('.lightbox-nav.next').addEventListener('click', () => {
                this.next();
            });

            // Thumbnails
            this.lightbox.querySelectorAll('.thumbnail').forEach(thumb => {
                thumb.addEventListener('click', () => {
                    this.goTo(parseInt(thumb.dataset.index));
                });
            });

            // Keyboard
            document.addEventListener('keydown', this.handleKeydown);

            // Touch
            let touchStartX = 0;
            this.lightbox.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            this.lightbox.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].screenX;
                const diff = touchStartX - touchEndX;
                
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        this.next();
                    } else {
                        this.prev();
                    }
                }
            }, { passive: true });
        }

        handleKeydown = (e) => {
            if (e.key === 'Escape') {
                this.close();
            } else if (e.key === 'ArrowLeft') {
                this.prev();
            } else if (e.key === 'ArrowRight') {
                this.next();
            }
        }

        goTo(index) {
            if (index < 0) {
                index = this.images.length - 1;
            } else if (index >= this.images.length) {
                index = 0;
            }

            this.currentIndex = index;

            const img = this.lightbox.querySelector('.lightbox-image-container img');
            img.style.opacity = '0';
            
            setTimeout(() => {
                img.src = this.images[index];
                img.style.opacity = '1';
            }, 200);

            this.lightbox.querySelector('.lightbox-counter').textContent = 
                `${index + 1} / ${this.images.length}`;

            this.lightbox.querySelectorAll('.thumbnail').forEach((thumb, i) => {
                thumb.classList.toggle('active', i === index);
            });
        }

        next() {
            this.goTo(this.currentIndex + 1);
        }

        prev() {
            this.goTo(this.currentIndex - 1);
        }

        show() {
            setTimeout(() => {
                this.lightbox.classList.add('active');
            }, 10);
        }

        close() {
            this.lightbox.classList.remove('active');
            document.removeEventListener('keydown', this.handleKeydown);
            
            setTimeout(() => {
                this.lightbox.remove();
                document.body.style.overflow = '';
            }, 300);
        }
    }

    // ========================================
    // INITIALIZE PROPERTY CARD SLIDERS
    // ========================================

    function initPropertySliders() {
        document.querySelectorAll('.property-image').forEach(container => {
            const card = container.closest('.property-card');
            const propertyId = parseInt(card?.dataset.id);
            
            if (!propertyId) return;

            const property = window.StayUnique?.properties?.find(p => p.id === propertyId);
            if (!property || property.images.length <= 1) return;

            // Create mini slider for property card
            const slider = new ImageSlider(container, property.images, {
                showDots: true,
                showArrows: false,
                autoplay: false,
                loop: true
            });

            // Store reference
            card.slider = slider;
        });
    }

    // ========================================
    // INITIALIZE GALLERY LIGHTBOX
    // ========================================

    function initGalleryLightbox() {
        const galleryItems = document.querySelectorAll('.gallery-item, .gallery-main');
        
        galleryItems.forEach((item, index) => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => {
                const images = Array.from(galleryItems).map(el => 
                    el.querySelector('img')?.src
                ).filter(Boolean);
                
                new LightboxGallery(images, { startIndex: index });
            });
        });

        // Show all photos button
        const showAllBtn = document.querySelector('.show-all-photos');
        if (showAllBtn) {
            showAllBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const galleryItems = document.querySelectorAll('.gallery-item, .gallery-main');
                const images = Array.from(galleryItems).map(el => 
                    el.querySelector('img')?.src
                ).filter(Boolean);
                
                new LightboxGallery(images, { startIndex: 0 });
            });
        }
    }

    // ========================================
    // INITIALIZATION
    // ========================================

    document.addEventListener('DOMContentLoaded', () => {
        // Initialize property card sliders on listings pages
        if (document.querySelector('.listings-grid')) {
            // Wait for cards to be rendered
            setTimeout(initPropertySliders, 100);
        }

        // Initialize gallery lightbox on property page
        if (document.querySelector('.property-gallery')) {
            initGalleryLightbox();
        }
    });

    // Expose slider API
    window.StayUniqueSlider = {
        ImageSlider,
        LightboxGallery,
        initPropertySliders,
        initGalleryLightbox
    };

})();
