const app = document.querySelector('.App')
let table = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]

const functional = {
  element: elem,
  dispatch: dispatchStore,
  checkResult: checkRes,
  ACTIONS: {
    toggleQueue: 'toggleQ',
    addStep: 'addStep',
    changeWinner: 'changeWinner'
  }
}

const store = {
  q: false,
  steps: 0,
  winner: ''
}

function resetTable() {
  return [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]
}

function resetStore() {
  return {
    q: false,
    steps: 0,
    winner: ''
  }
}

function checkRes(table, store, dispatch, actions) {
  const maxSteps = 3 * 3
  let xCounter = 0
  let oCounter = 0
  const combinations = [
    [[0,0],[0,1],[0,2]],
    [[1,0],[1,1],[1,2]],
    [[2,0],[2,1],[2,2]],
    [[0,0],[1,1],[2,2]],
    [[0,2],[1,1],[2,0]],
    [[0,0],[1,0],[2,0]],
    [[0,2],[1,2],[2,2]],
    [[0,1],[1,1],[2,1]]
  ]
  
  
  dispatch(store, actions.addStep)
  if (store.steps === maxSteps) {
    dispatch(store, { type: actions.changeWinner, payload: 'Draw'} )
  }
  
  for(let i = 0; i < combinations.length; i++) {
    xCounter = 0
    oCounter = 0
    
    for(let j = 0; j < combinations[i].length; j++) {
      if (table[combinations[i][j][0]][combinations[i][j][1]] === 'X') {
        xCounter++
      } else if (table[combinations[i][j][0]][combinations[i][j][1]] === 'O') {
        oCounter++
      }
      
      if (xCounter === 3) { dispatch(store, { type: actions.changeWinner, payload: 'X Won'} ) }
      if (oCounter === 3) { dispatch(store, { type: actions.changeWinner, payload: 'O Won'} ) }
    }
  }
  
  document.querySelector('.App__result').textContent = store.winner
  document.querySelector('.App__restart').style.display = store.winner ? 'block' : null
}


function dispatchStore(store, action) {
  if (action === 'toggleQ') {
    store.q = !store.q
    return store.q ? 'X' : 'O'
  } else if (action === 'addStep') {
    store.steps += 1
  } else if (action.type === 'changeWinner') {
    store.winner = action.payload
  }
}


function initGame(app, table, functional, store) {
  const gameTable = document.createElement('div')
  const resultField = document.createElement('div')
  const restartBtn = document.createElement('button')

  restartBtn.className = 'App__restart'
  resultField.className = 'App__result'
  gameTable.className = 'App__gameTable'

  restartBtn.addEventListener('click', function() {
    app.innerHTML = ''
    initGame(app, resetTable(), functional, resetStore())
  })

  restartBtn.textContent = 'Restart'
  
  app.appendChild(gameTable)
  app.appendChild(resultField)
  app.appendChild(restartBtn)

  for (let y = 0; y < table.length; y++) {
    for (let x = 0; x < table[y].length; x++) {
      gameTable.appendChild(functional.element({x, y}, table, store, functional))
    }
    gameTable.appendChild(document.createElement('br'))
  }

}

function elem(cordinates, table, store, functional) {
  const btn = document.createElement('button')

  btn.className = 'App__gameTable__button'
  
  btn.addEventListener('click', function(e) {
    if (!store.winner) {
      table[cordinates.y][cordinates.x] = functional.dispatch(store, functional.ACTIONS.toggleQueue)
      e.target.setAttribute('disabled', true)
      e.target.textContent = table[cordinates.y][cordinates.x]

      functional.checkResult(table, store, functional.dispatch, functional.ACTIONS)
    }
  })
  
  return btn
}



initGame(app, table, functional, store)
