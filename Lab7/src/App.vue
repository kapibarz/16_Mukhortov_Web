<template>
  <Header />
  <NavBar />

  <router-view />

  <Ads />
  <Footer />
</template>

<script setup>
import Header from './components/Header.vue'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import Ads from './components/Ads.vue'
</script>

<style>
body {
  font-family: "Nunito", sans-serif;
  margin: 0;
  background: #1b2838;
  color: #c7d5e0;
}
</style>