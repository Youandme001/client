import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './confirmation.css'
const Confirmation = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="content-container">
    <Container maxWidth="sm" sx={{ marginTop: '100px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Confirmation de la commande
      </Typography>
      <Typography variant="body1" gutterBottom>
        Votre commande a été soumise avec succès !
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoHome}>
        Retour à l'accueil
      </Button>
    </Container>
    </div>
  );
};

export default Confirmation;
