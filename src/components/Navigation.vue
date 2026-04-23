<script setup>
import config from '@/config.json'
import { store, setLanguage } from '../store.js'
import { translations } from '@/i18n/translations'
import Logo from './Logo.vue';
import Dash from './Dash.vue';
</script>

<template>
  <header>
    <nav>
      <div class="branding">
        <div class="logo-menu" @mouseenter="logoMenuOpen = true" @mouseleave="logoMenuOpen = false">
          <button class="logo-button" type="button" aria-label="Ouvrir le menu des sections">
            <Logo />
          </button>
          <transition name="logo-dropdown">
            <div v-show="logoMenuOpen" class="logo-dropdown">
              <RouterLink @click="closeLogoMenu" to="/">Ligue</RouterLink>
              <RouterLink @click="closeLogoMenu" to="/circuit">Circuit</RouterLink>
              <RouterLink @click="closeLogoMenu" to="/riftbound">Riftbound</RouterLink>
            </div>
          </transition>
        </div>
      </div>
      <ul v-show="!mobile" class="navigation-part1">
        <li>
          <div class="dash">
            <Dash />
          </div>
        </li>
        <li class="socials"><a :href="config.discord" target="_blank"><font-awesome-icon :icon="['fab', 'discord']" /></a></li>
        <li class="socials"><a :href="config.twitch" target="_blank"><font-awesome-icon :icon="['fab', 'twitch']" /></a></li>
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
        <li class="language-toggle">
          <button @click="setLanguage(store.language === 'fr' ? 'en' : 'fr')" class="lang-btn">
            {{ store.language === 'fr' ? 'EN' : 'FR' }}
          </button>
        </li>
      </ul>
      <!--
      <a v-if="store.token === ''" class="login" href="https://discord.com/oauth2/authorize?client_id=1239760825443684444&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Fdiscord&scope=identify+connections+guilds+email+openid" >Connexion<font-awesome-icon :icon="['fab', 'discord']" /></a>
      <div v-else></div>
      -->
      <div class="far fa-bars" :class="{ 'icon-active': mobileNav }"></div>
      <div class="icon">
        <font-awesome-icon @click="toggleMobileNav" v-show="mobile" :icon="['fas', 'bars']" class="far fa-bars" :class="{ 'icon-active': mobileNav }"></font-awesome-icon>
      </div>
      <transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdown-nav">
          <li class="language-toggle-mobile">
            <button @click="setLanguage(store.language === 'fr' ? 'en' : 'fr')" class="lang-btn">
              {{ store.language === 'fr' ? 'EN' : 'FR' }}
            </button>
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
  name: "navigation",
  data() {
    return {
      mobile: null,
      mobileNav: null,
      windowWidth: null,
      logoMenuOpen: false,
    }
  },
  name: "navigation-part1",
  data() {
    return {
      mobile: null,
      mobileNav: null,
      windowWidth: null,
    }
  },
  created() {
    window.addEventListener('resize', this.checkScreen);
    this.checkScreen();
  },

  methods: {
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },

    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth < 1400) {
        this.mobile = true;
        return
      } else {
        this.mobile = false;
        this.mobileNav = false;
        return;
      }
    }
  },
}
</script>

<style scoped>
header {
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  transition: 0.5s ease all;
  line-height: 1.5;
  width: 100%;
  background-color: #111;
  color: var(--main-color);
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

@media screen and (max-width: 1000px) {
  .branding {
    padding-left: 20px;
  }
}

.login {
  display: flex;
  align-items: center;
  position: absolute;
  top: 15px;
  right: 50px;
  padding: 8px 15px;
  border-radius: 25px;
  font-size: 18px;
  background-color: rgba(0, 57, 210, 1);
}

.login svg {
  margin-left: 10px;
}

.login:hover {
  color: black;
  transition: 0.5s;
  background-color: white;
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
  top: calc(100% + 10px);
  left: 0;
  min-width: 180px;
  background-color: #111;
  border: 1px solid var(--main-color);
  border-radius: 8px;
  padding: 10px 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
}

.logo-dropdown a {
  padding: 10px 16px;
  color: white;
  text-decoration: none;
  transition: 0.3s ease;
}

.logo-dropdown a:hover {
  background-color: var(--main-color);
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

/* ******************** */

.navigation-part1 {
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

nav a:hover {
  color: var(--main-color);
  transform: scale(1.2);
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
  color: var(--main-color);
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
  background-color: var(--main-color);
  color: white;
  border-color: var(--main-color);
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
}

nav .dropdown-nav li {
  margin-left: 0;
  padding-top: 40px;
  text-align: left;
}

nav .dropdown-nav li .link {
  color: var(--main-color);
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
  background-color: var(--main-color);
  color: white;
  border-color: var(--main-color);
}

nav .dropdown-nav .socials-container {
  position: absolute;
  top: 280px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  /* Add spacing between logos */
  text-align: center;
  padding: 10px 0;
  gap: 10px;
}

nav .dropdown-nav .socials-container a {
  flex: 1 1 calc(50% - 10px);
  font-size: 35px;
  color: white;
  transition: 0.5s ease all;
}

nav .dropdown-nav .socials-container a:hover {
  color: var(--main-color);
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
  color: var(--main-color);
}


nav li {
  padding-left: 3rem;
}
</style>