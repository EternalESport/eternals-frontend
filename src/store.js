import { reactive } from "vue";

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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Pour garder aller rechercher le user discord lors d'un refresh de page
export const refreshAuth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      clearAuth();
      return false;
    }

    const data = await response.json();

    setAuth({
      accessToken: data.accessToken,
      user: data.user,
    });

    return true;
  } catch (error) {
    console.error("Refresh auth error:", error);
    clearAuth();
    return false;
  }
};

export const store = reactive({
  videos: [],
  language: "fr",
  isRedirecting: false,

  //Auth Discord
  accessToken: null,
  user: null,
});

// Utilitaires pour les cookies
const getCookie = (name) => {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length);
    }
  }
  return null;
};

const setCookie = (name, value, days = 365) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

// Méthode pour définir la langue
export const setLanguage = (lang) => {
  if (lang === "fr" || lang === "en") {
    store.language = lang;
    setCookie("eternals-language", lang);
  }
};

// Pour conserver le token discord lors du login
export const setAuth = ({ accessToken, user }) => {
  store.accessToken = accessToken;
  store.user = user;
};

// Pour clear le token discord lors du logout
export const clearAuth = () => {
  store.accessToken = null;
  store.user = null;
};

// Méthode pour initialiser la langue depuis le cookie
export const initializeLanguage = () => {
  const savedLanguage = getCookie("eternals-language");
  if (savedLanguage && (savedLanguage === "fr" || savedLanguage === "en")) {
    store.language = savedLanguage;
  } else {
    store.language = "fr";
    setCookie("eternals-language", "fr");
  }
};
