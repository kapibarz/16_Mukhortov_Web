<template>
  <div>
    <h2>Собака Гейба</h2>
    <img :src="data.message" style="max-width:100%">
    <br>
    <button @click="$emit('reloadDog')">Ещё собаку</button>
  </div>
</template>

<script setup>
defineProps(['data'])
</script>