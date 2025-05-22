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
    backToTopBtn.innerHTML = '&uarr;'; // 
    backToTopBtn.classList.add('back-to-top-btn', 'hidden');
    
    // Append button elementet
    document.body.appendChild(backToTopBtn);
    
    // Create debounced scroll handler
    scrollHandler = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      scrollTimeout = setTimeout(() => {
        if (window.pageYOffset > 300) {
          backToTopBtn.classList.remove('hidden');
        } else {
          backToTopBtn.classList.add('hidden');
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
    
    // Different behavior for mobile vs desktop
    backToTopBtn.addEventListener('click', () => {
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
    });
  } 