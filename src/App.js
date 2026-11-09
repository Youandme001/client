import { useEffect } from 'react';
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmed from './pages/OrderConfirmed';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import About from './pages/About';
import NotFound from './pages/NotFound';

function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <Footer />
      <CartDrawer />
    </Box>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <CartProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="boutique" element={<Shop />} />
                <Route path="produit/:id" element={<ProductDetail />} />
                <Route path="panier" element={<Cart />} />
                <Route path="commande" element={<Checkout />} />
                <Route path="commande/confirmee" element={<OrderConfirmed />} />
                <Route path="connexion" element={<Login />} />
                <Route path="inscription" element={<Register />} />
                <Route path="compte" element={<Account />} />
                <Route path="a-propos" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </CartProvider>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
