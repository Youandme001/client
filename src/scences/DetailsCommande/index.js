import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, TextField, Button, Grid, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import UserContext from '../../contexts/UserContext'; // Import the UserContext
import './confirmation.css'
import { LastPage, LastPageRounded } from '@material-ui/icons';
import { API_BASE_URL } from '../../config';
const DetailsCommande =()=> {
    const { user, setUser } = useContext(UserContext); // Use the user data and setUser function from UserContext
      const navigate = useNavigate();
      const [userData, setUserData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        address: user?.address || '',
        city: user?.city || '',
        postalCode: user?.postalCode || '',
        phone: user?.phone || '',
        gouvernorat: user?.gouvernorat || '',
      });
    
      const gouvernorats = [
        'Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'Gabès', 'Gafsa', 'Jendouba', 'Kairouan',
        'Kasserine', 'Kébili', 'Kef', 'Mahdia', 'Manouba', 'Médenine', 'Monastir', 'Nabeul',
        'Sfax', 'Sidi Bouzid', 'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'
      ];
      const [token, setToken]= useState();
      const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
      };
    
      const handleUpdate = async (e) => {
        e.preventDefault();
      
        try {
          console.log(userData);
          const res = await axios.post(`${API_BASE_URL}/user/create1`, userData);
      
          const { user: newUser, token } = res.data;
      
          if (newUser) {
            setUser({ id: newUser.id, ...newUser }); // ✅ Properly update UserContext
            localStorage.setItem('id', newUser.id);
            localStorage.setItem('token', token);
            console.log("User saved in context:", newUser);
            navigate('/commande');
          } else {
            // toast.error('Erreur lors de la mise à jour des informations.');
          }
        } catch (error) {
          console.error('Error updating user information:', error);
          // toast.error('Erreur lors de la mise à jour des informations.');
        }
      };
      return (
        <div className="content-container">
            <Container maxWidth="sm" sx={{ marginTop: '100px' , marginBottom: '100px'}}>
                <Typography variant="h4" gutterBottom>
                Veuillez saisir vos informations
                </Typography>
                <form onSubmit={handleUpdate}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nom"
                                name="firstName"
                                fullWidth
                                required
                                value={userData.firstName}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Prénom"
                                name="lastName"
                                fullWidth
                                required
                                value={userData.lastName}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Adresse"
                                name="address"
                                fullWidth
                                required
                                value={userData.address}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                select
                                label="Gouvernorat"
                                name="gouvernorat"
                                fullWidth
                                required
                                value={userData.gouvernorat}
                                onChange={handleChange}
                            >
                                {gouvernorats.map((gouvernorat) => (
                                    <MenuItem key={gouvernorat} value={gouvernorat}>
                                        {gouvernorat}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Ville"
                                name="city"
                                fullWidth
                                required
                                value={userData.city}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Code postal"
                                name="postalCode"
                                fullWidth
                                required
                                value={userData.postalCode}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                type="tel"
                                label="Numéro de téléphone"
                                name="phone"
                                fullWidth
                                required
                                value={userData.phone}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Valider et mettre à jour
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div>
    );
}
export default DetailsCommande;