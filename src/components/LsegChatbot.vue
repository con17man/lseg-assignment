<script setup>
import { reactive } from 'vue';
import LsegButton from './LsegButton.vue';

const data = reactive({
  chatToggle: false
});

const emit = defineEmits(['startChat']);

/**
 * @description show/hide conversation chat & fetch required data
 */
const toggleConversationView = () => {
  data.chatToggle = !data.chatToggle;

  if (data.chatToggle) {
    emit('startChat');
  }
};

</script>

<template>
  <lseg-button class="btn--rounded absolute bottom-8 right-8" @click="toggleConversationView">
    <i v-if="!data.chatToggle" class="fa-solid fa-robot"></i>
    <i v-else class="fa-solid fa-close"></i>
  </lseg-button>

  <!-- Chat window -->
  <div v-if="data.chatToggle" class="chat">
    hey
  </div>
</template>

<style scoped lang="scss">
.chat {
  @apply absolute bottom-8 right-24 border-2 border-blue rounded-2xl p-2 w-2/3 max-w-[600px] h-[600px];
}
</style>