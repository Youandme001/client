import React, { useState, useContext } from 'react';
import { Container, Typography, TextField, Button, Grid, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'; 
import UserContext from '../../contexts/UserContext'; // Import the UserContext
import './confirmation.css' // Import the CSS for styling
import { API_BASE_URL } from '../../../config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext); // Use the setUser function from UserContext
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.post(`${API_BASE_URL}/user/login`, { email, password })
        .then(res => {
          const { token, message, user } = res.data;
          if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('id', user.id);
            toast.success('Connexion réussie!');
            setUser({ id: user.id, ...user });
            navigate(`/userprofile/${user.id}`);
          } else {
            toast.error(message || 'Erreur de connexion. Veuillez réessayer.');
          }
        })
        .catch(error => {
          console.error('Error logging in:', error);
          toast.error('Erreur de connexion. Veuillez réessayer.');
        });
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Erreur lors de la connexion.');
    }
  };

  return (
    <div className="login-container">
      <Container maxWidth="sm" className="login-form-container">
        <Typography variant="h4" gutterBottom className="login-title">
          Connexion
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                label="Mot de passe"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" className="login-button">
                Se connecter
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" className="signup-link">
                Pas de compte ?{' '}
                <Link href="#" onClick={() => navigate('/signup')} underline="hover">
                  Créer mon compte
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default Login;
