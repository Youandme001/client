import React, { useState, useEffect } from 'react';
import './BoutiquePage.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import {
  CContainer,
  CRow,
  CCol,
  CInputGroup,
  CFormSelect,
  CFormInput
} from '@coreui/react';

function BoutiquePage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchName, setSearchName] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productResponse, categoryResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/produit`),
          fetch(`${API_BASE_URL}/categories`)
        ]);

        if (!productResponse.ok || !categoryResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const productData = await productResponse.json();
        const categoryData = await categoryResponse.json();

        const availableProducts = productData.data.filter(product => product.volume > 0);

        setProducts(availableProducts);
        setFilteredProducts(availableProducts);
        setCategories(categoryData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(product => product.Category?.id === parseInt(selectedCategory));
    }

    if (searchName) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchName, products]);

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
    <CContainer className="mt-6">
    <div className="filters-container">
      <CContainer fluid>
        <div className="filters-row">
          

          <CFormInput
            type="text"
            placeholder="🔍 Rechercher par nom"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="filter-input"
          />
          <CFormSelect
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-input"
          >
            <option value="">Toutes les catégories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </CFormSelect>
        </div>
      </CContainer>
    </div>



  
    <div className="products-grid">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
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
    </div>
  </CContainer>
  
  );
}

export default BoutiquePage;