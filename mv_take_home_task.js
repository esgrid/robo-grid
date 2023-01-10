const {readFileSync} = require('fs')

const input = readFileSync('input.txt', 'utf-8')
// interesting that I need to split using '\r\n' rather than '\n' in documents I type in Windows
// const d = input.split('\r\n')

//use this "d" for mac or downloaded .txt from github?
const d = input.split('\n')
const grid = d[0].split(' ')
            .map(e => Number(e))
            .reverse()

// Structure of Robot (example)       
// const robot = {
//     initialPosition: [2, 3],
//     direction: 'E',
//     movements: 'FLFRFF',
//     finalPosition: [2, 3],
//     lost: false
// }

// making a dictionary with the necessary information for the robot
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
        finalPosition: initialPosition.map(e => e),
        lost: false
    }
    robotsArray.push(robot)
}

// robot being moved (change its direction and its final position based on the movements)
function moveRobot(robot, grid){
    function inConditionX() {return robot.finalPosition[0] <= grid[0] && robot.finalPosition[0] >= 0}
    function inConditionY () {return robot.finalPosition[1] <= grid[1] && robot.finalPosition[1] >= 0}
    let inCondition = inConditionX() && inConditionY()
    let cardinalPoints = 'ENWS'

    function changeDirection(direction, rotation){
        let indexOfDirectionInCardinalPoints = cardinalPoints.indexOf(direction)
        let newIndexOfDirectionInCardinalPoints = indexOfDirectionInCardinalPoints
        // ensuring that change of index works for rotation to the left and the right
        // including when the index is at the ends of the string (0 or 3)
        if (rotation === 'L'){
            if (indexOfDirectionInCardinalPoints < 3){
                newIndexOfDirectionInCardinalPoints++
            } else {
                newIndexOfDirectionInCardinalPoints = 0
            }
        } else {
            if (indexOfDirectionInCardinalPoints > 0){
                newIndexOfDirectionInCardinalPoints--
            } else {
                newIndexOfDirectionInCardinalPoints = 3
            }
        }

        return cardinalPoints[newIndexOfDirectionInCardinalPoints]
    }

    let outOfBounds = false
    for (let i = 0; i < robot.movements.length && inCondition; i++){

        let movement = robot.movements[i]

        if (movement === 'L' || movement === 'R'){
            robot.direction = changeDirection(robot.direction, movement)
        } else {
            if (robot.direction === 'E'){
                robot.finalPosition[0]++
                if (!inConditionX()){
                    robot.finalPosition[0]--
                    outOfBounds = true
                    break
                }
            } else if (robot.direction === 'W'){
                robot.finalPosition[0]--
                if (!inConditionX()){
                    robot.finalPosition[0]++
                    outOfBounds = true
                    break
                }
            } else if (robot.direction === 'N'){
                robot.finalPosition[1]++
                if (!inConditionY()){
                    robot.finalPosition[1]--
                    outOfBounds = true
                    break
                }
            } else {
                robot.finalPosition[1]--
                if (!inConditionY()){
                    robot.finalPosition[1]++
                    outOfBounds = true
                    break
                }
            }
        }
    }
    // if inCondition is false then it is outOfbounds but since the for loop never happened I'm assigning !outOfBounds
    // i.e. true to robot.lost
    robot.lost = !inCondition ? !outOfBounds : outOfBounds
}

const robots = []

// making the robots and adding them to the robots array
for (let i = 1; i < d.length; i++){
    makeRobot(d[i], robots)
}

// moving the robots and logging their end state
robots.forEach(robot => {
    moveRobot(robot, grid)
    console.log(`(${robot.finalPosition[0]}, ${robot.finalPosition[1]}, ${robot.direction}) ${robot.lost ? 'LOST' : ''}`)
})
