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
	







	
  function moveLazerBeam() {

    let lazerIndex = (shooterIndex - width)
    

		
    switch (event.keyCode) {
      case 32:
        cells[lazerIndex].classList.add('lazer')
        console.log('lazer added')
        break 
      default:
        return
    }
		
    const lazerId = setInterval(() => {
      moveLazerUp(event)
      console.log('moveLazerUp function should be called')
    }, 250)

    function moveLazerUp(event) {

      cells[lazerIndex].classList.remove('lazer')
      lazerIndex -= width 
      console.log(lazerIndex)
      cells[lazerIndex].classList.add('lazer')
			
      if (lazerIndex === 0 || lazerIndex === 1 || lazerIndex === 2 || lazerIndex === 3 || lazerIndex === 4 || lazerIndex === 5 || lazerIndex === 6 || lazerIndex === 7 || lazerIndex === 8 || lazerIndex === 9 || lazerIndex === 10 || lazerIndex === 11 || lazerIndex === 12 || lazerIndex === 13 || lazerIndex === 14) {
        cells[lazerIndex].classList.remove('lazer')
        clearInterval(lazerId)
      } else if (cells[lazerIndex].classList.contains('invader')){
        cells[lazerIndex].classList.remove('lazer')
        cells[lazerIndex].classList.remove('invader')
        cells[lazerIndex].classList.add('blast')
        result = + 500
        score.textContent = result
				
        const aliensKilled = aliens.indexOf(lazerIndex)
        aliens.pop(aliensKilled)
        console.log(aliens.length)
        alienInvadersKilled.push(aliensKilled)
        console.log(alienInvadersKilled)
        clearInterval(lazerId)
				
        setTimeout(() => {
          cells[lazerIndex].classList.remove('blast')
        }, 500)
        clearInterval(lazerId)
      } else if (cells[lazerIndex].classList.contains('block')) {
        clearInterval(lazerId)
      } else if (cells[lazerIndex].classList.contains('alien-lazer')) {
        cells[lazerIndex].classList.remove('lazer')
        cells[lazerIndex].classList.remove('alien-lazer')
      }
      
    }
    // collision()
  }
	
  
  // function collision () {
   
  //   if (cells.classList.contains('invader') && cells.classList.contains('lazer')) {
  //     cells.classList.remove('invader')
  //     console.log('alien has been hit!')
  //   }
    
  // }


  // if (cells[aliens].classList.contains('lazer')) {
  //   aliens.forEach(item => {
  //     cells[aliens].classList.remove('invader')
  //     alienInvadersKilled.push(item)
  //     console.log(alienInvadersKilled)
  //     clearInterval(lazerId)
  //   })
  // }
  
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
	
  //* Move the alien invaders
  
  let invaderIndex 
  function moveInvaders() {
    
    aliens.forEach(item => {
      cells[item].classList.remove('invader')
      console.log(`this is the item ${item}`)
      item -= 1
      console.log(`new item ${item}`)
      cells[item].classList.add('invader')
      console.log(`invader index is ${item}`)
    })
    aliens.forEach(item => {
      cells[item].classList.remove('invader')
      console.log(`move right from ${item}`)
      item += 1
      console.log(`NEW ITEM ${item}`)
      cells[item].classList.add('invader')
      console.log(`INVADER INDEX IS NOW ${item}`)
    })
    aliens.forEach(item => {
      cells[item].classList.remove('invader')
      item += 1
      cells[item].classList.add('invader')
    })
    aliens.forEach(item => {
      cells[item].classList.remove('invader')
      item += width
      cells[item].classList.add('invader')
    })
  }

  const timerId = setInterval(() => {
    moveInvaders()
  }, 4000)




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