<script setup>
import SmallHeroHeader from '../components/SmallHeroHeader.vue';
import { store } from '../store.js'

</script>

<template>
  <main>
    <SmallHeroHeader msg="Les Franchises" />
    <div class="content">
      <div v-if="store.franchises.length === 0" class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="allfranchises">
        <div class="menufranchise" v-for="franchise in store.franchises">
          <a class="btn" v-scroll-to="{ element: '#franchise-' + franchise.id, offset: -80 }">
            <img :src="franchise.logo" />
          </a>
        </div>
      </div>
      <div class="title">
        <div v-for="franchise in store.franchises" :id="'franchise-' + franchise.id" class="franchise">
          <div class="franchises-details">
            <img :src="franchise.logo">
            <h3>{{ franchise.name }}</h3>
          </div>
          <div class="staff">
            <div class="st">
              <font-awesome-icon :icon="['fas', 'user-tie']" />
              {{ franchise.staff[0].name }}
            </div>
            <div class="st">
              <font-awesome-icon :icon="['fas', 'chalkboard-user']" />
              {{ franchise.staff[1].name }}
            </div>
          </div>
          <div v-for="team in franchise.teams" class="team">
            <a target="_blank" :href="'https://www.op.gg/multisearch/na?summoners=' + encodeURIComponent(team.opgg)" class="tname">
              <p>{{ team.name }}</p>
            </a>
            <div class="players">
              <div v-for="player in team.players" class="player">
                <img class="playericon" :src="'/icons/' + player.role + '.svg'" />
                <a class="playername" target="_blank" :href="player.opgg.includes(',') ? 'https://www.op.gg/multisearch/na?summoners=' + encodeURIComponent(player.opgg) : 'https://www.op.gg/summoners/na/' + player.opgg.replace('#', '-')">{{ player.ign }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.btn {
  cursor: pointer;
}

.staff {
  font-size: 20px;
  font-family: "GeneralSans";
  color: white;
  display: flex;
  justify-content: start;
  margin-left: 20px;
  flex-wrap: wrap;
  margin-top: 20px;
  column-gap: 20px;
  row-gap: 10px;
}


.staff svg {
  margin-right: 10px;
  font-size: 35px;
}

.title {
  padding-top: 60px;
}

.content {
  padding-top: 100px;
  width: 100%;
  font-family: "GeneralSans";
}

.allfranchises {
  display: flex;
  flex-wrap: wrap;
  width: 80vw;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50px;
  padding: 10px;
  justify-content: space-evenly;
}

.menufranchise>a {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.menufranchise img {
  max-height: 100%;
  padding: 10px;
}

.players {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;
}

.player {
  display: flex;
  width: 200px;

}

.menufranchise {
  border-radius: 30px;
  display: flex;
}

.menufranchise:hover {
  background-color: rgb(1, 14, 48);
  transition: 0.5s;
}

.playername {
  line-height: 50px;
  padding-left: 15px;
  white-space: nowrap;
}

.playername:hover {
  transition: 0.5s;
  color: rgba(0, 57, 210, 1);
}

.tname {
  background-color: rgba(0, 57, 210, 1);
  padding: 10px 10px;
  line-height: 30px;
  text-align: center;
  width: 200px;
  color: white;
  border-radius: 20px;
}

.tname:hover {
  transition: 0.5s;
  background-color: white;
  color: black;
}

.team {
  font-size: 18px;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  padding: 20px;
  border-radius: 40px;
  margin: 10px 0;
  gap: 20px;
}

.team>a {
  display: flex;
  align-items: center;
}

.team>a>p {
  margin: auto;
  font-weight: bold;
}

.franchise {
  padding: 50px 0;
  width: 90vw;
  margin: auto;
  scroll-margin-top: 50px;
}

@media (max-width: 450px) {

  .franchise {
    width: 90vw;
  }

  .team>a {
    writing-mode: vertical-rl;
    text-orientation: upright;
    font-family: GeneralSansBold;
    text-transform: uppercase;
    line-height: 1.5;
    height: 25%;
    width: 100%;
    margin: auto;
  }

  .staff {
    justify-content: space-around;
  }

}

.franchises-details {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
}

.franchises-details>* {
  margin: auto;
}

.franchises-details h3 {
  width: 600px;
  text-align: center;
}

.franchises-details img {
  width: 100px;
}

.franchises-details h3 {
  flex-grow: 1;
  text-align: center;
  color: white;
  margin-left: 20px;
}


h3 {
  font-family: "GeneralSansSemiBold";
  font-size: 1.8rem;
  position: inherit;
}

@media (min-width: 822px) {
  .franchises-details h3 {
    text-align: left;
  }
}
</style>
