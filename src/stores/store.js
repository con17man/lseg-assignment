import { defineStore } from 'pinia';
import fetcher from '@/helpers/fetcher';

const DATA_STORE_OBJ = {
  error: null,
  isLoading: false,
  data: null,
};

export const useMainStore = defineStore('store', {
  state: () => ({
    topStocks: { ...DATA_STORE_OBJ },
    error: null,
  }),

  getters: {
    // hasDataFetched: state => {
    //   return state.topStocks.data;
    // },
    getStockExchanges: ({ topStocks }) => {
      if (topStocks.data) {
        return topStocks.data.map(({ code, stockExchange }) => {
          return { code, stockExchange };
        });
      }

      return [];
    },
  },

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
      return await this.getData({
        mutationKey: 'topStocks',
        url: '/data/dummy_data.json',
      });
    },
  },
});
