import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Card, CardContent, Divider } from '@mui/material';
import axios from 'axios';
import './OrderHistory.css'; // Import the CSS for styling
import { API_BASE_URL } from '../../config';

const OrderHistory = () => {
  const [commandes, setCommandes] = useState([]);
  const [id, setId] = useState(localStorage.getItem('id'));
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/commande/userById/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { data } = res.data;
        setCommandes(data);
      } catch (error) {
        console.error('Error fetching user commands:', error);
      }
    };

    fetchCommandes();
  }, [id, token]);

  return (
    <div className="order-history-container">
      <Container maxWidth="md" className="order-history-content">
        <Typography variant="h4" gutterBottom className="order-history-title">
          Historique des commandes
        </Typography>
        <List>
          {commandes.map((commande) => (
            <Card key={commande.id} className="command-card">
              <CardContent>
                <ListItem>
                  <ListItemText
                    primary={`Commande ID: ${commande.id}`}
                    secondary={`Total: ${commande.totalPrice} DT - Date: ${new Date(
                      commande.commandeDate
                    ).toLocaleDateString()} - Statut: ${commande.state}`}
                  />
                </ListItem>
                <List>
                  {commande.products.map((product, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`Produit ID: ${product.id}`}
                        secondary={`Nom: ${product.name} - Quantité: ${product.quantity}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <Divider />
            </Card>
          ))}
        </List>
      </Container>
    </div>
  );
};

export default OrderHistory;
