<script>
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'
import config from './config.json'
import axios from 'axios'
import { RouterLink, RouterView } from 'vue-router'
import { store } from './store.js'

//import standingsacad from '../src/data/standingsacad.json'
//import standingschampions from '../src/data/standingschampions.json'
//import tournamentchampions from '../src/data/tournamentchampions.json'
//import tournamentacad from '../src/data/tournamentacad.json'

export default {
  name: 'App',
  components: {
    Navigation,
    Footer,
    RouterLink,
    RouterView
  }
};

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

<template >
  <Navigation/>
  <RouterView />
  <Footer />
</template>

<style scoped>

body{
margin:0;
overflow-x:hidden;
}

</style>
