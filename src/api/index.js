import api from './client';

const data = (res) => res.data.data;
const bearer = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

export const catalogApi = {
  products: () => api.get('/produit').then(data),
  product: (id) => api.get(`/produit/${id}`).then(data),
  categories: () => api.get('/categories').then(data),
};

export const accountApi = {
  login: (email, password) => api.post('/user/login', { email, password }).then((r) => r.data),
  register: (body) => api.post('/user/create', body).then((r) => r.data),
  guest: (body) => api.post('/user/create1', body).then((r) => r.data),
  get: (id) => api.get(`/user/${id}`).then(data),
  update: (id, body) => api.put(`/user/update/${id}`, body).then(data),
  changePassword: (id, oldPassword, newPassword) => api.put(`/user/updatePassword/${id}`, { oldPassword, newPassword }),
  orders: (id) => api.get(`/commande/userById/${id}`).then(data),
};

export const orderApi = {
  // token: guest token for checkout without account (otherwise the session token is used)
  create: (products, token) => api.post('/commande/create', { products }, token ? bearer(token) : undefined).then(data),
};
