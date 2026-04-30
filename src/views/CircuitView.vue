<script setup>
import { store, setLanguage } from '../store.js'
import { translations } from '@/i18n/translations'
import HeroHeaderCircuit from '../components/HeroHeaderCircuit.vue'
import Youtube from '../components/Youtube.vue';
import OurPartners from '../components/OurPartners.vue';
import BlocksCircuit from '../components/BlocksCircuit.vue';

</script>

<template>
    <HeroHeaderCircuit />
    <div class="fade">
        <OurPartners />
    </div>
    <main>
        <div>
            <p class="titre-page">Circuit Eternal 2026</p>
        </div>
        <BlocksCircuit></BlocksCircuit>
    </main>
    <Youtube/>
</template>

<style scoped>
main {
    background-color: rgb(24, 24, 24);
    padding-bottom: 50px;
}

.fade {
  background: linear-gradient(to bottom, rgba(56, 56, 56, 0), #6A6D7A);
  height: 300px;
  margin-top: -300px;
  width: 100%;
  z-index: 1;
}

.titre-page {
  font-family: "NewOrderBold";
  font-weight: bolder;
  font-size: 65px;
  margin-bottom: 20px;
  color: white;
  text-align: center;
  padding-top: 40px;
}
</style>
