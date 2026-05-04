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
        <div class="return"  id="table">
            <RouterLink :to="'/circuit'">
                <button>
                    {{ translations[store.language].regulationsligue.other.return }}
                </button>
            </RouterLink>
        </div>
        <div>
            <div class="table-of-content">
                <h2>{{ translations[store.language].regulationscircuit.h2Titles.title12 }}</h2>
                <a href="#admin">{{ translations[store.language].regulationscircuit.h2Titles.title1 }}</a>
                <a href="#circuit">{{ translations[store.language].regulationscircuit.h2Titles.title2 }}</a>
                <a href="#schedule">{{ translations[store.language].regulationscircuit.h2Titles.title3 }}</a>
                <a href="#resgistration">{{ translations[store.language].regulationscircuit.h2Titles.title4 }}</a>
                <a href="#game">{{ translations[store.language].regulationscircuit.h2Titles.title5 }}</a>
                <a href="#sub">{{ translations[store.language].regulationscircuit.h2Titles.title6 }}</a>
                <a href="#tournament">{{ translations[store.language].regulationscircuit.h2Titles.title7 }}</a>
                <a href="#broadcast">{{ translations[store.language].regulationscircuit.h2Titles.title8 }}</a>
                <a href="#penalties">{{ translations[store.language].regulationscircuit.h2Titles.title9 }}</a>
            </div>
            <div class="regulations">
                <h2 id="admin">{{ translations[store.language].regulationscircuit.h2Titles.title1 }}</h2>
                <p class="plain-text">{{ translations[store.language].regulationscircuit.texts.text1 }}</p>
                
                <h2 id="circuit">{{ translations[store.language].regulationscircuit.h2Titles.title2 }}</h2>
                <h3>{{ translations[store.language].regulationscircuit.h3Titles.title1 }}</h3>
                <p>{{ translations[store.language].regulationscircuit.texts.text2 }}</p>
                <h4>{{ translations[store.language].regulationscircuit.h4Titles.title1 }}</h4>
                
                <h3>{{ translations[store.language].regulationscircuit.h3Titles.title2 }}</h3>
                <p>{{ translations[store.language].regulationscircuit.texts.text3 }}</p>
                <h4>{{ translations[store.language].regulationscircuit.h4Titles.title2 }}</h4>
                
                
                <h3>{{ translations[store.language].regulationscircuit.h3Titles.title3 }}</h3>
                <p>{{ translations[store.language].regulationscircuit.texts.text4 }}</p>
                <h4>{{ translations[store.language].regulationscircuit.h4Titles.title3 }}</h4>
                
                
                <h2 id="schedule">{{ translations[store.language].regulationscircuit.h2Titles.title3 }}</h2>
                <p>{{ translations[store.language].regulationscircuit.texts.text5 }}</p>
                <h4>{{ translations[store.language].regulationscircuit.h4Titles.title4 }}</h4>
                <p>{{ translations[store.language].regulationscircuit.texts.text6 }}</p>
                <h4>{{ translations[store.language].regulationscircuit.h4Titles.title5 }}</h4>
                
                
                <h2 id="resgistration">{{ translations[store.language].regulationscircuit.h2Titles.title4 }}</h2>
                <h3>{{ translations[store.language].regulationscircuit.h3Titles.title4 }}</h3>
                <p>{{ translations[store.language].regulationscircuit.texts.text7 }}</p>
                
                <h3>{{ translations[store.language].regulationscircuit.h3Titles.title5 }}</h3>
                <p>{{ translations[store.language].regulationscircuit.texts.text8 }}</p>
                <h4>{{ translations[store.language].regulationscircuit.h4Titles.title6 }}</h4>
                
                
                <h2 id="game">{{ translations[store.language].regulationscircuit.h2Titles.title5 }}</h2>
                <h3>{{ translations[store.language].regulationscircuit.h3Titles.title6 }}</h3>
                <p>{{ translations[store.language].regulationscircuit.texts.text9 }}</p>
                
                <h3>{{ translations[store.language].regulationscircuit.h3Titles.title7 }}</h3>
                <a href="https://drafter.lol/ " target="_blank">Draft</a>
                <p>{{ translations[store.language].regulationscircuit.texts.text10 }}</p>
                <h4>{{ translations[store.language].regulationscircuit.h4Titles.title7 }}</h4>
                <p>{{ translations[store.language].regulationscircuit.texts.text11 }}</p>
                <h4>{{ translations[store.language].regulationscircuit.h4Titles.title8 }}</h4>
                <p>{{ translations[store.language].regulationscircuit.texts.text12 }}</p>
                <h4>{{ translations[store.language].regulationscircuit.h4Titles.title9 }}</h4>
                <p>{{ translations[store.language].regulationscircuit.texts.text13 }}</p>
                <h4>{{ translations[store.language].regulationscircuit.h4Titles.title10 }}</h4>
                <p>{{ translations[store.language].regulationscircuit.texts.text14 }}</p>
                <h4>{{ translations[store.language].regulationscircuit.h4Titles.title11 }}</h4>
                <h5>{{ translations[store.language].regulationscircuit.h5Titles.title1 }}</h5>
                <h4>{{ translations[store.language].regulationscircuit.h4Titles.title12 }}</h4>
                <p>{{ translations[store.language].regulationscircuit.texts.text15 }}</p>
                <h4>{{ translations[store.language].regulationscircuit.h4Titles.title13 }}</h4>
                
                <h3>{{ translations[store.language].regulationscircuit.h3Titles.title8 }}</h3>
                <p>{{ translations[store.language].regulationscircuit.texts.text16 }}</p>
                <h4>{{ translations[store.language].regulationscircuit.h4Titles.title14 }}</h4>
                
                
                <h2 id="sub">{{ translations[store.language].regulationscircuit.h2Titles.title6 }}</h2>
                <p>{{ translations[store.language].regulationscircuit.texts.text17 }}</p>
                <h4>{{ translations[store.language].regulationscircuit.h4Titles.title15 }}</h4>
                
                
                <h2 id="tournament">{{ translations[store.language].regulationscircuit.h2Titles.title7 }}</h2>
                <h3>{{ translations[store.language].regulationscircuit.h3Titles.title9 }}</h3>
                <p>{{ translations[store.language].regulationscircuit.texts.text18 }}</p>
                <h4>{{ translations[store.language].regulationscircuit.h4Titles.title16 }}</h4>
                <p>{{ translations[store.language].regulationscircuit.texts.text19 }}</p>
                
                <h3>{{ translations[store.language].regulationscircuit.h3Titles.title10 }}</h3>
                <p>{{ translations[store.language].regulationscircuit.texts.text20 }}</p>
                
                <h3>{{ translations[store.language].regulationscircuit.h3Titles.title11 }}</h3>
                <p>{{ translations[store.language].regulationscircuit.texts.text21 }}</p>
                
                <h3>{{ translations[store.language].regulationscircuit.h3Titles.title12 }}</h3>
                <p>{{ translations[store.language].regulationscircuit.texts.text22 }}</p>
                <h4>{{ translations[store.language].regulationscircuit.h4Titles.title17 }}</h4>
                
                
                <h2 id="broadcast">{{ translations[store.language].regulationscircuit.h2Titles.title8 }}</h2>
                <h3>{{ translations[store.language].regulationscircuit.h3Titles.title13 }}</h3>
                <p>{{ translations[store.language].regulationscircuit.texts.text23 }}</p>
                
                
                <h2 id="penalties">{{ translations[store.language].regulationscircuit.h2Titles.title9 }}</h2>
                <p>{{ translations[store.language].regulationscircuit.texts.text24 }}</p>
                <h4>{{ translations[store.language].regulationscircuit.h4Titles.title18 }}</h4>
                <p>{{ translations[store.language].regulationscircuit.texts.text25 }}</p>


                <!-- <h3 id="admin">{{ translations[store.language].regulationscircuit.h3Titles.title1 }}</h3>
                <h4 id="admin">{{ translations[store.language].regulationscircuit.h4Titles.title1 }}</h4>
                <h5 id="admin">{{ translations[store.language].regulationscircuit.h5Titles.title1 }}</h5> -->

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

h4 {
    margin: 20px 450px;
    text-align: justify;
}

h5 {
    margin: 20px 500px;
    text-align: justify;
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


.regulations p.plain-text {
    margin: 20px 380px;
    text-align: justify;
}

.regulations p {
    margin: 20px 400px;
    text-align: justify;
}

.return {
    position: sticky;
    top: 80px;
    display: flex;
    justify-content: center;
    z-index: 100;
}

.return button {
    cursor: pointer;
    color: var(--nav-color);
    border: none;
    border-radius: 5px;
    background-color: white;
    font-size: 24px;
    margin-top: 10px;
    /* Pour ajuster le décalage */
}

.return button:hover {
    background-color: var(--nav-color);
    color: white;
    border-color: var(--nav-color);
}

@media (max-width: 1400px) {
    .regulations p.plain-text {
        margin: 20px 180px;
    }

    .regulations p {
        margin: 20px 200px;
    }

    h3 {
        margin: 20px 120px;
    }

    h4 {
        margin: 20px 250px;
    }

    h5 {
        margin: 20px 300px;
    }
}

@media (max-width: 800px) {
    .regulations p.plain-text {
        margin: 20px 60px;
    }

    .regulations p {
        margin: 20px 70px;
    }

    h3 {
        margin: 20px 0px;
    }

    h4 {
        margin: 20px 100px;
    }

    h5 {
        margin: 20px 120px;
    }
}

.regulations a {
    display: block;
    width: fit-content;
    text-align: center;
    margin: 0 auto;
    font-size: 20px;
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
