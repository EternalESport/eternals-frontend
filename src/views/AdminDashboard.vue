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
const events = ref([])
const loadingEvents = ref(false)
const error = ref('')
const success = ref('')
const rejectReasons = ref({})

const isAdmin = computed(() => store.user?.role === 'ADMIN')

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
    error.value = ''

    try {
        events.value = await adminFetch('/api/admin/events')
    } catch (err) {
        error.value = err.message || translations[store.language].admin.errorfailedtoloadregistrations
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
    error.value = ''

    try {
        approvedRegistrations.value = await adminFetch('/api/admin/team-registrations?status=approved')
    } catch (err) {
        error.value = err.message || translations[store.language].admin.errorfailedtoloadregistrations
    } finally {
        loadingApproved.value = false
    }
}

async function loadPendingRegistrations() {
    if (!isAdmin.value) return

    loading.value = true
    error.value = ''
    success.value = ''

    try {
        registrations.value = await adminFetch('/api/admin/team-registrations?status=pending')
    } catch (err) {
        error.value = err.message || translations[store.language].admin.errorfailedtoloadregistrations
    } finally {
        loading.value = false
    }
}

async function updateRegistrationStatus(registrationId, status) {
    error.value = ''
    success.value = ''

    const body = { status }


    if (status === 'rejected') {
        const reason = rejectReasons.value[registrationId]?.trim()

        if (!reason) {
            error.value = translations[store.language].admin.errorrejectionreasonneeded
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

        success.value =
            status === 'approved'
                ? translations[store.language].admin.registrationapproved
                : translations[store.language].admin.registrationrejected

        rejectReasons.value[registrationId] = ''

        await loadAdminDashboard()
    } catch (err) {
        error.value = err.message || translations[store.language].admin.errorfailedtoupdateregistration
    }
    finally {
        updatingRegistration.value = false
    }
}

async function deleteRegistration(registrationId) {
    if (!confirm(translations[store.language].admin.confirmdeleteregistration)) return

    error.value = ''
    success.value = ''
    updatingRegistration.value = true

    try {
        await adminFetch(`/api/admin/team-registrations/${registrationId}`, {
            method: 'DELETE'
        })

        success.value = translations[store.language].admin.registrationdeleted

        await loadAdminDashboard()
    } catch (err) {
        error.value = err.message || translations[store.language].admin.errorfailedtoupdateregistration
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
                        <p>{{ translations[store.language].admin.eventsmanageadnreview }}</p>
                    </div>

                    <button class="refresh-button" @click="loadEvents" :disabled="loadingEvents">
                        {{ loadingEvents ? 'Loading...' : translations[store.language].admin.buttonrefresh }}
                    </button>
                </div>

                <p v-if="!loadingEvents && events.length === 0" class="empty-message">
                    {{ translations[store.language].admin.noeventsfound }}
                </p>

                <div class="events-grid">
                    <div v-for="event in events" :key="event.id" class="event-card">
                        <div class="event-top">
                            <h3>{{ event.name }}</h3>
                            <span class="status-pill">{{ event.status }}</span>
                        </div>

                        <p class="muted">{{ event.slug }}</p>

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
                    </div>
                </div>
            </section>
            <section class="dashboard-card">
                <div class="dashboard-header">
                    <div>
                        <h2>{{ translations[store.language].admin.pendingregistration }}</h2>
                        <p>{{ translations[store.language].admin.reviewpendingregistration }}</p>
                    </div>

                    <button class="refresh-button" @click="loadPendingRegistrations" :disabled="loading">
                        {{ loading ? 'Loading...' : translations[store.language].admin.buttonrefresh }}
                    </button>
                </div>

                <p v-if="error" class="message error">{{ error }}</p>
                <p v-if="success" class="message success">{{ success }}</p>

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

                    <button class="refresh-button" @click="loadApprovedRegistrations" :disabled="loadingApproved">
                        {{ loadingApproved ? 'Loading...' : translations[store.language].admin.buttonrefresh }}
                    </button>
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