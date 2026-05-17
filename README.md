# 🍳 TastyHub — Recipe & Cooking App

A modern recipe discovery app built with React, TypeScript, MobX, and Material UI.

## Tech Stack

- **React 18** + **TypeScript**
- **MobX** — reactive state (recipes, filters, favorites, theme)
- **Material UI v5** — UI components & theming
- **React Router v6** — routing
- **Vite** — build tool

## Features

- 🍽️ 12 hand-crafted recipes across 8 cuisines
- 🔍 Search by title, description, cuisine or ingredient
- 🎛️ Filter by cuisine, difficulty, meal type, diet tags, max time
- 📄 Full recipe detail: ingredients (scalable servings!), step-by-step instructions
- ✅ Interactive cooking mode — check off steps as you go
- 📊 Nutrition info with macro breakdown
- ❤️ Favorites saved in localStorage
- 🌙 Dark / Light theme
- 📱 Fully responsive

## Getting Started

```bash
npm install
npm run dev
```

## MobX Store — recipeStore

All state lives in one reactive store:
- `filteredRecipes` — computed, reacts to all filter changes
- `favoriteRecipes` — computed list of saved recipes
- `toggleFavorite()` — persists to localStorage
- Filters: cuisine, difficulty, mealType, dietTag, maxTime, searchQuery, sortBy

## Project Structure

```
src/
├── stores/       # MobX: recipeStore, themeStore
├── components/   # Navbar, Footer, RecipeCard, FilterBar
├── pages/        # Home, RecipeDetail, Favorites, NotFound
├── utils/        # mockData (12 recipes), format
├── types/        # TypeScript interfaces
└── theme/        # MUI theme + color maps
```
