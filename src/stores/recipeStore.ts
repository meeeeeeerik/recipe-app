import { makeAutoObservable } from 'mobx';
import type { Recipe, Cuisine, Difficulty, MealType, DietTag } from '../types';
import { RECIPES } from '../utils/mockData';

class RecipeStore {
  // Data
  recipes: Recipe[] = RECIPES;
  favoriteIds: string[] = [];

  // Filters
  searchQuery = '';
  selectedCuisine: Cuisine | 'All' = 'All';
  selectedDifficulty: Difficulty | 'All' = 'All';
  selectedMealType: MealType | 'All' = 'All';
  selectedDietTag: DietTag | 'All' = 'All';
  sortBy: 'rating' | 'time' | 'calories' | 'newest' = 'rating';
  maxTime: number = 300;

  constructor() {
    makeAutoObservable(this);
    this.loadFavorites();
  }

  // ── Setters ──────────────────────────────────────────────
  setSearch = (q: string) => {
    this.searchQuery = q;
  };
  setCuisine = (c: Cuisine | 'All') => {
    this.selectedCuisine = c;
  };
  setDifficulty = (d: Difficulty | 'All') => {
    this.selectedDifficulty = d;
  };
  setMealType = (m: MealType | 'All') => {
    this.selectedMealType = m;
  };
  setDietTag = (t: DietTag | 'All') => {
    this.selectedDietTag = t;
  };
  setSortBy = (s: typeof this.sortBy) => {
    this.sortBy = s;
  };
  setMaxTime = (t: number) => {
    this.maxTime = t;
  };
  clearFilters = () => {
    this.searchQuery = '';
    this.selectedCuisine = 'All';
    this.selectedDifficulty = 'All';
    this.selectedMealType = 'All';
    this.selectedDietTag = 'All';
    this.sortBy = 'rating';
    this.maxTime = 300;
  };

  // ── Favorites ────────────────────────────────────────────
  toggleFavorite = (id: string) => {
    const idx = this.favoriteIds.indexOf(id);
    if (idx >= 0) this.favoriteIds.splice(idx, 1);
    else this.favoriteIds.push(id);
    localStorage.setItem('recipe_favs', JSON.stringify(this.favoriteIds));
  };

  isFavorite = (id: string) => this.favoriteIds.includes(id);

  private loadFavorites = () => {
    const raw = localStorage.getItem('recipe_favs');
    if (raw) this.favoriteIds = JSON.parse(raw);
  };

  // ── Computed ─────────────────────────────────────────────
  get filteredRecipes(): Recipe[] {
    let result = this.recipes.filter(r => {
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        const match =
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.cuisine.toLowerCase().includes(q) ||
          r.ingredients.some(i => i.name.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (this.selectedCuisine !== 'All' && r.cuisine !== this.selectedCuisine) return false;
      if (this.selectedDifficulty !== 'All' && r.difficulty !== this.selectedDifficulty)
        return false;
      if (this.selectedMealType !== 'All' && r.mealType !== this.selectedMealType) return false;
      if (this.selectedDietTag !== 'All' && !r.dietTags.includes(this.selectedDietTag))
        return false;
      if (r.prepTime + r.cookTime > this.maxTime) return false;
      return true;
    });

    return result.sort((a, b) => {
      if (this.sortBy === 'rating') return b.rating - a.rating;
      if (this.sortBy === 'time') return a.prepTime + a.cookTime - (b.prepTime + b.cookTime);
      if (this.sortBy === 'calories') return a.calories - b.calories;
      return 0;
    });
  }

  get favoriteRecipes(): Recipe[] {
    return this.recipes.filter(r => this.favoriteIds.includes(r.id));
  }

  get featuredRecipes(): Recipe[] {
    return [...this.recipes].sort((a, b) => b.rating - a.rating).slice(0, 4);
  }

  getById = (id: string): Recipe | undefined => this.recipes.find(r => r.id === id);

  get hasActiveFilters(): boolean {
    return (
      this.searchQuery !== '' ||
      this.selectedCuisine !== 'All' ||
      this.selectedDifficulty !== 'All' ||
      this.selectedMealType !== 'All' ||
      this.selectedDietTag !== 'All' ||
      this.maxTime < 300
    );
  }
}

export const recipeStore = new RecipeStore();
