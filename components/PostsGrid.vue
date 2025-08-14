<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    <div
      v-for="post in posts"
      :key="post.id"
      class="card-y2k"
    >
      <img
        v-if="post.foto?.url"
        :src="getImageUrl(post.foto.url)"
        :alt="post.titulo"
        class="w-full h-48 object-cover cursor-pointer"
        @click="$emit('preview', getImageUrl(post.foto.url))"
      />
      <div class="p-4">
        <h3 class="titulo-publicacion-y2k mb-2">{{ post.titulo }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  posts: Array,
  getImageUrl: Function
})
defineEmits(['preview'])
</script>
