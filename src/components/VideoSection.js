import avatarVideo from '../assets/Avatar.mp4'


export function renderVideoSection() {
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
        <p>Hi, I’m Mikela – a Copenhagen-based front-end developer in progress. This short video gives you a quick intro to who I am and what I do.</p>
        <button class="cta-button">Learn More</button>
      </div>
    </div>
  `

    // Add click event for Learn More button
    const ctaButton = videoSection.querySelector('.cta-button')
    if (ctaButton) {
      ctaButton.addEventListener('click', () => {
        const aboutSection = document.getElementById('skills')
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
        // Restore video visibility
        const featuredVideo = document.querySelector('.project-video')
        if (featuredVideo) {
          featuredVideo.style.visibility = 'visible'
        }
        
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
      
      // Function to handle the animation
      const triggerAnimation = () => {
        // Get positions for animation
        const videoRect = video.getBoundingClientRect()
        const startX = videoRect.left + videoRect.width / 2
        const startY = videoRect.top + videoRect.height / 2
        
        // Temporarily hide avatar if it's visible
        const avatarSection = document.getElementById('pixel-avatar-section')
        let avatarWasVisible = false
        if (avatarSection && avatarSection.style.display === 'block') {
          avatarWasVisible = true
          avatarSection.style.display = 'none'
        }
        
        // Temporarily remove overflow hidden from video frame
        const videoFrame = video.closest('.video-frame')
        if (videoFrame) {
          videoFrame.style.overflow = 'visible'
        }
        
        // Create a clone of the video for animation
        const videoClone = document.createElement('div')
        videoClone.style.cssText = `
          position: fixed;
          left: ${videoRect.left}px;
          top: ${videoRect.top}px;
          width: ${videoRect.width}px;
          height: ${videoRect.height}px;
          background: linear-gradient(45deg, #0df, #f0f);
          border-radius: 8px;
          z-index: 9999;
          transition: none;
          animation: quirkyBounce 1.5s ease-in-out;
        `
        
        // Create style for quirky animation
        const style = document.createElement('style')
        style.textContent = `
          @keyframes quirkyBounce {
            0% {
              transform: translate(0, 0) rotate(0deg) scale(1);
            }
            20% {
              transform: translate(-50px, -100px) rotate(-15deg) scale(1.1);
            }
            40% {
              transform: translate(100px, -150px) rotate(25deg) scale(0.9);
            }
            60% {
              transform: translate(-30px, -80px) rotate(-10deg) scale(1.05);
            }
            80% {
              transform: translate(${window.innerWidth - videoRect.right - 100}px, ${window.innerHeight - videoRect.bottom - 100}px) rotate(360deg) scale(0.8);
            }
            100% {
              transform: translate(${window.innerWidth - videoRect.right - 170}px, ${window.innerHeight - videoRect.bottom - 200}px) rotate(720deg) scale(0.3);
              opacity: 0;
            }
          }
        `
        document.head.appendChild(style)
        document.body.appendChild(videoClone)
        
        // Add particle effects
        for (let i = 0; i < 8; i++) {
          const particle = document.createElement('div')
          particle.style.cssText = `
            position: fixed;
            left: ${startX}px;
            top: ${startY}px;
            width: 10px;
            height: 10px;
            background: ${i % 2 === 0 ? '#0df' : '#f0f'};
            border-radius: 50%;
            z-index: 9998;
            animation: particle${i} 1s ease-out forwards;
          `
          
          const particleStyle = document.createElement('style')
          particleStyle.textContent = `
            @keyframes particle${i} {
              to {
                transform: translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px) scale(0);
                opacity: 0;
              }
            }
          `
          document.head.appendChild(particleStyle)
          document.body.appendChild(particle)
          
          setTimeout(() => {
            particle.remove()
            particleStyle.remove()
          }, 1000)
        }
        
        // Play a fun sound effect (using Web Audio API)
        try {
          const audioContext = new (window.AudioContext || window.webkitAudioContext)()
          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()
          
          oscillator.connect(gainNode)
          gainNode.connect(audioContext.destination)
          
          oscillator.type = 'sine'
          oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
          oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.3)
          oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.6)
          
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6)
          
          oscillator.start(audioContext.currentTime)
          oscillator.stop(audioContext.currentTime + 0.6)
          
          // Clean up audio context after sound finishes
          setTimeout(() => {
            audioContext.close()
          }, 700)
          
          // Also close immediately on page unload
          window.addEventListener('unload', () => audioContext.close(), { once: true })
        } catch (err) {
          console.log('Audio playback not available:', err)
        }
        
        // Replace play button with retro loader
        videoOverlay.style.color = 'white'
        videoOverlay.innerHTML = `
          <div style="display: flex; flex-direction: column; align-items: center; gap: 20px; color: white !important;">
            <div style="font-family: 'Press Start 2P', 'Courier New', monospace; color: white !important; font-size: 16px; text-transform: uppercase; letter-spacing: 2px; text-shadow: 2px 2px 4px rgba(0,0,0,0.8); -webkit-text-fill-color: white !important;">
              <span style="color: white !important;">Playing</span>
            </div>
            <div class="amiga-loader" style="display: flex; gap: 8px;">
              <div class="loader-block" style="width: 20px; height: 20px; background: #0df; animation: amigaPulse 0.6s infinite;"></div>
              <div class="loader-block" style="width: 20px; height: 20px; background: #f0f; animation: amigaPulse 0.6s infinite 0.2s;"></div>
              <div class="loader-block" style="width: 20px; height: 20px; background: #0f0; animation: amigaPulse 0.6s infinite 0.4s;"></div>
            </div>
            <div style="font-family: 'Courier New', monospace; color: white !important; font-size: 14px; margin-top: 10px; font-weight: 700; -webkit-text-fill-color: white !important;">
              <strong style="color: white !important;">LOADING AVATAR...</strong>
            </div>
          </div>
        `
        
        // Add retro animation styles
        const loaderStyle = document.createElement('style')
        loaderStyle.textContent = `
          @keyframes amigaPulse {
            0%, 100% {
              transform: scale(1) rotateZ(0deg);
              opacity: 0.3;
            }
            50% {
              transform: scale(1.5) rotateZ(180deg);
              opacity: 1;
            }
          }
          
          @keyframes retroBlink {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0; }
          }
        `
        document.head.appendChild(loaderStyle)
        
        // Add progress counter
        let progress = 0
        const progressInterval = setInterval(() => {
          progress += Math.floor(Math.random() * 25) + 15
          if (progress > 100) progress = 100
          
          const loadingText = videoOverlay.querySelector('div:last-child')
          if (loadingText) {
            if (progress >= 100) {
              loadingText.innerHTML = `<strong>PLAYING...</strong>`
            } else {
              loadingText.innerHTML = `<strong>LOADING AVATAR... ${progress}%</strong>`
            }
          }
          
          if (progress >= 100) {
            clearInterval(progressInterval)
          }
        }, 100)
        
        // Show avatar popup after animation
        setTimeout(() => {
          // Hide the featured project video
          const featuredVideo = document.querySelector('.project-video')
          if (featuredVideo) {
            featuredVideo.style.visibility = 'hidden'
          }
          
          const avatarSection = document.getElementById('pixel-avatar-section')
          const avatarPopup = avatarSection?.querySelector('.pixel-avatar-popup')
          if (avatarSection && avatarPopup) {
            avatarSection.style.display = 'block'
            avatarSection.style.visibility = 'visible'
            avatarPopup.style.display = 'block'
            
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
          videoClone.remove()
          style.remove()
          loaderStyle.remove()
          clearInterval(progressInterval)
          
          // Restore overflow hidden
          if (videoFrame) {
            videoFrame.style.overflow = 'hidden'
          }
        }, 1400)
      }
      
      // Add event listener to overlay
      videoOverlay.addEventListener('click', triggerAnimation)
      
      // Also re-add listener when play button is restored
      const originalRestorePlayButton = restorePlayButton
      window.restoreFeaturedPlayButton = () => {
        originalRestorePlayButton()
        // Re-add click handler after restoring
        setTimeout(() => {
          const restoredOverlay = document.getElementById('featured-video-overlay')
          if (restoredOverlay) {
            restoredOverlay.addEventListener('click', triggerAnimation)
          }
        }, 100)
      }
    }
  } 