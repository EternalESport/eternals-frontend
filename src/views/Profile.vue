<script setup>
import { reactive, ref, onMounted, watch } from 'vue'
import { store } from '../store.js'
import { translations } from '@/i18n/translations'
import { updateUserProfile, getRiotAccounts, loginWithRiot } from '../login.js'

const isSaving = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const isRedirectingToRiot = ref(false)
const redirectMessage = ref('')

const form = reactive({
  firstName: store.user?.firstName || '',
  lastName: store.user?.lastName || '',
  email: store.user?.email || '',
})

const saveProfile = async () => {
  successMessage.value = ''
  errorMessage.value = ''

  try {
    isSaving.value = true

    const updatedUser = await updateUserProfile(
      store.accessToken,
      {
        firstName: form.firstName || null,
        lastName: form.lastName || null,
        email: form.email || null,
      }
    )

    store.user = updatedUser

    successMessage.value = translations[store.language].profile.saved
  }
  catch (error) {
    errorMessage.value = error.message
  }
  finally {
    isSaving.value = false
  }

}

const riotAccounts = ref([])
const isLoadingRiotAccounts = ref(false)
const riotLoadError = ref('')

const loadRiotAccounts = async () => {
  if (!store.accessToken) return

  isLoadingRiotAccounts.value = true
  riotLoadError.value = ''

  try {
    riotAccounts.value = await getRiotAccounts(store.accessToken)
  }
  catch (error) {
    riotLoadError.value = error.message
  }
  finally {
    isLoadingRiotAccounts.value = false
  }
}

const handleRiotCallbackResult = async () => {
  const params = new URLSearchParams(window.location.search)
  const riotLink = params.get('riotLink')
  const reason = params.get('reason')

  if (riotLink === 'success') {
    riotLoadError.value = ''
    await loadRiotAccounts()
  }

  if (riotLink === 'error') {
    riotLoadError.value = reason
      ? `${translations[store.language].profile.riotDidntLink} : ${reason}`
      : translations[store.language].profile.riotDidntLink
  }

  if (riotLink) {
    window.history.replaceState({}, '', window.location.pathname)
  }
}

onMounted(async () => {
  await handleRiotCallbackResult()
})

// Pour préremplir les champs du form si les informations existent déjà 
// (pour que lors d'une modification d'un seul éléments les autres ne deviennent pas vides)
watch(
  () => store.user,
  (user) => {
    if (!user) return

    form.firstName = user.firstName || ''
    form.lastName = user.lastName || ''
    form.email = user.email || ''
  },
  { immediate: true }
)

// Pour attendre le storage de l'accessToken, 
// sinon les comptes liés n'apparaissent pas toujours lors du chargement de la page
watch(
  () => store.accessToken,
  async (accessToken) => {
    if (!accessToken) return

    await loadRiotAccounts()
  },
  { immediate: true }
)
</script>

<template>
  <div class="content">
    <div class="head-profile" v-if="store.user">
      <h1>{{ translations[store.language].profile.myProfile }}</h1>
      <img class="img-profile" v-if="store.user.discordAvatarUrl" :src="store.user.discordAvatarUrl" :alt="store.user.discordUsername">
      <h2 class="username">{{ store.user.discordUsername || 'Utilisateur Discord' }}</h2>
      <div class="user-infos">
        <p v-if="store.user.firstName">{{ translations[store.language].profile.firstNameAl }} {{ store.user.firstName }}</p>
        <p v-if="store.user.lastName">{{ translations[store.language].profile.lastNameAl }} {{ store.user.lastName }}</p>
        <p v-if="store.user.email">{{ translations[store.language].profile.emailAl }} {{ store.user.email }}</p>
      </div>

      <div class="update-infos">
        <h2>{{ translations[store.language].profile.updateInfos }}</h2>
        <form class="profile-form" @submit.prevent="saveProfile">
          <div class="form-group">
            <label>{{ translations[store.language].profile.firstName }}</label>
            <input v-model="form.firstName" type="text" maxlength="120" :placeholder="translations[store.language].profile.firstName">
          </div>
          <div class="form-group">
            <label>{{ translations[store.language].profile.lastName }}</label>
            <input v-model="form.lastName" type="text" maxlength="120" :placeholder="translations[store.language].profile.lastName">
          </div>
          <div class="form-group">
            <label>{{ translations[store.language].profile.email }}</label>
            <input v-model="form.email" type="email" :placeholder="translations[store.language].profile.email">
          </div>
          <p v-if="successMessage" class="success-message">
            {{ successMessage }}
          </p>
          <p v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </p>
          <button class="save-button" type="submit" :disabled="isSaving">
            {{ isSaving ? translations[store.language].profile.saving : translations[store.language].profile.save }}
          </button>
        </form>
      </div>

      <div class="riot-section">
        <h2>{{ translations[store.language].profile.riotAccounts }}</h2>

        <p v-if="isLoadingRiotAccounts" class="empty-riot">
          {{ translations[store.language].profile.riotAccountsLoading }}
        </p>

        <p v-else-if="riotLoadError" class="error-message">
          {{ riotLoadError }}
        </p>

        <div v-else-if="riotAccounts.length" class="riot-list">
          <div v-for="account in riotAccounts" :key="account.id || account.riotPuuid" class="riot-card" :class="{ 'main-account': account.isMain, 'smurf-account': !account.isMain }">
            <p>{{ account.gameName }}#{{ account.tagLine }}</p>
            <span v-if="account.isMain">{{ translations[store.language].profile.riotAccountMain }}</span>
            <span v-else>Smurf</span>
          </div>
        </div>

        <p v-else class="empty-riot">
          {{ translations[store.language].profile.riotNone }}
        </p>

        <div class="riot-actions">
          <button :disabled="isLoadingRiotAccounts" class="save-button" type="button" @click="loginWithRiot(store.accessToken)">
            {{ translations[store.language].profile.riotLink }}
          </button>
        </div>
      </div>

    </div>

    <div class="head-profile" v-else>
      <h1>{{ translations[store.language].profile.notLoggedIn }}</h1>
      <RouterLink to="/">{{ translations[store.language].profile.returnHome }}</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.content {
  min-height: 100vh;
  background:
    radial-gradient(circle at top,
      rgba(80, 80, 80, 0.25),
      rgba(0, 0, 0, 1)),
    #050505;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  margin-top: 80px;
}

.head-profile {
  width: 600px;
  padding: 60px 40px;
  background:
    linear-gradient(145deg,
      rgba(20, 20, 20, 0.95),
      rgba(40, 40, 40, 0.85));
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  text-align: center;
  box-shadow:
    0 0 60px rgba(0, 0, 0, 0.8);
}

.user-infos {
  margin-top: 25px;
  padding: 25px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.user-infos p {
  color: #d6d6d6;
  margin: 10px 0;
}

.update-infos {
  margin-top: 40px;
  padding: 35px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.update-infos h2 {
  color: white;
  margin-bottom: 15px;
  font-size: 1.8rem;
  letter-spacing: 2px;
}

h1 {
  color: #f5f5f5;
  font-size: 3rem;
  margin-bottom: 50px;
  text-transform: uppercase;
  letter-spacing: 4px;
}

.img-profile {
  width: 240px;
  border-radius: 20px;
  border: 3px solid rgba(255, 255, 255, 0.2);
  filter: brightness(0.95);
  transition: 0.4s;
}

.img-profile:hover {
  transform: scale(1.03);
  filter: brightness(1.05);
}

.username {
  margin-top: 30px;
  color: #d6d6d6;
  font-size: 2rem;
  font-style: italic;
  letter-spacing: 2px;
}

.profile-form {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.form-group label {
  color: #d6d6d6;
  margin-bottom: 8px;
  font-size: 0.95rem;
}

.form-group input {
  padding: 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(0, 0, 0, 0.4);
  color: white;
  font-size: 1rem;
  outline: none;
}

.form-group input:focus {
  border-color: rgba(255, 255, 255, 0.4);
}

.save-button {
  margin-top: 10px;
  padding: 15px;
  border: none;
  border-radius: 10px;
  background: white;
  color: black;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;
}

.save-button:hover {
  transform: translateY(-2px);
}

.save-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success-message {
  color: #78ff9c;
}

.error-message {
  color: #ff7b7b;
}

.riot-section {
  margin-top: 40px;
  padding: 35px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.riot-section h2 {
  color: white;
  margin-bottom: 25px;
  font-size: 1.8rem;
  letter-spacing: 2px;
}

.riot-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
}

.riot-card {
  padding: 15px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
}

.riot-card p {
  margin: 0 0 6px;
  font-weight: 700;
}

.riot-card span {
  color: #d6d6d6;
  font-size: 0.9rem;
}

.empty-riot {
  color: #d6d6d6;
  margin-bottom: 25px;
}

.riot-card.main-account {
  border: 1px solid rgba(120, 255, 156, 0.45);
  background: rgba(120, 255, 156, 0.08);
}

.riot-card.smurf-account {
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.035);
  opacity: 0.85;
}

.riot-card.main-account span {
  color: #78ff9c;
  font-weight: 700;
}

.riot-card.smurf-account span {
  color: #b8b8b8;
}
</style>