<template>
  <div
    :class="[
      'relative flex flex-col font-y2k fondo-y2k text-[#2e2e2e]',
      route.path !== '/' ? 'min-h-[110vh]' : 'min-h-screen'
    ]"
  >
    <!-- HEADER -->
    <header class="bg-[#e651c9] text-white shadow-md border-b border-[#cba3e4] z-10">
      <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
        <NuxtLink to="/" class="text-2xl font-extrabold tracking-wide text-white hover:text-[#ffd6f9] transition">
          ☆ Home
        </NuxtLink>

        <div class="flex items-center space-x-6 text-sm md:text-base">
          <NuxtLink to="/design" class="hover:text-[#ffd6f9] transition">Design</NuxtLink>
          <NuxtLink to="/price" class="hover:text-[#ffd6f9] transition">Price</NuxtLink>
          <NuxtLink to="/tos" class="hover:text-[#ffd6f9] transition">TOS</NuxtLink>

          <!-- Botón activar/desactivar Sonic -->
          
        </div>
      </nav>
    </header>

    <!-- MAIN -->
    <main class="flex-grow container mx-auto px-6 py-10 z-10">
      <NuxtPage />
    </main>

    <!-- CONTENEDOR SONIC + FOOTER -->
    <div class="relative">
      

      <footer
        class="bg-[#e651c9] text-white border-t border-[#cba3e4] py-6 z-10"
        style="height: 56px;"
      >
        <div class="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 px-6">
          <a
            href="https://toyhou.se/Nek0_ch4n"
            target="_blank"
            class="flex items-center space-x-2 hover:text-[#ffd6f9] hover:drop-shadow-[0_0_5px_#ffd6f9] transition"
          >
            <img src="/images/icons/Toyhouse.svg" alt="Toyhouse" class="w-6 h-6" />
            <span>Toyhouse</span>
          </a>
          <p class="text-sm text-white">© 2025 nek0_ch4n designs ✦</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()


</script>
