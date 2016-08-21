import writeOnDOM from './modules/util/common'

writeOnDOM('</br>Hi from entry one</br>')

var str = 'foo'
var chars = [ ...str ]
console.log(chars)

// Rest properties
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 }
console.log(x) // 1
console.log(y) // 2
console.log(z) // { a: 3, b: 4 }

// Spread properties
let n = { x, y, ...z }
console.log(n) // { x: 1, y: 2, a: 3, b: 4 }
