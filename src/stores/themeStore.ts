import { makeAutoObservable } from 'mobx';

class ThemeStore {
  isDark = localStorage.getItem('recipe_dark') !== 'false';
  toggleTheme = () => {
    this.isDark = !this.isDark;
    localStorage.setItem('recipe_dark', String(this.isDark));
  };
  constructor() {
    makeAutoObservable(this);
  }
}

export const themeStore = new ThemeStore();
