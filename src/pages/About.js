import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { formatPrice, SHIPPING_FEE } from '../utils/format';
import hero from '../assets/hero.jpg';

const STEPS = [
  ['1', 'Vous commandez', 'Avec ou sans compte : nom, téléphone et adresse suffisent.'],
  ['2', 'Nous vous appelons', 'Un appel rapide pour confirmer la commande et l’adresse.'],
  ['3', 'Livraison 24–72 h', `Partout en Tunisie pour ${formatPrice(SHIPPING_FEE)}.`],
  ['4', 'Vous payez à la réception', 'En espèces, au livreur, en recevant le colis.'],
];

export default function About() {
  return (
    <>
      <Box sx={{ backgroundImage: `linear-gradient(rgba(20,17,20,.55), rgba(20,17,20,.55)), url(${hero})`, backgroundSize: 'cover', backgroundPosition: 'center', color: '#fff', py: { xs: 10, md: 14 } }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="overline" sx={{ color: '#f8bbd0' }}>
            Notre histoire
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2.4rem', md: '3.4rem' }, mt: 1 }}>
            La beauté, sans compliquer
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography sx={{ fontSize: '1.15rem', lineHeight: 1.9, color: 'text.secondary' }}>
          Glowy est née d’une idée simple : proposer en Tunisie des gloss et des soins agréables à porter, joliment présentés, à un prix juste. Chaque teinte est choisie
          pour être facile à porter au quotidien, et nos coffrets sont prêts à offrir dans leur boîte noire signature.
        </Typography>
      </Container>
      <Container maxWidth="lg" id="livraison">
        <Typography variant="h3" sx={{ fontSize: { xs: '1.9rem', md: '2.4rem' }, mb: 4, textAlign: 'center' }}>
          Livraison et paiement
        </Typography>
        <Grid container spacing={3}>
          {STEPS.map(([n, title, text]) => (
            <Grid item xs={12} sm={6} md={3} key={n}>
              <Box sx={{ height: '100%', bgcolor: '#fff', border: '1px solid', borderColor: 'divider', borderRadius: '20px', p: 3 }}>
                <Typography sx={{ fontFamily: '"Playfair Display", serif', fontSize: '2.4rem', color: 'secondary.main', lineHeight: 1 }}>{n}</Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {title}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  {text}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Stack alignItems="center" sx={{ mt: 6 }}>
          <Button component={RouterLink} to="/boutique" variant="contained" size="large">
            Découvrir la boutique
          </Button>
        </Stack>
      </Container>
    </>
  );
}
