<template>
  <div class="max-w-5xl mx-auto p-4 space-y-8">
    <!-- Título principal -->
    <h1 class="text-4xl font-bold text-center titulo-categoria-y2k mb-6">
      Commission Prices ✨
    </h1>

    <!-- Tarjetas por categoría -->
    <div
      v-for="categoria in categoriasConEjemplo"
      :key="categoria.nombre"
      class="max-w-[200px] mx-auto"
    >
      <!-- Título y precio fuera de la tarjeta, centrados -->
      <div class="flex justify-between items-center mb-2 px-2">
  <h2 class="titulo-categoria-y2k text-lg">
    {{ categoria.nombre }}
  </h2>
  <span class="text-[#a348dc] font-bold text-base">${{ categoria.precio.toFixed(2) }}</span>
</div>
      <!-- Imagen cuadrada, ocupa toda la tarjeta -->
      <div
        v-if="categoria.publicacion"
        class="aspect-square overflow-hidden cursor-pointer rounded-md shadow-md"
        @click="openPreview(urlFoto(categoria.publicacion.foto?.url))"
      >
        <img
          :src="urlFoto(categoria.publicacion.foto?.url)"
          :alt="categoria.publicacion.titulo"
          class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>

    <!-- Modal preview -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="previewImage"
        class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
        @click.self="closePreview"
      >
        <button
          class="absolute top-4 right-4 text-white text-3xl font-bold z-60"
          @click="closePreview"
          aria-label="Cerrar preview"
        >
          &times;
        </button>

        <div class="max-w-4xl max-h-[90vh]">
          <img
            :src="previewImage"
            alt="Preview"
            class="max-w-full max-h-[90vh] rounded shadow-lg"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const apiBase = useRuntimeConfig().public.API_BASE_URL
const API_CATEGORIAS = `${apiBase}/api/categorias`
const API_PUBLICACIONES = `${apiBase}/api/publicaciones`
const API_UPLOADS = `${apiBase}/api/uploads`

const categoriasConEjemplo = ref([])
const previewImage = ref(null)

function urlFoto(url) {
  if (!url) return ''
  return API_UPLOADS + '/' + url.replace(/^\/?uploads\/?/, '')
}

const fetchCategoriasYPrimerDiseno = async () => {
  try {
    const res = await fetch(API_CATEGORIAS, { credentials: 'include' })
    if (!res.ok) throw new Error('Error cargando categorías')
    const categorias = await res.json()

    const conEjemplo = await Promise.all(
      categorias.map(async cat => {
        try {
          const resPubs = await fetch(`${API_PUBLICACIONES}/categoria/${encodeURIComponent(cat.nombre)}`, { credentials: 'include' })
          if (!resPubs.ok) return { ...cat, publicacion: null }
          const publicaciones = await resPubs.json()
          return { ...cat, publicacion: publicaciones[0] || null }
        } catch (err) {
          console.warn('Error cargando publicaciones:', err)
          return { ...cat, publicacion: null }
        }
      })
    )

    categoriasConEjemplo.value = conEjemplo.filter(cat => cat.publicacion)
  } catch (error) {
    console.error('Error:', error)
  }
}

function openPreview(url) {
  previewImage.value = url
}

function closePreview() {
  previewImage.value = null
}

function onKeyDown(e) {
  if (e.key === 'Escape') closePreview()
}

onMounted(() => {
  fetchCategoriasYPrimerDiseno()
  window.addEventListener('keydown', onKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown)
})
</script>
