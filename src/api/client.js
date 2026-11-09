import axios from 'axios';

export const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:4000').replace(/\/$/, '');

const SESSION_KEY = 'glowy_session';

// Customer session: { token, user }
export const sessionStore = {
  get() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY));
    } catch {
      return null;
    }
  },
  set: (session) => localStorage.setItem(SESSION_KEY, JSON.stringify(session)),
  clear: () => localStorage.removeItem(SESSION_KEY),
};

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  // A guest token passed explicitly (checkout) wins over the stored session
  if (!config.headers.Authorization) {
    const session = sessionStore.get();
    if (session?.token) config.headers.Authorization = `Bearer ${session.token}`;
  }
  return config;
});

// API messages are in English; customers read French
const MESSAGES = {
  'Invalid credentials': 'E-mail ou mot de passe incorrect.',
  'Email already exists': 'Un compte existe déjà avec cet e-mail.',
  'Phone already exists': 'Un compte existe déjà avec ce numéro de téléphone.',
  'An account already uses this phone number, please log in': 'Un compte existe déjà avec ce numéro : connectez-vous pour commander.',
  'Current password is incorrect': 'Le mot de passe actuel est incorrect.',
  'Some products no longer exist': 'Un produit de votre panier n’est plus disponible.',
  'Session expired': 'Votre session a expiré, reconnectez-vous.',
  'Too many attempts, try again later': 'Trop de tentatives, réessayez dans quelques minutes.',
};

export const errorMessage = (error, fallback = 'Une erreur est survenue, réessayez.') => {
  const msg = error?.response?.data?.message;
  if (!msg) return error?.response ? fallback : 'Le serveur est injoignable, vérifiez votre connexion.';
  if (msg.startsWith('Not enough stock for ')) return `Stock insuffisant pour ${msg.slice(21)}.`;
  return MESSAGES[msg] || msg;
};

export default api;
