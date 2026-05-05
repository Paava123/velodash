<script setup>
import { useTheme } from '@/composables/Theme.js'
const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <div
    class="flex bg-blue-300 dark:bg-blue-950 border-4 border-blue-300 dark:border-blue-950 border-b-cyan-400 dark:border-b-cyan-800 -mx-1"
  >
    <button
      @click="toggleTheme()"
      class="text-6xl p-6 pb-10 hover:scale-110 duration-250 not-italic"
    >
      {{ isDark ? '🌙' : '☀️' }}
    </button>

    <div class="text-4xl italic font-medium m-auto hover:scale-110 duration-250 pb-3">VeloDash</div>
  </div>
</template>
