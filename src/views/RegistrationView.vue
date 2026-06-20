<script setup>
import { store, setLanguage } from '../store.js'
import { translations } from '@/i18n/translations'
import HeroHeader from '../components/HeroHeader.vue'
import OurPartners from '../components/OurPartners.vue';
import { reactive, ref, computed, onMounted } from "vue";

const isSubmitting = ref(false);
const successMessage = ref("");
const errorMessage = ref("");
const logoError = ref("");
const noEventsError = ref("");

const divisions = computed(() =>
    selectedEvent.value?.divisions ?? []
);

const roles = [
    { key: "top", label: "Top", required: true },
    { key: "jungle", label: "Jungle", required: true },
    { key: "mid", label: "Mid", required: true },
    { key: "adc", label: "ADC", required: true },
    { key: "support", label: "Support", required: true },
    { key: "sub1", label: "Sub #1", required: false },
    { key: "sub2", label: "Sub #2", required: false },
    { key: "sub3", label: "Sub #3", required: false },
    { key: "coach", label: "Coach", required: false },
];

const form = reactive({
    eventId: "",
    divisionId: "",
    teamName: "",
    captainUserId: "",
    logo: null,
    players: {
        top: { userId: "" },
        jungle: { userId: "" },
        mid: { userId: "" },
        adc: { userId: "" },
        support: { userId: "" },
        sub1: { userId: "" },
        sub2: { userId: "" },
        sub3: { userId: "" },
        coach: { userId: "" },
    },
    acceptRules: false,
    acceptPayment: false,
});

function handleLogoUpload(event) {
    const file = event.target.files?.[0];

    logoError.value = "";

    if (!file) {
        form.logo = null;
        return;
    }

    if (file.size > 2 * 1024 * 1024) {
        logoError.value = translations[store.language].registrationligue.filesizelimit;
        event.target.value = "";
        form.logo = null;
        return;
    }

    form.logo = file;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const events = ref([]);
const selectedEvent = ref(null);
const selectedEventId = ref("");

async function apiFetch(path, init = {}) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...init,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.accessToken}`,
            ...(init.headers ?? {})
        }
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.message || `Erreur ${response.status}`);
    }

    return response.json();
}

async function uploadTeamLogo(file) {
    const uploadTarget = await apiFetch("/api/team-logos/uploads", {
        method: "POST",
        body: JSON.stringify({
            contentType: file.type,
            byteSize: file.size
        })
    });

    if (!uploadTarget.allowedContentTypes.includes(file.type)) {
        throw new Error("Type de fichier non accepté.");
    }

    if (file.size > uploadTarget.maxByteSize) {
        throw new Error("Le logo est trop lourd.");
    }

    const putResponse = await fetch(uploadTarget.uploadUrl, {
        method: "PUT",
        headers: {
            "Content-Type": file.type,
            "Content-Length": String(file.size)
        },
        body: file
    });

    if (!putResponse.ok) {
        throw new Error("L’upload du logo a échoué.");
    }

    return uploadTarget.objectKey;
}

async function submitForm() {
    isSubmitting.value = true;
    successMessage.value = "";
    errorMessage.value = "";

    try {
        if (!store.accessToken) {
            throw new Error("Vous devez être connecté avec Discord.");
        }

        if (!form.logo) {
            throw new Error(translations[store.language].registrationligue.logoRequired);
        }

        const logoObjectKey = await uploadTeamLogo(form.logo);

        await apiFetch("/api/team-registrations", {
            method: "POST",
            body: JSON.stringify({
                eventId: form.eventId,
                divisionId: form.divisionId,
                teamName: form.teamName,
                captainUserId: form.captainUserId,
                logoObjectKey,
                roster: {
                    top: form.players.top.userId,
                    jungle: form.players.jungle.userId,
                    mid: form.players.mid.userId,
                    adc: form.players.adc.userId,
                    support: form.players.support.userId,
                    sub1: form.players.sub1.userId || null,
                    sub2: form.players.sub2.userId || null,
                    sub3: form.players.sub3.userId || null,
                    coach: form.players.coach.userId || null
                },
                acceptRules: form.acceptRules,
                acceptPaymentResponsibility: form.acceptPayment
            })
        });

        successMessage.value = translations[store.language].registrationligue.registrationsuccess;
    } catch (error) {
        errorMessage.value = error.message || translations[store.language].registrationligue.registrationerror;
    } finally {
        isSubmitting.value = false;
    }

}

onMounted(async () => {
    noEventsError.value = "";

    try {
        events.value = await fetch(
            `${API_BASE_URL}/api/events`
        ).then(r => r.json());

        if (events.value.length > 0) {
            selectedEvent.value = events.value[0];
            form.eventId = selectedEvent.value.id;

            if (selectedEvent.value.divisions?.length > 0) {
                form.divisionId = selectedEvent.value.divisions[0].id;
            }
        }
        else {
            noEventsError.value = translations[store.language].registrationligue.noregistrationavailable;
        }
    } catch (err) {
        console.error(err);
    }
});

</script>

<template>
    <HeroHeader />
    <div class="fade">
        <OurPartners />
    </div>
    <main class="league-registration-page">
        <section class="form-card">
            <p v-if="noEventsError" class="error-message">{{ noEventsError }}</p>

            <!-- <h1>{{ translations[store.language].registrationligue.formtitle }}</h1> -->
            <div class="discord-links">
                <a class="custom-file-button" href="https://discord.gg/hRSvPaRFDd " target="_blank">{{ translations[store.language].registrationligue.discordligue }}</a>

            </div>

            <form @submit.prevent="submitForm">

                <h2 class="first-h2">{{ translations[store.language].registrationligue.teaminfos }}</h2>


                <div class="form-group">
                    <label for="teamName">{{ translations[store.language].registrationligue.teamname }} *</label>
                    <input id="teamName" v-model="form.teamName" type="text" required />
                </div>
                <div class="form-group">

                    <label for="event">{{ translations[store.language].registrationligue.desiredevent }} *</label>
                    <select v-model="form.eventId" required>
                        <option value="" disabled>{{ translations[store.language].registrationligue.chooseevent }}</option>

                        <option v-for="event in events" :key="event.id" :value="event.id">
                            {{ event.name }}
                        </option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="division">{{ translations[store.language].registrationligue.desireddivision }} *</label>
                    <select id="division" v-model="form.divisionId" required>
                        <option value="" disabled>
                            {{ translations[store.language].registrationligue.choosedivision }}
                        </option>
                        <option v-for="division in divisions" :key="division.id" :value="division.id">
                            {{ division.name }}
                        </option>
                    </select>
                </div>


                <div class="form-group">
                    <label for="captainUserId">{{ translations[store.language].registrationligue.captainuserid }} *</label>
                    <input id="captainUserId" v-model="form.captainUserId" type="text" required placeholder="Captain User ID" />
                </div>

                <div class="form-group">
                    <label>{{ translations[store.language].registrationligue.teamlogo }} *</label>

                    <div class="file-upload">
                        <label for="logo" class="custom-file-button">
                            {{ translations[store.language].registrationligue.choosefile }}
                        </label>

                        <span class="file-name" :class="{ 'file-error': logoError }">
                            {{
                                logoError
                                    ? logoError
                                    : (
                                        form.logo
                                            ? form.logo.name
                                            : translations[store.language].registrationligue.nochosenfile
                                    )
                            }}
                        </span>

                        <input id="logo" type="file" accept="image/png,image/jpeg,image/webp" @change="handleLogoUpload" hidden />
                    </div>
                </div>

                <h2>{{ translations[store.language].registrationligue.players }}</h2>

                <section v-for="role in roles" :key="role.key" class="player-section">
                    <h3>{{ role.label }}</h3>

                    <input class="role-user-input" v-model="form.players[role.key].userId" type="text" :required="role.required" placeholder="User ID" />
                </section>

                <h2>Confirmation</h2>

                <label class="checkbox-group">
                    <input v-model="form.acceptRules" type="checkbox" required />
                    <span>
                        {{ translations[store.language].registrationligue.conditions }} *
                    </span>
                </label>

                <label class="checkbox-group">
                    <input v-model="form.acceptPayment" type="checkbox" required />
                    <span>
                        {{ translations[store.language].registrationligue.payment }} *
                    </span>
                </label>

                <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
                <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

                <button type="submit" :disabled="isSubmitting">
                    {{ isSubmitting ? translations[store.language].registrationligue.sendingregistration : translations[store.language].registrationligue.sendregistration }}
                </button>
            </form>
        </section>
    </main>
</template>

<style scoped>
.fade {
    background: linear-gradient(to bottom, rgba(56, 56, 56, 0), #6A6D7A);
    height: 300px;
    margin-top: -300px;
    width: 100%;
    z-index: 1;
}

.league-registration-page {
    padding: 64px 16px;
    min-height: 100vh;
    background:
        radial-gradient(circle at top, #d2147c38, transparent 35%),
        linear-gradient(180deg, #07070d 0%, #0a0a12e6 100%);
}

.form-card {
    max-width: 950px;
    margin: 0 auto;
    padding: 40px;
    border-radius: 22px;
    background: #1d081438;
    color: white;
    border: 1px solid #d2147c59;
    box-shadow:
        0 0 35px #d2147c2e,
        0 20px 60px #00000073;
}

.intro {
    margin-bottom: 36px;
    color: #d1d5db;
}

h1 {
    color: #ffffff;
    font-size: clamp(2rem, 4vw, 3.2rem);
    text-transform: uppercase;
    letter-spacing: 1.5px;
}

h2 {
    margin-top: 38px;
    padding-bottom: 10px;
    color: #d2147c;
    border-bottom: 1px solid #d2147c73;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.first-h2 {
    margin-bottom: 14px;
}

h3 {
    color: #ffffff;
    margin-bottom: 18px;
}

.player-section {
    margin-top: 24px;
    padding: 22px;
    border: 1px solid #d2147c38;
    border-radius: 16px;
    background: linear-gradient(145deg, #d2147c38, #0a0a12e6);
    box-shadow: inset 0 0 18px #d2147c0d;
}

.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 18px;
}

label {
    margin-bottom: 7px;
    font-weight: 700;
    color: #f3f4f6;
}

input,
select {
    padding: 12px 14px;
    border: 1px solid #d2147c47;
    border-radius: 10px;
    background: #d2147c14;
    color: white;
    outline: none;
}

.checkbox-group {
    display: flex;
    gap: 12px;
    margin: 18px 0;
    padding: 16px;
    border-radius: 12px;
    background: #d2147c14;
    border: 1px solid #d2147c33;
    font-weight: 400;
}

.checkbox-group input {
    margin-top: 4px;
    accent-color: #d2147c;
}

input:not([type="checkbox"]),
select {
    padding: 12px 14px;
    border: 1px solid #d2147c47;
    border-radius: 10px;
    background: #d2147c14;
    color: white;
    outline: none;
}

.checkbox-group input[type="checkbox"] {
    width: 18px;
    height: 18px;
    min-width: 18px;
    margin-top: 4px;
    accent-color: #d2147c;
    transition: none;
    transform: none;
}

input:not([type="checkbox"]):focus,
select:focus {
    border-color: #d2147c;
    box-shadow: 0 0 0 3px #d2147c33;
}

select {
    background-color: #160812;
}

select option {
    background-color: #160812;
    color: white;
}

select option:checked {
    background-color: #d2147c;
    color: white;
}

button {
    margin-top: 28px;
    width: 100%;
    padding: 15px 22px;
    border: none;
    border-radius: 12px;
    background: linear-gradient(135deg, #d2147c, #ff3aa4);
    color: white;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    box-shadow: 0 0 22px #d2147c59;
}

button:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 32px #d2147c8c;
}

button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}

.success-message {
    color: #22c55e;
    font-weight: 700;
}

.error-message {
    color: #f87171;
    font-weight: 700;
}

.file-upload {
    display: flex;
    align-items: center;
    gap: 15px;
}

.custom-file-button {
    cursor: pointer;
    padding: 12px 18px;
    border-radius: 10px;

    background: linear-gradient(135deg,
            #d2147c,
            #ff3aa4);

    color: white;
    font-weight: 700;

    transition: 0.2s;
}

.custom-file-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 15px rgba(210, 20, 124, 0.4);
}

.file-name {
    color: #d1d5db;
    font-size: 0.95rem;
}

.file-error {
    color: #f87171;
    font-weight: 700;
}

.discord-links {
    margin-top: 8px;
    display: flex;
    flex-direction: row;
}

@media (max-width: 700px) {
    .league-registration-page {
        padding: 32px 12px;
    }

    .form-card {
        padding: 24px;
    }

    .player-section {
        padding: 18px;
    }
}
</style>
