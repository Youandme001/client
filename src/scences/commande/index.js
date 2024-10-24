import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserContext from '../../contexts/UserContext';
import axios from 'axios';
import './confirmation.css'
const Commande = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [id , setId]= useState();
  const [token, setToken]= useState();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('panier')) || [];
    const token = localStorage.getItem('token');
    setToken(token);
    const id =localStorage.getItem('id');
    setId(id);
    setCartItems(storedCartItems);
  }, []);

  const calculateTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0).toFixed(2);
  };
  
  
  const getFormattedDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  const handleSubmit = async () => {
      if (!id) {
      toast.error('Veuillez vous connecter pour passer une commande.');
      navigate('/logincommande');
      return;
     }

    try {
      const commandeData = {
        userId: id,
        state:"Pending",
        products: cartItems.map((item) => ({ productId: item.productId, quantity: item.quantity })),
        totalPrice: calculateTotalPrice(),
        commandeDate : getFormattedDateTime(),
      };
      console.log(commandeData);
      const res = await axios.post('http://localhost:4000/commande/create', commandeData,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); // Replace 'your-api-url' with your actual API endpoint
      
      if (res.status === 201) {
        if(res.data.message=="Unauthorized: Access token is required"){
          navigate('/logincommande');
        }
        else{
          localStorage.removeItem('panier');
          toast.success('Commande soumise avec succès!');
          navigate('/confirmation');
        }
       
      } else {
        // toast.error('Erreur lors de la soumission de la commande.');
        navigate('/logincommande');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error('Erreur lors de la soumission de la commande.');
    }
  };

  return (
    <div className="content-container">
    <Container maxWidth="sm" sx={{ marginTop: '100px' }}>
      <Typography variant="h4" gutterBottom>
        Récapitulatif de la commande
      </Typography>
      <Grid container spacing={2}>
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