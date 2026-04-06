<template>
  <div>
    <h2>Редактировать</h2>

    <input v-model="id" placeholder="ID"><br>
    <input v-model="title" placeholder="Тема"><br>
    <textarea v-model="body"></textarea><br>

    <button @click="update">Обновить</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const id = ref('')
const title = ref('')
const body = ref('')

const API = "https://69c7ffd063393440b317571e.mockapi.io/gabe/mail/incoming_messages/gabe_mail"

async function update(){
  await fetch(API+'/'+id.value,{
    method:'PUT',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({title:title.value, body:body.value})
  })
  alert("Обновлено")
}
</script>