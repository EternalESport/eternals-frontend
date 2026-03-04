<script setup>
import { ref, onMounted } from 'vue'
import { store } from '@/store.js'
import { translations } from '@/i18n/translations'

const showBanner = ref(false)

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

// Vérifier si les cookies ont déjà été acceptés
onMounted(() => {
  const cookiesAccepted = getCookie('eternals-cookies-accepted')
  if (!cookiesAccepted) {
    showBanner.value = true
  }
})

const acceptCookies = () => {
  setCookie('eternals-cookies-accepted', 'true')
  showBanner.value = false
}

const rejectCookies = () => {
  showBanner.value = false
}
</script>

<template>
  <div v-if="showBanner" class="cookie-banner">
    <div class="cookie-content">
      <div class="cookie-text">
        <h3>{{ translations[store.language].cookies.title }}</h3>
        <p>{{ translations[store.language].cookies.message }}</p>
      </div>
      <div class="cookie-buttons">
        <button class="cookie-btn accept" @click="acceptCookies">
          {{ translations[store.language].cookies.accept }}
        </button>
        <button class="cookie-btn reject" @click="rejectCookies">
          {{ translations[store.language].cookies.reject }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #111;
  border-top: 2px solid var(--main-color);
  z-index: 1000;
  padding: 20px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.5);
}

.cookie-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.cookie-text h3 {
  margin: 0 0 10px 0;
  color: var(--main-color);
  font-size: 1.2em;
}

.cookie-text p {
  margin: 0;
  color: #ccc;
  font-size: 0.95em;
  line-height: 1.5;
}

.cookie-buttons {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}

.cookie-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s ease all;
  white-space: nowrap;
}

.cookie-btn.accept {
  background-color: var(--main-color);
  color: white;
}

.cookie-btn.accept:hover {
  background-color: #fff;
  color: #111;
}

.cookie-btn.reject {
  background-color: transparent;
  color: #ccc;
  border: 1px solid #ccc;
}

.cookie-btn.reject:hover {
  color: var(--main-color);
  border-color: var(--main-color);
}

@media (max-width: 900px) {
  .cookie-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .cookie-buttons {
    width: 100%;
  }

  .cookie-btn {
    flex: 1;
  }
}
</style>
