import { useState } from 'react';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import { AppBar, Badge, Box, Button, Container, Drawer, IconButton, List, ListItemButton, ListItemText, Toolbar, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';

const LINKS = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/boutique', label: 'Boutique' },
  { to: '/a-propos', label: 'À propos' },
];

const navSx = {
  color: 'text.primary',
  fontWeight: 500,
  position: 'relative',
  '&.active::after': {
    content: '""',
    position: 'absolute',
    left: 22,
    right: 22,
    bottom: 4,
    height: 2,
    borderRadius: '10px',
    bgcolor: 'secondary.main',
  },
};

export default function Header() {
  const { count, setDrawerOpen } = useCart();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <AppBar position="sticky" color="inherit" elevation={0} sx={{ bgcolor: 'rgba(250,246,242,0.88)', backdropFilter: 'blur(10px)', borderBottom: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 76 }, gap: 1 }}>
          <IconButton sx={{ display: { md: 'none' } }} onClick={() => setMenuOpen(true)} aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', mr: 'auto' }}>
            <Box component="img" src={logo} alt="Glowy" sx={{ height: { xs: 34, md: 42 } }} />
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, mr: 2 }}>
            {LINKS.map((l) => (
              <Button key={l.to} component={NavLink} to={l.to} end={l.end} sx={navSx}>
                {l.label}
              </Button>
            ))}
          </Box>
          <Tooltip title={user ? 'Mon compte' : 'Se connecter'}>
            <IconButton component={RouterLink} to={user ? '/compte' : '/connexion'} aria-label="Compte">
              <PersonOutlineIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Panier">
            <IconButton onClick={() => setDrawerOpen(true)} aria-label="Panier">
              <Badge badgeContent={count} color="secondary">
                <ShoppingBagOutlinedIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Container>

      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)}>
        <Box sx={{ width: 260, p: 2 }}>
          <Box component="img" src={logo} alt="Glowy" sx={{ height: 40, mb: 2, ml: 1 }} />
          <List onClick={() => setMenuOpen(false)}>
            {LINKS.map((l) => (
              <ListItemButton key={l.to} component={NavLink} to={l.to} end={l.end} sx={{ borderRadius: '10px', '&.active': { bgcolor: '#f6e7ee' } }}>
                <ListItemText primary={l.label} />
              </ListItemButton>
            ))}
            <ListItemButton component={NavLink} to={user ? '/compte' : '/connexion'} sx={{ borderRadius: '10px' }}>
              <ListItemText primary={user ? 'Mon compte' : 'Se connecter'} />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
