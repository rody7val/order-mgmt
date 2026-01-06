export function formatDate(timestamp) {
  console.log(timestamp)
  return new Date(timestamp).toLocaleString()+"hs"
}
