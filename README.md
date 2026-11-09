# Glowy — Boutique en ligne

Boutique de la marque **Glowy** (gloss, coffrets, soins) : catalogue, panier, commande avec ou sans compte, paiement à la livraison partout en Tunisie, suivi des commandes.

API : [Youandme001/backend](https://github.com/Youandme001/backend) · Back-office : [Youandme001/admin](https://github.com/Youandme001/admin)

## Parcours

- **Accueil** : nouveautés, coffret mis en avant, catégories, engagements (livraison, paiement à la réception).
- **Boutique** : filtres par catégorie, recherche, tri par prix ou nouveauté.
- **Fiche produit** : photos, description, propriétés, stock restant, quantité, produits associés.
- **Panier** (tiroir latéral + page) : quantités limitées au stock, prix toujours relus depuis l'API.
- **Commande** : formulaire d'adresse avec les 24 gouvernorats, validation, commande invitée ou avec compte (adresse pré-remplie), confirmation.
- **Compte** : historique et statut des commandes, informations, mot de passe.

## Stack

React 18 (Create React App) · Material UI 5 · React Router 6 · Axios

## Structure

```
src/
  api/          client axios (jeton, messages d'erreur en français) + appels
  context/      AuthContext (session cliente), CartContext (panier : ids + quantités)
  components/   Header, Footer, CartDrawer, ProductCard, AddressFields, OrderSummary…
  pages/        Home, Shop, ProductDetail, Cart, Checkout, OrderConfirmed, Login, Register, Account, About
  utils/        prix en DT, statuts, gouvernorats
  theme.js      thème Glowy (Playfair Display + Inter, noir / rose)
```

## Démarrage

```bash
npm install
cp .env.example .env     # REACT_APP_API_URL=http://localhost:4000
npm start                # http://localhost:3000
```

Le total payé est recalculé par l'API à partir des prix en base ; le montant affiché dans le panier n'est qu'indicatif.
