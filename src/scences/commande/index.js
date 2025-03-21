import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, CardActions, IconButton, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { toast } from 'react-toastify';
import UserContext from '../../contexts/UserContext';
import axios from 'axios';
import './confirmation.css';

const Commande = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('panier')) || [];
    setCartItems(storedCartItems);

    // ✅ Get userId from context first, then fallback to localStorage
    const storedToken = localStorage.getItem('token');
    const storedId = localStorage.getItem('id');

    if (user?.id) {
      setUserId(user.id);
      setToken(storedToken);
    } else if (storedId) {
      setUserId(storedId);
      setToken(storedToken);
    } else {
      // ✅ Delay redirect to avoid immediate loop
      setTimeout(() => {
        // toast.error('Veuillez vous connecter pour passer une commande.');
        navigate('/detailsComnde');
      }, 0);
    }

    setLoading(false);
  }, [user, navigate]);

  const calculateTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0).toFixed(2);
  };

  const getFormattedDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 19).replace("T", " ");
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
        }, 0);
      }
    };
  const handleSubmit = async () => {
    if (!userId) {
      toast.error('Veuillez vous connecter pour passer une commande.');
      navigate('/detailsComnde');
      return;
    }

    try {
      const commandeData = {
        userId,
        state: "Pending",
        products: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        totalPrice: calculateTotalPrice(),
        commandeDate: getFormattedDateTime(),
      };

      console.log(token);
      const res = await axios.post('http://localhost:4000/commande/create', commandeData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        if (res.data.message === "Unauthorized: Access token is required") {
          navigate('/logincommande');
        } else {
          localStorage.removeItem('panier');
          if (!user?.email) {
            localStorage.removeItem('id');
            localStorage.removeItem('token');
          }
          toast.success('Commande soumise avec succès!');
          navigate('/confirmation');
        }
      } else {
        navigate('/logincommande');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      navigate('/detailsComnde');
      // toast.error('Erreur lors de la soumission de la commande.');
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
  if (loading) return <div>Chargement...</div>;

  return (
    <div className="content-container">
      <Container maxWidth="sm" sx={{ marginTop: '100px', marginBottom: '100px' }}>
        <Typography variant="h4" gutterBottom>
          Récapitulatif de la commande
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
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
              <Grid item xs={12}>
            <Typography variant="body1">Total des produits: {calculateTotalPrice()} DT</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button type="button" variant="contained" color="primary" fullWidth onClick={handleSubmit}>
              Soumettre la commande
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Commande;
