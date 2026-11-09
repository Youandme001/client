import { Box, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function QuantityPicker({ value, onChange, max = 99, size = 'medium' }) {
  const small = size === 'small';
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', border: '1px solid', borderColor: 'divider', borderRadius: 999, bgcolor: 'background.paper' }}>
      <IconButton size="small" onClick={() => onChange(value - 1)} aria-label="Retirer un">
        <RemoveIcon fontSize={small ? 'inherit' : 'small'} />
      </IconButton>
      <Typography sx={{ minWidth: small ? 22 : 32, textAlign: 'center', fontWeight: 600 }} aria-live="polite">
        {value}
      </Typography>
      <IconButton size="small" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Ajouter un">
        <AddIcon fontSize={small ? 'inherit' : 'small'} />
      </IconButton>
    </Box>
  );
}
