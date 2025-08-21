<template>
  <div class="text-4xl cursor-pointer" @click="newEmoji">
    {{ emoji }}
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emojis = ["😀","🎉","🔥","🚀","🍕","🐱","🌍","⚡"]
const emoji = ref(emojis[0])

function newEmoji() {
  const randomIndex = Math.floor(Math.random() * emojis.length)
  emoji.value = emojis[randomIndex]
}
</script>
