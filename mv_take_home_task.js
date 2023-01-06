const {readFileSync} = require('fs')

const input = readFileSync('input.txt', 'utf-8')
// interesting that I need to split using '\r\n' rather than '\n'
const d = input.split('\r\n')
console.log(d)