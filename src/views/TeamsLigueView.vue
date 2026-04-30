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
                    <h3>Team Du Nord (placeholder)</h3>
                    <h4>2026-01-01 (placeholder)</h4>
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
                            <p>Bs de St-Jérôme (placeholder)</p>
                            <p>Tengenz (placeholder)</p>
                            <p>Aerin (placeholder)</p>
                            <p>1Shot (placeholder)</p>
                            <p>thekilerone (placeholder)</p>
                            <p>Pita (placeholder)</p>
                            <p>capt (placeholder)</p>
                            <p>Bulle (placeholder)</p>
                        </div>
                        <div class="members-section">
                            <p class="first-column">Main Account</p>
                            <p>main account link</p>
                            <p>main account link</p>
                            <p>main account link</p>
                            <p>main account link</p>
                            <p>main account link</p>
                            <p>main account link</p>
                            <p>main account link</p>
                            <p>main account link</p>
                        </div>
                        <div class="members-section">
                            <p class="first-column">Other Accounts</p>
                            <p>other account link</p>
                            <p>other account link</p>
                            <p>other account link</p>
                            <p>other account link</p>
                            <p>other account link</p>
                            <p>other account link</p>
                            <p>other account link</p>
                            <p>other account link</p>
                        </div>
                    </div>
                </div>
                <div class="team">
                    <h3>Team Du Nord (placeholder)</h3>
                    <h4>2026-01-01 (placeholder)</h4>
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
                            <p>Bs de St-Jérôme (placeholder)</p>
                            <p>Tengenz (placeholder)</p>
                            <p>Aerin (placeholder)</p>
                            <p>1Shot (placeholder)</p>
                            <p>thekilerone (placeholder)</p>
                            <p>Pita (placeholder)</p>
                            <p>capt (placeholder)</p>
                            <p>Bulle (placeholder)</p>
                        </div>
                        <div class="members-section">
                            <p class="first-column">Main Account</p>
                            <p>main account link</p>
                            <p>main account link</p>
                            <p>main account link</p>
                            <p>main account link</p>
                            <p>main account link</p>
                            <p>main account link</p>
                            <p>main account link</p>
                            <p>main account link</p>
                        </div>
                        <div class="members-section">
                            <p class="first-column">Other Accounts</p>
                            <p>other account link</p>
                            <p>other account link</p>
                            <p>other account link</p>
                            <p>other account link</p>
                            <p>other account link</p>
                            <p>other account link</p>
                            <p>other account link</p>
                            <p>other account link</p>
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
    color: black;
    font-size: large;
    font-weight: bolder;
    border-bottom: 1px solid;
    padding: 0 100px;
    font-size: 22px;
    background-color: rgb(255, 178, 35);
}

h4 {
    color: black;
    font-size: large;
    font-weight: bolder;
    border-bottom: 1px solid;
    padding: 0 100px;
    font-size: 18px;
}

.team {
    background-color: rgb(216, 216, 216);
    border: 5px solid black;
}

.members {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    border-top: 5px solid black;
}

.first-column {
    background-color: rgb(252, 216, 148);
}

.members-section {
    border-right: 1px solid black;
}

p {
    color: black;
    border-bottom: 1px solid;
}


@media (max-width: 1020px) {
    .members {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 800px) {
    .members {
        grid-template-columns: 1fr;
    }
}
</style>
