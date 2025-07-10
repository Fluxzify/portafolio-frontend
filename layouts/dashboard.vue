<template>
  <div class="flex flex-col min-h-screen font-sans">
    <!-- HEADER ADMIN -->
    <header class="bg-[#fec6dd] text-black shadow-md">
      <nav class="container mx-auto px-4 py-3 flex justify-between items-center">
        <!-- Título o logo -->
        <NuxtLink to="/dashboard" class="font-black text-lg hover:underline">
          Inicio
        </NuxtLink>

        <!-- Enlaces de gestión -->
        <div class="flex space-x-4">
          <NuxtLink to="/dashboard/create-design" class="hover:underline">
            Crear diseño
          </NuxtLink>
          <NuxtLink to="/dashboard/create-category" class="hover:underline">
            Crear categoría
          </NuxtLink>
           <NuxtLink to="/" class="hover:underline">
            Volver a Pagina Principal
          </NuxtLink>
        </div>
      </nav>
    </header>

    <!-- CONTENIDO -->
    <main class="flex-grow container mx-auto px-4 py-8">
      <NuxtPage />
    </main>
  </div>
</template>
