<script setup>
import { store } from '@/store.js'
import { translations } from '@/i18n/translations'
/*defineProps({
  msg: {
    type: String,
    required: true
  }
})*/
</script>

<template>
  <div class="title">
    <h1 class="green">{{ translations[store.language].components.franchises }}</h1>
    <div>
      <img>
      <p></p>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .title h1,
  .title h3 {
    text-align: left;
  }
}
</style>
