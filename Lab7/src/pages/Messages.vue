<template>
  <div>
    <h2>Письма</h2>

    <div v-for="m in store.messages" :key="m.id">
      {{ m.title }} - {{ m.body }}
    </div>
  </div>
</template>

<script setup>
import { useMessagesStore } from '../store/messages'
import { onMounted } from 'vue'

const store = useMessagesStore()

onMounted(() => {
  store.fetchMessages()
})
</script>