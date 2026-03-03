document.querySelectorAll(".carousel").forEach(carousel => {
  const images = carousel.querySelectorAll("img");
  if (!images.length) return;

  let index = 0;

  const showImage = newIndex => {
    images[index].classList.remove("active");
    index = (newIndex + images.length) % images.length;
    images[index].classList.add("active");
  };

  const nextBtn = carousel.querySelector(".next");
  const prevBtn = carousel.querySelector(".prev");

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      showImage(index + 1);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      showImage(index - 1);
    });
  }
});

// Modal de detalhes de projetos
const modalBackdrop = document.getElementById("project-modal");
if (modalBackdrop) {
  const titleEl = document.getElementById("project-modal-title");
  const descEl = document.getElementById("project-modal-description");
  const techEl = document.getElementById("project-modal-tech");
  const mainImageEl = document.getElementById("project-modal-image");
  const githubEl = document.getElementById("project-modal-github");
  const demoEl = document.getElementById("project-modal-demo");
  const closeBtn = document.getElementById("project-modal-close");
  const modalPrev = modalBackdrop.querySelector(".modal-prev");
  const modalNext = modalBackdrop.querySelector(".modal-next");

  let modalImages = [];
  let modalIndex = 0;

  const updateModalImage = () => {
    if (!mainImageEl || !modalImages.length) return;
    mainImageEl.src = modalImages[modalIndex];
  };

  const openModalForCard = card => {
    const title = card.dataset.title || "";
    const description = card.dataset.description || "";
    const tech = card.dataset.tech || "";
    const github = card.dataset.github || "";
    const demo = card.dataset.demo || "";

    titleEl.textContent = title;
    descEl.textContent = description;

    techEl.innerHTML = "";
    if (tech) {
      tech.split(",").map(t => t.trim()).forEach(t => {
        if (!t) return;
        const span = document.createElement("span");
        span.textContent = t;
        techEl.appendChild(span);
      });
    }

    const images = card.querySelectorAll(".carousel img");
    modalImages = Array.from(images).map(img => img.src);
    modalIndex = 0;
    updateModalImage();

    if (github) {
      githubEl.href = github;
      githubEl.style.display = "inline-flex";
    } else {
      githubEl.style.display = "none";
    }

    if (demo) {
      demoEl.href = demo;
      demoEl.style.display = "inline-flex";
    } else {
      demoEl.style.display = "none";
    }

    modalBackdrop.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modalBackdrop.classList.remove("open");
    document.body.style.overflow = "";
  };

  document.querySelectorAll(".project-details-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".project-card");
      if (card) {
        openModalForCard(card);
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  if (modalPrev) {
    modalPrev.addEventListener("click", () => {
      if (!modalImages.length) return;
      modalIndex = (modalIndex - 1 + modalImages.length) % modalImages.length;
      updateModalImage();
    });
  }

  if (modalNext) {
    modalNext.addEventListener("click", () => {
      if (!modalImages.length) return;
      modalIndex = (modalIndex + 1) % modalImages.length;
      updateModalImage();
    });
  }

  modalBackdrop.addEventListener("click", event => {
    if (event.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modalBackdrop.classList.contains("open")) {
      closeModal();
    }
  });
}