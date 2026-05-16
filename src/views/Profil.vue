<script setup>
import { store } from '../store.js'
import { translations } from '@/i18n/translations'

</script>

<template>
  <div class="content">
    <div v-if="store.user" class="text">
      <h1>Page de profil</h1>
      <img v-if="store.user.discordAvatarUrl" :src="store.user.discordAvatarUrl" :alt="store.user.discordUsername">
      <p>{{ store.user.discordUsername || 'Utilisateur Discord'}}</p>
    </div>

    <div v-else>
        <h1>{{ translations[store.language].profil.notLoggedIn }}</h1>
        <RouterLink to="/">{{ translations[store.language].profil.returnHome }}</RouterLink>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 6rem;
}

</style>
