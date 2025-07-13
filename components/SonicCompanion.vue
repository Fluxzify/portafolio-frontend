<template>
  <img
    :src="isRunning ? '/images/misc/Sonic Companion/sonic-run anim.gif' : '/images/misc/Sonic Companion/sonic-idle anim.gif'"
    alt="Sonic"
    class="pointer-events-none transition-transform duration-100 ease-linear"
    :style="{
      transformOrigin: 'center center',
      transform: `translateX(${sonicX}px) scaleX(${facingRight ? 1 : -1})`
    }"
    width="64"
    height="64"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const sonicX = ref(0)
const isRunning = ref(false)
const facingRight = ref(true)
let lastMouseX = 0
let timeoutId: number | undefined

function handleMouseMove(e: MouseEvent) {
  const deltaX = e.clientX - lastMouseX
  if (Math.abs(deltaX) > 2) {
    isRunning.value = true
    sonicX.value = e.clientX - 32 // Ajusta según el contenedor
    facingRight.value = deltaX >= 0
    lastMouseX = e.clientX

    clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      isRunning.value = false
    }, 300)
  }
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  clearTimeout(timeoutId)
})
</script>
