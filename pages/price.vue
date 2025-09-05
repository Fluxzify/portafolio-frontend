<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ImageModal from '@/components/ImageModal.vue'
import { getCategoriesWithFirstPost } from '@/services/postsService.js'

const apiBase = useRuntimeConfig().public.API_BASE_URL
const uploadsBaseUrl = `${apiBase}/api/uploads`

const categoriasConEjemplo = ref([])
const previewImage = ref(null)

// Función para limpiar y codificar correctamente cualquier URL
const obtenerUrlFoto = (url) => {
  if (!url) return ''

  try {
    if (url.startsWith('http')) {
      // Para URLs absolutas (Supabase)
      const u = new URL(url)
      u.pathname = u.pathname
        .split('/')
        .map(seg => encodeURIComponent(decodeURIComponent(seg)))
        .join('/')
      return u.toString()
    }
    // Para paths relativos del backend
    const cleanPath = url.replace(/^\/?uploads\/?/, '')
    return `${uploadsBaseUrl}/${encodeURIComponent(cleanPath)}`
  } catch (err) {
    return url // si algo falla, devolver tal cual
  }
}

function openPreview(url) {
  previewImage.value = url
}

function closePreview() {
  previewImage.value = null
}

function handleKeyDown(e) {
  if (e.key === 'Escape') closePreview()
}

onMounted(async () => {
  const categorias = await getCategoriesWithFirstPost(apiBase)

  // Reemplazamos la URL de cada publicación ya al cargar
  categoriasConEjemplo.value = categorias.map(cat => {
    if (cat.publicacion?.foto) {
      cat.publicacion.foto.url = obtenerUrlFoto(cat.publicacion.foto.url)
    }
    return cat
  })

  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div class="max-w-5xl mx-auto p-4 space-y-8">
    <h1 class="text-4xl font-bold text-center titulo-categoria-y2k mb-6">
      Commission Prices ✨
    </h1>

    <div
      v-for="categoria in categoriasConEjemplo"
      :key="categoria.nombre"
      class="max-w-[200px] mx-auto"
    >
      <div class="flex justify-between items-center mb-2 px-2">
        <h2 class="titulo-categoria-y2k text-lg">{{ categoria.nombre }}</h2>
        <span class="text-[#a348dc] font-bold text-base">
          ${{ categoria.precio.toFixed(2) }}
        </span>
      </div>

      <div
        v-if="categoria.publicacion"
        class="aspect-square overflow-hidden cursor-pointer rounded-md shadow-md"
        @click="openPreview(categoria.publicacion.foto?.url)"
      >
        <img
          :src="categoria.publicacion.foto?.url"
          :alt="categoria.publicacion.titulo"
          class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>

    <ImageModal
      :image="previewImage"
      @close="closePreview"
    />
  </div>
</template>
