// src/components/pixel-avatar.js
import '../styles/pixel-avatar.scss'

export function renderPixelAvatar() {
  
  let avatarSection = document.getElementById('pixel-avatar-section')
  if (!avatarSection) {
    avatarSection = document.createElement('div')
    avatarSection.id = 'pixel-avatar-section'
    document.body.appendChild(avatarSection)
  }
  
  
  // Hidden by default - force hide
  avatarSection.style.display = 'none'
  avatarSection.style.visibility = 'hidden'
  
  // Check if mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  
  // Create video container first
  avatarSection.innerHTML = `
    <div class="pixel-avatar-popup" style="display: none;">
      <div class="pixel-popup-container">
        <!-- Video container -->
        <div class="pixel-video-container" id="pixel-video-container" style="${isMobile ? 'display: none;' : ''}">
          <video id="avatar-intro-video" width="100%" height="auto" muted playsinline>
            <source src="/src/assets/Avatar.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          ${!isMobile ? `<div class="pixel-video-overlay" id="video-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.3); cursor: pointer;">
            <button class="pixel-play-btn" style="background: linear-gradient(45deg, #0df, #f0f); color: #fff; border: none; padding: 0.8rem 1.5rem; border-radius: 4px; font-size: 1rem; cursor: pointer; font-family: 'Courier New', monospace; font-weight: bold; transition: transform 0.3s, box-shadow 0.3s;">
              Play
            </button>
          </div>` : ''}
          <div class="pixel-video-controls" style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); display: none; gap: 10px;" id="video-controls">
            <button class="pixel-video-close" id="video-close-btn" style="background: linear-gradient(45deg, #0df, #f0f); color: #fff; border: none; padding: 0.6rem 1.2rem; border-radius: 4px; cursor: pointer; font-family: 'Courier New', monospace; font-weight: bold; font-size: 0.9rem; transition: transform 0.3s, box-shadow 0.3s;">Close</button>
            <button class="pixel-video-unmute" id="unmute-btn" style="background: linear-gradient(45deg, #0df, #f0f); color: #fff; border: none; padding: 0.6rem 1.2rem; border-radius: 4px; cursor: pointer; font-family: 'Courier New', monospace; font-weight: bold; font-size: 0.9rem; transition: transform 0.3s, box-shadow 0.3s;">Unmute</button>
          </div>
        </div>
        
        <!-- Chat interface (hidden initially on desktop, shown on mobile) -->
        <div class="pixel-chat-interface" id="pixel-chat-interface" style="${isMobile ? 'display: block;' : 'display: none;'}">
          <!-- Header with close button -->
          <div class="pixel-popup-header">
            <div class="pixel-popup-title">AI Assistant</div>
            <div class="pixel-popup-close">✕</div>
          </div>
          
          <!-- Chat messages area -->
          <div class="pixel-popup-messages" id="pixel-chat-messages">
            <div class="pixel-message avatar-message">
              <div class="pixel-message-text">Hello! I'm your AI assistant. I can tell you about my skills, projects, and experience. What would you like to know?</div>
            </div>
          </div>
          
          <!-- Name input area -->
          <div class="pixel-name-container" id="pixel-name-container">
            <input type="text" class="pixel-input" id="pixel-name-input" placeholder="Your name (optional)">
            <button class="pixel-button" id="pixel-set-name-btn">Set</button>
          </div>
          
          <!-- Message input area -->
          <div class="pixel-input-container">
            <input type="text" class="pixel-input" id="pixel-message-input" placeholder="Ask me anything...">
            <button class="pixel-button" id="pixel-send-btn">Send</button>
          </div>
          
          <!-- Quick question buttons -->
          <div class="pixel-quick-questions">
            <button class="pixel-quick-btn" data-question="What technologies do you know?">Tech Stack</button>
            <button class="pixel-quick-btn" data-question="Tell me about your projects">Projects</button>
            <button class="pixel-quick-btn" data-question="What is your experience?">Experience</button>
            <button class="pixel-quick-btn" data-question="How do you approach development?">Process</button>
          </div>
        </div>
      </div>
    </div>
  `
  
  // Add floating avatar button if it doesn't exist
  let avatarButton = document.querySelector('.pixel-avatar-wrapper')
  if (!avatarButton) {
    avatarButton = document.createElement('div')
    avatarButton.className = 'pixel-avatar-wrapper'
    avatarButton.innerHTML = `
      <div class="pixel-avatar">
        <span>💬</span>
      </div>
    `
    document.body.appendChild(avatarButton)
  }
  
  // Avatar button click handler
  avatarButton.addEventListener('click', () => {
    const avatarPopup = avatarSection.querySelector('.pixel-avatar-popup')
    if (avatarSection && avatarPopup) {
      avatarSection.style.display = 'block'
      avatarSection.style.visibility = 'visible'
      avatarPopup.style.display = 'block'
      
      // On mobile, show chat directly
      if (isMobile && chatInterface) {
        videoContainer.style.display = 'none'
        chatInterface.style.display = 'block'
        initializeChatInterface()
      }
    }
  })
  
  // Get elements
  const video = document.getElementById('avatar-intro-video')
  const videoContainer = document.getElementById('pixel-video-container')
  const chatInterface = document.getElementById('pixel-chat-interface')
  const unmuteBtn = document.getElementById('unmute-btn')
  const videoOverlay = document.getElementById('video-overlay')
  const videoCloseBtn = document.getElementById('video-close-btn')
  const videoControls = document.getElementById('video-controls')
  
  // Make video container relative for absolute positioning
  videoContainer.style.position = 'relative'
  
  // Set controls container to flex
  if (videoControls) {
    videoControls.style.display = 'none'
    videoControls.style.flexDirection = 'row'
  }
  
  // Handle play button
  if (videoOverlay) {
    const playBtn = videoOverlay.querySelector('.pixel-play-btn')
    
    // Add hover effects
    playBtn.addEventListener('mouseenter', () => {
      playBtn.style.transform = 'translateY(-2px)'
      playBtn.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)'
    })
    
    playBtn.addEventListener('mouseleave', () => {
      playBtn.style.transform = 'translateY(0)'
      playBtn.style.boxShadow = 'none'
    })
    
    videoOverlay.addEventListener('click', () => {
      video.play()
      videoOverlay.style.display = 'none'
      if (videoControls) {
        videoControls.style.display = 'flex'
      }
    })
  }
  
  // Handle unmute button
  if (unmuteBtn) {
    // Add hover effects
    unmuteBtn.addEventListener('mouseenter', () => {
      unmuteBtn.style.transform = 'translateY(-2px)'
      unmuteBtn.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)'
    })
    
    unmuteBtn.addEventListener('mouseleave', () => {
      unmuteBtn.style.transform = 'translateY(0)'
      unmuteBtn.style.boxShadow = 'none'
    })
    
    unmuteBtn.addEventListener('click', () => {
      video.muted = !video.muted
      unmuteBtn.textContent = video.muted ? 'Unmute' : 'Mute'
    })
  }
  
  // Handle close button
  if (videoCloseBtn) {
    // Add hover effects
    videoCloseBtn.addEventListener('mouseenter', () => {
      videoCloseBtn.style.transform = 'translateY(-2px)'
      videoCloseBtn.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)'
    })
    
    videoCloseBtn.addEventListener('mouseleave', () => {
      videoCloseBtn.style.transform = 'translateY(0)'
      videoCloseBtn.style.boxShadow = 'none'
    })
    
    videoCloseBtn.addEventListener('click', () => {
      // Skip to chat interface
      video.pause()
      videoContainer.style.display = 'none'
      chatInterface.style.display = 'block'
      initializeChatInterface()
      
      // Restore play button in Featured Project section
      if (window.restoreFeaturedPlayButton) {
        window.restoreFeaturedPlayButton()
      }
    })
  }
  
  // Handle video end event
  video.addEventListener('ended', () => {
    // Transition from video to chat
    videoContainer.style.display = 'none'
    chatInterface.style.display = 'block'
    
    // Initialize chat interface after video
    initializeChatInterface()
    
    // Restore play button in Featured Project section
    if (window.restoreFeaturedPlayButton) {
      window.restoreFeaturedPlayButton()
    }
  })
  
  // Also handle video error in case it fails to load
  video.addEventListener('error', () => {
    console.error('Video failed to load, showing chat interface directly')
    videoContainer.style.display = 'none'
    chatInterface.style.display = 'block'
    initializeChatInterface()
  })
  
  function initializeChatInterface() {
    const closeButton = avatarSection.querySelector('.pixel-popup-close')
    const messageInput = document.getElementById('pixel-message-input')
    const sendButton = document.getElementById('pixel-send-btn')
    const nameInput = document.getElementById('pixel-name-input')
    const setNameButton = document.getElementById('pixel-set-name-btn')
    const quickButtons = avatarSection.querySelectorAll('.pixel-quick-btn')
    const messagesContainer = document.getElementById('pixel-chat-messages')
    const nameContainer = document.getElementById('pixel-name-container')
    
    let visitorName = ''
    
    // Close button handler
    closeButton.addEventListener('click', () => {
      avatarSection.style.display = 'none'
      // Reset for next time
      videoContainer.style.display = 'block'
      chatInterface.style.display = 'none'
      video.currentTime = 0
      // Clear chat history when closing
      messagesContainer.innerHTML = `
        <div class="pixel-message avatar-message">
          <div class="pixel-message-text">Hello! I'm your AI assistant. I can tell you about my skills, projects, and experience. What would you like to know?</div>
        </div>
      `
      // Reset name input if it was shown
      nameContainer.style.display = 'block'
      nameInput.value = ''
      visitorName = ''
      
      // Restore play button in Featured Project section
      if (window.restoreFeaturedPlayButton) {
        window.restoreFeaturedPlayButton()
      }
    })
  
  // Set name handler
  setNameButton.addEventListener('click', () => {
    const name = nameInput.value.trim()
    if (name !== '') {
      visitorName = name
      nameContainer.style.display = 'none'
      addAvatarMessage(`Nice to meet you, ${visitorName}! How can I help you today?`)
    }
  })
  
 
  sendButton.addEventListener('click', sendMessage)
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  })
  
  // Quick question buttons
  quickButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const question = btn.getAttribute('data-question')
      addUserMessage(question)
      setTimeout(() => {
        processMessage(question)
      }, 500)
    })
  })
  
  function sendMessage() {
    const message = messageInput.value.trim()
    if (message !== '') {
      addUserMessage(message)
      messageInput.value = ''
      
      setTimeout(() => {
        processMessage(message)
      }, 500)
    }
  }
  
  function addUserMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.className = 'pixel-message user-message'
    messageElement.innerHTML = `<div class="pixel-message-text">${message}</div>`
    messagesContainer.appendChild(messageElement)
    messagesContainer.scrollTop = messagesContainer.scrollHeight
  }
  
  function addAvatarMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.className = 'pixel-message avatar-message'
    
    // Add typing indicator
    const typingIndicator = document.createElement('div')
    typingIndicator.className = 'pixel-typing-indicator'
    typingIndicator.innerHTML = '<div class="pixel-dot"></div><div class="pixel-dot"></div><div class="pixel-dot"></div>'
    messageElement.appendChild(typingIndicator)
    messagesContainer.appendChild(messageElement)
    messagesContainer.scrollTop = messagesContainer.scrollHeight
    
    // Simulate typing
    setTimeout(() => {
      messageElement.innerHTML = ''
      const messageText = document.createElement('div')
      messageText.className = 'pixel-message-text'
      messageElement.appendChild(messageText)
      
      let i = 0
      const typeInterval = setInterval(() => {
        if (i < message.length) {
          messageText.textContent += message.charAt(i)
          messagesContainer.scrollTop = messagesContainer.scrollHeight
          i++
        } else {
          clearInterval(typeInterval)
        }
      }, 30)
    }, 1000)
  }
  
  function processMessage(message) {
    message = message.toLowerCase()
    
    // Simple keyword-based responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      const greeting = visitorName ? `Hello ${visitorName}!` : 'Hello there!'
      addAvatarMessage(`${greeting} How can I help you today?`)
    }
    else if (message.includes('name')) {
      addAvatarMessage("I'm an AI assistant representing the portfolio owner. I can answer questions about their skills and work.")
    }
    else if (message.includes('tech') || message.includes('stack') || message.includes('technologies')) {
      addAvatarMessage("I specialize in HTML, CSS (including SCSS/SASS), JavaScript, REST APIs, Express, Node.js, and SQLite. I'm currently expanding my skills with React and Tailwind CSS. I also have interests in AI technologies.")
    }
    else if (message.includes('project')) {
      addAvatarMessage("I've worked on several projects including an E-commerce platform using Node.js, Express and SQLite, an interactive dashboard with REST APIs, and API integration services. Each project showcases different aspects of my full-stack capabilities.")
    }
    else if (message.includes('experience')) {
      addAvatarMessage("I'm a front-end developer with back-end capabilities, allowing me to build full-stack applications. I focus on creating responsive, performant web experiences with clean code and intuitive user interfaces.")
    }
    else if (message.includes('approach') || message.includes('process')) {
      addAvatarMessage("My development approach focuses on three principles: user-centric design, technical excellence, and continuous learning. I believe in writing clean, maintainable code that delivers exceptional user experiences.")
    }
    else if (message.includes('contact') || message.includes('hire') || message.includes('work')) {
      addAvatarMessage("You can reach out through the contact section at the bottom of this portfolio. I'm open to discussing new opportunities and would love to hear about your project.")
    }
    else if (message.includes('ai') || message.includes('artificial intelligence')) {
      addAvatarMessage("I'm currently exploring AI technologies and plan to integrate more advanced features into my work. This conversational interface is just the beginning of my journey into AI.")
    }
    else {
      addAvatarMessage("That's an interesting question! While I have knowledge about the portfolio owner's skills and projects, I might not have all the details. Feel free to ask something more specific about their technologies, projects, or development approach.")
    }
  }
  
    // Make the chat interface draggable
    makeDraggable(avatarSection.querySelector('.pixel-popup-header'), avatarSection.querySelector('.pixel-avatar-popup'))
  }
}

// Draggable functionality
function makeDraggable(handle, dragElement) {
  let posX = 0, posY = 0, posLeft = 0, posTop = 0
  
  handle.addEventListener('mousedown', startDrag)
  
  function startDrag(e) {
    e.preventDefault()
    posX = e.clientX
    posY = e.clientY
    posLeft = dragElement.offsetLeft
    posTop = dragElement.offsetTop
    
    document.addEventListener('mousemove', dragMove)
    document.addEventListener('mouseup', stopDrag)
  }
  
  function dragMove(e) {
    e.preventDefault()
    const newX = posLeft + e.clientX - posX
    const newY = posTop + e.clientY - posY
    
    dragElement.style.left = newX + 'px'
    dragElement.style.top = newY + 'px'
    dragElement.style.bottom = 'auto'
    dragElement.style.right = 'auto'
  }
  
  function stopDrag() {
    document.removeEventListener('mousemove', dragMove)
    document.removeEventListener('mouseup', stopDrag)
  }
}

// Show assistant on load after a delay
export function setupAvatarTrigger() {
  // Check if mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  
  // Only show auto-popup on desktop
  if (!isMobile) {
    setTimeout(() => {
      const avatarSection = document.getElementById('pixel-avatar-section')
      const avatarPopup = avatarSection?.querySelector('.pixel-avatar-popup')
      if (avatarSection && avatarPopup) {
        avatarSection.style.display = 'block'
        avatarSection.style.visibility = 'visible'
        avatarPopup.style.display = 'block'
      }
    }, 2000) // Show after 2 seconds on desktop only
  }
}

// Initialize both functions
export function initPixelAvatar() {
  renderPixelAvatar()
  setupAvatarTrigger()
  
  // Handle window resize - hide popup on mobile sizes
  let resizeTimeout
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      const isMobile = window.innerWidth <= 480
      const avatarSection = document.getElementById('pixel-avatar-section')
      const avatarPopup = avatarSection?.querySelector('.pixel-avatar-popup')
      
      // Hide popup if resizing to mobile width
      if (isMobile && avatarSection && avatarSection.style.display === 'block') {
        // Only hide if it was auto-shown (not manually opened)
        const videoContainer = document.getElementById('pixel-video-container')
        const chatInterface = document.getElementById('pixel-chat-interface')
        
        // Check if user is actively using it
        const isVideoPlaying = videoContainer?.querySelector('video')?.paused === false
        const hasChatMessages = chatInterface?.querySelectorAll('.pixel-message').length > 2
        
        // Only hide if not actively being used
        if (!isVideoPlaying && !hasChatMessages) {
          avatarSection.style.display = 'none'
          avatarSection.style.visibility = 'hidden'
          if (avatarPopup) {
            avatarPopup.style.display = 'none'
          }
        }
      }
    }, 250) // Debounce resize events
  })
}