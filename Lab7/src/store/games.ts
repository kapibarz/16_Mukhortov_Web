import { defineStore } from 'pinia'

export const useGamesStore = defineStore('games', {
  state: () => ({
    games: [] as any[],
    loading: false
  }),

  actions: {
    async fetchGames() {
      this.loading = true
      try {
        const res = await fetch('/games.json')
        const data = await res.json()
        this.games = data.games
      } finally {
        this.loading = false
      }
    }
  }
})