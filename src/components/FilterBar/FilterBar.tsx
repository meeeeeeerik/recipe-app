import {
  Box,
  Container,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Slider,
  Typography,
  Collapse,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { recipeStore } from '../../stores/recipeStore';
import { themeStore } from '../../stores/themeStore';
import type { Cuisine, Difficulty, MealType, DietTag } from '../../types';

const CUISINES: (Cuisine | 'All')[] = [
  'All',
  'Italian',
  'Asian',
  'Mexican',
  'American',
  'Mediterranean',
  'Indian',
  'French',
  'Japanese',
];

const DIFFICULTIES: (Difficulty | 'All')[] = ['All', 'Easy', 'Medium', 'Hard'];

const MEAL_TYPES: (MealType | 'All')[] = [
  'All',
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snack',
  'Dessert',
];

const DIET_TAGS: (DietTag | 'All')[] = [
  'All',
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Keto',
  'Healthy',
];

const SORT_OPTIONS = [
  { value: 'rating', label: 'Top Rated' },
  { value: 'time', label: 'Quickest' },
  { value: 'calories', label: 'Lowest Cal' },
];

const SORT_LABELS = SORT_OPTIONS.reduce(
  (acc, s) => ({ ...acc, [s.value]: s.label }),
  {} as Record<string, string>
);

const FILTER_FIELDS = [
  {
    label: 'Cuisine',
    items: CUISINES,
    getValue: () => recipeStore.selectedCuisine,
    setter: (v: string) => recipeStore.setCuisine(v as Cuisine | 'All'),
  },
  {
    label: 'Difficulty',
    items: DIFFICULTIES,
    getValue: () => recipeStore.selectedDifficulty,
    setter: (v: string) => recipeStore.setDifficulty(v as Difficulty | 'All'),
  },
  {
    label: 'Diet',
    items: DIET_TAGS,
    getValue: () => recipeStore.selectedDietTag,
    setter: (v: string) => recipeStore.setDietTag(v as DietTag | 'All'),
  },
  {
    label: 'Sort By',
    items: SORT_OPTIONS.map(s => s.value),
    labels: SORT_LABELS,
    getValue: () => recipeStore.sortBy,
    setter: (v: string) => recipeStore.setSortBy(v as typeof recipeStore.sortBy),
  },
];

function FilterBarComponent() {
  const [open, setOpen] = useState(false);
  const dark = themeStore.isDark;

  return (
    <Box
      sx={{
        borderBottom: dark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.06)',
        backgroundColor: 'background.paper',
        py: 1,
      }}
    >
      <Container maxWidth="xl">
        {/* Quick filters row */}
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Meal type chips */}
          <Box
            sx={{
              display: 'flex',
              gap: 0.8,
              overflowX: 'auto',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {MEAL_TYPES.map(m => (
              <Chip
                key={m}
                label={m}
                size="small"
                onClick={() => recipeStore.setMealType(m as MealType | 'All')}
                sx={{
                  flexShrink: 0,
                  backgroundColor:
                    recipeStore.selectedMealType === m ? 'primary.main' : 'transparent',
                  color: recipeStore.selectedMealType === m ? 'white' : 'text.secondary',
                  border: '1.5px solid',
                  borderColor: recipeStore.selectedMealType === m ? 'primary.main' : 'divider',
                  '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
                }}
              />
            ))}
          </Box>

          <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
            {recipeStore.hasActiveFilters && (
              <Button
                size="small"
                startIcon={<ClearIcon />}
                onClick={recipeStore.clearFilters}
                color="error"
                variant="outlined"
                sx={{ borderRadius: 8, height: 32 }}
              >
                Clear
              </Button>
            )}

            <Button
              size="small"
              startIcon={<FilterListIcon />}
              onClick={() => setOpen(!open)}
              variant={open ? 'contained' : 'outlined'}
              sx={{ borderRadius: 8, height: 32 }}
            >
              Filters
            </Button>
          </Box>
        </Box>

        {/* Expanded filters */}
        <Collapse in={open}>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              mt: 2,
              mb: 1,
              flexWrap: 'wrap',
              alignItems: 'flex-end',
            }}
          >
            {FILTER_FIELDS.map(f => (
              <FormControl key={f.label} size="small" sx={{ minWidth: 130 }}>
                <InputLabel>{f.label}</InputLabel>

                <Select
                  value={f.getValue()}
                  label={f.label}
                  onChange={e => f.setter(e.target.value)}
                >
                  {f.items.map(item => (
                    <MenuItem key={item} value={item}>
                      {f.labels?.[item] ?? item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}

            {/* Max time slider */}
            <Box sx={{ minWidth: 180 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                Max Time: {recipeStore.maxTime >= 300 ? 'Any' : `${recipeStore.maxTime} min`}
              </Typography>

              <Slider
                value={recipeStore.maxTime}
                min={15}
                max={300}
                step={15}
                onChange={(_, v) => recipeStore.setMaxTime(v as number)}
                color="primary"
                size="small"
                sx={{ mt: 0.5 }}
              />
            </Box>
          </Box>
        </Collapse>
      </Container>
    </Box>
  );
}

export const FilterBar = observer(FilterBarComponent);
