<template>
  <div>
    <h2>Новое письмо</h2>

    <input v-model="title" placeholder="Тема"><br>
    <textarea v-model="body" placeholder="Текст"></textarea><br>

    <button @click="add">Отправить</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('')
const body = ref('')

const API = "https://69c7ffd063393440b317571e.mockapi.io/gabe/mail/incoming_messages/gabe_mail"

async function add(){
  await fetch(API,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({title:title.value, body:body.value})
  })
  alert("Отправлено")
}
</script>