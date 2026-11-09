import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Chip, CircularProgress, Container, Divider, Grid, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import { accountApi } from '../api';
import { errorMessage } from '../api/client';
import { useAuth } from '../context/AuthContext';
import AddressFields, { EMPTY_ADDRESS, validateAddress } from '../components/AddressFields';
import { formatDate, formatPrice, ORDER_STATES } from '../utils/format';

const panelSx = { bgcolor: '#fff', border: '1px solid', borderColor: 'divider', borderRadius: '20px', p: { xs: 2.5, md: 3 } };

function Orders({ userId }) {
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    accountApi.orders(userId).then(setOrders).catch(() => setOrders([]));
  }, [userId]);

  if (!orders) return <CircularProgress />;
  if (orders.length === 0) return <Typography color="text.secondary">Vous n&apos;avez pas encore passé de commande.</Typography>;

  return (
    <Stack spacing={2}>
      {orders.map((o) => {
        const s = ORDER_STATES[o.state] || { label: o.state, color: 'default' };
        return (
          <Box key={o.id} sx={panelSx}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" useFlexGap spacing={1}>
              <Box>
                <Typography sx={{ fontWeight: 700 }}>Commande n° {o.id}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(o.createdAt)}
                </Typography>
              </Box>
              <Chip label={s.label} color={s.color} variant="outlined" />
            </Stack>
            <Divider sx={{ my: 2 }} />
            {o.products.map((p, i) => (
              <Stack key={`${p.id}-${i}`} direction="row" spacing={2} alignItems="center" sx={{ py: 0.75 }}>
                {p.image && <Box component="img" src={p.image} alt="" sx={{ width: 44, height: 44, objectFit: 'contain', borderRadius: '10px', border: '1px solid', borderColor: 'divider' }} />}
                <Typography sx={{ flexGrow: 1 }}>
                  {p.name} × {p.quantity}
                </Typography>
                <Typography variant="body2">{formatPrice(p.price * p.quantity)}</Typography>
              </Stack>
            ))}
            <Stack direction="row" justifyContent="space-between" sx={{ mt: 1.5 }}>
              <Typography color="text.secondary">Total (livraison incluse)</Typography>
              <Typography sx={{ fontWeight: 700 }}>{formatPrice(o.totalPrice)}</Typography>
            </Stack>
          </Box>
        );
      })}
    </Stack>
  );
}

function Profile({ user }) {
  const { updateUser } = useAuth();
  const [address, setAddress] = useState(() => Object.fromEntries(Object.keys(EMPTY_ADDRESS).map((k) => [k, user[k] || ''])));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const save = async (e) => {
    e.preventDefault();
    const found = validateAddress(address);
    setErrors(found);
    if (Object.keys(found).length) return;
    try {
      updateUser(await accountApi.update(user.id, address));
      setStatus({ type: 'success', text: 'Vos informations sont enregistrées.' });
    } catch (err) {
      setStatus({ type: 'error', text: errorMessage(err) });
    }
  };

  return (
    <Box component="form" onSubmit={save} noValidate sx={panelSx}>
      {status && (
        <Alert severity={status.type} sx={{ mb: 3 }}>
          {status.text}
        </Alert>
      )}
      <AddressFields value={address} onChange={setAddress} errors={errors} />
      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        Enregistrer
      </Button>
    </Box>
  );
}

function Password({ user }) {
  const [form, setForm] = useState({ old: '', next: '', confirm: '' });
  const [status, setStatus] = useState(null);

  const save = async (e) => {
    e.preventDefault();
    if (form.next.length < 8) return setStatus({ type: 'error', text: 'Le nouveau mot de passe doit contenir au moins 8 caractères.' });
    if (form.next !== form.confirm) return setStatus({ type: 'error', text: 'Les mots de passe ne correspondent pas.' });
    try {
      await accountApi.changePassword(user.id, form.old, form.next);
      setForm({ old: '', next: '', confirm: '' });
      setStatus({ type: 'success', text: 'Mot de passe modifié.' });
    } catch (err) {
      setStatus({ type: 'error', text: errorMessage(err) });
    }
  };

  const field = (name, label) => (
    <TextField label={label} type="password" value={form[name]} onChange={(e) => setForm({ ...form, [name]: e.target.value })} autoComplete={name === 'old' ? 'current-password' : 'new-password'} />
  );

  return (
    <Stack component="form" onSubmit={save} spacing={2.5} sx={{ ...panelSx, maxWidth: 480 }}>
      {status && <Alert severity={status.type}>{status.text}</Alert>}
      {field('old', 'Mot de passe actuel')}
      {field('next', 'Nouveau mot de passe')}
      {field('confirm', 'Confirmer le nouveau mot de passe')}
      <Button type="submit" variant="contained" sx={{ alignSelf: 'flex-start' }}>
        Modifier
      </Button>
    </Stack>
  );
}

export default function Account() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);

  if (!user) return <Navigate to="/connexion" state={{ from: '/compte' }} replace />;

  return (
    <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 7 } }}>
      <Grid container spacing={2} alignItems="flex-end" sx={{ mb: 3 }}>
        <Grid item xs>
          <Typography variant="overline" color="secondary">
            Mon compte
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '3rem' } }}>
            Bonjour {user.firstName}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={() => {
              logout();
              navigate('/');
            }}
          >
            Se déconnecter
          </Button>
        </Grid>
      </Grid>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} textColor="secondary" indicatorColor="secondary" sx={{ mb: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Tab label="Mes commandes" />
        <Tab label="Mes informations" />
        <Tab label="Mot de passe" />
      </Tabs>
      {tab === 0 && <Orders userId={user.id} />}
      {tab === 1 && <Profile user={user} />}
      {tab === 2 && <Password user={user} />}
    </Container>
  );
}
