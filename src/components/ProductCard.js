import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, CardActionArea, Chip, Stack, Typography } from '@mui/material';
import { useCart } from '../context/CartContext';
import { formatPrice, mainImage } from '../utils/format';

export default function ProductCard({ product }) {
  const { add } = useCart();
  const out = product.volume <= 0;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform .2s, box-shadow .2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 18px 40px -24px rgba(20,17,20,.35)' } }}>
      <CardActionArea component={RouterLink} to={`/produit/${product.id}`} sx={{ flexGrow: 1 }}>
        <Box sx={{ position: 'relative', aspectRatio: '1', bgcolor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {mainImage(product) && <Box component="img" src={mainImage(product)} alt={product.name} loading="lazy" sx={{ width: '100%', height: '100%', objectFit: 'contain', p: 2 }} />}
          <Stack direction="row" spacing={1} sx={{ position: 'absolute', top: 12, left: 12 }}>
            {product.Category && <Chip size="small" label={product.Category.name} sx={{ bgcolor: '#f6e7ee', color: 'secondary.main', display: { xs: 'none', sm: 'flex' } }} />}
            {out && <Chip size="small" label="Épuisé" />}
            {!out && product.volume <= 5 && <Chip size="small" label="Stock limité" color="warning" variant="outlined" sx={{ bgcolor: '#fff' }} />}
          </Stack>
        </Box>
        <Box sx={{ p: 2, pb: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {product.designation || ' '}
          </Typography>
        </Box>
      </CardActionArea>
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'stretch', sm: 'center' }} justifyContent="space-between" spacing={1} sx={{ px: 2, pb: 2 }}>
        <Typography sx={{ fontWeight: 700 }}>{formatPrice(product.price)}</Typography>
        <Button size="small" variant="contained" disabled={out} onClick={() => add(product)}>
          {out ? 'Épuisé' : 'Ajouter'}
        </Button>
      </Stack>
    </Card>
  );
}
