import { clearAuth } from './store.js'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const loginWithDiscord = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/discord/login`)

    if (!response.ok) {
      throw new Error('Failed to fetch Discord login URL')
    }

    const data = await response.json()

    window.location.href = data.loginUrl
  }
  catch (error) {
    console.error('Discord login error:', error)
  }
}

export const logoutWithDiscord = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to logout')
    }

    clearAuth()

    window.location.href = '/'
  }
  catch (error) {
    console.error('Discord logout error:', error)
  }
}