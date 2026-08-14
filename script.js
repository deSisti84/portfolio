const modal = document.querySelector("#project-modal");
const modalTitle = document.querySelector("#modal-title");
const closeButton = document.querySelector(".close-button");
let triggerButton = null;

function openModal(project, trigger) {
  triggerButton = trigger;
  modalTitle.textContent = project;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  closeButton.focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  triggerButton?.focus();
}

document.querySelectorAll(".project-tile").forEach((tile) => {
  tile.addEventListener("click", () => openModal(tile.dataset.project, tile));
});

closeButton.addEventListener("click", closeModal);
modal.addEventListener("mousedown", (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) closeModal();
});
