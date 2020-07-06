function init() {
	
  //* DOM Elements 

  const grid = document.querySelector('.grid')
  const cells = []
  const score = document.querySelector('#score-display')
  const scoreBtn = document.querySelector('.score-display')
  const startBtn = document.querySelector('#start')
  const audio = document.querySelector('audio')


  //* Game Elements
	
  const width = 15
  const cellCount = width * width
  let shooterIndex = 217
  const alienInvadersKilled = []
  let result = 0
  let direction = 1
  let coronaIndex = 29
  let isPlayerDead = false
	
  
  let leadInvader = 0
  let aliens = [ 
    17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 
    32, 33, 34, 35, 36, 37, 38, 39, 40, 41
  ]
  const alienLazerIndex =  aliens[Math.floor(Math.random() * aliens.length)]
	
  const blocks = [
    152, 153, 167, 168, 161, 162, 176, 177, 156, 157, 158, 171, 172, 172, 173
  ]
	
  const dangerRow = [
    
    210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224
  ]
	

  const lazerRow = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14
  ]
	



  //* Execution 

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      grid.appendChild(cell)
      cells.push(cell)
    }
  }
  createGrid()
	
  //* Start Game 
	
  function startGame() {

    aliens.forEach(item => {
      cells[item].classList.add('invader')
    })
		
    setInterval(moveInvaders, 4000)
		
    cells[shooterIndex].classList.add('player')
    
    blocks.forEach(item => {
      cells[item].classList.add('block')
    })
		
    dangerRow.forEach(item => {
      cells[item].classList.add('danger-row')
    })
    
  }

  //* Player Movement 
	
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
	

  //* Players Lazer 
  
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
      // wonGame()
      cells[lazerIndex].classList.add('lazer')
			
      //! Added code to replace massive if statement ----------------------------------
      // for (let i = 0; i < lazerRow.length; i++) {
      //   if (lazerIndex === i) {
      //     cells[lazerIndex].classList.remove('lazer')
      //     clearInterval(lazerId)
      //   }
      // }
			


      //! -------------------------------------------------------------------------------------------
			
      if (lazerIndex === 0 || lazerIndex === 1 || lazerIndex === 2 || lazerIndex === 3 || lazerIndex === 4 || lazerIndex === 5 || lazerIndex === 6 || lazerIndex === 7 || lazerIndex === 8 || lazerIndex === 9 || lazerIndex === 10 || lazerIndex === 11 || lazerIndex === 12 || lazerIndex === 13 || lazerIndex === 14) {
        cells[lazerIndex].classList.remove('lazer')
        clearInterval(lazerId)
      } else if ((cells[lazerIndex].classList.contains('alien-lazer'))) {
        clearInterval(lazerId)
        cells[lazerIndex].classList.remove('invader', 'lazer', 'alien-lazer')
      } else if (cells[lazerIndex].classList.contains('invader')){
        
        clearInterval(lazerId)

        cells[lazerIndex].classList.add('blast')
        cells[lazerIndex].classList.remove('invader', 'lazer', 'alien-lazer')
				
        result += 5000
        score.textContent = result
				
        const alienKilled = lazerIndex
        aliens.pop(alienKilled)
        console.log('aliens', aliens.length)

        //const alienKilled = aliens.indexOf(lazerIndex) //? alienKilled is cell that contains alien from alien array and lazerIndex
        //console.log('lazerIndex', lazerIndex)
        // aliens.pop(alienKilled)
        // alienInvadersKilled.push(alienKilled)
				
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
      } else if (cells[lazerIndex].classList.contains('corona-alien')) {
        cells[lazerIndex].classList.remove('corona-alien')
        cells[lazerIndex].classList.remove('lazer')
        cells[lazerIndex].classList.add('blast')
        audio.src = 'assets/Cowboy Woo Hoo.wav'
        audio.play()
        result = + 100000
        score.textContent = result 
        wonGame()
				
        setTimeout(() => {
          cells[lazerIndex].classList.remove('blast')
        }, 1000)
      }
    }
  }
  
	
	
  //* Invaders Move 

  function moveInvaders() {
		

    removeInvaders()
		
    const aliensInDangerZone = dangerRow.filter(index => aliens.includes(index))
    if (aliensInDangerZone.length > 0) {
      isPlayerDead = true
      gameOver()
    }


    if (leadInvader % width === 3 && direction === 1) {
      direction = width
      wonGame()
      lastRow()
    } else if (leadInvader % width === 3 && direction === width)  {
      direction = -1
      wonGame()
      lastRow()
    } else if (leadInvader % width === 0 && direction === -1) {
      direction = width
      audio.src = 'assets/Sneezing_AOS01574.wav'
      audio.play()
      wonGame()
      lastRow()
    } else if (leadInvader % width === 0 && direction === width) {
      direction = 1
      wonGame()
      lastRow()
    }
		
    addInvaders()
    


  }
	
  function removeInvaders() {
    
    aliens.forEach(item => {
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
		
  
    
  //* Alien Lazers 



		
  // function alienLazersMove() {

    
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
  //     // clearInterval(alienLazerId)
			
  //     setTimeout(() => {
  //       cells[alienLazerIndex].classList.remove('blast')
  //     }, 500)
  //   }
  // }
  // alienLazersMove()
	
  // } else if (cells[alienLazerIndex].classList.contains('lazer')) {
  //   cells[alienLazerIndex].classList.remove('alien-lazer')
  //   cells[alienLazerIndex].classList.add('blast')
  //   cells[alienLazerIndex].classList.remove('lazer')
  //   clearInterval(alienLazerId)
				
  //   setTimeout(() => {
  //     cells[alienLazerIndex].classList.remove('blast')
  //   }, 500)
				
  // }
  
  


  
	



	

	
  //* Corona Mothership
	
  
  setTimeout(() => {

  
    const coronaId = setInterval(() => {

      cells[coronaIndex].classList.remove('corona-alien')
      moveCorona()
			
    }, 500) 
			
    function moveCorona() {
      coronaIndex -= 1 

      if (coronaIndex === width) {
        clearInterval(coronaId)
      } else {
        cells[coronaIndex].classList.add('corona-alien') 
      }	
    }

  }, 15000)
	




  //* Danger Row 
	
  function lastRow() {
  
    // dangerRow.forEach(item => {
    //   if (cells[item].classList.contains('invader')) {
    //     isPlayerDead = true
    //     gameOver()
    // 	}
		
      
    // })
    aliens.forEach(item => {
      if (cells[item].classList.contains('danger-row')) {
        return isPlayerDead = true  
      }

    })
    gameOver()
  }

	


  //* Won Game
	
  function wonGame() {
    if ((aliens.length === 4) || (result >= 100000)) {
      score.textContent = 'You Won!'
      score.classList.add('blink')
      scoreBtn.classList.add('win-lose')
      for (let i = 0; i < 1000; i++) {
        clearInterval(i)
      } 
    }
  }
  




  //* End Game 
	
  function gameOver() {
    if (isPlayerDead === true) {
      score.textContent = 'GAME OVER'
      score.classList.add('blink')
      for (let i = 0; i < 1000; i++) {
        clearInterval(i)
      }
    } 
	
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
 
	
  // function restartClicked(event) {
  //   result = 0
  //   score.textContent = 0
  //   console.log('restart btn clicked')
  //   if (event.target) {
  //     cells.forEach(item => {
  //     // cells[item].classList.add('invader')
  //     // cells[item].classList.add('lazer')
  //     // cells[item].classList.add('aien-lazer')
  //     // cells[item].classList.add('player')
  //     // cells[item].classList.add('block')
  //       cells[item].classList.remove('invader')
  //       cells[item].classList.remove('lazer')
  //       cells[item].classList.remove('aien-lazer')
  //       cells[item].classList.remove('player')
  //       cells[item].classList.remove('block')
  //     })
  //   }
    

  // }


  //* Event Listeners 
  
  
  document.addEventListener('keydown', moveShooter)
  document.addEventListener('keydown', moveLazerBeam)
  startBtn.addEventListener('click', startGame)
  // document.addEventListener('keydown', moveLazerUp)
}	

window.addEventListener('DOMContentLoaded', init)