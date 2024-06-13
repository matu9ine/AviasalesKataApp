import { Ticket } from '@/assets/types/ticketsTypes'

function sort(array: Ticket[], type: string) {
  if (type === 'cheaper') {
    return array.sort((a, b) => a.price - b.price)
  }
  if (type === 'faster') {
    return array.sort((a, b) => {
      return a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration)
    })
  }
  if (type === 'optimal') {
    return array.sort((a, b) => {
      const totalCostA = a.price + (a.segments[0].duration + a.segments[1].duration) * 100
      const totalCostB = b.price + (b.segments[0].duration + b.segments[1].duration) * 100
      return totalCostA - totalCostB
    })
  }
}

export default sort
