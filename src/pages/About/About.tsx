import { Container, Typography, Box, Grid, Paper, Avatar } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import { observer } from 'mobx-react-lite';

import { themeStore } from '../../stores/themeStore';

const FEATURES = [
  {
    icon: <SearchIcon fontSize="inherit" />,
    title: 'Discover',
    desc: 'Browse hundreds of recipes from cuisines around the world, filtered by meal type, diet, and more.',
  },
  {
    icon: <FavoriteIcon fontSize="inherit" />,
    title: 'Save Favorites',
    desc: 'Bookmark the recipes you love and come back to them anytime — your list is saved locally.',
  },
  {
    icon: <RestaurantIcon fontSize="inherit" />,
    title: 'Cook',
    desc: 'Clear step-by-step instructions with timings, ingredient lists, and handy cooking tips.',
  },
];

function AboutComponent() {
  const dark = themeStore.isDark;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      {/* Hero */}
      <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1.5,
            mb: 2,
          }}
        >
          <RestaurantIcon sx={{ color: 'primary.main', fontSize: { xs: 32, md: 44 } }} />

          <Typography variant="h3" fontWeight={900} sx={{ fontSize: { xs: '2rem', md: '2.8rem' } }}>
            Tasty<span style={{ color: '#FF6B35' }}>Hub</span>
          </Typography>
        </Box>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            maxWidth: 520,
            mx: 'auto',
            lineHeight: 1.7,
            fontSize: { xs: '1rem', md: '1.15rem' },
          }}
        >
          A place where food lovers come to explore, cook, and share incredible recipes from every
          corner of the world.
        </Typography>
      </Box>

      {/* Feature cards */}
      <Grid container spacing={3} mb={{ xs: 6, md: 8 }}>
        {FEATURES.map(f => (
          <Grid item xs={12} md={4} key={f.title}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                height: '100%',
                textAlign: 'center',
                border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.07)',
              }}
            >
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  width: 56,
                  height: 56,
                  fontSize: 28,
                  mx: 'auto',
                  mb: 2,
                }}
              >
                {f.icon}
              </Avatar>

              <Typography variant="h6" fontWeight={800} mb={1}>
                {f.title}
              </Typography>

              <Typography variant="body2" color="text.secondary" lineHeight={1.8}>
                {f.desc}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Story */}
      <Box
        sx={{
          maxWidth: 660,
          mx: 'auto',
          textAlign: 'center',
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.07)',
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="h5" fontWeight={800} mb={2}>
          Our Story
        </Typography>

        <Typography variant="body1" color="text.secondary" lineHeight={1.85}>
          TastyHub was born from a simple idea: cooking is better when shared. We built this app to
          make it easy to discover new dishes, save your favorites, and follow recipes without the
          fluff. Whether you're a seasoned chef or just starting out, there's something here for
          everyone.
        </Typography>
      </Box>
    </Container>
  );
}

export const About = observer(AboutComponent);
