<script setup>
import config from '@/config.json'
</script>


<template>
  <div class="blocks-container">
    <a class="block large" :href="config.links.rules" target="_blank">
      <img src="../assets/btns/Règle.png" />
      <h3 style="font-size: 41px;">RÈGLEMENTS</h3>
    </a> <!-- Large box -->
    <a class="block small" :href="config.links.register" target="_blank">
      <img src="../assets/btns/Inscriptionrectangle.png" />
      <h3>INSCRIPTIONS</h3>
    </a> <!-- Small box -->
    <a class="block large mobile" :href="config.links.teams" target="_blank">
      <img src="../assets/btns/Listedeséquipes.png" />
      <h3 style="font-size: 35px;">LISTES DES ÉQUIPES</h3>
    </a> <!-- Large box -->
    <a class="block small" :href="config.links.schedule" target="_blank">
      <img src="../assets/btns/Horairerectangle.png" />
      <h3>HORAIRE</h3>
    </a> <!-- Small box -->
    <a class="block large desktop" :href="config.links.teams" target="_blank">
      <img src="../assets/btns/Listedeséquipes.png" />
      <h3 style="font-size: 35px;">LISTES DES ÉQUIPES</h3>
    </a> <!-- Large box -->
    <a class="block large" :href="config.links.ranking" target="_blank">
      <img src="../assets/btns/Classement.png" />
      <h3>CLASSEMENT</h3>
    </a> <!-- Large box -->
    <a class="block small" :href="config.links.playoffs" target="_blank">
      <img src="../assets/btns/Playoffsrectangle.png" />
      <h3>PLAYOFFS</h3>
    </a> <!-- Small box -->
  </div>
</template>

<style scoped>
.desktop{
  display: block;
}
.mobile{
  display: none;
}
.blocks-container {
  font-family: 'NewOrderBold';
  width: 1300px;
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

  &:hover{
      color: var(--main-color);
      transform: scale(1.05);
      img{
        transition: 0.5s;
        filter: brightness(0.5); /* Darken the image on hover */
      }
    }

  h3{
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

  img{
    height: 100%;
    border-radius: 8px;
    object-fit: cover; /* Ensure the image covers the block */
  }
}

.block.large {
  height: 400px;
  width: 400px;
}

.block.small {
  height: 200px;
  width: 400px;
  img{
    width: 100%;
    top: 30px;
  }
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
  .desktop{
    display: none;
  }
  .mobile{
    display: block;
  }
  }
</style>