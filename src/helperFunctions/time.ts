export const formatTime = (dateString: Date) => {
  return new Date(dateString).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
}

export const calculateEndTime = (startDate: string, duration: number) => {
  const date = new Date(startDate)
  date.setMinutes(date.getMinutes() + duration)
  return date
}

export const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  return `${hours}ч ${minutes}м`
}
