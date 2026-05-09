<template>
  <div
    class="flex min-h-screen flex-col items-center justify-items-center float-left bg-white dark:bg-slate-900 dark:text-cyan-100 gap-y-10 px-10 pt-10 text-gray-500 dark:text-gray-400"
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
