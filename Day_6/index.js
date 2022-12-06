const {readFileSync, promises: fsPromises} = require('fs');

// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');
  return contents
}
const data = syncReadFile('./data.txt');


let result = ''
for (let i = 3; i < data.length; i++) {

    let val1 = data[i-3];
    let val2 = data[i-2];
    let val3 = data[i-1];
    let val4 = data[i];
    
    if(val1 !== val2 && 
        val1 !== val3 && 
        val1 !== val4 &&
        val2 !== val3 && 
        val2 !== val4 && 
        val3 !== val4){
            result = i +1
            break;
        }
}

const fs = require('fs')
fs.writeFileSync('answer1.json', JSON.stringify(result));
console.log(result)

result = ''
for (let i = 14; i < data.length; i++) {

    const section = data.slice(i-14, i).split('');
    const val = section.some((element, index) => {
        return section.indexOf(element) !== index
    })
    if(!val){
        result = i
        break;
    }
}
fs.writeFileSync('answer2.json', JSON.stringify(result));
console.log(result)

