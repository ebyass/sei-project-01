function init() {
	
  //* DOM Elements --------------------------------------------------------------------------------------------------------

  const grid = document.querySelector('.grid')
  const cells = []
  const score = document.querySelector('#score-display')
  const startBtn = document.querySelector('#start')
  const audio = document.querySelector('audio')
  


  //* Game Elements --------------------------------------------------------------------------------------------------------
  const width = 15
  const cellCount = width * width
  let shooterIndex = 217
  const alienInvadersKilled = []
  let result = 0
  let direction = 1
  const alienLazerIndex = 0

  const invaderIndex = 32
	
  let aliens = [ 
    17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
    32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42
  ]
  const blocks = [
    152, 153, 167, 168, 161, 162, 176, 177, 156, 157, 158, 171, 172, 172, 173
  ]
	
  const dangerRow = [210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224]
	
  // dangerRow.forEach(item => {
  //   cells[item].classList.add('danger-row')
  // })
  // return dangerRow
	



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
		
    setInterval(moveInvaders, 3000)
		
    cells[shooterIndex].classList.add('player')
    
    blocks.forEach(item => {
      cells[item].classList.add('block')
			
    })
    
  }

  //* Move shooter --------------------------------------------------------------------------------------------------------

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
	

  //* Lazer Beam shots from shooter --------------------------------------------------------------------------------------------------------
  
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

    function moveLazerUp(event) {

      cells[lazerIndex].classList.remove('lazer')
      lazerIndex -= width 
      cells[lazerIndex].classList.add('lazer')
			
      if (lazerIndex === 0 || lazerIndex === 1 || lazerIndex === 2 || lazerIndex === 3 || lazerIndex === 4 || lazerIndex === 5 || lazerIndex === 6 || lazerIndex === 7 || lazerIndex === 8 || lazerIndex === 9 || lazerIndex === 10 || lazerIndex === 11 || lazerIndex === 12 || lazerIndex === 13 || lazerIndex === 14) {
        cells[lazerIndex].classList.remove('lazer')
        clearInterval(lazerId)
      } else if (cells[lazerIndex].classList.contains('invader')){
        cells[lazerIndex].classList.remove('lazer')
        cells[lazerIndex].classList.remove('invader')
        cells[lazerIndex].classList.add('blast')
        result += 5000
        score.textContent = result
				
        const aliensKilled = aliens.indexOf(lazerIndex)
        aliens.pop(aliensKilled)
        console.log(aliens.length)
        alienInvadersKilled.push(aliensKilled)
        console.log(alienInvadersKilled.length)
        clearInterval(lazerId)
				
        setTimeout(() => {
          cells[lazerIndex].classList.remove('blast')
        }, 500)
        clearInterval(lazerId)
      } else if (cells[lazerIndex].classList.contains('block')) {
        cells[lazerIndex].classList.remove('lazer')
        clearInterval(lazerId)
      } else if (cells[lazerIndex].classList.contains('alien-lazer')) {
        cells[lazerIndex].classList.remove('lazer')
        cells[lazerIndex].classList.remove('alien-lazer')
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
	
  //* Move the alien invaders --------------------------------------------------------------------------------------------------------

  function moveInvaders() {

    const invaderIndex = aliens.map(item => {
      cells[item].classList.contains('danger-row')
    })
    if (invaderIndex) {
      console.log('game over')
    }

    removeInvaders()
		
    if (aliens[0] >= width * width - width) {
      gameOver()
    } else if (direction === 0){
      direction = 1 
      console.log('reavelling right')
    } else if (aliens[0] % width === 3 && direction === 1) {
      direction = width
      audio.src = 'assets/Sneezing_AOS01574.wav'
      audio.play()
      console.log('first')
    } else if (aliens[0] % width === 3 && direction === width) {
      direction = -1
      
      console.log('second')
    } else if (aliens[0] % width === 0 && direction === -1) {
      direction = width
      
      console.log('third')
    } else if (aliens[0] % width === 0 && direction === width ) {
      direction = 1
      
      console.log('fourth')
    } else {
      console.log('HERE')
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
    aliens.forEach(item => {
      cells[item].classList.add('invader')
    })
    return aliens
  }
	
  //* Invaders shoot lazer beams out their freakin heads -------------------------------------------------------------------------------------------------------
	

 

  //* Won Game --------------------------------------------------------------------------------------------------------
	
  if (alienInvadersKilled.length === aliens.length) {
    score.textContent = 'You won!'
  }



  //* End Game --------------------------------------------------------------------------------------------------------
	
  function gameOver() {

    dangerRow.forEach(cell => {
      if (cells[cell].classList.contains('invader')) {
        console.log('game over!')
      } 
    })
  }
  gameOver()

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
 
	



  //* Event Listeners --------------------------------------------------------------------------------------------------------
  
  startBtn.addEventListener('click', startGame)
	
  document.addEventListener('keydown', moveShooter)
  document.addEventListener('keydown', moveLazerBeam)
  // document.addEventListener('keydown', moveLazerUp)

}	

window.addEventListener('DOMContentLoaded', init)