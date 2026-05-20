const products = [
            // Engine Parts
            { id: 1, name: "Spark Plug NGK", price: 150, category: "engine", image:"./Home/icons/sparkplug.png", description: "High-quality spark plug for efficient combustion. Compatible with most motorcycle models." },
            { id: 2, name: "Air Filter K&N", price: 850, category: "engine", image: "./Home/icons/airfilter.jpg", description: "Performance air filter for better airflow and engine protection." },
            { id: 3, name: "Oil Filter", price: 220, category: "engine", image:"./Home/icons/oilfilter.png", description: "Premium oil filter for optimal engine lubrication and longevity." },
            { id: 4, name: "Piston Kit", price: 2500, category: "engine", image:"./Home/icons/piston.webp", description: "Complete piston kit including rings and pins for engine rebuild." },
            { id: 5, name: "Carburetor", price: 1500, category: "engine", image:"./Home/icons/carb.jpg", description: "A device that mixes air and fuel for internal combustion engines"},
            // Electrical
            { id: 6, name: "LED Headlight", price: 1200, category: "electrical", image:"./Home/icons/headlight.png", description: "Bright LED headlight for improved visibility and style." },
            { id: 7, name: "Battery 12V", price: 1800, category: "electrical", image:"./Home/icons/battery.jpg", description: "Maintenance-free battery with long life and reliable performance." },
            { id: 8, name: "Voltage Regulator", price: 650, category: "electrical", image:"./Home/icons/voltage", description: "Stabilizes voltage output to protect electrical components." },
            { id: 9, name: "Signal Lights", price: 450, category: "electrical", image:"./Home/icons/signal.jfif", description: "LED turn signal lights for better visibility and safety." },
            
            // Body & Frame
            { id: 10, name: "Side Mirror Set", price: 550, category: "body", image:"./Home/icons/samin.jpg", description: "Aerodynamic side mirrors with wide viewing angle." },
            { id: 11, name: "Handle Grip", price: 280, category: "body",image:"./Home/icons/grip.webp", description: "Comfortable rubber grips with anti-slip design." },
            { id: 12, name: "Brake Lever", price: 380, category: "body", image:"./Home/icons/lever.jpg", description: "Adjustable brake lever for improved control and comfort." },
            { id: 13, name: "Front Fender", price: 950, category: "body", image:"./Home/icons/fender.png", description: "Durable front fender to protect from mud and debris." },
            
            // Accessories
            { id: 14, name: "Helmet Lock", price: 180, category: "accessories", image:"./Home/icons/lock.jpg", description: "Secure helmet lock for added security and convenience." },
            { id: 15, name: "Phone Mount", price: 320, category: "accessories", image:"./Home/icons/holder.jpg", description: "Adjustable phone mount with secure grip for navigation." },
            { id: 16, name: "Tank Bag", price: 890, category: "accessories", image:"./Home/icons/bag.webp", description: "Waterproof tank bag with magnetic mount system." },
            { id: 17, name: "Chain Lubricant", price: 250, category: "accessories", image:"./Home/icons/chain.webp", description: "Premium chain lubricant for smooth operation and protection." },
            { id: 17, name: "Full Face Helmet", price: 250, category: "accessories", image:"./Home/icons/helmet.webp", description: "Premium chain lubricant for smooth operation and protection." }
        ];

        let cart = [];
        let currentProduct = null;
        let currentFilter = 'all';

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            renderProducts();
            updateCartCount();
            
            // Sidebar navigation
            document.querySelectorAll('.sidebar ul li').forEach(item => {
                item.addEventListener('click', function() {
                    document.querySelectorAll('.sidebar ul li').forEach(li => li.classList.remove('active'));
                    this.classList.add('active');
                    
                    const page = this.getAttribute('data-page');
                    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
                    document.getElementById(page).classList.add('active');
                });
            });
        });

       function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const filtered = currentFilter === 'all' ? products : products.filter(p => p.category === currentFilter);
    
    grid.innerHTML = filtered.map(product => `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <div class="product-image">
                ${product.image ? 
                    `<img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: contain;">` 
                    : product.icon}
            </div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">₱${product.price}</div>
        </div>
    `).join('');
}

        function filterCategory(category) {
            currentFilter = category;
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            renderProducts();
        }

        function openProductModal(id) {
            currentProduct = products.find(p => p.id === id);
            const modalImage = document.getElementById('modalImage');
            modalImage.innerHTML = `<img src="${currentProduct.image}" alt="${currentProduct.name}" style="width: 100%; height: 100%; object-fit: contain;">`;
            document.getElementById('modalTitle').textContent = currentProduct.name;
            document.getElementById('modalPrice').textContent = `₱${currentProduct.price}`;
            document.getElementById('modalCategory').textContent = currentProduct.category.toUpperCase();
            document.getElementById('modalDescription').textContent = currentProduct.description;
            document.getElementById('productModal').classList.add('active');
        }

        function closeModal() {
            document.getElementById('productModal').classList.remove('active');
        }

        function addToCart() {
            const existing = cart.find(item => item.id === currentProduct.id);
            if (existing) {
                existing.quantity++;
            } else {
                cart.push({ ...currentProduct, quantity: 1 });
            }
            updateCartCount();
            closeModal();
        }

        function openCart() {
            renderCart();
            document.getElementById('cartModal').classList.add('active');
        }

        function closeCart() {
            document.getElementById('cartModal').classList.remove('active');
        }

        function renderCart() {
            const container = document.getElementById('cartItems');
            if (cart.length === 0) {
                container.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
                document.getElementById('cartTotal').textContent = '';
                return;
            }

            container.innerHTML = cart.map((item, index) => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${item.name} (x${item.quantity})</h4>
                        <p>₱${item.price * item.quantity}</p>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                </div>
            `).join('');

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            document.getElementById('cartTotal').textContent = `Total: ₱${total}`;
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCartCount();
            renderCart();
        }

        function updateCartCount() {
            const count = cart.reduce((sum, item) => sum + item.quantity, 0);
            document.getElementById('cartCount').textContent = count;
        }



// Sidebar Navigation Switching
document.querySelectorAll(".menu-list a").forEach(menu => {
    menu.addEventListener("click", function (e) {
        e.preventDefault();

        // Remove active class from all menu items
        document.querySelectorAll(".menu-list li").forEach(li => li.classList.remove("active"));

        // Add active class to clicked menu
        this.parentElement.classList.add("active");

        // Hide all pages/sections
        document.querySelector('.content').style.display = "none"; 
        document.querySelectorAll(".page").forEach(page => {
            page.style.display = "none";
        });

        // Show selected page
        const target = this.getAttribute("data-target");

        if (target === "dashboard") {
            document.querySelector('.content').style.display = "block";
        } else {
            document.getElementById(target).style.display = "block";
        }
    });
});

// Default page load = Dashboard
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.content').style.display = "block";
    document.querySelectorAll(".page").forEach(page => page.style.display = "none");
});




