export type Cuisine =
  | 'Italian'
  | 'Asian'
  | 'Mexican'
  | 'American'
  | 'Mediterranean'
  | 'Indian'
  | 'French'
  | 'Japanese';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Dessert';
export type DietTag = 'Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Dairy-Free' | 'Keto' | 'Healthy';

export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export interface Instruction {
  step: number;
  text: string;
  duration?: number; // minutes
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  cuisine: Cuisine;
  difficulty: Difficulty;
  mealType: MealType;
  dietTags: DietTag[];
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  rating: number;
  reviewCount: number;
  calories: number;
  ingredients: Ingredient[];
  instructions: Instruction[];
  nutrition: NutritionInfo;
  author: string;
  tips?: string[];
}
