<template>
  <div class="flex flex-row">
    <div class="flex flex-col float-left p-2 border-black border-3 bg-blue-400">
      <h1 class="text-red-800">Total Km ->{{ rideStore.totalKM }}</h1>
      <h1 class="text-red-800">Total Time ->{{ rideStore.totalTime }}</h1>
    </div>

    <div
      v-for="value in rideStore.rides"
      class="flex flex-col p-2 border-black border-3 text-lg"
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
        class="flex flex-col items-center border-3 border-blue-black bg-blue-500 hover:bg-blue-400 duration-250 ease-in mb-2"
      >
        Delete
      </button>
      <button
        v-if="value.id !== EditingID"
        @click="editor(value.id)"
        class="flex flex-col items-center border-3 border-blue-black bg-blue-500 hover:bg-blue-400 duration-250 ease-in mb-2"
      >
        Edit
      </button>

      <button
        v-else
        @click="save()"
        class="flex flex-col items-center border-3 border-blue-black bg-blue-500 hover:bg-blue-400 duration-250 ease-in mb-2"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRidesStore } from '@/stores/rides'
import { ref } from 'vue'
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
