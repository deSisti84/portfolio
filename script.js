const previewModal = document.querySelector("#project-modal");
const previewTitle = document.querySelector("#modal-title");
let activeModal = null;
let triggerButton = null;

function openModal(modal, trigger) {
  triggerButton = trigger;
  activeModal = modal;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  modal.querySelector("[data-modal-close]")?.focus();
}

function closeModal() {
  if (!activeModal) return;
  activeModal.hidden = true;
  document.body.classList.remove("modal-open");
  triggerButton?.focus();
  activeModal = null;
  triggerButton = null;
}

document.querySelectorAll(".project-tile").forEach((tile) => {
  tile.addEventListener("click", () => {
    if (tile.dataset.modalTarget === "cv-modal") {
      openModal(document.querySelector("#cv-modal"), tile);
      return;
    }
    previewTitle.textContent = tile.dataset.project;
    openModal(previewModal, tile);
  });
});

document.querySelectorAll(".modal-backdrop").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target.closest("[data-modal-close]") || event.target === modal) {
      event.preventDefault();
      closeModal();
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});
