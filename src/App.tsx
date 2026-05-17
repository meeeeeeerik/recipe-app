import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { getTheme } from './theme';
import { themeStore } from './stores/themeStore';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { Home } from './pages/Home/Home';
import { RecipeDetail } from './pages/RecipeDetail/RecipeDetail';
import { Favorites } from './pages/Favorites/Favorites';
import { About } from './pages/About/About';
import { NotFound } from './pages/NotFound/NotFound';

function AppComponent() {
  return (
    <ThemeProvider theme={getTheme(themeStore.isDark)}>
      <CssBaseline />

      <BrowserRouter>
        <Box
          sx={{
            minHeight: '100vh',
            backgroundColor: 'background.default',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Navbar />

          <Box sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>

          <Footer />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export const App = observer(AppComponent);
