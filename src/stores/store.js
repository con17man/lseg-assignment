import { defineStore } from 'pinia';
import fetcher from '@/helpers/fetcher';

const DATA_STORE_OBJ = {
  error: null,
  isLoading: false,
  data: null,
};

export const useMainStore = defineStore('store', {
  state: () => ({
    topExchangeMarkets: { ...DATA_STORE_OBJ },
    selectedExchange: null,
    selectedStock: null,
    error: null,
  }),

  getters: {
    // hasDataFetched: state => {
    //   return state.topExchangeMarkets.data;
    // },
    getStockExchanges: ({ topExchangeMarkets }) => {
      if (topExchangeMarkets.data) {
        return topExchangeMarkets.data.map(({ code, stockExchange }) => {
          return { code, stockExchange };
        });
      }

      return [];
    },

    getMarketTopStocks: ({ topExchangeMarkets, selectedExchange }) => {
      if (selectedExchange) {
        const [obj] = topExchangeMarkets.data.filter(
          market => market.code === selectedExchange,
        );

        return obj.topStocks;
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

    async fetchTopExchangeMarkets() {
      return await this.getData({
        mutationKey: 'topExchangeMarkets',
        url: '/data/dummy_data.json',
      });
    },
  },
});
