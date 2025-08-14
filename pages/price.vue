<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ImageModal from '@/components/ImageModal.vue'
import { getImageUrl, getCategoriesWithFirstPost } from '@/services/postsService.js'

const apiBase = useRuntimeConfig().public.API_BASE_URL
const uploadsBaseUrl = `${apiBase}/api/uploads`

const categoriasConEjemplo = ref([])
const previewImage = ref(null)

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
  categoriasConEjemplo.value = await getCategoriesWithFirstPost(apiBase)
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
        @click="openPreview(getImageUrl(categoria.publicacion.foto?.url, uploadsBaseUrl))"
      >
        <img
          :src="getImageUrl(categoria.publicacion.foto?.url, uploadsBaseUrl)"
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
