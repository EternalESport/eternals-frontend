import { reactive } from 'vue'
import { translations } from '@/i18n/translations'

// État global de la langue
const languageState = reactive({
  current: 'fr'
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

// Composable pour l'utilisation de la langue
export const useLanguage = () => {
  // Initialiser la langue depuis le cookie ou utiliser le défaut
  const initializeLanguage = () => {
    const savedLanguage = getCookie('eternals-language')
    if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en')) {
      languageState.current = savedLanguage
    } else {
      languageState.current = 'fr' // Défaut: français
      setCookie('eternals-language', 'fr')
    }
  }

  // Changer la langue et sauvegarder en cookie
  const setLanguage = (lang) => {
    if (lang === 'fr' || lang === 'en') {
      languageState.current = lang
      setCookie('eternals-language', lang)
    }
  }

  // Obtenir la langue actuelle
  const getLanguage = () => languageState.current

  // Fonction de traduction
  const t = (key) => {
    const keys = key.split('.')
    let value = translations[languageState.current]

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key // Retourner la clé si pas trouvée
      }
    }

    return value
  }

  return {
    initializeLanguage,
    setLanguage,
    getLanguage,
    t,
    currentLanguage: languageState
  }
}
