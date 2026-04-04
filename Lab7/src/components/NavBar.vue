<template>
  <nav>
    <router-link to="/">Игры</router-link>
    <router-link to="/dog">Собака</router-link>
    <router-link to="/add">Написать</router-link>
    <router-link to="/update">Редактировать</router-link>
    <router-link to="/delete">Удалить</router-link>
    <router-link to="/messages">Письма</router-link>
  </nav>
</template>

<style>
nav {
  background: #2a475e;
  padding: 10px;
}

a {
  margin: 5px;
  color: white;
}
</style>