import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Grid, Skeleton, Stack, Typography } from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import { catalogApi } from '../api';
import ProductCard from '../components/ProductCard';
import { formatPrice, mainImage, SHIPPING_FEE } from '../utils/format';
import hero from '../assets/hero.jpg';

const PROMISES = [
  { icon: LocalShippingOutlinedIcon, title: 'Livraison 24–72 h', text: `Partout en Tunisie, ${formatPrice(SHIPPING_FEE)}` },
  { icon: PaymentsOutlinedIcon, title: 'Paiement à la livraison', text: 'Vous payez en recevant votre colis' },
  { icon: SpaOutlinedIcon, title: 'Formules douces', text: 'Hydratantes, sans effet collant' },
  { icon: CardGiftcardOutlinedIcon, title: 'Prêt à offrir', text: 'Coffrets dans leur boîte signature' },
];

export default function Home() {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    catalogApi.products().then(setProducts).catch(() => setProducts([]));
    catalogApi.categories().then(setCategories).catch(() => {});
  }, []);

  const featured = products?.slice(0, 4) || [];
  const coffret = products?.find((p) => p.Category?.name === 'Coffrets') || products?.[0];
  const heroProducts = products?.filter((p) => p.Category?.name === 'Gloss').slice(0, 3) || [];

  return (
    <>
      {/* Hero */}
      <Box sx={{ position: 'relative', overflow: 'hidden', bgcolor: '#efe6dc', backgroundImage: `url(${hero})`, backgroundSize: 'cover', backgroundPosition: 'center right' }}>
        <Box sx={{ position: 'absolute', inset: 0, background: { xs: 'rgba(250,246,242,.86)', md: 'linear-gradient(90deg, rgba(250,246,242,.96) 0%, rgba(250,246,242,.85) 45%, rgba(250,246,242,0) 75%)' } }} />
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Grid container alignItems="center" sx={{ minHeight: { xs: 480, md: 600 }, py: 6 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="overline" color="secondary">
                Nouvelle collection
              </Typography>
              <Typography variant="h1" sx={{ fontSize: { xs: '2.6rem', md: '4rem' }, lineHeight: 1.08, my: 2 }}>
                Des lèvres qui brillent, tout simplement.
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: '1.1rem', maxWidth: 460, mb: 4 }}>
                Gloss hydratants, coffrets cadeaux et soins Glowy, livrés chez vous partout en Tunisie.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }}>
                <Button component={RouterLink} to="/boutique" variant="contained" size="large">
                  Découvrir la boutique
                </Button>
                <Button component={RouterLink} to="/boutique?categorie=Coffrets" variant="outlined" size="large" color="primary">
                  Les coffrets
                </Button>
              </Stack>
            </Grid>
            <Grid item md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Stack direction="row" spacing={-3} justifyContent="center" alignItems="flex-end">
                {heroProducts.map((p, i) => (
                  <Box
                    key={p.id}
                    component="img"
                    src={mainImage(p)}
                    alt={p.name}
                    sx={{ width: 170, height: i === 1 ? 300 : 250, objectFit: 'cover', borderRadius: '16px', border: '6px solid #fff', boxShadow: '0 30px 60px -30px rgba(20,17,20,.45)', transform: `rotate(${(i - 1) * 6}deg)`, zIndex: i === 1 ? 2 : 1, bgcolor: '#fff' }}
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Promises */}
      <Container maxWidth="lg" sx={{ mt: { xs: 4, md: -5 }, position: 'relative' }}>
        <Box sx={{ bgcolor: 'background.paper', borderRadius: '16px', border: '1px solid', borderColor: 'divider', p: { xs: 2, md: 3 } }}>
          <Grid container spacing={2}>
            {PROMISES.map(({ icon: Icon, title, text }) => (
              <Grid item xs={6} md={3} key={title}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ sm: 'center' }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: '50%', bgcolor: '#f6e7ee', color: 'secondary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: '.95rem' }}>{title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {text}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Categories */}
      {categories.length > 0 && (
        <Container maxWidth="lg" sx={{ mt: 10 }}>
          <Stack direction="row" spacing={1.5} justifyContent="center" flexWrap="wrap" useFlexGap>
            {categories.map((c) => (
              <Button key={c.id} component={RouterLink} to={`/boutique?categorie=${encodeURIComponent(c.name)}`} variant="outlined" color="primary" sx={{ borderColor: 'divider', bgcolor: '#fff' }}>
                {c.name}
              </Button>
            ))}
          </Stack>
        </Container>
      )}

      {/* New arrivals */}
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Stack direction="row" alignItems="flex-end" justifyContent="space-between" sx={{ mb: 3 }}>
          <Box>
            <Typography variant="overline" color="secondary">
              Nouveautés
            </Typography>
            <Typography variant="h3" sx={{ fontSize: { xs: '1.9rem', md: '2.4rem' } }}>
              Les favoris du moment
            </Typography>
          </Box>
          <Button component={RouterLink} to="/boutique" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
            Tout voir →
          </Button>
        </Stack>
        <Grid container spacing={3}>
          {(products ? featured : [1, 2, 3, 4]).map((p) => (
            <Grid item xs={6} md={3} key={p.id || p}>
              {products ? <ProductCard product={p} /> : <Skeleton variant="rounded" height={340} />}
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Coffret banner */}
      {coffret && (
        <Container maxWidth="lg" sx={{ mt: 10 }}>
          <Grid container sx={{ bgcolor: '#141114', color: '#fff', borderRadius: '20px', overflow: 'hidden' }}>
            <Grid item xs={12} md={6} sx={{ p: { xs: 4, md: 7 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="overline" sx={{ color: '#f48fb1' }}>
                Idée cadeau
              </Typography>
              <Typography variant="h3" sx={{ fontSize: { xs: '1.9rem', md: '2.5rem' }, my: 2 }}>
                {coffret.name}
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,.7)', mb: 3, maxWidth: 420 }}>{coffret.description}</Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Button component={RouterLink} to={`/produit/${coffret.id}`} variant="contained" color="secondary" size="large">
                  Voir le coffret
                </Button>
                <Typography sx={{ fontWeight: 700, fontSize: '1.2rem' }}>{formatPrice(coffret.price)}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} sx={{ bgcolor: '#fff', minHeight: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box component="img" src={mainImage(coffret)} alt={coffret.name} sx={{ width: '100%', maxHeight: 420, objectFit: 'contain' }} />
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
}
