<script setup>
import { onMounted } from 'vue'
import { store } from '../store.js'
import router from '../router/index.js'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

onMounted(async () => {
  const hashParams = new URLSearchParams(window.location.hash.substring(1))
  const authCode = hashParams.get('authCode')

  if (!authCode) {
    console.error('Missing authCode')
    return
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/exchange-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        code: authCode,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to exchange auth code')
    }

    const data = await response.json()

    store.accessToken = data.accessToken
    store.user = data.user

    window.history.replaceState({}, '', window.location.pathname)

    router.push('/profile')
  }
  catch (error) {
    console.error('Discord callback error:', error)
  }
})
</script>

<template>
  <div class="content">
    <div class="text">
      <h2>Authorization processing ...</h2>
    </div>
  </div>
</template>

<style scoped>
.content {
  height: 70vh;
  color: white;
  font-family: GeneralSansMedium;
}

.text {
  width: 60%;
  margin: auto;
  padding-top: 300px;
  position: relative;
}
</style>
