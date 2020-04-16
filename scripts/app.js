function init() {
	
  //* DOM Elements --------------------------------------------------------------------------------------------------------

  const grid = document.querySelector('.grid')
  const cells = []
  const score = document.querySelector('#score-display')
  const startBtn = document.querySelector('#start')
  const audio = document.querySelector('audio')
  const restartBtn = document.querySelector('#restart')
  const clickedBtn = document.querySelectorAll('.score-display')

  //* Game Elements --------------------------------------------------------------------------------------------------------
  const width = 15
  const cellCount = width * width
  let shooterIndex = 217
  const alienInvadersKilled = []
  let result = 0
  let direction = 1
  let coronaIndex = 29
  let isPlayerDead = false
  const invaderIndex = 32
  let leadInvader = 0
  let aliens = [ 
    17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
    32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42
  ]
  const blocks = [
    152, 153, 167, 168, 161, 162, 176, 177, 156, 157, 158, 171, 172, 172, 173
  ]
	
  const dangerRow = [210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224]
	

	



  //* Execution --------------------------------------------------------------------------------------------------------

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
  }
  createGrid()
	
  //* Start Game --------------------------------------------------------------------------------------------------------
	
  function startGame() {

    aliens.forEach(item => {
      cells[item].classList.add('invader')
    })
		
    setInterval(moveInvaders, 500)
		
    cells[shooterIndex].classList.add('player')
    
    blocks.forEach(item => {
      cells[item].classList.add('block')
    })
		
    dangerRow.forEach(item => {
      cells[item].classList.add('danger-row')
    })
    
  }

  //* Player Movement --------------------------------------------------------------------------------------------------------


	
	
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
        return
    }
    cells[shooterIndex].classList.add('player')
  }
	

  //* Players Lazer --------------------------------------------------------------------------------------------------------
  
  function moveLazerBeam() {

    let lazerIndex = (shooterIndex - width)
		
    switch (event.keyCode) {
      case 32:
        cells[lazerIndex].classList.add('lazer')
        cells[shooterIndex].classList.add('player')
        audio.src = 'assets/squish A_03.wav'
        audio.play()
        break 
      default:
        return
    }
		
    const lazerId = setInterval(() => {
      moveLazerUp(event)
    }, 100)

    function moveLazerUp() {

      cells[lazerIndex].classList.remove('lazer')
      lazerIndex -= width 
      cells[lazerIndex].classList.add('lazer')
			
			
      if (result >= 100000) {
        score.textContent = 'Winner!'
        score.classList.add('blink')
        console.log('You won!')
      }
			
      if (lazerIndex === 0 || lazerIndex === 1 || lazerIndex === 2 || lazerIndex === 3 || lazerIndex === 4 || lazerIndex === 5 || lazerIndex === 6 || lazerIndex === 7 || lazerIndex === 8 || lazerIndex === 9 || lazerIndex === 10 || lazerIndex === 11 || lazerIndex === 12 || lazerIndex === 13 || lazerIndex === 14) {
        cells[lazerIndex].classList.remove('lazer')
        clearInterval(lazerId)
      } else if ((cells[lazerIndex].classList.contains('alien-lazer'))) {
				
        clearInterval(lazerId)
				
        cells[lazerIndex].classList.remove('invader')
        cells[lazerIndex].classList.remove('lazer')
        cells[lazerIndex].classList.remove('alien-lazer')
      } else if (cells[lazerIndex].classList.contains('invader')){
        clearInterval(lazerId)
        
        cells[lazerIndex].classList.add('blast')
        result += 5000
        score.textContent = result
				
        cells[lazerIndex].classList.remove('invader')
        cells[lazerIndex].classList.remove('lazer')
        cells[lazerIndex].classList.remove('alien-lazer')

        const aliensKilled = aliens.indexOf(lazerIndex)
        aliens.pop(aliensKilled)
        alienInvadersKilled.push(aliensKilled)
				
        setTimeout(() => {
          cells[lazerIndex].classList.remove('blast')
        }, 1000)
				
      } else if (cells[lazerIndex].classList.contains('block')) {
        cells[lazerIndex].classList.remove('lazer')
        clearInterval(lazerId)
      } else if (cells[lazerIndex].classList.contains('alien-lazer')) {
        cells[lazerIndex].classList.remove('lazer')
        cells[lazerIndex].classList.remove('alien-lazer')
        clearInterval(lazerId)
      } else if (result >= 100000) {
        score.textContent = 'Winner!'
        score.classList.add('blink')
      }
    }
  }
	


  // function moveInvaders() {

  //   const invaderIndex = aliens[0]
  //   console.log(invaderIndex)
  //   const x = invaderIndex % width 
  //   const y = Math.floor(invaderIndex / width)
		
  //   aliens.forEach(item => {
  //     cells[item].classList.remove('invader')
  //   })
		
    
		

		
  // if (aliens[0] > width * width - width) {
  //   console.log('game over')
  //   gameOver()
  // }  else if (aliens[0] % width === 3 && direction === 1) {
  //   direction = width
  //   console.log('move right')
  // } else if (aliens[0] % width === 3 && direction === width) {        
  //   direction = -1
  //   console.log('move left')
  // } else if (aliens[0] % width === 0 && direction === -1) {
  //   direction = width
  //   console.log('move down')
  // } else if (aliens[0] % width === 0 && direction === width) {
  //   direction = 1
  //   console.log('move')
  // }
		
  //   if (x < width - 1 ) {
  //     direction = 1
  //     console.log('move right') 
  //   } else if (x > 0) {
  //     direction = -1
  //     console.log('move left')
  //   } else if (y > 0) {
  //     direction = width
  //     console.log('move down')
  //   }
		
  //   aliens.forEach(item => {
  //     cells[item].classList.add('invader')
  //   })
  // }

  // setInterval(moveInvaders, 2000)



	

	
  // aliens.forEach(item => {
  //   cells[currentAlienIndex + item].classList.add('invader')
  // })
	
  //* Invaders Move --------------------------------------------------------------------------------------------------------

  function moveInvaders() {
		

    removeInvaders()
		
    if (leadInvader % width === 3 && direction === 1) {
      direction = width
      
      lastRow()
    } else if (leadInvader % width === 3 && direction === width) {
      direction = -1
    
      lastRow()
    } else if (leadInvader % width === 0 && direction === -1) {
      direction = width
  
      lastRow()
    } else if (leadInvader % width === 0 && direction === width) {
      direction = 1
  
      lastRow()
    }
		
    addInvaders()
    


  }
	
  function removeInvaders() {
    
    return aliens.forEach(item => {
      cells[item].classList.remove('invader')
    })

  }
	
  function addInvaders() {
    
    aliens = aliens.map(a => a + direction)
    leadInvader = leadInvader + direction
		
    aliens.forEach(item => {
      cells[item].classList.add('invader')
    })
    return aliens
  }
		
  // if ((leadInvader >= width * width - width)) {
  //   isPlayerDead = true
  //   gameOver()
  //   clearInterval(alienLazerId)
  // } else if (direction === 0){
      
  //   direction = 1 
  //   console.log(`lead invader is at ${leadInvader}`)
  // } else if (leadInvader % width === 3 && direction === 1) {
  //   direction = width
  //   // audio.src = 'assets/Sneezing_AOS01574.wav'
  //   // audio.play()
  // } else if (leadInvader % width === 3 && direction === width) {
  //   direction = -1
  // } else if (leadInvader % width === 0 && direction === -1) {
  //   direction = width
  // } else if (leadInvader % width === 0 && direction === width ) {
  //   direction = 1
  // } else {
  //   direction
  // }
    
    
		

  // const alienLazerId = setInterval(() => {
  //   alienLazersMove()
  // }, 5000)
 
		
  // function alienLazersMove() {

  //   let alienLazerIndex =  aliens[Math.floor(Math.random() * aliens.length)]
  //   // cells[alienLazerIndex].classList.add('alien-lazer')
  //   cells[alienLazerIndex].classList.remove('alien-lazer')
  //   alienLazerIndex += width
  //   cells[alienLazerIndex].classList.add('alien-lazer')
			
  //   if (cells[alienLazerIndex].classList.contains('player')) {
  //     gameOver()
  //   } else if (cells[alienLazerIndex].classList.contains('block') || (cells[alienLazerIndex].classList.contains('lazer'))) {
  //     cells[alienLazerIndex].classList.remove('block')
  //     cells[alienLazerIndex].classList.add('blast')
  //     cells[alienLazerIndex].classList.remove('alien-lazer')
  //     cells[alienLazerIndex].classList.remove('lazer')
  //     clearInterval(alienLazerId)
			
  //     setTimeout(() => {
  //       cells[alienLazerIndex].classList.remove('blast')
  //     }, 500)
  //   }
  // }
	
  // } else if (cells[alienLazerIndex].classList.contains('lazer')) {
  //   cells[alienLazerIndex].classList.remove('alien-lazer')
  //   cells[alienLazerIndex].classList.add('blast')
  //   cells[alienLazerIndex].classList.remove('lazer')
  //   clearInterval(alienLazerId)
				
  //   setTimeout(() => {
  //     cells[alienLazerIndex].classList.remove('blast')
  //   }, 500)
				
  // }
  
  


  
	



	
  function lastRow() {

    // const playerCollision = aliens.some(item => {
    //   return cells[item].classList.contains('player')
    // })
		
    // if (playerCollision === true) {
    //   gameOver()
    //   return
    // }

    for (let i = 0; i <= dangerRow.length; i++) {
      if (cells[i].classList.contains('invader')) {
        return isPlayerDead = true
      }
    }
    
  }
	
  //* Corona -------------------------------------------------------------------------------------------------------
	
  
  setTimeout(() => {
		
    const coronaId = setInterval(() => {
      cells[coronaIndex].classList.remove('corona-alien')
      moveCorona()
      console.log('corona mving')
    }, 500) 
			
    function moveCorona() {
      coronaIndex -= 1 
      if (coronaIndex === width) {
        clearInterval(coronaId)
      } else {
        cells[coronaIndex].classList.add('corona-alien')
      }
    }
    
    
  }, 500000)
	





	


  //* Won Game --------------------------------------------------------------------------------------------------------
	
  if (alienInvadersKilled.length === aliens.length) {
    score.textContent = 'You won!'
  }



  //* End Game --------------------------------------------------------------------------------------------------------
	
  function gameOver() {


    if (isPlayerDead === true) {
      console.log('GAME OVER ')
      score.textContent = 'GAME OVER'
      for (let i = 0; i < 1000; i++) {
        clearInterval(i)
      }
    }
    // dangerRow.forEach(item => {
    //   if (cells[item].classList.contains('invader')) {
    //     isPlayerDead = true
    //     cells[aliens].classList.remove('invader')
    //     cells[aliens].classList.remove('player')

    //   } 
    // })
  }
	


  // if (cells[shooterIndex].classList.contains('invader', 'player')){
  //   cells[shooterIndex].classList.add('blast')
  //   cells[shooterIndex].classList.remove('invader')
  //   cells[shooterIndex].classList.remove('player')
  //   score.textContent = 'Game over'
  //   clearInterval(timerId)
  // } 
	
  // for (let i = 0; i <= aliens.length - 1; i++){
  //   if (aliens[i] > (cells.length - (width - 1))) {
  //     score.textContent = 'Game Over'
  //     clearInterval(timerId)
  //   }
  // }
  // }
 
	
  function restartClicked(event) {
    result = 0
    score.textContent = 0
    console.log('restart btn clicked')
    cells.forEach(item => {
      // cells[item].classList.add('invader')
      // cells[item].classList.add('lazer')
      // cells[item].classList.add('aien-lazer')
      // cells[item].classList.add('player')
      // cells[item].classList.add('block')
      grid[item].classList.remove('invader')
      grid[item].classList.remove('lazer')
      grid[item].classList.remove('aien-lazer')
      grid[item].classList.remove('player')
      grid[item].classList.remove('block')
    })
  }


  //* Event Listeners --------------------------------------------------------------------------------------------------------
  
  
  document.addEventListener('keydown', moveShooter)
  document.addEventListener('keydown', moveLazerBeam)
  
  // document.addEventListener('keydown', moveLazerUp)
  clickedBtn.forEach(button => {
    startBtn.addEventListener('click', startGame)
    restartBtn.addEventListener('click', restartClicked)
  })
}	

window.addEventListener('DOMContentLoaded', init)