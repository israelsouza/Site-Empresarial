import { siteData } from "../data/content.js";

export class Home {
  constructor() {
    this.element = null;
    this.init();
  }

  init() {
    this.createElement();
    this.render();
    this.bindEvents();
  }

  createElement() {
    this.element = document.createElement("section");
    this.element.className = "home section";
    this.element.id = "home";

    this.element.innerHTML = `
      <div class="home__container container grid">
        <div class="home__content">
          <div class="home__data">
            <h3 class="home__subtitle">${siteData.hero.subtitle}</h3>
            <h1 class="home__title">
              ${siteData.hero.title} 
              <span class="home__title-accent">${
                siteData.hero.titleAccent
              }</span>
            </h1>
            <p class="home__description">
              ${siteData.hero.description}
            </p>
            <a href="#contato" class="button button--primary">
              Entre em Contato
              <i class="fas fa-arrow-right button__icon"></i>
            </a>
          </div>
        </div>
        
        <div class="home__img">
          <img src="${siteData.personal.profileImage}" alt="${
      siteData.personal.name
    }" class="home__img-main">
          <div class="home__img-overlay"></div>
        </div>
      </div>
      
      <!-- Stats -->
      <div class="home__stats">
        <div class="container">
          <div class="stats__container grid">
            ${siteData.stats
              .map(
                (stat) => `
              <div class="stats__card">
                <h3 class="stats__number" data-target="${stat.number}">0</h3>
                <span class="stats__text">${stat.text}</span>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Observer para animações
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("home__data")) {
            entry.target.classList.add("animate-fadeInLeft");
          }
          if (entry.target.classList.contains("home__img")) {
            entry.target.classList.add("animate-fadeInRight");
          }
          if (entry.target.classList.contains("stats__container")) {
            this.animateCounters();
            observer.unobserve(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observar elementos após inserção no DOM
    setTimeout(() => {
      const homeData = this.element.querySelector(".home__data");
      const homeImg = this.element.querySelector(".home__img");
      const statsContainer = this.element.querySelector(".stats__container");

      if (homeData) observer.observe(homeData);
      if (homeImg) observer.observe(homeImg);
      if (statsContainer) observer.observe(statsContainer);
    }, 100);

    // Smooth scrolling
    this.element
      .querySelector('a[href="#contato"]')
      .addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector("#contato");
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
  }

  animateCounters() {
    const counters = this.element.querySelectorAll(".stats__number");

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

  render() {
    const container =
      document.getElementById("home-container") || document.body;
    container.appendChild(this.element);
    return this.element;
  }
}
