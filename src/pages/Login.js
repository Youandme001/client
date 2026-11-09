import { useState } from 'react';
import { Link as RouterLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Alert, Box, Button, CircularProgress, Container, Link, Stack, TextField, Typography } from '@mui/material';
import { errorMessage } from '../api/client';
import { useAuth } from '../context/AuthContext';

export function AuthCard({ title, subtitle, children }) {
  return (
    <Container maxWidth="sm" sx={{ py: { xs: 6, md: 10 } }}>
      <Box sx={{ bgcolor: '#fff', border: '1px solid', borderColor: 'divider', borderRadius: '24px', p: { xs: 3, md: 5 } }}>
        <Typography variant="h3" sx={{ fontSize: '2.2rem' }}>
          {title}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>
          {subtitle}
        </Typography>
        {children}
      </Box>
    </Container>
  );
}

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to={state?.from || '/compte'} replace />;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await login(form.email.trim(), form.password);
      navigate(state?.from || '/compte');
    } catch (err) {
      setError(errorMessage(err));
      setBusy(false);
    }
  };

  return (
    <AuthCard title="Bon retour" subtitle="Connectez-vous pour suivre vos commandes et commander plus vite.">
      <Stack component="form" spacing={2.5} onSubmit={submit}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField label="Adresse e-mail" type="email" autoComplete="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <TextField label="Mot de passe" type="password" autoComplete="current-password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <Button type="submit" variant="contained" size="large" disabled={busy}>
          {busy ? <CircularProgress size={22} color="inherit" /> : 'Se connecter'}
        </Button>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Pas encore de compte ?{' '}
          <Link component={RouterLink} to="/inscription" state={state} color="secondary">
            Créer un compte
          </Link>
        </Typography>
      </Stack>
    </AuthCard>
  );
}
