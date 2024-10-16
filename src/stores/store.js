import { defineStore } from 'pinia';

export const useStore = defineStore('store', {
  state: () => ({
    stocks: null,
  }),

  getters: {},

  actions: {
    async fetchTopStocks() {
      // TODO -- fetch dummy data
    },
  },
});
