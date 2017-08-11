const btns = document.querySelectorAll('button')
const resultField = document.querySelector('.App__Container__Result-item')

const playerBtns = [btns[0], btns[1], btns[2]]
const computerBtns = [btns[3], btns[4], btns[5]]

for(let i = 0; i < playerBtns.length; i++) {
  playerBtns[i].addEventListener('click', handleClick(i))
}

function handleClick(count) {
  return function(e) {
    for (let i = 0; i < playerBtns.length; i++) {
      if (playerBtns[i].className = 'active') {
        playerBtns[i].className = null
      }
    }

    playerBtns[count].className = 'active'

    compareChoose(count, computerChoose())
  }
}

function computerChoose() {
  let num = Math.floor((Math.random() * 3));

  for (let i = 0; i < computerBtns.length; i++) {
    if (computerBtns[i].className = 'active') {
      computerBtns[i].className = null
    }
  }

  computerBtns[num].className = 'active'


  return num
}

function compareChoose(player, computer) {
  switch (player) {
    case 0:
        if (computer === 0) renderResult('Draw')
        else if (computer === 1) renderResult('Player Win')
        else renderResult('Computer Win')
      break;

    case 1: 
        if (computer === 0) renderResult('Computer Win')
        else if (computer === 1) renderResult('Draw')
        else renderResult('Player Win')
      break;    
  
    case 1: 
        if (computer === 0) renderResult('Player Win')
        else if (computer === 1) renderResult('Computer Win')
        else renderResult('Draw')
      break;    

    default:

  }

  function renderResult(text) {
    resultField.innerHTML = text
  }

}
