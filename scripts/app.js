function init() {
	
  //* DOM Elements 

  const grid = document.querySelector('.grid')
  const cells = []
  let score = document.querySelector('#score-display')
  const start = document.querySelector('#start')


  //* Game Elements 
  const width = 15
  const cellCount = width * width
  let shooterPosition = 217
  // let invaderIndex
  // const alienInvadersKilled = []
  score = 10
  console.log(score)

  //* Execution 

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
  }
	
	
	
  function startGame() {
    if (start) {
      cells[shooterPosition].classList.add('player')
    }
  }


  function moveShooter(event){
    cells[shooterPosition].classList.remove('player')
    const x = shooterPosition % width
    switch (event.keyCode) {
      case 39:
        if (x < width - 1) shooterPosition ++
        break
      case 37: 
        if (x > 0) shooterPosition --
        break
      case 32:
      
        // const lazer = document.createElement('div')
        // lazer.id = 'shooterLazer'
        // lazer.textcontent = 'freakin lazer beam'
        // cells.appendChild(lazer)
        // console.log(lazer)
        // lazer[lazerPosition].classList.add('lazer')
        
    }
    cells[shooterPosition].classList.add('player')
  }
    
  





  //* Event Listeners 
  createGrid()
  start.addEventListener('click', startGame)
  document.addEventListener('keydown', moveShooter)
}
	
  
window.addEventListener('DOMContentLoaded', init)