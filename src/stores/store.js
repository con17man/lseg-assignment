import { defineStore } from 'pinia';
import fetcher from '@/helpers/fetcher';

const DATA_STORE_OBJ = {
  error: null,
  isLoading: false,
  data: null,
};

export const useStore = defineStore('store', {
  state: () => ({
    stocks: { ...DATA_STORE_OBJ },
    error: null,
  }),

  getters: {},

  actions: {
    async getData({ mutationKey, url, props, options }) {
      this[mutationKey] = {
        isLoading: true,
        data: null,
        error: null,
        ...props,
      };

      const data = await fetcher(url, options).catch(
        error => (this.error = error),
      );

      const payload = {
        isLoading: false,
        data: null,
        error: null,
        ...props,
      };

      if (data) {
        if (!data.error) {
          payload.data = data;
        } else {
          payload.error = data.error;
        }
      }

      this[mutationKey] = payload;

      return payload;
    },

    async fetchTopStocks() {
      // TODO -- fetch dummy data
    },
  },
});
