export function kmPerDay(ride) {
  let map = {}

  ride = getLast14Days(ride)

  ride.forEach((element) => {
    if (!map[element.date]) {
      map[element.date] = 0
    }

    map[element.date] += parseFloat(element.distanceKm)
  })

  return map
}

function getLast14Days(rides) {
  const now = new Date()
  const ago = new Date()
  ago.setDate(now.getDate() - 14)

  return rides.filter((r) => {
    console.log(r.date)
    const rideDate = new Date(r.date)
    return rideDate >= ago && rideDate <= now
  })
}
