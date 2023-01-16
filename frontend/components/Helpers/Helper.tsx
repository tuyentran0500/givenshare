export function truncateString (str: String, num: number): String {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + '...'
}
