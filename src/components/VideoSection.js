import avatarVideo from '../assets/avatar.mp4'


export function renderVideoSection() {
  const videoSection = document.getElementById('video-section')
  
  videoSection.innerHTML = `
    <div class="video-container">
      <div class="video-frame">
        <video controls poster="" class="video-element">
          <source src="${avatarVideo}" type="video/mp4"> 
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="video-info">
        <h3>Welcome</h3>
        <p>Hi, I’m Mikela – a Copenhagen-based front-end developer in progress. This short video gives you a quick intro to who I am and what I do.</p>
        <button class="cta-button">Learn More</button>
      </div>
    </div>
  `

    
    // Add click event for placeholder
    const videoPlaceholder = document.querySelector('.video-placeholder')
    videoPlaceholder.addEventListener('click', () => {
      alert('Video player would start here in the actual implementation!')
    })
  } 