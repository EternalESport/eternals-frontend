<script setup>
import SmallHeroHeader from '../components/SmallHeroHeader.vue';
import { store } from '../store.js'
import { translations } from '../i18n/translations'
</script>

<template>
  <stream>
    <SmallHeroHeader :msg="translations[store.language].headers.mission" />
    <div class="content">
      <div class="hof-content">
        <div class="hof-text">
          <p>{{ translations[store.language].missionContent.text }}</p>
        </div>
        <div class="hof-image-container">
          <img class="hof-img" src="../assets/img/mission.jpg" />
        </div>
      </div>
    </div>
  </stream>
</template>

<style scoped>
.hof-content {
  padding: 25px 0;
  width: 70%;
  margin: auto;
}

/* Style for the main title */
.hof-title {
  font-size: 3rem;
  font-family: "NewOrderBold";
  color: white;
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

/* Style for the description text */
.hof-text {
  width: 35%;
  float: left;
  font-size: 1.3rem;
  line-height: 1.6;
  color: white;
  text-align: justify;
  margin-right: 20px;
  margin-top: 50px;
}

/* Style for the image and h3 */
.hof-image-container {
  width: 60%;
  float: right;
  text-align: center;
  margin-top: 25px;
}

.hof-image-container h3 {
  font-size: 3rem;
  color: white;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.hof-img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

/* Clear floats for the container */
.hof-content::after {
  content: "";
  display: table;
  clear: both;
}

/* MOBILE FRIENDLY STYLES */
@media (max-width: 1500px) {
  .hof-content {
    width: 98%;
    max-width: 1000px;
    margin: auto;
    padding: 10px 20px;
  }

  .hof-title {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  .hof-text,
  .hof-image-container {
    float: none;
    width: 100%;
    margin: 0 0 30px 0;
    text-align: center;
    font-size: 1rem;
  }

  .hof-text {
    margin-top: 30px;
    margin-right: 0;
    text-align: left;
  }

  .hof-image-container h3 {
    font-size: 1.3rem;
    margin-bottom: 8px;
    max-width: 1000px;
  }

  .hof-img {
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
  }
}
</style>