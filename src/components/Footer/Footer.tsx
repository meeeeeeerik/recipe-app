import {
  Box,
  Container,
  Typography,
  IconButton,
  Divider,
  Grid,
  Link as MuiLink,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Link, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { themeStore } from '../../stores/themeStore';
import { recipeStore } from '../../stores/recipeStore';
import type { Cuisine, MealType } from '../../types';

const CUISINES: Cuisine[] = ['Italian', 'Asian', 'Mexican', 'Indian', 'French'];
const MEAL_TYPES: MealType[] = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'];

const ABOUT_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Favorites', to: '/favorites' },
  { label: 'About Us', to: '/about' },
];

const SOCIAL_LINKS = [
  { icon: <GitHubIcon />, href: 'https://github.com/meeeeeeerik', label: 'GitHub' },
  { icon: <TelegramIcon />, href: 'https://t.me/meeeeeeerik', label: 'Telegram' },
  { icon: <InstagramIcon />, href: 'https://www.instagram.com/meeeeeeerik/', label: 'Instagram' },
];

const filterLinkSx = {
  color: 'text.secondary',
  fontSize: 14,
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  p: 0,
  fontFamily: 'inherit',
  textAlign: 'left' as const,
  '&:hover': { color: 'primary.main' },
  transition: 'color 0.2s',
};

function FooterComponent() {
  const dark = themeStore.isDark;
  const navigate = useNavigate();

  function handleCuisine(cuisine: Cuisine) {
    recipeStore.clearFilters();
    recipeStore.setCuisine(cuisine);
    navigate('/');
  }

  function handleMealType(mealType: MealType) {
    recipeStore.clearFilters();
    recipeStore.setMealType(mealType);
    navigate('/');
  }

  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        borderTop: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.07)',
        backgroundColor: 'background.paper',
        pt: 5,
        pb: 3,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4} mb={4}>
          {/* Brand */}
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <RestaurantIcon sx={{ color: 'primary.main', fontSize: 26 }} />

              <Typography variant="h6" fontWeight={900}>
                Tasty<span style={{ color: '#FF6B35' }}>Hub</span>
              </Typography>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, lineHeight: 1.7, maxWidth: 280 }}
            >
              Your go-to source for delicious recipes from every corner of the world. Cook, share,
              and enjoy!
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              {SOCIAL_LINKS.map(s => (
                <IconButton
                  key={s.label}
                  component="a"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    color: 'text.secondary',
                    border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                    '&:hover': { color: 'primary.main', borderColor: 'primary.main' },
                    transition: 'all 0.2s',
                  }}
                >
                  {s.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Cuisines */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" fontWeight={800} mb={1.5}>
              Cuisines
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
              {CUISINES.map(c => (
                <Box key={c} component="button" onClick={() => handleCuisine(c)} sx={filterLinkSx}>
                  {c}
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Meal Types */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" fontWeight={800} mb={1.5}>
              Meal Types
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
              {MEAL_TYPES.map(m => (
                <Box key={m} component="button" onClick={() => handleMealType(m)} sx={filterLinkSx}>
                  {m}
                </Box>
              ))}
            </Box>
          </Grid>

          {/* About */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" fontWeight={800} mb={1.5}>
              About
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
              {ABOUT_LINKS.map(({ label, to }) => (
                <MuiLink
                  key={label}
                  component={Link}
                  to={to}
                  underline="none"
                  sx={{
                    color: 'text.secondary',
                    fontSize: 14,
                    '&:hover': { color: 'primary.main' },
                    transition: 'color 0.2s',
                  }}
                >
                  {label}
                </MuiLink>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ opacity: 0.08, mb: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="caption" color="text.disabled">
            © {new Date().getFullYear()} TastyHub. All rights reserved.
          </Typography>

          <Typography variant="caption" color="text.disabled">
            Built with React · MobX · Material UI
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export const Footer = observer(FooterComponent);
