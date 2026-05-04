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
        <div class="return">
            <RouterLink :to="'/ligue'">
                <button>
                    {{ translations[store.language].regulationsligue.other.return }}
                </button>
            </RouterLink>
        </div>
        <div>
            <h2>{{ translations[store.language].components.blocks.schedule }}</h2>
            <div class="schedule">
                <div class="week">
                    <h3>{{ translations[store.language].schedule.week }} #1</h3>
                    <h3>1 - 7 {{ translations[store.language].months.june }} 2026</h3>
                    <div class="teams">
                        <div class="teamblue">
                            <h4 class="blue">{{ translations[store.language].schedule.sideblue }}</h4>
                            <p>...</p>
                            <p>...</p>
                        </div>
                        <div class="teamred">
                            <h4 class="red">{{ translations[store.language].schedule.sidered }}</h4>
                            <p>...</p>
                            <p>...</p>
                        </div>
                    </div>
                </div>
                <div class="week">
                    <h3>{{ translations[store.language].schedule.week }} #2</h3>
                    <h3>8 - 14 {{ translations[store.language].months.june }} 2026</h3>
                    <div class="teams">
                        <div class="teamblue">
                            <h4 class="blue">{{ translations[store.language].schedule.sideblue }}</h4>
                            <p>...</p>
                            <p>...</p>
                        </div>
                        <div class="teamred">
                            <h4 class="red">{{ translations[store.language].schedule.sidered }}</h4>
                            <p>...</p>
                            <p>...</p>
                        </div>
                    </div>
                </div>
                <div class="week">
                    <h3>{{ translations[store.language].schedule.week }} #3</h3>
                    <h3>15 - 21 {{ translations[store.language].months.june }} 2026</h3>
                    <div class="teams">
                        <div class="teamblue">
                            <h4 class="blue">{{ translations[store.language].schedule.sideblue }}</h4>
                            <p>...</p>
                            <p>...</p>
                        </div>
                        <div class="teamred">
                            <h4 class="red">{{ translations[store.language].schedule.sidered }}</h4>
                            <p>...</p>
                            <p>...</p>
                        </div>
                    </div>
                </div>
                <div class="week">
                    <h3>{{ translations[store.language].schedule.week }} #4</h3>
                    <h3>22 - 28 {{ translations[store.language].months.june }} 2026</h3>
                    <div class="teams">
                        <div class="teamblue">
                            <h4 class="blue">{{ translations[store.language].schedule.sideblue }}</h4>
                            <p>...</p>
                            <p>...</p>
                        </div>
                        <div class="teamred">
                            <h4 class="red">{{ translations[store.language].schedule.sidered }}</h4>
                            <p>...</p>
                            <p>...</p>
                        </div>
                    </div>
                </div>
                <div class="week">
                    <h3>{{ translations[store.language].schedule.week }} #5</h3>
                    <h3>29 {{ translations[store.language].months.june }} - 5 {{ translations[store.language].months.july }} 2026</h3>
                    <div class="teams">
                        <div class="teamblue">
                            <h4 class="blue">{{ translations[store.language].schedule.sideblue }}</h4>
                            <p>...</p>
                            <p>...</p>
                        </div>
                        <div class="teamred">
                            <h4 class="red">{{ translations[store.language].schedule.sidered }}</h4>
                            <p>...</p>
                            <p>...</p>
                        </div>
                    </div>
                </div>
                <div class="week">
                    <h3>{{ translations[store.language].schedule.week }} #6</h3>
                    <h3>6 - 12 {{ translations[store.language].months.july }} 2026</h3>
                    <div class="teams">
                        <div class="teamblue">
                            <h4 class="blue">{{ translations[store.language].schedule.sideblue }}</h4>
                            <p>...</p>
                            <p>...</p>
                        </div>
                        <div class="teamred">
                            <h4 class="red">{{ translations[store.language].schedule.sidered }}</h4>
                            <p>...</p>
                            <p>...</p>
                        </div>
                    </div>
                </div>
                <div class="week">
                    <h3>{{ translations[store.language].schedule.week }} #7</h3>
                    <h3>13 - 19 {{ translations[store.language].months.july }} 2026</h3>
                    <div class="teams">
                        <div class="teamblue">
                            <h4 class="blue">{{ translations[store.language].schedule.sideblue }}</h4>
                            <p>...</p>
                            <p>...</p>
                        </div>
                        <div class="teamred">
                            <h4 class="red">{{ translations[store.language].schedule.sidered }}</h4>
                            <p>...</p>
                            <p>...</p>
                        </div>
                    </div>
                </div>
                <div class="week">
                    <h3>{{ translations[store.language].schedule.quarterfinal }}</h3>
                    <h3>20 - 26 {{ translations[store.language].months.july }} 2026</h3>
                    <div class="teams">
                        <div class="teamblue">
                            <h4 class="blue">{{ translations[store.language].schedule.sideblue }}</h4>
                            <p>...</p>
                            <p>...</p>
                        </div>
                        <div class="teamred">
                            <h4 class="red">{{ translations[store.language].schedule.sidered }}</h4>
                            <p>...</p>
                            <p>...</p>
                        </div>
                    </div>
                </div>
                <div class="week">
                    <h3>{{ translations[store.language].schedule.semifinal }}</h3>
                    <h3>27 {{ translations[store.language].months.july }} - 2 {{ translations[store.language].months.august }} 2026</h3>
                    <div class="teams">
                        <div class="teamblue">
                            <h4 class="blue">{{ translations[store.language].schedule.sideblue }}</h4>
                            <p>...</p>
                            <p>...</p>
                        </div>
                        <div class="teamred">
                            <h4 class="red">{{ translations[store.language].schedule.sidered }}</h4>
                            <p>...</p>
                            <p>...</p>
                        </div>
                    </div>
                </div>
                <div class="week">
                    <h3>{{ translations[store.language].schedule.grandfinal }}</h3>
                    <h3>3 - 9 {{ translations[store.language].months.august }} 2026</h3>
                    <div class="teams">
                        <div class="teamblue">
                            <h4 class="blue">{{ translations[store.language].schedule.sideblue }}</h4>
                            <p>...</p>
                            <p>...</p>
                        </div>
                        <div class="teamred">
                            <h4 class="red">{{ translations[store.language].schedule.sidered }}</h4>
                            <p>...</p>
                            <p>...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    white-space: pre-line;
    background-color: rgb(24, 24, 24);
    text-align: center;
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
    color: white;
    font-size: 18px;
}

h4 {
    color: black;
    font-size: large;
    font-weight: bolder;
    border-bottom: 1px solid;
    padding: 0 100px;
}

h4.blue {
    background-color: rgb(57, 57, 249);
}

h4.red {
    background-color: rgb(249, 83, 83);
}

.schedule {
    display: flex;
    flex-direction: column;
    gap: 50px;
    padding-bottom: 50px;
}

.teams {
    display: flex;
    justify-content: center;
}

.teamblue {
    background-color: rgb(129, 129, 254);
    border: 3px solid black;
}

.teamred {
    background-color: rgb(255, 138, 138);
    border: 3px solid black;
}

p {
    color: black;
    border-bottom: 1px solid;
    padding: 0 100px;
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

@media (max-width: 1400px) {}

@media (max-width: 800px) {}
</style>
