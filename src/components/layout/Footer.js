import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Grid, Link, Stack, Typography } from '@mui/material';
import logoLight from '../../assets/logo-light.png';

const columns = [
  {
    title: 'Boutique',
    links: [
      ['Tous les produits', '/boutique'],
      ['Mon panier', '/panier'],
      ['Mon compte', '/compte'],
    ],
  },
  {
    title: 'Glowy',
    links: [
      ['Notre histoire', '/a-propos'],
      ['Livraison et paiement', '/a-propos#livraison'],
    ],
  },
];

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: '#141114', color: 'rgba(255,255,255,0.7)', mt: 10, pt: 8, pb: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Box component="img" src={logoLight} alt="Glowy" sx={{ height: 54, mb: 2 }} />
            <Typography variant="body2" sx={{ maxWidth: 340, lineHeight: 1.8 }}>
              Gloss, coffrets et soins pensés en Tunisie. Livraison partout dans le pays, paiement à la réception.
            </Typography>
          </Grid>
          {columns.map((c) => (
            <Grid item xs={6} md={3} key={c.title}>
              <Typography variant="overline" sx={{ color: '#fff' }}>
                {c.title}
              </Typography>
              <Stack spacing={1} sx={{ mt: 1 }}>
                {c.links.map(([label, to]) => (
                  <Link key={to} component={RouterLink} to={to} underline="hover" color="inherit" variant="body2">
                    {label}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>
        <Typography variant="caption" component="p" sx={{ mt: 6, pt: 3, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          © {new Date().getFullYear()} Glowy · Tous droits réservés
        </Typography>
      </Container>
    </Box>
  );
}
