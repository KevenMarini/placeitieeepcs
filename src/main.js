import './style.css';

document.addEventListener('DOMContentLoaded', () => {

  // Helper for typing HTML elements
  function typeWriterHTML(element, htmlString, speed, callback) {
    if(!element) return;
    element.innerHTML = '';
    element.style.visibility = 'visible';
    let i = 0;
    let isTag = false;
    let text = '';

    function type() {
      if (i < htmlString.length) {
        if (htmlString.charAt(i) === '<') {
          isTag = true;
        }
        text += htmlString.charAt(i);
        element.innerHTML = text;
        i++;
        if (isTag) {
          if (htmlString.charAt(i-1) === '>') {
            isTag = false;
          }
          type(); // No delay for tags
        } else {
          setTimeout(type, speed);
        }
      } else if (callback) {
        callback();
      }
    }
    type();
  }

  const heroTagline = document.getElementById('heroTagline');
  const heroTitle = document.getElementById('heroTitle');
  const heroSubtitle = document.getElementById('heroSubtitle');

  const taglineHTML = `IDEAS DON'T JUST SHAPE THE FUTURE. <br/><span class="text-neon">THEY BUILD IT.</span>`;
  const titleHTML = `PLACEIT <span class="year">2026</span>`;
  const subtitleHTML = `BLUEPRINTING TOMORROW'S SOLUTIONS`;

  function startHeroTypewriter() {
    if(!heroTagline) return;
    typeWriterHTML(heroTagline, taglineHTML, 20, () => {
      typeWriterHTML(heroTitle, titleHTML, 50, () => {
        typeWriterHTML(heroSubtitle, subtitleHTML, 20);
      });
    });
  }

  // Advanced Intro Loader Logic
  const introLoader = document.getElementById('introLoader');
  const typewriterText = document.getElementById('typewriterText');
  const glitchWrapper = document.querySelector('.glitch-wrapper');
  const presentsText = document.getElementById('presentsText');
  const placeitLogo = document.getElementById('placeitLogo');

  if(introLoader && typewriterText) {
    const textToType = "IEEE Professional Communication Society";
    let i = 0;
    
    // Typewriter effect
    function typeWriter() {
      if (i < textToType.length) {
        typewriterText.innerHTML += textToType.charAt(i);
        i++;
        setTimeout(typeWriter, 50); // Speed of typing
      } else {
        // After typing, show presents glitch
        setTimeout(() => {
          glitchWrapper.style.visibility = 'visible';
          presentsText.innerText = "PRESENTS";
          
          // Then show the neon logo
          setTimeout(() => {
            placeitLogo.classList.add('show');
            
            // Finally fade out the loader
            setTimeout(() => {
              introLoader.classList.add('intro-hidden');
              document.body.style.overflow = 'auto'; // restore scroll
              
              // Trigger hero typewriter
              startHeroTypewriter();
              
              // Remove loader from DOM entirely after fade
              setTimeout(() => {
                introLoader.remove();
              }, 1000);
            }, 2500);
            
          }, 1500);
          
        }, 800);
      }
    }
    
    // Start animation shortly after load
    setTimeout(typeWriter, 500);
  } else {
    setTimeout(startHeroTypewriter, 500);
  }

  // Custom Mouse Glow Follower
  const mouseGlow = document.getElementById('mouseGlow');
  if (mouseGlow) {
    document.addEventListener('mousemove', (e) => {
      requestAnimationFrame(() => {
        mouseGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      });
    });
    
    // Hide glow when cursor leaves window
    document.addEventListener('mouseleave', () => {
      mouseGlow.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      mouseGlow.style.opacity = '1';
    });
  }

  // Navigation scroll effect
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= (sectionTop - 250)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === `#${current}`) {
        a.classList.add('active');
      }
    });

    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(5, 11, 20, 0.95)';
      navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
      navbar.style.padding = '0.25rem 0';
    } else {
      navbar.style.background = 'rgba(5, 11, 20, 0.8)';
      navbar.style.boxShadow = 'none';
      navbar.style.padding = '0.5rem 0';
    }
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        // Remove class when scrolling out of view to re-animate when scrolling back
        entry.target.classList.remove('visible');
      }
    });
  }, observerOptions);

  // Add scroll-anim class to main sections and cards
  const animatableElements = document.querySelectorAll('.section-header, .glass-card, .timeline-item, .feature-item, .prize-card');
  
  animatableElements.forEach(el => {
    el.classList.add('scroll-anim');
    observer.observe(el);
  });

  // FAB Logic
  const fabToggle = document.getElementById('fabToggle');
  const fabLinks = document.querySelector('.fab-links');
  
  if(fabToggle && fabLinks) {
    fabToggle.addEventListener('click', () => {
      fabLinks.classList.toggle('open');
      fabToggle.classList.toggle('active');
    });
  }

  // Modal Logic
  const registerBtn = document.getElementById('registerBtn');
  const registerModal = document.getElementById('registerModal');
  const closeModal = document.getElementById('closeModal');

  if(registerBtn && registerModal && closeModal) {
    registerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      registerModal.classList.add('show');
    });

    closeModal.addEventListener('click', () => {
      registerModal.classList.remove('show');
    });

    // Close when clicking outside
    registerModal.addEventListener('click', (e) => {
      if(e.target === registerModal) {
        registerModal.classList.remove('show');
      }
    });
  }

  // Poster Lightbox Logic
  const posterTrigger = document.getElementById('posterTrigger');
  const posterModal = document.getElementById('posterModal');
  const closePosterModal = document.getElementById('closePosterModal');

  if(posterTrigger && posterModal && closePosterModal) {
    posterTrigger.addEventListener('click', () => {
      posterModal.classList.add('show');
    });

    closePosterModal.addEventListener('click', () => {
      posterModal.classList.remove('show');
    });

    posterModal.addEventListener('click', (e) => {
      if(e.target === posterModal) {
        posterModal.classList.remove('show');
      }
    });
  }

  // Hamburger Menu Logic
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navItems = document.querySelectorAll('.nav-item');

  if(hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = hamburgerBtn.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    // Close menu when a link is clicked
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = hamburgerBtn.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      });
    });
  }
});
