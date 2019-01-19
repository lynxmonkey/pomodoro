import { DateTime } from 'luxon'

export const toTime = timestamp => {
  return DateTime.fromMillis(timestamp).toLocal()
}

export const getTodaySets = (sets) => {
  const now = DateTime.local()
  return sets.filter(({ start }) => now.hasSame(toTime(start), 'day'))
}

export const getHours = milliseconds =>
  Math.floor(milliseconds / 1000 / 60 / 60)