# Project 1: JavaScript Fundamentals Grid Based Game


# Brief: 


Design a grid-based game using HTML, CSS and JavaScript technologies learn in the first three weeks of the course. Players must be able to win and lose. 

# Timeframe:


1 week

# Technologies used:


* HTML5
* CSS
* JavaScript
* GitHub

# Deployment:

This game has been deployed on HitHub Pages and can be found [here](https://ebyass.github.io/sei-project-01/)

# Getting started

Use the clone button to download the game source code. Open the index.html file in your browser and the game should start, if not check the console for any issues. 

# About the Game

Space Invaders is a classic arcade game from the 80s. The player’s aim is to shoot an invading alien army, before it reaches the planet’s surface whilst aiming to achieve the highest score possible before either being destroyed by the aliens or allowing them to reach the planet’s surface. 


This was my first project  for General Assembly’s SEI course and my first project programming with JavaScript. 

# Game Architecture 

The player controls the hand sanitiser spaceship and can move along the bottom of the grid from left to right. The player can shoot upwards at the invading alien virus by pressing the spacebar, which sends a gel lazer up the grid. If the lazer hits one of the aliens, the alien is removed from the grid. 

The invading aliens are programmed to move automatically once the game starts. They move from left to right and down a row each time they reach the side of the grid. 

# Features

My favourite feature for this game is the ‘mothership’ of Corona beers that appears at random at the top of the grid. If a player manages to hit this they are rewarded with double bonus points. Other features include sound effects, an arcade style blinking scoreboard 

# Challenges 

The more challenging aspect of this project was the movement of the aliens. I had to teach myself about Set Intervals and Set Timeout functions in order to achieve this. I created an array for the aliens, which stored their starting cell numbers. Using the forEach method, I removed then added the ‘invader’ class to particular cells which created the illusion of movement for the alien invaders. 

```
function removeInvaders() {
    
    aliens.forEach(/item/ => {
      cells[item].classList.remove(‘invader’)
    })

  }
  
  function addInvaders() {
    
    aliens = aliens.map(/a/ => a + direction)
    leadInvader = leadInvader + direction
    
    aliens.forEach(/item/ => {
      cells[item].classList.add(‘invader’)
    })
    /return/ aliens
  }
```

# Wins

My biggest achievement for this game was successfully implementing the mothership. I think it adds a fun and playful dimension to the game and proved to me my understanding of setInterval and setTimeout. 

```
 setTimeout(() => {

  
    const coronaId = setInterval(() => {

      cells[coronaIndex].classList.remove(‘corona-alien’)
      moveCorona()
      
    }, 500) 
      
    function moveCorona() {
      coronaIndex -= 1 

      /if/ (coronaIndex === width) {
        clearInterval(coronaId)
      } /else/ {
        cells[coronaIndex].classList.add(‘corona-alien’) 
      } 
    }

  }, 15000)
```

I chose to create the grid using a for loop in the DOM which was created when the DOM Content Loaded. This was a great time saving technique that saved me having to hardcode 100 cells in HTML. 

```
  function createGrid() {
    /for/ (let i = 0; i < cellCount; i++) {
      const cell = document.createElement(‘div’)
      grid.appendChild(cell)
      cells.push(cell)
    }
  }
```

# Key learnings

1. Approaching problems: I learnt the hard way the importance of thorough planning. I wrote out my ideas in pseudo coding but with hindsight this was not enough. For future projects I will definitely be using platforms to help me with wireframes as it will be easier to follow plans and  meet targets throughout the week.


2. Debugging: I really learnt the value of console logging to make your way through debugging.


3. Set intervals 

# Future improvements: 

If I had more time I would have liked to refactor my code. There are also a few more features I would like to add:
* A leaderboard 
* Different pages the user can view depending on their score 
* Make the design responsive 
* Improve the UX experience and visuals of the game to enhance the user’s interaction with the game. 