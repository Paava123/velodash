<template>
  <div class="float-left bg-cyan-400 flex w-20 h-screen flex-col">
    <RouterLink to="/"> Dashboard </RouterLink>
    <RouterLink to="/rides"> Lista</RouterLink>
    <RouterLink to="/new"> Dodaj </RouterLink>
    <RouterLink to="/map"> Mapa</RouterLink>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style></style>
