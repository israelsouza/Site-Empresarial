import { siteData } from "../data/content.js";

export class Services {
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
    this.element.className = "servicos section";
    this.element.id = "servicos";

    this.element.innerHTML = `
      <div class="container">
        <div class="section__header">
          <h2 class="section__title">${siteData.services.title}</h2>
          <p class="section__subtitle">${siteData.services.subtitle}</p>
        </div>

        <div class="servicos__container grid">
          ${siteData.services.items
            .map(
              (service) => `
            <div class="servico__card">
              <div class="servico__icon">
                <i class="${service.icon}"></i>
              </div>
              <h3 class="servico__title">${service.title}</h3>
              <p class="servico__description">
                ${service.description}
              </p>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      
      <!-- CTA Section -->
      <section class="cta section">
        <div class="container">
          <div class="cta__container">
            <div class="cta__content">
              <h2 class="cta__title">
                ${siteData.cta.title}
              </h2>
              <a href="#contato" class="button button--secondary">
                ${siteData.cta.buttonText}
                <i class="fas fa-arrow-right button__icon"></i>
              </a>
            </div>
            <div class="cta__img">
              <img src="${siteData.personal.palestraImage}" alt="${
      siteData.personal.name
    } palestrando" class="cta__img-main">
            </div>
          </div>
        </div>
      </section>
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
          if (entry.target.classList.contains("servico__card")) {
            entry.target.classList.add("animate-fadeInUp");
          }
        }
      });
    }, observerOptions);

    // Observar elementos após inserção no DOM
    setTimeout(() => {
      const serviceCards = this.element.querySelectorAll(".servico__card");

      serviceCards.forEach((card, index) => {
        setTimeout(() => {
          observer.observe(card);
        }, index * 100);
      });

      // Hover effects para os cards
      serviceCards.forEach((card) => {
        card.addEventListener("mouseenter", function () {
          this.style.transform = "translateY(-10px) scale(1.02)";
        });

        card.addEventListener("mouseleave", function () {
          this.style.transform = "translateY(0) scale(1)";
        });
      });
    }, 100);

    // Smooth scrolling para o CTA
    const ctaButton = this.element.querySelector('.cta a[href="#contato"]');
    if (ctaButton) {
      ctaButton.addEventListener("click", (e) => {
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
  }

  render() {
    const container =
      document.getElementById("services-container") || document.body;
    container.appendChild(this.element);
    return this.element;
  }
}
