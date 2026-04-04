<template>
  <aside>
    <button v-for="ad in ads" :key="ad.url" @click="openUrl(ad.url)">
      {{ ad.text }}
    </button>
  </aside>
</template>

<script setup>
const ads = [{ text: "СКИНЫ CS2 ЗА КОПЕЙКИ", url: "https://lis-skins.com/" },
            { text: "КАЗИНО ДЛЯ ГЕЙМЕРОВ", url: "https://plg.bet/bets" },
            { text: "КРУТИ И ВЫИГРЫВАЙ", url: "http://csgetto.gold/" },
            { text: "ДОТА 2 БУСТ", url: "https://funpay.com/lots/82/" },
            { text: "ИГРЫ ДЕШЕВЛЕ", url: "https://ggsel.net/" },
            { text: "ИМБА САЙТ", url: "https://ru14.bongacams.com/" },
            { text: "АККАУНТЫ ДЁШЕВО", url: "https://ggsel.net/catalog/steam-accounts" },
            { text: "КЛЮЧИ ОПТОМ", url: "https://ggsel.net/catalog/steam-keys" },
            { text: "ФУРРИ ДРУГ НА ЧАС", url: "https://playerok.com/products/661534349874-furri-drug-i-otchim-na-chas" },
            { text: "СКИНЫ CS2 ЗА КОПЕЙКИ", url: "https://lis-skins.com/" },
            { text: "КАЗИНО ДЛЯ ГЕЙМЕРОВ", url: "https://plg.bet/bets" },
            { text: "КРУТИ И ВЫИГРЫВАЙ", url: "http://csgetto.gold/" },
            { text: "ДОТА 2 БУСТ", url: "https://funpay.com/lots/82/" },
            { text: "ИГРЫ ДЕШЕВЛЕ", url: "https://ggsel.net/" },
            { text: "ИМБА САЙТ", url: "https://ru14.bongacams.com/" },
            { text: "АККАУНТЫ ДЁШЕВО", url: "https://ggsel.net/catalog/steam-accounts" },
            { text: "КЛЮЧИ ОПТОМ", url: "https://ggsel.net/catalog/steam-keys" },
            { text: "ФУРРИ ДРУГ НА ЧАС", url: "https://playerok.com/products/661534349874-furri-drug-i-otchim-na-chas" },
            { text: "СКИНЫ CS2 ЗА КОПЕЙКИ", url: "https://lis-skins.com/" },
            { text: "КАЗИНО ДЛЯ ГЕЙМЕРОВ", url: "https://plg.bet/bets" },
            { text: "КРУТИ И ВЫИГРЫВАЙ", url: "http://csgetto.gold/" },
            { text: "ДОТА 2 БУСТ", url: "https://funpay.com/lots/82/" },
            { text: "ИГРЫ ДЕШЕВЛЕ", url: "https://ggsel.net/" },
            { text: "ИМБА САЙТ", url: "https://ru14.bongacams.com/" },
            { text: "АККАУНТЫ ДЁШЕВО", url: "https://ggsel.net/catalog/steam-accounts" },
            { text: "КЛЮЧИ ОПТОМ", url: "https://ggsel.net/catalog/steam-keys" },
            { text: "ФУРРИ ДРУГ НА ЧАС", url: "https://playerok.com/products/661534349874-furri-drug-i-otchim-na-chas" },
            { text: "СКИНЫ CS2 ЗА КОПЕЙКИ", url: "https://lis-skins.com/" },
            { text: "КАЗИНО ДЛЯ ГЕЙМЕРОВ", url: "https://plg.bet/bets" },
            { text: "КРУТИ И ВЫИГРЫВАЙ", url: "http://csgetto.gold/" },
            { text: "ДОТА 2 БУСТ", url: "https://funpay.com/lots/82/" },
            { text: "ИГРЫ ДЕШЕВЛЕ", url: "https://ggsel.net/" },
            { text: "ИМБА САЙТ", url: "https://ru14.bongacams.com/" },
            { text: "АККАУНТЫ ДЁШЕВО", url: "https://ggsel.net/catalog/steam-accounts" },
            { text: "КЛЮЧИ ОПТОМ", url: "https://ggsel.net/catalog/steam-keys" },
            { text: "ФУРРИ ДРУГ НА ЧАС", url: "https://playerok.com/products/661534349874-furri-drug-i-otchim-na-chas" }
]

function openUrl(url) {
  window.open(url)
}
</script>

<style>
aside {
  position: fixed;
  right: 0;
  width: 100px;
}
</style>