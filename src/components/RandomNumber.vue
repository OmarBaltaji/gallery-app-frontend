<template>
  <div class="p-4 border rounded">
    <p>🎲 Random number between {{ min }} and {{ max }}: <b>{{ number }}</b></p>
    <button @click="generate" class="px-2 py-1 bg-green-500 text-white rounded">Roll</button>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  min: { type: Number, default: 1 },
  max: { type: Number, default: 100 }
})

const number = ref(0)

function generate() {
  number.value = Math.floor(Math.random() * (props.max - props.min + 1)) + props.min
}

generate()
</script>
