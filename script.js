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

// 4. This is the logic that opens WhatsApp
function sendOrder(name, price) {
    const message = `Hello, I want to buy the ${name} for $${price}. Is it available?`;
    const whatsappUrl = `https://wa.me{sisterPhone}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

function orderViaWhatsApp(itemName, itemPrice) {
    const message = `Hello! I would like to order the ${itemName} for $${itemPrice}. Is it still available?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me{phoneNumber}?text=${encodedMessage}`;
    
    // This opens the WhatsApp link in a new tab
    window.open(whatsappUrl, '_blank');
}

