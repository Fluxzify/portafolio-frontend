<template>
  <div class="max-w-3xl mx-auto space-y-6">
    <!-- FORMULARIO -->
    <form @submit.prevent="submitCategoria" class="bg-white shadow-md rounded p-6 space-y-4 border border-pink-200">
      <h2 class="text-xl font-bold text-pink-600">Crear o Editar Categoría</h2>

      <div>
        <label class="block font-semibold mb-1">Nombre</label>
        <input
          v-model="form.nombre"
          type="text"
          class="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label class="block font-semibold mb-1">Precio</label>
        <input
          v-model.number="form.precio"
          type="number"
          step="0.01"
          class="w-full border rounded p-2"
          required
        />
      </div>

      <button type="submit" class="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded">
        {{ form.id ? 'Actualizar' : 'Crear' }}
      </button>
    </form>

    <!-- LISTADO -->
    <div class="bg-white shadow-md rounded p-6 border border-pink-200">
      <h2 class="text-xl font-bold text-pink-600 mb-4">Categorías registradas</h2>

      <table class="w-full table-auto border-collapse">
        <thead>
          <tr class="bg-pink-100">
            <th class="px-4 py-2 border">ID</th>
            <th class="px-4 py-2 border">Nombre</th>
            <th class="px-4 py-2 border">Precio</th>
            <th class="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cat in categorias" :key="cat.id" class="text-center">
            <td class="border px-4 py-2">{{ cat.id }}</td>
            <td class="border px-4 py-2">{{ cat.nombre }}</td>
            <td class="border px-4 py-2">${{ cat.precio.toFixed(2) }}</td>
            <td class="border px-4 py-2 space-x-2">
              <button @click="editar(cat)" class="bg-yellow-400 hover:bg-yellow-500 px-2 py-1 rounded text-white">Editar</button>
              <button @click="eliminar(cat.id)" class="bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-white">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Modelo del formulario
const form = ref({
  id: null,
  nombre: '',
  precio: null,
})

// Leer token JWT desde cookies
const token = useCookie('token') // ✅ token guardado por login

// Datos y configuración
const categorias = ref([])
const apiBase = useRuntimeConfig().public.API_BASE_URL
const API_URL = `${apiBase}/api/categorias`

// Obtener categorías (GET)
const fetchCategorias = async () => {
  try {
    const res = await fetch(API_URL, {
      credentials: 'include', // 🔥 ENVÍA LA COOKIE HttpOnly
    })
    if (!res.ok) throw new Error('Error al obtener categorías')
    categorias.value = await res.json()
  } catch (err) {
    console.error('Error al obtener categorías', err)
  }
}

const submitCategoria = async () => {
  const method = form.value.id ? 'PUT' : 'POST'
  const url = form.value.id ? `${API_URL}/${form.value.id}` : API_URL

  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // 🔥 Importante para enviar la cookie HttpOnly
      body: JSON.stringify(form.value),
    })

    if (!res.ok) throw new Error('Error al guardar categoría')

    await fetchCategorias()
    resetForm()
  } catch (err) {
    console.error(err)
  }
}

// Editar
const editar = (cat) => {
  form.value = { ...cat }
}

// Eliminar (DELETE)
const eliminar = async (id) => {
  if (!confirm('¿Eliminar esta categoría?')) return

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      credentials: 'include', // 🔥 Envía la cookie HttpOnly
    })
    if (!res.ok) throw new Error('Error al eliminar categoría')
    await fetchCategorias()
  } catch (err) {
    console.error('Error al eliminar categoría', err)
  }
}

// Reset formulario
const resetForm = () => {
  form.value = {
    id: null,
    nombre: '',
    precio: null,
  }
}
definePageMeta({
  middleware: 'auth',
  layout: 'dashboard'
})
// Cargar categorías al montar
onMounted(fetchCategorias)
</script>

