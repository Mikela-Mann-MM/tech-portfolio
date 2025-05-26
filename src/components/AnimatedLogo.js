
import { cleanupManager } from '../utils/cleanup'

// Store animation frame ID globally
let animationFrameId = null
let isAnimating = false

export function renderAnimatedLogo() {
    const logoContainer = document.getElementById('animated-logo')
    
    // Cancel animation
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }
    
    // Stop animation
    isAnimating = false
    
    logoContainer.innerHTML = `
      <div class="mm-logo">
        <div class="m m-left">M</div>
        <div class="m m-right">M</div>
      </div>
    `
    
    // Tilføj animation logic
    const mLeft = document.querySelector('.m-left')
    const mRight = document.querySelector('.m-right')
    
    let direction = 1
    let distance = 0
    const maxDistance = 20
    isAnimating = true
    
    function animateLogo() {
      if (!isAnimating || !document.body.contains(logoContainer)) {
        return
      }
      
      distance += 0.5 * direction
      
      if (distance >= maxDistance || distance <= 0) {
        direction *= -1
      }
      
      if (mLeft && mRight && document.body.contains(mLeft)) {
        mLeft.style.transform = `translateX(${-distance}px) rotateY(${distance}deg)`
        mRight.style.transform = `translateX(${distance}px) rotateY(${-distance}deg)`
        
        animationFrameId = requestAnimationFrame(animateLogo)
      }
    }
    
    // Register cleanup function
    cleanupManager.register(() => {
      isAnimating = false
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = null
      }
    })
    
    animateLogo()
  }