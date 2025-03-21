import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid, Container, CardActions, CardMedia, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './confirmation.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('panier')) || [];
    setCartItems(storedCartItems);

    // ✅ Redirect to /boutique if cart is empty
    if (storedCartItems.length === 0) {
      toast.info('Votre panier est vide.');
      setTimeout(() => {
        navigate('/boutique');
      }, 1500);
    }
  }, [navigate]);

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0).toFixed(2);
  };

  const handleDelete = (cartItemId) => {
    const updatedCartItems = cartItems.filter(item => item.cartItemId !== cartItemId);
    setCartItems(updatedCartItems);
    localStorage.setItem('panier', JSON.stringify(updatedCartItems));

    toast.success('Article supprimé avec succès !');

    // ✅ Redirect to /boutique if cart is empty after deletion
    if (updatedCartItems.length === 0) {
      setTimeout(() => {
        navigate('/boutique');
      }, 1000);
    }
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.cartItemId === cartItemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem('panier', JSON.stringify(updatedCartItems));
  };

  const handleIncreaseQuantity = (cartItemId) => {
    const item = cartItems.find(item => item.cartItemId === cartItemId);
    if (item) {
      updateQuantity(cartItemId, item.quantity + 1);
    }
  };

  const handleDecreaseQuantity = (cartItemId) => {
    const item = cartItems.find(item => item.cartItemId === cartItemId);
    if (item && item.quantity > 1) {
      updateQuantity(cartItemId, item.quantity - 1);
    }
  };

  if (cartItems.length === 0) {
    return null; // Prevent rendering empty UI while redirecting
  }

  return (
    <div className="content-container">
      <Container sx={{ marginTop: '100px', marginBottom: '100px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {cartItems.map(item => (
              <Card key={item.cartItemId} sx={{ display: 'flex', marginBottom: '20px', elevation: 3 }}>
                <CardContent sx={{ flex: '1 0 auto', padding: '16px' }}>
                  <Typography variant="h6" gutterBottom>{item.name}</Typography>
                  <Typography variant="body1" color="textSecondary">Prix : {item.price} DT</Typography>
                  <Typography variant="body1" color="textSecondary">Quantité : {item.quantity}</Typography>
                  <CardActions>
                    <IconButton onClick={() => handleIncreaseQuantity(item.cartItemId)} color="primary">
                      <AddIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDecreaseQuantity(item.cartItemId)} color="primary">
                      <RemoveIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item.cartItemId)} color="error">
                      <DeleteIcon />
                      Supprimer
                    </IconButton>
                  </CardActions>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{ width: 151, height: 151, objectFit: 'cover' }}
                  image={item.imageUrl}
                  alt={item.name}
                />
              </Card>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ padding: '16px', elevation: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>Résumé du panier</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <Typography variant="body1">Sous-total :</Typography>
                  <Typography variant="body1">{calculateSubtotal()} DT</Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => navigate('/commande')}
                >
                  Passer à la caisse
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Cart;
