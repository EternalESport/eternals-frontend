<script setup>
import SmallHeroHeader from '../components/SmallHeroHeader.vue'
import { store } from '../store.js'
import { translations } from '../i18n/translations'
</script>

<template>
  <main>
    <SmallHeroHeader :msg="translations[store.language].headers.team" />
    <div class="content">
      <div class="team">
        <div class="block">
          <img src="../assets/hof/Organigramme_Eternal.png" />
        </div>
      </div>
    </div>

  </main>
</template>

<style scoped>
.team{
  display: flex;
  flex-wrap: wrap;
  gap:50px;
  color: white;
  padding: 50PX 10vw;
  justify-content: space-evenly;
}

.block{
  width: 800px;
  padding-bottom: 60px;
  max-width: 80vw;
}

.block img{
  width: 100%;
  height: auto;
  display: block;
  border-radius: 20px;
}

h3{
  font-family: "GeneralSansBold";
  line-height: 1.2;
  font-size: 2rem;
  margin: 20px 0;
}
</style>
