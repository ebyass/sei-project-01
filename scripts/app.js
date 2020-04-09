function init() {
  // * Dom Elements
  const grid = document.querySelector('.grid')
  const cells = []
  // * grid variables
  const width = 10
  const cellCount = width * width
  // * game variables
  let playerPosition = 94
	

  function createGrid(startingPosition) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    cells[startingPosition].classList.add('player')
  }
  function handleKeyDown(event) {
    cells[playerPosition].classList.remove('player') // * remove player class from old position
    const x = playerPosition % width
    console.log(event.keyCode)
    // const y = Math.floor(playerPosition / width)
    switch (event.keyCode) { // * calculate the new index
      case 39: 
        if (x < width - 1) playerPosition++
        break
      case 37:
        if (x > 0) playerPosition--
        break
      case 32:
        console.log('This is the shooter')
        window.setTimeout(playersLazer, 0.1)
        break
      default:
        console.log('invalid key do nothing')
    }
    cells[playerPosition].classList.add('player') // * add the class back at the new position
  }
	
  function playersLazer (event) {
    console.log('shooting lazer')
    const lazerBeam = document.createElement('div')
    lazerBeam.classList.add('.lazer')
    grid.appendChild(lazerBeam)
  }
  createGrid(playerPosition)
  // * Event listeners
  document.addEventListener('keydown', handleKeyDown)
}
window.addEventListener('DOMContentLoaded', init)