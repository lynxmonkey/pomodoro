import { DateTime } from 'luxon'

export const toTime = timestamp =>
  DateTime.fromMillis(timestamp, {
    zone: -new Date().getTimezoneOffset()
  })

export const getTodaySets = (sets) => {
  const now = DateTime.local()
  return sets.filter(({ start }) => now.hasSame(toTime(start), 'day'))
}