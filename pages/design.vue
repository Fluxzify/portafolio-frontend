<template>
    <div class="max-w-5xl mx-auto p-6 space-y-6">

        <!-- Dropdown de categorías -->
        <div>
            <label for="categoriaFiltro" class="font-semibold text-lg mb-2 block">Filter by category:</label>
            <select id="categoriaFiltro" v-model="categoriaSeleccionada" class="select-y2k w-full max-w-xs">


                <option value="">All</option>
         <option
  v-for="categoria in categoriasConPublicaciones"
  :key="categoria.nombre"
  :value="categoria.nombre"
  class="text-[#a348dc] font-semibold"
>
  {{ categoria.nombre }}
</option>
            </select>
        </div>

        <!-- Mostrar publicaciones -->
        <div v-if="categoriaSeleccionada === ''">
            <!-- Mostrar todas las categorías con sus publicaciones -->
            <div v-for="categoria in categoriasConPublicaciones" :key="categoria.nombre">
                <h2 class="text-3xl font-bold mb-4 text-pink-600">{{ categoria.nombre }}</h2>

                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div v-for="pub in categoria.publicaciones" :key="pub.id" class="card-y2k">

                        <img v-if="pub.foto?.url" :src="urlFoto(pub.foto.url)" :alt="pub.titulo"
                            class="w-full h-48 object-cover cursor-pointer"
                            @click="openPreview(urlFoto(pub.foto.url))" />
                        <div class="p-4">
                          <h3 class="titulo-publicacion-y2k mb-2">{{ pub.titulo }}</h3>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            <!-- Mostrar solo publicaciones de la categoría seleccionada -->
            <h2 class="text-3xl font-bold mb-4 text-pink-600">{{ categoriaSeleccionada }}</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div v-for="pub in publicacionesFiltradas" :key="pub.id" 
                    class="card-y2k">
                    <img v-if="pub.foto?.url" :src="urlFoto(pub.foto.url)" :alt="pub.titulo"
                        class="w-full h-48 object-cover" />
                    <div class="p-4">
                        <h3 class="titulo-publicacion-y2k mb-2">{{ pub.titulo }}</h3>


                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- Modal Lightbox -->
    <!-- Modal Lightbox con transición -->
    <Transition enter-active-class="transition-opacity duration-300" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition-opacity duration-300" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <div v-if="previewImage"
            class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            @click.self="closePreview">
            <!-- Botón de cerrar en la esquina superior derecha del modal, pero fuera de la imagen -->
            <button class="absolute top-4 right-4 text-white text-3xl font-bold z-60" @click="closePreview"
                aria-label="Cerrar preview">
                &times;
            </button>

            <div class="max-w-4xl max-h-[90vh]">
                <img :src="previewImage" alt="Imagen en grande" class="max-w-full max-h-[90vh] rounded shadow-lg" />
            </div>
        </div>
    </Transition>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'

const apiBase = useRuntimeConfig().public.API_BASE_URL
const API_CATEGORIAS = `${apiBase}/api/categorias`
const API_PUBLICACIONES = `${apiBase}/api/publicaciones`
const API_UPLOADS = `${apiBase}/api/uploads`
const previewImage = ref(null)

const categoriasConPublicaciones = ref([])
const categoriaSeleccionada = ref('')

// Función para obtener URL correcta sin doble /uploads/
function urlFoto(url) {
    if (!url) return ''
    return API_UPLOADS + '/' + url.replace(/^\/?uploads\/?/, '')
}

const fetchCategoriasConPublicaciones = async () => {
    try {
        const resCats = await fetch(API_CATEGORIAS, { credentials: 'include' })
        if (!resCats.ok) throw new Error('Error cargando categorías')
        const categorias = await resCats.json()

        const categoriasConPubs = await Promise.all(
            categorias.map(async (cat) => {
                try {
                    const resPubs = await fetch(`${API_PUBLICACIONES}/categoria/${encodeURIComponent(cat.nombre)}`, { credentials: 'include' })
                    if (!resPubs.ok) {
                        console.warn(`No se pudieron cargar publicaciones para categoría ${cat.nombre}`)
                        return {
                            ...cat,
                            publicaciones: []
                        }
                    }
                    const publicaciones = await resPubs.json()
                    return {
                        ...cat,
                        publicaciones
                    }
                } catch (error) {
                    console.warn(`Error al cargar publicaciones para categoría ${cat.nombre}:`, error)
                    return {
                        ...cat,
                        publicaciones: []
                    }
                }
            })
        )

        categoriasConPublicaciones.value = categoriasConPubs.filter(cat => cat.publicaciones.length > 0)
    } catch (error) {
        console.error(error)
    }
}

onMounted(() => {
    fetchCategoriasConPublicaciones()
})

// Computed para publicaciones de la categoría seleccionada
const publicacionesFiltradas = computed(() => {
    if (!categoriaSeleccionada.value) return []
    const cat = categoriasConPublicaciones.value.find(c => c.nombre === categoriaSeleccionada.value)
    return cat ? cat.publicaciones : []
})
function openPreview(url) {
    previewImage.value = url
}

function closePreview() {
    previewImage.value = null
}

function onKeyDown(event) {
    if (event.key === 'Escape') {
        closePreview()
    }
}

onMounted(() => {
    window.addEventListener('keydown', onKeyDown)
})

onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeyDown)
})
</script>
