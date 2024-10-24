import React, { useState, useEffect } from 'react';
import './BoutiquePage.css';
 // Assuming home.css contains the styles for the product cards
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function BoutiquePage() {
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
    <div className="boutique-page">
      <div className="products-grid">
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
      </div>
    </div>
  );
}

export default BoutiquePage;
