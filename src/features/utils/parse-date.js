const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export function parseDate(date) {
  const d = new Date(date)
  return `${months[d.getMonth()]} ${d.getDate()} ${d.getFullYear()}`
}
