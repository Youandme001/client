import { useEffect, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Box, Breadcrumbs, Button, Chip, Container, Divider, Grid, Link, Skeleton, Stack, Typography } from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import { catalogApi } from '../api';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import QuantityPicker from '../components/QuantityPicker';
import { formatPrice, SHIPPING_FEE } from '../utils/format';
import NotFound from './NotFound';

export default function ProductDetail() {
  const { id } = useParams();
  const { add } = useCart();
  const [product, setProduct] = useState(undefined);
  const [related, setRelated] = useState([]);
  const [image, setImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setProduct(undefined);
    setImage(0);
    setQuantity(1);
    catalogApi
      .product(id)
      .then((p) => {
        setProduct(p);
        catalogApi.products().then((all) => setRelated(all.filter((x) => x.id !== p.id && x.categoryId === p.categoryId).slice(0, 4)));
      })
      .catch(() => setProduct(null));
  }, [id]);

  if (product === null) return <NotFound />;

  const out = product && product.volume <= 0;

  return (
    <Container maxWidth="lg" sx={{ pt: 4 }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link component={RouterLink} to="/boutique" underline="hover" color="inherit">
          Boutique
        </Link>
        {product?.Category && (
          <Link component={RouterLink} to={`/boutique?categorie=${encodeURIComponent(product.Category.name)}`} underline="hover" color="inherit">
            {product.Category.name}
          </Link>
        )}
        <Typography color="text.primary">{product?.name || '…'}</Typography>
      </Breadcrumbs>

      <Grid container spacing={{ xs: 4, md: 8 }}>
        <Grid item xs={12} md={6}>
          {product ? (
            <>
              <Box sx={{ bgcolor: '#fff', borderRadius: '20px', border: '1px solid', borderColor: 'divider', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <Box component="img" src={product.images?.[image]?.filepath} alt={product.name} sx={{ width: '100%', height: '100%', objectFit: 'contain', p: 3 }} />
              </Box>
              {product.images?.length > 1 && (
                <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
                  {product.images.map((img, i) => (
                    <Box key={img.id} component="button" onClick={() => setImage(i)} aria-label={`Photo ${i + 1}`} sx={{ p: 0, width: 72, height: 72, borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', bgcolor: '#fff', border: '2px solid', borderColor: i === image ? 'secondary.main' : 'divider' }}>
                      <Box component="img" src={img.filepath} alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                  ))}
                </Stack>
              )}
            </>
          ) : (
            <Skeleton variant="rounded" sx={{ aspectRatio: '1', height: 'auto' }} />
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          {product ? (
            <>
              {product.Category && <Chip label={product.Category.name} size="small" sx={{ bgcolor: '#f6e7ee', color: 'secondary.main', mb: 2 }} />}
              <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '3rem' } }}>
                {product.name}
              </Typography>
              {product.designation && (
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  {product.designation}
                </Typography>
              )}
              <Typography sx={{ fontSize: '1.8rem', fontWeight: 700, my: 3 }}>{formatPrice(product.price)}</Typography>
              <Typography sx={{ lineHeight: 1.8, color: 'text.secondary' }}>{product.description}</Typography>
              {product.propertiesCosmetics && (
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
                  {product.propertiesCosmetics.split(',').map((p) => (
                    <Chip key={p} label={p.trim()} variant="outlined" size="small" />
                  ))}
                </Stack>
              )}

              <Divider sx={{ my: 4 }} />

              <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 600, color: out ? 'error.main' : product.volume <= 5 ? 'warning.dark' : 'success.main' }}>
                {out ? 'Épuisé pour le moment' : product.volume <= 5 ? `Plus que ${product.volume} en stock` : 'En stock'}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                {!out && <QuantityPicker value={quantity} max={product.volume} onChange={(q) => setQuantity(Math.max(1, q))} />}
                <Button variant="contained" size="large" disabled={out} onClick={() => add(product, quantity)} sx={{ flexGrow: 1, maxWidth: 320 }}>
                  {out ? 'Épuisé' : 'Ajouter au panier'}
                </Button>
              </Stack>

              <Stack spacing={1.5} sx={{ mt: 4, p: 2.5, bgcolor: '#fff', borderRadius: '16px', border: '1px solid', borderColor: 'divider' }}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <LocalShippingOutlinedIcon color="secondary" />
                  <Typography variant="body2">Livraison en 24 à 72 h partout en Tunisie · {formatPrice(SHIPPING_FEE)}</Typography>
                </Stack>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <PaymentsOutlinedIcon color="secondary" />
                  <Typography variant="body2">Paiement en espèces à la réception du colis</Typography>
                </Stack>
              </Stack>
            </>
          ) : (
            <Stack spacing={2}>
              <Skeleton width="60%" height={60} />
              <Skeleton width="30%" />
              <Skeleton height={120} />
            </Stack>
          )}
        </Grid>
      </Grid>

      {related.length > 0 && (
        <Box sx={{ mt: 10 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Vous aimerez aussi
          </Typography>
          <Grid container spacing={3}>
            {related.map((p) => (
              <Grid item xs={6} md={3} key={p.id}>
                <ProductCard product={p} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}
