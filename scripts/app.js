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
    154, 155, 169, 170, 157, 158, 172, 173, 160, 161, 175, 176
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

  let invaderIndex = aliens[0]
  const timerId = setInterval(() => {
    console.log(invaderIndex)
    invaderIndex ++
    if (invaderIndex > aliens.length) {
      clearInterval(timerId)
    }
		
		
	
  }, 2000)


		
  function moveInvaders () {
		
    //  const leftEdge = aliens[0] % width === 0
    //  const rightEdge = aliens[aliens.length - 1] % width === width - 1
    //  let x = aliens[0] & width
    //  let y = Math.floor(aliens[0] / width)
    for (let i = 0; i <= aliens.length - 1; i++) {
      cells[aliens[i]].classList.add('invader')
    }
    for (let i = 0; i <= aliens.length - 1; i++) {
      cells[aliens[i]].classList.remove('invader')
    }
    for (let i = 0; i <= aliens.length - 1; i++) {
      aliens[i] += width
      console.log('move down')
    }
    for (let i = 0; i <= aliens.length - 1; i++) {
      cells[aliens[i]].classList.add('invader')
    }
    for (let i = 0; i <= aliens.length - 1; i++) {
      cells[aliens[i]].classList.remove('invader')
    }
    for (let i = 0; i <= aliens.length - 1; i++) {
      aliens[i] --
      console.log('move left')
    }
    for (let i = 0; i <= aliens.length - 1; i++) {
      cells[aliens[i]].classList.add('invader')
    }
    for (let i = 0; i <= aliens.length - 1; i++) {
      cells[aliens[i]].classList.remove('invader')
    }
    for (let i = 0; i <= aliens.length - 1; i++) {
      aliens[i] ++
      console.log('move right')
    }
    for (let i = 0; i <= aliens.length - 1; i++) {
      cells[aliens[i]].classList.add('invader')
    }
    for (let i = 0; i <= aliens.length - 1; i++) {
      cells[aliens[i]].classList.remove('invader')
    }
    for (let i = 0; i <= aliens.length - 1; i++) {
      aliens[i] ++
      console.log('move right')
    }
    for (let i = 0; i <= aliens.length - 1; i++) {
      cells[aliens[i]].classList.add('invader')
    }
  }
 
		
			
  //     aliens.forEach(item => {
  //       cells[item].classList.remove('invader')
  //       console.log('invaders move right')
  //       item ++
  //       cells[item].classList.add('invader')
  //     })
			
  //     aliens.forEach(item => {
  //       cells[item].classList.remove('invader')
  //       console.log('invaders move right')
  //       item ++
  //       cells[item].classList.add('invader')
  //     })
			
  //     aliens.forEach(item => {
  //       cells[item].classList.remove('invader')
  //       console.log('right again!')
  //       item ++
  //       cells[item].classList.add('invader')
  //     })
			
  //     aliens.forEach(item => {
  //       cells[item].classList.remove('invader')
  //       console.log('back left!')
  //       item --
  //       cells[item].classList.add('invader')
  //     })
			
  //     aliens.forEach(item => {
  //       cells[item].classList.remove('invader')
  //       console.log('left again!')
  //       item --
  //       cells[item].classList.add('invader')
  //     })
  //   },2000)
	
  // setTimeout(() => {
  //   clearInterval(mvngAliens)
  //   console.log('aliens should stop moving')
  // },10000)
  // }
	
  

  // function aliensMove() {
  //   aliens.forEach(item => {
  //     // cells[item].classList.add('invader')
  //     console.log('this is the aliens move fucntion')
  //     // cells[item].classList.remove('invader')
      
  //     // cells[item] --
  //     // cells[item].classList.add('invader')
  //   })
  // }
	






  
    
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

  // function aliensMove() {
  //   const aliensMove = setInterval(() => {
  //     console.log('aliens should be moving down')
  //     aliens.forEach(alien => {
  //       console.log(alien)
  //       cells[alien].classList.remove('invader')
  //       alien -= width
  //       cells[alien].classList.add('invader')
  //     })
  //   }, 2000)
		
  //   setTimeout(() => {
  //     clearInterval(aliensMove)
  //     console.log('aliens should stop moving')
  //   }, 5000)
  // }

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