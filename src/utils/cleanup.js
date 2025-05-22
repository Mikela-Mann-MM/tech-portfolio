// Cleanup manager to handle all event listeners and animations
class CleanupManager {
  constructor() {
    this.cleanupFunctions = []
    this.setupBeforeUnload()
  }

  register(cleanupFn) {
    this.cleanupFunctions.push(cleanupFn)
  }

  cleanup() {
    this.cleanupFunctions.forEach(fn => {
      try {
        fn()
      } catch (error) {
        console.error('Cleanup error:', error)
      }
    })
    this.cleanupFunctions = []
  }

  setupBeforeUnload() {
    // Removed beforeunload listener as it was blocking page reloads
    // Cleanup will happen naturally when components unmount
  }
}

export const cleanupManager = new CleanupManager()