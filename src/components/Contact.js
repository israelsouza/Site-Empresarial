import { siteData } from "../data/content.js";

export class Contact {
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
    this.element.className = "contato section";
    this.element.id = "contato";

    this.element.innerHTML = `
      <div class="container">
        <div class="section__header">
          <h2 class="section__title">${siteData.contact.title}</h2>
          <p class="section__subtitle">${siteData.contact.subtitle}</p>
        </div>

        <div class="contato__container grid">
          <div class="contato__info">
            ${siteData.contact.info
              .map(
                (info) => `
              <div class="contato__card">
                <i class="${info.icon} contato__icon"></i>
                <h3 class="contato__title">${info.title}</h3>
                <p class="contato__data">${info.data}</p>
              </div>
            `
              )
              .join("")}

            <div class="contato__social">
              <h3 class="contato__social-title">${
                siteData.contact.social.title
              }</h3>
              <div class="contato__social-links">
                ${siteData.contact.social.links
                  .map(
                    (link) => `
                  <a href="${link.href}" class="contato__social-link">
                    <i class="${link.icon}"></i>
                  </a>
                `
                  )
                  .join("")}
              </div>
            </div>
          </div>

          <form class="contato__form">
            <div class="contato__form-group">
              <input type="text" name="name" placeholder="Seu nome" class="contato__input" required>
            </div>
            <div class="contato__form-group">
              <input type="email" name="email" placeholder="Seu email" class="contato__input" required>
            </div>
            <div class="contato__form-group">
              <input type="tel" name="phone" placeholder="Seu telefone" class="contato__input">
            </div>
            <div class="contato__form-group">
              <textarea name="message" placeholder="Sua mensagem" class="contato__textarea" rows="5" required></textarea>
            </div>
            <button type="submit" class="button button--primary">
              Enviar Mensagem
              <i class="fas fa-paper-plane button__icon"></i>
            </button>
          </form>
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
          if (entry.target.classList.contains("contato__card")) {
            entry.target.classList.add("animate-fadeInUp");
          }
        }
      });
    }, observerOptions);

    // Observar elementos após inserção no DOM
    setTimeout(() => {
      const contactCards = this.element.querySelectorAll(".contato__card");

      contactCards.forEach((card, index) => {
        setTimeout(() => {
          observer.observe(card);
        }, index * 100);
      });
    }, 100);

    // Form submission
    const form = this.element.querySelector(".contato__form");
    form.addEventListener("submit", this.handleFormSubmit.bind(this));

    // Input validations and interactions
    const inputs = this.element.querySelectorAll(
      ".contato__input, .contato__textarea"
    );
    inputs.forEach((input) => {
      input.addEventListener("focus", function () {
        this.parentElement.classList.add("focus");
      });

      input.addEventListener("blur", function () {
        if (!this.value) {
          this.parentElement.classList.remove("focus");
        }
      });
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Simple validation
    if (!data.name || !data.email || !data.message) {
      this.showMessage(
        "Por favor, preencha todos os campos obrigatórios.",
        "error"
      );
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      this.showMessage("Por favor, insira um email válido.", "error");
      return;
    }

    // Simulate form submission
    const submitButton = e.target.querySelector(".button");
    const originalText = submitButton.innerHTML;

    submitButton.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitButton.disabled = true;

    setTimeout(() => {
      this.showMessage(
        "Mensagem enviada com sucesso! Entraremos em contato em breve.",
        "success"
      );
      e.target.reset();
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;

      // Remove focus classes
      const formGroups = this.element.querySelectorAll(".contato__form-group");
      formGroups.forEach((group) => group.classList.remove("focus"));
    }, 2000);
  }

  showMessage(message, type) {
    // Remove existing messages
    const existingMessage = this.element.querySelector(".form-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create new message
    const messageElement = document.createElement("div");
    messageElement.className = `form-message form-message--${type}`;
    messageElement.textContent = message;

    // Insert message before form
    const form = this.element.querySelector(".contato__form");
    form.parentNode.insertBefore(messageElement, form);

    // Remove message after 5 seconds
    setTimeout(() => {
      messageElement.remove();
    }, 5000);
  }

  render() {
    const container =
      document.getElementById("contact-container") || document.body;
    container.appendChild(this.element);
    return this.element;
  }
}
