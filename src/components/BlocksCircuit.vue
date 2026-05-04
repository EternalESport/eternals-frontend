<script setup>
import config from '@/config.json'
import { store } from '@/store.js'
import { translations } from '@/i18n/translations'
</script>


<template>
  <div class="blocks-container">
    <RouterLink :to="'/regulationscircuit'" class="block large">
      <img src="../assets/btns/Reglements1.png" />
      <h3 style="font-size: 41px;">{{ translations[store.language].components.blocks.regulations }}</h3>
    </RouterLink><!-- Large box -->
    <a class="block small" :href="config.links.registercircuit" target="_blank">
      <img src="../assets/btns/Inscription1.png" />
      <h3>{{ translations[store.language].components.blocks.registrations }}</h3>
    </a> <!-- Small box -->
    <RouterLink :to="'/teamscircuit'" class="block small mobile">
      <img src="../assets/btns/ListeDesEquipes1.png" />
      <h3 style="font-size: 35px;">{{ translations[store.language].components.blocks.teams }}</h3>
    </RouterLink> <!-- Large box -->
    <RouterLink :to="'/teamscircuit'" class="block small desktop">
      <img src="../assets/btns/ListeDesEquipes1.png" />
      <h3 style="font-size: 35px;">{{ translations[store.language].components.blocks.teams }}</h3>
    </RouterLink> <!-- Large box -->
    <a class="block large" :href="config.links.rankingcircuit" target="_blank">
      <img src="../assets/btns/Classement1.png" />
      <h3>{{ translations[store.language].components.blocks.standings }}</h3>
    </a> <!-- Large box -->
  </div>
</template>

<style scoped>
.desktop {
  display: block;
}

.mobile {
  display: none;
}

.blocks-container {
  font-family: 'NewOrderBold';
  width: 800px;
  margin: auto;
  text-align: center;
  height: 800px;
  display: flex;
  flex-flow: column wrap;
  gap: 50px;
  justify-content: center;
}

.block {
  border-radius: 8px;
  position: relative;
  color: white;
  cursor: pointer;
  transition: 0.5s;

}

.block:hover {
  color: var(--main-color);
  transform: scale(1.05);

}

.block:hover img {
  transition: 0.5s;
  filter: brightness(0.5);
  /* Darken the image on hover */
}

.block h3 {
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3em;
  text-align: center;
  font-weight: 900;
  width: 100%;
}

.block img {
  height: 100%;
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
  /* Ensure the image covers the block */
}

.block.large {
  height: 400px;
  width: 400px;
}

.block.small {
  height: 200px;
  width: 400px;
  
}

.block.small img {
  width: 100%;
  top: 30px;
  object-fit: cover;
  object-position: center 20%;
}

@media (max-width: 1500px) {
  .blocks-container {
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: auto;
  }

  .block {
    width: 90vw !important;
    max-width: 400px;
    margin: 0 auto;
  }

  .desktop {
    display: none;
  }

  .mobile {
    display: block;

  }

  .mobile img {
    max-width: 400px;
  }
}
</style>