<script setup>
import { computed, ref, watch } from 'vue'
import { store } from '../store.js'
import { getEvents } from '../events.js'
import { translations } from '@/i18n/translations'
import EventCard from '../components/EventCard.vue';

const events = ref([])
const isLoadingEvents = ref(false)
const eventsError = ref('')

const currentTranslations = computed(() => {
    return translations[store.language].events
})

const loadEvents = async () => {
    if (!store.user || !store.accessToken) {
        events.value = []
        return
    }

    isLoadingEvents.value = true
    eventsError.value = ''

    try {
        events.value = await getEvents()
    }
    catch (error) {
        eventsError.value = error.message
    }
    finally {
        isLoadingEvents.value = false
    }
}

const groupedEvents = computed(() => {
    const groups = {
        circuit: [],
        league: [],
        other: []
    }

    for (const event of events.value) {
        const normalizedName = event.name
            ?.trim()
            .toLocaleLowerCase()

        if (normalizedName?.startsWith('circuit')) {
            groups.circuit.push(event)
        }
        else if (
            normalizedName?.startsWith('ligue') ||
            normalizedName?.startsWith('league')
        ) {
            groups.league.push(event)
        }
        else {
            groups.other.push(event)
        }
    }

    const sortByName = (firstEvent, secondEvent) => {
        return firstEvent.name.localeCompare(
            secondEvent.name,
            store.language === 'fr' ? 'fr' : 'en',
            {
                sensitivity: 'base',
                numeric: true
            }
        )
    }

    groups.circuit.sort(sortByName)
    groups.league.sort(sortByName)
    groups.other.sort(sortByName)

    return groups
})

watch(
    [
        () => store.accessToken,
        () => store.user
    ],
    async ([accessToken, user]) => {
        if (!accessToken || !user) {
            events.value = []
            eventsError.value = ''
            return
        }

        await loadEvents()
    },
    { immediate: true }
)
</script>

<template>
    <main class="events-page">
        <section class="events-container">
            <h1>{{ currentTranslations.title }}</h1>

            <!-- User non connecté -->
            <div v-if="!store.user || !store.accessToken" class="state-card">
                <h2>{{ currentTranslations.loginRequiredTitle }}</h2>

                <p>
                    {{ currentTranslations.loginRequired }}
                </p>

                <RouterLink to="/" class="main-button">
                    {{ currentTranslations.returnHome }}
                </RouterLink>
            </div>

            <!-- Chargement -->
            <div v-else-if="isLoadingEvents" class="state-card">
                <p>{{ currentTranslations.loading }}</p>
            </div>

            <!-- Erreur -->
            <div v-else-if="eventsError" class="state-card error-card">
                <p>{{ eventsError }}</p>

                <button type="button" class="main-button" @click="loadEvents">
                    {{ currentTranslations.retry }}
                </button>
            </div>

            <!-- Aucun événement -->
            <div v-else-if="!events.length" class="state-card">
                <p>{{ currentTranslations.none }}</p>
            </div>

            <div v-else class="event-groups">
                <section v-if="groupedEvents.circuit.length" class="event-group">
                    <h2 class="group-title">
                        {{ currentTranslations.circuitEvents }}
                    </h2>

                    <div class="events-list">
                        <EventCard v-for="event in groupedEvents.circuit" :key="event.id" :event="event" />
                    </div>
                </section>

                <section v-if="groupedEvents.league.length" class="event-group">
                    <h2 class="group-title">
                        {{ currentTranslations.leagueEvents }}
                    </h2>

                    <div class="events-list">
                        <EventCard v-for="event in groupedEvents.league" :key="event.id" :event="event" />
                    </div>
                </section>

                <section v-if="groupedEvents.other.length" class="event-group">
                    <h2 class="group-title">
                        {{ currentTranslations.otherEvents }}
                    </h2>

                    <div class="events-list">
                        <EventCard v-for="event in groupedEvents.other" :key="event.id" :event="event" />
                    </div>
                </section>
            </div>
        </section>
    </main>
</template>

<style scoped>
.events-page {
    min-height: 100vh;
    padding: 120px 40px 60px;
    background:
        radial-gradient(circle at top,
            rgba(210, 20, 124, 0.15),
            rgba(0, 0, 0, 1) 55%),
        #050505;
}

.events-container {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
}

.events-container>h1 {
    margin: 0 0 45px;
    color: #f5f5f5;
    font-size: 3rem;
    letter-spacing: 4px;
    text-align: center;
    text-transform: uppercase;
}

.events-list {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.state-card {
    padding: 35px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    background:
        linear-gradient(145deg,
            rgba(20, 20, 20, 0.96),
            rgba(40, 40, 40, 0.88));
    box-shadow: 0 0 45px rgba(0, 0, 0, 0.55);
}

.state-card {
    color: #d6d6d6;
    text-align: center;
}

.state-card h2 {
    margin-top: 0;
    color: white;
}

.error-card {
    border-color: rgba(255, 80, 80, 0.3);
    background: rgba(255, 80, 80, 0.08);
    color: #ff9d9d;
}



.event-groups {
    display: flex;
    flex-direction: column;
    gap: 55px;
}

.event-group {
    display: flex;
    flex-direction: column;
    gap: 22px;
}

.group-title {
    margin: 0;
    padding-bottom: 12px;
    color: white;
    font-size: 2rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    border-bottom: 2px solid rgba(210, 20, 124, 0.5);
}

@media (max-width: 850px) {
    .event-dates {
        grid-template-columns: 1fr;
    }

    .divisions-list {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 600px) {
    .events-page {
        padding: 110px 20px 40px;
    }

    .events-container>h1 {
        font-size: 2rem;
    }

    .state-card {
        padding: 25px 20px;
    }
}
</style>