<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useMainStore } from './stores/store';
import { onMounted } from 'vue';

const store = useMainStore();

onMounted(async () => {
  await store.fetchTopStocks();
});

</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped lang="scss"></style>
