export default function getCurrentYear() {
  const date = new Date()
  return date.getFullYear().toString()
}