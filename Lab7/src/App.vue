<template>
  <header>STEAM STATS</header>

  <div class="ad-top">
    КУПИ СКИНЫ СО СКИДКОЙ 90%
  </div>

  <nav>
    <button @click="loadSteamGames">Игры Steam</button>
    <button @click="loadRandomDog">Случайная собака Гейба</button>
    <button @click="showAddGameForm">Написать Гейбу</button>
    <button @click="showUpdateGameForm">Исправить послание Гейбу</button>
    <button @click="showDeleteGameForm">Отозвать письмо у Гейба</button>
    <button @click="loadMessages">Письма</button>
  </nav>

  <section id="content">
    <component :is="currentView" 
      :data="data" 
      @reloadDog="loadRandomDog"
      @reloadMessages="loadMessages"
    />
  </section>

  <aside class="ad-side">
    <div class="ad-wrapper">
      <div class="ad-container">
        <button 
          v-for="(ad, i) in ads" 
          :key="i"
          class="ad-button"
          @click="openAd(ad.url)"
        >
          {{ ad.text }}
        </button>
      </div>
    </div>
  </aside>

  <footer>
    Это официальный сайт Steam, отвечаю
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import SteamGames from './pages/SteamGames.vue'
import RandomDog from './pages/RandomDog.vue'
import Messages from './pages/Messages.vue'
import AddMessage from './pages/AddMessage.vue'
import UpdateMessage from './pages/UpdateMessage.vue'
import DeleteMessage from './pages/DeleteMessage.vue'

const currentView = ref(null)
const data = ref(null)

const API_URL = "https://69c7ffd063393440b317571e.mockapi.io/gabe/mail/incoming_messages/gabe_mail"

const ads = ref([
  { text: "СКИНЫ CS2 ЗА КОПЕЙКИ", url: "https://lis-skins.com/" },
  { text: "КАЗИНО ДЛЯ ГЕЙМЕРОВ", url: "https://plg.bet/bets" },
  { text: "КРУТИ И ВЫИГРЫВАЙ", url: "http://csgetto.gold/" },
  { text: "ДОТА 2 БУСТ", url: "https://funpay.com/lots/82/" },
  { text: "ИГРЫ ДЕШЕВЛЕ", url: "https://ggsel.net/" },
  { text: "СКИНЫ CS2 ЗА КОПЕЙКИ", url: "https://lis-skins.com/" },
  { text: "КАЗИНО ДЛЯ ГЕЙМЕЙРОВ", url: "https://plg.bet/bets" },
  { text: "КРУТИ И ВЫИГРЫВАЙ", url: "http://csgetto.gold/" },
  { text: "ДОТА 2 БУСТ", url: "https://funpay.com/lots/82/" },
  { text: "ИГРЫ ДЕШЕВЛЕ", url: "https://ggsel.net/" },
  { text: "СКИНЫ CS2 ЗА КОПЕЙКИ", url: "https://lis-skins.com/" },
  { text: "КАЗИНО ДЛЯ ГЕЙМЕРОВ", url: "https://plg.bet/bets" },
  { text: "ИГРЫ ДЕШЕВЛЕ", url: "https://ggsel.net/" }
])

function openAd(url) {
  window.open(url, '_blank')
}

async function loadSteamGames() {
  currentView.value = SteamGames
}

async function loadRandomDog() {
  const res = await fetch("https://dog.ceo/api/breeds/image/random")
  data.value = await res.json()
  currentView.value = RandomDog
}

async function loadMessages() {
  const res = await fetch(API_URL)
  data.value = await res.json()
  currentView.value = Messages
}

function showAddGameForm() {
  currentView.value = AddMessage
}

function showUpdateGameForm() {
  currentView.value = UpdateMessage
}

function showDeleteGameForm() {
  currentView.value = DeleteMessage
}
</script>