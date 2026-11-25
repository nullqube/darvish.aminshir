
(() => {

  const languageWrapper = document.querySelector(".language-wrapper");
  const languageBtn = document.getElementById("languageBtn");
  const currentLanguage = document.getElementById("currentLanguage");

  const openMenu = document.getElementById("openMenu");
  const closeMenu = document.getElementById("closeMenu");
  const sidebarOverlay = document.getElementById("sidebarOverlay");

  const translations = {
    fa: {
      home: "صفحه اصلی",
      about: "درباره ما",
      products: "محصولات",
      catalog: "کاتالوگ",
      contact: "تماس با ما",
      language: "انتخاب زبان"
    },

    en: {
      home: "Home",
      about: "About Us",
      products: "Products",
      catalog: "Catalog",
      contact: "Contact Us",
      language: "Select Language"
    },

    ar: {
      home: "الرئيسية",
      about: "من نحن",
      products: "المنتجات",
      catalog: "الكتالوج",
      contact: "اتصل بنا",
      language: "اختر اللغة"
    }
  };

  // Sidebar controls

  function toggleSidebar(state) {
    document.body.classList.toggle("sidebar-open", state);
    document.body.style.overflow = state ? "hidden" : "";
  }

  openMenu?.addEventListener("click", () => toggleSidebar(true));

  closeMenu?.addEventListener("click", () => toggleSidebar(false));

  sidebarOverlay?.addEventListener("click", () => toggleSidebar(false));

  // Close sidebar with Escape

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      toggleSidebar(false);
      closeLanguageDropdown();
    }
  });

  // Desktop dropdown

  function closeLanguageDropdown() {
    languageWrapper?.classList.remove("open");
    languageBtn?.setAttribute("aria-expanded", "false");
  }

  languageBtn?.addEventListener("click", (e) => {
    e.stopPropagation();

    const isOpen = languageWrapper.classList.toggle("open");

    languageBtn.setAttribute("aria-expanded", isOpen);
  });

  // Close dropdown when clicking outside

  document.addEventListener("click", (e) => {
    if (!languageWrapper?.contains(e.target)) {
      closeLanguageDropdown();
    }
  });

  // Language switching

  function changeLanguage(lang) {

    const dictionary = translations[lang];

    if (!dictionary) return;

    document.documentElement.lang = lang;

    currentLanguage.textContent = lang.toUpperCase();

    document.querySelectorAll("[data-i18n]").forEach(element => {

      const key = element.dataset.i18n;

      if (dictionary[key]) {
        element.textContent = dictionary[key];
      }

    });

    document.querySelectorAll(".language-option").forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.lang === lang
      );

    });

    localStorage.setItem("aminshir-language", lang);
  }

  // Desktop and mobile language options

  document.querySelectorAll(".language-option").forEach(button => {

    button.addEventListener("click", () => {

      changeLanguage(button.dataset.lang);

      closeLanguageDropdown();

      toggleSidebar(false);

    });

  });

  // Restore saved language

  const savedLanguage = localStorage.getItem("aminshir-language") || "fa";

  changeLanguage(savedLanguage);

})();




