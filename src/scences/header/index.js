import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../components/img/img.png';
import './Header.css';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import { Badge } from '@mui/material';

const Header = () => {
  const [visible, setVisible] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {

    const updateCartCount = () => {
      const storedCartItems = JSON.parse(localStorage.getItem('panier')) || [];
      setCartCount(storedCartItems.length);
    };

    const intervalId = setInterval(updateCartCount, 1000);

    updateCartCount(); 

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      const header = document.getElementById('main-header');
      if (header) {
        setVisible(currentScrollY === 0 || currentScrollY < lastScrollY);
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(intervalId);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  let lastScrollY = window.pageYOffset;

  return (
    <header id="main-header" className={`transparent-header ${visible ? '' : 'hidden'}`}>
      <div className="header-container">
        <img src={logo} alt="You & Me Skin Care Logo" className="logo" />
        <button id="menu-toggle" className="menu-toggle" onClick={toggleMenu}>
          <MenuIcon />
        </button>

        <nav>
          <ul className={`nav-menu ${menuOpen ? 'open' : ''}`}>
            <li><Link to="/" onClick={toggleMenu}>ACCUEIL</Link></li>
            <li><Link to="/about" onClick={toggleMenu}>À PROPOS</Link></li>
            <li><Link to="/boutique" onClick={toggleMenu}>BOUTIQUE</Link></li>
            <li><Link to="/contact" onClick={toggleMenu}>CONTACTEZ-NOUS</Link></li>
            <li>
              <Link to="/cart" onClick={toggleMenu} className="cart-icon">
                <Badge badgeContent={cartCount} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={toggleMenu}>
                <AccountCircleIcon />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
