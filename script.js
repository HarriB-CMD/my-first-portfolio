
import { products } from './products.js';

const realUrl = "https://harrib-ecom.netlify.app";


// 2. Settings
const sisterPhone = "233540252006";
const container = document.getElementById('product-container');





// 4. WhatsApp Logic
function sendOrder(name, price) {
   const message = `ORDER ALERT! 🛒\nItem: ${name}\nPrice: GH₵ ${price}\n\nIs this available please?`;
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

// 7. Dark Mode Logic (Improved)
const modeBtn = document.getElementById('mode-toggle');

if (modeBtn) {
    modeBtn.addEventListener('click', function() {
        // We toggle the class on the 'body' tag
        document.body.classList.toggle('dark-mode');
        
        // Console log helps you see if it's working behind the scenes
        console.log("Dark mode toggled!"); 
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

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('share-btn')) {
        const name = e.target.getAttribute('data-name');
        
        if (navigator.share) {
            navigator.share({
                title: `Check out this ${name}!`,
                text: `I found this ${name} on CHRISWALD.`,
                url: realUrl, // This now uses the public link you added at the top
            }).catch(console.error);
        }
    }
});

// Add this to the VERY bottom of script.js
window.filterProducts = filterProducts;
window.filterCategory = filterCategory;
window.sendOrder = sendOrder;

// This tells the computer: "Wait until the whole page is ready, THEN do these things"
window.addEventListener("load", () => {
    
    // 1. HIDE THE SPINNER
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.display = "none";
    }

    // 2. DRAW THE PRODUCT CARDS
    products.forEach(product => {
        const isSale = product.category.toLowerCase() === 'room deco';
        const pulseClass = isSale ? 'pulse' : '';
        const saleLabel = isSale ? '<span class="hot-label">HOT 🔥</span>' : '';

        const card = `
            <div class="project-card">
                <span class="price-badge ${pulseClass}">
                    ${saleLabel} GH₵ ${product.price}
                </span>
                <img src="${product.img}">
                <h3>${product.name}</h3>
                <p style="color: gray; font-size: 0.8rem;">${product.category}</p> 
                <button class="btn-small" onclick="sendOrder('${product.name}', ${product.price})">Order</button>
                <button class="btn-small" style="background-color: #1af149;" onclick="window.location.href='tel:+233540252006'">Call</button>
                <button class="btn-small share-btn" data-name="${product.name}">Share 🔗</button>
            </div>
        `;
        container.innerHTML += card;
    });
});

