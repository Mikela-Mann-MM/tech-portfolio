// Snake game state
window.snakeGame = false

// Function to detect if user is on mobile (phone only, not tablet)
function isMobile() {
  return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && window.innerWidth <= 480
}

// Simple and reliable dark mode detection
function isDarkModeActive() {
  // For debugging - let's be very conservative about dark mode detection
  // Only return true if we're absolutely sure dark mode is active
  
  // Check for explicit dark mode classes
  if (document.body.classList.contains('dark-mode') || 
      document.documentElement.classList.contains('dark-mode')) {
    console.log('Dark mode detected: explicit dark-mode class')
    return true
  }
  
  // Check for data attributes
  if (document.querySelector('[data-theme="dark"]') !== null) {
    console.log('Dark mode detected: data-theme="dark"')
    return true
  }
  
  // Check for other common dark mode indicators
  if (document.querySelector('.dark') !== null ||
      document.querySelector('[data-bs-theme="dark"]') !== null) {
    console.log('Dark mode detected: other dark theme class')
    return true
  }
  
  // Default to light mode - don't use system preference for now
  console.log('No dark mode detected - using light mode')
  return false
}

// Confetti function
function createConfetti() {
  const colors = ['#0df', '#f0f']
  const confettiCount = 50
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div')
    confetti.style.cssText = `
      position: fixed;
      width: 8px;
      height: 8px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      top: -10px;
      left: ${Math.random() * 100}vw;
      z-index: 10000;
      pointer-events: none;
    `
    
    document.body.appendChild(confetti)
    
    // Animate confetti falling
    const fallDuration = Math.random() * 2000 + 1000
    const fallDistance = window.innerHeight + 20
    
    confetti.animate([
      { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
      { transform: `translateY(${fallDistance}px) rotate(360deg)`, opacity: 0 }
    ], {
      duration: fallDuration,
      easing: 'linear'
    }).onfinish = () => {
      confetti.remove()
    }
  }
}

// Main snake game function - EXPORTED
export function startSnakeGame() {
  const container = document.getElementById('snake-game-container')
  
  // Get current theme state
  const isDarkMode = isDarkModeActive()
  
  console.log('Dark mode detected:', isDarkMode) // Debug log
  
  // Set theme class - now defaulting to light mode
  container.classList.remove('dark-theme') // Always remove first
  if (isDarkMode) {
    container.classList.add('dark-theme')
  }
  
  container.classList.remove('snake-hidden')
  container.classList.add('snake-visible')
  container.style.display = 'block'
  
  const gameSize = isMobile() ? 280 : 400
  
  container.innerHTML = `
    <div class="snake-wrapper">
      <button id="close-snake-game" class="close-button">×</button>
      <canvas id="snake-canvas" width="${gameSize}" height="${gameSize}"></canvas>
      ${isMobile() ? `
      <div id="snake-controls" class="mobile-controls">
        <div class="control-row">
          <button class="control-btn up" data-direction="up">↑</button>
        </div>
        <div class="control-row">
          <button class="control-btn left" data-direction="left">←</button>
          <button class="control-btn down" data-direction="down">↓</button>
          <button class="control-btn right" data-direction="right">→</button>
        </div>
      </div>
      ` : ''}
      <div id="game-status"></div>
    </div>
  `
  
  const canvas = document.getElementById('snake-canvas')
  const ctx = canvas.getContext('2d')
  const statusElement = document.getElementById('game-status')
  
  // Disable anti-aliasing for pixel-perfect rendering
  ctx.imageSmoothingEnabled = false
  
  const gridSize = isMobile() ? 14 : 20
  const tileCount = Math.floor(gameSize / gridSize)
  
  let snake = [{ x: Math.floor(tileCount / 2), y: Math.floor(tileCount / 2) }]
  let food = generateFood()
  let dx = 0
  let dy = 0
  let score = 0
  let gameLoop
  let gameStarted = false
  let gameWon = false
  
  function generateFood() {
    let newFood
    do {
      newFood = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
      }
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y))
    return newFood
  }
  
  function drawGame() {
    // Get current theme state for each frame (in case it changes)
    const currentDarkMode = isDarkModeActive()
    
    // Set colors based on current theme
    const bgColor = currentDarkMode ? '#000' : '#fff'
    const textColor = currentDarkMode ? '#666' : '#666'
    
    // Update container theme if needed
    if (currentDarkMode && !container.classList.contains('dark-theme')) {
      container.classList.add('dark-theme')
    } else if (!currentDarkMode && container.classList.contains('dark-theme')) {
      container.classList.remove('dark-theme')
    }
    
    // Clear canvas with background
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, gameSize, gameSize)
    
    // Draw instructions if game hasn't started (but avoid snake/food area)
    if (!gameStarted && dx === 0 && dy === 0) {
      ctx.fillStyle = textColor
      ctx.font = `${isMobile() ? '10' : '12'}px monospace`
      ctx.textAlign = 'center'
      
      // Position text at top of canvas to avoid snake/food
      ctx.fillText(
        isMobile() ? 'TAP ARROWS TO START' : 'USE ARROW KEYS TO START',
        gameSize / 2,
        30
      )
    }
    
    // Draw food - magenta square
    ctx.fillStyle = '#f0f'
    ctx.fillRect(
      food.x * gridSize, 
      food.y * gridSize, 
      gridSize, 
      gridSize
    )
    
    // Game logic
    if (dx !== 0 || dy !== 0) {
      const head = { x: snake[0].x + dx, y: snake[0].y + dy }
      
      // Check collisions
      const hitWall = head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount
      const hitSelf = snake.some(segment => segment.x === head.x && segment.y === head.y)
      
      if (hitWall || hitSelf) {
        clearInterval(gameLoop)
        statusElement.textContent = 'GAME OVER'
        statusElement.style.color = '#f0f'
        return
      }
      
      snake.unshift(head)
      
      // Check if food eaten
      if (head.x === food.x && head.y === food.y) {
        score += 1
        
        // Check for win condition
        if (score >= 20 && !gameWon) {
          gameWon = true
          clearInterval(gameLoop)
          statusElement.textContent = 'WINNER!'
          statusElement.style.color = '#0f0'
          createConfetti()
          return
        }
        
        food = generateFood()
        
        // Increase game speed slightly
        if (gameLoop) {
          clearInterval(gameLoop)
          const newSpeed = Math.max(80, 150 - Math.floor(score / 5) * 10)
          gameLoop = setInterval(drawGame, newSpeed)
        }
      } else {
        snake.pop()
      }
      
      if (!gameStarted) {
        gameStarted = true
        statusElement.textContent = ''
      }
    }
    
    // Draw snake - green squares
    snake.forEach((segment) => {
      ctx.fillStyle = '#0f0'
      ctx.fillRect(
        segment.x * gridSize, 
        segment.y * gridSize, 
        gridSize, 
        gridSize
      )
    })
  }
  
  function closeGame() {
    window.snakeGame = false
    clearInterval(gameLoop)
    container.classList.remove('snake-visible')
    container.classList.add('snake-hidden')
    container.style.display = 'none'
    container.innerHTML = ''
    
    // Remove keyboard event listener
    document.removeEventListener('keydown', handleKeyDown)
  }
  
  function changeDirection(newDx, newDy) {
    // Prevent reverse direction
    if ((dx === 1 && newDx === -1) || (dx === -1 && newDx === 1) ||
        (dy === 1 && newDy === -1) || (dy === -1 && newDy === 1)) {
      return
    }
    dx = newDx
    dy = newDy
  }
  
  // Keyboard controls
  function handleKeyDown(e) {
    e.preventDefault()
    switch (e.key) {
      case 'ArrowUp':
        changeDirection(0, -1)
        break
      case 'ArrowDown':
        changeDirection(0, 1)
        break
      case 'ArrowLeft':
        changeDirection(-1, 0)
        break
      case 'ArrowRight':
        changeDirection(1, 0)
        break
      case 'Escape':
        closeGame()
        break
    }
  }
  
  document.addEventListener('keydown', handleKeyDown)
  
  // Mobile controls
  if (isMobile()) {
    const controlButtons = container.querySelectorAll('.control-btn')
    controlButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault()
        const direction = button.dataset.direction
        switch (direction) {
          case 'up':
            changeDirection(0, -1)
            break
          case 'down':
            changeDirection(0, 1)
            break
          case 'left':
            changeDirection(-1, 0)
            break
          case 'right':
            changeDirection(1, 0)
            break
        }
      })
      
      // Add visual feedback
      button.addEventListener('touchstart', () => {
        button.style.background = '#0df'
        button.style.color = '#fff'
      })
      
      button.addEventListener('touchend', () => {
        button.style.background = '#fff'
        button.style.color = '#0df'
      })
    })
  }
  
  // Close button
  document.getElementById('close-snake-game').addEventListener('click', closeGame)
  
  // Start game loop
  gameLoop = setInterval(drawGame, 150)
  window.snakeGame = true
  
  // Initial draw
  drawGame()
}

// Initialize snake game activation handlers
export function initSnakeGame() {
  // Desktop activation (ESC key)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !window.snakeGame) {
      console.log('Snake game activated!')
      startSnakeGame()
    }
  })

  // Mobile activation - add snake to back to top button if it exists
  function addSnakeToBackToTop() {
    if (isMobile()) {
      console.log('Mobile detected, looking for back-to-top button...')
      
      const backToTopButton = document.querySelector('.back-to-top-btn')
      
      if (backToTopButton && !backToTopButton.hasAttribute('data-snake-added')) {
        console.log('Found back-to-top button, adding snake')
        backToTopButton.innerHTML = '🐍'
        backToTopButton.setAttribute('data-snake-added', 'true')
        backToTopButton.setAttribute('aria-label', 'Activate Snake Game')
        
        backToTopButton.addEventListener('click', (e) => {
          if (!window.snakeGame) {
            e.preventDefault()
            console.log('Snake game activated via back to top!')
            startSnakeGame()
          }
        })
      } else {
        console.log('No back-to-top button found or already has snake')
      }
    }
  }

  // Try to add snake to back to top button when page loads
  document.addEventListener('DOMContentLoaded', addSnakeToBackToTop)
  setTimeout(addSnakeToBackToTop, 1000)
}