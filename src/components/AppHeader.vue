<script setup>
import { useTheme } from '@/composables/Theme.js'
const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <div class="flex bg-blue-300 dark:bg-slate-950 min-w-screen -mx-10">
    <button
      @click="toggleTheme()"
      class="text-6xl p-6 pb-10 pl-15 hover:scale-110 duration-250 not-italic"
    >
      {{ isDark ? '🌙' : '☀️' }}
    </button>

    <div class="text-4xl italic font-medium m-auto hover:scale-110 duration-250 pb-3 pr-10">
      VeloDash
    </div>
  </div>
</template>
