import { Header } from './components/Header.js';
import { Home } from './components/Home.js';
import { About } from './components/About.js';
import { Services } from './components/Services.js';
import { Contact } from './components/Contact.js';
import { Footer } from './components/Footer.js';
import { AnimationUtils } from './utils/animations.js';
import { ScrollUtils } from './utils/scroll.js';
import { FormUtils } from './utils/forms.js';

class App {
  constructor() {
    this.init();
  }

  init() {
    this.loadComponents();
    this.setupAnimations();
    this.setupScroll();
    this.setupForms();
    this.setupMobileMenu();
    this.setupScrollEffects();
    this.setupLoadingAnimation();
  }

  loadComponents() {
    // Initialize components
    new Header();
    new Home();
    new About();
    new Services();
    new Contact();
    new Footer();
  }

  setupAnimations() {
    // Initialize animations similar to original script
    this.animationUtils = new AnimationUtils();
    
    // Observe elements for animation (same as original)
    const elementsToObserve = document.querySelectorAll('.home__data, .home__img, .sobre__card, .servico__card, .stats__container');
    elementsToObserve.forEach(el => this.animationUtils.observeElement(el));
  }

  setupScroll() {
    this.scrollUtils = new ScrollUtils();
    
    // Header background change on scroll (same as original)
    window.addEventListener('scroll', this.scrollHeader.bind(this));
    
    // Show scroll up button (same as original)
    window.addEventListener('scroll', this.scrollUp.bind(this));
    
    // Active link highlighting (same as original)
    window.addEventListener('scroll', this.scrollActive.bind(this));
    
    // Smooth scrolling for anchor links (same as original)
    this.setupSmoothScrolling();
  }

  scrollHeader() {
    const nav = document.getElementById('header');
    if(window.scrollY >= 80) {
      nav.classList.add('scroll-header');
    } else {
      nav.classList.remove('scroll-header');
    }
  }

  scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    if(window.scrollY >= 560) {
      scrollUp.classList.add('show-scroll');
    } else {
      scrollUp.classList.remove('show-scroll');
    }
  }

  scrollActive() {
    const scrollY = window.pageYOffset;
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 50;
      const sectionId = current.getAttribute('id');

      if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
        document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
      } else {
        document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
      }
    });
  }

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  setupMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');

    // Show menu
    if(navToggle){
      navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
      });
    }

    // Hide menu
    if(navClose){
      navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
      });
    }

    // Hide menu when clicking links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('show-menu');
      }
    });
  }

  setupScrollEffects() {
    // Parallax effect for images (same as original)
    window.addEventListener('scroll', this.debounce(() => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector('.home__img-main');
      
      if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
      }
    }, 20));

    // Hover effects for service cards (same as original)
    document.querySelectorAll('.servico__card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  setupLoadingAnimation() {
    // Loading animation (same as original)
    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
      
      // Animate elements on load
      setTimeout(() => {
        const homeData = document.querySelector('.home__data');
        const homeImg = document.querySelector('.home__img');
        
        if (homeData) homeData.classList.add('animate-fadeInLeft');
        if (homeImg) homeImg.classList.add('animate-fadeInRight');
      }, 500);
    });
  }

  setupForms() {
    this.formUtils = new FormUtils();
  }

  // Counter animation (same as original)
  animateCounters() {
    const counters = document.querySelectorAll('.stats__number');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const increment = target / 100;
      let current = 0;
      
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current) + '+';
          setTimeout(updateCounter, 20);
        } else {
          counter.textContent = target + '+';
        }
      };
      
      updateCounter();
    });
  }

  // Debounce utility (same as original)
  debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function(...args) {
      const context = this;
      const later = () => {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
