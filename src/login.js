import { clearAuth } from "./store.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loginWithDiscord = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/discord/login`);

    if (!response.ok) {
      throw new Error("Failed to fetch Discord login URL");
    }

    const data = await response.json();

    window.location.href = data.loginUrl;
  } catch (error) {
    console.error("Discord login error:", error);
  }
}

export const logoutWithDiscord = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to logout");
    }

    clearAuth();

    window.location.href = "/";
  } catch (error) {
    console.error("Discord logout error:", error);
  }
}

export const updateUserProfile = async (accessToken, profileData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Update profile failed:", response.status, errorText);
    throw new Error(`Failed to update profile: ${response.status}`);
  }

  return await response.json();
}

export const getRiotAccounts = async (accessToken) => {
  const response = await fetch(`${API_BASE_URL}/api/users/me/riot-accounts`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch Riot accounts')
  }

  return await response.json()
}

// export const linkRiotAccount = async (accessToken, riotData) => {
//   const response = await fetch(`${API_BASE_URL}/api/users/me/riot-accounts`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${accessToken}`,
//     },
//     body: JSON.stringify(riotData),
//   })

//   if (!response.ok) {
//     const errorText = await response.text()
//     console.error('Link Riot account failed:', response.status, errorText)
//     throw new Error('Failed to link Riot account')
//   }

//   return await response.json()
// }

export const loginWithRiot = async (accessToken) => {
  const response = await fetch(`${API_BASE_URL}/api/users/me/riot-accounts/login`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('Riot login failed:', response.status, errorText)
    throw new Error('Failed to start Riot login')
  }

  const data = await response.json()

  window.location.href = data.loginUrl
}