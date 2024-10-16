<script setup>
import { reactive } from 'vue';
import LsegButton from './LsegButton.vue';

const data = reactive({
  chatToggle: false
});

const emit = defineEmits(['startChat']);

const toggleConversationView = () => {
  data.chatToggle = !data.chatToggle;

  if (data.chatToggle) {
    emit('startChat');
  }
};
</script>

<template>
  <section class="chat">
    <lseg-button class="btn--rounded" @click="toggleConversationView">
      <i v-if="!data.chatToggle" class="fa-solid fa-plus"></i>
      <i v-else class="fa-solid fa-close"></i>
    </lseg-button>

    <!-- Chat window -->
  </section>
</template>

<style scoped lang="scss">
.chat {
  @apply absolute bottom-8 right-8;
}
</style>