import { defineStore } from 'pinia'

export const useDogStore = defineStore('dog', {
  state: () => ({
    image: '',
    loading: false
  }),

  actions: {
    async fetchDog() {
      this.loading = true
      const res = await fetch('https://dog.ceo/api/breeds/image/random')
      const data = await res.json()
      this.image = data.message
      this.loading = false
    }
  }
})