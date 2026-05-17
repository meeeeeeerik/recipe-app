import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { recipeStore } from '../../stores/recipeStore';
import { themeStore } from '../../stores/themeStore';
import { RecipeCard } from '../../components/RecipeCard/RecipeCard';
import { FilterBar } from '../../components/FilterBar/FilterBar';

function HomeComponent() {
  const { filteredRecipes, featuredRecipes, hasActiveFilters, searchQuery } = recipeStore;
  const dark = themeStore.isDark;

  return (
    <Box>
      <FilterBar />

      <Box sx={{ py: { xs: 3, sm: 4 } }}>
        <Container maxWidth="xl">
          {/* Hero — only when no filters active */}
          {!hasActiveFilters && !searchQuery && (
            <Box
              sx={{
                mb: 5,
                borderRadius: 4,
                overflow: 'hidden',
                position: 'relative',
                background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF6B35 100%)',
                py: { xs: 5, md: 7 },
                px: { xs: 3, md: 6 },
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: -40,
                  right: -40,
                  width: 250,
                  height: 250,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)',
                  pointerEvents: 'none',
                }}
              />

              <Box
                sx={{
                  position: 'absolute',
                  bottom: -60,
                  right: 80,
                  width: 180,
                  height: 180,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)',
                  pointerEvents: 'none',
                }}
              />

              <Typography
                variant="overline"
                sx={{ color: 'rgba(255,255,255,0.8)', letterSpacing: 3, fontWeight: 700 }}
              >
                Welcome to TastyHub
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  color: 'white',
                  fontWeight: 900,
                  mb: 1,
                  fontSize: { xs: '1.8rem', md: '2.6rem' },
                }}
              >
                Discover Delicious Recipes
              </Typography>

              <Typography
                variant="h6"
                sx={{ color: 'rgba(255,255,255,0.85)', fontWeight: 400, mb: 3, maxWidth: 480 }}
              >
                From quick weeknight dinners to weekend feasts — find the perfect recipe for every
                occasion.
              </Typography>

              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: 'white',
                  color: '#FF6B35',
                  fontWeight: 800,
                  borderRadius: 8,
                  px: 4,
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
                }}
              >
                Explore Recipes
              </Button>
            </Box>
          )}

          {/* Section header */}
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}
          >
            <Box>
              <Typography variant="h5" fontWeight={800}>
                {searchQuery
                  ? `Results for "${searchQuery}"`
                  : hasActiveFilters
                    ? 'Filtered Recipes'
                    : 'All Recipes'}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {filteredRecipes.length} recipes found
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3}>
            {/* Main grid */}
            <Grid item xs={12} lg={9}>
              {filteredRecipes.length === 0 ? (
                <Box sx={{ py: 10, textAlign: 'center' }}>
                  <Typography variant="h5" color="text.secondary" mb={1}>
                    No recipes found
                  </Typography>

                  <Typography variant="body2" color="text.disabled" mb={3}>
                    Try adjusting your filters or search query
                  </Typography>

                  <Button variant="outlined" onClick={recipeStore.clearFilters}>
                    Clear filters
                  </Button>
                </Box>
              ) : (
                <Grid container spacing={2}>
                  {filteredRecipes.map(recipe => (
                    <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                      <RecipeCard recipe={recipe} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>

            {/* Sidebar — top rated */}
            <Grid item xs={12} lg={3}>
              <Box
                sx={{
                  position: { lg: 'sticky' },
                  top: { lg: 160 },
                  backgroundColor: 'background.paper',
                  borderRadius: 3,
                  border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
                  p: 2.5,
                }}
              >
                <Typography variant="h6" fontWeight={800} mb={2}>
                  ⭐ Top Rated
                </Typography>

                {featuredRecipes.map(r => (
                  <RecipeCard key={r.id} recipe={r} compact />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export const Home = observer(HomeComponent);
