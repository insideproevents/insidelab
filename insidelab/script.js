// INSIDE:LAB - Combined V2+V3 JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Header scroll effect
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 50) {
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    } else {
      header.style.boxShadow = 'none';
    }
  }, { passive: true });

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      const spans = menuToggle.querySelectorAll('span');
      
      if (mobileMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
    
    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }
  
  // Quote Form Submission
  const quoteForm = document.getElementById('quoteForm');
  const toast = document.getElementById('toast');
  
  if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show toast notification
      if (toast) {
        toast.classList.add('show');
        
        setTimeout(function() {
          toast.classList.remove('show');
        }, 3000);
      }
      
      // Reset form
      quoteForm.reset();
    });
  }
  
  // Newsletter Form
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (toast) {
        toast.querySelector('span').textContent = '¡Suscripción exitosa!';
        toast.classList.add('show');
        
        setTimeout(function() {
          toast.classList.remove('show');
          toast.querySelector('span').textContent = '¡Cotización enviada exitosamente!';
        }, 3000);
      }
      
      newsletterForm.reset();
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Animate elements on scroll
  const animateElements = document.querySelectorAll('.service-card, .equipment-item, .about-content');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // Parallax effect for hero background
  const heroBg = document.querySelector('.hero-bg img');
  if (heroBg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3;
      if (rate < window.innerHeight) {
        heroBg.style.transform = `translateY(${rate}px) scale(1.1)`;
      }
    }, { passive: true });
  }
  
  // Gear List button click
  const gearListBtn = document.querySelector('.btn-gear-list');
  
  if (gearListBtn) {
    gearListBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      if (toast) {
        toast.querySelector('span').textContent = '¡Lista de equipos PDF próximamente!';
        toast.classList.add('show');
        
        setTimeout(function() {
          toast.classList.remove('show');
          toast.querySelector('span').textContent = '¡Cotización enviada exitosamente!';
        }, 3000);
      }
    });
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  console.log('INSIDE:LAB - Website loaded successfully');
});
