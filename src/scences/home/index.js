import React, { useState, useEffect } from 'react';
import './home.css';
import { Box } from '@mui/material';
import backgroundVideo1 from './background1.mp4';
import backgroundVideo2 from './background2.mp4';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(backgroundVideo1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/produit`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();

        // ✅ Filter only products with volume > 0
        const availableProducts = data.data.filter(product => product.volume > 0);
        
        setProducts(availableProducts);
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
      existingItem.quantity += 1;
    } else {
      const newCartItem = {
        cartItemId: Date.now(),
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.images.length > 0 ? product.images[0].filepath : '',
        quantity: 1,
      };

      cartItems.push(newCartItem);
    }

    localStorage.setItem('panier', JSON.stringify(cartItems));

    toast.success('Produit ajouté au panier avec succès!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleProductClick = (productId) => {
    navigate(`/productdetail/${productId}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev === backgroundVideo1 ? backgroundVideo2 : backgroundVideo1));
    }, 15000); // Switch every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <main>
        <section id="home" className="banner">
          <Box sx={{ marginTop: '40px', '@media (min-width: 781px)': { marginTop: '-60px' } }}>
            <Box sx={{ position: 'relative', overflow: 'hidden', width: '100%', paddingBottom: '56.25%' }}>
              <video
                autoPlay
                muted
                key={currentVideo} // Ensures the video resets when switching
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                }}
              >
                <source src={currentVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
          </Box>
        </section>

        <section id="shop" className="shop-section">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="item-container" onClick={() => handleProductClick(product.id)}>
                <div className="item">
                  <img 
                    src={product.images.length > 0 ? product.images[0].filepath : 'default-image.jpg'} 
                    alt={product.name} 
                  />
                  <h3>{product.name}</h3>
                  <p className="price">Prix: {product.price} DT</p>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }} 
                    className="add-to-cart-btn"
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-products">Aucun produit disponible</p> // ✅ Message if no products available
          )}
        </section>
      </main>
    </div>
  );
}

export default HomePage;
