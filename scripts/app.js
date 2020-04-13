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
  let result = 0
  
	
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
    let lazerIndex = (shooterIndex - width)
    let lazerId 

    function moveLazerUp() {
      cells[lazerIndex].classList.remove('lazer')
      lazerIndex -= width 
      cells[lazerIndex].classList.add('lazer')
      if (cells[lazerIndex].contains('invader')) {
        cells[lazerIndex].classList.remove('invader')
        cells[lazerIndex].classList.remove('lazer')
      }
      cells[lazerIndex].classList.add('boom')
			
      setTimeout(() => {
        cells[lazerIndex].classList.remove('boom')
      }, 250)
      clearInterval(lazerId)
			
      const alienKilled = aliens.indexOf(lazerIndex)
      alienInvadersKilled.push(alienKilled)
      result = + 500
      score.textContent = result
    }
  }
  
  


	
  // function moveAliens()

  let invaderIndex = aliens.indexOf()
  const timerId = setInterval(() => {
    
    setTimeout(() => {
      aliens.forEach(item =>{
        cells[item].classList.remove('invader')
        invaderIndex = item --
        cells[item].classList.add('invader')
      })
    }, 2000)
    cells[invaderIndex].classList.remove('invader')
    setTimeout(() => {
      aliens.forEach(item =>{
        cells[item].classList.remove('invader')
        invaderIndex = (item + width)
        cells[item].classList.add('invader')
      })
    }, 4000)
    cells[invaderIndex].classList.remove('invader')
    setTimeout(() => {
      aliens.forEach(item =>{
        cells[item].classList.remove('invader')
        invaderIndex = (item ++)
        cells[item].classList.add('invader')
      })
    }, 6000)
    cells[invaderIndex].classList.remove('invader')
    setTimeout(() => {
      aliens.forEach(item =>{
        cells[item].classList.remove('invader')
        invaderIndex = item + width
        cells[item].classList.add('invader')
      })
    }, 8000)
  }, 2000)
	
 

  //* Won Game 
	
  if (alienInvadersKilled.length === aliens.length) {
    score.textContent = 'You won!'
  }



  //* End Game 

  if (cells[shooterIndex].classList.contains('invader', 'player')){
    score.textContent = 'Game over'
    cells[shooterIndex].classList.add('blast')
  } 
	
  for (let i = 0; i <= aliens.length - 1; i++){
    if (aliens[i] > (cells.length - (width - 1))) {
      score.textContent = 'Game Over'
      clearInterval(timerId)
    }
  }
  

  //* Event Listeners 
  startGame()
  start.addEventListener('click', startGame)
  document.addEventListener('keydown', moveShooter)
  document.addEventListener('keydown', moveLazerBeam)
  
	
	
}

window.addEventListener('DOMContentLoaded', init)