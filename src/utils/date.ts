/**
 * Calculate de difference in milliseconds of an date an other.
 * @param date Will be the minuend of a subtraction to get the difference
 * @param comparedDate Will be the subtrahend of a subtraction to get the difference
 */
function differenceDatesInMilliseconds(date: Date, comparedDate: Date): number {
  return date.getTime() - comparedDate.getTime()
}

function differenceDatesInDays(date: Date, comparedDate: Date): number {
  return Math.floor(differenceDatesInMilliseconds(date, comparedDate) / (1000 * 60 * 60 * 24))
}

export { differenceDatesInMilliseconds, differenceDatesInDays }
