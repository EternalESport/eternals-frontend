<script setup>
import SmallHeroHeader from '../components/SmallHeroHeader.vue';
import { store, setLanguage } from '../store.js'
import { translations } from '@/i18n/translations'

</script>

<template>
    <main>
        <SmallHeroHeader :msg="translations[store.language].regulations.h1Title" />
        <div>
            <div class="table-of-content">
                <h2>{{ translations[store.language].regulations.h2Titles.title12 }}</h2>
                <a href="#admin">{{ translations[store.language].regulations.h2Titles.title1 }}</a>
                <a href="#schedule">{{ translations[store.language].regulations.h2Titles.title2 }}</a>
                <a href="#registration">{{ translations[store.language].regulations.h2Titles.title3 }}</a>
                <a href="#match">{{ translations[store.language].regulations.h2Titles.title4 }}</a>
                <a href="#substitue">{{ translations[store.language].regulations.h2Titles.title5 }}</a>
                <a href="#preseason">{{ translations[store.language].regulations.h2Titles.title6 }}</a>
                <a href="#regseason">{{ translations[store.language].regulations.h2Titles.title7 }}</a>
                <a href="#endseason">{{ translations[store.language].regulations.h2Titles.title8 }}</a>
                <a href="#reregistration">{{ translations[store.language].regulations.h2Titles.title9 }}</a>
                <a href="#broadcast">{{ translations[store.language].regulations.h2Titles.title10 }}</a>
                <a href="#penalties">{{ translations[store.language].regulations.h2Titles.title11 }}</a>
            </div>
            <div class="regulations">
                <h2 id="admin">{{ translations[store.language].regulations.h2Titles.title1 }}</h2>
                <p>{{ translations[store.language].regulations.texts.text1 }}</p>

                <h2 id="schedule">{{ translations[store.language].regulations.h2Titles.title2 }}</h2>
                <p>{{ translations[store.language].regulations.texts.text2 }}</p>

                <h2 id="registration">{{ translations[store.language].regulations.h2Titles.title3 }}</h2>
                <h3>{{ translations[store.language].regulations.h3Titles.title1 }}</h3>
                <p>{{ translations[store.language].regulations.texts.text3 }}</p>
                <h3>{{ translations[store.language].regulations.h3Titles.title2 }}</h3>
                <p>{{ translations[store.language].regulations.texts.text4 }}</p>
                <a href="https://www.leagueofgraphs.com/fr/" target="_blank">League of graph</a>
                <h3>{{ translations[store.language].regulations.h3Titles.title3 }}</h3>
                <p>{{ translations[store.language].regulations.texts.text5 }}</p>
                <h3>{{ translations[store.language].regulations.h3Titles.title4 }}</h3>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLScGvBhvQKA1V45-POGZZZMkGkIOEQ0aAzeUGFyHT-cZAjqwgw/viewform" target="_blank">Form</a>
                <p>{{ translations[store.language].regulations.texts.text6 }}</p>
                <h3>{{ translations[store.language].regulations.h3Titles.title5 }}</h3>
                <p>{{ translations[store.language].regulations.texts.text7 }}</p>
                
                <h2 id="match">{{ translations[store.language].regulations.h2Titles.title4 }}</h2>
                <h3>{{ translations[store.language].regulations.h3Titles.title6 }}</h3>
                <p>{{ translations[store.language].regulations.texts.text8 }}</p>
                <h3>{{ translations[store.language].regulations.h3Titles.title7 }}</h3>
                <a href="https://www.fearlessdraft.net/" target="_blank">Draft</a>
                <p>{{ translations[store.language].regulations.texts.text9 }}</p>
                <h3>{{ translations[store.language].regulations.h3Titles.title8 }}</h3>
                <p>{{ translations[store.language].regulations.texts.text10 }}</p>
                
                <h2 id="substitue">{{ translations[store.language].regulations.h2Titles.title5 }}</h2>
                <h3>{{ translations[store.language].regulations.h3Titles.title9 }}</h3>
                <p>{{ translations[store.language].regulations.texts.text11 }}</p>
                <h3>{{ translations[store.language].regulations.h3Titles.title10 }}</h3>
                <p>{{ translations[store.language].regulations.texts.text12 }}</p>
                
                <h2 id="preseason">{{ translations[store.language].regulations.h2Titles.title6 }}</h2>
                <p>{{ translations[store.language].regulations.texts.text13 }}</p>
                <h3>{{ translations[store.language].regulations.h3Titles.title11 }}</h3>
                <p>{{ translations[store.language].regulations.texts.text14 }}</p>
                <h3>{{ translations[store.language].regulations.h3Titles.title12 }}</h3>
                <p>{{ translations[store.language].regulations.texts.text15 }}</p>
                <h3>{{ translations[store.language].regulations.h3Titles.title13 }}</h3>
                <p>{{ translations[store.language].regulations.texts.text16 }}</p>
                
                <h2 id="regseason">{{ translations[store.language].regulations.h2Titles.title7 }}</h2>
                <h3>{{ translations[store.language].regulations.h3Titles.title14 }}</h3>
                <p>{{ translations[store.language].regulations.texts.text17 }}</p>
                <h3>{{ translations[store.language].regulations.h3Titles.title15 }}</h3>
                <p>{{ translations[store.language].regulations.texts.text18 }}</p>
                <h3>{{ translations[store.language].regulations.h3Titles.title16 }}</h3>
                <p>{{ translations[store.language].regulations.texts.text19 }}</p>
                
                <h2 id="endseason">{{ translations[store.language].regulations.h2Titles.title8 }}</h2>
                <h3>{{ translations[store.language].regulations.h3Titles.title17 }}</h3>
                <p>{{ translations[store.language].regulations.texts.text20 }}</p>
                <h3>{{ translations[store.language].regulations.h3Titles.title18 }}</h3>
                <p>{{ translations[store.language].regulations.texts.text21 }}</p>
                
                <h2 id="reregistration">{{ translations[store.language].regulations.h2Titles.title9 }}</h2>
                <h3>{{ translations[store.language].regulations.h3Titles.title19 }}</h3>
                <p>{{ translations[store.language].regulations.texts.text22 }}</p>
                <h3>{{ translations[store.language].regulations.h3Titles.title20 }}</h3>
                <p>{{ translations[store.language].regulations.texts.text23 }}</p>
                
                <h2 id="broadcast">{{ translations[store.language].regulations.h2Titles.title10 }}</h2>
                <h3>{{ translations[store.language].regulations.h3Titles.title21 }}</h3>
                <p>{{ translations[store.language].regulations.texts.text24 }}</p>
                <h3>{{ translations[store.language].regulations.h3Titles.title22 }}</h3>
                <p>{{ translations[store.language].regulations.texts.text25 }}</p>
                
                <h2 id="penalties">{{ translations[store.language].regulations.h2Titles.title11 }}</h2>
                <p>{{ translations[store.language].regulations.texts.text26 }}</p>
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    white-space: pre-line;
}

h2 {
    padding: 20px;
    font-weight: bold;
    text-align: center;
    font-size: 28px;
    color: white;
}

h3 {
    font-weight: bold;
    font-style: italic;
    text-align: center;
    font-size: 22px;
}

.table-of-content {
    text-align: center;
    border: 1px black solid;
}

.table-of-content a {
    display: block;
    margin-bottom: 8px;
}


.regulations p {
    padding: 20px 50px;
    text-align: center;
}

.regulations a {
    display: block;
    text-align: center;
    padding: 20px 0;
}

.table-of-content a:hover,
.regulations a:hover {
    color: white;
  transform: scale(1.2);
  transition: 0.5s ease all;
}

.regulations h2 {
    scroll-margin-top: 100px;
}
</style>
