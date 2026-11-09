import { useState } from 'react';
import { Link as RouterLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Alert, Button, CircularProgress, Grid, Link, Stack, TextField, Typography } from '@mui/material';
import { errorMessage } from '../api/client';
import { useAuth } from '../context/AuthContext';
import AddressFields, { EMPTY_ADDRESS, validateAddress } from '../components/AddressFields';
import { AuthCard } from './Login';

export default function Register() {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [address, setAddress] = useState(EMPTY_ADDRESS);
  const [account, setAccount] = useState({ email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to={state?.from || '/compte'} replace />;

  const submit = async (e) => {
    e.preventDefault();
    const found = validateAddress(address);
    if (!/^\S+@\S+\.\S+$/.test(account.email)) found.email = 'E-mail invalide';
    if (account.password.length < 8) found.password = '8 caractères minimum';
    if (account.confirm !== account.password) found.confirm = 'Les mots de passe ne correspondent pas';
    setErrors(found);
    if (Object.keys(found).length) return;

    setBusy(true);
    setError('');
    try {
      await register({ ...address, email: account.email.trim(), password: account.password });
      navigate(state?.from || '/compte');
    } catch (err) {
      setError(errorMessage(err));
      setBusy(false);
    }
  };

  const accountField = (name, label, props) => (
    <TextField
      label={label}
      value={account[name]}
      onChange={(e) => setAccount({ ...account, [name]: e.target.value })}
      error={Boolean(errors[name])}
      helperText={errors[name]}
      {...props}
    />
  );

  return (
    <AuthCard title="Créer un compte" subtitle="Votre adresse sera pré-remplie à chaque commande.">
      <Stack component="form" spacing={3} onSubmit={submit} noValidate>
        {error && <Alert severity="error">{error}</Alert>}
        <AddressFields value={address} onChange={setAddress} errors={errors} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {accountField('email', 'Adresse e-mail', { type: 'email', autoComplete: 'email' })}
          </Grid>
          <Grid item xs={12} sm={6}>
            {accountField('password', 'Mot de passe', { type: 'password', autoComplete: 'new-password' })}
          </Grid>
          <Grid item xs={12} sm={6}>
            {accountField('confirm', 'Confirmer', { type: 'password', autoComplete: 'new-password' })}
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" size="large" disabled={busy}>
          {busy ? <CircularProgress size={22} color="inherit" /> : 'Créer mon compte'}
        </Button>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Déjà cliente ?{' '}
          <Link component={RouterLink} to="/connexion" state={state} color="secondary">
            Se connecter
          </Link>
        </Typography>
      </Stack>
    </AuthCard>
  );
}
