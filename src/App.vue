<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useMainStore } from './stores/store';

import LsegChatbot from './components/LsegChatbot.vue';

const store = useMainStore();
</script>

<template>
  <section class="header">
    <p class="header-title">LSEG Chatbot POC</p>
    <nav class="header-nav">
      <RouterLink class="header-nav__item" to="/">Home</RouterLink>
      <RouterLink class="header-nav__item" to="/about">About</RouterLink>
    </nav>
  </section>

  <RouterView />

  <!-- Chatbot -->
  <lseg-chatbot
    @start-chat="store.fetchTopStocks"
    :stock-exchanges="store.getStockExchanges"
  />
</template>

<style scoped lang="scss">
.header {
  @apply flex justify-between px-16 py-4 mx-auto text-white bg-blue;

  &-title {
    @apply font-bold;
  }

  &-nav {
    &__item {
      @apply ml-4 hover:underline hover:underline-offset-4;

      &--active {
        @apply underline underline-offset-4;
      }
    }
  }
}
</style>
