import { siteData } from "../data/content.js";

export class Header {
  constructor() {
    this.element = null;
    this.navMenu = null;
    this.navToggle = null;
    this.navClose = null;
    this.init();
  }

  init() {
    this.createElement();
    this.render();
    this.bindEvents();
  }

  createElement() {
    this.element = document.createElement("header");
    this.element.className = "header";
    this.element.id = "header";

    this.element.innerHTML = `
      <nav class="nav container">
        <div class="nav__logo">
          <img src="${siteData.personal.logo}" alt="${
      siteData.personal.name
    }" class="nav__logo-img">
        </div>
        
        <div class="nav__menu" id="nav-menu">
          <ul class="nav__list">
            ${siteData.navigation
              .map(
                (item, index) => `
              <li class="nav__item">
                <a href="${item.href}" class="nav__link ${
                  index === 0 ? "active-link" : ""
                }">${item.name}</a>
              </li>
            `
              )
              .join("")}
          </ul>
        </div>
        
        <div class="nav__toggle" id="nav-toggle">
          <i class="fas fa-bars"></i>
        </div>
      </nav>
    `;
  }

  bindEvents() {
    // Aguarda o elemento ser inserido no DOM
    setTimeout(() => {
      this.navMenu = document.getElementById("nav-menu");
      this.navToggle = document.getElementById("nav-toggle");
      this.navClose = document.getElementById("nav-close");

      // Menu toggle
      
      const menuBtn = document.getElementById("nav-toggle");
      const navbar = document.getElementById("nav-menu");
      const icon = menuBtn.querySelector("i");

      menuBtn.addEventListener("click", () => {
        navbar.classList.toggle("active");
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");
      });
      // if (this.navToggle) {
      //   this.navToggle.addEventListener("click", () => {
      //     this.navMenu.classList.add("show-menu");
      //   });
      // }

      // // Menu close
      // if (this.navClose) {
      //   this.navClose.addEventListener("click", () => {
      //     this.navMenu.classList.remove("show-menu");
      //   });
      // }

      // // Close menu on link click
      // const navLinks = this.element.querySelectorAll(".nav__link");
      // navLinks.forEach((link) => {
      //   link.addEventListener("click", () => {
      //     this.navMenu.classList.remove("show-menu");
      //   });
      // });

      // // Close menu when clicking outside
      // document.addEventListener("click", (e) => {
      //   if (
      //     !this.navMenu.contains(e.target) &&
      //     !this.navToggle.contains(e.target)
      //   ) {
      //     this.navMenu.classList.remove("show-menu");
      //   }
      // });

      // Header background on scroll
      window.addEventListener("scroll", this.handleScroll.bind(this));

      // Active link on scroll
      window.addEventListener("scroll", this.updateActiveLink.bind(this));
    }, 100);
  }

  handleScroll() {
    const nav = document.getElementById("header");
    if (window.scrollY >= 80) {
      nav.classList.add("scroll-header");
    } else {
      nav.classList.remove("scroll-header");
    }
  }

  updateActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 50;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        const activeLink = this.element.querySelector(
          `.nav__menu a[href*=${sectionId}]`
        );
        if (activeLink) {
          // Remove active class from all links
          this.element.querySelectorAll(".nav__link").forEach((link) => {
            link.classList.remove("active-link");
          });
          // Add active class to current link
          activeLink.classList.add("active-link");
        }
      }
    });
  }

  render() {
    const container =
      document.getElementById("header-container") || document.body;
    container.appendChild(this.element);
    return this.element;
  }
}