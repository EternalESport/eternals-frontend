<script setup>
import SmallHeroHeader from '../components/SmallHeroHeader.vue';
</script>

<template>
  <stream>
    <SmallHeroHeader msg="Mission" />
    <div class="content">
      <div class="hof-content">
        <div class="hof-text">
          <p>Eternal E-Sport est la nouvelle ligue e-sportive au Québec depuis 2025, dédiée à rassembler les meilleurs talents de la province dans un cadre compétitif exceptionnel.
<br><br>
Notre mission est claire : bâtir une scène e-sportive québécoise solide, équitable et professionnelle. Nous plaçons la transparence, le professionnalisme et l’égalité des chances au cœur de chaque compétition, afin de créer un environnement stimulant, aussi bien pour les joueurs que pour la communauté qui les soutient.
<br><br>
Portée par une équipe de direction passionnée et visionnaire, Eternal E-Sport est bien plus qu’un simple projet : c’est une opportunité unique de faire rayonner l’e-sport local et de hisser notre communauté vers de nouveaux sommets.
<br><br>
Eternal E-Sport – compétitif, inclusif et ambitieux.</p>
        </div>
        <div class="hof-image-container">
          <img class="hof-img" src="../assets/img/mission.jpg" />
        </div>
      </div>
    </div>
  </stream>
</template>

<style scoped>
.hof-content{
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