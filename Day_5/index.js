const {readFileSync, promises: fsPromises} = require('fs');

// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');
  return arr = contents.split(/\r?\n/);
}
const dataArr = syncReadFile('./data.txt');

let boxIndex = 0
for (let index = 0; index < 9; index++) {
    const element = dataArr[index].split(' ');
    element.every((item) => {
        if(!isNaN(parseInt(item))){
            boxIndex = index
        }
        return true
    })
}

dataArr.splice(0, boxIndex + 2)

const craneStacks = [
    ['G','D','V','V','J','S','B'],
    ['Z','S','M','G','V','P'],
    ['C','L','B','S','W','T','Q','F'],
    ['H','J','G','W','M','R','V','Q'],
    ['C','L','S','N','F','M','D'],
    ['R','G','C','D'],
    ['H','G','T','R','J','D','S','Q'],
    ['P','F','V'],
    ['D','R','S','T','J'],
]

function createCommands(string){
    const arr = string.split(' ')
    
    const commands = {}
    let variables = []
    arr.forEach((item) => {
        if(!isNaN(parseInt(item))){
            variables.push(parseInt(item))
        }
    })
    commands['move'] = variables[0]
    commands['from'] = variables[1]
    commands['to'] = variables[2]

    return commands
}

let commandsArr = []
dataArr.forEach((item) => {
    commandsArr.push(createCommands(item))
})

commandsArr.forEach((item, index) => {
    const {move, from, to} = item
    const fromStack = craneStacks[from - 1]
    const toStack = craneStacks[to - 1]

    const stack = fromStack.splice(fromStack.length - move, move)
    
    toStack.push(...stack.reverse())
    // toStack.push(...stack)

    craneStacks[from -1] = fromStack
    craneStacks[to -1] = toStack

})

let result = ''
craneStacks.forEach((item, index) => {
    result = result.concat(item[item.length-1])
})

const fs = require('fs')
fs.writeFileSync('answer1.json', JSON.stringify(result));
console.log(result)