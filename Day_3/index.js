const {readFileSync, promises: fsPromises} = require('fs');

// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');
  return arr = contents.split(/\r?\n/);
}

const alphabet = "abcdefghijklmnopqrstuvwxyz"

const alphabet1 = alphabet.split('');
const alphabet2 = alphabet.toUpperCase().split('');
const alpahbetCombined = alphabet1.concat(alphabet2)

let priorityList = {}
alpahbetCombined.forEach((letter, index) => {
    priorityList[letter] = index + 1;
})

const dataArr = syncReadFile('./data.txt');

let sum = 0
dataArr.forEach((line) => {
    const half = Math.ceil(line.length / 2);

    const comparment1 = line.slice(0, half).split('');
    const comparment2 = line.slice(half).split('');

    const intersection = comparment1.filter(element => {
        if(comparment2.includes(element)) return element;
    });
    sum = sum + priorityList[intersection[0]];
})

const fs = require('fs')
fs.writeFileSync('answer1.json', JSON.stringify(sum));

const chunkSize = 3
let chunkedArr = []
for (let i = 0; i < dataArr.length; i += chunkSize) {
    const chunk = dataArr.slice(i, i + chunkSize);
    chunkedArr.push(chunk);
}

chunkedArr.forEach((chunk) => {
    chunk.sort((a, b) => {
        return a.length - b.length;
    })
})

let sum2 = 0
chunkedArr.forEach((chunk) => {

    const elf1 = chunk[0].split('');
    const elf2 = chunk[1].split('');
    const elf3 = chunk[2].split('');

    const arr = [elf1, elf2, elf3]
    const result = arr.shift().filter(v => {
        return arr.every(a => a.indexOf(v) !== -1);;
    })

    sum2 = sum2 + priorityList[result[0]];
})

fs.writeFileSync('answer2.json', JSON.stringify(sum2));

