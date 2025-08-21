<template>
  <div class="p-4 border rounded shadow-md bg-gray-100">
    <p class="text-lg italic">"{{ currentQuote }}"</p>
    <button @click="newQuote" class="mt-2 px-3 py-1 bg-blue-600 text-white rounded">
      New Quote
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const quotes = [
  "Simplicity is the soul of efficiency.",
  "Stay hungry, stay foolish.",
  "Code is like humor. When you have to explain it, it’s bad.",
  "First, solve the problem. Then, write the code."
]

const currentQuote = ref(quotes[0])

function newQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length)
  currentQuote.value = quotes[randomIndex]
}
</script>
