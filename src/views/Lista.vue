<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 w-9/10 m-auto mt-10">
    <div
      class="flex flex-col bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-gray-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <h2 class="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Total distance
      </h2>

      <p class="text-3xl font-bold text-lime-400 mt-2">
        {{ rideStore.totalKM.toFixed(2) }} <span class="text-lg text-gray-400">km</span>
      </p>

      <h2 class="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-6">
        Total time
      </h2>

      <p class="text-3xl font-bold text-sky-400 mt-2">
        {{ rideStore.totalTime }} <span class="text-lg text-gray-400">min</span>
      </p>
    </div>

    <div
      v-for="value in rideStore.rides"
      :key="value.id"
      class="flex flex-col bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-gray-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div v-if="value.id !== EditingID" class="flex flex-col gap-2">
        <MapComp v-if="value.points" :points="value.points" />

        <p class="text-sm text-gray-500">{{ value.date }}</p>

        <div class="grid grid-cols-2 gap-2 text-sm">
          <p>
            <span class="text-lime-500 font-semibold">Distance:</span> {{ value.distanceKm }} km
          </p>
          <p>
            <span class="text-sky-500 font-semibold">Duration:</span> {{ value.durationMin }} min
          </p>
          <p><span class="text-amber-500 font-semibold">Mood:</span> {{ value.mood }}</p>
          <p><span class="text-cyan-500 font-semibold">Weather:</span> {{ value.weather }}</p>
        </div>

        <p class="text-sm text-gray-400 mt-2">
          {{ value.notes }}
        </p>
      </div>

      <div v-else class="flex flex-col gap-3">
        <p class="text-sm text-gray-500">{{ value.date }}</p>

        <input
          type="number"
          v-model="value.distanceKm"
          class="bg-slate-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-xl px-3 py-2 outline-none focus:border-lime-400"
        />

        <input
          type="number"
          v-model="value.durationMin"
          class="bg-slate-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-xl px-3 py-2 outline-none focus:border-lime-400"
        />
        <p class="text-sm text-gray-400">{{ value.mood }}</p>

        <input
          type="text"
          v-model="value.notes"
          class="bg-slate-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-xl px-3 py-2 outline-none focus:border-lime-400"
        />

        <p class="text-sm text-gray-400">
          {{ value.weather }}
        </p>
      </div>

      <!-- buttons -->

      <div class="flex gap-2 mt-4">
        <button
          @click="deleteRide(value.id)"
          class="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl py-2 transition-all"
        >
          Delete
        </button>

        <button
          v-if="value.id !== EditingID"
          @click="editor(value.id)"
          class="flex-1 bg-lime-400 hover:bg-lime-300 text-slate-900 font-semibold rounded-xl py-2 transition-all"
        >
          Edit
        </button>

        <button
          v-else
          @click="save()"
          class="flex-1 bg-sky-400 hover:bg-sky-300 text-slate-900 font-semibold rounded-xl py-2 transition-all"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import MapComp from '@/components/MapComp.vue'
import { useRidesStore } from '@/stores/rides'
import { ref, computed } from 'vue'

const rideStore = useRidesStore()

let EditingID = ref(null)

function editor(id) {
  EditingID.value = id
}

function save() {
  EditingID.value = null
}

function deleteRide(id) {
  rideStore.deleteRide(id)
}
</script>
