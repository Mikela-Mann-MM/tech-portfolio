
import './styles/main.scss'


console.log('Page loaded at:', new Date().toISOString())
import { renderHeader } from './components/Header'
import { renderFooter } from './components/Footer'
import { renderLogoCarousel } from './components/LogoCarousel'
import { renderVideoSection } from './components/VideoSection' 
import { renderAnimatedLogo } from './components/AnimatedLogo'
import { renderBackendSkills } from './components/BackendSkills'
import { initPixelAvatar } from './components/pixel-avatar'
import { startSnakeGame } from './components/SnakeGame'
import { renderBackToTop } from './components/BackToTop' 
import { initCollapsibleSections } from './components/CollapsibleSections' 
import { initProjectCards } from './components/ProjectCards'



document.querySelector('#app').innerHTML = `
  <div class="portfolio-container">
    <div id="header"></div>
    
    <main>
      <section class="hero">
        <div class="hero__content">
          <h1 class="glitch-text">Front-End Developer</h1>
          <p class="typewriter">Building digital experiences with code.</p>
          <div id="animated-logo"></div>
        </div>
      </section>
      
      <section class="about" id="about">
        <h2 class="section-title">About Me</h2>
        <div class="about__content">
         <p># Professional Bio: Front-End Developer</p>
         
<p>## Summary</p>
<p>
I'm a results-driven Front-End Developer with a passion for creating immersive digital experiences that combine aesthetic appeal with technical excellence. Specializing in modern JavaScript frameworks and responsive design, I bridge the gap between creative vision and technical implementation.With a background in project management, I bring structure and strategic thinking to development workflows—ensuring not just code quality, but also delivery excellence. 
</p>
<p>
## Core Technical Skills
</p>
<p>
### Front-End Technologies
</p>
<p>
- **HTML5/CSS3/JavaScript**: Expert-level proficiency, with deep understanding of modern ES6+ features
</p>
<p>
- **CSS Frameworks**: Advanced implementation of SCSS/SASS for creating scalable styling architectures
</p>
<p>
- **UI Frameworks**: Currently mastering React ecosystem & Tailwind CSS for efficient development
</p>
<p>
- **Responsive Design**: Creating adaptive interfaces that provide optimal experiences across all devices
</p>
<p>
## Professional Approach
My development philosophy centers around three core principles:
</p>
<p>
1. **User-Centric Design**: Every line of code I write serves to enhance the user experience, with careful attention to accessibility, performance, and intuitive interaction.
</p>
<p>
2. **Technical Excellence**: I maintain high standards for code quality, with emphasis on clean architecture, thorough documentation, and testing.
</p>
<p>
3. **Continuous Learning**: The tech landscape evolves rapidly, and I stay at the forefront by constantly experimenting with emerging technologies and expanding my skill set.
</p>
<p>
I also leverage my formal education and hands-on experience in project management—including the use of Critical Implementation Points (CIPs)—to align development with business goals and manage deliverables with clarity and efficiency. This adds a layer of strategic oversight to my work, enabling better prioritization, risk management, and stakeholder communication.
</p>

<p>
## What Sets Me Apart
Beyond technical skills, I bring a unique perspective to development projects:
</p>
<p>
- **Problem-Solving Mindset**: I approach challenges with creativity and analytical thinking
</p>
<p>
- **Attention to Detail**: I believe the difference between good and great lies in the details
</p>
<p>
- **Collaborative Spirit**: I thrive in team environments, communicating effectively with designers, product managers, and fellow developers
</p>
<p>
- **End-to-End Capability**: With both front-end expertise and back-end knowledge, I can develop complete solutions independently
</p>
<p>
- **Strategic Development Insight: My project leadership experience helps me see the bigger picture, ensuring that technical solutions support long-term product and user goals.  
</p>
<p>
Creating experiences that are not just functional but memorable. Whether optimizing performance or crafting pixel-perfect interfaces, I approach each project with passion and precision.</p>
  </div>
  
      </section>
      
      <section id="skills" class="skills">
        <h2 class="section-title">Tech Stack</h2>
        <div id="logo-carousel"></div>
      </section>
      
      <section class="backend">
        <h2 class="section-title">API & Backend Skills</h2>
        <div id="backend-skills"></div>
      </section>

       <section class="showcase">
        <h2 class="section-title">Avatar presentation</h2>
        <div id="video-section"></div>
      </section> 
      
      <section id="projects" class="projects">
        <h2 class="section-title">Projects</h2>
        <div class="projects-grid">

        <div class="project-card">
            <h3>Portfolio Website</h3>
            <p>This very website showcasing my work and skills as a front-end developer.</p>
            <div class="tech-tags">
              <span>Vite</span>
              <span>SCSS</span>
              <span>JavaScript</span>
            </div>
          </div>

        <div class="project-card">
          <h3>Movie Explorer</h3>
          <p>A dynamic movie website where users can search for films via an API and save favorites directly on the site. Mobile View Only</p>
          <div class="tech-tags">
            <span>JavaScript</span>
            <span>CSS</span>
            <span>REST API</span>
          </div>
         </div>
          
          <div class="project-card">
            <h3>E-commerce Platform</h3>
            <p>Simple online store with cart functionality</p>
            <div class="tech-tags">
              <span>Node.js</span>
              <span>Express</span>
              <span>SQLite</span>
            </div>
          </div>
          
        <div class="project-card">
          <h3>Building Something Exciting!</h3>
          <p>I’m currently working on this project – check back soon for updates and new features.</p>
          <div class="tech-tags">
            <span>Vite</span>
            <span>Sass</span>
            <span>React</span>
          </div>
        </div>
          
        </div>
      </section>
      
      <section class="approach">
        <h2 class="section-title">My Approach</h2>
        <div class="approach-content">
          <p>I believe that exceptional digital products arise from a perfect blend of technical excellence and thoughtful design. My development philosophy centers around these core principles:</p>
          
          <div class="principles">
            <div class="principle">
              <h3>Performance First</h3>
              <p>I optimize every line of code for speed and efficiency, ensuring lightning-fast load times and smooth interactions.</p>
            </div>
            
            <div class="principle">
              <h3>Responsive By Default</h3>
              <p>Every interface I build works flawlessly across all devices and screen sizes, with no compromises in functionality.</p>
            </div>
            
            <div class="principle">
              <h3>Clean Architecture</h3>
              <p>I structure code with maintainability in mind, creating systems that are modular, well-documented, and easy to extend.</p>
            </div>
            
              <!-- <div class="principle">
              <h3>End-to-End Solutions</h3>
              <p>From database design to API development to frontend implementation, I create cohesive full-stack experiences.</p>
            </div> -->

          </div>
        </div>
      </section>
    </main>
    

    <div id="footer"></div>
    <!-- <button onclick="startSnakeGame()" id="start-snake-game-btn" class="start-snake-btn">Play Snake</button>
 -->
    <div id="snake-game-container" class="snake-hidden"></div>
  </div>
`

// Initialize all components with error handling
try {
  renderHeader()
} catch (e) { console.error('Header error:', e) }

try {
  renderFooter()
} catch (e) { console.error('Footer error:', e) }

try {
  renderLogoCarousel()
} catch (e) { console.error('LogoCarousel error:', e) }

try {
  renderVideoSection() 
} catch (e) { console.error('VideoSection error:', e) }

try {
  renderAnimatedLogo()
} catch (e) { console.error('AnimatedLogo error:', e) }

try {
  renderBackendSkills()
} catch (e) { console.error('BackendSkills error:', e) }

try {
  initPixelAvatar()
} catch (e) { console.error('PixelAvatar error:', e) }

try {
  renderBackToTop() 
} catch (e) { console.error('BackToTop error:', e) }

try {
  initCollapsibleSections() 
} catch (e) { console.error('CollapsibleSections error:', e) }

try {
  initProjectCards()
} catch (e) { console.error('ProjectCards error:', e) }

// Easter egg: Snake game - Desktop only with ESC key
if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  let snakeGameActive = false
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !snakeGameActive && !window.snakeGame) {
      console.log('Snake game activated!')
      snakeGameActive = true
      startSnakeGame()
    }
  })
}