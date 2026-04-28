<script setup>
import { store, setLanguage } from '../store.js'
import { translations } from '@/i18n/translations'
import HeroHeader from '../components/HeroHeader.vue'
import BlocksRiftbound from '../components/BlocksRiftbound.vue'

</script>

<template>
    <HeroHeader />
    <div class="fade">
        <OurPartners />
    </div>
    <main>
        <div>
            <p class="titre-page">Riftbound Eternal 2026</p>
            <BlocksRiftbound/>
        </div>
    </main>
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
