<template>
  <div
    class="flex flex-col items-center justify-items-center float-left bg-blue-300 dark:bg-blue-950 h-screen border-4 border-blue-300 border-r-cyan-400 dark:border-blue-950 dark:border-r-cyan-800 p-3 text-cyan-800 dark:text-cyan-100 gap-y-10 px-10 pt-10"
  >
    <RouterLink
      class="hover:text-cyan-950 dark:hover:text-white hover:scale-120 duration-150 ease-in font-medium"
      to="/"
    >
      Dashboard
    </RouterLink>
    <RouterLink
      class="hover:text-cyan-950 dark:hover:text-white hover:scale-120 duration-150 ease-in font-medium"
      to="/rides"
    >
      Lista</RouterLink
    >
    <RouterLink
      class="hover:text-cyan-950 dark:hover:text-white hover:scale-120 duration-150 ease-in font-medium"
      to="/new"
    >
      Dodaj
    </RouterLink>
    <RouterLink
      class="hover:text-cyan-950 dark:hover:text-white hover:scale-120 duration-150 ease-in font-medium"
      to="/map"
    >
      Mapa</RouterLink
    >
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style></style>
