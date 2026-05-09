<template>
  <div
    class="flex flex-col bg-blue-50 dark:bg-slate-900 border border-blue-200 dark:border-slate-700 rounded-2xl w-full max-w-3xl mx-auto mt-10 mb-10 p-6 text-slate-900 dark:text-white"
  >
    <div
      id="map"
      class="w-full h-80 rounded-2xl border border-blue-200 dark:border-slate-700 mb-6"
    ></div>

    <input
      v-model="distance"
      type="number"
      disabled
      placeholder="Distance"
      class="w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none"
    />
    <input
      v-model="time"
      type="number"
      placeholder="Time"
      class="w-full mt-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400"
    />
    <div class="mt-6">
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Mood</p>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label
          class="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <input v-model="mood" type="radio" value="good" />
          <span>Good</span>
        </label>
        <label
          class="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <input v-model="mood" type="radio" value="ok" />
          <span>Ok</span>
        </label>

        <label
          class="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <input v-model="mood" type="radio" value="bad" />
          <span>Bad</span>
        </label>
      </div>
    </div>

    <input
      v-model="notes"
      type="text"
      placeholder="Notes"
      class="w-full mt-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm"
    />

    <div class="mt-6">
      <div v-if="loading" class="text-sm text-gray-400">Loading...</div>

      <div v-else-if="error" class="text-sm text-red-500">
        {{ error }}
      </div>

      <button
        v-else-if="data"
        @click="Save"
        class="w-full bg-blue-500 hover:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-all"
      >
        Save Ride
      </button>
    </div>

    <p class="text-sm text-red-500 mt-4">
      {{ abc }}
    </p>
  </div>
</template>

<script setup>
import { useRidesStore } from '@/stores/rides'
import { computed, onMounted, ref, watch } from 'vue'

import L, { latLng, marker } from 'leaflet'

import 'leaflet/dist/leaflet.css'

import { useWeather } from '@/composables/Weather.js'

let { data, error, loading, fetchWeather } = useWeather()
onMounted(() => {
  fetchWeather()
})

let date = ref()
let distance = computed(() => {
  let sum = totalDistance.value / 1000
  sum = sum.toFixed(2)
  return sum
})
let time = ref('')
let mood = ref('')
let notes = ref('')
let weather = ref('')
let abc = ref('')
const rideStore = useRidesStore()
let map = null

function Save() {
  if (totalDistance.value <= 0 || totalDistance.value === '' || time.value <= 0) {
    abc.value = '--> Distance and time are required <--'
    return
  } else {
    abc.value = ''
  }
  date.value = new Date().toISOString().split('T')[0]

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
    points: path.value,
  }
  rideStore.addRide(object)

  notes.value = ''
  path.value = []
  mood.value = ''
  time.value = ''
  markers.value.forEach((m) => map.removeLayer(m))
  markers.value = []
}

// map part

let path = ref([])
let markers = ref([])
let totalDistance = computed(() => {
  let points = path.value.map((p) => p.cords)
  let sum = 0
  for (let i = 0; i + 1 < points.length; i++) {
    sum += points[i].distanceTo(points[i + 1])
  }

  return sum
})

onMounted(() => {
  map = L.map('map').setView([53.43074604526472, 14.555119556621193], 20)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)

  let corda = path.value.map((p) => p.cords)
  let poliliny = L.polyline(corda).addTo(map)
  watch(
    path,
    (newPath) => {
      let cord = newPath.map((p) => p.cords)
      poliliny.setLatLngs(cord)
    },
    { deep: true },
  )

  let icon1 = L.icon({
    iconUrl: '/icon/icon-red.png',
    iconSize: [17, 29],
    iconAnchor: [8.5, 29],
    popupAnchor: [0, -29],
  })

  map.on('dblclick', (e) => {
    let obj = {
      cords: e.latlng,
      id: new Date(),
    }

    path.value.push(obj)

    const marker = L.marker(e.latlng, { icon: icon1, draggable: true })
      .addTo(map)
      .bindPopup('coordinates: lat: ' + e.latlng.lat + ' lng: ' + e.latlng.lng)

    marker.id = obj.id
    markers.value.push(marker)

    marker.on('dblclick', () => {
      path.value = path.value.filter((f) => f.id !== marker.id)
      map.removeLayer(marker)
    })

    marker.on('dragend', () => {
      let obj = path.value.find((p) => p.id === marker.id)
      obj.cords = marker.getLatLng()
    })
  })
})
</script>
