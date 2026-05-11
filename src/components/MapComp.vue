<template>
  <div
    ref="mapContainer"
    class="w-full aspect-square rounded-2xl border border-blue-200 dark:border-slate-700 mb-6"
  ></div>
</template>

<script setup>
import L from 'leaflet'
import { onMounted, onUnmounted, defineProps, ref } from 'vue'
import 'leaflet/dist/leaflet.css'

const props = defineProps({
  points: Array,
})

let mapContainer = ref(null)
let path = props.points.map((p) => p.cords)
let map = null

onMounted(() => {
  map = L.map(mapContainer.value).setView(path[path.length - 1], 15)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)

  L.polyline(path).addTo(map)
})

onUnmounted(() => {
  map.remove()
})
</script>
