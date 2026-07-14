
window.addEventListener("scroll", function () {
    const navbar = document.querySelector("nav");

    if (window.scrollY > 50) {
        navbar.style.background = "rgba(255, 255, 255, 0.98)";
        navbar.style.boxShadow = "0 2px 15px rgba(0,0,0,0.1)";
        navbar.classList.add('nav-scrolled');
    } else {
        navbar.style.background = "rgba(255, 255, 255, 0.95)";
        navbar.style.boxShadow = "0 1px 10px rgba(0,0,0,0.05)";
        navbar.classList.remove('nav-scrolled');
    }

    revealOnScroll();
});

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        if (navLinks.style.display === "flex") {
            navLinks.style.display = "none";
        } else {
            navLinks.style.display = "flex";
            navLinks.style.position = "absolute";
            navLinks.style.flexDirection = "column";
            navLinks.style.top = "70px";
            navLinks.style.left = "0";
            navLinks.style.width = "100%";
            navLinks.style.background = "white";
            navLinks.style.padding = "20px";
            navLinks.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
        }
    });
}

function shuffleProducts() {
    const grid = document.querySelector('.dynamic-grid');
    if (grid) {
        for (let i = grid.children.length; i >= 0; i--) {
            grid.appendChild(grid.children[Math.random() * i | 0]);
        }
    }
}



// 5. Keyword Search & Glow Logic
const serviceMap = {
    'fruits': 'bigbasket',
    'grocery': 'bigbasket',
    'veggies': 'bigbasket',
    'shoes': 'myntra',
    'fashion': 'myntra',
    'clothes': 'myntra',
    'food': 'swiggy',
    'tiffin': 'swiggy',
    'electronics': 'amazon',
    'mobile': 'flipkart',
    'deals': 'flipkart',
    'quick': 'instamart'
};

const searchInput = document.getElementById('serviceSearch');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const brandCards = document.querySelectorAll('.brand-card');

        // Reset all icons first
        brandCards.forEach(card => {
            card.classList.remove('glow-effect');
            card.style.opacity = query === "" ? "1" : "0.4";
        });

        // Find match in our map
        const targetBrand = serviceMap[query];
        if (targetBrand) {
            const match = document.querySelector(`.brand-icon.${targetBrand}`).closest('.brand-card');
            if (match) {
                match.classList.add('glow-effect');
                match.style.opacity = "1";
            }
        }
    });
}

// 6. Professional Redirect Tracking
document.querySelectorAll('.brand-card').forEach(link => {
    link.addEventListener('click', function (e) {
        const brandName = this.querySelector('span').innerText;
        console.log(`%c Redirecting to official ${brandName} platform...`, 'color: #FF5722; font-weight: bold;');
    });
});

// 7. Scroll Reveal Animation
const revealOnScroll = () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 100) {
            section.style.opacity = "1";
            section.style.transform = "translateY(0)";
            section.style.transition = "all 0.8s ease-out";
        }
    });
};

// 8. Persistent Cart Logic
let cart = [];

// Load cart from local storage on init
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Save cart to local storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) {
        cartCountEl.textContent = cart.length.toString();
    }
}

function calculateTotal() {
    return cart.reduce((total, item) => total + item.price, 0);
}

function renderCart() {
    // 1. Try to render to the Modal list (if it exists)
    const cartItemsList = document.getElementById('cartItems');
    const cartTotalAmount = document.getElementById('cartTotalAmount');

    if (cartItemsList) {
        cartItemsList.innerHTML = '';
        if (cart.length === 0) {
            cartItemsList.innerHTML = '<li class="empty-cart-msg">Your cart is empty. Start shopping!</li>';
            if (cartTotalAmount) cartTotalAmount.textContent = '₹0';
        } else {
            cart.forEach((item, index) => {
                const li = document.createElement('li');
                li.className = 'cart-item';
                const imgSrc = item.image || 'https://via.placeholder.com/60';
                li.innerHTML = `
                    <div class="cart-item-thumb">
                        <img src="${imgSrc}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <span class="cart-item-name">${item.name}</span>
                        <span class="cart-item-price">₹${item.price}</span>
                    </div>
                    <button class="btn-remove" data-index="${index}" title="Remove Item">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                cartItemsList.appendChild(li);
            });
            if (cartTotalAmount) cartTotalAmount.textContent = '₹' + calculateTotal();
        }
    }

    // 2. Try to render to the Cart Page (if it exists)
    const cartListBody = document.getElementById('cartListBody'); // New ID
    const cartPageTotal = document.getElementById('cartPageTotal');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const checkoutPageBtn = document.getElementById('checkoutPageBtn');
    const cartCountSub = document.getElementById('cartCountSub');

    if (cartListBody) {
        cartListBody.innerHTML = '';
        if (cart.length === 0) {
            if (emptyCartMessage) emptyCartMessage.style.display = 'block';
            if (checkoutPageBtn) checkoutPageBtn.style.display = 'none'; // Or hide the whole sidebar logic
        } else {
            if (emptyCartMessage) emptyCartMessage.style.display = 'none';
            if (checkoutPageBtn) checkoutPageBtn.style.display = 'block';

            cart.forEach((item, index) => {
                const div = document.createElement('div');
                div.className = 'amz-cart-item';
                const imgSrc = item.image || 'https://via.placeholder.com/150';

                // Mock logic for stock date
                const stockText = Math.random() > 0.3 ? 'In Stock' : 'Only 2 left in stock - order soon.';
                const stockColor = stockText === 'In Stock' ? '#007600' : '#B12704';

                div.innerHTML = `
                    <input type="checkbox" class="amz-checkbox" checked>
                    
                    <img src="${imgSrc}" alt="${item.name}" class="amz-item-img">
                    
                    <div class="amz-item-details">
                        <div style="display: flex; justify-content: space-between;">
                            <a href="#" class="amz-item-title">${item.name}</a>
                            <div class="amz-price">₹${item.price}</div>
                        </div>
                        
                        <div class="amz-stock-status" style="color: ${stockColor}">${stockText}</div>
                        <div class="amz-shipping-info">Eligible for FREE Shipping</div>
                        <div style="font-size: 12px; color: #565959; margin-bottom: 5px;">
                            <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px._CB485936079_.png" alt="Fulfilled" style="vertical-align: middle;">
                        </div>
                        
                        <div class="amz-actions">
                            <select class="amz-qty">
                                <option>Qty: 1</option>
                                <option>Qty: 2</option>
                                <option>Qty: 3</option>
                                <option>Qty: 4</option>
                            </select>
                            <span class="amz-action-link btn-remove" data-index="${index}">Delete</span>
                            <span class="amz-action-link">Save for later</span>
                            <span class="amz-action-link">See more like this</span>
                            <span class="amz-action-link">Share</span>
                        </div>
                    </div>
                `;
                cartListBody.appendChild(div);
            });
        }

        const total = calculateTotal();
        if (cartPageTotal) cartPageTotal.textContent = '₹' + total;
        if (cartCountSub) cartCountSub.textContent = cart.length;
    }

    // Attach remove listeners (works for both views as they use class .btn-remove)
    document.querySelectorAll('.btn-remove').forEach(btn => {
        // Avoid adding duplicate listeners if called multiple times? 
        // Actually, since we clear innerHTML, we need to re-attach.
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.getAttribute('data-index'));
            removeFromCart(index);
        });
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

function setupCartButtons() {
    // Add to Cart buttons on products
    const buttons = document.querySelectorAll('.btn-add-cart');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const name = btn.getAttribute('data-name');
            const priceStr = btn.getAttribute('data-price') || '0';
            const price = parseFloat(priceStr);

            // Try to find the image from the card
            const card = btn.closest('.product-card');
            let image = 'https://via.placeholder.com/60';
            if (card) {
                const imgEl = card.querySelector('img');
                if (imgEl) image = imgEl.src;
            }

            cart.push({ name, price, image });
            saveCart();

            // Cart icon bump animation
            const cartIndicator = document.querySelector('.cart-indicator');
            if (cartIndicator) {
                cartIndicator.style.transform = 'scale(1.4)';
                cartIndicator.style.transition = 'all 0.2s ease-out';
                cartIndicator.style.color = '#FF5722';
                setTimeout(() => {
                    cartIndicator.style.transform = 'scale(1)';
                    cartIndicator.style.color = '';
                }, 300);
            }

            // Visual feedback
            const originalText = btn.textContent;
            btn.textContent = 'Added!';
            btn.style.background = '#22c55e'; // Green
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = ''; // Revert to CSS default
            }, 1000);
        });
    });

    // Cart Modal Open/Close
    const openCartBtn = document.getElementById('openCartBtn');
    const cartModal = document.getElementById('cartModal');
    const overlay = document.getElementById('modalOverlay');

    if (openCartBtn && cartModal && overlay) {
        openCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            renderCart(); // Render fresh content
            overlay.classList.add('active');
            cartModal.classList.add('active');
        });

        // Close logic is already handled by generic modal close listeners in window.DOMContentLoaded
        // But we need to ensure the overlay click also closes it (handled there too)

        // Close button inside cart modal
        const closeBtn = cartModal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                overlay.classList.remove('active');
                cartModal.classList.remove('active');
            });
        }
    }

    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            window.location.href = 'checkout.html';
        });
    }

    const checkoutPageBtn = document.getElementById('checkoutPageBtn');
    if (checkoutPageBtn) {
        checkoutPageBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            window.location.href = 'checkout.html';
        });
    }
}

function setupCategoryDropdowns() {
    const blocks = Array.from(document.querySelectorAll('.category-products .category-block'));

    // Start with all product groups collapsed
    blocks.forEach(block => {
        block.classList.add('collapsed');
        block.classList.remove('open');
    });

    const serviceCards = Array.from(document.querySelectorAll('.services-grid .service-card'));

    serviceCards.forEach((card, index) => {
        card.style.cursor = 'pointer';

        card.addEventListener('click', () => {
            const targetBlock = blocks[index];
            if (!targetBlock) return;

            const isOpen = targetBlock.classList.contains('open');

            // Close all blocks first so only one is open at a time
            blocks.forEach(b => {
                b.classList.add('collapsed');
                b.classList.remove('open');
            });

            // If it was closed, open it
            if (!isOpen) {
                targetBlock.classList.add('open');
                targetBlock.classList.remove('collapsed');
            }
        });
    });
}

// 9. Initialize Everything on Load
window.addEventListener('DOMContentLoaded', () => {
    shuffleProducts();

    // Set initial state for reveal
    document.querySelectorAll('section').forEach(s => {
        s.style.opacity = "0";
        s.style.transform = "translateY(30px)";
    });
    revealOnScroll();

    // Smooth scroll from nav links that have data-target
    document.querySelectorAll('.nav-links a[data-target]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            if (target === 'home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const el = document.getElementById(target);
                if (el) {
                    const offset = el.getBoundingClientRect().top + window.scrollY - 70;
                    window.scrollTo({ top: offset, behavior: 'smooth' });
                }
            }
        });
    });

    // Login / Signup modal controls
    const loginTrigger = document.getElementById('openLogin');
    const signupTrigger = document.getElementById('openSignup');
    const vendorTrigger = document.getElementById('openVendorRegistration');
    const aboutTrigger = document.getElementById('openAbout');
    const loginModal = document.getElementById('loginModal');
    const vendorModal = document.getElementById('vendorModal');
    const aboutModal = document.getElementById('aboutModal');
    const overlay = document.getElementById('modalOverlay');
    const loginView = document.getElementById('loginView');
    const signupView = document.getElementById('signupView');
    const showSignupLink = document.getElementById('showSignupLink');
    const showLoginLink = document.getElementById('showLoginLink');

    const openModal = (modal) => {
        if (!modal || !overlay) return;
        overlay.classList.add('active');
        modal.classList.add('active');
    };

    const closeModal = (modal) => {
        if (!modal || !overlay) return;
        overlay.classList.remove('active');
        modal.classList.remove('active');
    };

    if (showSignupLink && showLoginLink) {
        showSignupLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginView.style.display = 'none';
            signupView.style.display = 'block';
        });

        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            signupView.style.display = 'none';
            loginView.style.display = 'block';
        });
    }

    if (loginTrigger && loginModal && overlay) {
        loginTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            loginView.style.display = 'block';
            signupView.style.display = 'none';
            openModal(loginModal);
        });

        if (signupTrigger) {
            signupTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                signupView.style.display = 'block';
                loginView.style.display = 'none';
                openModal(loginModal);
            });
        }

        overlay.addEventListener('click', () => {
            closeModal(loginModal);
            closeModal(vendorModal);
            closeModal(aboutModal);
        });

        loginModal.querySelectorAll('[data-close="loginModal"]').forEach(btn => {
            btn.addEventListener('click', () => closeModal(loginModal));
        });
    }

    if (aboutTrigger && aboutModal && overlay) {
        aboutTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(aboutModal);
        });

        aboutModal.querySelectorAll('[data-close="aboutModal"]').forEach(btn => {
            btn.addEventListener('click', () => closeModal(aboutModal));
        });
    }

    if (vendorTrigger && vendorModal && overlay) {
        vendorTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(vendorModal);
        });

        vendorModal.querySelectorAll('[data-close="vendorModal"]').forEach(btn => {
            btn.addEventListener('click', () => closeModal(vendorModal));
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value.trim();

            fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
                .then(async (res) => {
                    const data = await res.json();
                    if (!res.ok) {
                        throw new Error(data.message || 'Login failed');
                    }
                    console.log('Login success:', data);
                    closeModal(loginModal);
                    alert('Login successful. Welcome to DigitalMart!');
                })
                .catch((err) => {
                    console.error('Login error:', err);
                    alert(err.message || 'Login failed. Please try again.');
                });
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('signupEmail').value.trim();
            const password = document.getElementById('signupPassword').value.trim();
            const role = document.getElementById('signupRole').value;

            fetch('http://localhost:3000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, role })
            })
                .then(async (res) => {
                    const data = await res.json();
                    if (!res.ok) {
                        throw new Error(data.message || 'Signup failed');
                    }
                    console.log('Signup success:', data);
                    closeModal(loginModal);
                    alert('Signup successful. You can now log in with your new account.');
                })
                .catch((err) => {
                    console.error('Signup error:', err);
                    alert(err.message || 'Signup failed. Please try again.');
                });
        });
    }

    // Vendor registration & status
    const vendorForm = document.getElementById('vendorForm');
    const vendorStatus = document.getElementById('vendorStatus');
    const simulateVerify = document.getElementById('simulateVerify');
    const simulateBlock = document.getElementById('simulateBlock');

    const setStatus = (status, text) => {
        if (!vendorStatus) return;
        vendorStatus.classList.remove('status-pending', 'status-verified', 'status-blocked');
        vendorStatus.classList.add(status);
        vendorStatus.textContent = text;
    };

    if (vendorForm && vendorStatus) {
        vendorForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const businessName = document.getElementById('businessName').value.trim();
            const pan = document.getElementById('panNumber').value.trim();
            const gst = document.getElementById('gstNumber').value.trim();

            if (pan.length !== 10 || gst.length !== 15) {
                alert('Please check PAN (10 chars) and GST (15 chars) formats.');
                return;
            }

            setStatus('status-pending', `Pending verification for ${businessName}`);
            alert('Vendor application submitted (demo). Admin verification would happen on the backend.');
        });
    }

    if (simulateVerify) {
        simulateVerify.addEventListener('click', () => {
            setStatus('status-verified', 'Vendor verified. You can now list products.');
        });
    }

    if (simulateBlock) {
        simulateBlock.addEventListener('click', () => {
            setStatus('status-blocked', 'Vendor account blocked due to suspicious activity.');
        });
    }



    // Cart setup
    loadCart(); // Load saved cart
    setupCartButtons();
    updateCartCount();
    renderCart(); // Initial render (important for cart.html)

    // Category dropdowns
    setupCategoryDropdowns();

    // 10. Main Search Functionality
    const mainSearchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    function performSearch() {
        if (!mainSearchInput) return;
        const query = mainSearchInput.value.toLowerCase().trim();
        
        // Local Product cards
        const categoryBlocks = document.querySelectorAll('.category-block');
        categoryBlocks.forEach(block => {
            const categoryName = block.querySelector('h3')?.textContent.toLowerCase() || '';
            const cards = block.querySelectorAll('.product-card');
            let hasVisible = false;
            
            cards.forEach(card => {
                const title = card.querySelector('h4')?.textContent.toLowerCase() || '';
                if (title.includes(query) || categoryName.includes(query) || query === '') {
                    card.style.display = '';
                    hasVisible = true;
                } else {
                    card.style.display = 'none';
                }
            });
            
            if (hasVisible) {
                block.style.display = '';
                if (query !== '') {
                    block.classList.add('open');
                    block.classList.remove('collapsed');
                } else {
                    block.classList.remove('open');
                    block.classList.add('collapsed');
                }
            } else {
                block.style.display = 'none';
            }
        });

        // Affiliate cards
        const affiliateGrids = document.querySelectorAll('.affiliate-grid');
        affiliateGrids.forEach(grid => {
            const header = grid.previousElementSibling && grid.previousElementSibling.classList.contains('affiliate-brand-header') 
                           ? grid.previousElementSibling : null;
            const categoryName = header ? header.textContent.toLowerCase() : '';
            const cards = grid.querySelectorAll('.affiliate-card');
            let hasVisible = false;
            
            cards.forEach(card => {
                const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
                if (title.includes(query) || categoryName.includes(query) || query === '') {
                    card.style.display = '';
                    hasVisible = true;
                } else {
                    card.style.display = 'none';
                }
            });
            
            if (hasVisible) {
                grid.style.display = '';
                if (header) header.style.display = '';
            } else {
                grid.style.display = 'none';
                if (header) header.style.display = 'none';
            }
        });
    }

    if (mainSearchInput) {
        mainSearchInput.addEventListener('input', performSearch);
    }
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
});