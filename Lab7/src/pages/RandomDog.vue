<template>
  <div>
    <h2>Собака</h2>
    <button @click="store.fetchDog()">Обновить</button>
    <img :src="store.image" v-if="store.image" />
  </div>
</template>

<script setup>
import { useDogStore } from '../store/dog'
import { onMounted } from 'vue'

const store = useDogStore()

onMounted(() => {
  store.fetchDog()
})
</script>