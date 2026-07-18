<script setup>
import { computed } from 'vue'
import { store } from '../store.js'
import { translations } from '@/i18n/translations'

// Événement à afficher.
const props = defineProps({
    event: {
        type: Object,
        required: true
    }
})

// Retourne les traductions correspondant à la langue actuellement sélectionnée.
const currentTranslations = computed(() => {
    return translations[store.language].events
})

// Formate une date selon la langue de l'utilisateur.
// Retourne "Non spécifié" si la date est invalide ou absente.
const formatDate = (dateValue) => {
    if (!dateValue) {
        return currentTranslations.value.notSpecified
    }

    const date = new Date(dateValue)

    if (Number.isNaN(date.getTime())) {
        return currentTranslations.value.notSpecified
    }

    return new Intl.DateTimeFormat(
        store.language === 'fr' ? 'fr-CA' : 'en-CA',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }
    ).format(date)
}

// Retourne le libellé traduit correspondant au statut de l'événement.
const getEventStatusLabel = (status) => {
    return currentTranslations.value.statuses?.[status] || status
}

// Génère le texte affichant la capacité d'une division.
const getDivisionCapacityText = (division) => {
    if (
        division.teamCapacity === null ||
        division.teamCapacity === undefined
    ) {
        return currentTranslations.value.unlimitedCapacity
    }

    return currentTranslations.value.capacity
        .replace('{approved}', division.approvedTeamCount ?? 0)
        .replace('{capacity}', division.teamCapacity)
}

// Détermine si les inscriptions sont actuellement ouvertes.
// Les inscriptions sont disponibles uniquement si :
// - l'événement est ouvert;
// - la date actuelle est comprise entre l'ouverture et la fermeture des inscriptions.
const isRegistrationOpen = computed(() => {
    if (props.event.status !== 'open') {
        return false
    }

    const now = Date.now()
    const opensAt = new Date(props.event.registrationOpensAt).getTime()
    const closesAt = new Date(props.event.registrationClosesAt).getTime()

    return (
        !Number.isNaN(opensAt) &&
        !Number.isNaN(closesAt) &&
        now >= opensAt &&
        now < closesAt
    )
})
</script>

<template>
    <article class="event-card">
        <div class="event-header">
            
            <!-- Informations générales de l'événement -->

            <div>
                <h2>{{ event.name }}</h2>

                <span class="event-status" :class="`status-${event.status}`">
                    {{ getEventStatusLabel(event.status) }}
                </span>
            </div>
        </div>

        <!-- Description -->

        <p v-if="event.description" class="event-description">
            {{ event.description }}
        </p>

        <!-- Dates importantes -->

        <div class="event-dates">
            <div class="event-info">
                <span class="info-label">
                    {{ currentTranslations.eventStart }}
                </span>

                <span>{{ formatDate(event.startsAt) }}</span>
            </div>

            <div class="event-info">
                <span class="info-label">
                    {{ currentTranslations.registrationOpening }}
                </span>

                <span>{{ formatDate(event.registrationOpensAt) }}</span>
            </div>

            <div class="event-info">
                <span class="info-label">
                    {{ currentTranslations.registrationClosing }}
                </span>

                <span>{{ formatDate(event.registrationClosesAt) }}</span>
            </div>
        </div>

        <!-- Liste des divisions -->

        <div v-if="event.divisions?.length" class="divisions-section">
            <h3>{{ currentTranslations.divisions }}</h3>

            <div class="divisions-list">
                <div v-for="division in event.divisions" :key="division.id" class="division-card" :class="{
                    'division-full': division.isAtApprovedCapacity
                }">
                    <div class="division-header">
                        <h4>{{ division.name }}</h4>

                        <span v-if="division.isAtApprovedCapacity" class="full-label">
                            {{ currentTranslations.full }}
                        </span>
                    </div>

                    <p>{{ getDivisionCapacityText(division) }}</p>
                </div>
            </div>
        </div>

        <p v-else class="no-divisions">
            {{ currentTranslations.noDivisions }}
        </p>

        <!-- Bouton d'inscription (visible uniquement lorsque les inscriptions sont ouvertes) -->

        <RouterLink v-if="isRegistrationOpen" :to="{
            path: '/registration',
            query: { event: event.id }
        }" class="main-button event-button">
            {{ currentTranslations.registration }}
        </RouterLink>
    </article>
</template>

<style scoped>
.event-card {
    padding: 35px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    background:
        linear-gradient(145deg,
            rgba(20, 20, 20, 0.96),
            rgba(40, 40, 40, 0.88));
    box-shadow: 0 0 45px rgba(0, 0, 0, 0.55);
}

.event-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
}

.event-header h2 {
    margin: 0 0 12px;
    color: white;
    font-size: 2rem;
    letter-spacing: 1px;
}

.event-status {
    display: inline-block;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
}

.status-open {
    color: #78ff9c;
    border: 1px solid rgba(120, 255, 156, 0.35);
    background: rgba(120, 255, 156, 0.1);
}

.status-closed {
    color: #ffcb78;
    border: 1px solid rgba(255, 203, 120, 0.35);
    background: rgba(255, 203, 120, 0.1);
}

.event-description {
    margin: 25px 0;
    color: #d6d6d6;
    line-height: 1.7;
    white-space: pre-line;
}

.event-dates {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    margin-top: 25px;
}

.event-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 18px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 12px;
    background: rgba(0, 0, 0, 0.25);
    color: #d6d6d6;
}

.info-label {
    color: white;
    font-size: 0.9rem;
    font-weight: 700;
}

.divisions-section {
    margin-top: 30px;
}

.divisions-section>h3 {
    margin-bottom: 18px;
    color: white;
    font-size: 1.4rem;
}

.divisions-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
}

.division-card {
    padding: 18px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.04);
}

.division-card.division-full {
    border-color: rgba(255, 123, 123, 0.3);
    background: rgba(255, 123, 123, 0.06);
}

.division-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
}

.division-header h4 {
    margin: 0;
    color: white;
    font-size: 1.05rem;
}

.division-card p {
    margin: 10px 0 0;
    color: #bfbfbf;
}

.full-label {
    padding: 4px 8px;
    border-radius: 12px;
    background: rgba(255, 123, 123, 0.12);
    color: #ff7b7b;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
}

.no-divisions {
    margin-top: 25px;
    color: #b8b8b8;
    font-style: italic;
}

.main-button {
    display: inline-block;
    margin-top: 25px;
    padding: 13px 22px;
    border: none;
    border-radius: 10px;
    background: #d2147c;
    color: white;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    transition:
        transform 0.25s,
        filter 0.25s;
}

.main-button:hover {
    transform: translateY(-2px);
    filter: brightness(1.12);
}

.event-button {
    margin-top: 30px;
}

@media (max-width: 600px) {
    .event-card {
        padding: 25px 20px;
    }

    .event-header h2 {
        font-size: 1.6rem;
    }

    .division-header {
        align-items: flex-start;
        flex-direction: column;
    }
}
</style>