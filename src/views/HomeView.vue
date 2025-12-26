<script setup>
import Blocks from '../components/Blocks.vue';
import Orgs from '../components/Orgs.vue';
import Youtube from '../components/Youtube.vue';
import HeroHeader from '../components/HeroHeader.vue'
import OurPartners from '../components/OurPartners.vue';
import config from '@/config.json'

</script>

<template>
  <main>
    <HeroHeader />
    <div class="fade">
      <OurPartners />
    </div>
    <div class="content" style="background-color: #111;">
      <h2>Saison {{ config.seasonName }}</h2>
      <Blocks />
      <Orgs />
      <Youtube />
    </div>
  </main>
</template>

<style scoped>  
.fade{
  background: linear-gradient(to bottom, rgba(56, 56, 56, 0), #6A6D7A);
  height: 300px;
  margin-top: -300px;
  width: 100%;
  z-index: 1;
}

body {
  width:100vw;
  overflow-x:hidden;
}

h2{
  font-family: "NewOrderBold";
  font-weight: bolder;
  font-size: 65px;
  margin-bottom: 20px;
  color: white;
  text-align: center;
  padding-top: 40px;
}

@media (max-width: 1200px) {
  h2 {
    font-size: 3em;
    padding-top: 20px;
  }
}
</style>
