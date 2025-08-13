export class ScrollUtils {
  constructor() {
    this.init();
  }

  init() {
    this.createScrollUpButton();
    this.handleScrollEvents();
  }

  createScrollUpButton() {
    const scrollUp = document.createElement("a");
    scrollUp.href = "#home";
    scrollUp.className = "scrollup";
    scrollUp.id = "scroll-up";
    scrollUp.innerHTML = '<i class="fas fa-arrow-up scrollup__icon"></i>';

    document.body.appendChild(scrollUp);

    // Add click handler
    scrollUp.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  handleScrollEvents() {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateScrollUp();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
  }

  updateScrollUp() {
    const scrollUp = document.getElementById("scroll-up");
    if (window.scrollY >= 560) {
      scrollUp.classList.add("show-scroll");
    } else {
      scrollUp.classList.remove("show-scroll");
    }
  }

  // Smooth scrolling for all anchor links
  static initSmoothScrolling() {
    document.addEventListener("click", (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link) {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const target = document.querySelector(targetId);
        if (target) {
          const headerHeight = document.querySelector(".header").offsetHeight;
          const targetPosition = target.offsetTop - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  }

  // Debounce function for performance
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
}
