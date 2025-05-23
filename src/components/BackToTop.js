import { startSnakeGame } from './SnakeGame.js';
import { cleanupManager } from '../utils/cleanup.js';

// Store scroll handler to remove it later
let scrollHandler = null;
let scrollTimeout = null;

export function renderBackToTop() {
    // Check if button already exists
    let backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
      // Remove existing button and handlers
      backToTopBtn.remove();
      if (scrollHandler) {
        window.removeEventListener('scroll', scrollHandler);
      }
    }
    
    // Check if mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Lav button element
    backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top-btn';
    backToTopBtn.innerHTML = '💬'; // Start with chat icon
    backToTopBtn.classList.add('back-to-top-btn');
    backToTopBtn.setAttribute('data-mode', 'chat');
    
    // Append button elementet
    document.body.appendChild(backToTopBtn);
    
    // Create debounced scroll handler
    scrollHandler = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      scrollTimeout = setTimeout(() => {
        if (window.pageYOffset > 100) {
          // Switch to back-to-top mode when scrolling
          backToTopBtn.innerHTML = '&uarr;';
          backToTopBtn.setAttribute('data-mode', 'scroll');
        } else {
          // Switch to chat mode at top
          backToTopBtn.innerHTML = '💬';
          backToTopBtn.setAttribute('data-mode', 'chat');
        }
      }, 50); // Debounce by 50ms
    };
    
    // Show/hide button afhængig af scroll position
    window.addEventListener('scroll', scrollHandler, { passive: true });
    
    // Register cleanup
    cleanupManager.register(() => {
      if (scrollHandler) {
        window.removeEventListener('scroll', scrollHandler);
      }
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    });
    
    // Different behavior based on mode and device
    backToTopBtn.addEventListener('click', () => {
      const mode = backToTopBtn.getAttribute('data-mode');
      
      if (mode === 'chat') {
        // Open chat interface
        const avatarSection = document.getElementById('pixel-avatar-section');
        const chatInterface = document.getElementById('pixel-chat-interface');
        const videoContainer = document.getElementById('pixel-video-container');
        
        if (avatarSection) {
          avatarSection.style.display = 'block';
          // Show chat directly, skip video
          if (videoContainer) videoContainer.style.display = 'none';
          if (chatInterface) chatInterface.style.display = 'block';
          
          // Initialize chat if needed
          if (window.initializeChatInterface) {
            window.initializeChatInterface();
          }
        }
      } else {
        // Scroll mode
        if (isMobile) {
          // On mobile, start snake game
          startSnakeGame();
        } else {
          // On desktop, scroll to top
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      }
    });
  } 