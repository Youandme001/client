import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import UserContext from '../../contexts/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import './confirmation.css'; // Import the CSS for styling

const UserProfile = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams(); //
  const [userData, setUserData] = useState(null);
  const [commandes, setCommandes] = useState([]);
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      navigate('/login'); // Redirect if not logged in
      return;
    }
    setToken(storedToken);
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/user/${user.id}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setUserData(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchCommandes = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/commande/userById/${user.id}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setCommandes(res.data.data);
      } catch (error) {
        console.error('Error fetching user commands:', error);
      }
    };

    fetchUserData();
    fetchCommandes();
  }, []); // ✅ Removed `id` from dependencies

  if (!userData) {
    return <div>Loading...</div>; // ✅ Prevents null property access
  }

  return (
    <div className="user-profile-container">
      <Container maxWidth="md" className="user-profile-content">
        <Card className="user-profile-card" elevation={3}>
          <CardContent>
            <Typography variant="h4" gutterBottom className="user-profile-title">
              Profil de l'utilisateur
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Prénom:</strong> {userData?.firstName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Nom de famille:</strong> {userData?.lastName}
                </Typography>
              </Grid>
              {userData?.email && (
                <Grid item xs={12}>
                  <Typography variant="body1">
                    <strong>Email:</strong> {userData.email}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" onClick={() => navigate(`/updateuser/${id}`)}>
              Mettre à jour les informations
            </Button>
          </CardActions>
        </Card>

        <Typography variant="h5" gutterBottom className="user-command-history-title">
          Historique des commandes
        </Typography>
        {commandes.length === 0 ? (
          <Typography>Aucune commande trouvée.</Typography>
        ) : (
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
                    {commande.products?.map((product, index) => (
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
        )}
      </Container>
    </div>
  );
};

export default UserProfile;
