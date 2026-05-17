import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
  Rating,
  Avatar,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import PeopleIcon from '@mui/icons-material/People';
import { observer } from 'mobx-react-lite';

import { recipeStore } from '../../stores/recipeStore';
import { CUISINE_COLORS, DIFFICULTY_COLORS, DIET_COLORS } from '../../theme';
import type { Recipe } from '../../types';

interface Props {
  recipe: Recipe;
  compact?: boolean;
}

function RecipeCardComponent({ recipe, compact }: Props) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const isFav = recipeStore.isFavorite(recipe.id);
  const totalTime = recipe.prepTime + recipe.cookTime;
  const cuisineColor = CUISINE_COLORS[recipe.cuisine] || '#FF6B35';
  const diffColor = DIFFICULTY_COLORS[recipe.difficulty];

  function handleFav(e: React.MouseEvent) {
    e.stopPropagation();
    recipeStore.toggleFavorite(recipe.id);
  }

  if (compact) {
    return (
      <Box
        onClick={() => navigate(`/recipe/${recipe.id}`)}
        sx={{
          display: 'flex',
          gap: 1.5,
          cursor: 'pointer',
          py: 1.5,
          borderBottom: '1px solid',
          borderColor: 'divider',
          '&:last-child': { borderBottom: 'none' },
          '&:hover .title': { color: 'primary.main' },
        }}
      >
        <Box sx={{ width: 72, height: 56, borderRadius: 2, overflow: 'hidden', flexShrink: 0 }}>
          <Box
            component="img"
            src={recipe.imageUrl}
            alt={recipe.title}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            className="title"
            variant="body2"
            fontWeight={700}
            noWrap
            sx={{ transition: 'color 0.2s' }}
          >
            {recipe.title}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 0.3 }}>
            <AccessTimeIcon sx={{ fontSize: 12, color: 'text.disabled' }} />
            <Typography variant="caption" color="text.secondary">
              {totalTime} min
            </Typography>

            <LocalFireDepartmentIcon sx={{ fontSize: 12, color: 'warning.main' }} />
            <Typography variant="caption" color="text.secondary">
              {recipe.calories} cal
            </Typography>
          </Box>

          <Rating
            value={recipe.rating}
            precision={0.1}
            readOnly
            size="small"
            sx={{ mt: 0.3, '& .MuiRating-icon': { fontSize: 12 } }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Card
      onClick={() => navigate(`/recipe/${recipe.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.22s, box-shadow 0.22s',
        transform: hovered ? 'translateY(-5px)' : 'none',
        boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.18)' : undefined,
      }}
    >
      {/* Image */}
      <Box sx={{ position: 'relative', paddingTop: '62%', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          image={recipe.imageUrl}
          alt={recipe.title}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />

        {/* Cuisine badge */}
        <Chip
          label={recipe.cuisine}
          size="small"
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            backgroundColor: cuisineColor,
            color: 'white',
            fontWeight: 700,
            fontSize: 11,
            height: 22,
          }}
        />

        {/* Difficulty badge */}
        <Chip
          label={recipe.difficulty}
          size="small"
          sx={{
            position: 'absolute',
            top: 10,
            right: 48,
            backgroundColor: diffColor,
            color: 'white',
            fontWeight: 700,
            fontSize: 11,
            height: 22,
          }}
        />

        {/* Favorite button */}
        <Tooltip title={isFav ? 'Remove favorite' : 'Add to favorites'}>
          <IconButton
            onClick={handleFav}
            size="small"
            sx={{
              position: 'absolute',
              top: 6,
              right: 6,
              backgroundColor: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(8px)',
              color: isFav ? '#FF6B35' : 'rgba(255,255,255,0.85)',
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.75)' },
            }}
          >
            {isFav ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
          </IconButton>
        </Tooltip>

        {/* Gradient overlay */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)',
          }}
        />

        {/* Time & calories overlay */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            left: 10,
            display: 'flex',
            gap: 1.5,
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
            <AccessTimeIcon sx={{ fontSize: 13, color: 'rgba(255,255,255,0.9)' }} />
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 700 }}>
              {totalTime}m
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
            <LocalFireDepartmentIcon sx={{ fontSize: 13, color: '#FFC107' }} />
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 700 }}>
              {recipe.calories} cal
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
            <PeopleIcon sx={{ fontSize: 13, color: 'rgba(255,255,255,0.9)' }} />
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 700 }}>
              {recipe.servings}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Content */}
      <CardContent
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: { xs: 1.5, sm: 2 } }}
      >
        <Typography
          variant="body1"
          fontWeight={800}
          sx={{
            mb: 0.5,
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {recipe.title}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            mb: 1.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.5,
          }}
        >
          {recipe.description}
        </Typography>

        {/* Diet tags */}
        {recipe.dietTags.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1.5 }}>
            {recipe.dietTags.slice(0, 3).map(tag => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  height: 18,
                  fontSize: 10,
                  backgroundColor: `${DIET_COLORS[tag]}22`,
                  color: DIET_COLORS[tag],
                }}
              />
            ))}
          </Box>
        )}

        {/* Rating & author */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 'auto',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Rating
              value={recipe.rating}
              precision={0.1}
              readOnly
              size="small"
              sx={{ '& .MuiRating-icon': { fontSize: 14 } }}
            />
            <Typography variant="caption" color="text.secondary">
              ({recipe.reviewCount.toLocaleString()})
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Avatar sx={{ width: 20, height: 20, fontSize: 10, backgroundColor: cuisineColor }}>
              {recipe.author[0]}
            </Avatar>
            <Typography variant="caption" color="text.secondary" noWrap sx={{ maxWidth: 80 }}>
              {recipe.author}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export const RecipeCard = observer(RecipeCardComponent);
