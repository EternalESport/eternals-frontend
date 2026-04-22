<script setup>
import SmallHeroHeader from '../components/SmallHeroHeader.vue'
import { store } from '../store.js'
import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import axios from 'axios'
import { FilterMatchMode } from 'primevue/api';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';

import stats1 from '../data/stats1.json'
import stats2 from '../data/stats2.json'
import stats3 from '../data/stats3.json'

const loading = ref(true);

onMounted(() => {
  var options = { method: 'GET', url: 'https://qclservices.azurewebsites.net/stats/list/3', encoding: 'latin1' };
  if (store.statsSeason.length === 0) {
    /*axios.request(options).then(response => {
      store.statsTotal = response.data;
      store.stats = store.statsTotal;
      loading.value = false;
    })*/
    store.statsTotal = stats3;
    store.stats = store.statsTotal;
    loading.value = false;
  } else {
    loading.value = false;
  }

});

function changeScope() {
  switch (selectedScope.value.code) {
    case '1':
      store.stats = store.statsTotal;
      break;
    case '2':
      if (store.statsSeason.length == 0) {
        var options = { method: 'GET', url: 'https://qclservices.azurewebsites.net/stats/list/2', encoding: 'latin1' };
        loading.value = true;
        /*axios.request(options).then(response => {
            store.statsSeason = response.data;
            store.stats = store.statsSeason;
            loading.value = false;
        })*/
        store.statsSeason = stats2;
        store.stats = store.statsSeason;
        loading.value = false;

      } else {
        store.stats = store.statsSeason;
      }
      break;
    case '3':
      if (store.statsPlayoffs.length == 0) {
        var options = { method: 'GET', url: 'https://qclservices.azurewebsites.net/stats/list/1', encoding: 'latin1' };
        loading.value = true;
        /*axios.request(options).then(response => {
            store.statsPlayoffs = response.data;
            store.stats = store.statsPlayoffs;
            loading.value = false;
        })*/
        store.statsPlayoffs = stats1;
        store.stats = store.statsPlayoffs;
        loading.value = false;
      } else {
        store.stats = store.statsPlayoffs;
      }
      break;
  }
}

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  playerIGN: { value: null, matchMode: FilterMatchMode.CONTAINS },
  league: { value: null, matchMode: FilterMatchMode.EQUALS },
  role: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const divisions = ref([
  "Champions",
  "Académie"
])

const selectedScope = ref({ name: 'Toutes les statistiques', code: '1' });
const scope = ref([
  { name: 'Toutes les statistiques', code: '1' },
  { name: 'Saison régulière', code: '2' },
  { name: 'Séries éliminatoires', code: '3' },
])

const roles = ref([
  "top",
  "jg",
  "mid",
  "adc",
  "sup"
])

</script>

<template>
  <main>
    <SmallHeroHeader msg="STATISTIQUES DES JOUEURS" />
    <div class="content">
      <div class="header">
        <h4>Portée: </h4>
        <Dropdown v-model="selectedScope" :options="scope" :disabled="loading" optionLabel="name" class="w-full md:w-14rem" @change="changeScope" style="min-width: 250px;" />
      </div>
      <DataTable sortField="kda" :sortOrder="-1" :value="store.stats" v-model:filters="filters" paginator :rows="10" dataKey="playerIGN" filterDisplay="row" :loading="loading" tableStyle="min-width: 50rem;max-width:90vw;">
        <template #empty> Aucun joueur trouvé. </template>
        <template #loading>
          <h3>Chargement des statistiques</h3>
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </template>
        <Column field="franchiseUrl" header="Franchise" style="max-width: 6rem">
          <template #body="{ data }">
            <img class="logo-franchise" :src="data.franchiseUrl" />
          </template>
        </Column>
        <Column :showFilterMenu="false" :showClearButton="false" sortable field="playerIGN" header="IGN" style="min-width: 4rem">
          <template #body="{ data }">
            {{ data.playerIGN }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="IGN" />
          </template>
        </Column>
        <Column :showFilterMenu="false" :showClearButton="false" field="league" header="Division" style="min-width: 4rem;text-align: center;">
          <template #body="{ data }">
            {{ data.league }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown showClear v-model="filterModel.value" @change="filterCallback()" :options="divisions" placeholder="Division" class="w-full md:w-14rem">
            </Dropdown>
          </template>
        </Column>
        <Column :showFilterMenu="false" :showClearButton="false" field="role" header="Rôle" style="min-width: 1rem">
          <template #body="{ data }">
            <img class="playericon" :src="'/icons/' + data.role + '.svg'" />
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown showClear v-model="filterModel.value" @change="filterCallback()" :options="roles" placeholder="Rôle" class="w-full md:w-14rem">
            </Dropdown>
          </template>
        </Column>
        <Column sortable field="kda" header="KD/A" style="min-width: 5rem">
          <template #body="{ data }">
            {{ data.kda }}
          </template>
        </Column>
        <Column sortable field="totalKills" header="Kills" style="min-width: 5rem">
          <template #body="{ data }">
            {{ data.totalKills + " (" + data.killsAvg + "/g)" }}
          </template>
        </Column>
        <Column sortable field="totalDeaths" header="Deaths" style="min-width: 5rem;">
          <template #body="{ data }">
            {{ data.totalDeaths + " (" + data.deathsAvg + "/g)" }}
          </template>
        </Column>
        <Column sortable field="totalAssists" header="Assists" style="min-width: 5rem;">
          <template #body="{ data }">
            {{ data.totalAssists + " (" + data.assistsAvg + "/g)" }}
          </template>
        </Column>
        <Column sortable field="totalDamageDealtToBuildings" header="DMG Buildings" style="min-width: 3rem;text-align: center;">
          <template #body="{ data }">
            {{ data.totalDamageDealtToBuildings.toLocaleString() + ' (' + data.dmgBuildingsAvg.toLocaleString() + '/g)' }}
          </template>
        </Column>
        <Column sortable field="goldPerMinute" header="Gold/Min" style="min-width: 3rem;text-align: center;">
          <template #body="{ data }">
            {{ data.goldPerMinute }}
          </template>
        </Column>
        <Column sortable field="csMin" header="CS/Min" style="min-width: 3rem;text-align: center;">
          <template #body="{ data }">
            {{ data.csMin }}
          </template>
        </Column>
        <Column sortable field="dmgPerMinute" header="DMG/Min" style="min-width: 3rem;text-align: center;">
          <template #body="{ data }">
            {{ data.dmgPerMinute }}
          </template>
        </Column>
        <Column sortable field="differentChampionsPlayed" header="Diff Champ" style="min-width: 3rem;text-align: center;">
          <template #body="{ data }">
            <div style="cursor: default;" v-tooltip.top="data.champions">
              {{ data.differentChampionsPlayed }}
            </div>
          </template>
        </Column>
        <Column sortable field="visionAvg" header="VS/Min" style="min-width: 3rem;text-align: center;">
          <template #body="{ data }">
            {{ data.visionAvg }}
          </template>
        </Column>
      </DataTable>
    </div>
  </main>
</template>

<style>
.flex-row {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 10px;
}
</style>

<style scoped>
.header {
  display: flex;
  width: 100%;
  padding: 20px;
}

.header h4 {
  font-size: 2em;
  margin-right: 20px;
}

.lds-ring {
  position: absolute;
  top: 150px;
  padding: 0;
}

h3 {
  position: absolute;
  font-weight: bold;
  font-size: 40px;
  top: 20px;
}

.playericon {
  display: block;
  margin: auto;
}

.logo-franchise {
  height: 40px;
  display: block;
  margin: auto;
}

.content {
  color: white;
  padding: 50PX 5vw;
  justify-content: space-evenly;
}

i {
  position: absolute;
  bottom: -8px;
}
</style>
