import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { useCookies } from '@vueuse/integrations/useCookies'


export default defineNuxtRouteMiddleware(async (to, from) => {
  const apiBase = useRuntimeConfig().public.API_BASE_URL

  try {
    const res = await fetch(`${apiBase}/api/auth/me`, {
  method: 'GET',
  credentials: 'include'
})

    if (!res.ok) {
      return navigateTo('/login')
    }

  } catch (err) {
    return navigateTo('/login')
  }
})