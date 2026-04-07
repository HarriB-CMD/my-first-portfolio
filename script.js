// 1. The list of products
const products = [
    { name: "Vintage Denim Jacket", price: 45.00, category: "Clothes", img: "images/7.jpg" },
    { name: "Drawer with mirror", price: 120.00, category: "Room Deco", img: "images/2.jpg" },
    { name: "Summer Floral Dress", price: 35.00, category: "Clothes", img: "images/3.jpg" },
    { name: "Ladies Sandals", price: 35.00, category: "Sandals", img: "images/10.jpg" },
    { name: "All white Center Table", price: 500.00, category: "Room Deco", img: "images/13.jpg" },
    { name: "Summer Floral Dress", price: 35.00, category: "Clothes", img: "images/18.jpg" },
    { name: "Summer Bags", price: 35.00, category: "Bags", img: "images/16.jpg" },
    { name: "Umbrella Spray ", price: 40.00, category: "Cosmetics", img: "images/12.jpg" },

    // --- ADD THE SHOES HERE ---
    { 
        name: "Ladies Sandals", 
        price: 85.00, 
        category: "Sandals", 
        img: "images/4.jpg" 
    },
    { 
        name: "Sport Sneakers", 
        price: 55.00, 
        category: "Shoes", 
        img: "images/5.jpg" 
    }
];



// 2. Settings
const sisterPhone = "233540252006";
const container = document.getElementById('product-container');

// 3. Create the cards - (I added the <p> for category so the filter works!)
// 3. Create the cards
products.forEach(product => {
    // Check if it's an appliance to add the pulse effect
    const pulseClass = product.category === 'Appliances' ? 'pulse' : '';

    const card = `
        <div class="project-card">
            <!-- We add the pulseClass here -->
            <span class="price-badge ${pulseClass}">GH₵ ${product.price}</span>
            
            <img src="${product.img}">
            <h3>${product.name}</h3>
            <p style="color: gray; font-size: 0.8rem;">${product.category}</p> 
            
            <button class="btn-small" onclick="sendOrder('${product.name}', ${product.price})">
                Order via WhatsApp
            </button>
            
            <button class="btn-small" style="background-color: #1af149;" onclick="window.location.href='tel:+233540252006'">
                Call to Order
            </button>
        </div>
    `;
    container.innerHTML += card;
});


// 4. WhatsApp Logic
function sendOrder(name, price) {
    const message = `ORDER ALERT! 🛒\nItem: ${name}\nPrice: $${price}\n\nIs this available please?`;
    const whatsappUrl = `https://wa.me/233540252006?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

}


// 5. Category Filter Logic
function filterCategory(category) {
    const cards = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.btn-filter');
    
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase() === category.toLowerCase()) {
            btn.classList.add('active');
        }
    });

    cards.forEach(card => {
        const cardText = card.innerText.toLowerCase();
        if (category === 'all' || cardText.includes(category.toLowerCase())) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// 6. Search Bar Logic (THIS WAS MISSING FROM YOUR LAST MESSAGE)
function filterProducts() {
    const searchValue = document.getElementById('product-search').value.toLowerCase();
    const cards = document.querySelectorAll('.project-card');
    const noResults = document.getElementById('no-results');
    let visibleCount = 0;

    cards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        if (title.includes(searchValue)) {
            card.style.display = "block";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    // Show the "No Results" div if count is 0
    if (visibleCount === 0) {
        noResults.style.display = "block";
    } else {
        noResults.style.display = "none";
    }
}

// 7. Dark Mode Logic
const modeBtn = document.getElementById('mode-toggle');

if (modeBtn) {
    modeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });
}

// Ensure the ID matches your HTML exactly
const topBtn = document.getElementById("backToTop");

window.onscroll = function() {
    // We check both scrollY and documentElement to be safe
    if (window.scrollY > 300 || document.documentElement.scrollTop > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
};

topBtn.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// 9. Sale Countdown Timer
function startTimer() {
    // Set the date we're counting down to
    const countDownDate = new Date("April 30, 2026 23:59:59").getTime();

    // Update the count down every 1 second
    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        // Calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="timer"
        document.getElementById("timer").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("sale-timer").innerHTML = "SALE HAS ENDED!";
        }
    }, 1000);
}

// Start the timer immediately
startTimer();


