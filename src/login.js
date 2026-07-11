import { clearAuth, store } from "./store.js";
import { translations } from "./i18n/translations.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//Pour se connecter en passant par Discord (crée également le compte pour le site Eternal)
export const loginWithDiscord = async () => {
  try {
    //Si la redirection vers Discord prend du temps on affiche un overlay avec un message de redirection
    store.isRedirecting = true;
    store.redirectMessage = translations[store.language].profile.redirectToDiscord;

    //Dirige vers la connexion par Discord et attend une réponse
    const response = await fetch(`${API_BASE_URL}/api/auth/discord/login`);

    //Lance l'erreur s'il y en a une
    if (!response.ok) {
      throw new Error("Failed to fetch Discord login URL");
    }

    //On récupère les données reçu en json
    const data = await response.json();

    window.location.href = data.loginUrl;
  } catch (error) {
    //S'il y a une erreur on l'affiche dans la console et on n'active pas l'overlay de redirection
    console.error("Discord login error:", error);
    store.isRedirecting = false;
    store.redirectMessage = '';
  }
};

//Pour se déconnecter du compte Discord/Eternal
export const logoutWithDiscord = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    //Lance l'erreur s'il y en a une
    if (!response.ok) {
      throw new Error("Failed to logout");
    }

    clearAuth();

    //Redirige vers la page d'accueil
    window.location.href = "/";
  } catch (error) {
    console.error("Discord logout error:", error);
  }
};

//Met à jour les informations de l'utilisateur (prénom/nom/email)
export const updateUserProfile = async (accessToken, profileData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(profileData),
  });

  //Lance l'erreur s'il y en a une + l'affiche dans la console
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Update profile failed:", response.status, errorText);
    throw new Error(`Failed to update profile: ${response.status}`);
  }

  return await response.json();
};

//Va chercher les comptes riot de l'utilisateur connecté
export const getRiotAccounts = async (accessToken) => {
  const response = await fetch(`${API_BASE_URL}/api/users/me/riot-accounts`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  //Lance l'erreur s'il y en a une
  if (!response.ok) {
    throw new Error("Failed to fetch Riot accounts");
  }

  return await response.json();
};

//Utilisé pour lier un compte riot au compte utilisateur
export const loginWithRiot = async (accessToken) => {
  try {
    store.isRedirecting = true;
    store.redirectMessage = translations[store.language].profile.redirectToRiot;

    const response = await fetch(`${API_BASE_URL}/api/users/me/riot-accounts/login`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    //Lance l'erreur s'il y en a une + l'affiche dans la console
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Riot login failed:', response.status, errorText);
      throw new Error('Failed to start Riot login');
    }

    //Récupère les données au format json
    const data = await response.json();

    window.location.href = data.loginUrl;
  } catch (error) {
    //S'il y en a une, affiche l'erreur dans la console
    console.error('Riot login error:', error);
    store.isRedirecting = false;
    store.redirectMessage = '';
  }
}

export const getMyTeamRegistrations = async (accessToken) => {
  const response = await fetch(
    `${API_BASE_URL}/api/team-registrations/me`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(
      Array.isArray(data?.message)
        ? data.message.join(', ')
        : data?.message || 'Unable to load team registrations.'
    )
  }

  return data
}

export const getApprovedEventTeams = async (eventSlug) => {
  const response = await fetch(
    `${API_BASE_URL}/api/events/${encodeURIComponent(eventSlug)}/teams`
  )

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(
      Array.isArray(data?.message)
        ? data.message.join(', ')
        : data?.message || 'Unable to load event teams.'
    )
  }

  return Array.isArray(data) ? data : []
}