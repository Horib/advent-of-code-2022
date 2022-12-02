const {readFileSync, promises: fsPromises} = require('fs');

const plays = {
  A:{
    player: "Opponent",
    hand: "Rock",
    value: 1,
    wins: "Scissors",
    loses: "Paper"
  },
    
  B:{
    player: "Opponent",
    hand: "Paper",
    value: 2,
    wins: "Rock",
    loses: "Scissors"
  },
  
  C:{
  player: "Opponent",
  hand: "Scissors",
  value: 3,
  wins: "Paper",
  losses: "Rock"
},

X:{
  player: "Player",
  hand: "Rock",
  value: 1,
  wins: "Scissors",
  losses: "Paper"
},
Y:{
  player: "Player",
  hand: "Paper",
  value: 2,
  wins: "Rock",
  losses: "Scissors"
},

Z:{
  player: "Player",
  hand: "Scissors",
  value: 3,
  wins: "Paper",
  losses: "Rock"
}
}

const points = {
  win: 6,
  draw: 3,
  loss: 0
}

const newRules = {
  X: 'lose',
  Y: 'draw',
  Z: 'win'
}

// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

const dataArr = syncReadFile('Day_2/data.txt');
let dataPlays = []
dataArr.forEach((element) => {
  const arr = element.split(' ');
  dataPlays.push(arr);
});

let totalScore = 0;
dataPlays.forEach((element) => {
  const opponent = plays[element[0]]
  const player = plays[element[1]]

  const handScore = player.value;
  let score = 0;
  
  if(opponent.hand === player.hand){
    score = points.draw;
  }
  if(opponent.hand === player.wins){
    score = points.win;
  }
  if(opponent.wins === player.hand){
    score = points.loss;
  }

  score = score + handScore;
  totalScore += score;
});

const fs = require('fs')
fs.writeFileSync('Day_2/answer1.json', JSON.stringify(totalScore));

let totalScore2 = 0;
dataPlays.forEach((element) => {
  const playKey = element[1];
  const play = newRules[playKey];

  let handScore = 0;
  let score = 0;

  const opponent = plays[element[0]]
  let player = {}

  if(play === 'win'){
    Object.entries(plays).forEach((entry) => {
      const [key, value] = entry;
      if(value.player === 'Player' && value.wins === opponent.hand){
        player = plays[key]
        score = points.win;
        return;
      }
    });
  }
    if(play === 'draw'){
    Object.entries(plays).forEach((entry) => {
      const [key, value] = entry;
      if(value.player === 'Player' && value.hand === opponent.hand){
        player = plays[key]
        score = points.draw;
        return;
      }
    });
  }
    if(play === 'lose'){
    Object.entries(plays).forEach((entry) => {
      const [key, value] = entry;
      if(value.player === 'Player' && value.losses === opponent.hand){
        player = plays[key]
        score = points.loss;
        return;
      }
    });
  }

  handScore = player.value;
  score = score + handScore;

  totalScore2 += score;
});

fs.writeFileSync('Day_2/answer2.json', JSON.stringify(totalScore2));



