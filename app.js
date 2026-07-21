/**
 * StayUnique - Main Application JavaScript
 * Airbnb Clone - Vanilla JS Implementation
 */

// ========================================
// DATA - Property Listings
// ========================================

const properties = [
    {
        id: 1,
        location: "Malibu, California",
        type: "Entire villa",
        title: "Luxury Beachfront Villa with Infinity Pool",
        rating: 4.95,
        reviews: 128,
        dates: "Mar 15-20",
        price: 450,
        images: [
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
        ],
        category: "beachfront",
        wishlist: false
    },
    {
        id: 2,
        location: "Aspen, Colorado",
        type: "Entire cabin",
        title: "Cozy Mountain Cabin with Hot Tub",
        rating: 4.88,
        reviews: 96,
        dates: "Mar 18-23",
        price: 285,
        images: [
            "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80",
            "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
            "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800&q=80"
        ],
        category: "cabins",
        wishlist: false
    },
    {
        id: 3,
        location: "New York, New York",
        type: "Entire apartment",
        title: "Stylish Loft in SoHo",
        rating: 4.92,
        reviews: 215,
        dates: "Mar 12-17",
        price: 320,
        images: [
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80"
        ],
        category: "trending",
        wishlist: false
    },
    {
        id: 4,
        location: "Bali, Indonesia",
        type: "Private room",
        title: "Jungle Treehouse with Pool",
        rating: 4.97,
        reviews: 342,
        dates: "Apr 5-10",
        price: 180,
        images: [
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
            "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80"
        ],
        category: "treehouses",
        wishlist: false
    },
    {
        id: 5,
        location: "Santorini, Greece",
        type: "Entire home",
        title: "White Cave House with Caldera View",
        rating: 4.94,
        reviews: 178,
        dates: "May 1-6",
        price: 520,
        images: [
            "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
            "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&q=80",
            "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80"
        ],
        category: "luxury",
        wishlist: false
    },
    {
        id: 6,
        location: "Tuscany, Italy",
        type: "Entire villa",
        title: "Historic Villa with Vineyard",
        rating: 4.89,
        reviews: 87,
        dates: "Jun 10-15",
        price: 380,
        images: [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
            "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
        ],
        category: "countryside",
        wishlist: false
    },
    {
        id: 7,
        location: "Miami Beach, Florida",
        type: "Entire condo",
        title: "Oceanfront Penthouse with Terrace",
        rating: 4.91,
        reviews: 156,
        dates: "Mar 22-27",
        price: 395,
        images: [
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
        ],
        category: "beachfront",
        wishlist: false
    },
    {
        id: 8,
        location: "Portland, Oregon",
        type: "Tiny home",
        title: "Modern Tiny House in the Woods",
        rating: 4.85,
        reviews: 203,
        dates: "Apr 8-13",
        price: 125,
        images: [
            "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80",
            "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80",
            "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800&q=80"
        ],
        category: "tiny",
        wishlist: false
    }
];

const experiences = [
    {
        id: 1,
        title: "Wine Tasting in Napa Valley",
        location: "Napa, California",
        duration: "3 hours",
        price: 120,
        rating: 4.96,
        reviews: 342,
        image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80",
        host: "Michael",
        hostImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
        category: "food",
        description: "Join me for an unforgettable wine tasting experience through Napa's finest vineyards. Sample award-winning wines and learn about the winemaking process.",
        includes: ["Wine tasting", "Charcuterie board", "Transportation"],
        groupSize: "Up to 8 guests"
    },
    {
        id: 2,
        title: "Sunset Sailing in the Bay",
        location: "San Francisco, California",
        duration: "2 hours",
        price: 85,
        rating: 4.92,
        reviews: 518,
        image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&q=80",
        host: "Jennifer",
        hostImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
        category: "adventure",
        description: "Sail across the stunning San Francisco Bay as the sun sets behind the Golden Gate Bridge. Enjoy champagne and light snacks onboard.",
        includes: ["Boat tour", "Champagne", "Snacks"],
        groupSize: "Up to 6 guests"
    },
    {
        id: 3,
        title: "Cooking Class with a Chef",
        location: "Paris, France",
        duration: "4 hours",
        price: 150,
        rating: 4.98,
        reviews: 892,
        image: "assets/images/exp-cooking.jpg",
        host: "Pierre",
        hostImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
        category: "food",
        description: "Learn the secrets of French cuisine from a master chef. Prepare classic dishes like coq au vin and crème brûlée in a professional kitchen.",
        includes: ["All ingredients", "Recipe cards", "Wine pairing"],
        groupSize: "Up to 10 guests"
    },
    {
        id: 4,
        title: "Hidden Street Art Tour",
        location: "Berlin, Germany",
        duration: "2.5 hours",
        price: 45,
        rating: 4.89,
        reviews: 267,
        image: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=600&q=80",
        host: "Anna",
        hostImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
        category: "art",
        description: "Discover Berlin's vibrant street art scene. Explore hidden alleys and learn about the artists behind the stunning murals.",
        includes: ["Guided tour", "Local snacks", "Map of artworks"],
        groupSize: "Up to 12 guests"
    },
    {
        id: 5,
        title: "Surf Lesson in Malibu",
        location: "Malibu, California",
        duration: "2 hours",
        price: 95,
        rating: 4.94,
        reviews: 423,
        image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&q=80",
        host: "Kai",
        hostImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
        category: "adventure",
        description: "Catch your first wave with professional instruction. All equipment provided for an unforgettable surfing experience.",
        includes: ["Surfboard", "Wetsuit", "Professional instruction"],
        groupSize: "Up to 4 guests"
    },
    {
        id: 6,
        title: "Hot Air Balloon Ride",
        location: "Cappadocia, Turkey",
        duration: "3 hours",
        price: 280,
        rating: 4.99,
        reviews: 756,
        image: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=600&q=80",
        host: "Ahmet",
        hostImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
        category: "adventure",
        description: "Soar above the fairy chimneys of Cappadocia at sunrise. A once-in-a-lifetime experience with champagne toast upon landing.",
        includes: ["Balloon flight", "Champagne toast", "Certificate"],
        groupSize: "Up to 16 guests"
    },
    {
        id: 7,
        title: "Pottery Workshop",
        location: "Tokyo, Japan",
        duration: "2 hours",
        price: 65,
        rating: 4.91,
        reviews: 189,
        image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80",
        host: "Yuki",
        hostImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
        category: "art",
        description: "Learn the ancient art of Japanese pottery. Create your own ceramic piece using traditional techniques and tools.",
        includes: ["Clay and tools", "Firing service", "Tea ceremony"],
        groupSize: "Up to 6 guests"
    },
    {
        id: 8,
        title: "Wildlife Safari",
        location: "Serengeti, Tanzania",
        duration: "8 hours",
        price: 350,
        rating: 4.97,
        reviews: 634,
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80",
        host: "James",
        hostImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
        category: "adventure",
        description: "Witness the Big Five in their natural habitat. Full-day safari with expert guides and gourmet picnic lunch.",
        includes: ["4x4 vehicle", "Guide", "Lunch", "Park fees"],
        groupSize: "Up to 6 guests"
    }
];

const onlineExperiences = [
    {
        id: 101,
        title: "Meditation with a Buddhist Monk",
        location: "Online",
        duration: "1 hour",
        price: 25,
        rating: 4.95,
        reviews: 1243,
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
        host: "Lama Tenzin",
        hostImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
        category: "wellness",
        description: "Find inner peace with guided meditation from a Tibetan Buddhist monk. Suitable for all levels.",
        includes: ["Live session", "Recording access", "Meditation guide"],
        groupSize: "Up to 50 guests"
    },
    {
        id: 102,
        title: "Pasta Making Masterclass",
        location: "Online",
        duration: "2 hours",
        price: 35,
        rating: 4.93,
        reviews: 892,
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&q=80",
        host: "Nonna Maria",
        hostImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
        category: "food",
        description: "Learn to make authentic Italian pasta from scratch. Ingredient list sent before the class.",
        includes: ["Live cooking", "Recipe cards", "Q&A session"],
        groupSize: "Up to 30 guests"
    },
    {
        id: 103,
        title: "Virtual Tour of the Louvre",
        location: "Online",
        duration: "1.5 hours",
        price: 20,
        rating: 4.88,
        reviews: 567,
        image: "https://images.unsplash.com/photo-1565099824688-e93eb20fe622?w=600&q=80",
        host: "Jean-Pierre",
        hostImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
        category: "art",
        description: "Explore the world's most famous museum with an art historian. See the Mona Lisa and more.",
        includes: ["Virtual tour", "Expert commentary", "Interactive Q&A"],
        groupSize: "Up to 100 guests"
    },
    {
        id: 104,
        title: "Salsa Dancing for Beginners",
        location: "Online",
        duration: "1 hour",
        price: 18,
        rating: 4.91,
        reviews: 445,
        image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=600&q=80",
        host: "Carlos & Sofia",
        hostImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
        category: "entertainment",
        description: "Learn the basics of salsa dancing from professional dancers. No partner needed!",
        includes: ["Live instruction", "Practice time", "Music playlist"],
        groupSize: "Up to 40 guests"
    },
    {
        id: 105,
        title: "Coffee Brewing Workshop",
        location: "Online",
        duration: "1.5 hours",
        price: 28,
        rating: 4.96,
        reviews: 678,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
        host: "Hiroshi",
        hostImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
        category: "food",
        description: "Master the art of pour-over coffee. Learn techniques from a champion barista.",
        includes: ["Brewing guide", "Equipment list", "Bean recommendations"],
        groupSize: "Up to 25 guests"
    },
    {
        id: 106,
        title: "Yoga for Stress Relief",
        location: "Online",
        duration: "1 hour",
        price: 15,
        rating: 4.89,
        reviews: 923,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
        host: "Sarah",
        hostImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
        category: "wellness",
        description: "Gentle yoga flow designed to release tension and promote relaxation. All levels welcome.",
        includes: ["Live class", "Recording access", "Pose guide"],
        groupSize: "Up to 60 guests"
    },
    {
        id: 107,
        title: "Whiskey Tasting Journey",
        location: "Online",
        duration: "2 hours",
        price: 45,
        rating: 4.94,
        reviews: 334,
        image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=600&q=80",
        host: "Connor",
        hostImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
        category: "food",
        description: "Explore premium whiskeys from around the world. Tasting kit shipped to your door.",
        includes: ["Tasting kit", "Expert guidance", "Food pairings"],
        groupSize: "Up to 20 guests"
    },
    {
        id: 108,
        title: "Magic Tricks Workshop",
        location: "Online",
        duration: "1.5 hours",
        price: 22,
        rating: 4.87,
        reviews: 289,
        image: "https://images.unsplash.com/photo-1516967124798-10656f7dca28?w=600&q=80",
        host: "The Amazing Alex",
        hostImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
        category: "entertainment",
        description: "Learn mind-blowing magic tricks you can perform for friends and family.",
        includes: ["Prop kit mailed", "Live instruction", "Practice videos"],
        groupSize: "Up to 35 guests"
    }
];

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        location: "New York, USA",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
        rating: 5,
        text: "StayUnique made our vacation absolutely perfect! The villa was even more beautiful than the photos, and the host was incredibly helpful. Can't wait to book again!"
    },
    {
        id: 2,
        name: "Michael Chen",
        location: "Toronto, Canada",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
        rating: 5,
        text: "Best booking experience I've ever had. The app is so easy to use, and the customer support team was available 24/7 when we needed help with our reservation."
    },
    {
        id: 3,
        name: "Emma Williams",
        location: "London, UK",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
        rating: 5,
        text: "We've used StayUnique for all our family trips this year. Every property has been exceptional, and the prices are unbeatable. Highly recommend!"
    },
    {
        id: 4,
        name: "David Park",
        location: "Seoul, South Korea",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
        rating: 5,
        text: "The attention to detail in every listing is impressive. From accurate photos to detailed amenity lists, I always know exactly what to expect."
    },
    {
        id: 5,
        name: "Lisa Anderson",
        location: "Sydney, Australia",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
        rating: 5,
        text: "Found the most amazing beachfront property for our honeymoon. The booking process was seamless and the host went above and beyond to make our stay special."
    }
];

const reviews = [
    {
        id: 1,
        name: "Jennifer Martinez",
        date: "February 2026",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
        text: "Absolutely stunning property! The views were breathtaking and the infinity pool was the perfect way to relax. Sarah was an amazing host who made sure we had everything we needed."
    },
    {
        id: 2,
        name: "Robert Thompson",
        date: "January 2026",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
        text: "This villa exceeded all our expectations. The location is perfect - right on the beach with easy access to everything. The house itself is beautifully designed and spotlessly clean."
    },
    {
        id: 3,
        name: "Amanda Lee",
        date: "December 2025",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
        text: "We had the most wonderful family vacation here. The kids loved the pool and the beach access. Kitchen is fully equipped and the outdoor dining area is perfect for evening meals."
    },
    {
        id: 4,
        name: "James Wilson",
        date: "November 2025",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
        text: "Five stars isn't enough! From the moment we arrived, we felt at home. The attention to detail in every room is incredible. Will definitely be returning next year."
    }
];

// ========================================
// UTILITY FUNCTIONS
// ========================================

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// ========================================
// NAVIGATION
// ========================================

function initNavigation() {
    const navbar = $('#navbar');
    const menuBtn = $('#menuBtn');
    const dropdownMenu = $('#dropdownMenu');
    const mobileMenuBtn = $('#mobileMenuBtn');
    const mobileMenu = $('#mobileMenu');

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', throttle(() => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, 100));

    // Dropdown menu toggle
    if (menuBtn && dropdownMenu) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.classList.remove('active');
            }
        });
    }

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }
}

// ========================================
// GUESTS DROPDOWN
// ========================================

function initGuestsDropdown() {
    const guestsBtn = $('#guestsBtn');
    const guestsDropdown = $('#guestsDropdown');
    const guestsText = $('#guestsText');
    
    if (!guestsBtn || !guestsDropdown) return;

    const counters = {
        adults: { el: $('#adultsCount'), value: 0, min: 0 },
        children: { el: $('#childrenCount'), value: 0, min: 0 },
        infants: { el: $('#infantsCount'), value: 0, min: 0 },
        pets: { el: $('#petsCount'), value: 0, min: 0 }
    };

    // Toggle dropdown
    guestsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        guestsDropdown.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!guestsBtn.contains(e.target) && !guestsDropdown.contains(e.target)) {
            guestsDropdown.classList.remove('active');
        }
    });

    // Counter buttons
    $$('.counter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const type = btn.dataset.type;
            const isPlus = btn.classList.contains('plus');
            const counter = counters[type];

            if (isPlus) {
                counter.value++;
            } else if (counter.value > counter.min) {
                counter.value--;
            }

            counter.el.textContent = counter.value;
            
            // Update minus button state
            const minusBtn = btn.parentElement.querySelector('.minus');
            minusBtn.disabled = counter.value === counter.min;

            updateGuestsText();
        });
    });

    function updateGuestsText() {
        const total = counters.adults.value + counters.children.value;
        const infants = counters.infants.value;
        const pets = counters.pets.value;
        
        let text = 'Add guests';
        if (total > 0) {
            text = `${total} guest${total > 1 ? 's' : ''}`;
            if (infants > 0) text += `, ${infants} infant${infants > 1 ? 's' : ''}`;
            if (pets > 0) text += `, ${pets} pet${pets > 1 ? 's' : ''}`;
        }
        guestsText.textContent = text;
    }
}

// ========================================
// CATEGORY SCROLL
// ========================================

function initCategoryScroll() {
    const scrollContainer = $('#categoriesScroll');
    const scrollLeft = $('#catScrollLeft');
    const scrollRight = $('#catScrollRight');

    if (!scrollContainer || !scrollLeft || !scrollRight) return;

    const scrollAmount = 200;

    scrollLeft.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    scrollRight.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // Category selection
    $$('.category-item').forEach(item => {
        item.addEventListener('click', () => {
            $$('.category-item').forEach(cat => cat.classList.remove('active'));
            item.classList.add('active');
            
            const category = item.dataset.category;
            filterProperties(category);
        });
    });
}

// ========================================
// PROPERTY LISTINGS
// ========================================

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

function renderProperties(containerId, props = properties, limit = null) {
    const container = $(containerId);
    if (!container) return;

    const displayProps = limit ? props.slice(0, limit) : props;
    container.innerHTML = displayProps.map(createPropertyCard).join('');

    // Add click handlers
    $$('.property-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.wishlist-btn')) return;
            const id = card.dataset.id;
            window.location.href = `property.html?id=${id}`;
        });
    });

    // Add wishlist handlers
    $$('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            toggleWishlist(id, btn);
        });
    });
}

function toggleWishlist(id, btn) {
    const property = properties.find(p => p.id === id);
    if (property) {
        property.wishlist = !property.wishlist;
        btn.classList.toggle('active');
        const icon = btn.querySelector('i');
        icon.classList.toggle('far');
        icon.classList.toggle('fas');
        
        if (property.wishlist) {
            showToast('Saved to wishlist!');
        } else {
            showToast('Removed from wishlist');
        }
    }
}

function filterProperties(category) {
    if (category === 'all') {
        renderProperties('#listingsGrid', properties, 4);
    } else {
        const filtered = properties.filter(p => p.category === category);
        renderProperties('#listingsGrid', filtered, 4);
    }
}

// ========================================
// EXPERIENCES
// ========================================

function createExperienceCard(experience, showHost = false) {
    const hostHtml = showHost ? `
        <div class="experience-host">
            <img src="${experience.hostImage}" alt="${experience.host}" class="host-avatar-small">
            <span>Hosted by ${experience.host}</span>
        </div>
    ` : '';
    
    return `
        <div class="experience-card" data-id="${experience.id}">
            <div class="experience-image">
                <img src="${experience.image}" alt="${experience.title}" loading="lazy">
                <button class="wishlist-btn" data-id="${experience.id}">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            <div class="experience-info">
                <div class="experience-meta">
                    <span class="rating"><i class="fas fa-star"></i> ${experience.rating}</span>
                    <span class="reviews">(${experience.reviews})</span>
                    <span class="location">${experience.location}</span>
                </div>
                <h4>${experience.title}</h4>
                <p class="duration"><i class="far fa-clock"></i> ${experience.duration}</p>
                ${hostHtml}
                <p class="price"><strong>From $${experience.price}</strong> <span>/ person</span></p>
            </div>
        </div>
    `;
}

function renderExperiences(containerId = '#experiencesGrid', data = experiences, limit = null, showHost = false) {
    const container = $(containerId);
    if (!container) return;
    
    const displayData = limit ? data.slice(0, limit) : data;
    container.innerHTML = displayData.map(exp => createExperienceCard(exp, showHost)).join('');
    
    // Add click handlers for experience cards
    container.querySelectorAll('.experience-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.wishlist-btn')) return;
            const id = parseInt(card.dataset.id);
            const exp = experiences.find(e => e.id === id) || onlineExperiences.find(e => e.id === id);
            if (exp) {
                showExperienceModal(exp);
            }
        });
    });
    
    // Add wishlist handlers
    container.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            btn.classList.toggle('active');
            const icon = btn.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            showToast(btn.classList.contains('active') ? 'Saved to wishlist!' : 'Removed from wishlist');
        });
    });
}

function showExperienceModal(experience) {
    const modal = document.createElement('div');
    modal.className = 'modal experience-modal active';
    modal.innerHTML = `
        <div class="modal-content experience-detail">
            <button class="modal-close"><i class="fas fa-times"></i></button>
            <div class="experience-detail-image">
                <img src="${experience.image}" alt="${experience.title}">
            </div>
            <div class="experience-detail-content">
                <div class="experience-detail-header">
                    <div class="host-info">
                        <img src="${experience.hostImage}" alt="${experience.host}" class="host-avatar">
                        <div>
                            <span class="hosted-by">Hosted by ${experience.host}</span>
                            <span class="location"><i class="fas fa-map-marker-alt"></i> ${experience.location}</span>
                        </div>
                    </div>
                    <div class="rating-badge">
                        <i class="fas fa-star"></i>
                        <span>${experience.rating}</span>
                        <span class="reviews">(${experience.reviews} reviews)</span>
                    </div>
                </div>
                <h2>${experience.title}</h2>
                <div class="experience-meta-row">
                    <span><i class="far fa-clock"></i> ${experience.duration}</span>
                    <span><i class="fas fa-users"></i> ${experience.groupSize}</span>
                </div>
                <div class="experience-description">
                    <h3>About this experience</h3>
                    <p>${experience.description}</p>
                </div>
                <div class="experience-includes">
                    <h3>What's included</h3>
                    <ul>
                        ${experience.includes.map(item => `<li><i class="fas fa-check"></i> ${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="experience-booking">
                    <div class="price-row">
                        <span class="price">$${experience.price}</span>
                        <span class="per">/ person</span>
                    </div>
                    <button class="book-btn">Book Now</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.remove();
        document.body.style.overflow = '';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
    });
    
    modal.querySelector('.book-btn').addEventListener('click', () => {
        showToast('Booking feature coming soon!');
    });
}

// ========================================
// TESTIMONIALS SLIDER
// ========================================

function initTestimonialsSlider() {
    const track = $('#testimonialsTrack');
    const prevBtn = $('#testPrev');
    const nextBtn = $('#testNext');

    if (!track || !prevBtn || !nextBtn) return;

    track.innerHTML = testimonials.map(t => `
        <div class="testimonial-card">
            <div class="testimonial-rating">
                ${Array(t.rating).fill('<i class="fas fa-star"></i>').join('')}
            </div>
            <p class="testimonial-text">"${t.text}"</p>
            <div class="testimonial-author">
                <img src="${t.avatar}" alt="${t.name}">
                <div>
                    <h5>${t.name}</h5>
                    <span>${t.location}</span>
                </div>
            </div>
        </div>
    `).join('');

    let currentIndex = 0;
    const cardWidth = track.querySelector('.testimonial-card').offsetWidth + 24;
    const maxIndex = testimonials.length - getVisibleCards();

    function getVisibleCards() {
        if (window.innerWidth >= 992) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    });

    window.addEventListener('resize', debounce(() => {
        currentIndex = 0;
        updateSlider();
    }, 250));
}

// ========================================
// REVIEWS
// ========================================

function renderReviews() {
    const container = $('#reviewsGrid');
    if (!container) return;

    container.innerHTML = reviews.map(r => `
        <div class="review-card">
            <div class="review-header">
                <img src="${r.avatar}" alt="${r.name}">
                <div>
                    <h5>${r.name}</h5>
                    <span>${r.date}</span>
                </div>
            </div>
            <p class="review-text">${r.text}</p>
        </div>
    `).join('');
}

// ========================================
// SCROLL REVEAL ANIMATION
// ========================================

function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    $$('section, .property-card, .experience-card, .feature-card').forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// LAZY LOADING
// ========================================

function initLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px'
    });

    $$('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// TOAST NOTIFICATIONS
// ========================================

function showToast(message, duration = 3000) {
    let toast = $('.toast');
    
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.classList.add('active');
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, duration);
}

// ========================================
// SEARCH FUNCTIONALITY
// ========================================

function initSearch() {
    const searchBtn = $('#searchBtn');
    const locationInput = $('#locationInput');

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const location = locationInput ? locationInput.value : '';
            if (location) {
                window.location.href = `listings.html?location=${encodeURIComponent(location)}`;
            } else {
                window.location.href = 'listings.html';
            }
        });
    }

    // Enter key on inputs
    if (locationInput) {
        locationInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchBtn?.click();
            }
        });
    }
}

// ========================================
// MODAL
// ========================================

function initModal() {
    const modal = $('#loginModal');
    const modalClose = $('#modalClose');
    const loginLinks = $$('.dropdown-item');

    if (!modal) return;

    loginLinks.forEach(link => {
        if (link.textContent.includes('Log in') || link.textContent.includes('Sign up')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
                $('#dropdownMenu')?.classList.remove('active');
            });
        }
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initGuestsDropdown();
    initCategoryScroll();
    initTestimonialsSlider();
    initScrollReveal();
    initLazyLoading();
    initSearch();
    initModal();
    initSmoothScroll();

    // Render content based on page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'index.html' || currentPage === '') {
        renderProperties('#listingsGrid', properties, 4);
        renderExperiences('#experiencesGrid', experiences, 4);
    } else if (currentPage === 'listings.html') {
        renderProperties('#listingsGrid', properties);
    } else if (currentPage === 'property.html') {
        renderReviews();
    } else if (currentPage === 'experiences.html') {
        renderExperiences('#experiencesGrid', experiences, null, true);
    } else if (currentPage === 'online-experiences.html') {
        renderExperiences('#onlineExperiencesGrid', onlineExperiences, null, true);
    }

    // Add page transition class
    document.body.classList.add('page-transition');
});

// Export for other modules
window.StayUnique = {
    properties,
    experiences,
    onlineExperiences,
    testimonials,
    showToast,
    debounce,
    throttle,
    renderExperiences,
    createExperienceCard
};
