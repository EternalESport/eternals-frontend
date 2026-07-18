<script setup>
import config from '@/config.json'
import { store, setLanguage } from '../store.js'
import { loginWithDiscord, logoutWithDiscord } from '../login.js'
import { translations } from '@/i18n/translations'
import Logo from './Logo.vue';
import Dash from './Dash.vue';

</script>

<template>
  <header>
    <nav>
      <div class="branding">
        <div class="logo-menu">
          <button class="logo-button" type="button" aria-label="Ouvrir le menu des sections" @click.stop="logoMenuOpen = !logoMenuOpen">
            <Logo />
          </button>
          <transition name="logo-dropdown">
            <!-- Empêche les clics dans le menu de le fermer -->
            <div v-show="logoMenuOpen" class="logo-dropdown" @click.stop>
              <!-- Chaque lien ferme le menu après navigation -->
              <RouterLink @click="closeLogoMenu" to="/">{{ translations[store.language].navigation.home }}</RouterLink>
              <RouterLink @click="closeLogoMenu" to="/ligue">Ligue</RouterLink>
              <RouterLink @click="closeLogoMenu" to="/circuit">Circuit</RouterLink>
              <RouterLink @click="closeLogoMenu" to="/events">{{ translations[store.language].admin.events }}</RouterLink> 
              <!-- Le bouton vers la page Riftbound dans le dropdown du logo (à activer lorsqu'on voudra rendre accessible la page Riftbound) -->
              <!-- <RouterLink @click="closeLogoMenu" to="/riftbound">Riftbound</RouterLink> -->
            </div>
          </transition>
        </div>
      </div>

      <!-- Nav desktop -->
      <ul v-show="!mobile" class="navigation-socials">
        <li>
          <div class="dash">
            <Dash />
          </div>
        </li>
        <!-- Médias sociaux -->
        <li class="socials"><a :href="config.discord" target="_blank"><font-awesome-icon :icon="['fab', 'discord']" /></a></li>
        <li class="socials"><a :href="config.twitch" target="_blank"><font-awesome-icon :icon="['fab', 'twitch']" /></a></li>
        <li class="socials"><a :href="config.tiktok" target="_blank"><font-awesome-icon :icon="['fab', 'tiktok']" /></a></li>
        <li class="socials"><a :href="config.instagram" target="_blank"><font-awesome-icon :icon="['fab', 'instagram']" /></a></li>
        <li class="socials"><a :href="config.youtubeChannel" target="_blank"><font-awesome-icon :icon="['fab', 'youtube']" /></a></li>
        <li class="socials"><a :href="config.twitter" target="_blank"><font-awesome-icon :icon="['fab', 'x-twitter']" /></a></li>
        <li class="socials"><a :href="config.facebook" target="_blank"><font-awesome-icon :icon="['fab', 'facebook']" /></a></li>
      </ul>
      <ul v-show="!mobile" class="navigation">
        <li class="categories">
          <RouterLink :to="'/mission'" class="link">{{ translations[store.language].navigation.mission }}</RouterLink>
        </li>
        <li class="categories">
          <RouterLink :to="'/equipe'" class="link">{{ translations[store.language].navigation.team }}</RouterLink>
        </li>
        <li class="categories">
          <RouterLink :to="'/halloffame'" class="link">{{ translations[store.language].navigation.hallOfFame }}</RouterLink>
        </li>
        <li>
          <div class="dash">
            <Dash />
          </div>
        </li>
        <!-- Profil -->
        <li v-if="!store.user || !store.user.discordAvatarUrl">
          <button @click="loginWithDiscord" class="lang-btn">{{ store.language === 'fr' ? 'Connexion' : 'Login' }}</button>
        </li>
        <li v-else>
          <div class="profile-desktop">
            <RouterLink to="/profile" class="profile-button">
              <img :src="store.user.discordAvatarUrl" :alt="store.user.discordUsername" class="profile-avatar">
            </RouterLink>
            <button @click="logoutWithDiscord" class="lang-btn">{{ store.language === 'fr' ? 'Déconnexion' : 'Logout' }}</button>
          </div>
        </li>
        <!-- Langue -->
        <li class="language-toggle">
          <button @click="setLanguage(store.language === 'fr' ? 'en' : 'fr')" class="lang-btn">
            {{ store.language === 'fr' ? 'EN' : 'FR' }}
          </button>
        </li>
      </ul>
      <div class="far fa-bars" :class="{ 'icon-active': mobileNav }"></div>
      <div class="icon">
        <font-awesome-icon @click="toggleMobileNav" v-show="mobile" :icon="['fas', 'bars']" class="far fa-bars" :class="{ 'icon-active': mobileNav }"></font-awesome-icon>
      </div>

      <!-- Nav mobile -->
      <transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdown-nav">
          <li class="language-toggle-mobile">
            <button @click="setLanguage(store.language === 'fr' ? 'en' : 'fr')" class="lang-btn">
              {{ store.language === 'fr' ? 'EN' : 'FR' }}
            </button>
          </li>

          <li v-if="!store.user || !store.user.discordAvatarUrl">
            <div class="profile-mobile">
              <button @click="loginWithDiscord" class="lang-btn">{{ store.language === 'fr' ? 'Connexion' : 'Login' }}</button>
            </div>
          </li>
          <li v-else>
            <div class="profile-mobile">
              <RouterLink @click="toggleMobileNav" to="/profile" class="profile-button">
                <img :src="store.user.discordAvatarUrl" :alt="store.user.discordUsername" class="profile-avatar">
              </RouterLink>
              <button @click="logoutWithDiscord" class="lang-btn">{{ store.language === 'fr' ? 'Déconnexion' : 'Logout' }}</button>
            </div>
          </li>

          <li>
            <RouterLink @click="toggleMobileNav" :to="'/mission'" class="link">{{ translations[store.language].navigation.mission }}</RouterLink>
          </li>
          <li>
            <RouterLink @click="toggleMobileNav" :to="'/equipe'" class="link">{{ translations[store.language].navigation.team }}</RouterLink>
          </li>
          <li>
            <RouterLink @click="toggleMobileNav" :to="'/halloffame'" class="link">{{ translations[store.language].navigation.hallOfFame }}</RouterLink>
          </li>
          <div class="socials-container">
            <a :href="config.discord" target="_blank"><font-awesome-icon :icon="['fab', 'discord']" /></a>
            <a :href="config.twitch" target="_blank"><font-awesome-icon :icon="['fab', 'twitch']" /></a>
            <a :href="config.tiktok" target="_blank"><font-awesome-icon :icon="['fab', 'tiktok']" /></a>
            <a :href="config.instagram" target="_blank"><font-awesome-icon :icon="['fab', 'instagram']" /></a>
            <a :href="config.youtubeChannel" target="_blank"><font-awesome-icon :icon="['fab', 'youtube']" /></a>
            <a :href="config.twitter" target="_blank"><font-awesome-icon :icon="['fab', 'x-twitter']" /></a>
            <a :href="config.facebook" target="_blank"><font-awesome-icon :icon="['fab', 'facebook']" /></a>
          </div>
        </ul>
      </transition>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Navigation",

  data() {
    return {
      mobile: null,
      mobileNav: false,
      windowWidth: null,
      logoMenuOpen: false,
    }
  },

  mounted() {
    window.addEventListener('resize', this.checkScreen);
    // Pour fermer le dropdown si on clique ailleurs
    document.addEventListener('click', this.closeLogoMenu);
    this.checkScreen();
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.checkScreen);
    document.removeEventListener('click', this.closeLogoMenu);
  },

  methods: {
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },

    closeLogoMenu() {
      this.logoMenuOpen = false;
    },

    checkScreen() {
      this.windowWidth = window.innerWidth;

      if (this.windowWidth < 1400) {
        this.mobile = true;
      } else {
        this.mobile = false;
        this.mobileNav = false;
      }
    }
  },
}
</script>

<style scoped>
header {
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  transition: 0.5s ease all;
  line-height: 1.5;
  width: 100%;
  background-color: #111;
  color: var(--nav-color);
}

.dash {
  width: 43px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dash svg {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
}

.branding {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-left: 40px;
}

.profile-desktop {
  display: flex;
  align-items: center;
  gap: 12px;
}

.profile-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
}

.profile-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
  transition: 0.3s ease all;
}

.profile-avatar:hover {
  transform: scale(1.08);
  border-color: var(--nav-color);
}

.profile-mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding-left: 0;
}

.profile-mobile .profile-button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-mobile .profile-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
}

.profile-mobile .lang-btn {
  font-size: 14px;
  padding: 6px 10px;
  white-space: nowrap;
}


@media screen and (max-width: 1000px) {
  .branding {
    padding-left: 20px;
  }
}

.logo-menu {
  position: relative;
  display: flex;
  align-items: center;
}

.logo-button {
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  z-index: 10000;
}

.logo-button:hover {
  transform: scale(1.05);
  transition: 0.3s ease;
}

.logo-button :deep(svg),
.logo-button :deep(img) {
  width: 120px;
  height: auto;
  display: block;
}

.logo-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 180px;
  background-color: #111;
  border: 1px solid var(--nav-color);
  border-radius: 8px;
  /* Pour que les coins des liens ne dépassent pas de la boîte du dropdown */
  padding: 10px 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
  z-index: 10001;
}

.logo-dropdown a {
  padding: 10px 16px;
  color: white;
  text-decoration: none;
  transition: 0.3s ease;
}

.logo-dropdown a:hover {
  background-color: var(--nav-color);
  color: white;
}

.logo-dropdown-enter-active,
.logo-dropdown-leave-active {
  transition: 0.25s ease;
}

.logo-dropdown-enter-from,
.logo-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.logo-dropdown-enter-to,
.logo-dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.navigation-socials {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-start;
  padding-right: 0px;
}

.navigation {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
  padding-right: 20px;
}

nav {
  position: relative;
  display: flex;
  text-align: left;
  font-size: 18px;
  transition: 0.5s ease all;
  color: white;
  width: 90%;
  height: 80px;
}

nav .categories a {
  font-weight: bolder;
  font-size: 1.8em;
  white-space: nowrap;
  /*So the text stays in one line when there's less space*/
}

nav .categories a:hover {
  color: white;
  transform: scale(1.2);
  transition: 0.5s ease all;
}

nav .categories .link {
  color: var(--nav-color);
}

nav a:hover {
  color: var(--nav-color);
  transition: 0.5s ease all;
}

nav .socials {
  padding-left: 2rem;
}

nav .socials a {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: white;
  transition: 0.5s ease all;
}

nav .socials a:hover {
  color: var(--nav-color);
  transform: scale(1.2);
  transition: 0.5s ease all;
}

nav .language-toggle {
  padding-left: 2rem;
  display: flex;
  gap: 0;
}

nav .lang-btn {
  background: transparent;
  color: white;
  border: 1px solid white;
  padding: 5px 12px;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: 0.3s ease all;
}

nav .lang-btn:hover {
  background-color: var(--nav-color);
  color: white;
  border-color: var(--nav-color);
}

@media screen and (max-width: 1720px) {

  nav {
    font-size: 16px;
  }

  nav li {
    padding-left: 1.8rem;
  }

  nav .categories a {
    font-size: 1.45em;
  }

  nav .socials {
    padding-left: 1.2rem;
  }

  nav .socials a {
    font-size: 24px;
  }

  .branding {
    padding-left: 20px;
  }

  .logo-button :deep(svg),
  .logo-button :deep(img) {
    width: 100px;
  }

  .profile-desktop {
    gap: 8px;
  }

  .profile-avatar {
    width: 38px;
    height: 38px;
  }

  nav .lang-btn {
    font-size: 13px;
    padding: 4px 9px;
  }
}

@media (min-width: 1400px) {
  nav {
    width: 100%;
  }
}


nav .icon {
  display: flex;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 0;
  height: 75%;
  color: white;
}

nav .icon svg {
  cursor: pointer;
  height: 50%;
  transition: 0.8s ease all;
}

nav .icon-active {
  transform: rotate(180deg);
}

nav .dropdown-nav {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  max-width: 250px;
  height: 100%;
  background-color: #111;
  top: 0;
  left: 0;
  z-index: 10002;
}

nav .dropdown-nav li {
  margin-left: 0;
  padding-top: 40px;
  text-align: center;
  padding-right: 3rem;
}

nav .dropdown-nav li .link {
  color: var(--nav-color);
}

nav .dropdown-nav li .link:hover {
  color: white;
  transform: scale(1.2);
  transition: 0.5s ease all;
}

nav .dropdown-nav li .language-toggle-mobile {
  padding-top: 30px !important;
  display: flex;
  gap: 0;
  justify-content: center;
  flex-direction: row;
}

nav .dropdown-nav li .language-toggle-mobile .lang-btn {
  background: transparent;
  color: white;
  border: 1px solid white;
  padding: 5px 12px;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  transition: 0.3s ease all;
}

nav .dropdown-nav li .language-toggle-mobile .lang-btn:hover {
  background-color: var(--nav-color);
  color: white;
  border-color: var(--nav-color);
}

nav .dropdown-nav .socials-container {
  /* position: absolute;
  top: 280px; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  /* Add spacing between logos */
  text-align: center;
  padding: 20px 0;
  gap: 10px;
}

nav .dropdown-nav .socials-container a {
  flex: 1 1 calc(50% - 10px);
  font-size: 35px;
  color: white;
  transition: 0.5s ease all;
}

nav .dropdown-nav .socials-container a:hover {
  color: var(--nav-color);
  transform: scale(1.2);
}

nav .mobile-nav-enter-active,
nav .mobile-nav-leave-active {
  transition: 0.8s ease all;
}

nav .mobile-nav-enter-from,
nav .mobile-nav-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

nav .mobile-nav-enter-to {
  opacity: 1;
  transform: translateX(0);
}

/* Media query for max-width: 1000px */
@media screen and (max-width: 1000px) {
  nav {
    padding-right: 20px;
  }

  .branding .logo {
    transition: 0.5s ease all;
    padding: 0px;
    width: 80px;
  }

  .branding .logo img {
    height: 50px;
    margin-top: 5px;
  }
}

nav ul li {
  list-style: none;

}

nav ul li img {
  height: 90px;
  width: 25px;
}

.fa-bars {
  color: var(--nav-color);
}


nav li {
  padding-left: 3rem;
}
</style>