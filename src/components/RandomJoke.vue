<template>
  <div class="p-4 border rounded bg-yellow-100">
    <p v-if="joke">{{ joke }}</p>
    <button @click="getJoke" class="mt-2 px-3 py-1 bg-purple-600 text-white rounded">
      New Joke
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const joke = ref("")

async function getJoke() {
  const res = await fetch("https://v2.jokeapi.dev/joke/Any?type=single")
  const data = await res.json()
  joke.value = data.joke || "No joke today 😅"
}

onMounted(getJoke)
</script>
