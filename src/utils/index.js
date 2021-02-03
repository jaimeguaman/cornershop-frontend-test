export function getCounter(counters, id) {
  const result = counters.filter(counter => counter.id === id)
  return result ? result[0] : null
}
