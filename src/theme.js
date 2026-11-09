import { createTheme } from '@mui/material/styles';

const serif = '"Playfair Display", Georgia, serif';

const theme = createTheme({
  palette: {
    primary: { main: '#141114', contrastText: '#fff' },
    secondary: { main: '#c2185b', contrastText: '#fff' },
    background: { default: '#faf6f2', paper: '#ffffff' },
    text: { primary: '#1d1a1c', secondary: '#6b6168' },
    divider: '#ece3dc',
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    h1: { fontFamily: serif, fontWeight: 600, letterSpacing: '-0.02em' },
    h2: { fontFamily: serif, fontWeight: 600, letterSpacing: '-0.02em' },
    h3: { fontFamily: serif, fontWeight: 600 },
    h4: { fontFamily: serif, fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: 0 },
    overline: { letterSpacing: '0.2em', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 999, paddingInline: 22 }, sizeLarge: { paddingBlock: 12, fontSize: '1rem' } },
    },
    MuiCard: { styleOverrides: { root: { boxShadow: 'none', border: '1px solid #ece3dc' } } },
    MuiPaper: { styleOverrides: { rounded: { borderRadius: 16 } } },
    MuiTextField: { defaultProps: { fullWidth: true } },
    MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
  },
});

export default theme;
