import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useCart } from '../context/CartContext';
import { CartLine } from '../components/CartDrawer';
import OrderSummary from '../components/OrderSummary';

export default function Cart() {
  const { lines, loaded } = useCart();

  if (loaded && lines.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 12, textAlign: 'center' }}>
        <ShoppingBagOutlinedIcon sx={{ fontSize: 56, color: 'text.secondary' }} />
        <Typography variant="h4" sx={{ my: 2 }}>
          Votre panier est vide
        </Typography>
        <Button component={RouterLink} to="/boutique" variant="contained" size="large">
          Découvrir la boutique
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 7 } }}>
      <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '3rem' }, mb: 4 }}>
        Mon panier
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Box sx={{ bgcolor: '#fff', border: '1px solid', borderColor: 'divider', borderRadius: '20px', px: 3, py: 1 }}>
            {lines.map((l, i) => (
              <Box key={l.productId}>
                {i > 0 && <Divider />}
                <CartLine line={l} />
              </Box>
            ))}
          </Box>
          <Button component={RouterLink} to="/boutique" sx={{ mt: 2 }}>
            ← Continuer mes achats
          </Button>
        </Grid>
        <Grid item xs={12} md={5}>
          <OrderSummary showLines={false}>
            <Stack sx={{ mt: 3 }}>
              <Button component={RouterLink} to="/commande" variant="contained" size="large">
                Passer la commande
              </Button>
            </Stack>
          </OrderSummary>
        </Grid>
      </Grid>
    </Container>
  );
}
