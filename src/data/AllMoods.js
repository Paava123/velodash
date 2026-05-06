export function AllMoods(rides) {
  let stats = {
    good: 0,
    ok: 0,
    bad: 0,
  }

  rides.forEach((r) => {
    if (stats[r.mood] !== undefined) {
      stats[r.mood]++
    }
  })

  return stats
}
