import { Grid, MenuItem, TextField } from '@mui/material';
import { GOUVERNORATS } from '../utils/format';

export const EMPTY_ADDRESS = { firstName: '', lastName: '', phone: '', address: '', gouvernorat: '', city: '', postalCode: '' };

// Same rules as the API, checked before sending
export function validateAddress(v) {
  const errors = {};
  ['firstName', 'lastName', 'address', 'gouvernorat', 'city'].forEach((k) => {
    if (!String(v[k] || '').trim()) errors[k] = 'Champ obligatoire';
  });
  if (!/^[0-9+ ]{8,15}$/.test(String(v.phone || '').trim())) errors.phone = 'Numéro invalide (8 chiffres)';
  if (!/^[0-9]{4}$/.test(String(v.postalCode || '').trim())) errors.postalCode = 'Code postal à 4 chiffres';
  return errors;
}

export default function AddressFields({ value, onChange, errors = {} }) {
  const field = (name, label, props = {}) => (
    <TextField
      label={label}
      name={name}
      value={value[name] || ''}
      onChange={(e) => onChange({ ...value, [name]: e.target.value })}
      error={Boolean(errors[name])}
      helperText={errors[name]}
      {...props}
    />
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        {field('firstName', 'Prénom', { autoComplete: 'given-name' })}
      </Grid>
      <Grid item xs={12} sm={6}>
        {field('lastName', 'Nom', { autoComplete: 'family-name' })}
      </Grid>
      <Grid item xs={12}>
        {field('phone', 'Téléphone', { autoComplete: 'tel', inputProps: { inputMode: 'tel' } })}
      </Grid>
      <Grid item xs={12}>
        {field('address', 'Adresse (rue, numéro, résidence…)', { autoComplete: 'street-address' })}
      </Grid>
      <Grid item xs={12} sm={5}>
        {field('gouvernorat', 'Gouvernorat', {
          select: true,
          children: GOUVERNORATS.map((g) => (
            <MenuItem key={g} value={g}>
              {g}
            </MenuItem>
          )),
        })}
      </Grid>
      <Grid item xs={7} sm={4}>
        {field('city', 'Ville', { autoComplete: 'address-level2' })}
      </Grid>
      <Grid item xs={5} sm={3}>
        {field('postalCode', 'Code postal', { autoComplete: 'postal-code', inputProps: { inputMode: 'numeric', maxLength: 4 } })}
      </Grid>
    </Grid>
  );
}
