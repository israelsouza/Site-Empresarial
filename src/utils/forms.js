export class FormUtils {
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePhone(phone) {
    // Brazilian phone format validation
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    return phoneRegex.test(phone) || phone === "";
  }

  static formatPhone(phone) {
    // Remove all non-numeric characters
    const cleaned = phone.replace(/\D/g, "");

    // Apply Brazilian phone format
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (cleaned.length === 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }

    return phone;
  }

  static showMessage(container, message, type) {
    // Remove existing messages
    const existingMessage = container.querySelector(".form-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create new message
    const messageElement = document.createElement("div");
    messageElement.className = `form-message form-message--${type}`;
    messageElement.textContent = message;

    // Insert message
    const form = container.querySelector("form");
    form.parentNode.insertBefore(messageElement, form);

    // Remove message after 5 seconds
    setTimeout(() => {
      if (messageElement.parentNode) {
        messageElement.remove();
      }
    }, 5000);
  }

  static initFormValidation(form) {
    const inputs = form.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      // Real-time validation
      input.addEventListener("input", function () {
        FormUtils.validateField(this);
      });

      // Format phone input
      if (input.type === "tel") {
        input.addEventListener("input", function () {
          this.value = FormUtils.formatPhone(this.value);
        });
      }

      // Focus effects
      input.addEventListener("focus", function () {
        this.parentElement.classList.add("focus");
        this.classList.remove("error");
      });

      input.addEventListener("blur", function () {
        if (!this.value) {
          this.parentElement.classList.remove("focus");
        }
        FormUtils.validateField(this);
      });
    });
  }

  static validateField(field) {
    const value = field.value.trim();
    let isValid = true;

    // Remove existing error states
    field.classList.remove("error");
    const existingError = field.parentElement.querySelector(".field-error");
    if (existingError) {
      existingError.remove();
    }

    // Required field validation
    if (field.hasAttribute("required") && !value) {
      FormUtils.showFieldError(field, "Este campo é obrigatório");
      isValid = false;
    }

    // Email validation
    if (field.type === "email" && value && !FormUtils.validateEmail(value)) {
      FormUtils.showFieldError(field, "Por favor, insira um email válido");
      isValid = false;
    }

    // Phone validation
    if (field.type === "tel" && value && !FormUtils.validatePhone(value)) {
      FormUtils.showFieldError(field, "Por favor, insira um telefone válido");
      isValid = false;
    }

    // Name validation
    if (field.name === "name" && value && value.length < 2) {
      FormUtils.showFieldError(field, "Nome deve ter pelo menos 2 caracteres");
      isValid = false;
    }

    // Message validation
    if (field.name === "message" && value && value.length < 10) {
      FormUtils.showFieldError(
        field,
        "Mensagem deve ter pelo menos 10 caracteres"
      );
      isValid = false;
    }

    return isValid;
  }

  static showFieldError(field, message) {
    field.classList.add("error");

    const errorElement = document.createElement("span");
    errorElement.className = "field-error";
    errorElement.textContent = message;

    field.parentElement.appendChild(errorElement);
  }

  static validateForm(form) {
    const fields = form.querySelectorAll("input, textarea");
    let isValid = true;

    fields.forEach((field) => {
      if (!FormUtils.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  static resetForm(form) {
    form.reset();

    // Remove all error states
    const fields = form.querySelectorAll("input, textarea");
    fields.forEach((field) => {
      field.classList.remove("error");
      field.parentElement.classList.remove("focus");
    });

    // Remove error messages
    const errors = form.querySelectorAll(".field-error");
    errors.forEach((error) => error.remove());
  }

  // Simulate form submission to a backend service
  static async submitForm(formData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate successful submission
        resolve({
          success: true,
          message:
            "Mensagem enviada com sucesso! Entraremos em contato em breve.",
        });
      }, 2000);
    });
  }
}
