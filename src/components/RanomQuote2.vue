<template>
  <div
    class="w-40 h-40 flex items-center justify-center text-white font-bold rounded"
    :style="{ backgroundColor: color }"
    @click="randomizeColor"
  >
    {{ color }}
  </div>
</template>

<script setup>
import { ref } from 'vue'

const color = ref("#3498db")

function randomizeColor() {
  color.value = `#${Math.floor(Math.random() * 16777215).toString(16)}`
}
</script>
