

function getString(num) {
  return Array(10).fill(num).map( (x, index) => x + index ).join(' ')
}