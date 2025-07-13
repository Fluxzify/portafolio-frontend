<template>
  <NuxtLayout />
</template>
<script setup>
import { useRoute } from 'vue-router'
import { watchEffect, onMounted } from 'vue'

const route = useRoute()

onMounted(() => {
  watchEffect(() => {
    if (route.path !== '/') {
      document.body.classList.add('scrollbar-stable')
    } else {
      document.body.classList.remove('scrollbar-stable')
    }
  })
})
</script>
