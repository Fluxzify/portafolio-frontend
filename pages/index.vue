<template>
  <div class="flex justify-center items-center gap-6 max-w-6xl mx-auto my-12 px-4">

    <!-- CARD (solo texto) -->
    <div
      class="relative bg-gradient-to-br from-pink-100/60 via-pink-200/60 to-purple-100/60 p-6 rounded-3xl shadow-xl ring-2 ring-pink-300 max-w-3xl w-full overflow-hidden backdrop-blur-sm"
    >
      <!-- Efecto decorativo -->
      <div
        class="absolute inset-0 bg-gradient-to-tr from-white/30 to-pink-100/20 rounded-3xl blur-sm opacity-30 pointer-events-none"
      ></div>

      <!-- Contenido principal -->
      <div class="relative z-10 flex flex-col space-y-8">
        <!-- Welcome -->
        <div class="text-center">
          <h1 class="text-6xl font-extrabold text-[#ff66cc] drop-shadow-md select-none">
            Welcome
          </h1>
        </div>

        <!-- Texto + botón -->
        <div class="flex flex-col justify-center items-center text-center">
          <h2 class="text-2xl font-bold text-white drop-shadow-md mb-4">
            Thanks for visiting my page, you can see more information clicking the button below
          </h2>

          <NuxtLink
            to="/design"
            class="inline-block bg-[#ffb3e6] hover:bg-[#ffa0dc] text-white px-6 py-3 rounded-full shadow-md transition-all duration-300"
          >
            See my work 💖
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- IMAGEN (afuera del card) -->
    <div class="flex justify-center items-center">
      <img
        src="/images/misc/Home Drawing.webp"
        alt="Furry Chibi"
        class="h-[450px] object-contain rounded-2xl drop-shadow-2xl"
        loading="lazy"
      />
    </div>
  </div>
</template>
