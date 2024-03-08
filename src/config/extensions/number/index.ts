export function unixToDate(unix: number): Date {
  return new Date(unix * 1000)
}
