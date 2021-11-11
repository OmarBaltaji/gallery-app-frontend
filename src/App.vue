<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body {
    padding: 0;
    margin: 0;
  }

  .screen-center-items {
    height: 100vh;
    display: grid;
    place-items: center;
    /* align-items: center; */
  }
</style>
