<template>
  <div>
    <h2>Все письма</h2>

    <div v-for="msg in data" :key="msg.id" style="border:1px solid #ccc; margin:10px; padding:10px">
      <b>ID:</b> {{ msg.id }} <br>
      <b>Тема:</b> {{ msg.title }} <br>
      <b>Текст:</b> {{ msg.body }} <br>

      <button @click="deleteMsg(msg.id)">Удалить</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['data'])

const API_URL = "https://69c7ffd063393440b317571e.mockapi.io/gabe/mail/incoming_messages/gabe_mail"

async function deleteMsg(id){
  await fetch(API_URL + '/' + id, { method:'DELETE' })
  location.reload()
}
</script>