<template>
  <div>
    <h2>Удалить</h2>

    <input v-model="id" placeholder="ID"><br>

    <button @click="del">Удалить</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const id = ref('')

const API = "https://69c7ffd063393440b317571e.mockapi.io/gabe/mail/incoming_messages/gabe_mail"

async function del(){
  await fetch(API+'/'+id.value,{method:'DELETE'})
  alert("Удалено")
}
</script>