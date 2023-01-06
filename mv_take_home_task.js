const {readFileSync} = require('fs')

const input = readFileSync('input.txt', 'utf-8')
// interesting that I need to split using '\r\n' rather than '\n'
const d = input.split('\r\n')
const grid = d[0].split(' ')
            .map(e => Number(e))
            .reverse()

// Structure of Robot            
// const robot = {
//     initialPosition: [a, b],
//     direction: 'E',
//     movements: 'FLFRFF',
//     finalPosition: [c, d],
//     lost: false
// }

// maybe make function make robot
function makeRobot(robotString, robotsArray){
    const robotInformation = robotString.split(' ')
    const [x0, y0] = [robotInformation[0].slice(1, robotInformation[0].indexOf(',')), robotInformation[1].slice(0, robotInformation[1].indexOf(','))]
    const initialPosition = [Number(x0), Number(y0)]
    const direction = robotInformation[2].slice(0, robotInformation[2].indexOf(')'))
    const movements = robotInformation[3]
    const robot = {
        initialPosition,
        direction,
        movements,
        finalPosition: initialPosition,
        lost: false
    }
    robotsArray.push(robot)
    return robot

}
// maybe make function move robot

const robots = []

for (let i = 1; i < d.length; i++){
    makeRobot(d[i], robots)
}

console.log(d)
console.log(grid)
console.log(robots)