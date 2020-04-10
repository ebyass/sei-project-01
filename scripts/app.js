function init() {
	
  //* DOM Elements 

  const grid = document.querySelector('.grid')
  const cells = []
  const score = document.querySelector('#score-display')
  const start = document.querySelector('#start')


  //* Game Elements 
  const width = 15
  const cellCount = width * width
  let shooterPosition = 217
  console.log(shooterPosition)
  const starterPosition = 217
  const lazerPosition = shooterPosition - width
  console.log(lazerPosition)
	
  // let invaderIndex
  // const alienInvadersKilled = []
  // score = 10
  // console.log(score)
	
  const aliens = [
    47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 
    62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72,
    77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87,
    92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102
  ]
	


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
    if (event.target === start) {
      cells[starterPosition].classList.add('player')
    }
    aliens.forEach(alien => {
      cells[alien].classList.add('invader')
    })
		
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
        console.log('this is the lazer shoot')
        lazerBeam()
        break
    }
    cells[shooterPosition].classList.add('player')
  }
    
  function lazerBeam() {
    cells[lazerPosition].classList.add('lazer')
    

  }





  //* Event Listeners 
  createGrid()
  start.addEventListener('click', startGame)
  document.addEventListener('keydown', moveShooter)
}
	
  
window.addEventListener('DOMContentLoaded', init)