import React, { useState, useEffect } from 'react';
import './home.css';
import { Box } from '@mui/material';
import backgroundVideo from './background2.mp4';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function HomePage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/produit');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  const handleAddToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem('panier')) || [];
    const existingItem = cartItems.find(item => item.productId === product.id);

    if (existingItem) {
      // If the item already exists in the cart, just update its quantity
      existingItem.quantity += 1;
    } else {
      // If it's a new item, add it to the cart with a quantity of 1
      const newCartItem = {
        cartItemId: Date.now(),
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.images.length > 0 ? product.images[0].filepath : '',
        quantity: 1,  // Initialize the quantity property
      };

      cartItems.push(newCartItem);
    }

    localStorage.setItem('panier', JSON.stringify(cartItems));

    toast.success('Product added to cart successfully!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const handleProductClick = (productId) => {
    navigate(`/productdetail/${productId}`); // Navigate to the product detail page
  };
  return (
    <div>
      <main>
        <section id="home" className="banner">
          <Box sx={{ marginTop: '40px', '@media (min-width: 781px)': { marginTop: '-60px' } }}>
            <Box sx={{ position: 'relative', overflow: 'hidden', width: '100%', paddingBottom: '56.25%' }}>
              <video autoPlay muted loop style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: 'auto', objectFit: 'cover', '@media (max-width: 480px)': { width: '80%', objectFit: 'contain' } }}>
                <source src={backgroundVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
          </Box>
        </section>

        <section id="shop" className="shop-section">
          {products.map((product, index) => (
            <div key={index} className="item-container" onClick={() => handleProductClick(product.id)}>
              <div className="item">
                <img src={product.images[0].filepath ? product.images[0].filepath : ''} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="price">Prix: {product.price} DT</p>
                <button onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }} className="add-to-cart-btn">Ajouter au panier</button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default HomePage;
