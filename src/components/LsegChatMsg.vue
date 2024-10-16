<script setup>

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: false
  },
  isUser: {
    type: Boolean,
    default: false
  }
});

</script>

<template>
  <div class="chat__msg">
    this is a message
    <slot />
  </div>
</template>

<style scoped lang="scss">
.chat__msg {
  @apply w-8/12 flex flex-wrap
}
</style>