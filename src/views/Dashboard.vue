<template>
  <div v-if="loading">Am loading</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else-if="data" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-4 mt-10">
    <div
      class="flex flex-col items-center p-6 rounded-2xl bg-white border-gray-200 text-slate-900 dark:bg-slate-900 border dark:border-slate-700 shadow-sm dark:text-white w-full md:w-auto"
    >
      <p class="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-6">Weather</p>

      <div class="flex items-center w-full gap-4 py-2">
        <img alt="rain" :src="`/icon/${getRainImage(data.precipitation)}`" class="w-10 h-10" />
        <p class="text-sm text-gray-700 dark:text-gray-300">
          <span class="font-semibold text-cyan-500">Prec:</span>
          {{ data.precipitation }} mm
        </p>
      </div>

      <div class="flex items-center w-full gap-4 py-2">
        <img
          alt="temperature"
          :src="`/icon/${getTempImage(data.temperature_2m)}`"
          class="w-10 h-10"
        />
        <p class="text-sm text-gray-700 dark:text-gray-300">
          <span class="font-semibold text-lime-500">Temp:</span>
          {{ data.temperature_2m }} °C
        </p>
      </div>

      <div class="flex items-center w-full gap-4 py-2">
        <img alt="wind" :src="`/icon/${getWindImage(data.wind_speed_10m)}`" class="w-10 h-10" />
        <p class="text-sm text-gray-700 dark:text-gray-300">
          <span class="font-semibold text-sky-500">Wind:</span>
          {{ data.wind_speed_10m }} km/h
        </p>
      </div>
    </div>

    <div
      class="w-full overflow-x-auto rounded-2xl border bg-white border-gray-200 text-slate-900 dark:border-slate-700 dark:bg-slate-900 shadow-lg"
    >
      <table class="min-w-[600px] w-full border-collapse text-sm">
        <thead
          class="bg-slate-300 border-gray-200 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300 uppercase tracking-wide"
        >
          <tr>
            <th class="px-4 py-4 text-left">Forecast</th>

            <th
              v-for="(value, index) in prog.temperature_2m_max"
              :key="index"
              class="px-4 py-4 text-center"
            >
              {{ WeekDay(index) }}
            </th>
          </tr>
        </thead>

        <tbody class="text-white">
          <tr class="border-t border-slate-700">
            <td
              class="px-4 py-4 font-semibold bg-gray-300 border-gray-200 text-slate-900 dark:border-slate-700 dark:text-gray-300 dark:text-gray-300 dark:bg-slate-800/50"
            >
              Weather
            </td>

            <td v-for="(value, index) in prog.temperature_2m_max" :key="index" class="px-4 py-4">
              <div class="flex justify-center">
                <img
                  alt="temperature"
                  :src="`/icon/${getTempImage(value)}`"
                  class="w-12 h-12 rounded-xl bg-slate-800 p-2"
                />
              </div>
            </td>
          </tr>

          <tr class="border-t border-slate-700 hover:bg-slate-800/40 transition-colors">
            <td
              class="px-4 py-4 font-semibold bg-gray-300 border-gray-200 text-slate-900 dark:border-slate-700 dark:text-gray-300 dark:text-gray-300 dark:bg-slate-800/50"
            >
              Max Temp
            </td>

            <td
              v-for="(value, index) in prog.temperature_2m_max"
              :key="index"
              class="px-4 py-4 text-center text-lime-400 font-semibold"
            >
              {{ value }}°
            </td>
          </tr>

          <tr class="border-t border-slate-700 hover:bg-slate-800/40 transition-colors">
            <td
              class="px-4 py-4 font-semibold bg-gray-300 border-gray-200 text-slate-900 dark:border-slate-700 dark:text-gray-300 dark:text-gray-300 dark:bg-slate-800/50"
            >
              Min Temp
            </td>

            <td
              v-for="(value, index) in prog.temperature_2m_min"
              :key="index"
              class="px-4 py-4 text-center text-sky-400 font-semibold"
            >
              {{ value }}°
            </td>
          </tr>

          <tr class="border-t border-slate-700 hover:bg-slate-800/40 transition-colors">
            <td
              class="px-4 py-4 font-semibold bg-gray-300 border-gray-200 text-slate-900 dark:border-slate-700 dark:text-gray-300 dark:text-gray-300 dark:bg-slate-800/50"
            >
              Rain
            </td>

            <td
              v-for="(value, index) in prog.precipitation_sum"
              :key="index"
              class="px-4 py-4 text-center text-cyan-400 font-semibold"
            >
              {{ value }} mm
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <PolarArea class="w-full" :data="MoodChartData" />
    </div>

    <div class="md:col-span-2 xl:col-span-3 w-full">
      <Bar :data="KmPerDayChartData" />
    </div>
  </div>

  <div v-else>Mistake</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRidesStore } from '@/stores/rides'
const rideStore = useRidesStore()
import { useWeather } from '@/composables/Weather.js'
import { onMounted } from 'vue'
import { kmPerDay } from '@/data/ridesFromLast7Days'
let ridesFrom7days = kmPerDay(rideStore.rides)
import { Bar, PolarArea } from 'vue-chartjs'
import Chart from 'chart.js/auto'
import { AllMoods } from '@/data/AllMoods'
let stats = AllMoods(rideStore.rides)

let { data, prog, error, loading, fetchWeather } = useWeather()
onMounted(() => {
  fetchWeather()
})

function getRainImage(what) {
  if (what > 50) {
    return 'rain.png'
  } else if (what > 25) {
    return 'cloud.png'
  } else {
    return 'sun.png'
  }
}

function getTempImage(what) {
  if (what > 20) {
    return 'temperature_hot.png'
  } else if (what > 10) {
    return 'temperature_medium.png'
  } else {
    return 'temperature_cold.png'
  }
}

function getWindImage(what) {
  if (what > 25) {
    return 'strong_wind.png'
  } else if (what > 10) {
    return 'wind.png'
  } else {
    return 'weak_wind.png'
  }
}

const KmPerDayChartData = computed(() => ({
  labels: Object.keys(ridesFrom7days),
  datasets: [
    {
      label: 'Km per day',
      data: Object.values(ridesFrom7days),
    },
  ],
}))

const MoodChartData = computed(() => ({
  labels: ['good', 'ok', 'bad'],
  datasets: [
    {
      label: 'mood',
      data: [stats.good, stats.ok, stats.bad],
    },
  ],
}))

function WeekDay(number) {
  let day = (new Date().getDay() + number - 1) % 7
  switch (day) {
    case 0:
      return 'Monday'
    case 1:
      return 'Tuesday'
    case 2:
      return 'Wednesday'
    case 3:
      return 'Thursday'
    case 4:
      return 'Friday'
    case 5:
      return 'Saturday'
    case 6:
      return 'Sunday'
    default:
      return day
  }
}
</script>
