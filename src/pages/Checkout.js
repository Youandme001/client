import { useEffect, useState } from 'react';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
import { Alert, Box, Button, CircularProgress, Container, Grid, Link, Typography } from '@mui/material';
import { accountApi, orderApi } from '../api';
import { errorMessage } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import AddressFields, { EMPTY_ADDRESS, validateAddress } from '../components/AddressFields';
import OrderSummary from '../components/OrderSummary';

const pickAddress = (user) => Object.fromEntries(Object.keys(EMPTY_ADDRESS).map((k) => [k, user?.[k] || '']));

export default function Checkout() {
  const { user, updateUser } = useAuth();
  const { lines, loaded, clear, refreshProducts } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState(() => pickAddress(user));
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) setAddress(pickAddress(user));
  }, [user]);

  if (loaded && lines.length === 0 && !busy) return <Navigate to="/panier" replace />;

  const submit = async (e) => {
    e.preventDefault();
    const found = validateAddress(address);
    setErrors(found);
    if (Object.keys(found).length) return;

    setBusy(true);
    setError('');
    try {
      const products = lines.map((l) => ({ productId: l.productId, quantity: l.quantity }));
      let order;
      if (user) {
        // Keep the account address up to date with what was typed
        updateUser(await accountApi.update(user.id, address));
        order = await orderApi.create(products);
      } else {
        const { token } = await accountApi.guest(address);
        order = await orderApi.create(products, token);
      }
      clear();
      refreshProducts();
      navigate('/commande/confirmee', { state: { order } });
    } catch (err) {
      setError(errorMessage(err));
      setBusy(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 7 } }}>
      <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '3rem' }, mb: 1 }}>
        Livraison
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        {user ? (
          <>Vérifiez votre adresse, nous vous appelons pour confirmer la commande.</>
        ) : (
          <>
            Commandez sans créer de compte, ou{' '}
            <Link component={RouterLink} to="/connexion" state={{ from: '/commande' }} color="secondary">
              connectez-vous
            </Link>{' '}
            pour retrouver vos commandes.
          </>
        )}
      </Typography>
      <Grid container spacing={4} component="form" onSubmit={submit} noValidate>
        <Grid item xs={12} md={7}>
          <Box sx={{ bgcolor: '#fff', border: '1px solid', borderColor: 'divider', borderRadius: '20px', p: 3 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            <AddressFields value={address} onChange={setAddress} errors={errors} />
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <OrderSummary>
            <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 3 }} disabled={busy || !loaded}>
              {busy ? <CircularProgress size={22} color="inherit" /> : 'Confirmer la commande'}
            </Button>
          </OrderSummary>
        </Grid>
      </Grid>
    </Container>
  );
}
