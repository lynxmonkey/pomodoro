import { toTime } from "./time";

export const getSetsSum = sets => sets.reduce((acc, { start, end }) => acc + end - start, 0)

export const getWeekdaySets = (sets, weekday) => 
  sets.filter(s => toTime(s.start).weekday === weekday)