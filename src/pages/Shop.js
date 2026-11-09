import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Chip, Container, Grid, InputAdornment, MenuItem, Skeleton, Stack, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { catalogApi } from '../api';
import ProductCard from '../components/ProductCard';

const SORTS = {
  recent: { label: 'Nouveautés', fn: (a, b) => new Date(b.createdAt) - new Date(a.createdAt) },
  priceAsc: { label: 'Prix croissant', fn: (a, b) => a.price - b.price },
  priceDesc: { label: 'Prix décroissant', fn: (a, b) => b.price - a.price },
};

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('recent');
  const category = params.get('categorie') || '';

  useEffect(() => {
    catalogApi.products().then(setProducts).catch(() => setProducts([]));
    catalogApi.categories().then(setCategories).catch(() => {});
  }, []);

  const visible = useMemo(() => {
    if (!products) return [];
    const q = search.trim().toLowerCase();
    return products
      .filter((p) => !category || p.Category?.name === category)
      .filter((p) => !q || `${p.name} ${p.designation || ''} ${p.description || ''}`.toLowerCase().includes(q))
      .map((p) => ({ ...p, price: Number(p.price) }))
      .sort(SORTS[sort].fn);
  }, [products, category, search, sort]);

  const pick = (name) => setParams(name ? { categorie: name } : {});

  return (
    <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 7 } }}>
      <Typography variant="overline" color="secondary">
        Boutique
      </Typography>
      <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '3rem' }, mb: 4 }}>
        {category || 'Tous nos produits'}
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'center' }} justifyContent="space-between" sx={{ mb: 4 }}>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip label="Tout" onClick={() => pick('')} color={!category ? 'primary' : 'default'} variant={!category ? 'filled' : 'outlined'} />
          {categories.map((c) => (
            <Chip key={c.id} label={c.name} onClick={() => pick(c.name)} color={category === c.name ? 'primary' : 'default'} variant={category === c.name ? 'filled' : 'outlined'} />
          ))}
        </Stack>
        <Stack direction="row" spacing={1.5}>
          <TextField
            size="small"
            placeholder="Rechercher…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: { xs: '100%', md: 240 }, bgcolor: '#fff' }}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
            inputProps={{ 'aria-label': 'Rechercher un produit' }}
          />
          <TextField select size="small" value={sort} onChange={(e) => setSort(e.target.value)} sx={{ width: 190, bgcolor: '#fff' }} inputProps={{ 'aria-label': 'Trier' }}>
            {Object.entries(SORTS).map(([k, s]) => (
              <MenuItem key={k} value={k}>
                {s.label}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Stack>

      {products && visible.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 10, color: 'text.secondary' }}>Aucun produit ne correspond à votre recherche.</Box>
      ) : (
        <Grid container spacing={3}>
          {(products ? visible : [1, 2, 3, 4, 5, 6, 7, 8]).map((p) => (
            <Grid item xs={6} md={4} lg={3} key={p.id || p}>
              {products ? <ProductCard product={p} /> : <Skeleton variant="rounded" height={340} />}
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
