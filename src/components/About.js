import { siteData } from "../data/content.js";

export class About {
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
    this.element.className = "sobre section";
    this.element.id = "sobre";

    this.element.innerHTML = `
      <div class="container">
        <div class="section__header">
          <h2 class="section__title">${siteData.about.title}</h2>
          <p class="section__subtitle">${siteData.about.subtitle}</p>
        </div>

        <div class="sobre__container grid">
          <div class="sobre__content">
            ${siteData.about.cards
              .map(
                (card) => `
              <div class="sobre__card">
                <div class="sobre__card-header">
                  <i class="${card.icon} sobre__card-icon"></i>
                  <h3 class="sobre__card-title">${card.title}</h3>
                </div>
                <p class="sobre__card-description">
                  ${card.description}
                </p>
              </div>
            `
              )
              .join("")}
          </div>

          <div class="sobre__achievements">
            <h3 class="sobre__achievements-title">${
              siteData.about.achievements.title
            }</h3>
            <div class="achievements__list">
              ${siteData.about.achievements.items
                .map(
                  (item) => `
                <div class="achievement__item">
                  <i class="${item.icon}"></i>
                  <span>${item.text}</span>
                </div>
              `
                )
                .join("")}
            </div>
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
          if (entry.target.classList.contains("sobre__card")) {
            entry.target.classList.add("animate-fadeInUp");
          }
          if (entry.target.classList.contains("achievement__item")) {
            entry.target.classList.add("animate-fadeInUp");
          }
        }
      });
    }, observerOptions);

    // Observar elementos após inserção no DOM
    setTimeout(() => {
      const cards = this.element.querySelectorAll(".sobre__card");
      const achievements = this.element.querySelectorAll(".achievement__item");

      cards.forEach((card, index) => {
        setTimeout(() => {
          observer.observe(card);
        }, index * 100);
      });

      achievements.forEach((achievement, index) => {
        setTimeout(() => {
          observer.observe(achievement);
        }, index * 50);
      });
    }, 100);
  }

  render() {
    const container =
      document.getElementById("about-container") || document.body;
    container.appendChild(this.element);
    return this.element;
  }
}
