<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { setAuth } from '../store.js'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const router = useRouter()

const error = ref(null)

onMounted(async () => {
    try {
        const hash = window.location.hash
        const params = new URLSearchParams(hash.replace('#', ''))
        const authCode = params.get('authCode')

        if (!authCode) {
            throw new Error('Auth code manquant')
        }

        const response = await fetch(`${API_BASE_URL}/api/auth/exchange-code`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: authCode,
            }),
        })

        if (!response.ok) {
            throw new Error('Échec de la connexion Discord')
        }

        const data = await response.json()

        //Pour enregistrer le token et le user
        setAuth({
            accessToken: data.accessToken,
            user: data.user,
        })

        window.history.replaceState(null, '', '/auth/callback')

        router.push('/profile')
    }
    catch (err) {
        console.error('Auth callback error:', err)
        error.value = 'La connexion a échoué. Veuillez réessayer.'
    }
})
</script>

<template>
    <main class="auth-callback">
        <p v-if="!error">Connexion en cours...</p>

        <div v-else>
            <p>{{ error }}</p>
            <RouterLink to="/">Retour à l’accueil</RouterLink>
        </div>
    </main>
</template>