<template>
  <div class="flex items-center justify-center min-h-screen bg-pink-50">
    <form @submit.prevent="handleLogin" class="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
      <h2 class="text-2xl font-bold text-pink-500 text-center">Login</h2>

      <div>
        <label for="email" class="block text-sm font-medium">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
          required
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium">Contraseña</label>
        <input
          id="password"
          v-model="password"
          type="password"
          class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-md"
      >
        Iniciar sesión
      </button>

      <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'

definePageMeta({
  layout: 'login'
})
const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const cookies = useCookies()

const apiBase = useRuntimeConfig().public.API_BASE_URL

const handleLogin = async () => {
  try {
    const res = await fetch(`${apiBase}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value }),
      credentials: 'include'
    })

    if (!res.ok) {
      let errorMsg = 'Error al iniciar sesión'
      try {
        const errorData = await res.json()
        errorMsg = errorData.message || errorMsg
      } catch {
        errorMsg = await res.text()
      }
      throw new Error(errorMsg)
    }

    // No esperamos token en respuesta porque está en cookie HttpOnly
    router.push('/dashboard')

  } catch (err) {
    error.value = err.message
  }
}



</script>
