// ✅ Header.js (Fully updated version to match your layout in desktop and mobile)

import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../components/img/logo.png';
import './Header.css';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import { Badge, Button, Menu, MenuItem } from '@mui/material';
import UserContext from '../../contexts/UserContext';

const Header = () => {
  const [visible, setVisible] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [id, setId] = useState(localStorage.getItem('id'));
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const updateUserData = () => {
      const storedToken = localStorage.getItem('token');
      const storedId = localStorage.getItem('id');
      setToken(storedToken);
      setId(storedId);
      if (!user && storedId) setUser({ id: storedId });
    };
    updateUserData();

    const updateCartCount = () => {
      const storedCartItems = JSON.parse(localStorage.getItem('panier')) || [];
      setCartCount(storedCartItems.length);
    };
    updateCartCount();
    const intervalId = setInterval(updateCartCount, 1000);

    let lastScrollY = window.pageYOffset;
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      setVisible(currentScrollY === 0 || currentScrollY < lastScrollY);
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(intervalId);
    };
  }, [user, setUser]);

  const checkLogin = () => {
    token ? navigate(`/userprofile/${id}`) : navigate('/login');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    setUser(null);
    setToken(null);
    setId(null);
    navigate('/');
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleMenuOpen = (event) => {
    if (user?.email) setAnchorEl(event.currentTarget);
    else navigate('/login');
  };
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <header id="main-header" className={`transparent-header ${visible ? '' : 'hidden'}`}>
      <div className="header-container">
        <img src={logo} alt="Logo" className="logo" />

        <nav className="nav-wrapper">
          <ul className={`nav-menu ${menuOpen ? 'open' : ''}`}>
            <li><Link to="/" onClick={toggleMenu}>ACCUEIL</Link></li>
            <li><Link to="/about" onClick={toggleMenu}>À PROPOS</Link></li>
            <li><Link to="/boutique" onClick={toggleMenu}>BOUTIQUE</Link></li>
            <li><a href="https://wa.me/21655037733" target="_blank" rel="noopener noreferrer" onClick={toggleMenu}>CONTACTEZ-NOUS</a></li>
            {/* <li className="mobile-only"> */}
              <Button onClick={checkLogin}><AccountCircleIcon /></Button>
            {/* </li> */}
          </ul>
        </nav>

        <div className="header-icons">
          <Link to="/cart" className="icon-link">
            <Badge badgeContent={cartCount} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </Link>
          {/* <Button onClick={handleMenuOpen} className="icon-link">
            <AccountCircleIcon />
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={() => { handleMenuClose(); navigate(`/userprofile/${id}`); }}>Mon Profil</MenuItem>
            <MenuItem onClick={logout}>Déconnexion</MenuItem>
          </Menu> */}
          <button id="menu-toggle" className="menu-toggle" onClick={toggleMenu}>
            <MenuIcon />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
