function init() {
	
  //* DOM Elements 

  const grid = document.querySelector('.grid')
  const cells = []
  const score = document.querySelector('#score-display')
  const start = document.querySelector('#start')
  


  //* Game Elements 
  const width = 15
  const cellCount = width * width
  let starterPosition = 217
  let shooterPosition = 217
  // const alienInvader = document.createElement('div')
  const invaderIndex = 0
  const lazerPosition = shooterPosition -= width
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

    cells[starterPosition].classList.add('player')
    aliens.forEach(item => {
      cells[item].classList.add('invader')
    })
    setInterval(() => {
      aliens.forEach(item => {
        cells[item].classList.remove('invader')
        console.log('invaders move left')
        item --
        cells[item].classList.add('invader')
      })
      aliens.forEach(item => {
        cells[item].classList.remove('invader')
        console.log('invaders move right')
        item += 2
        cells[item].classList.add('invader')
      })
    }, 2000)
    // setInterval(() => {
    //   aliens.forEach(item => {
    //     cells[item].classList.remove('invader')
    //     console.log('invaders should move right')
    //     item --
    //     cells[item].classList.add('invader')
    //   })
      
    // }, 2000)
    setTimeout(() => {
      clearInterval()
      console.log('aliens should stop moving')
    }, 6000)
  }
  startGame()

  function aliensMove() {
    aliens.forEach(item => {
      // cells[item].classList.add('invader')
      console.log('this is the aliens move fucntion')
      // cells[item].classList.remove('invader')
      
      // cells[item] --
      // cells[item].classList.add('invader')
    })
  }
	



  aliensMove()


  function moveShooter(event){
    cells[starterPosition].classList.remove('player')
    const x = starterPosition % width
    switch (event.keyCode) {
      case 39:
        if (x < width - 1) starterPosition ++
        break
      case 37: 
        if (x > 0) starterPosition --
        break
      default:
        console.log('wrong key')
      // case 32:
      //   console.log('this is the lazer shoot')
      //   lazerBeam()
      //   break
    }
    cells[starterPosition].classList.add('player')
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

  // function aliensMove() {
  //   for (let i = 0; i <= aliens.length - 1; i++) {
  //     console.log('this is an alien')
  //     aliens.classList.remove('invader')
  //     // cells[aliens].classList.remove('invader')
  //   }
  // aliens.forEach(alien => {
  //   console.log('this is the aliens moving')
  // * remove pika class from old position
  // })
    
  // aliens.forEach(alien => {
  //   alien += width
  //   console.log('alien should move right')
  //   // const x = aliens.indexOf[0] % width
  //   // const y = Math.floor(aliens[0] / width)
			
  //   //   if (y < width - 1) {
  //   //     // return alien += width
  //   //     console.log('aliens shoudl move right')
  //   //   } else if (x < width - 1) {
  //   //     // return alien ++
  //   //     console.log('aliens shoudl move left')
  //   //   } else if (x > 0) {
  //   //     // return alien --
  //   //     console.log('aliens should move down')
  //   //   } else {
  //   //     console.log('what went on here!?')
  //   //   }
  // })
  // aliens.forEach(alien => {
  //   cells[alien].classList.add('invader') // * add the class back at the new position
  // })
  // setTimeout(() => {
  //   clearInterval(aliensMove)
  //   console.log('aliens should stop moving')
  // }, 6000)


		
  

  //* Event Listeners 

  start.addEventListener('click', startGame)
  document.addEventListener('keydown', moveShooter)
  // document.addEventListenter('keydown', lazerBeam)
	
	
}
window.addEventListener('DOMContentLoaded', init)