<template>
  <div class="max-w-3xl mx-auto space-y-6">
    <!-- MENSAJE -->
  

    <!-- FORMULARIO -->
    <form @submit.prevent="submitPublicacion" class="bg-white shadow-md rounded p-6 space-y-4 border border-pink-200" enctype="multipart/form-data">
      <h2 class="text-xl font-bold text-pink-600">{{ form.id ? 'Editar Publicación' : 'Crear Publicación' }}</h2>

      <div>
        <label class="block font-semibold mb-1">Título</label>
        <input v-model="form.titulo" type="text" class="w-full border rounded p-2" required />
      </div>

      <div>
        <label class="block font-semibold mb-1">Categoría</label>
        <select v-model="form.categoriaId" required class="w-full border rounded p-2">
          <option value="" disabled>Seleccione una categoría</option>
          <option v-for="cat in categorias" :key="cat.id" :value="cat.id">{{ cat.nombre }}</option>
        </select>
      </div>

      <div>
  <label class="block font-semibold mb-1">Foto (obligatoria)</label>

  <!-- Input oculto -->
  <input
    ref="fileInput"
    type="file"
    @change="handleFileChange"
    accept="image/*"
    :required="!form.id"
    class="hidden"
  />

  <!-- Botón que activa el input -->
  <button
    type="button"
    @click="fileInput.click()"
    class="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
  >
    Seleccionar imagen
  </button>

  <!-- Nombre del archivo seleccionado -->
  <p v-if="form.fotoFile" class="mt-2 text-sm text-gray-700">{{ form.fotoFile.name }}</p>

  <!-- Preview -->
  <div v-if="previewUrl" class="mt-2">
    <img :src="previewUrl" alt="Preview" class="max-w-xs rounded border" />
  </div>
</div>
      <button type="submit" class="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded">
        {{ form.id ? 'Actualizar' : 'Crear' }}
      </button>
    </form>

      <div v-if="mensaje" :class="[
      'p-3 rounded text-center',
      tipoMensaje === 'exito' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'
    ]">
      {{ mensaje }}
    </div>
    <!-- LISTADO -->
    <div class="bg-white shadow-md rounded p-6 border border-pink-200">
      <h2 class="text-xl font-bold text-pink-600 mb-4">Publicaciones registradas</h2>

      <table class="w-full table-auto border-collapse">
        <thead>
          <tr class="bg-pink-100">
            <th class="px-4 py-2 border">ID</th>
            <th class="px-4 py-2 border">Título</th>
            <th class="px-4 py-2 border">Categoría</th>
            <th class="px-4 py-2 border">Foto</th>
            <th class="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pub in publicaciones" :key="pub.id" class="text-center">
            <td class="border px-4 py-2">{{ pub.id }}</td>
            <td class="border px-4 py-2">{{ pub.titulo }}</td>
            <td class="border px-4 py-2">{{ pub.categoria.nombre }}</td>
            <td class="border px-4 py-2">
              <img :src="`${apiBase}${pub.foto.url}`" alt="Foto publicación" class="w-20 h-20 object-cover mx-auto rounded" />
            </td>
            <td class="border px-4 py-2 space-x-2">
              <button @click="editar(pub)" class="bg-yellow-400 hover:bg-yellow-500 px-2 py-1 rounded text-white">Editar</button>
              <button @click="eliminar(pub.id)" class="bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-white">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const fileInput = ref(null)

const apiBase = useRuntimeConfig().public.API_BASE_URL
const API_CATEGORIAS = `${apiBase}/api/categorias`
const API_UPLOADS = `${apiBase}/api/uploads`
const API_PUBLICACIONES = `${apiBase}/api/publicaciones`

const form = ref({
  id: null,
  titulo: '',
  categoriaId: '',
  fotoFile: null,
  fotoId: null,
})

const categorias = ref([])
const publicaciones = ref([])
const previewUrl = ref(null)

const mensaje = ref('')
const tipoMensaje = ref('') // 'exito' o 'error'

const mostrarMensaje = (msg, tipo = 'exito') => {
  mensaje.value = msg
  tipoMensaje.value = tipo
  setTimeout(() => {
    mensaje.value = ''
    tipoMensaje.value = ''
  }, 3000)
}

const fetchCategorias = async () => {
  try {
    const res = await fetch(API_CATEGORIAS, { credentials: 'include' })
    if (!res.ok) throw new Error('Error al obtener categorías')
    categorias.value = await res.json()
  } catch (error) {
    mostrarMensaje(error.message, 'error')
  }
}

const fetchPublicaciones = async () => {
  try {
    const res = await fetch(API_PUBLICACIONES, { credentials: 'include' })
    if (!res.ok) throw new Error('Error al obtener publicaciones')
    publicaciones.value = await res.json()
  } catch (error) {
    mostrarMensaje(error.message, 'error')
  }
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  form.value.fotoFile = file
  previewUrl.value = file ? URL.createObjectURL(file) : null
}

const resetForm = () => {
  form.value = {
    id: null,
    titulo: '',
    categoriaId: '',
    fotoFile: null,
    fotoId: null,
  }
  previewUrl.value = null
}

const submitPublicacion = async () => {
  if (!form.value.categoriaId) {
    mostrarMensaje('Debe seleccionar una categoría', 'error')
    return
  }

  if (!form.value.id && !form.value.fotoFile) {
    mostrarMensaje('Debe subir una foto', 'error')
    return
  }

  try {
    let fotoId = form.value.fotoId

    if (form.value.fotoFile) {
      const formData = new FormData()
      formData.append('file', form.value.fotoFile)
      formData.append('titulo', form.value.titulo)

      const resUpload = await fetch(API_UPLOADS, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })

      const uploadData = await resUpload.json()

      if (!resUpload.ok) throw new Error(uploadData.message || 'Error al subir la foto')

      fotoId = uploadData.id
      previewUrl.value = uploadData.url
    }

    const payload = {
      titulo: form.value.titulo,
      categoriaId: form.value.categoriaId,
      fotoId,
      usuarioId: 1 // ⚠️ Reemplaza esto por el ID obtenido del JWT
    }

    const method = form.value.id ? 'PUT' : 'POST'
    const url = form.value.id ? `${API_PUBLICACIONES}/${form.value.id}` : API_PUBLICACIONES

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    })

    const data = await res.json()

    if (!res.ok) throw new Error(data.message || 'Error al guardar publicación')

    mostrarMensaje(data.message || 'Publicación guardada correctamente')
    await fetchPublicaciones()
    resetForm()
  } catch (error) {
    mostrarMensaje(error.message, 'error')
  }
}

const editar = (pub) => {
  form.value.id = pub.id
  form.value.titulo = pub.titulo
  form.value.categoriaId = pub.categoria.id
  form.value.fotoId = pub.foto.id
  form.value.fotoFile = null
  previewUrl.value = pub.foto.url
}

const eliminar = async (id) => {
  if (!confirm('¿Eliminar esta publicación?')) return

  try {
    const res = await fetch(`${API_PUBLICACIONES}/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })

    const data = await res.json()

    if (!res.ok) throw new Error(data.message || 'Error al eliminar publicación')

    mostrarMensaje(data.message || 'Publicación eliminada correctamente')
    await fetchPublicaciones()
  } catch (error) {
    mostrarMensaje(error.message, 'error')
  }
}

onMounted(() => {
  fetchCategorias()
  fetchPublicaciones()
})

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})
</script>
