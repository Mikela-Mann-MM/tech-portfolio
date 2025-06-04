export function initProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');

  const projectUrls = {
    'Portfolio Website': '#',
    'Movie Explorer': 'https://mymoviemm.netlify.app',
    'Full Stack Application': 'https://birgers-bolcher.onrender.com/',
    'API Integration Service': '#'
  };

  projectCards.forEach(card => {
    const title = card.querySelector('h3').textContent;

    card.setAttribute('data-title', title);

    card.classList.add('clickable');

    //klikevent tilføjet
    card.addEventListener('click', () => {
      if (projectUrls[title]) {
        window.open(projectUrls[title], '_blank');
      }
    });

     // Ved 'Portfolio Website', tilføj ikke overlay-tekst
     if (title === 'Portfolio Website') return;

    // Tilføj overlay-tekst
    const overlayText = document.createElement('div');
    overlayText.classList.add('hover-overlay-text');
    overlayText.textContent = 'View Project';
    card.appendChild(overlayText);
  });
}
