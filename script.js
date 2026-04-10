
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
        
        // Ensure navigator.share is supported
        if (navigator.share) {
            navigator.share({
                title: `Check out this ${name}!`,
                text: `I found this ${name} on CHRISWALD IMPORTS. Check it out here:`,
                url: realUrl, // This uses the link at the top of your script
            }).catch(console.error);
        } else {
            // Fallback: If the browser doesn't support native sharing, copy to clipboard
            navigator.clipboard.writeText(`${realUrl}`).then(() => {
                alert("Link copied to clipboard! You can now paste it in WhatsApp.");
            });
        }
    }
});



// 1. YOUR GOOGLE SHEET LINK (Ensure you replaced the text below with your actual link)
const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSKhm4i4WIlGxTmPn37uEZDJh7zw0NVAmrjARhWy41RBcmoHJMRczAy_pbVgLLnprSCgXP-MkY2fN6Z/pub?output=csv";
const reviewsSheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSKhm4i4WIlGxTmPn37uEZDJh7zw0NVAmrjARhWy41RBcmoHJMRczAy_pbVgLLnprSCgXP-MkY2fN6Z/pub?gid=1082222210&single=true&output=csv";


window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    window.sendOrder = sendOrder;
    window.filterCategory = filterCategory;
    window.filterProducts = filterProducts;
    window.displayProducts = displayProducts;

    // Load Products
    Papa.parse(sheetUrl, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
            displayProducts(results.data);
            if(loader) loader.style.display = "none";
        }
    });

    // Load Reviews - USE THE NEW REVIEWS-SPECIFIC LINK HERE
    Papa.parse(reviewsSheetUrl, {
        download: true,
        header: true,
        complete: function(results) {
            displayReviews(results.data);
        }
    });
});
    
   function displayReviews(reviews) {
    const reviewsContainer = document.getElementById('reviews-container');
    if(!reviewsContainer) return;
    
    reviews.forEach(rev => {
        if(!rev.name) return; // Skip empty rows
        
        const reviewHtml = `
            <div class="review-card" style="background: white; padding: 20px; border-radius: 15px; width: 300px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-left: 5px solid var(--primary-color);">
                <p style="font-size: 1.2rem; color: gold; margin-bottom: 5px;">${rev.rating}</p>
                <p style="font-style: italic; color: #555;">"${rev.comment}"</p>
                <h4 style="margin-top: 15px; color: var(--dark-bg);">- ${rev.name}</h4>
                <small style="color: gray;">${rev.date}</small>
            </div>
        `;
        reviewsContainer.innerHTML += reviewHtml;
    });
}


function displayProducts(products) {
    const mainContainer = document.getElementById('product-container');
    const leftFeatured = document.getElementById('featured-left');
    const rightFeatured = document.getElementById('featured-right');
    
    if(!mainContainer) return;
    
    mainContainer.innerHTML = ""; 
    if(leftFeatured) leftFeatured.innerHTML = "";
    if(rightFeatured) rightFeatured.innerHTML = "";

    let featuredCount = 0;

    products.forEach(product => {
        if (!product.name) return;

        // --- TEMPLATE A: MAIN SHOP ---
        const isHot = product.category.toLowerCase().trim() === 'room deco';
        const mainCardHtml = `
            <div class="project-card">
                <span class="price-badge ${isHot ? 'pulse' : ''}">${isHot ? 'HOT 🔥' : ''} GH₵ ${product.price}</span>
                <img src="${product.img}">
                <h3>${product.name}</h3>
                <p style="color: gray; font-size: 0.8rem;">${product.category}</p> 
                <button class="btn-small" onclick="sendOrder('${product.name}', '${product.price}')">Order</button>
                <button class="btn-small" style="background-color: #1af149;" onclick="window.location.href='tel:+233540252006'">Call</button>
                <button class="btn-small share-btn" data-name="${product.name}">Share 🔗</button>
                
            </div>`;

        // --- TEMPLATE B: FEATURED SIDE CARDS ---
        const featuredCardHtml = `
            <div class="project-card featured-mini" style="border: 2px solid gold;">
                <div style="background: gold; color: black; font-weight: bold; font-size: 0.7rem; padding: 5px;">⭐ TOP SELLER</div>
                <img src="${product.img}" style="height: 140px; width: 100%; object-fit: cover;">
                <div style="padding: 10px;">
                    <span class="limited-stock">⚠️ LIMITED STOCK only few left</span>
                    <h3>${product.name}</h3>
                    <button class="btn-small" onclick="sendOrder('${product.name}', '${product.price}')">Quick Order</button>
                    <button class="btn-small share-btn" data-name="${product.name}">Share 🔗</button>
                    <button class="btn-small" style="background-color: #1af149; width: 100%; margin-top: 5px;" onclick="window.location.href='tel:+233540252006'">Call Now</button>
                    </div>
            </div>`;

        // NEW LOGIC: Check the 'featured' column from your spreadsheet
        const isFeatured = product.featured && product.featured.toLowerCase().trim() === 'yes';

        if (isFeatured && featuredCount === 0 && leftFeatured) {
            leftFeatured.innerHTML = featuredCardHtml;
            featuredCount++;
        } else if (isFeatured && featuredCount === 1 && rightFeatured) {
            rightFeatured.innerHTML = featuredCardHtml;
            featuredCount++;
        }

        mainContainer.innerHTML += mainCardHtml;
    });
}

// Lists of images to cycle through
const newsImages = [
    "images//5.jpg",
    "images//9.jpg", // Icon for new arrivals
    "images//15.jpg"     // Icon for storefront
];

const discountImages = [
    "images//19.jpg",
    "images//13.jpg",
    "images//4.jpg"
];

let newsIndex = 0;
let discountIndex = 0;

function rotatePromoContent() {
    // Rotate Left Image
    newsIndex = (newsIndex + 1) % newsImages.length;
    document.getElementById("news-img").src = newsImages[newsIndex];

    // Rotate Right Image
    discountIndex = (discountIndex + 1) % discountImages.length;
    document.getElementById("discount-img").src = discountImages[discountIndex];
}

// Change the images every 3 seconds
setInterval(rotatePromoContent, 3000);

