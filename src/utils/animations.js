export class AnimationUtils {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.handleIntersection(entry.target);
        }
      });
    }, this.observerOptions);
  }

  handleIntersection(element) {
    // Add animation classes based on element type
    if (element.classList.contains("home__data")) {
      element.classList.add("animate-fadeInLeft");
    }
    if (element.classList.contains("home__img")) {
      element.classList.add("animate-fadeInRight");
    }
    if (
      element.classList.contains("sobre__card") ||
      element.classList.contains("servico__card") ||
      element.classList.contains("contato__card")
    ) {
      element.classList.add("animate-fadeInUp");
    }

    // Trigger counter animation for stats section
    if (element.classList.contains("stats__container")) {
      this.animateCounters();
      this.observer.unobserve(element); // Only animate once
      return;
    }

    // Unobserve after animation
    this.observer.unobserve(element);
  }

  observeElement(element) {
    if (element) {
      this.observer.observe(element);
    }
  }

  observeElements(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
      setTimeout(() => {
        this.observeElement(element);
      }, index * 100);
    });
  }

  // Parallax effect for images
  static initParallax() {
    window.addEventListener(
      "scroll",
      AnimationUtils.debounce(() => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll(".home__img-main");

        parallaxElements.forEach((element) => {
          const speed = scrolled * 0.3;
          element.style.transform = `translateY(${speed}px)`;
        });
      })
    );
  }

  // Hover effects for service cards
  static initHoverEffects() {
    const serviceCards = document.querySelectorAll(".servico__card");
    serviceCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-10px) scale(1.02)";
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
      });
    });
  }

  // Counter animation
  static animateCounters() {
    const counters = document.querySelectorAll(".stats__number");

    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"));
      const increment = target / 100;
      let current = 0;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current) + "+";
          setTimeout(updateCounter, 20);
        } else {
          counter.textContent = target + "+";
        }
      };

      updateCounter();
    });
  }

  // Counter animation
  animateCounters() {
    const counters = document.querySelectorAll(".stats__number");

    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target"));
      const increment = target / 100;
      let current = 0;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current) + "+";
          setTimeout(updateCounter, 20);
        } else {
          counter.textContent = target + "+";
        }
      };

      updateCounter();
    });
  }

  // Debounce utility
  static debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  }

  // Loading animation
  static initLoadingAnimation() {
    window.addEventListener("load", () => {
      document.body.classList.add("loaded");

      setTimeout(() => {
        const homeData = document.querySelector(".home__data");
        const homeImg = document.querySelector(".home__img");

        if (homeData) homeData.classList.add("animate-fadeInLeft");
        if (homeImg) homeImg.classList.add("animate-fadeInRight");
      }, 500);
    });
  }
}
