import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import {mockedCounters} from 'utils/testUtils'

import CountersShare from 'components/CountersShare'

function setupCountersShareTestCommon () {
  const counters = mockedCounters
  return {
    counters
  }
}

test('Render counter items correctly', () => {
  const {counters} = setupCountersShareTestCommon()
  const selectedCounters = counters.map(counter => {
    counter.selected = true
    return counter
  })
  render(<CountersShare counters={selectedCounters} />)
  counters.map(counter => {
    expect(screen.getByText(`${counter.count} x ${counter.title}`)).toBeInTheDocument()
  })
})



