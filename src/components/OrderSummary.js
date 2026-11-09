import { Box, Divider, Stack, Typography } from '@mui/material';
import { useCart } from '../context/CartContext';
import { formatPrice, mainImage } from '../utils/format';

export default function OrderSummary({ showLines = true, children }) {
  const { lines, subtotal, shipping, total } = useCart();
  return (
    <Box sx={{ bgcolor: '#fff', border: '1px solid', borderColor: 'divider', borderRadius: '20px', p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Récapitulatif
      </Typography>
      {showLines &&
        lines.map((l) => (
          <Stack key={l.productId} direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
            <Box sx={{ position: 'relative' }}>
              <Box component="img" src={mainImage(l.product)} alt="" sx={{ width: 52, height: 52, objectFit: 'contain', borderRadius: '10px', border: '1px solid', borderColor: 'divider' }} />
              <Box sx={{ position: 'absolute', top: -6, right: -6, bgcolor: 'primary.main', color: '#fff', borderRadius: 999, minWidth: 20, height: 20, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', px: 0.5 }}>
                {l.quantity}
              </Box>
            </Box>
            <Typography variant="body2" sx={{ flexGrow: 1 }}>
              {l.product.name}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {formatPrice(l.product.price * l.quantity)}
            </Typography>
          </Stack>
        ))}
      {showLines && <Divider sx={{ my: 2 }} />}
      <Stack spacing={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography color="text.secondary">Sous-total</Typography>
          <Typography>{formatPrice(subtotal)}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography color="text.secondary">Livraison</Typography>
          <Typography>{formatPrice(shipping)}</Typography>
        </Stack>
        <Divider />
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ fontWeight: 700 }}>Total</Typography>
          <Typography sx={{ fontWeight: 700, fontSize: '1.2rem' }}>{formatPrice(total)}</Typography>
        </Stack>
        <Typography variant="caption" color="text.secondary">
          À régler en espèces à la livraison.
        </Typography>
      </Stack>
      {children}
    </Box>
  );
}
