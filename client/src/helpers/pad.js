function pad(num) {
  var s = num + ''
  return s.length === 1 ? '0' + s : s
}

export default pad
