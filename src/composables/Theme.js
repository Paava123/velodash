import { ref, watchEffect } from 'vue'

const isDark = ref(localStorage.getItem('theme') === 'dark')

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  watchEffect(() => {
    const theme = isDark.value ? 'dark' : 'light'

    document.documentElement.classList.toggle('dark', isDark.value)
    localStorage.setItem('theme', theme)
  })

  return { isDark, toggleTheme }
}
