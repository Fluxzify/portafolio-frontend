<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import CategorySelect from '@/components/CategorySelect.vue'
import PostsGrid from '@/components/PostsGrid.vue'
import ImageModal from '@/components/ImageModal.vue'
import { getCategoriesWithPosts, getImageUrl } from '@/services/postsService.js'

const apiBaseUrl = useRuntimeConfig().public.API_BASE_URL
const uploadsBaseUrl = `${apiBaseUrl}/api/uploads`

const categoriasConPublicaciones = ref([])
const categoriaSeleccionada = ref('')
const previewImage = ref(null)

const publicacionesFiltradas = computed(() => {
  if (!categoriaSeleccionada.value) return []
  const categoria = categoriasConPublicaciones.value.find(c => c.nombre === categoriaSeleccionada.value)
  return categoria ? categoria.publicaciones : []
})

async function cargarDatos() {
  categoriasConPublicaciones.value = await getCategoriesWithPosts(apiBaseUrl)
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

onMounted(() => {
  cargarDatos()
  window.addEventListener('keydown', handleKeyDown)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div class="max-w-5xl mx-auto p-6 space-y-6">
    <CategorySelect
      v-model="categoriaSeleccionada"
      :categories="categoriasConPublicaciones"
    />

    <div v-if="!categoriaSeleccionada">
      <div
        v-for="categoria in categoriasConPublicaciones"
        :key="categoria.nombre"
      >
        <h2 class="text-3xl font-bold mb-4 text-pink-600">{{ categoria.nombre }}</h2>
        <PostsGrid
          :posts="categoria.publicaciones"
          :getImageUrl="(url) => getImageUrl(url, uploadsBaseUrl)"
          @preview="openPreview"
        />
      </div>
    </div>

    <div v-else>
      <h2 class="text-3xl font-bold mb-4 text-pink-600">{{ categoriaSeleccionada }}</h2>
      <PostsGrid
        :posts="publicacionesFiltradas"
        :getImageUrl="(url) => getImageUrl(url, uploadsBaseUrl)"
        @preview="openPreview"
      />
    </div>

    <ImageModal
      :image="previewImage"
      @close="closePreview"
    />
  </div>
</template>
