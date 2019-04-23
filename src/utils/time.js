import { DateTime, Duration } from 'luxon'

export const toTime = timestamp => {
  return DateTime.fromMillis(timestamp).toLocal()
}

const getSets = period => sets => {
  const now = DateTime.local()
  return sets.filter(({ start }) => now.hasSame(toTime(start), period))
}

export const getTodaySets = getSets('day')

export const getWeekSets = getSets('week')

export const getHours = milliseconds =>
  Math.floor(milliseconds / 1000 / 60 / 60)

export const getHumanTime = () => {
  const date = new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const part = hours >= 12 ? 'PM' : 'AM'
  const getHour = () => {
    const hours12 = hours % 12
    return hours12 ? hours : 12
  }
  const hourView = getHour()
  const minuteView = minutes < 10 ? `0${minutes}` : minutes
  return `${hourView}:${minuteView} ${part}`
}

export const secondsFormatter = seconds => {
  const duration = Duration.fromObject({ seconds })
  const hours = duration.as('hours')
  if (hours < 1) return `${Math.round(duration.as('minutes'))}m`

  const finalHours = Math.floor(hours)
  const finalMinutes = Math.round((hours - Math.floor(hours)) * 60)

  return `${finalHours}h ${finalMinutes}m`
}

export const getHumanDuration = (timestamp, lessThanMinuteText, finalizer, direction = 1) => {
  const timeNow = Date.now()
  const seconds = (direction === 1 ? timeNow - timestamp : timestamp - timeNow) / 1000
  if (seconds < 60) {
    return lessThanMinuteText
  }
  const minutes = Math.round(seconds / 60)
  const template = (time, name) => finalizer(`${time} ${time > 1 ? `${name}s` : name}`)
  if (minutes < 60) {
    return template(minutes, 'minute')
  }
  const hours = Math.round(minutes / 60)
  if (hours < 24) {
    return template(hours, 'hour')
  }
  const days = Math.round(hours / 24)
  return template(days, 'day')
}