export function renderVideoSection() {
 
  const avatarVideo = '/assets/Avatar.mp4'
  
  const videoSection = document.getElementById('video-section')
  
  videoSection.innerHTML = `
    <div class="video-container">
      <div class="video-frame" style="position: relative;">
        <video class="video-element" id="featured-video">
          <source src="${avatarVideo}" type="video/mp4"> 
          Your browser does not support the video tag.
        </video>
        <div class="featured-video-overlay" id="featured-video-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.3); cursor: pointer; border-radius: 8px;">
          <button class="featured-play-btn" style="background: linear-gradient(45deg, #0df, #f0f); color: #fff; border: none; padding: 1rem 2rem; border-radius: 4px; font-size: 1.2rem; cursor: pointer; font-family: 'Courier New', monospace; font-weight: bold; transition: transform 0.3s, box-shadow 0.3s;">
            Play
          </button>
        </div>
      </div>
      <div class="video-info">
        <h3>Welcome</h3>
        <p>Hi, I'm Mikela – a Copenhagen-based front-end developer in progress. This short video gives you a quick intro to who I am and what I do.</p>
        <button class="cta-button">Learn More</button>
        
      </div>
    </div>
  `

    // Add click event for Learn More button
    const ctaButton = videoSection.querySelector('.cta-button')
    if (ctaButton) {
      ctaButton.addEventListener('click', () => {
        const aboutSection = document.getElementById('about')
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' })
        }
      })
    }
    
    // Add video play functionality
    const video = document.getElementById('featured-video')
    const videoOverlay = document.getElementById('featured-video-overlay')
    const playBtn = videoSection.querySelector('.featured-play-btn')
    
    if (videoOverlay && playBtn && video) {
      // Add hover effects to play button
      playBtn.addEventListener('mouseenter', () => {
        playBtn.style.transform = 'translateY(-2px)'
        playBtn.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)'
      })
      
      playBtn.addEventListener('mouseleave', () => {
        playBtn.style.transform = 'translateY(0)'
        playBtn.style.boxShadow = 'none'
      })
      
      // Save original play button HTML
      const originalOverlayHTML = videoOverlay.innerHTML
      
      // Function to restore play button
      const restorePlayButton = () => {
        videoOverlay.innerHTML = originalOverlayHTML
        videoOverlay.style.display = 'flex'
        
        // Re-add hover effects to the restored play button
        const newPlayBtn = videoOverlay.querySelector('.featured-play-btn')
        if (newPlayBtn) {
          newPlayBtn.addEventListener('mouseenter', () => {
            newPlayBtn.style.transform = 'translateY(-2px)'
            newPlayBtn.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)'
          })
          
          newPlayBtn.addEventListener('mouseleave', () => {
            newPlayBtn.style.transform = 'translateY(0)'
            newPlayBtn.style.boxShadow = 'none'
          })
        }
      }
      
      // Store restore function globally so avatar component can call it
      window.restoreFeaturedPlayButton = restorePlayButton
      
      // Simplified function to handle play button click
      const handlePlayClick = () => {
        // Show simple loading text
        videoOverlay.innerHTML = `
          <div style="display: flex; flex-direction: column; align-items: center; gap: 20px; color: white;">
            <div style="font-family: 'Courier New', monospace; color: white; font-size: 16px; font-weight: bold;">
              Loading...
            </div>
          </div>
        `
        
        // Show avatar popup after a short delay
        setTimeout(() => {
          const avatarSection = document.getElementById('pixel-avatar-section')
          if (avatarSection) {
            avatarSection.style.display = 'block'
            
            // Make sure video container is visible and chat is hidden
            const videoContainer = document.getElementById('pixel-video-container')
            const chatInterface = document.getElementById('pixel-chat-interface')
            if (videoContainer) {
              videoContainer.style.display = 'block'
            }
            if (chatInterface) {
              chatInterface.style.display = 'none'
            }
            
            // Auto-play the video in the avatar popup
            const avatarVideo = document.getElementById('avatar-intro-video')
            const avatarOverlay = document.getElementById('video-overlay')
            if (avatarVideo && avatarOverlay) {
              // Reset video to beginning
              avatarVideo.currentTime = 0
              avatarOverlay.style.display = 'none'
              const controls = document.getElementById('video-controls')
              if (controls) {
                controls.style.display = 'flex'
              }
              // Try to play the video
              avatarVideo.play().catch(err => {
                console.error('Error playing video:', err)
                // If autoplay fails, show the play button again
                avatarOverlay.style.display = 'flex'
                if (controls) {
                  controls.style.display = 'none'
                }
              })
            }
          }
        }, 500)
      }
      
      // Add event listener to overlay
      videoOverlay.addEventListener('click', handlePlayClick)
      
      // Also re-add listener when play button is restored
      const originalRestorePlayButton = restorePlayButton
      window.restoreFeaturedPlayButton = () => {
        originalRestorePlayButton()
        // Re-add click handler after restoring
        setTimeout(() => {
          const restoredOverlay = document.getElementById('featured-video-overlay')
          if (restoredOverlay) {
            restoredOverlay.addEventListener('click', handlePlayClick)
          }
        }, 100)
      }
    }
  }