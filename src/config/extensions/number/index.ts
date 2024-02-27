export function unixToDate(unix?: number | null): Date {
  return new Date(unix ?? 0 * 1000)
}
