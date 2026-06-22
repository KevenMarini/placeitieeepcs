import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  // Navigation scroll effect
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(5, 11, 20, 0.95)';
      navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
      navbar.style.padding = '0.5rem 0';
    } else {
      navbar.style.background = 'rgba(5, 11, 20, 0.8)';
      navbar.style.boxShadow = 'none';
      navbar.style.padding = '1rem 0';
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
});
