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
        <a class="logo" href="/" alt="Accueil">
          <Logo />
        </a>
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
      if (this.windowWidth < 1300) {
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

.branding .logo {
  transition: 0.5s ease all;
  padding: 0px;
  width: 120px;
}

.branding .logo img {
  height: 50px;
  margin-top: 5px;
}

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

  /* Media query for max-width: 1000px */
  @media screen and (max-width: 1000px) {
    nav {
      padding-right: 20px;
    }
  }

  @media (max-width: 1000px) {
    padding-right: 20px;

    header {
      width: 10vw;
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

  font-size: 18px;
  transition: 0.5s ease all;
  color:white;
  width: 90%;
  height: 80px;

  .categories a {
    font-weight: bolder;
    font-size: 1.8em;

    &:hover {
      color: white;
      transform: scale(1.2);
      transition: 0.5s ease all;
    }
  }

  a {
    &:hover {
      color: var(--main-color);
      transform: scale(1.2);
      transition: 0.5s ease all;
    }
  }

  .socials {
    padding-left: 2rem;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      color: white;
      transition: 0.5s ease all;

      &:hover {
        color: var(--main-color);
        transform: scale(1.2);
        transition: 0.5s ease all;
      }
    }
  }

  .language-toggle {
    padding-left: 2rem;
    display: flex;
    gap: 0;
  }

  .lang-btn {
    background: transparent;
    color: white;
    border: 1px solid white;
    padding: 5px 12px;
    border-radius: 3px;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
    transition: 0.3s ease all;

    &:hover {
      background-color: var(--main-color);
      color: white;
      border-color: var(--main-color);
    }
  }

  @media (min-width: 1300px) {
    width: 100%;

  }


  .icon {
    display: flex;
    align-items: center;
    position: absolute;
    top: 10px;
    right: 0;
    height: 75%;
    color: white;

    svg {
      cursor: pointer;
      height: 50%;
      transition: 0.8s ease all;
    }
  }

  .icon-active {
    transform: rotate(180deg);
  }

  .dropdown-nav {
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100%;
    max-width: 250px;
    height: 100%;
    background-color: #111;
    top: 0;
    left: 0;

    li {
      margin-left: 0;
      padding-top: 40px;
      text-align: left;

      .link {
        color: var(--main-color);
      }
    }

    .language-toggle-mobile {
      padding-top: 30px !important;
      display: flex;
      gap: 0;
      justify-content: center;
      flex-direction: row;

      .lang-btn {
        background: transparent;
        color: white;
        border: 1px solid white;
        padding: 5px 12px;
        border-radius: 3px;
        cursor: pointer;
        font-weight: bold;
        font-size: 14px;
        transition: 0.3s ease all;

        &:hover {
          background-color: var(--main-color);
          color: white;
          border-color: var(--main-color);
        }
      }
    }

    .socials-container {
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

    .socials-container a {
      flex: 1 1 calc(50% - 10px);
      font-size: 35px;
      color: white;
      transition: 0.5s ease all;
    }

    .socials-container a:hover {
      color: var(--main-color);
      transform: scale(1.2);
    }
  }

  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: 0.8s ease all;
  }

  .mobile-nav-enter-from,
  .mobile-nav-leave-to {
    opacity: 0;
    transform: translateX(-100%);
  }

  .mobile-nav-enter-to {
    opacity: 1;
    transform: translateX(0);
  }
}

nav ul li {
  list-style: none;

  img {
    height: 90px;
    width: 25px;
  }
}

.fa-bars {
  color: var(--main-color);
}


nav li {
  padding-left: 3rem;
}
</style>