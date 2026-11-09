const money = new Intl.NumberFormat('fr-TN', {
  style: 'currency',
  currency: 'TND',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatPrice = (value) => money.format(Number(value) || 0);

export const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }) : '';

export const SHIPPING_FEE = Number(process.env.REACT_APP_SHIPPING_FEE ?? 8);

export const ORDER_STATES = {
  pending: { label: 'En attente de confirmation', color: 'warning' },
  Confirmed: { label: 'Confirmée, en préparation', color: 'info' },
  Delivered: { label: 'Livrée', color: 'success' },
  Rejected: { label: 'Annulée', color: 'error' },
};

export const mainImage = (product) => product?.images?.[0]?.filepath || null;

export const GOUVERNORATS = [
  'Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'Gabès', 'Gafsa', 'Jendouba', 'Kairouan', 'Kasserine', 'Kébili', 'Le Kef', 'Mahdia',
  'La Manouba', 'Médenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan',
];
