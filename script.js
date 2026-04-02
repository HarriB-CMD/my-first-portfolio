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



const btn = document.getElementById('mode-toggle');

btn.addEventListener('click', function() {
    // This "toggles" the dark-mode class on the body tag
    document.body.classList.toggle('dark-mode');
});

const container = document.getElementById('product-container');

products.forEach(product => {
    // Create the HTML for each product card
    const card = `
        <div class="project-card">
            <img src="${product.img}" style="width:100%; border-radius: 8px;">
            <h3>${product.name}</h3>
            <p>Category: ${product.category}</p>
            <p><strong>$${product.price}</strong></p>
            <button class="btn-small" onclick="alert('Added to cart!')">Add to Cart</button>
        </div>
    `;
    // Put it inside the container
    container.innerHTML += card;
});
