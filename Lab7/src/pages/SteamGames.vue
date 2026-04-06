<template>
  <div>
    <h2>Топ игр Steam</h2>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Игра</th>
          <th>Онлайн</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(game, i) in games" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ game.name }}</td>
          <td>{{ game.ccu }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const games = ref([])

onMounted(async () => {
  const res = await fetch('/games.json')
  const data = await res.json()
  games.value = data.games.sort((a,b)=>b.ccu-a.ccu)
})
</script>