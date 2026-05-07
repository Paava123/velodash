<template>
  <div id="map" class="h-100 w-100"></div>
  <p>-> {{ (totalDistance / 1000).toFixed(2) }} Km</p>
</template>

<script setup>
import L, { latLng, marker } from 'leaflet'
import { computed, onMounted, ref, watch } from 'vue'
import 'leaflet/dist/leaflet.css'

let path = ref([])

let totalDistance = computed(() => {
  let points = path.value.map((p) => p.cords)
  let sum = 0
  for (let i = 0; i + 1 < points.length; i++) {
    sum += points[i].distanceTo(points[i + 1])
  }

  return sum
})

onMounted(() => {
  const map = L.map('map').setView([53.43074604526472, 14.555119556621193], 20)
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

  map.on('click', (e) => {
    let obj = {
      cords: e.latlng,
      id: new Date(),
    }

    path.value.push(obj)

    const marker = L.marker(e.latlng, { draggable: true })
      .addTo(map)
      .bindPopup('coordinates: lat: ' + e.latlng.lat + ' lng: ' + e.latlng.lng)

    marker.id = obj.id

    marker.on('dblclick', () => {
      path.value = path.value.filter((f) => f.id !== marker.id)
      map.removeLayer(marker)
    })

    marker.on('dragend', (e) => {
      let obj = path.value.find((p) => p.id === marker.id)
      obj.cords = marker.getLatLng()
    })
  })
})
</script>
