import { Ticket } from '@/assets/types/ticketsTypes'
import { FiltersState } from '@/assets/types/filtersTypes'

function filter(tickets: Ticket[], filters: FiltersState): Ticket[] {
  if (filters.all) {
    return tickets
  }
  function getStopsCount(key: string): number {
    switch (key) {
      case 'none':
        return 0
      case 'one':
        return 1
      case 'two':
        return 2
      case 'three':
        return 3
      default:
        return -1
    }
  }
  const selectedStops = Object.entries(filters).reduce((stops, [key, value]) => {
    if (key === 'all' || !value) return stops
    const count = getStopsCount(key)
    if (count >= 0) stops.add(count)
    return stops
  }, new Set<number>())

  return tickets.filter((ticket) => {
    const ticketStopsCounts = ticket.segments.map((segment) => segment.stops.length)
    return ticketStopsCounts.every((count) => selectedStops.has(count))
  })
}

export default filter
