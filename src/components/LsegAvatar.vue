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
  @apply flex justify-center items-center grow w-10 h-10 text-blue border-2 border-blue rounded-full;
}
</style>
