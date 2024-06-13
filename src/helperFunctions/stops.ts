export const formatStops = (stopsArr: string[]) => {
  const stopsCount = stopsArr.length
  if (stopsCount === 0) return 'без пересадок'
  if (stopsCount === 1) return '1 пересадка'
  return `${stopsCount} пересадки`
}
