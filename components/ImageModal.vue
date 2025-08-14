<template>
  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="image"
      class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
      @click.self="$emit('close')"
    >
      <button
        class="absolute top-4 right-4 text-white text-3xl font-bold z-60"
        @click="$emit('close')"
        aria-label="Close preview"
      >
        &times;
      </button>

      <div class="max-w-4xl max-h-[90vh]">
        <img :src="image" alt="Full size" class="max-w-full max-h-[90vh] rounded shadow-lg" />
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  image: String
})
defineEmits(['close'])
</script>
