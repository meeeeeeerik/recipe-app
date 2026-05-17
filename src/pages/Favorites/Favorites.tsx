import { Box, Container, Typography, Grid, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { recipeStore } from '../../stores/recipeStore';
import { RecipeCard } from '../../components/RecipeCard/RecipeCard';

function FavoritesComponent() {
  const { favoriteRecipes } = recipeStore;

  return (
    <Box sx={{ py: { xs: 3, sm: 5 } }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
          <FavoriteIcon sx={{ color: 'primary.main', fontSize: 32 }} />

          <Box>
            <Typography variant="h4" fontWeight={800}>
              My Favorites
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {favoriteRecipes.length} saved recipes
            </Typography>
          </Box>
        </Box>

        {favoriteRecipes.length === 0 ? (
          <Box sx={{ py: 10, textAlign: 'center' }}>
            <FavoriteIcon sx={{ fontSize: 80, color: 'action.disabled', mb: 3 }} />

            <Typography variant="h5" color="text.secondary" mb={1}>
              No favorites yet
            </Typography>

            <Typography variant="body2" color="text.disabled" mb={4}>
              Click the heart icon on any recipe to save it here
            </Typography>

            <Button
              component={Link}
              to="/"
              variant="contained"
              size="large"
              sx={{ borderRadius: 8, px: 5 }}
            >
              Browse Recipes
            </Button>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {favoriteRecipes.map(r => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={r.id}>
                <RecipeCard recipe={r} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export const Favorites = observer(FavoritesComponent);
