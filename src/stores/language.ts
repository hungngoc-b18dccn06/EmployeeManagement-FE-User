// store/language.js
import { defineStore } from 'pinia';

export const useLanguageStore = defineStore('language', {
  state: () => ({
    showLanguageDropdown: true,
  }),
  actions: {
    toggleLanguageDropdown() {
      this.showLanguageDropdown = !this.showLanguageDropdown;
    },
  },
});
