const {readFileSync, promises: fsPromises} = require('fs');

// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

const dataArr = syncReadFile('./data.txt');

let newArr = []

let count = 0;
while (count != 50) {
    if(typeof dataArr[count] === 'string' && dataArr[count].length === 0) {
        let arr = dataArr.splice(0, count + 1);
        arr.pop();
        const sum = arr.reduce((a, b) =>  parseInt(a) + parseInt(b), 0)
        newArr.push(sum);
        count = 0;
    }
    count += 1;
}

const fs = require('fs')
fs.writeFileSync('list.json', JSON.stringify(newArr));
fs.writeFileSync('answer1.json', JSON.stringify(Math.max(...newArr)));

newArr.sort((a, b) => b - a);

let result = newArr.slice(0, 3);
const sum = result.reduce((a, b) => a + b, 0)
fs.writeFileSync('answer2.json', JSON.stringify(sum));

