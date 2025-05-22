// Store observer globally so we can disconnect it
let headerObserver = null;

export function renderHeader() {
  // Disconnect previous observer if exists
  if (headerObserver) {
    headerObserver.disconnect();
    headerObserver = null;
  }
  const header = document.getElementById('header');

  header.innerHTML = `
    <header class="site-header">
      <div class="logo">
        <span class="pixel-text">MM</span>
      </div>
      <nav>
        <ul>
          <li><a href="#" class="nav-link">Home</a></li>
          <li><a href="#projects" class="nav-link">Projects</a></li>
          <li><a href="#skills" class="nav-link">Skills</a></li>
          <li><a href="#contact" class="nav-link">Contact</a></li>
        </ul>
      </nav>
      <div class="theme-toggle">
        <span class="theme-icon">⚡</span>
      </div>
    </header>
  `;

  // Theme toggle
  const themeToggle = document.querySelector('.theme-toggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('.theme-icon');
    icon.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '⚡';
  });

  // Smooth scroll med offset
  const OFFSET = 80;
  const navLinks = header.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const top = targetElement.getBoundingClientRect().top + window.pageYOffset - OFFSET;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Active link ved scroll
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: `-${OFFSET}px 0px -40% 0px`,
    threshold: 0
  };

  headerObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const activeLink = header.querySelector(`a[href="#${id}"]`);
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, observerOptions);

  sections.forEach(section => headerObserver.observe(section));
}
