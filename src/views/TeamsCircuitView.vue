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
            <h2>{{ translations[store.language].components.blocks.teams }}</h2>
            <div class="schedule">
                <div class="team">
                    <h3>Nom de l'équipe</h3>
                    <h4>2026-01-01</h4>
                    <div class="members">
                        <div class="members-section">
                            <p class="first-column">X</p>
                            <p>Top</p>
                            <p>Jungle</p>
                            <p>Mid</p>
                            <p>ADC</p>
                            <p>Support</p>
                            <p>SupportSub #1</p>
                            <p>SupportSub #2</p>
                            <p>SupportSub #3</p>
                        </div>
                        <div class="members-section">
                            <p class="first-column">Rank</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                        </div>
                        <div class="members-section">
                            <p class="first-column">Cap</p>
                            <p>X</p>
                            <p>X</p>
                            <p>C</p>
                            <p>X</p>
                            <p>X</p>
                            <p>X</p>
                            <p>X</p>
                            <p>X</p>
                        </div>
                        <div class="members-section">
                            <p class="first-column">Discord</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                        </div>
                        <div class="members-section">
                            <p class="first-column">Main Account</p>
                            <a href="">main link</a>
                            <a href="">main link</a>
                            <a href="">main link</a>
                            <a href="">main link</a>
                            <a href="">main link</a>
                            <a href="">main link</a>
                            <a href="">main link</a>
                            <a href="">main link</a>
                        </div>
                        <div class="members-section">
                            <p href="" class="first-column">Other Accounts</p>
                            <a href="">other link</a>
                            <a href="">other link</a>
                            <a href="">other link</a>
                            <a href="">other link</a>
                            <a href="">other link</a>
                            <a href="">other link</a>
                            <a href="">other link</a>
                            <a href="">other link</a>
                        </div>
                    </div>
                </div>
                <div class="team">
                    <h3>Nom de l'équipe</h3>
                    <h4>2026-01-01</h4>
                    <div class="members">
                        <div class="members-section">
                            <p class="first-column">X</p>
                            <p>Top</p>
                            <p>Jungle</p>
                            <p>Mid</p>
                            <p>ADC</p>
                            <p>Support</p>
                            <p>SupportSub #1</p>
                            <p>SupportSub #2</p>
                            <p>SupportSub #3</p>
                        </div>
                        <div class="members-section">
                            <p class="first-column">Rank</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                        </div>
                        <div class="members-section">
                            <p class="first-column">Cap</p>
                            <p>X</p>
                            <p>X</p>
                            <p>C</p>
                            <p>X</p>
                            <p>X</p>
                            <p>X</p>
                            <p>X</p>
                            <p>X</p>
                        </div>
                        <div class="members-section">
                            <p class="first-column">Discord</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                        </div>
                        <div class="members-section">
                            <p class="first-column">Main Account</p>
                            <a href="">main link</a>
                            <a href="">main link</a>
                            <a href="">main link</a>
                            <a href="">main link</a>
                            <a href="">main link</a>
                            <a href="">main link</a>
                            <a href="">main link</a>
                            <a href="">main link</a>
                        </div>
                        <div class="members-section">
                            <p href="" class="first-column">Other Accounts</p>
                            <a href="">other link</a>
                            <a href="">other link</a>
                            <a href="">other link</a>
                            <a href="">other link</a>
                            <a href="">other link</a>
                            <a href="">other link</a>
                            <a href="">other link</a>
                            <a href="">other link</a>
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

.schedule {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
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
    color: black;
    font-size: large;
    font-weight: bolder;
    border-bottom: 1px solid;
    padding: 0 100px;
    font-size: 22px;
    background-color: rgb(186, 186, 186);
}

h4 {
    color: black;
    font-size: large;
    font-weight: bolder;
    border-bottom: 1px solid;
    padding: 0 100px;
    font-size: 18px;
    background-color: rgb(186, 186, 186);
}

.team {
    background-color: white;
    border: 5px solid black;
}

.members {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    border-top: 5px solid black;
}

.members-section {
    border-right: 1px solid black;
}

p, a {
    color: black;
    border-bottom: 1px solid;
    font-size: 14px;
    display: block;
}

a {
    color: blue;
    text-decoration: underline;
}


@media (max-width: 1200px) {
    p, a {
        font-size: 12px;
    }
}

@media (max-width: 1024px) {
    .schedule {
        grid-template-columns: 1fr;
    }

    p, a {
        font-size: 10px;
    }
}

@media (max-width: 600px) {
    p, a {
        font-size: 8px;
    }
}
</style>