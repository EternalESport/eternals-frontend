<script setup>
import SmallHeroHeader from '../components/SmallHeroHeader.vue';
import { store } from '../store.js'
</script>

<template>
  <main>
    <SmallHeroHeader msg="Classement de la saison courante" />
    <div class="content">
      <div v-if="store.standingsChampions.length === 0" class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="allstandings">
        <div class="standings">
          <h3>Champions</h3>
          <div class="menufranchise" v-for="team in store.standingsChampions">
            <div class="number">
              {{ team.position }}
            </div>
            <div class="name">
              <img :src="team.teamLogo" />
              <p class="team">{{ team.teamName }}</p>
              <div class="results">
                <div class="title">Résultats</div><br />{{ team.resultsWins }}-{{ team.resultsLoses }}
              </div>
              <div class="games">
                <div class="title">V/D</div><br />{{ team.victories }}/{{ team.defeats }}
              </div>
              <div class="points">
                <div class="title">Points</div><br />{{ team.points }}
              </div>
              <div class="pts">{{ team.points }} <div class="pts2">pts</div>
              </div>
            </div>
          </div>
        </div>
        <div class="standings">
          <h3>Académie</h3>
          <div class="menufranchise" v-for="team in store.standingsAcademy">
            <div class="number">
              {{ team.position }}
            </div>
            <div class="name">
              <img :src="team.teamLogo" />
              <p class="team">{{ team.teamName }}</p>
              <div class="results">
                <div class="title">Résultats</div><br />{{ team.resultsWins }}-{{ team.resultsLoses }}
              </div>
              <div class="games">
                <div class="title">V/D</div><br />{{ team.victories }}/{{ team.defeats }}
              </div>
              <div class="points">
                <div class="title">Points</div><br />{{ team.points }}
              </div>
              <div class="pts">{{ team.points }} <div class="pts2">pts</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.brackets {
  padding: 0 50px;
  display: flex;
  flex-wrap: wrap;
}

.br {
  padding: 50px;
  max-width: 50%;
}

.bracket {
  width: 100%;
}

.pts {
  min-width: 60px;
  font-size: 25px;
}

.pts2 {
  font-size: 15px;
  opacity: 0.5;
  margin-top: 5px;
}

h3 {
  font-size: 40px;
  font-family: "GeneralSansMedium";
  text-align: center;
  color: white;
  padding: 40px 0 20px 0;
  border-bottom: 1px solid white;
  width: 80%;
  margin: auto;
  margin-bottom: 20px;
}

.allstandings {
  font-family: "GeneralSansMedium";
  color: white;
  width: 90vw;
  margin: auto;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding-bottom: 100px;
}

.name {
  width: 100%;
  display: flex;
  align-items: center;
  min-width: 35vw;
  cursor: pointer;
  border-radius: 0 30px 30px 0;
  line-height: 15px;
}

.title {
  font-size: 15px;
  opacity: 0.5;
}

.results,
.games,
.points {
  display: none;
  text-align: center;
  padding: 0 10px;
  font-size: 25px;
}

.points {
  margin-right: 15px;
}

.name:hover .results,
.name:hover .games,
.name:hover .points {
  display: block;
  animation: fadeIn 0.5s;
}

.name:hover .pts {
  display: none;
}

.name:hover {
  transition: 0.5s;
  background-color: white;
  color: black;
}

p {
  width: 90%;
}

.number {
  color: black;
  background-color: white;
  font-size: 35px;
  font-family: "GeneralSansBold";
  height: 90px;
  border-radius: 30px 0 0 30px;
  padding: 10px;
  line-height: 70px;
  width: 40px;
  text-align: center;
}

.menufranchise {
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 30px;
  flex-direction: row;
  margin-bottom: 20px;
}

.menufranchise img {
  max-height: 70px;
  max-width: 70px;
  margin: 10px 20px;
}

.stadings h3 {
  font-size: 30px;
  font-family: GeneralSansMedium;
}

@media (max-width: 1160px) {
  h3 {
    font-size: 25px;
  }

  .brackets {
    padding: 0 10px;
  }

  .br {
    max-width: 100%;
    padding: 0;
  }
}


@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
