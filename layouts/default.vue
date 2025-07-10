<template>
  <div class="flex flex-col min-h-screen font-sans">
    <!-- HEADER -->
    <header class="bg-[#fec6dd] text-black shadow-md">
      <nav class="container mx-auto px-4 py-3 flex justify-between items-center">
        <!-- Home a la izquierda -->
        <NuxtLink to="/" class="font-black text-lg hover:underline">Home</NuxtLink>

        <!-- Links a la derecha -->
        <div class="flex space-x-4">
          <NuxtLink to="/design" class="hover:underline">Design</NuxtLink>
          <NuxtLink to="/price" class="hover:underline">Price</NuxtLink>
          <NuxtLink to="/tos" class="hover:underline">TOS</NuxtLink>  
        </div>
      </nav>
    </header>

    <!-- CONTENIDO -->
    <main class="flex-grow container mx-auto px-4 py-8">
      <NuxtPage />
    </main>

    <!-- FOOTER -->
    <footer class="bg-[#fec6dd] text-black py-6">
      <div class="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 px-4">
        <a
          href="https://toyhou.se/Nek0_ch4n"
          target="_blank"
          class="flex items-center space-x-2 hover:underline"
        >
          <img src="/images/icons/Toyhouse.svg" alt="Toyhouse" class="w-5 h-5" />
          <span>Toyhouse</span>
        </a>

        <p class="text-sm text-black/70">© 2025 I make random designs</p>
      </div>
    </footer>
  </div>
</template>
