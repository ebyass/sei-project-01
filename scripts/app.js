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
  const alienInvadersKilled = []
  const result = 0
  
	
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
	







	
  function moveLazerBeam() {

    let lazerIndex = (shooterIndex - width)
    
    const y = Math.floor(lazerIndex / width)
		
    switch (event.keyCode) {
      case 32:
        cells[lazerIndex].classList.add('lazer')
        break 
      default:
        return
    }
		
    const lazerId = setInterval(() => {
      moveLazerUp(event)
      console.log('moveLazerUp function should be called')
      
    }, 250)

    function moveLazerUp(event) {

      if (y > 0) {
        cells[lazerIndex].classList.remove('lazer')
        console.log('lazer beam should be removed')
        console.log('Has lazer reached the top?')
      } else {
        clearInterval(lazerId)
      }
			
      cells[lazerIndex].classList.remove('lazer')
      lazerIndex -= width 
      cells[lazerIndex].classList.add('lazer')	
    }



  }


  
  // if (cells[aliens[0]].classList.contains(lazerIndex)) {
  // 	cells[lazerId].classList.remove('lazer')
  // 	cells[lazerId].classList.remove('invader')
  // 	score = + 500
  // 	score.textContent = result
  // } else if (cells[aliens[0]].classList.contains('block', 'lazer')){
  // 	cells[lazerIndex].classList.remove('lazer')
  // }
				
      
    
		


    
        
    
		

		
  
    
	

	
  // const alienKilled = aliens.indexOf(lazerIndex)
  // alienInvadersKilled.push(alienKilled)
  // function moveAliens()
	
  
  let invaderIndex 
  function moveInvaders() {
    
    aliens.forEach(item => {
      cells[item].classList.remove('invader')
      invaderIndex = item --
      cells[item].classList.add('invader')
    })
    aliens.forEach(item => {
      cells[item].classList.remove('invader')
      invaderIndex = item ++
      cells[item].classList.add('invader')
    })
    aliens.forEach(item => {
      cells[item].classList.remove('invader')
      invaderIndex = item ++
      cells[item].classList.add('invader')
    })
    aliens.forEach(item => {
      cells[item].classList.remove('invader')
      invaderIndex = item -= width
      cells[item].classList.add('invader')
    })
  }

  const timerId = setInterval(() => {
    moveInvaders()
    invaderIndex ++
  }, 1000)




  // let invaderIndex = 0
  // const timerId = setInterval(() => {
    
  //   setTimeout(() => {
  //     aliens.forEach(item =>{
  //       cells[item].classList.remove('invader')
  //       invaderIndex = item --
  //       cells[item].classList.add('invader')
  //     })
  //   }, 2000)
  //   // cells[invaderIndex].classList.remove('invader')
  //   setTimeout(() => {
  //     aliens.forEach(item =>{
  //       cells[item].classList.remove('invader')
  //       invaderIndex = (item + width)
  //       cells[item].classList.add('invader')
  //     })
  //   }, 4000)
  //   // cells[invaderIndex].classList.remove('invader')
  //   setTimeout(() => {
  //     aliens.forEach(item =>{
  //       cells[item].classList.remove('invader')
  //       invaderIndex = (item ++)
  //       cells[item].classList.add('invader')
  //     })
  //   }, 6000)
  //   // cells[invaderIndex].classList.remove('invader')
  //   setTimeout(() => {
  //     aliens.forEach(item =>{
  //       cells[item].classList.remove('invader')
  //       invaderIndex = item + width
  //       cells[item].classList.add('invader')
  //     })
  //   }, 8000)
  // }, 2000)
	
  //* Points lost or scored 
  //* Might need to change it to lazerId not lazerIndex

  


  //* Won Game 
	
  if (alienInvadersKilled.length === aliens.length) {
    score.textContent = 'You won!'
  }



  //* End Game 

  if (cells[shooterIndex].classList.contains('invader', 'player')){
    cells[shooterIndex].classList.add('blast')
    cells[shooterIndex].classList.remove('invader')
    cells[shooterIndex].classList.remove('player')
    score.textContent = 'Game over'
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
  // document.addEventListener('keydown', moveLazerUp)
  // cells.forEach(cell => cell.addEventListener('keydown', moveLazerUp))	
}	

window.addEventListener('DOMContentLoaded', init)