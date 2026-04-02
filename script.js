// 1. The list of her products
const products = [
    { 
        name: "Vintage Denim Jacket", 
        price: 45.00, 
        category: "Clothes", 
        img: "images/1.jpg"  /* Points to your images folder */
    },
    { 
        name: "Smart Air Fryer", 
        price: 120.00, 
        category: "Appliances", 
        img: "images/2.jpg" 
    },
    { 
        name: "Summer Floral Dress", 
        price: 35.00, 
        category: "Clothes", 
        img: "images/3.jpg" 
    }
];


// 2. HER PHONE NUMBER (Put her actual number here, no '+' or spaces)
const sisterPhone = "233540252006"; // e.g., 233541234567

const container = document.getElementById('product-container');

// 3. This is the "forEach" loop that creates the cards
products.forEach(product => {
    const card = `
        <div class="project-card">
            <img src="${product.img}">
            <h3>${product.name}</h3>
            <p><strong>$${product.price}</strong></p>
            
            <!-- This button calls the function below when clicked -->
            <button class="btn-small" onclick="sendOrder('${product.name}', ${product.price})">
                Order via WhatsApp
            </button>
        </div>
    `;
    container.innerHTML += card;
});

function sendOrder(name, price) {
    // We add the item name clearly so she knows exactly which one it is
    const message = `ORDER ALERT! 🛒\nItem: ${name}\nPrice: $${price}\n\nI want to buy Is this still available please?`;
    
    const whatsappUrl = `https://wa.me/233540252006?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}





function orderViaWhatsApp(itemName, itemPrice) {
    const message = `Hello! I would like to order the ${itemName} for $${itemPrice}. Is it still available?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/233540252006?text=${encodedMessage}`;
    
    // This opens the WhatsApp link in a new tab
    window.open(whatsappUrl, '_blank');
}

// Function for Search Bar
function filterCategory(category) {
    const cards = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.btn-filter');
    
    // Update button highlighting
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase() === category.toLowerCase()) {
            btn.classList.add('active');
        }
    });

    // Show/Hide cards based on category text
    cards.forEach(card => {
        const cardText = card.innerText.toLowerCase();
        if (category === 'all' || cardText.includes(category.toLowerCase())) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

function filterProducts() {
    const searchValue = document.getElementById('product-search').value.toLowerCase();
    const cards = document.querySelectorAll('.project-card');
    const noResults = document.getElementById('no-results');
    
    let visibleCount = 0; // Keep track of matches

    cards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        
        if (title.includes(searchValue)) {
            card.style.display = "block";
            visibleCount++; // Found one!
        } else {
            card.style.display = "none";
        }
    });

    // If no products match, show the "No Results" message
    if (visibleCount === 0) {
        noResults.style.display = "block";
    } else {
        noResults.style.display = "none";
    }
}


