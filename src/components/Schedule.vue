<script setup>
import { store } from '@/store.js'
import { translations } from '@/i18n/translations'
</script>

<template>
  <div class="schedule">
    <h2>{{ translations[store.language].components.scheduleTitle }}</h2>
    <div class="match">
      <div class="matchup">
        <div class="team team1">
          <img src="../assets/teams/vtl.png" />
          <p>Virtual Esports de Saint-Jean-Sur-Richelieu</p>
        </div>
        <div class="separator"></div>
        <div class="team team2">
          <img src="../assets/teams/yuzu.png" />
          <p>Yuzu Sushi de St-Nicolas</p>
        </div>
      </div>
      <div class="time">
        <p>Dimanche 3 mars 2024 - 19h30</p>
      </div>
      <div class="watch"></div>
    </div>
    <div class="match">
      <div class="matchup">
        <div class="team team1">
          <img src="../assets/teams/miracle.png" />
          <p>Miracle de Montréal</p>
        </div>
        <div class="separator"></div>
        <div class="team team2">
          <img src="../assets/teams/aot.png" />
          <p>Anges du Saguenay</p>
        </div>
      </div>
      <div class="time">
        <p>Dimanche 10 mars 2024 - 19h30</p>
      </div>
      <div class="watch"></div>
    </div>
    <div class="match">
      <div class="matchup">
        <div class="team team1">
          <img src="../assets/teams/draveurs.png" />
          <p>Draveurs de Gatineau</p>
        </div>
        <div class="separator"></div>
        <div class="team team2">
          <img src="../assets/teams/yummy.png" />
          <p>Yummy Sports de Trois-Rivières</p>
        </div>
      </div>
      <div class="time">
        <p>Dimanche 17 mars 2024 - 19h30</p>
      </div>
      <div class="watch"></div>
    </div>
    <div class="match">
      <div class="matchup">
        <div class="team team1">
          <img src="../assets/teams/aeq.png" />
          <p>Académie Esports de Québec</p>
        </div>
        <div class="separator"></div>
        <div class="team team2">
          <img src="../assets/teams/yuzu.png" />
          <p>Yuzu Sushi de St-Nicolas</p>
        </div>
      </div>
      <div class="time">
        <p>Dimanche 24 mars 2024 - 19h30</p>
      </div>
      <div class="watch"></div>
    </div>
    <div class="match">
      <div class="matchup">
        <div class="team team1">
          <img src="../assets/teams/apex.png" />
          <p>Apex de Chambly</p>
        </div>
        <div class="separator"></div>
        <div class="team team2">
          <img src="../assets/teams/aeq.png" />
          <p>Académie Esports de Québec</p>
        </div>
      </div>
      <div class="time">
        <p>Dimanche 31 mars 2024 - 19h30</p>
      </div>
      <div class="watch"></div>
    </div>
    <div class="match">
      <div class="matchup">
        <div class="team team1">
          <img src="../assets/teams/vtl.png" />
          <p>Virtual Esports de Saint-Jean-Sur-Richelieu</p>
        </div>
        <div class="separator"></div>
        <div class="team team2">
          <img src="../assets/teams/miracle.png" />
          <p>Miracle de Montréal</p>
        </div>
      </div>
      <div class="time">
        <p>Dimanche 7 avril 2024 - 19h30</p>
      </div>
      <div class="watch"></div>
    </div>
    <div class="match">
      <div class="matchup">
        <div class="team team1">
          <img src="../assets/teams/yummy.png" />
          <p>Yummy Sports de Trois-Rivières</p>
        </div>
        <div class="separator"></div>
        <div class="team team2">
          <img src="../assets/teams/apex.png" />
          <p>Apex de Chambly</p>
        </div>
      </div>
      <div class="time">
        <p>Dimanche 14 avril 2024 - 19h30</p>
      </div>
      <div class="watch"></div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  color: white;
  font-size: 2.5rem;
  margin-bottom: 30px;
  top: 0;
  font-family: "GeneralSansSemiBold";
  line-height: 1.1;
}

.schedule {
  padding: 20px 5vw;
}

.match{
  background-color: rgba(0,0,0,0.5);
  border-radius: 40px;
  display: flex;
  flex-direction: row;
  text-align: left;
  margin-bottom: 15px;
  padding:10px 40px;
}

.matchup {
  display:flex;
}

.team {
  display:flex;
  flex-direction: row;
  gap: 20px;
  height: 80px;
  width: max-content;
  margin: auto;
}

.team img {
  height: 50px;
  align-self: center;
  justify-content: center;
}

.team p {
  width: 175px;
  margin: auto;
}

.time {
  width:100%;
  display: flex;
  align-items: center;
}

.time p {
  text-align: right;
  width: 100%;
}

.separator{
  /* Rectangle 10 */
  width: 70px;
  height: 1px;
  margin-top: 50px;
  /* Blanc */
  background: #F5F8FF;
  border-radius: 30px;
  transform: translate(0px, -12px) rotate(110deg) ;
  float: right;
  margin-left: -5px;
  margin-right: 25px;
}

@media (max-width: 1100px){
  .match {
    flex-direction: column;
  }

  .matchup {
    width: 100%;
    justify-content: center;
  }

  .time p {
    text-align: center;
    margin-top: 20px;
    font-style: italic;
  }
}

@media (max-width: 768px){
  .matchup {
    flex-direction: column;
    gap: 10px;
  }
  .matchup .separator {
    display: none;
  }

  .matchup .team {
    justify-content: center;
  }

  .matchup .team p {
    width: 50vw;
  }
}

p {
  font-size: 1rem;
  color: white;
  font-family: "GeneralSans";
}
</style>
