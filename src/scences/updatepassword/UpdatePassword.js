import React, { useState, useContext, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../components/firebase-config';
import UserContext from '../../contexts/UserContext'; // Import the UserContext
import { useParams } from 'react-router-dom'
import axios from 'axios';
import './confirmation.css'
import { API_BASE_URL } from '../../../config';
const UpdatePassword = () => {
  const { user } = useContext(UserContext); // Use the user data from UserContext
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken]= useState();
  const [id , setId]=useState();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    setId(id);
    setToken(token);
  }, [token]);
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Le nouveau mot de passe et la confirmation ne correspondent pas.');
      return;
    }
      try {
        const res = await axios.put(
          `${API_BASE_URL}/user/updatePasssword/${id}`,
          { oldPassword, newPassword }, // Sending the current and new password in the request body
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { message } = res.data;
        if (message === "Password updated successfully") {
          toast.success('Mot de passe mis à jour avec succès!');
        } else if (message === "User not found") {
          toast.error("Utilisateur n'existe pas");
        } else if (message === "Current password is incorrect") {
          toast.error('Le mot de passe actuel est incorrect');
        } else {
          toast.error('Une erreur s\'est produite lors de la mise à jour du mot de passe');
        }
      } catch (error) {
        console.error('Error updating user password:', error);
        toast.error('Erreur lors de la mise à jour du mot de passe.');
      }
   
  };

  return (
    <div className="content-container">
    <Container maxWidth="sm" sx={{ marginTop: '100px' }}>
      <Typography variant="h4" gutterBottom>
        Modifier le mot de passe
      </Typography>
      <form onSubmit={handleChangePassword}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type="password"
              label="Ancien mot de passe"
              fullWidth
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              label="Nouveau mot de passe"
              fullWidth
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              label="Confirmer le nouveau mot de passe"
              fullWidth
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Mettre à jour
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
    </div>
  );
};

export default UpdatePassword;
