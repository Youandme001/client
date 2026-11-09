import { Link as RouterLink, Navigate, useLocation } from 'react-router-dom';
import { Box, Button, Container, Divider, Stack, Typography } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/format';

export default function OrderConfirmed() {
  const { state } = useLocation();
  const { user } = useAuth();
  const order = state?.order;
  if (!order) return <Navigate to="/" replace />;

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 6, md: 10 } }}>
      <Box sx={{ bgcolor: '#fff', border: '1px solid', borderColor: 'divider', borderRadius: '24px', p: { xs: 3, md: 5 }, textAlign: 'center' }}>
        <CheckCircleRoundedIcon sx={{ fontSize: 64, color: 'success.main' }} />
        <Typography variant="h3" sx={{ fontSize: '2.2rem', mt: 2 }}>
          Merci {order.user?.firstName} !
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>
          Votre commande n° {order.id} est enregistrée. Nous vous appelons au {order.user?.phone} pour la confirmer avant l&apos;envoi.
        </Typography>
        <Box sx={{ textAlign: 'left' }}>
          {order.products.map((p) => (
            <Stack key={p.id} direction="row" justifyContent="space-between" sx={{ py: 0.75 }}>
              <Typography>
                {p.name} × {p.quantity}
              </Typography>
              <Typography>{formatPrice(p.price * p.quantity)}</Typography>
            </Stack>
          ))}
          <Stack direction="row" justifyContent="space-between" sx={{ py: 0.75, color: 'text.secondary' }}>
            <Typography>Livraison</Typography>
            <Typography>{formatPrice(order.shippingFee)}</Typography>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Stack direction="row" justifyContent="space-between">
            <Typography sx={{ fontWeight: 700 }}>Total à payer à la livraison</Typography>
            <Typography sx={{ fontWeight: 700 }}>{formatPrice(order.totalPrice)}</Typography>
          </Stack>
        </Box>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mt: 5 }}>
          <Button component={RouterLink} to="/boutique" variant="contained">
            Continuer mes achats
          </Button>
          {user ? (
            <Button component={RouterLink} to="/compte" variant="outlined">
              Suivre mes commandes
            </Button>
          ) : (
            <Button component={RouterLink} to="/inscription" variant="outlined">
              Créer un compte
            </Button>
          )}
        </Stack>
      </Box>
    </Container>
  );
}
