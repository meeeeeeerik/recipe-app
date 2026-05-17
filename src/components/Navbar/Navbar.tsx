import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
  Badge,
  Tooltip,
  Container,
  alpha,
  styled,
  Drawer,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import CloseIcon from '@mui/icons-material/Close';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MenuIcon from '@mui/icons-material/Menu';
import { observer } from 'mobx-react-lite';

import { recipeStore } from '../../stores/recipeStore';
import { themeStore } from '../../stores/themeStore';

const SearchBox = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: alpha(theme.palette.text.primary, 0.06),
  borderRadius: 50,
  padding: '5px 16px',
  transition: 'all 0.2s',
  '&:focus-within': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    outline: `2px solid ${theme.palette.primary.main}`,
  },
}));

function NavbarComponent() {
  const navigate = useNavigate();
  const dark = themeStore.isDark;
  const favCount = recipeStore.favoriteIds.length;
  const [localQuery, setLocalQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  function handleSearch(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && localQuery.trim()) {
      recipeStore.setSearch(localQuery);
      navigate('/');
      setDrawerOpen(false);
    }
  }

  function handleClear() {
    setLocalQuery('');
    recipeStore.setSearch('');
  }

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: dark ? 'rgba(13,15,10,0.92)' : 'rgba(250,250,245,0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.07)',
          color: 'text.primary',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ px: { xs: 0 }, gap: 2, minHeight: { xs: 56, sm: 64 } }}>
            {/* Logo */}
            <Box
              component={Link}
              to="/"
              onClick={() => recipeStore.clearFilters()}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                textDecoration: 'none',
                mr: 'auto',
              }}
            >
              <RestaurantIcon sx={{ color: 'primary.main', fontSize: 28 }} />

              <Typography variant="h6" fontWeight={900} sx={{ color: 'text.primary' }}>
                Tasty<span style={{ color: '#FF6B35' }}>Hub</span>
              </Typography>
            </Box>

            {/* Desktop: search */}
            <SearchBox sx={{ width: 260, display: { xs: 'none', md: 'flex' } }}>
              <SearchIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 18 }} />

              <InputBase
                placeholder="Search recipes..."
                value={localQuery}
                onChange={e => setLocalQuery(e.target.value)}
                onKeyDown={handleSearch}
                sx={{ color: 'text.primary', flex: 1, fontSize: 14 }}
              />

              {localQuery && (
                <IconButton size="small" onClick={handleClear} sx={{ p: 0.3 }}>
                  <CloseIcon sx={{ fontSize: 14 }} />
                </IconButton>
              )}
            </SearchBox>

            {/* Desktop: favorites */}
            <Tooltip title="Favorites">
              <IconButton
                component={Link}
                to="/favorites"
                sx={{ color: 'text.secondary', display: { xs: 'none', md: 'inline-flex' } }}
              >
                <Badge badgeContent={favCount} color="primary">
                  <FavoriteIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Desktop: theme toggle */}
            <Tooltip title="Toggle theme">
              <IconButton
                onClick={themeStore.toggleTheme}
                sx={{ color: 'text.secondary', display: { xs: 'none', md: 'inline-flex' } }}
              >
                {dark ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>

            {/* Mobile: hamburger */}
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ color: 'text.primary', display: { xs: 'inline-flex', md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: dark ? '#0D0F0A' : '#FAFAF5',
            backgroundImage: 'none',
            pt: 2,
            px: 3,
            pb: 4,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <RestaurantIcon sx={{ color: 'primary.main', fontSize: 22 }} />

            <Typography variant="h6" fontWeight={900} sx={{ color: 'text.primary' }}>
              Tasty<span style={{ color: '#FF6B35' }}>Hub</span>
            </Typography>
          </Box>

          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'text.secondary' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <SearchBox sx={{ mb: 3 }}>
          <SearchIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 18 }} />

          <InputBase
            placeholder="Search recipes..."
            value={localQuery}
            onChange={e => setLocalQuery(e.target.value)}
            onKeyDown={handleSearch}
            sx={{ color: 'text.primary', flex: 1, fontSize: 14 }}
          />

          {localQuery && (
            <IconButton size="small" onClick={handleClear} sx={{ p: 0.3 }}>
              <CloseIcon sx={{ fontSize: 14 }} />
            </IconButton>
          )}
        </SearchBox>

        <Divider sx={{ opacity: 0.1, mb: 2 }} />

        <Box
          component={Link}
          to="/favorites"
          onClick={() => setDrawerOpen(false)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            textDecoration: 'none',
            color: 'text.primary',
            py: 1.2,
            px: 1.5,
            borderRadius: 2,
            mb: 1,
            '&:hover': { backgroundColor: alpha('#FF6B35', 0.08) },
            transition: 'background-color 0.2s',
          }}
        >
          <Badge badgeContent={favCount} color="primary">
            <FavoriteIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
          </Badge>

          <Typography variant="body2" fontWeight={600}>
            Favorites
          </Typography>
        </Box>

        <Divider sx={{ opacity: 0.1, my: 2 }} />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 1.5,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {dark ? 'Dark mode' : 'Light mode'}
          </Typography>

          <IconButton onClick={themeStore.toggleTheme} sx={{ color: 'text.secondary' }}>
            {dark ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
      </Drawer>
    </>
  );
}

export const Navbar = observer(NavbarComponent);
