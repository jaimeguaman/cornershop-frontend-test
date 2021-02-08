export function getCounter(counters, id) {
  const result = counters.filter(counter => counter.id === id)
  return result ? result[0] : null
}

export const CountersExampleTitles = [
  {
    category: 'Drinks',
    items: ['Cups of coffee', 'Glass of water', 'CocaCola Bottles','Bottle of beer', 'Tequila Shots']
  },
  {
    category: 'Food',
    items: ['Hot-Dogs', 'French fries KGs eaten', 'Ice cream eaten']
  },
  {
    category: 'Misc',
    items: ['Days without sleep', 'Naps', 'Day dreaming', 'Flights Missed']
  }
]
