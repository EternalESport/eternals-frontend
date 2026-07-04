<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { store } from '../store.js'
import { translations } from '@/i18n/translations'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const registrations = ref([])
const loading = ref(false)

const updatingRegistration = ref(false)
const approvedRegistrations = ref([])
const loadingApproved = ref(false)

const rejectedRegistrations = ref([])
const loadingRejected = ref(false)

const events = ref([])
const loadingEvents = ref(false)

const rejectReasons = ref({})

const eventError = ref('')
const eventSuccess = ref('')

const registrationError = ref('')
const registrationSuccess = ref('')


const isAdmin = computed(() => store.user?.role === 'ADMIN')

const editingEventId = ref(null)
const savingEvent = ref(false)

const eventForm = ref({
    name: '',
    slug: '',
    description: '',
    status: 'draft',
    startsAt: '',
    registrationOpensAt: '',
    registrationClosesAt: '',
    divisions: [
        { name: 'Division Emergence', sortOrder: 0, teamCapacity: null },
        { name: 'Division Academy', sortOrder: 1, teamCapacity: null },
        { name: 'Division Prestige', sortOrder: 2, teamCapacity: null },
        { name: 'Division Uncapped', sortOrder: 3, teamCapacity: null }
    ]
})

let messageTimer = null

function clearMessage(messageRef) {
    clearTimeout(messageTimer)

    messageTimer = setTimeout(() => {
        messageRef.value = ''
    }, 6000)
}

function resetEventForm() {
    slugSuffix.value = generateRandomNumber()
    editingEventId.value = null
    eventForm.value = {
        name: '',
        slug: '',
        description: '',
        status: 'draft',
        startsAt: '',
        registrationOpensAt: '',
        registrationClosesAt: '',
        divisions: [
            { name: 'Division Emergence', sortOrder: 0, teamCapacity: null },
            { name: 'Division Academy', sortOrder: 1, teamCapacity: null },
            { name: 'Division Prestige', sortOrder: 2, teamCapacity: null },
            { name: 'Division Uncapped', sortOrder: 3, teamCapacity: null }
        ]
    }
}

function editEvent(event) {
    editingEventId.value = event.id

    eventForm.value = {
        name: event.name ?? '',
        slug: event.slug ?? '',
        description: event.description ?? '',
        status: event.status ?? 'draft',
        startsAt: event.startsAt?.slice(0, 16) ?? '',
        registrationOpensAt: event.registrationOpensAt?.slice(0, 16) ?? '',
        registrationClosesAt: event.registrationClosesAt?.slice(0, 16) ?? '',
        divisions: []
    }
}

function addDivision() {
    eventForm.value.divisions.push({
        name: '',
        sortOrder: eventForm.value.divisions.length + 1,
        teamCapacity: null
    })
}

function removeDivision(index) {
    eventForm.value.divisions.splice(index, 1)
}

async function saveEvent() {
    eventError.value = ''
    eventSuccess.value = ''
    savingEvent.value = true

    if (!editingEventId.value && !eventForm.value.slug) {
        eventForm.value.slug = `${generateSlug(eventForm.value.name)}-${slugSuffix.value}`
    }

    const payload = {
        name: eventForm.value.name,
        slug: eventForm.value.slug,
        description: eventForm.value.description,
        status: eventForm.value.status,
        startsAt: new Date(eventForm.value.startsAt).toISOString(),
        registrationOpensAt: new Date(eventForm.value.registrationOpensAt).toISOString(),
        registrationClosesAt: new Date(eventForm.value.registrationClosesAt).toISOString()
    }

    if (!editingEventId.value) {
        payload.divisions = eventForm.value.divisions.map(division => ({
            name: division.name,
            sortOrder: Number(division.sortOrder) || 0,
            teamCapacity:
                division.teamCapacity === '' || division.teamCapacity === null
                    ? null
                    : Number(division.teamCapacity)
        }))
    }

    try {
        if (editingEventId.value) {
            await adminFetch(`/api/admin/events/${editingEventId.value}`, {
                method: 'PATCH',
                body: JSON.stringify(payload)
            })

            eventSuccess.value = translations[store.language].admin.eventupdatedsuccessfully
            clearMessage(eventSuccess)
        } else {
            await adminFetch('/api/admin/events', {
                method: 'POST',
                body: JSON.stringify(payload)
            })

            eventSuccess.value = translations[store.language].admin.eventcreatedsuccessfully
            clearMessage(eventSuccess)
        }

        resetEventForm()
        await loadEvents()
    } catch (err) {
        eventError.value = err.message || translations[store.language].admin.errorfailedtosaveevent
        clearMessage(eventError)
    } finally {
        savingEvent.value = false
    }
}

async function deleteEvent(eventId) {
    if (!confirm('Delete this event? This will also delete its divisions and registrations.')) return

    eventError.value = ''
    eventSuccess.value = ''

    try {
        await adminFetch(`/api/admin/events/${eventId}`, {
            method: 'DELETE'
        })

        eventSuccess.value = translations[store.language].admin.eventdeletedsuccessfully
        clearMessage(eventSuccess)
        await loadAdminDashboard()
    } catch (err) {
        eventError.value = err.message || translations[store.language].admin.errorfailedtodeleteevent
        clearMessage(eventError)
    }
}

const slugSuffix = ref(generateRandomNumber())

function generateRandomNumber() {
    return Math.floor(1000 + Math.random() * 9000)
}

function generateSlug(text) {
    return text
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

watch(
    () => eventForm.value.name,
    (newName) => {
        if (!editingEventId.value) {
            eventForm.value.slug = `${generateSlug(newName)}-${slugSuffix.value}`
        }
    }
)

async function adminFetch(path, options = {}) {
    const response = await fetch(`${apiBaseUrl}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${store.accessToken}`,
            ...(options.headers ?? {})
        }
    })

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null)
        throw new Error(
            errorBody?.message?.join?.(', ') ||
            errorBody?.message ||
            `Request failed (${response.status})`
        )
    }

    return response.json()
}

async function loadEvents() {
    if (!isAdmin.value) return

    loadingEvents.value = true

    try {
        events.value = await adminFetch('/api/admin/events')
    } catch (err) {
        eventError.value = err.message || translations[store.language].admin.errorfailedtoloadregistrations
        clearMessage(eventError)
    } finally {
        loadingEvents.value = false
    }
}

function getEventName(eventId) {
    return events.value.find(event => event.id === eventId)?.name || '—'
}

async function loadApprovedRegistrations() {
    if (!isAdmin.value) return

    loadingApproved.value = true

    try {
        approvedRegistrations.value = await adminFetch('/api/admin/team-registrations?status=approved')
    } catch (err) {
        registrationError.value = err.message || translations[store.language].admin.errorfailedtoloadregistrations
        clearMessage(registrationError)
    } finally {
        loadingApproved.value = false
    }
}

async function loadPendingRegistrations() {
    if (!isAdmin.value) return

    loading.value = true

    try {
        registrations.value = await adminFetch('/api/admin/team-registrations?status=pending')
    } catch (err) {
        registrationError.value = err.message || translations[store.language].admin.errorfailedtoloadregistrations
        clearMessage(registrationError)
    } finally {
        loading.value = false
    }
}

async function loadRejectedRegistrations() {
    if (!isAdmin.value) return

    loadingRejected.value = true

    try {
        rejectedRegistrations.value = await adminFetch('/api/admin/team-registrations?status=rejected')
    } catch (err) {
        registrationError.value = err.message || translations[store.language].admin.errorfailedtoloadregistrations
        clearMessage(registrationError)
    } finally {
        loadingRejected.value = false
    }
}

async function updateRegistrationStatus(registrationId, status) {
    registrationError.value = ''
    registrationSuccess.value = ''

    const body = { status }


    if (status === 'rejected') {
        const reason = rejectReasons.value[registrationId]?.trim()

        if (!reason) {
            registrationError.value = translations[store.language].admin.errorrejectionreasonneeded
            clearMessage(registrationError)
            return
        }

        body.statusReason = reason
    }

    updatingRegistration.value = true

    try {
        await adminFetch(`/api/admin/team-registrations/${registrationId}/status`, {
            method: 'PATCH',
            body: JSON.stringify(body)
        })

        registrationSuccess.value =
            status === 'approved'
                ? translations[store.language].admin.registrationapproved
                : translations[store.language].admin.registrationrejected
        clearMessage(registrationSuccess)

        rejectReasons.value[registrationId] = ''

        await loadAdminDashboard()
    } catch (err) {
        registrationError.value = err.message || translations[store.language].admin.errorfailedtoupdateregistration
        clearMessage(registrationError)
    }
    finally {
        updatingRegistration.value = false
    }
}

async function deleteRegistration(registrationId) {
    if (!confirm(translations[store.language].admin.confirmdeleteregistration)) return

    registrationError.value = ''
    registrationSuccess.value = ''
    updatingRegistration.value = true

    try {
        await adminFetch(`/api/admin/team-registrations/${registrationId}`, {
            method: 'DELETE'
        })

        registrationSuccess.value = translations[store.language].admin.registrationdeleted
        clearMessage(registrationSuccess)

        await loadAdminDashboard()
    } catch (err) {
        registrationError.value = err.message || translations[store.language].admin.errorfailedtoupdateregistration
        clearMessage(registrationError)
    } finally {
        updatingRegistration.value = false
    }
}

function formatDate(dateValue) {
    if (!dateValue) return '—'

    return new Date(dateValue).toLocaleString(store.language === 'fr' ? 'fr-CA' : 'en-CA', {
        dateStyle: 'medium',
        timeStyle: 'short'
    })
}

function getMemberBySlot(registration, slot) {
    return registration.members?.find(member => member.slot === slot)?.user
}

async function loadAdminDashboard() {
    if (!isAdmin.value) return

    await loadEvents()
    await loadPendingRegistrations()
    await loadApprovedRegistrations()
    await loadRejectedRegistrations()
}

onMounted(() => {
    loadAdminDashboard()
})

watch(isAdmin, (newValue) => {
    if (newValue) {
        loadAdminDashboard()
    }
})
</script>

<template>
    <main>
        <div v-if="isAdmin" class="admin-dashboard">
            <p class="titre-page">Admin Dashboard</p>

            <section class="dashboard-card events-section">
                <div class="dashboard-header">
                    <div>
                        <h2>{{ translations[store.language].admin.events }}</h2>
                        <p>{{ translations[store.language].admin.eventsmanageandreview }}</p>
                    </div>
                    
                    <button class="refresh-button" @click="loadEvents" :disabled="loadingEvents">
                        {{ loadingEvents ? 'Loading...' : translations[store.language].admin.buttonrefresh }}
                    </button>
                </div>
                <section class="dashboard-card approved-section">
                    
                    
                    <p v-if="!loadingEvents && events.length === 0" class="empty-message">
                        {{ translations[store.language].admin.noeventsfound }}
                    </p>
                    
                    <h3>{{ translations[store.language].admin.events }}</h3>
                    <div class="events-grid">
                        <div v-for="event in events" :key="event.id" class="event-card">
                            <div class="event-top">
                                <h3>{{ event.name }}</h3>
                                <span class="status-pill">{{ event.status }}</span>
                            </div>

                            <div class="info-grid event-info-grid">
                                <div>
                                    <span>{{ translations[store.language].admin.eventstarts }}</span>
                                    <strong>{{ formatDate(event.startsAt) }}</strong>
                                </div>

                                <div>
                                    <span>{{ translations[store.language].admin.eventregistrationopens }}</span>
                                    <strong>{{ formatDate(event.registrationOpensAt) }}</strong>
                                </div>

                                <div>
                                    <span>{{ translations[store.language].admin.eventregistrationcloses }}</span>
                                    <strong>{{ formatDate(event.registrationClosesAt) }}</strong>
                                </div>

                                <div>
                                    <span>Description</span>
                                    <strong>{{ event.description }}</strong>
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
                                <button class="pending-button" @click="editEvent(event)">
                                    {{ translations[store.language].admin.buttonedit }}
                                </button>

                                <button class="delete-button" @click="deleteEvent(event.id)">
                                    {{ translations[store.language].admin.buttondelete }}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <p v-if="eventError" class="message error">
                    {{ eventError }}
                </p>

                <p v-if="eventSuccess" class="message success">
                    {{ eventSuccess }}
                </p>

                <section class="dashboard-card approved-section">
                    <h3>{{ translations[store.language].admin.eventscreateedit }}</h3>
                    <form class="event-form" @submit.prevent="saveEvent">
                        <h3>{{ editingEventId ? translations[store.language].admin.eventedit : translations[store.language].admin.eventcreate }}</h3>

                        <div class="form-grid">
                            <input v-model="eventForm.name" :placeholder=translations[store.language].admin.eventsetupname required />
                            <input hidden v-model="eventForm.slug" placeholder="event-slug" required />

                            <select v-model="eventForm.status">
                                <option value="draft">Draft</option>
                                <option value="open">Open</option>
                                <option value="closed">Closed</option>
                                <option value="archived">Archived</option>
                            </select>
                            <div>
                                <p>Starts At</p>
                                <input v-model="eventForm.startsAt" type="datetime-local" required />
                            </div>
                            <div>
                                <p>Opens At</p>
                                <input v-model="eventForm.registrationOpensAt" type="datetime-local" required />
                            </div>
                            <div>
                                <p>Closes At</p>
                                <input v-model="eventForm.registrationClosesAt" type="datetime-local" required />
                            </div>
                        </div>

                        <textarea v-model="eventForm.description" placeholder="Description"></textarea>

                        <div v-if="!editingEventId" class="division-editor">
                            <div class="division-editor-header">
                                <h4>Divisions</h4>
                                <button type="button" class="refresh-button" @click="addDivision">{{ translations[store.language].admin.eventadddivision }}</button>
                            </div>

                            <div v-for="(division, index) in eventForm.divisions" :key="index" class="division-edit-row">
                                <input v-model="division.name" placeholder="Division name" required />
                                <input v-model="division.sortOrder" type="number" placeholder="Order" />
                                <input v-model="division.teamCapacity" type="number" :placeholder=translations[store.language].admin.eventdivisioncapacity />

                                <button type="button" class="delete-button" @click="removeDivision(index)">
                                    {{ translations[store.language].admin.eventremovedivision }}
                                </button>
                            </div>
                        </div>

                        <div class="actions">
                            <button class="approve-button" type="submit" :disabled="savingEvent">
                                {{ savingEvent ? 'Saving...' : editingEventId ? translations[store.language].admin.eventedit : translations[store.language].admin.eventcreate }}
                            </button>

                            <button v-if="editingEventId" class="pending-button" type="button" @click="resetEventForm">
                                {{ translations[store.language].admin.eventcanceledit }}
                            </button>
                        </div>
                    </form>
                </section>
            </section>
            <section class="dashboard-card registrations-section">
                <div class="dashboard-header">
                    <div>
                        <h2>{{ translations[store.language].admin.registrations }}</h2>
                        <p>{{ translations[store.language].admin.registrationsmanageandreview }}</p>
                    </div>
                    <button class="refresh-button" @click="loadAdminDashboard" :disabled="loading || loadingApproved || loadingRejected">
                        {{ loading || loadingApproved || loadingRejected ? 'Loading...' : translations[store.language].admin.buttonrefresh }}
                    </button>
                </div>


                <p v-if="registrationError" class="message error">
                    {{ registrationError }}
                </p>

                <p v-if="registrationSuccess" class="message success">
                    {{ registrationSuccess }}
                </p>

                <section class="dashboard-card">
                    <div class="dashboard-header">
                        <div>
                            <h2>{{ translations[store.language].admin.pendingregistration }}</h2>
                            <p>{{ translations[store.language].admin.reviewpendingregistration }}</p>
                        </div>

                        <!-- <button class="refresh-button" @click="loadPendingRegistrations" :disabled="loading">
                            {{ loading ? 'Loading...' : translations[store.language].admin.buttonrefresh }}
                        </button> -->
                    </div>

                    <p v-if="!loading && registrations.length === 0" class="empty-message">
                        {{ translations[store.language].admin.nopendingregistration }}
                    </p>


                    <div v-for="registration in registrations" :key="registration.id" class="registration-card">
                        <div class="registration-top">
                            <div>
                                <h3>{{ registration.teamName }}</h3>
                                <p class="muted">
                                    {{ getEventName(registration.eventId) }} · {{ registration.divisionName }} · {{ translations[store.language].admin.submitted }} {{ formatDate(registration.submittedAt) }}
                                </p>
                            </div>

                            <img v-if="registration.logoUrl" :src="registration.logoUrl" :alt="`${registration.teamName} logo`" class="team-logo" />
                        </div>

                        <div class="info-grid">
                            <div>
                                <span>Captain</span>
                                <strong>{{ registration.captain?.discordUsername || '—' }}</strong>
                            </div>

                            <div>
                                <span>{{ translations[store.language].admin.createdby }}</span>
                                <strong>{{ registration.createdBy?.discordUsername || '—' }}</strong>
                            </div>

                            <div>
                                <span>Status</span>
                                <strong>{{ registration.status }}</strong>
                            </div>
                        </div>

                        <div class="roster">
                            <h4>Roster</h4>

                            <div class="roster-grid">
                                <div v-for="slot in ['top', 'jungle', 'mid', 'adc', 'support', 'sub1', 'sub2', 'sub3', 'coach']" :key="slot" class="roster-slot">
                                    <span>{{ slot.toUpperCase() }}</span>

                                    <strong>
                                        {{ getMemberBySlot(registration, slot)?.discordUsername || '—' }}
                                    </strong>

                                    <small v-if="getMemberBySlot(registration, slot)?.mainRiotAccount">
                                        {{ getMemberBySlot(registration, slot).mainRiotAccount.gameName }}#{{
                                            getMemberBySlot(registration, slot).mainRiotAccount.tagLine
                                        }}
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div class="actions">
                            <button :disabled="updatingRegistration" class="approve-button" @click="updateRegistrationStatus(registration.id, 'approved')">
                                {{ translations[store.language].admin.buttonapprove }}
                            </button>

                            <div class="reject-box">
                                <input v-model="rejectReasons[registration.id]" type="text" :placeholder="translations[store.language].admin.rejectionreason" />

                                <button :disabled="updatingRegistration" class="reject-button" @click="updateRegistrationStatus(registration.id, 'rejected')">
                                    {{ translations[store.language].admin.buttonreject }}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="dashboard-card approved-section">
                    <div class="dashboard-header">
                        <div>
                            <h2>{{ translations[store.language].admin.approvedregistrations }}</h2>
                            <p>{{ translations[store.language].admin.approvedacceptedteams }}</p>
                        </div>

                        <!-- <button class="refresh-button" @click="loadApprovedRegistrations" :disabled="loadingApproved">
                            {{ loadingApproved ? 'Loading...' : translations[store.language].admin.buttonrefresh }}
                        </button> -->
                    </div>

                    <p v-if="!loadingApproved && approvedRegistrations.length === 0" class="empty-message">
                        {{ translations[store.language].admin.noapprovedregistrations }}
                    </p>

                    <div v-for="registration in approvedRegistrations" :key="registration.id" class="registration-card approved-card">
                        <div class="registration-top">
                            <div>
                                <h3>{{ registration.teamName }}</h3>
                                <p class="muted">
                                    {{ registration.divisionName }} · {{ translations[store.language].admin.approved }}
                                </p>
                            </div>

                            <img v-if="registration.logoUrl" :src="registration.logoUrl" :alt="`${registration.teamName} logo`" class="team-logo" />
                        </div>

                        <div class="info-grid">
                            <div>
                                <span>Captain</span>
                                <strong>{{ registration.captain?.discordUsername || '—' }}</strong>
                            </div>

                            <div>
                                <span>{{ translations[store.language].admin.createdby }}</span>
                                <strong>{{ registration.createdBy?.discordUsername || '—' }}</strong>
                            </div>

                            <div>
                                <span>Status</span>
                                <strong>{{ registration.status }}</strong>
                            </div>
                        </div>

                        <div class="roster">
                            <h4>Roster</h4>

                            <div class="roster-grid">
                                <div v-for="slot in ['top', 'jungle', 'mid', 'adc', 'support', 'sub1', 'sub2', 'sub3', 'coach']" :key="slot" class="roster-slot">
                                    <span>{{ slot.toUpperCase() }}</span>

                                    <strong>
                                        {{ getMemberBySlot(registration, slot)?.discordUsername || '—' }}
                                    </strong>

                                    <small v-if="getMemberBySlot(registration, slot)?.mainRiotAccount">
                                        {{ getMemberBySlot(registration, slot).mainRiotAccount.gameName }}#{{
                                            getMemberBySlot(registration, slot).mainRiotAccount.tagLine
                                        }}
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div class="actions">
                            <button :disabled="updatingRegistration" class="pending-button" @click="updateRegistrationStatus(registration.id, 'pending')">
                                {{ translations[store.language].admin.buttonsetpending }}
                            </button>

                            <button :disabled="updatingRegistration" class="delete-button" @click="deleteRegistration(registration.id)">
                                {{ translations[store.language].admin.buttondelete }}
                            </button>
                        </div>
                    </div>
                </section>
                <section class="dashboard-card approved-section">
                    <div class="dashboard-header">
                        <div>
                            <h2>{{ translations[store.language].admin.rejectedregistrations }}</h2>
                            <p>{{ translations[store.language].admin.rejectedteams }}</p>
                        </div>

                        <!-- <button class="refresh-button" @click="loadRejectedRegistrations" :disabled="loadingRejected">
                            {{ loadingRejected ? 'Loading...' : translations[store.language].admin.buttonrefresh }}
                        </button> -->
                    </div>

                    <p v-if="!loadingRejected && rejectedRegistrations.length === 0" class="empty-message">
                        {{ translations[store.language].admin.norejectedregistrations }}
                    </p>

                    <div v-for="registration in rejectedRegistrations" :key="registration.id" class="registration-card">
                        <div class="registration-top">
                            <div>
                                <h3>{{ registration.teamName }}</h3>
                                <p class="muted">
                                    {{ registration.divisionName }} · {{ translations[store.language].admin.rejected }}
                                </p>
                                <p v-if="registration.statusReason" class="muted">
                                    {{ translations[store.language].admin.reason }}: {{ registration.statusReason }}
                                </p>
                            </div>

                            <img v-if="registration.logoUrl" :src="registration.logoUrl" :alt="`${registration.teamName} logo`" class="team-logo" />
                        </div>

                        <div class="actions">
                            <button :disabled="updatingRegistration" class="pending-button" @click="updateRegistrationStatus(registration.id, 'pending')">
                                {{ translations[store.language].admin.buttonsetpending }}
                            </button>

                            <button :disabled="updatingRegistration" class="delete-button" @click="deleteRegistration(registration.id)">
                                {{ translations[store.language].admin.buttondelete }}
                            </button>
                        </div>
                    </div>
                </section>
            </section>
        </div>

        <div v-else class="no-access">
            <h2>{{ translations[store.language].admin.adminrightsrequired }}</h2>
        </div>
    </main>
</template>

<style scoped>
main {
    background-color: rgb(24, 24, 24);
    padding-bottom: 50px;
    margin-top: 50px;
    min-height: 100vh;
    color: white;
}

.titre-page {
    font-family: "NewOrderBold";
    font-weight: bolder;
    font-size: 65px;
    margin-bottom: 20px;
    color: white;
    text-align: center;
    padding-top: 40px;
}

.admin-dashboard {
    width: min(1200px, 92%);
    margin: 0 auto;
}

.events-section {
    margin-bottom: 30px;
}

.events-grid {
    display: grid;
    gap: 20px;
    margin-top: 20px;
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

.event-info-grid {
    margin-top: 16px;
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

.approved-section {
    margin-top: 30px;
}

.approved-card {
    border-color: rgba(34, 197, 94, 0.35);
}

.dashboard-card,
.registration-card {
    background: #111827;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 18px;
    padding: 24px;
}

.dashboard-header,
.registration-top,
.actions {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    align-items: center;
}

.dashboard-header h2,
.registration-card h3,
.roster h4 {
    margin: 0;
}

.dashboard-header p,
.muted {
    color: #a7a7a7;
}

.refresh-button,
.approve-button,
.reject-button {
    border: none;
    border-radius: 10px;
    padding: 10px 16px;
    font-weight: bold;
    cursor: pointer;
}

.refresh-button {
    background: white;
    color: #111827;
}

.approve-button {
    background: #22c55e;
    color: white;
}

.reject-button {
    background: #ef4444;
    color: white;
}

.registration-card {
    margin-top: 20px;
}

.team-logo {
    width: 82px;
    height: 82px;
    object-fit: contain;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.06);
}

.info-grid,
.roster-grid {
    display: grid;
    gap: 12px;
    margin-top: 20px;
}

.info-grid {
    grid-template-columns: repeat(3, 1fr);
}

.roster-grid {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
}

.info-grid div,
.roster-slot {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 12px;
}

.info-grid span,
.roster-slot span,
.roster-slot small {
    display: block;
    color: #a7a7a7;
    font-size: 13px;
}

.roster {
    margin-top: 24px;
}

.actions {
    margin-top: 24px;
}

.reject-box {
    display: flex;
    gap: 10px;
    flex: 1;
    justify-content: flex-end;
}

.reject-box input {
    max-width: 320px;
    width: 100%;
    border-radius: 10px;
    border: 1px solid #333;
    background: #0b1020;
    color: white;
    padding: 10px 12px;
}

.message {
    border-radius: 10px;
    padding: 12px;
    margin: 10px;
    margin-top: 20px;
}

.error {
    background: rgba(239, 68, 68, 0.18);
    color: #fecaca;
}

.success {
    background: rgba(34, 197, 94, 0.18);
    color: #bbf7d0;
}

.empty-message,
.no-access {
    text-align: center;
    padding: 40px;
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

.event-form {
    margin-top: 20px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 14px;
    padding: 18px;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
}

.event-form input,
.event-form select,
.event-form textarea {
    width: 100%;
    border-radius: 10px;
    border: 1px solid #333;
    background: #0b1020;
    color: white;
    padding: 10px 12px;
}

.event-form textarea {
    margin-top: 12px;
    min-height: 90px;
    resize: vertical;
}

.division-editor {
    margin-top: 18px;
}

.division-editor-header,
.division-edit-row {
    display: flex;
    gap: 12px;
    align-items: center;
}

.division-edit-row {
    margin-top: 10px;
}

.registrations-section {
    margin-top: 30px;
}

.registration-subsection {
    margin-top: 30px;
    padding-top: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
}

@media (max-width: 768px) {
    .titre-page {
        font-size: 42px;
    }

    .dashboard-header,
    .registration-top,
    .actions,
    .reject-box {
        flex-direction: column;
        align-items: stretch;
    }

    .info-grid {
        grid-template-columns: 1fr;
    }
}
</style>