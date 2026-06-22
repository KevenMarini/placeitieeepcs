import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  // Navigation scroll effect
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
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
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // only animate once
      }
    });
  }, observerOptions);

  // Add fade-in class to main sections and cards
  const animatableElements = document.querySelectorAll('.section-header, .glass-card, .timeline-item, .feature-item, .prize-card');
  
  animatableElements.forEach(el => {
    el.classList.add('fade-in');
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
