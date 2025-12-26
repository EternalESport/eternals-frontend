import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueScrollTo from 'vue-scrollto'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/mdc-dark-indigo/theme.css'
import Tooltip from 'primevue/tooltip';
import config from '@/config.json'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faChalkboardUser, faUserTie, faBars } from "@fortawesome/free-solid-svg-icons";
import { faXTwitter, faDiscord, faYoutube, faTwitch, faFacebook } from "@fortawesome/free-brands-svg-icons";


/* add icons to the library */
library.add(faChalkboardUser, faUserTie, faBars, faXTwitter, faDiscord, faYoutube, faTwitch, faFacebook)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.directive('tooltip', Tooltip)
app.use(PrimeVue)
app.use(VueScrollTo)

app.mount('#app')

document.body.style.setProperty('--main-color', config.color)