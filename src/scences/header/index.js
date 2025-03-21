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
    // ✅ Update user data from localStorage dynamically
    const updateUserData = () => {
      const storedToken = localStorage.getItem('token');
      const storedId = localStorage.getItem('id');
      setToken(storedToken);
      setId(storedId);

      // ✅ If the user exists but not in context, update it
      if (!user && storedId) {
        setUser({ id: storedId });
      }
    };

    updateUserData();

    // ✅ Update cart count from localStorage
    const updateCartCount = () => {
      const storedCartItems = JSON.parse(localStorage.getItem('panier')) || [];
      setCartCount(storedCartItems.length);
    };

    updateCartCount();
    const intervalId = setInterval(updateCartCount, 1000);

    // ✅ Handle Scroll Hide/Show
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
    if (token) {
      navigate(`/userprofile/${id}`);
    } else {
      navigate('/login');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    setUser(null);
    setToken(null);
    setId(null);
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuOpen = (event) => {
    if (user?.email) {
      setAnchorEl(event.currentTarget);
    }
    else {
      navigate('/login');
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <header id="main-header" className={`transparent-header ${visible ? '' : 'hidden'}`}>
      <div className="header-container">
        <img src={logo} alt="Glowy Skin Care Logo" className="logo" />
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
              {token ? (
                user?.id ? (
                  <>
                    <Button onClick={handleMenuOpen}>
                      <AccountCircleIcon />
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={() => { handleMenuClose(); navigate(`/userprofile/${id}`); }}>
                        Mon Profil
                      </MenuItem>
                      <MenuItem onClick={logout}>Déconnexion</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Button onClick={checkLogin}>
                    <AccountCircleIcon />
                  </Button>
                )
              ) : (
                <Button onClick={checkLogin}>
                  <AccountCircleIcon />
                </Button>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
