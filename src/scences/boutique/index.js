import React, { useState, useEffect } from 'react';
import './BoutiquePage.css'; // Ensure CSS is properly imported
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../config';

function BoutiquePage() {
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
    navigate(`/productdetail/${productId}`); // Navigate to the product detail page
  };

  return (
    <div className="boutique-page">
      <div className="products-grid">
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
      </div>
    </div>
  );
}

export default BoutiquePage;
