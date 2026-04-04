import { createRouter, createWebHistory } from 'vue-router'

import SteamGames from '../pages/SteamGames.vue'
import RandomDog from '../pages/RandomDog.vue'
import Messages from '../pages/Messages.vue'
import AddMessage from '../pages/AddMessage.vue'
import UpdateMessage from '../pages/UpdateMessage.vue'
import DeleteMessage from '../pages/DeleteMessage.vue'

const routes = [
  { path: '/', component: SteamGames },
  { path: '/dog', component: RandomDog },
  { path: '/messages', component: Messages },
  { path: '/add', component: AddMessage },
  { path: '/update', component: UpdateMessage },
  { path: '/delete', component: DeleteMessage }
]

export default createRouter({
  history: createWebHistory(),
  routes
})