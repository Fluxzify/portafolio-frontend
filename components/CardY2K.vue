<template>
  <div
    class="relative bg-gradient-to-br from-pink-100 via-pink-200 to-purple-100 p-6 rounded-3xl shadow-xl ring-2 ring-pink-300 max-w-2xl mx-auto my-8 overflow-hidden"
  >
    <!-- Efecto decorativo (sin imágenes) -->
    <div
      class="absolute inset-0 bg-gradient-to-tr from-white/30 to-pink-100/20 rounded-3xl blur-sm opacity-30 pointer-events-none"
    ></div>

    <!-- Contenido principal -->
    <div class="relative z-10 flex flex-col items-center text-center space-y-4">
      <div class="text-4xl">🌟</div>

      <h2 class="text-2xl font-bold text-[#ff66cc] drop-shadow-md">
        ✨ I make custom designs ✨
      </h2>

      <p class="text-sm text-gray-700 leading-relaxed">
        Pastel, Y2K, furry, Sonic, MLP, Bratz & more!  
        <br />
        Open for commissions 💌
      </p>

      <NuxtLink
        to="/design"
        class="bg-[#ffb3e6] hover:bg-[#ffa0dc] text-white px-5 py-2 rounded-full shadow-md transition-all duration-300"
      >
        See my work 💖
      </NuxtLink>
    </div>
  </div>
</template>
