function init() {
	
  //* DOM Elements 

  const grid = document.querySelector('.grid')
  const cells = []
  const score = document.querySelector('#score-display')
  const start = document.querySelector('#start')


  //* Game Elements 
  const width = 15
  const cellCount = width * width
  const shooterRange = [210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224]
  const starterPosition = 217
  let shooterPosition = 217
  const lazerPosition = shooterPosition - width
  console.log(lazerPosition)
	
  // const alienInvadersKilled = []
  // score = 10
  // console.log(score)
	
  const aliens = [
    47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 
    62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72,
    77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87,
    92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102
  ]
  // aliens = document.querySelectorAll('.invader')
	


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
    
    if (event.target.start) {
      console.log('The game has started')
      
    }
    cells[starterPosition].classList.add('player')
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
      // case 32:
      //   console.log('this is the lazer shoot')
      //   lazerBeam()
      //   break
    }
    cells[shooterPosition].classList.add('player')
  }
    
  // function lazerBeam(event) {
  //   for (let i = 0; i < shooterPosition; i++) {
  //     console.log('adding lazer')
  //     if (event.keyCode(32)) {
  //       cells[lazerPosition].classList.add('lazer')
  //     }
  //     cells[lazerPosition].classList.remove('lazer')
  //   }
  // }


  function aliensMoveDown() {
    const aliensMove = setInterval(() => {
      console.log('aliens should be moving down')
      
      aliens.forEach(alien => {
        console.log(alien)
        alien += width
        // if (alien.className === 'invader') {
        //   cells[aliens].classList.remove('invader')
					
        // }
        
        // const invaderIndex = alien += width
        // return invaderIndex
      })
      // cells[aliens].classList.add('invader')
    }, 2000)
		
    setTimeout(() => {
      clearInterval(aliensMove)
      console.log('aliens should stop moving')
    }, 5000)
  }


  //* Event Listeners 
  createGrid()
  aliensMoveDown()
  start.addEventListener('click', startGame)
  document.addEventListener('keydown', moveShooter)
  // document.addEventListenter('keydown', lazerBeam)
}
	
  
window.addEventListener('DOMContentLoaded', init)