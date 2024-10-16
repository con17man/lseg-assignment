import { defineStore } from 'pinia';

const DATA_STORE_OBJ = {
  error: null,
  isLoading: false,
  data: null,
};

export const useStore = defineStore('store', {
  state: () => ({
    stocks: { ...DATA_STORE_OBJ },
  }),

  getters: {},

  actions: {
    async fetchTopStocks() {
      // TODO -- fetch dummy data
    },
  },
});
