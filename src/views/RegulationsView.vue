<script setup>
import { store, setLanguage } from '../store.js'
import { translations } from '@/i18n/translations'
import HeroHeader from '../components/HeroHeader.vue'
import OurPartners from '../components/OurPartners.vue';

</script>

<template>
    <HeroHeader />
    <div class="fade">
        <OurPartners />
    </div>
    <main>
        <div>
            <div class="table-of-content">
                <h2 id="#table">{{ translations[store.language].regulations.h2Titles.title12 }}</h2>
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
        <a href="#table">
            <button class="scroll-top">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M12 4l-8 8h5v8h6v-8h5z" />
                </svg>
            </button>
        </a>
    </main>
</template>

<style scoped>
main {
    white-space: pre-line;
    background-color: rgb(24, 24, 24);
}

.fade {
    background: linear-gradient(to bottom, rgba(56, 56, 56, 0), #6A6D7A);
    height: 300px;
    margin-top: -300px;
    width: 100%;
    z-index: 1;
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
    text-align: justify;
    margin: 20px 300px;
    font-size: 22px;
    padding: 20px 50px;
    color: white;
}

.table-of-content {
    text-align: center;
}

.table-of-content a {
    display: block;
    width: fit-content;
    margin: 0 auto 8px auto;
    font-size: 20px;
}


.regulations p {
    margin: 20px 400px;
    text-align: justify;
}

@media (max-width: 1400px) {
    .regulations p {
        margin: 20px 200px;
    }

    h3 {
        margin: 20px 120px;
    }
}

@media (max-width: 800px) {
    .regulations p {
        margin: 20px 70px;
    }

    h3 {
        margin: 20px 0px;
    }
}

.regulations a {
    display: block;
    width: fit-content;
    text-align: center;
    margin: 0 auto;
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

.scroll-top {
    cursor: pointer;
    color: var(--main-color);
    border: none;
    border-radius: 5px;
    background-color: white;
    position: sticky;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    /* Pour ajuster le décalage */
}

.scroll-top:hover {
    background-color: var(--main-color);
    color: white;
    border-color: var(--main-color);
}
</style>
