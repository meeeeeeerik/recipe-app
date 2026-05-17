import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Chip,
  Button,
  IconButton,
  Tooltip,
  Divider,
  Avatar,
  Rating,
  LinearProgress,
  Card,
  CardContent,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { observer } from 'mobx-react-lite';

import { recipeStore } from '../../stores/recipeStore';
import { themeStore } from '../../stores/themeStore';
import { CUISINE_COLORS, DIFFICULTY_COLORS, DIET_COLORS } from '../../theme';
import { RecipeCard } from '../../components/RecipeCard/RecipeCard';

function RecipeDetailComponent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dark = themeStore.isDark;
  const recipe = recipeStore.getById(id || '');
  const isFav = recipeStore.isFavorite(id || '');
  const [checkedSteps, setCheckedSteps] = useState<Set<number>>(new Set());
  const [servings, setServings] = useState(recipe?.servings || 4);

  if (!recipe) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" color="text.secondary">
          Recipe not found
        </Typography>

        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Go Home
        </Button>
      </Container>
    );
  }

  const cuisineColor = CUISINE_COLORS[recipe.cuisine] || '#FF6B35';
  const totalTime = recipe.prepTime + recipe.cookTime;
  const ratio = servings / recipe.servings;

  const related = recipeStore.recipes
    .filter(r => r.cuisine === recipe.cuisine && r.id !== recipe.id)
    .slice(0, 3);

  const macros = [
    { label: 'Protein', value: recipe.nutrition.protein, unit: 'g', color: '#4CAF50', max: 60 },
    { label: 'Carbs', value: recipe.nutrition.carbs, unit: 'g', color: '#2196F3', max: 100 },
    { label: 'Fat', value: recipe.nutrition.fat, unit: 'g', color: '#FF9800', max: 60 },
    { label: 'Fiber', value: recipe.nutrition.fiber, unit: 'g', color: '#9C27B0', max: 30 },
  ];

  const quickStats = [
    { icon: <AccessTimeIcon />, label: 'Prep', value: `${recipe.prepTime} min` },
    { icon: <AccessTimeIcon />, label: 'Cook', value: `${recipe.cookTime} min` },
    { icon: <AccessTimeIcon />, label: 'Total', value: `${totalTime} min` },
    { icon: <LocalFireDepartmentIcon />, label: 'Calories', value: `${recipe.calories}` },
    { icon: <PeopleIcon />, label: 'Servings', value: String(recipe.servings) },
  ];

  function toggleStep(step: number) {
    const next = new Set(checkedSteps);
    if (next.has(step)) {
      next.delete(step);
    } else {
      next.add(step);
    }
    setCheckedSteps(next);
  }

  return (
    <Box sx={{ py: { xs: 3, sm: 5 } }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Main content */}
          <Grid item xs={12} lg={8}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              sx={{ mb: 2, color: 'text.secondary' }}
            >
              Back
            </Button>

            {/* Hero image */}
            <Box sx={{ borderRadius: 4, overflow: 'hidden', mb: 3, position: 'relative' }}>
              <Box
                component="img"
                src={recipe.imageUrl}
                alt={recipe.title}
                sx={{ width: '100%', maxHeight: 420, objectFit: 'cover' }}
              />

              <Box sx={{ position: 'absolute', top: 14, right: 14 }}>
                <Tooltip title={isFav ? 'Remove favorite' : 'Add to favorites'}>
                  <IconButton
                    onClick={() => recipeStore.toggleFavorite(recipe.id)}
                    sx={{
                      backgroundColor: 'rgba(0,0,0,0.55)',
                      backdropFilter: 'blur(8px)',
                      color: isFav ? '#FF6B35' : 'white',
                    }}
                  >
                    {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {/* Badges */}
            <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              <Chip
                label={recipe.cuisine}
                sx={{ backgroundColor: cuisineColor, color: 'white', fontWeight: 700 }}
              />

              <Chip
                label={recipe.difficulty}
                sx={{
                  backgroundColor: DIFFICULTY_COLORS[recipe.difficulty],
                  color: 'white',
                  fontWeight: 700,
                }}
              />

              <Chip label={recipe.mealType} variant="outlined" sx={{ fontWeight: 700 }} />

              {recipe.dietTags.map(tag => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    backgroundColor: `${DIET_COLORS[tag]}22`,
                    color: DIET_COLORS[tag],
                    fontWeight: 700,
                  }}
                />
              ))}
            </Box>

            <Typography
              variant="h3"
              fontWeight={900}
              sx={{ mb: 1, fontSize: { xs: '1.7rem', md: '2.2rem' } }}
            >
              {recipe.title}
            </Typography>

            {/* Author & Rating */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar
                  sx={{
                    width: 34,
                    height: 34,
                    backgroundColor: cuisineColor,
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  {recipe.author[0]}
                </Avatar>

                <Typography variant="body2" fontWeight={700}>
                  {recipe.author}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Rating value={recipe.rating} precision={0.1} readOnly size="small" />

                <Typography variant="body2" fontWeight={700}>
                  {recipe.rating}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  ({recipe.reviewCount.toLocaleString()} reviews)
                </Typography>
              </Box>
            </Box>

            {/* Quick stats */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {quickStats.map(s => (
                <Grid item xs={4} sm key={s.label}>
                  <Card>
                    <CardContent sx={{ p: 1.5, textAlign: 'center', '&:last-child': { pb: 1.5 } }}>
                      <Box sx={{ color: 'primary.main', mb: 0.3 }}>{s.icon}</Box>

                      <Typography variant="caption" color="text.secondary" display="block">
                        {s.label}
                      </Typography>

                      <Typography variant="body2" fontWeight={800}>
                        {s.value}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mb: 3,
                lineHeight: 1.8,
                fontStyle: 'italic',
                borderLeft: `4px solid ${cuisineColor}`,
                pl: 2,
              }}
            >
              {recipe.description}
            </Typography>

            <Divider sx={{ my: 3, opacity: 0.1 }} />

            {/* Ingredients */}
            <Box sx={{ mb: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography variant="h5" fontWeight={800}>
                  Ingredients
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setServings(Math.max(1, servings - 1))}
                    sx={{ minWidth: 32, px: 0 }}
                  >
                    -
                  </Button>

                  <Typography fontWeight={700}>{servings} servings</Typography>

                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setServings(servings + 1)}
                    sx={{ minWidth: 32, px: 0 }}
                  >
                    +
                  </Button>
                </Box>
              </Box>

              <Grid container spacing={1}>
                {recipe.ingredients.map((ing, i) => (
                  <Grid item xs={12} sm={6} key={i}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        py: 1,
                        px: 1.5,
                        borderRadius: 2,
                        backgroundColor: dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.025)',
                        border: dark
                          ? '1px solid rgba(255,255,255,0.05)'
                          : '1px solid rgba(0,0,0,0.05)',
                      }}
                    >
                      <Typography variant="body2" fontWeight={600}>
                        {ing.name}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" fontWeight={700}>
                        {ing.unit
                          ? `${(parseFloat(ing.amount) * ratio).toFixed(ing.amount.includes('.') ? 1 : 0)} ${ing.unit}`
                          : ing.amount}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Divider sx={{ my: 3, opacity: 0.1 }} />

            {/* Instructions */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={800} mb={2}>
                Instructions
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {recipe.instructions.map(inst => {
                  const done = checkedSteps.has(inst.step);

                  return (
                    <Box
                      key={inst.step}
                      onClick={() => toggleStep(inst.step)}
                      sx={{
                        display: 'flex',
                        gap: 2,
                        p: 2,
                        borderRadius: 3,
                        cursor: 'pointer',
                        backgroundColor: done
                          ? dark
                            ? 'rgba(76,175,80,0.1)'
                            : 'rgba(76,175,80,0.06)'
                          : dark
                            ? 'rgba(255,255,255,0.03)'
                            : 'rgba(0,0,0,0.025)',
                        border: `1px solid ${done ? '#4CAF5044' : dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                        transition: 'all 0.2s',
                        opacity: done ? 0.65 : 1,
                      }}
                    >
                      <Box sx={{ flexShrink: 0, mt: 0.3 }}>
                        {done ? (
                          <CheckCircleIcon sx={{ color: 'success.main', fontSize: 22 }} />
                        ) : (
                          <RadioButtonUncheckedIcon sx={{ color: 'text.disabled', fontSize: 22 }} />
                        )}
                      </Box>

                      <Box>
                        <Typography variant="caption" fontWeight={800} color="primary">
                          Step {inst.step}
                          {inst.duration ? ` · ${inst.duration} min` : ''}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            lineHeight: 1.7,
                            textDecoration: done ? 'line-through' : 'none',
                          }}
                        >
                          {inst.text}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>

            {/* Tips */}
            {recipe.tips && recipe.tips.length > 0 && (
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  background: `${cuisineColor}14`,
                  border: `1px solid ${cuisineColor}33`,
                  mb: 4,
                }}
              >
                <Typography variant="h6" fontWeight={800} mb={1.5} color="primary">
                  💡 Chef's Tips
                </Typography>

                {recipe.tips.map((tip, i) => (
                  <Box key={i} sx={{ display: 'flex', gap: 1, mb: 0.8 }}>
                    <Typography sx={{ color: cuisineColor, flexShrink: 0 }}>•</Typography>

                    <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                      {tip}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            <Box
              sx={{
                position: { lg: 'sticky' },
                top: { lg: 100 },
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              {/* Nutrition */}
              <Card>
                <CardContent sx={{ p: 2.5 }}>
                  <Typography variant="h6" fontWeight={800} mb={2}>
                    Nutrition per serving
                  </Typography>

                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography variant="h3" fontWeight={900} color="primary">
                      {recipe.calories}
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                      calories
                    </Typography>
                  </Box>

                  {macros.map(m => (
                    <Box key={m.label} sx={{ mb: 1.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.4 }}>
                        <Typography variant="body2" fontWeight={600}>
                          {m.label}
                        </Typography>

                        <Typography variant="body2" fontWeight={800} sx={{ color: m.color }}>
                          {m.value}
                          {m.unit}
                        </Typography>
                      </Box>

                      <LinearProgress
                        variant="determinate"
                        value={Math.min(100, (m.value / m.max) * 100)}
                        sx={{
                          height: 6,
                          borderRadius: 4,
                          backgroundColor: `${m.color}22`,
                          '& .MuiLinearProgress-bar': { backgroundColor: m.color, borderRadius: 4 },
                        }}
                      />
                    </Box>
                  ))}
                </CardContent>
              </Card>

              {/* Related recipes */}
              {related.length > 0 && (
                <Box>
                  <Typography variant="h6" fontWeight={800} mb={2}>
                    More {recipe.cuisine} Recipes
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {related.map(r => (
                      <RecipeCard key={r.id} recipe={r} />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export const RecipeDetail = observer(RecipeDetailComponent);
