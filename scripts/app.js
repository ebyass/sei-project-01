function init() {
	
  //* DOM Elements 

  const grid = document.querySelector('.grid')
  const cells = []
  const score = document.querySelector('#score-display')
  const start = document.querySelector('#start')
  


  //* Game Elements 
  const width = 15
  const cellCount = width * width
  let shooterIndex = 217
  const lazerShots = []
  const alienInvadersKilled = []
  
  
	
  const aliens = [
    47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 
    62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72,
    77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87,
    92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102
  ]
  
  const blocks = [
    152, 153, 167, 168, 161, 162, 176, 177, 156, 157, 158, 171, 172, 172, 173
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
	
  createGrid()
	
	
  function startGame() {
    cells[shooterIndex].classList.add('player')
		
    aliens.forEach(item => {
      cells[item].classList.add('invader')
    })
    
    blocks.forEach(item => {
      cells[item].classList.add('block')
    })
  }

  function moveShooter(event){
    cells[shooterIndex].classList.remove('player')
    const x = shooterIndex % width
    switch (event.keyCode) {
      case 39:
        if (x < width - 1) 
          shooterIndex = shooterIndex + 1
        break
      case 37: 
        if (x > 0) shooterIndex = shooterIndex - 1
        break
      default:
        console.log(shooterIndex)
    }
    cells[shooterIndex].classList.add('player')
  }
	
 
	
  function moveLazerBeam(event) {
    const lazerPosition = (shooterIndex - width)
    if ((event.keyCode === 32)) {
      console.log(lazerPosition)
      cells[lazerPosition].classList.add('lazer')
      lazerShots.push(lazerPosition)
      console.log(lazerShots)
    }
  }

  setTimeout(() => {
    console.log('I am the function with no name')
    console.log('I get called after 3 seconds')
    console.log('I execute any function calls I find inside my brackets')
    moveLazerBeam(event)
  }, 3000)
	
  // function moveAliens()

  let invaderIndex = 0
  const timerId = setInterval(() => {
    
    setTimeout(() => {
      aliens.forEach(item =>{
        cells[item].classList.remove('invader')
        invaderIndex = item --
        cells[item].classList.add('invader')
      })
    }, 2000)
    setTimeout(() => {
      aliens.forEach(item =>{
        cells[item].classList.remove('invader')
        invaderIndex = item ++
        cells[item].classList.add('invader')
      })
    }, 4000)
    setTimeout(() => {
      aliens.forEach(item =>{
        cells[item].classList.remove('invader')
        invaderIndex = item ++
        cells[item].classList.add('invader')
      })
    }, 6000)
    setTimeout(() => {
      aliens.forEach(item =>{
        cells[item].classList.remove('invader')
        invaderIndex = item + width
        cells[item].classList.add('invader')
      })
    }, 8000)
    if (invaderIndex > 50000) {
      clearInterval(timerId)
      console.log('timer has stopped')
    }
  }, 2000)
	


  //* End Game 

  if (cells[shooterIndex].classList.contains('invader', 'player')){
    score.textContent = 'Game over'
    cells[shooterIndex].classList.add('blast')
  } 
	
  for (let i = 0; i <= aliens.length - 1; i++){
    if (aliens[i] > (cells.length - (width - 1))) {
      score.textContent = 'Game Over'
    }
  }
  

  //* Event Listeners 
  startGame()
  start.addEventListener('click', startGame)
  document.addEventListener('keydown', moveShooter)
  document.addEventListener('keydown', moveLazerBeam)
  // document.addEventListenter('keydown', lazerBeam)
	
	
}

window.addEventListener('DOMContentLoaded', init)