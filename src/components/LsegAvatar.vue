<script setup>
const props = defineProps({
  isUser: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div :class="['chat__avatar', { 'order-last': props.isUser }]">
    <i
      :class="['fa-solid', props.isUser ? 'fa-user-astronaut' : 'fa-robot']"
    ></i>
  </div>
</template>

<style scoped lang="scss">
.chat__avatar {
  @apply flex justify-center items-center grow w-6 text-sm sm:w-10 h-6 sm:h-10 text-blue sm:border-2 sm:border-blue rounded-full;
}
</style>
