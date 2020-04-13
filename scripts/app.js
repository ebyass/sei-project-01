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
  

 
  // const lazerPosition = shooterIndex -= width
  // console.log(lazerPosition)
	
  // const alienInvadersKilled = []
  
  
	
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
        if (x < width - 1) shooterIndex ++
        break
      case 37: 
        if (x > 0) shooterIndex --
        break
      default:
        console.log('wrong key')
    }
    cells[shooterIndex].classList.add('player')
  }
	
  console.log(shooterIndex)

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
	
  //* The lazer Beam
	
  
    
  // function lazerBeam(event) {
  //   for (let i = 0; i < shooterIndex; i++) {
  //     console.log('adding lazer')
  //     if (event.keyCode(32)) {
  //       cells[lazerPosition].classList.add('lazer')
  //     }
  //     cells[lazerPosition].classList.remove('lazer')
  //   }
  // }
  // lazerBeam()



  // class AlienInvader {
  //   constructor(name, points){
  //     this.name = name 
  //     this.points = points
  //   }
  //   aliensMove() {
  //     console.log('aliens move function called')
  //   }
  // }
  
  // cells.appendChild(newAlien)
  // newAlien = 107
  // cells[newAlien].classList.add('invader')

 

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
  // document.addEventListener('keydown', lazerBeam)
  // document.addEventListenter('keydown', lazerBeam)
	
	
}

window.addEventListener('DOMContentLoaded', init)