import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useRidesStore = defineStore(
  'rides',
  () => {
    let rides = ref([])
    const totalKM = computed(() =>
      rides.value.reduce((sum, r) => Number(sum) + Number(r.distanceKm), 0),
    )

    const addRide = (ride) => {
      rides.value.push(ride)
    }

    const totalTime = computed(() =>
      rides.value.reduce((sum, r) => Number(sum) + Number(r.durationMin), 0),
    )

    const deleteRide = (id) => {
      rides.value = rides.value.filter((element) => element.id !== id)
    }

    return {
      rides,
      totalKM,
      totalTime,

      addRide,

      deleteRide,
    }
  },
  {
    persist: true,
  },
)
