<template>
  <div>
    <input v-model="title" placeholder="Тема" />
    <textarea v-model="body"></textarea>
    <button @click="send">Отправить</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('')
const body = ref('')

function send() {
  alert("Отправлено (заглушка)")
}
</script>