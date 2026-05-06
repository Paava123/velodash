<template>
  <div v-if="loading">Am loading</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else-if="data" class="grid grid-cols-3 justify-items-center items-center mt-10 gap-y-10">
    <div
      class="justify-items-center items-center flex flex-col border-3 rounded-xl p-10 bg-blue-400 dark:bg-blue-900 border-cyan-400 dark:border-cyan-800"
    >
      <p class="text-lg mb-5">Pogoda today</p>
      <div class="border-3 rounded-xl border-black mb-2">
        <div class="p-2 flex">
          <img alt="rain" :src="`/icon/${getRainImage(data.precipitation)}`" />

          <p class="pl-10">Prec: {{ data.precipitation }} mm</p>
        </div>

        <div class="p-2 flex">
          <img alt="temperature" :src="`/icon/${getTempImage(data.temperature_2m)}`" />

          <p class="pl-10">Temp: {{ data.temperature_2m }} °C</p>
        </div>

        <div class="p-2 flex">
          <div>
            <img :src="`/icon/${getWindImage(data.wind_speed_10m)}`" alt="wind" />
          </div>

          <p class="pl-10">Wind: {{ data.wind_speed_10m }} Km/h</p>
        </div>
      </div>
    </div>

    <div
      class="justify-items-center items-center flex flex-col border-3 rounded-xl p-10 bg-blue-400 mt-5 dark:bg-blue-900 border-cyan-400 dark:border-cyan-800"
    >
      <p class="text-lg mb-5">PROGNOZ POGODI</p>
      <table class="border-5 border-cyan-400 dark:border-cyan-800">
        <tr class="">
          <th>Temp.max image :</th>
          <th v-for="value in prog.temperature_2m_max">
            <img
              alt="temperature"
              :src="`/icon/${getTempImage(value)}`"
              class="border-2 border-cyan-400 dark:border-cyan-800"
            />
          </th>
        </tr>

        <tr class="border-2 border-cyan-400 dark:border-cyan-800">
          <th>Temp max:</th>
          <th
            v-for="value in prog.temperature_2m_max"
            class="border-2 border-cyan-400 dark:border-cyan-800"
          >
            {{ value }}
          </th>
        </tr>

        <tr class="border-2 border-cyan-400 dark:border-cyan-800">
          <th>Temp min:</th>
          <th
            v-for="value in prog.temperature_2m_min"
            class="border-2 border-cyan-400 dark:border-cyan-800"
          >
            {{ value }}
          </th>
        </tr>

        <tr>
          <th>Prec:</th>
          <th
            v-for="value in prog.precipitation_sum"
            class="border-2 border-cyan-400 dark:border-cyan-800"
          >
            {{ value }}
          </th>
        </tr>
      </table>
    </div>

    <div>
      <PolarArea :data="MoodChartData" />
    </div>

    <div class="col-span-3">
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
</script>
