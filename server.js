const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Sample products data
const products = [
    {
        id: 1,
        name: "Classic Leather Watch",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500",
        description: "Elegant timepiece with genuine leather strap"
    },
    {
        id: 2,
        name: "Premium Silk Tie",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1589756823695-278bc923f962?w=500",
        description: "100% silk tie in deep navy"
    },
    {
        id: 3,
        name: "Leather Briefcase",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500",
        description: "Handcrafted genuine leather business briefcase"
    }
];

// In-memory cart
let cart = [];

// Get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Get cart items
app.get('/api/cart', (req, res) => {
    res.json(cart);
});

// Add to cart
app.post('/api/cart', (req, res) => {
    const { productId } = req.body;
    const product = products.find(p => p.id === productId);
    
    if (product) {
        cart.push(product);
        res.json({ success: true, cart });
    } else {
        res.status(404).json({ success: false, message: 'Product not found' });
    }
});

// Remove from cart
app.delete('/api/cart/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    cart = cart.filter(item => item.id !== productId);
    res.json({ success: true, cart });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});