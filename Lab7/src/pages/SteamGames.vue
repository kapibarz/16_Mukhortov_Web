<template>
  <div>
    <h2>Игры</h2>

    <div v-if="store.loading">Загрузка...</div>

    <table v-if="store.games.length">
      <tr v-for="(g, i) in store.games" :key="i">
        <td>{{ i+1 }}</td>
        <td>{{ g.name }}</td>
        <td>{{ g.ccu }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useGamesStore } from '../store/games'

const store = useGamesStore()

onMounted(() => {
  store.fetchGames()
})
</script>