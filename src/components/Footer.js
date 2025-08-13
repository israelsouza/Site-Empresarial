import { siteData } from "../data/content.js";

export class Footer {
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
    this.element = document.createElement("footer");
    this.element.className = "footer";

    this.element.innerHTML = `
      <div class="container">
        <div class="footer__container">
          <div class="footer__content">
            <div class="footer__logo">
              <h3 class="footer__title">${siteData.footer.title}</h3>
              <p class="footer__subtitle">${siteData.footer.subtitle}</p>
            </div>
            
            <div class="footer__links">
              <h4 class="footer__links-title">${siteData.footer.quickLinks}</h4>
              <ul class="footer__list">
                ${siteData.navigation
                  .map(
                    (item) => `
                  <li><a href="${item.href}" class="footer__link">${item.name}</a></li>
                `
                  )
                  .join("")}
              </ul>
            </div>

            <div class="footer__contact">
              <h4 class="footer__contact-title">${
                siteData.footer.contactTitle
              }</h4>
              <p class="footer__contact-info">
                <i class="fas fa-phone"></i>
                ${siteData.personal.phone}
              </p>
              <p class="footer__contact-info">
                <i class="fas fa-envelope"></i>
                ${siteData.personal.email}
              </p>
            </div>
          </div>
          
          <div class="footer__bottom">
            <p class="footer__copy">
              ${siteData.footer.copyright} <a href="${
      siteData.footer.developer.url
    }" target="_blank" class="footer__link">${
      siteData.footer.developer.name
    }</a>
            </p>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Smooth scrolling para os links do footer
    const footerLinks = this.element.querySelectorAll('a[href^="#"]');
    footerLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }

  render() {
    const container =
      document.getElementById("footer-container") || document.body;
    container.appendChild(this.element);
    return this.element;
  }
}
