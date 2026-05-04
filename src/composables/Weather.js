import { ref } from 'vue'

export function useWeather() {
  let data = ref(null)
  let prog = ref(null)
  let loading = ref(false)
  let error = ref(null)

  const fetchWeather = async () => {
    loading.value = true
    error.value = null

    try {
      let resp = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=53.43&longitude=14.55&current=temperature_2m,wind_speed_10m,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe/Warsaw',
      )

      if (!resp.ok) {
        throw new Error('error here <--')
      }

      let json = await resp.json()

      data.value = json.current
      prog.value = json.daily
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    prog,
    loading,
    error,
    fetchWeather,
  }
}
