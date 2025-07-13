// https://nuxt.com/docs/api/configuration/nuxt-config 
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui'
  ],

  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.NUXT_PUBLIC_API_BASE_URL,

      // Desactivando el WebSocket de Nuxt Content
      content: {
        wsUrl: ''
      }
    }
  },

  plugins: [
    '~/plugins/noContentWs.client.ts'
  ],

  app: {
    head: {
      title: 'Nek0_ch4n Art Portfolio - Furry, Sonic, Fantasy & More',
      meta: [
        {
          name: 'description',
          content: 'Welcome to Nek0_ch4n\'s digital art portfolio! Discover unique designs inspired by Sonic, My Little Pony, video games, fairies, and more.'
        },
        {
          name: 'keywords',
          content: 'nek0_ch4n, furry art, sonic fanart, MLP, Littlest Pet Shop, Pokémon, Genshin Impact, digital art, fantasy drawings, fairies, butterflies, horses, WoW, bratz, barbie'
        },
        { property: 'og:title', content: 'Nek0_ch4n Art Portfolio - Digital Designs & Fanart' },
        {
          property: 'og:description',
          content: 'Explore Nek0_ch4n\'s colorful and expressive art inspired by Sonic, MLP, fairies, and other fandoms. No fixed style, just creativity!'
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/preview.jpg' }, 
        { property: 'og:url', content: 'https://your-domain.com' }, // Cambia por tu dominio real
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Nek0_ch4n Art - Digital Portfolio' },
        {
          name: 'twitter:description',
          content: 'Fandom fanart, original designs and fantasy-inspired drawings. Follow Nek0_ch4n\'s evolving style and creations.'
        },
        { name: 'twitter:image', content: '/preview.jpg' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/Nek0_ch4n.ico' }
      ]
    }
  },

  // Configuración para que el devServer escuche en todas las interfaces
  devServer: {
    host: '0.0.0.0',
    port: 3000
  }
});
