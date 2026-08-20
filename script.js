const modal = document.querySelector("#project-modal");
const modalTitle = document.querySelector("#modal-title");
const closeButton = document.querySelector("[data-modal-close]");
let triggerButton = null;

function openModal(project, trigger) {
  triggerButton = trigger;
  modalTitle.textContent = project;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  closeButton.focus();
}

function closeModal() {
  if (modal.hidden) return;
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  triggerButton?.focus();
  triggerButton = null;
}

document.querySelectorAll(".project-tile").forEach((tile) => {
  tile.addEventListener("click", () => openModal(tile.dataset.project, tile));
});

modal.addEventListener("click", (event) => {
  const clickedCloseButton = event.target.closest("[data-modal-close]");
  const clickedOverlay = event.target === modal;

  if (clickedCloseButton || clickedOverlay) {
    event.preventDefault();
    closeModal();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) closeModal();
});
