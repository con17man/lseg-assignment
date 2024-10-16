<script setup>

defineProps({
  label: {
    type: String,
    required: false
  }
});

</script>

<template>
  <button class="btn">
    {{ label }}
    <slot />
  </button>
</template>

<style scoped lang="scss">
.btn {
  @apply rounded-full px-8 py-2 text-white bg-blue border-2 border-blue;

  &:hover,
  &:focus {
    @apply text-blue bg-white outline-none;
  }

  &--rounded {
    @apply w-12 h-12 p-2 border-blue;
  }
}
</style>