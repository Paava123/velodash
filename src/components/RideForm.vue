<template>
  <div
    class="flex flex-col bg-blue-400 dark:bg-blue-900 border-3 border-blue-500 dark:border-blue-950 justify-items-center items-center m-auto mt-20 mb-20 p-10 rounded-4xl dark:text-white font-bold italic text-lg"
  >
    <input
      v-model="distance"
      type="number"
      placeholder="distance*"
      class="rounded-xs w-200 border-3 border-blue-500 dark:border-blue-950 rounded-t-xl p-2 focus:p-3 duration-250 ease-in"
    />
    <input
      v-model="time"
      type="number"
      placeholder="time*"
      class="rounded-xs w-200 border-3 border-blue-500 dark:border-blue-950 p-2 focus:border-4 focus:p-3 duration-250 ease-in"
    />

    <input
      v-model="mood"
      type="text"
      placeholder="mood"
      class="rounded-xs w-200 border-3 border-blue-500 dark:border-blue-950 p-2 focus:border-4 focus:p-3 duration-250 ease-in"
    />
    <input
      v-model="notes"
      type="text"
      placeholder="notes"
      class="rounded-xs w-200 border-3 border-blue-500 dark:border-blue-950 p-2 focus:border-4 focus:p-3 duration-250 ease-in"
    />

    <div v-if="loading">Loading button...</div>

    <div v-else-if="error">
      {{ error }}
    </div>

    <button
      v-else-if="data"
      @click="Save"
      class="ps-12 pe-12 mt-5 bg-blue-500 hover:bg-blue-300 duration-250 ease-in dark:hover:bg-blue-800 dark:bg-blue-950 rounded-xl"
    >
      Save
    </button>

    <p class="justify-items-center text-red-800 dark:text-red-400">{{ abc }}</p>
  </div>
</template>

<script setup>
import { useRidesStore } from '@/stores/rides'
import { ref, onMounted } from 'vue'
import { useWeather } from '@/composables/Weather.js'

let { data, error, loading, fetchWeather } = useWeather()
onMounted(() => {
  fetchWeather()
})

let id = ref('')

let Fdate = ref()
let date = ref()
let distance = ref('')
let time = ref('')
let mood = ref('')
let notes = ref('')
let weather = ref('')
let abc = ref('')
const rideStore = useRidesStore()

function Save() {
  if (distance.value === '' || time.value === '') {
    abc.value = '--> Distance and time are required <--'
    return
  } else {
    abc.value = ''
  }
  Fdate.value = new Date()
  date.value =
    Fdate.value.getDate() + '.' + (Fdate.value.getMonth() + 1) + '.' + Fdate.value.getFullYear()

  weather.value =
    'Temperature: ' +
    data.value.temperature_2m +
    ' °C ' +
    ' Precipitation: ' +
    data.value.precipitation +
    ' mm ' +
    ' Wind: ' +
    data.value.wind_speed_10m +
    ' Km/h '

  let object = {
    id: Date.now(),
    date: date.value,
    distanceKm: parseFloat(distance.value),
    durationMin: parseFloat(time.value),
    mood: mood.value || 'good',
    notes: notes.value || 'no notes',
    weather: weather.value || 'sun',
  }
  rideStore.addRide(object)
}
</script>
