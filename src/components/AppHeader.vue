<script setup>
import { useTheme } from '@/composables/Theme.js'
const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <div class="bg-slate-300 dark:bg-slate-800 h-10 flex flex-row justify-items-center items-center">
    <button @click="toggleTheme()" class="bg-blue-300 dark:bg-blue-800 p-4">
      {{ isDark ? '🌙' : '☀️' }}
    </button>
    <h1>VElodash</h1>
  </div>
</template>
