import { defineStore } from 'pinia'

const API_URL = "https://69c7ffd063393440b317571e.mockapi.io/gabe/mail/incoming_messages/gabe_mail"

export const useMessagesStore = defineStore('messages', {
  state: () => ({
    messages: [] as any[],
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchMessages() {
      this.loading = true
      try {
        const res = await fetch(API_URL)
        this.messages = await res.json()
      } catch {
        this.error = "Ошибка"
      } finally {
        this.loading = false
      }
    }
  }
})