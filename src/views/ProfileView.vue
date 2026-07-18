<script setup>
import { reactive, ref, onMounted, watch } from 'vue'
import { store } from '../store.js'
import { translations } from '@/i18n/translations'
import { updateUserProfile, getRiotAccounts, loginWithRiot, getMyTeamRegistrations, getApprovedEventTeams } from '../login.js'
import { getEvents } from '../events.js'

const isSaving = ref(false) //Pour savoir si une sauvegarde est en cours
const successMessage = ref('') //Pour stocker le message de succès
const errorMessage = ref('') //Pour stocker le message d'erreur s'il y en a une
const isRedirectingToRiot = ref(false) //Pour savoir si on redirige vers riot
const redirectMessage = ref('') //Pour stocker le message de redirection

const teamRegistrations = ref([]) //Pour stocker les équipes créé par le user et/ou celles dont il est capitaine
const isLoadingTeamRegistrations = ref(false) //Pour savoir si on charge les équipes
const teamRegistrationsError = ref('') //Pour stocker le message d'erreur s'il y en a une

const memberTeams = ref([]) //Pour stocker les équipes dont le user est membre
const isLoadingMemberTeams = ref(false) //Pour savoir si on charge les équipes dont le user est membre
const memberTeamsError = ref('') //Pour stocker le message d'erreur s'il y en a une

//Met à jour automatiquement les infos du form en fonction de ce qui est écrit dans les input du form
const form = reactive({
  firstName: store.user?.firstName || '',
  lastName: store.user?.lastName || '',
  email: store.user?.email || '',
})

//Pour mettre à jour les infos du user en fonction des infos écrites dans le form + on montre un message de succès/erreur
const saveProfile = async () => {
  successMessage.value = ''
  errorMessage.value = ''

  try {
    isSaving.value = true

    //Appel l'update des infos du user dans la database (les infos peuvent être null)
    const updatedUser = await updateUserProfile(
      store.accessToken,
      {
        firstName: form.firstName || null,
        lastName: form.lastName || null,
        email: form.email || null,
      }
    )

    //Update le state du user
    store.user = updatedUser

    //On affiche le message d'update réussi
    showProfileUpdatedMessage();
  }
  catch (error) {
    //S'il y a une erreur on affiche le message d'erreur
    errorMessage.value = error.message
  }
  finally {
    isSaving.value = false
  }

}

//Pour montrer l'erreur pendant un certain temps avant qu'elle disparaisse
const showProfileUpdatedMessage = () => {
  successMessage.value = translations[store.language].profile.saved

  setTimeout(() => {
    successMessage.value = ''
  }, 5000)
}

const riotAccounts = ref([]) //Tableau des comptes riots liés au user
const isLoadingRiotAccounts = ref(false) //État du loading des comptes riot
const riotLoadError = ref('') //Pour stocker le message d'erreur

//Pour montrer l'erreur pendant un certain temps avant qu'elle disparaisse
const showRiotError = (message) => {
  riotLoadError.value = message

  setTimeout(() => {
    riotLoadError.value = ''
  }, 10000)
}

//Load les comptes riot liés au user et affiche une erreur si ça ne fonctionne pas
const loadRiotAccounts = async (clearError = true) => {
  if (!store.accessToken) return

  isLoadingRiotAccounts.value = true

  if (clearError) {
    riotLoadError.value = ''
  }

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

//S'occupe de rediriger après une tentative de liaison d'un compte riot + affiche un message de succès/erreur
const handleRiotCallbackResult = async () => {
  const params = new URLSearchParams(window.location.search)
  const riotLink = params.get('riotLink')
  const reason = params.get('reason')

  //Vérifie le message retourné par riot lors de la tentative de connexion
  if (riotLink === 'success') {
    riotLoadError.value = ''
    await loadRiotAccounts()
  }
  if (riotLink === 'error') {
    if (reason === 'provider_failed') {
      showRiotError(translations[store.language].profile.riotMissingGameNameTag)
    }
    else if (reason === 'already_linked') {
      showRiotError(translations[store.language].profile.riotAlreadyLinked)
    }
    else {
      showRiotError(reason ? `${translations[store.language].profile.riotDidntLink} : ${reason}` : translations[store.language].profile.riotDidntLink)
    }
    //Pour afficher les erreurs au cas où il y en aurait qui ne sont pas prise en comptes (au quel cas on pourrait les rajouter dans les else avec la raison de l'erreur)
    console.log('Riot link error reason:', reason)
  }

  if (riotLink) {
    window.history.replaceState({}, '', window.location.pathname)
  }
}

//Pour aller chercher les équipes
const loadTeamRegistrations = async () => {
  if (!store.accessToken) return

  isLoadingTeamRegistrations.value = true
  teamRegistrationsError.value = ''

  try {
    teamRegistrations.value = await getMyTeamRegistrations(
      store.accessToken
    )
  }
  catch (error) {
    teamRegistrationsError.value = error.message
  }
  finally {
    isLoadingTeamRegistrations.value = false
  }
}

//Pour vérifier si le user a créé l'équipe ou en est le capitaine
const getUserTeamRole = (registration) => {
  const userId = store.user?.id

  if (!userId) return ''

  const isCaptain = registration.captain?.id === userId
  const isCreator = registration.createdBy?.id === userId

  if (isCaptain && isCreator) {
    return translations[store.language].profile.teamRoleCreatorCaptain
  }

  if (isCaptain) {
    return translations[store.language].profile.teamRoleCaptain
  }

  if (isCreator) {
    return translations[store.language].profile.teamRoleCreator
  }

  return ''
}

//Pour vérifier si le user a un rôle dans l'équipe
const loadMemberTeams = async () => {
  if (!store.user?.id || !store.accessToken) return

  isLoadingMemberTeams.value = true
  memberTeamsError.value = ''

  try {
    const allEvents = await getEvents()

    const eventTeamResults = await Promise.all(
      allEvents.map(async event => {
        const teams = await getApprovedEventTeams(event.slug)

        return teams.map(team => ({
          ...team,
          eventId: event.id,
          eventName: event.name,
          eventSlug: event.slug
        }))
      })
    )

    const allApprovedTeams = eventTeamResults.flat()

    const existingRegistrationIds = new Set(
      teamRegistrations.value.map(registration => registration.id)
    )

    memberTeams.value = allApprovedTeams.filter(team => {
      const isMember = team.members?.some(
        member => member.user?.id === store.user.id
      )

      return (
        isMember &&
        !existingRegistrationIds.has(team.id)
      )
    })
  }
  catch (error) {
    memberTeamsError.value = error.message
  }
  finally {
    isLoadingMemberTeams.value = false
  }
}

//Pour vérifier le rôle du user dans l'équipe
const getMemberRole = (team) => {
  const member = team.members?.find(
    member => member.user?.id === store.user?.id
  )

  if (!member) return ''

  const roleLabels = {
    top: 'Top',
    jungle: 'Jungle',
    mid: 'Mid',
    adc: 'ADC',
    support: 'Support',
    sub1: translations[store.language].profile.teamRoleSubstitute,
    sub2: translations[store.language].profile.teamRoleSubstitute,
    sub3: translations[store.language].profile.teamRoleSubstitute,
    coach: translations[store.language].profile.teamRoleCoach
  }

  return roleLabels[member.slot] || member.slot
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
  async accessToken => {
    if (!accessToken) {
      teamRegistrations.value = []
      memberTeams.value = []
      return
    }

    await Promise.all([
      loadRiotAccounts(false),
      loadTeamRegistrations()
    ])

    await loadMemberTeams()
  },
  { immediate: true }
)
</script>

<template>
  <div class="content">
    <div class="head-profile" v-if="store.user">

      <!-- Pour montrer les messages d'erreur liés à riot lorsqu'on lie un compte ou qu'on tente de récupérer les comptes liés -->
      <p v-if="riotLoadError" class="error-message">
        {{ riotLoadError }}
      </p>

      <!-- Section du haut (profil Discord + infos user) -->
      <h1>{{ translations[store.language].profile.myProfile }}</h1>
      <img class="img-profile" v-if="store.user.discordAvatarUrl" :src="store.user.discordAvatarUrl" :alt="store.user.discordUsername">
      <h2 class="username">{{ store.user.discordUsername || 'Utilisateur Discord' }}</h2>

      <!-- Gérer l'accès au dashboard admin et afficher lien vers le dashboard admin si le user a les privilèges admin -->
      <div v-if="store.user?.role === 'ADMIN'">
        <p class="admin-rights">{{ translations[store.language].admin.adminrights }}</p>
        <RouterLink to="/admindashboard">Admin Dashboard</RouterLink>
      </div>

      <div class="user-infos">
        <p v-if="store.user.firstName">{{ translations[store.language].profile.firstNameAl }} {{ store.user.firstName }}</p>
        <p v-if="store.user.lastName">{{ translations[store.language].profile.lastNameAl }} {{ store.user.lastName }}</p>
        <p v-if="store.user.email">{{ translations[store.language].profile.emailAl }} {{ store.user.email }}</p>
      </div>

      <div class="update-infos">
        <h2>{{ translations[store.language].profile.updateInfos }}</h2>

        <!-- Le form pour mettre à jour les infos du user -->
        <form class="profile-form" @submit.prevent="saveProfile">
          <div class="form-group">
            <label>{{ translations[store.language].profile.firstName }}</label>
            <input name="firstName" v-model="form.firstName" type="text" maxlength="120" :placeholder="translations[store.language].profile.firstName">
          </div>
          <div class="form-group">
            <label>{{ translations[store.language].profile.lastName }}</label>
            <input name="lastName" v-model="form.lastName" type="text" maxlength="120" :placeholder="translations[store.language].profile.lastName">
          </div>
          <div class="form-group">
            <label>{{ translations[store.language].profile.email }}</label>
            <input name="email" v-model="form.email" type="email" :placeholder="translations[store.language].profile.email">
          </div>

          <!-- Pour afficher les messages de succès/erreurs -->
          <p v-if="successMessage" class="success-message">
            {{ successMessage }}
          </p>
          <p v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </p>

          <!-- Bouton save du form -->
          <button class="save-button" type="submit" :disabled="isSaving">
            {{ isSaving ? translations[store.language].profile.saving : translations[store.language].profile.save }}
          </button>
        </form>
      </div>


      <!-- Section riot -->
      <div class="riot-section">
        <h2>{{ translations[store.language].profile.riotAccounts }}</h2>

        <p v-if="isLoadingRiotAccounts" class="empty-riot">
          {{ translations[store.language].profile.riotAccountsLoading }}
        </p>

        <!-- Affichage des comptes riot liés (s'il y en a) avec nom, tagline et type de compte (main, smurf) -->
        <div v-if="riotAccounts.length" class="riot-list">
          <div v-for="account in riotAccounts" :key="account.id || account.riotPuuid" class="riot-card" :class="{ 'main-account': account.isMain, 'smurf-account': !account.isMain }">
            <p>{{ account.gameName }}#{{ account.tagLine }}</p>
            <span v-if="account.isMain">{{ translations[store.language].profile.riotAccountMain }}</span>
            <span v-else>Smurf</span>
          </div>
        </div>

        <p v-if="!riotAccounts.length && !isLoadingRiotAccounts" class="empty-riot">
          {{ translations[store.language].profile.riotNone }}
        </p>

        <div class="riot-actions">
          <button :disabled="isLoadingRiotAccounts" class="save-button" type="button" @click="loginWithRiot(store.accessToken)">
            {{ translations[store.language].profile.riotLink }}
          </button>
        </div>
      </div>

      <!-- Section des équipes créées ou dirigées par le user -->
      <div class="teams-section">
        <h2>{{ translations[store.language].profile.myTeams }}</h2>

        <p v-if="isLoadingTeamRegistrations" class="empty-teams">
          {{ translations[store.language].profile.teamsLoading }}
        </p>

        <!-- Pour afficher les messages de succès/erreurs -->
        <p v-else-if="teamRegistrationsError" class="error-message">
          {{ teamRegistrationsError }}
        </p>

        <div v-else-if="teamRegistrations.length" class="teams-list">
          <article v-for="registration in teamRegistrations" :key="registration.id" class="team-card">
            <img v-if="registration.logoUrl" :src="registration.logoUrl" :alt="registration.teamName" class="team-logo">

            <div class="team-card-content">
              <h3>{{ registration.teamName }}</h3>

              <p>{{ registration.divisionName }}</p>

              <p>
                <strong>
                  {{ translations[store.language].profile.teamRole }}:
                </strong>

                {{ getUserTeamRole(registration) }}
              </p>

              <span class="team-status" :class="`status-${registration.status}`">
                {{
                  translations[store.language].profile.teamStatuses[
                  registration.status
                  ] || registration.status
                }}
              </span>

              <p v-if="registration.statusReason" class="team-status-reason">
                {{ registration.statusReason }}
              </p>
            </div>
          </article>
        </div>

        <p v-else class="empty-teams">
          {{ translations[store.language].profile.teamsNone }}
        </p>
      </div>

      <!-- Section des équipes dont le user fait partie (où il n'est ni capitaine ni créateur de l'équipe) -->
      <div class="teams-section">
        <h2>
          {{ translations[store.language].profile.memberTeams }}
        </h2>

        <p v-if="isLoadingMemberTeams" class="empty-teams">
          {{ translations[store.language].profile.teamsLoading }}
        </p>

        <!-- Pour afficher les messages de succès/erreurs -->
        <p v-else-if="memberTeamsError" class="error-message">
          {{ memberTeamsError }}
        </p>

        <div v-else-if="memberTeams.length" class="teams-list">
          <article v-for="team in memberTeams" :key="team.id" class="team-card">
            <img v-if="team.logoUrl" :src="team.logoUrl" :alt="team.teamName" class="team-logo">

            <div class="team-card-content">
              <h3>{{ team.teamName }}</h3>

              <p>{{ team.eventName }}</p>

              <p>{{ team.divisionName }}</p>

              <p>
                <strong>
                  {{ translations[store.language].profile.teamRole }}:
                </strong>

                {{ getMemberRole(team) }}
              </p>

              <span class="team-status status-approved">
                {{
                  translations[store.language]
                    .profile.teamStatuses.approved
                }}
              </span>
            </div>
          </article>
        </div>

        <p v-else class="empty-teams">
          {{ translations[store.language].profile.memberTeamsNone }}
        </p>
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

.error-message {
  color: #ff7b7b;
  background: rgba(255, 80, 80, 0.08);
  border: 1px solid rgba(255, 80, 80, 0.25);
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
}

.teams-section {
  margin-top: 40px;
  padding: 35px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.teams-section h2 {
  color: white;
  margin-bottom: 25px;
  font-size: 1.8rem;
  letter-spacing: 2px;
}

.teams-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.team-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 18px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(255, 255, 255, 0.08);
  text-align: left;
}

.team-logo {
  width: 85px;
  height: 85px;
  flex-shrink: 0;
  object-fit: contain;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.3);
}

.team-card-content {
  flex: 1;
}

.team-card-content h3 {
  margin: 0 0 8px;
  color: white;
  font-size: 1.25rem;
}

.team-card-content p {
  margin: 5px 0;
  color: #d6d6d6;
}

.team-status {
  display: inline-block;
  margin-top: 8px;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
}

.status-pending {
  color: #ffd978;
  background: rgba(255, 217, 120, 0.1);
  border: 1px solid rgba(255, 217, 120, 0.3);
}

.status-approved {
  color: #78ff9c;
  background: rgba(120, 255, 156, 0.1);
  border: 1px solid rgba(120, 255, 156, 0.3);
}

.status-rejected {
  color: #ff7b7b;
  background: rgba(255, 123, 123, 0.1);
  border: 1px solid rgba(255, 123, 123, 0.3);
}

.status-withdrawn {
  color: #b8b8b8;
  background: rgba(184, 184, 184, 0.08);
  border: 1px solid rgba(184, 184, 184, 0.2);
}

.team-status-reason {
  margin-top: 10px !important;
  color: #ff9d9d !important;
  font-size: 0.9rem;
}

.empty-teams {
  color: #d6d6d6;
  margin-bottom: 0;
}

@media (max-width: 600px) {
  .team-card {
    flex-direction: column;
    text-align: center;
  }

  .team-logo {
    width: 100px;
    height: 100px;
  }
}
</style>