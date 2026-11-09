import { useNavigate } from 'react-router-dom';
import { Box, Button, Divider, Drawer, IconButton, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useCart } from '../context/CartContext';
import { formatPrice, mainImage } from '../utils/format';
import QuantityPicker from './QuantityPicker';

export function CartLine({ line, compact }) {
  const { setQuantity, remove } = useCart();
  const { product, quantity } = line;
  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ py: 1.5 }}>
      <Box component="img" src={mainImage(product)} alt={product.name} sx={{ width: compact ? 64 : 88, height: compact ? 64 : 88, objectFit: 'contain', bgcolor: '#fff', borderRadius: '10px', border: '1px solid', borderColor: 'divider', flexShrink: 0 }} />
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography sx={{ fontWeight: 600 }} noWrap>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatPrice(product.price)}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
          <QuantityPicker size="small" value={quantity} max={product.volume} onChange={(q) => setQuantity(product.id, q)} />
          <IconButton size="small" onClick={() => remove(product.id)} aria-label={`Retirer ${product.name}`}>
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>
      <Typography sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{formatPrice(product.price * quantity)}</Typography>
    </Stack>
  );
}

export default function CartDrawer() {
  const { lines, subtotal, drawerOpen, setDrawerOpen } = useCart();
  const navigate = useNavigate();
  const go = (path) => {
    setDrawerOpen(false);
    navigate(path);
  };

  return (
    <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ sx: { width: { xs: '100%', sm: 420 }, borderRadius: 0 } }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2.5 }}>
        <Typography variant="h6">Votre panier</Typography>
        <IconButton onClick={() => setDrawerOpen(false)} aria-label="Fermer">
          <CloseIcon />
        </IconButton>
      </Stack>
      <Divider />
      {lines.length === 0 ? (
        <Stack alignItems="center" justifyContent="center" spacing={2} sx={{ flexGrow: 1, p: 4, textAlign: 'center' }}>
          <ShoppingBagOutlinedIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
          <Typography color="text.secondary">Votre panier est vide.</Typography>
          <Button variant="outlined" onClick={() => go('/boutique')}>
            Découvrir la boutique
          </Button>
        </Stack>
      ) : (
        <>
          <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 2.5 }}>
            {lines.map((l) => (
              <CartLine key={l.productId} line={l} compact />
            ))}
          </Box>
          <Box sx={{ p: 2.5, borderTop: '1px solid', borderColor: 'divider' }}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
              <Typography>Sous-total</Typography>
              <Typography sx={{ fontWeight: 700 }}>{formatPrice(subtotal)}</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Livraison calculée à l&apos;étape suivante · paiement à la livraison
            </Typography>
            <Button fullWidth size="large" variant="contained" onClick={() => go('/commande')}>
              Commander
            </Button>
            <Button fullWidth sx={{ mt: 1 }} onClick={() => go('/panier')}>
              Voir le panier
            </Button>
          </Box>
        </>
      )}
    </Drawer>
  );
}
