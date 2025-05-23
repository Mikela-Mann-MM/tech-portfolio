// Sikker renderFooter funktion med klikbare kontaktlinks
export function renderFooter() {
  const footer = document.getElementById('footer')
  
  // Sikre kontaktoplysninger - gemmes som variabler for nem ændring
  const contactInfo = {
      email: 'mikelamann1@gmail.com',
      phone: '+4527570712', // Formateret til tel: link (ingen mellemrum/parenteser)
      phoneDisplay: '(+45) 27570712' // Vist format til brugeren
  }
  
  footer.innerHTML = `
    <footer class="site-footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Contact</h3>
          <p>
            <span class="contact-icon">✉</span> 
            <a href="mailto:${contactInfo.email}" class="phone-link" title="Send email til ${contactInfo.email}">${contactInfo.email}</a>
          </p>
          <p>
            <span class="contact-icon">☎</span> 
            <a href="tel:${contactInfo.phone}" class="phone-link" title="Ring til ${contactInfo.phoneDisplay}">${contactInfo.phoneDisplay}</a>
          </p>
        </div>
        
        <div class="footer-section">
          <h3>Social</h3>
          <div class="social-links">
            <a href="https://github.com/Mikela-Mann-MM" class="social-link" target="_blank" rel="noopener noreferrer" title="Besøg min GitHub profil">GitHub</a>
            <a href="https://www.linkedin.com/in/mikela-mann-2aa544365/" class="social-link" target="_blank" rel="noopener noreferrer" title="Besøg min LinkedIn profil">LinkedIn</a>
            <a href="https://www.instagram.com/mikelamann/" class="social-link" target="_blank" rel="noopener noreferrer" title="Besøg min Instagram profil">Instagram</a>
          </div>
        </div>
        
        <div id="contact" class="footer-section">
          <p class="footer-note">Built with <span class="heart">♥</span> and JavaScript</p>
          <p class="footer-note">Press ESC for a surprise</p>
        </div>
      </div>
      
      <div class="copyright">
        © ${new Date().getFullYear()} | MIKELA MANN 
      </div>
    </footer>
  `
}

// Alternative endnu mere sikker version med DOM manipulation (valgfri)
export function renderFooterSecure() {
  const footer = document.getElementById('footer')
  
  // Ryd eksisterende indhold
  footer.innerHTML = ''
  
  // Opret hovedstruktur
  const footerElement = document.createElement('footer')
  footerElement.className = 'site-footer'
  
  const footerContent = document.createElement('div')
  footerContent.className = 'footer-content'
  
  // Contact sektion
  const contactSection = document.createElement('div')
  contactSection.className = 'footer-section'
  
  const contactTitle = document.createElement('h3')
  contactTitle.textContent = 'Contact'
  contactSection.appendChild(contactTitle)
  
  // Email paragraph med sikker link
  const emailP = document.createElement('p')
  const emailIcon = document.createElement('span')
  emailIcon.className = 'contact-icon'
  emailIcon.textContent = '✉'
  
  const emailLink = document.createElement('a')
  emailLink.href = 'mailto:mikelamann1@gmail.com'
  emailLink.className = 'phone-link'
  emailLink.title = 'Send email til mikelamann1@gmail.com'
  emailLink.textContent = 'mikelamann1@gmail.com'
  
  emailP.appendChild(emailIcon)
  emailP.appendChild(document.createTextNode(' '))
  emailP.appendChild(emailLink)
  contactSection.appendChild(emailP)
  
  // Phone paragraph med sikker link
  const phoneP = document.createElement('p')
  const phoneIcon = document.createElement('span')
  phoneIcon.className = 'contact-icon'
  phoneIcon.textContent = '☎'
  
  const phoneLink = document.createElement('a')
  phoneLink.href = 'tel:+4527570712'
  phoneLink.className = 'phone-link'
  phoneLink.title = 'Ring til (+45) 27570712'
  phoneLink.textContent = '(+45) 27570712'
  
  phoneP.appendChild(phoneIcon)
  phoneP.appendChild(document.createTextNode(' '))
  phoneP.appendChild(phoneLink)
  contactSection.appendChild(phoneP)
  
  // Social sektion
  const socialSection = document.createElement('div')
  socialSection.className = 'footer-section'
  
  const socialTitle = document.createElement('h3')
  socialTitle.textContent = 'Social'
  socialSection.appendChild(socialTitle)
  
  const socialLinks = document.createElement('div')
  socialLinks.className = 'social-links'
  
  // Sikre sociale links
  const socialData = [
      {
          url: 'https://github.com/Mikela-Mann-MM',
          text: 'GitHub',
          title: 'Besøg min GitHub profil'
      },
      {
          url: 'https://www.linkedin.com/in/mikela-mann-2aa544365/',
          text: 'LinkedIn',
          title: 'Besøg min LinkedIn profil'
      },
      {
          url: 'https://www.instagram.com/mikelamann/',
          text: 'Instagram',
          title: 'Besøg min Instagram profil'
      }
  ]
  
  socialData.forEach(social => {
      const link = document.createElement('a')
      link.href = social.url
      link.className = 'social-link'
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
      link.title = social.title
      link.textContent = social.text
      socialLinks.appendChild(link)
  })
  
  socialSection.appendChild(socialLinks)
  
  // Info sektion
  const infoSection = document.createElement('div')
  infoSection.id = 'contact'
  infoSection.className = 'footer-section'
  
  const note1 = document.createElement('p')
  note1.className = 'footer-note'
  note1.innerHTML = 'Built with <span class="heart">♥</span> and JavaScript'
  
  const note2 = document.createElement('p')
  note2.className = 'footer-note'
  note2.textContent = 'Press ESC for a surprise'
  
  infoSection.appendChild(note1)
  infoSection.appendChild(note2)
  
  // Samle footer content
  footerContent.appendChild(contactSection)
  footerContent.appendChild(socialSection)
  footerContent.appendChild(infoSection)
  
  // Copyright
  const copyright = document.createElement('div')
  copyright.className = 'copyright'
  copyright.textContent = `© ${new Date().getFullYear()} | MIKELA MANN`
  
  // Samle alt
  footerElement.appendChild(footerContent)
  footerElement.appendChild(copyright)
  footer.appendChild(footerElement)
}

// Hjælpefunktion til validering af email og telefon (valgfri)
export function validateContactInfo(email, phone) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneRegex = /^\+?[\d\s\(\)\-]+$/
  
  return {
      emailValid: emailRegex.test(email),
      phoneValid: phoneRegex.test(phone)
  }
}
