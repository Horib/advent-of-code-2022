const {readFileSync, promises: fsPromises} = require('fs');

// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');
  return arr = contents.split(/\r?\n/);
}
const dataArr = syncReadFile('./data.txt');

function getRange(start, stop, step = 1) {
   return Array.from({length: (stop - start) / step + 1}, (_, i) => start + (i * step));
}

function convertToNumPairs(string){
    const arr = string.split(",")

    const returnVal = []
    arr.forEach(element => {
        const val = element.split("-").map(item => parseInt(item)) 
        returnVal.push(val)
    });
    return returnVal
}

let sum = 0
dataArr.forEach((element) => {
    const pairs = convertToNumPairs(element)

    const section1 = pairs[0]
    const section2 = pairs[1]

    const bool1 = section1[0] >= section2[0] && section1[1] <= section2[1]
    const bool2 = section2[0] >= section1[0] && section2[1] <= section1[1]

    if(bool1 || bool2){
        sum++
    }
})

const fs = require('fs')
fs.writeFileSync('answer1.json', JSON.stringify(sum));
console.log(sum)

sum = 0
dataArr.forEach((element) => {
    const pairs = convertToNumPairs(element)

    const section1 = pairs[0]
    const section2 = pairs[1]

    const sectionRange1 = getRange(section1[0], section1[1])
    const sectionRange2 = getRange(section2[0], section2[1])

    if(sectionRange1.some(item => sectionRange2.includes(item))){
        sum++
    }

})

fs.writeFileSync('answer2.json', JSON.stringify(sum));
console.log(sum)