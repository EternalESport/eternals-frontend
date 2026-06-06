<script setup>
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'
import CookieBanner from './components/CookieBanner.vue'
import config from './config.json'
import axios from 'axios'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { store, initializeLanguage, refreshAuth } from './store.js'
import { computed, onMounted } from 'vue'

//import standingsacad from '../src/data/standingsacad.json'
//import standingschampions from '../src/data/standingschampions.json'
//import tournamentchampions from '../src/data/tournamentchampions.json'
//import tournamentacad from '../src/data/tournamentacad.json'

const route = useRoute() //Pour pouvoir vérifier la route actuelle

// Pour garder/aller rechercher le user discord lors d'un refresh de page
onMounted(async () => {
  initializeLanguage()
  await refreshAuth()
})

//Pour le changement de couleur entre les sections du site
const navColor = computed(() => {
  if (route.path === '/' || route.path === '/profile' || route.path === '/mission' || route.path === '/equipe' || route.path === '/halloffame') return '#faa200'
  if (route.path === '/riftbound') return '#3f66db'
  return 'var(--main-color)'
})


// export default {
//   name: 'App',
//   components: {
//     Navigation,
//     Footer,
//     CookieBanner,
//     RouterLink,
//     RouterView
//   }
// };

/*var tournamentChampions = tournamentchampions
var tournamentAcademy = tournamentacad

store.standingsChampions = standingschampions
store.standingsAcademy = standingsacad

var franchises = tournamentChampions.franchises

for (let i = 0; i < tournamentChampions.franchises.length; i++) {
  tournamentChampions.franchises[i].teams.push(tournamentAcademy.franchises[i].teams[0])
}

franchises.forEach(f => {
  f.teams.forEach(t => {
    var opgg = ""
    t.players.forEach(p => {
      opgg += (p.opgg.split(',')[0] + ',')
    })
    t.opgg = opgg
  })
});

store.franchises = franchises;*/


/*axios.get('https://qclservices.azurewebsites.net/tournament/standings/7205060').then(response => {
  store.standingsChampions = response.data
})

axios.get('https://qclservices.azurewebsites.net/tournament/standings/7205065').then(response => {
  store.standingsAcademy = response.data
})

axios.get('https://qclservices.azurewebsites.net/tournament/get/7205060').then(response => {
  tournamentChampions = response.data
  axios.get('https://qclservices.azurewebsites.net/tournament/get/7205065').then(response => {
    tournamentAcademy = response.data

    var franchises = tournamentChampions.franchises

    for (let i = 0; i < tournamentChampions.franchises.length; i++) {
      tournamentChampions.franchises[i].teams.push(tournamentAcademy.franchises[i].teams[0])
    }

    franchises.forEach(f => {
      f.teams.forEach(t => {
        var opgg = ""
        t.players.forEach(p => {
          opgg += (p.opgg.split(',')[0] + ',')
        })
        t.opgg = opgg
      })
    });

    store.franchises = franchises;
  })
})*/


</script>

<template>
  <div v-if="store.isRedirecting" class="redirect-overlay">
    <div class="redirect-box">
      <div class="spinner"></div>
      <p>{{ store.redirectMessage }}</p>
    </div>
  </div>
  <!-- Pour avoir accès à cette variable au travers tout le site -->
  <div :style="{ '--nav-color': navColor }">
    <CookieBanner />
    <Navigation />
    <RouterView />
    <Footer />
  </div>
</template>

<style scoped>
body {
  margin: 0;
  overflow-x: hidden;
}

.redirect-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(0, 0, 0, 0.82);
  display: flex;
  justify-content: center;
  align-items: center;
}

.redirect-box {
  color: white;
  text-align: center;
  font-size: 1.2rem;
}

.spinner {
  width: 52px;
  height: 52px;
  margin: 0 auto 20px;
  border: 5px solid rgba(255, 255, 255, 0.25);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
