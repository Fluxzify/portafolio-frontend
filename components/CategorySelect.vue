<template>
  <div>
    <label for="categoryFilter" class="text-[#a348dc] font-semibold text-lg mb-2 block">
      Filter by category:
    </label>
    <select
      id="categoryFilter"
      v-model="localValue"
      class="select-y2k w-full max-w-xs"
    >
      <option value="">All</option>
      <option
        v-for="category in categories"
        :key="category.nombre"
        :value="category.nombre"
        class="text-[#a348dc] font-semibold"
      >
        {{ category.nombre }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  categories: Array,
  modelValue: String
})
const emit = defineEmits(['update:modelValue'])

// Usamos un computed para "simular" v-model
const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>
