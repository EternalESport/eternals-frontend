import { reactive } from 'vue'

/*export const store = reactive({
  franchises: [],
  standingsChampions: [],
  standingsAcademy: [],
  statsPlayoffs: [],
  statsSeason: [],
  statsTotal: [],
  stats: [],
  token: "",
  user: {}
})*/

export const store = reactive({
  videos: [],
  language: 'fr'
})

// Utilitaires pour les cookies
const getCookie = (name) => {
  const nameEQ = name + '='
  const cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim()
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length)
    }
  }
  return null
}

const setCookie = (name, value, days = 365) => {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = 'expires=' + date.toUTCString()
  document.cookie = name + '=' + value + ';' + expires + ';path=/'
}

// Méthode pour définir la langue
export const setLanguage = (lang) => {
  if (lang === 'fr' || lang === 'en') {
    store.language = lang
    setCookie('eternals-language', lang)
  }
}

// Méthode pour initialiser la langue depuis le cookie
export const initializeLanguage = () => {
  const savedLanguage = getCookie('eternals-language')
  if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en')) {
    store.language = savedLanguage
  } else {
    store.language = 'fr'
    setCookie('eternals-language', 'fr')
  }
}