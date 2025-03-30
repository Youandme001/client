import React, { useState, useEffect } from 'react';
import './home.css';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import backgroundImage from './Background.jpg'; // Add your static image here

function HomePage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/produit`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
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

  return (
    <div>
      <main style={{ margin: 0, padding: 0 }}>
      <section 
          id="home" 
          className="responsive-banner"
        >
          {/* <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> */}
            {/* You can put a title or tagline here if you want */}
          {/* </Box> */}
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
            <p className="no-products">Aucun produit disponible</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default HomePage;
