<script setup>
import { ref, computed, onMounted } from 'vue'
import { getCategoriesWithPosts, getImageUrl } from '@/services/postsService.js'

const apiBase = useRuntimeConfig().public.API_BASE_URL
const uploadsBaseUrl = `${apiBase}/api/uploads`

const categoriasConPublicaciones = ref([])
const categoriaSeleccionada = ref('')
const previewImage = ref(null)

const publicacionesFiltradas = computed(() => {
  if (!categoriaSeleccionada.value) return []
  const cat = categoriasConPublicaciones.value.find(c => c.nombre === categoriaSeleccionada.value)
  return cat ? cat.publicaciones : []
})

async function cargarDatos() {
  categoriasConPublicaciones.value = await getCategoriesWithPosts(apiBase)
}

function openPreview(url) { previewImage.value = url }
function closePreview() { previewImage.value = null }

onMounted(() => cargarDatos())
</script>

<template>
  <div class="max-w-5xl mx-auto p-6 space-y-6">
    <select v-model="categoriaSeleccionada" class="border p-2 rounded">
      <option value="">Todas las categorías</option>
      <option v-for="c in categoriasConPublicaciones" :key="c.id" :value="c.nombre">{{ c.nombre }}</option>
    </select>

    <div v-for="categoria in categoriasConPublicaciones" :key="categoria.id">
      <h2 class="text-2xl font-bold text-pink-600">{{ categoria.nombre }}</h2>

      <div class="grid grid-cols-3 gap-4 mt-2">
        <div v-for="pub in categoria.publicaciones" :key="pub.id" class="border p-2 rounded text-center">
          <img 
            :src="pub.foto.url" 
            alt="Foto publicación" 
            class="w-full h-40 object-cover rounded cursor-pointer" 
            @click="openPreview(pub.foto.url)"
          />
          <p class="mt-2">{{ pub.titulo }}</p>
        </div>
      </div>
    </div>

    <div v-if="previewImage" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <img :src="previewImage" class="max-h-[80vh] rounded shadow-lg" />
      <button class="absolute top-4 right-4 text-white text-2xl" @click="closePreview">&times;</button>
    </div>
  </div>
</template>
