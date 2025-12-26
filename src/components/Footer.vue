<script setup>
import config from '@/config.json'
</script>

<template>
    <footer>
      <div class="footer">
      <div class="row">
        <a :href="config.discord" target="_blank"><font-awesome-icon :icon="['fab', 'discord']" /></a>
        <a :href="config.twitch" target="_blank"><font-awesome-icon :icon="['fab', 'twitch']" /></a>
        <a :href="config.youtubeChannel" target="_blank"><font-awesome-icon :icon="['fab', 'youtube']" /></a>
        <a :href="config.twitter" target="_blank"><font-awesome-icon :icon="['fab', 'x-twitter']" /></a>
        <a :href="config.facebook" target="_blank"><font-awesome-icon :icon="['fab', 'facebook']" /></a>
      </div>

      <div class="row footerrow">
          <ul>
            <li><a href="/">Accueil</a></li>
            <li><a href="/mission">Mission</a></li>
            <li><a href="/equipe">L'équipe</a></li>
            <li><a href="/halloffame">Hall of Fame</a></li>
          </ul>
      </div>
      <div class="row copyright">
        Eternal E-Sport Copyright © 2025 Eternal E-Sport - Tout droits réservés || Conçu par Anthony Dumulong
      </div>
    </div>
  </footer>
</template>

<script>
    export default {
        name: "footer",
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
                if (this.windowWidth < 1140) {
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
  footer{
    padding:30px 0px;
    font-family: 'GeneralSans', sans-serif;
    text-align:center;
    position: absolute;
    width: 100%;
    height: 2.5rem;
    width: 100%;
  }

  .footer .row{
  width:100%;
  margin:1% 0%;
  padding:0.6% 0%;
  color:gray;
  font-size:0.8em;
  }

  .copyright{
    padding: 30px !important;
  }

  .footer .row a{
  text-decoration:none;
  color:gray;
  transition:0.5s;
  font-size: 16px;
  }

  .footer .row a:hover{
  color:#fff;
  }

  .footer .row ul{
  width:100%;
  }

  .footer .row ul li{
  display:inline-block;
  margin:0px 30px;
  }

  .footer .row a svg{
  font-size:1.1em;
  background-color: var(--main-color);
  color: white;
  padding: 15px;
  border-radius: 35px;
  margin:0% 1%;
  }
  .footer .row a svg:hover{
    transition: 0.5s;
    background-color: white;
    color: black;
  }
  
  @media (max-width: 1000px){
    .footerrow{
      display: none;
    }
  }

  
</style>