import { Link as RouterLink } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

export default function NotFound() {
  return (
    <Container maxWidth="sm" sx={{ py: 14, textAlign: 'center' }}>
      <Typography variant="h1" sx={{ fontSize: '5rem', color: 'secondary.main' }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ my: 2 }}>
        Cette page n&apos;existe pas
      </Typography>
      <Button component={RouterLink} to="/boutique" variant="contained" size="large">
        Retour à la boutique
      </Button>
    </Container>
  );
}
