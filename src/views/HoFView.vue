<script setup>
import SmallHeroHeader from '../components/SmallHeroHeader.vue';
</script>

<template>
  <stream>
    <SmallHeroHeader msg="Hall of Fame" />
    <div class="content">
      <div class="hof-content">
        <h2 class="hof-title">Les joueurs qui ont marqué l'histoire de l'Eternal E-Sport</h2>
        <div class="hof-text">
          <p>Le Hall of Fame de l'Eternal E-Sport est un hommage aux joueurs qui ont laissé une empreinte indélébile dans l'histoire de notre organisation. Ces joueurs ont fait preuve d'un talent exceptionnel, d'une détermination sans faille et d'un esprit d'équipe remarquable. Leur contribution à l'Eternal E-Sport a été inestimable, et ils continueront à inspirer les générations futures de joueurs.</p>
          <br><p>Nous sommes fiers de les honorer et de célébrer leurs réalisations au sein de notre communauté. Leurs noms resteront gravés dans les mémoires, et leur héritage perdurera au sein de l'Eternal E-Sport.</p>
        </div>
        <div class="hof-image-container hof-right">
          <h3>Saison Automne 2025 - Division Prestige</h3>
          <img class="hof-img" src="../assets/hof/aut2025champ.png" />
          <p>DME Exodia • Vertios • MrJc Fanclub Semi-Luxueux • DME Forgotten • DME Dawn • LoV Me • Team Du Nord</p>
        </div>
        <div class="hof-image-container hof-left">
          <h3>Saison Automne 2025 - Division Académie</h3>
          <img class="hof-img" src="../assets/hof/aut2025acad.png" />
          <p>Chiefs • Team Nordian • LoV U • Team Xtreme • DH Blossom • Los Loserinos • Twinkies</p>
        </div>
        <div class="hof-image-container hof-right">
          <h3>Saison Été 2025 - Division Prestige</h3>
          <img class="hof-img" src="../assets/hof/WINNERS_PRESTIGE.png" />
          <p>MrJC Fanclub de Luxe • DME Exodia • Apex Bombardino • R'tiens Moi • LoV That • Fist and Frost • Chill Guys Gaming</p>
        </div>
        <div class="hof-image-container hof-left">
          <h3>Saison Été 2025 - Division Académie</h3>
          <img class="hof-img" src="../assets/hof/winners_academy.png" />
          <p>DH Blossom • Wii Windows • Team Nordian • Los Loserinos • 4 BOTS 1 SUP • Delirious Hellhounds • Rewolf Esport</p>
        </div>
        <div class="hof-image-container hof-right">
          <h3>Saison Hiver 2025</h3>
          <img class="hof-img" src="../assets/hof/MB_NOOB.jpg" />
          <p>LoV U • N9TF Void • DH Dark • MrJC Fanclub • DHydro-Québec • DME Reborn • Chaos Theory</p>
        </div>
      </div>
    </div>
  </stream>
</template>

<style scoped>
.hof-content{
  padding: 50px 0;
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

.hof-right {
  margin-right: 40px; 
  float: right; /* Align the right image to the right */
}
.hof-left {
  margin-left: 40px; 
  float: left; /* Align the left image to the left */
}

/* Style for the description text */
.hof-text {
  width: 50%;
  float: left;
  font-size: 1.2rem;
  line-height: 1.6;
  color: white;
  text-align: justify;
  margin-right: 20px;
  margin-top: 100px;
}

/* Style for the image and h3 */
.hof-image-container {
  margin-top: 60px;
  width: 40%;
  text-align: center;
  color: white;
}

.hof-image-container h3 {
  font-size: 2.5rem;
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
    padding: 20px 0;
  }
  .hof-title {
    font-size: 2rem;
    margin-bottom: 10px;
  }
  .hof-text,
  .hof-image-container {
    max-width: 800px;
    float: none;
    width: 100%;
    margin: auto;
    text-align: center;
    font-size: 1rem;
    padding: 20px;
  }
  .hof-text {
    margin: auto;
    margin-top: 30px;
    text-align: left;
  }
  .hof-image-container h3 {
    font-size: 1.3rem;
    margin-bottom: 8px;
  }
  .hof-img {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }
}
</style>