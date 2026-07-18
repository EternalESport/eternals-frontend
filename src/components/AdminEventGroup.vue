<script setup>
import { store } from '../store.js'
import { translations } from '@/i18n/translations'

defineProps({
    title: {
        type: String,
        required: true
    },

    events: {
        type: Array,
        required: true
    }
})

const emit = defineEmits([
    'edit',
    'delete'
])

// Formate une date selon la langue actuellement sélectionnée.
function formatDate(dateValue) {
    if (!dateValue) return '—'

    const date = new Date(dateValue)

    if (Number.isNaN(date.getTime())) {
        return '—'
    }

    return new Date(dateValue).toLocaleString(
        store.language === 'fr' ? 'fr-CA' : 'en-CA',
        {
            dateStyle: 'medium',
            timeStyle: 'short'
        }
    )
}
</script>

<template>
    <section v-if="events.length" class="admin-event-group">
        <h3 class="event-group-title">
            {{ title }}
        </h3>

        <div class="events-grid">
            <div v-for="event in events" :key="event.id" class="event-card">
                <div class="event-top">
                    <h3>{{ event.name }}</h3>

                    <span class="status-pill">
                        {{ event.status }}
                    </span>
                </div>

                <div class="info-grid event-info-grid">
                    <div>
                        <span>
                            {{ translations[store.language].admin.eventstarts }}
                        </span>

                        <strong>{{ formatDate(event.startsAt) }}</strong>
                    </div>

                    <div>
                        <span>
                            {{ translations[store.language].admin.eventregistrationopens }}
                        </span>

                        <strong>
                            {{ formatDate(event.registrationOpensAt) }}
                        </strong>
                    </div>

                    <div>
                        <span>
                            {{ translations[store.language].admin.eventregistrationcloses }}
                        </span>

                        <strong>
                            {{ formatDate(event.registrationClosesAt) }}
                        </strong>
                    </div>

                    <div>
                        <span>Description</span>

                        <strong>{{ event.description || '—' }}</strong>
                    </div>
                </div>

                <div v-if="event.divisions?.length" class="divisions-list">
                    <h4>Divisions</h4>

                    <div v-for="division in event.divisions" :key="division.id" class="division-row">
                        <span>{{ division.name }}</span>

                        <strong>
                            {{ division.approvedTeamCount ?? 0 }} /
                            {{ division.teamCapacity ?? '∞' }}
                        </strong>
                    </div>
                </div>

                <div class="actions">
                    <button class="pending-button" @click="emit('edit', event)">
                        {{ translations[store.language].admin.buttonedit }}
                    </button>

                    <button class="delete-button" @click="emit('delete', event.id)">
                        {{ translations[store.language].admin.buttondelete }}
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.admin-event-group {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.event-group-title {
    margin: 0;
    padding-bottom: 10px;
    color: white;
    font-size: 1.5rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    border-bottom: 2px solid rgba(210, 20, 124, 0.5);
}

.events-grid {
    display: grid;
    gap: 20px;
    margin-top: 20px;
}

.event-info-grid {
    margin-top: 16px;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-top: 20px;
}

.info-grid>div {
    padding: 12px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
}

.info-grid span {
    display: block;
    color: #a7a7a7;
    font-size: 13px;
}

.event-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 14px;
    padding: 18px;
}

.event-top {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: center;
}

.event-top h3 {
    margin: 0;
}

.status-pill {
    background: rgba(210, 20, 124, 0.22);
    color: #f9a8d4;
    border: 1px solid rgba(210, 20, 124, 0.45);
    border-radius: 999px;
    padding: 6px 12px;
    font-size: 13px;
    font-weight: bold;
    text-transform: uppercase;
}

.divisions-list {
    margin-top: 18px;
}

.divisions-list h4 {
    margin-bottom: 10px;
}

.division-row {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.actions {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    align-items: center;
    margin-top: 24px;
}

.pending-button,
.delete-button {
    border: none;
    border-radius: 10px;
    padding: 10px 16px;
    font-weight: bold;
    cursor: pointer;
}

.pending-button {
    background: #f59e0b;
    color: white;
}

.delete-button {
    background: #991b1b;
    color: white;
}

.actions {
    margin-top: 24px;
}

@media (max-width: 768px) {
    .info-grid {
        grid-template-columns: 1fr;
    }

    .actions {
        flex-direction: column;
        align-items: stretch;
    }
}
</style>