<template>
  <div class="grid grid-cols-3 gap-5 w-9/10 m-auto mt-10">
    <div
      class="flex flex-col float-left p-4 border-4 bg-blue-300 border-cyan-400 dark:bg-blue-900 dark:border-cyan-800"
    >
      <h1 class="">Total Km ->{{ rideStore.totalKM }}</h1>
      <h1 class="">Total Time ->{{ rideStore.totalTime }}</h1>
    </div>

    <div
      v-for="value in rideStore.rides"
      class="flex flex-col bg-blue-300 border-cyan-400 border-4 text-lg rounded-2xl p-4 dark:bg-blue-900 dark:border-cyan-800"
      :key="value.id"
    >
      <!-- obj -->

      <div v-if="value.id !== EditingID" class="flex flex-col">
        <p>{{ value.date }}</p>
        <p>{{ value.distanceKm }} - Km</p>
        <p>{{ value.durationMin }} - minutes</p>
        <p>{{ value.mood }}</p>
        <p>{{ value.notes }}</p>
        <p>{{ value.weather }}</p>
      </div>

      <!-- inputs -->

      <div v-else class="flex flex-col">
        <p>{{ value.date }}</p>
        <input
          type="number"
          v-model="value.distanceKm"
          class="border-1 border-black rounded-xl bg-gray-200 mb-2 p-1"
        />
        <input
          type="number"
          v-model="value.durationMin"
          class="border-1 border-black rounded-xl bg-gray-200 mb-2 p-1"
        />
        <input
          type="text"
          v-model="value.mood"
          class="border-1 border-black rounded-xl bg-gray-200 mb-2 p-1"
        />
        <input
          type="text"
          v-model="value.notes"
          class="border-1 border-black rounded-xl bg-gray-200 mb-2 p-1"
        />
        <p>{{ value.weather }}</p>
      </div>

      <!-- buttons -->

      <button
        @click="deleteRide(value.id)"
        class="flex flex-col items-center border-3 hover:bg-blue-500 duration-250 ease-in mb-2 border-4 bg-blue-400 border-cyan-400 dark:bg-sky-800 dark:border-cyan-900 hover:dark:bg-cyan-800"
      >
        Delete
      </button>
      <button
        v-if="value.id !== EditingID"
        @click="editor(value.id)"
        class="flex flex-col items-center border-3 hover:bg-blue-500 duration-250 ease-in mb-2 border-4 bg-blue-400 border-cyan-400 dark:bg-sky-800 dark:border-cyan-900 hover:dark:bg-cyan-800"
      >
        Edit
      </button>

      <button
        v-else
        @click="save()"
        class="flex flex-col items-center border-3 hover:bg-blue-500 duration-250 ease-in mb-2 border-4 bg-blue-400 border-cyan-400 dark:bg-sky-800 dark:border-cyan-900 hover:dark:bg-cyan-800"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script setup>
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
