const previewModal = document.querySelector("#project-modal");
const previewTitle = document.querySelector("#modal-title");
const securityGallery = document.querySelector("#security-gallery");
const videoPlaceholder = document.querySelector("#video-placeholder");
const galleryFolders = document.querySelector("[data-gallery-folders]");
const galleryViewer = document.querySelector("[data-gallery-viewer]");
const galleryImage = document.querySelector("[data-gallery-image]");
const galleryCount = document.querySelector("[data-gallery-count]");
const galleries = {
  presentation: ["1.png", "2.png", "3.png", "4.png"].map(name => `assets/security-training/presentation/${name}`),
  training: ["Concl.png", "Mod.png", "Mod1.png", "Mod2.png", "Mod3.png", "Mod4.png", "Mod5.png", "Mod6.png"].map(name => `assets/security-training/training/${name}`),
};
let activeModal = null;
let triggerButton = null;
let activeGallery = [];
let activeImageIndex = 0;

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
  showFolders();
}

function showFolders() {
  galleryFolders.hidden = false;
  galleryViewer.hidden = true;
  activeGallery = [];
  activeImageIndex = 0;
}

function renderGalleryImage() {
  galleryImage.src = activeGallery[activeImageIndex];
  galleryImage.alt = `Security training gallery image ${activeImageIndex + 1}`;
  galleryCount.textContent = `${activeImageIndex + 1} / ${activeGallery.length}`;
}

function openGallery(name) {
  activeGallery = galleries[name];
  activeImageIndex = 0;
  galleryFolders.hidden = true;
  galleryViewer.hidden = false;
  renderGalleryImage();
}

function changeGalleryImage(direction) {
  if (!activeGallery.length) return;
  activeImageIndex = (activeImageIndex + direction + activeGallery.length) % activeGallery.length;
  renderGalleryImage();
}

document.querySelectorAll(".project-tile").forEach((tile) => {
  tile.addEventListener("click", () => {
    if (tile.dataset.modalTarget === "cv-modal") {
      openModal(document.querySelector("#cv-modal"), tile);
      return;
    }
    previewTitle.textContent = tile.dataset.project;
    const isSecurityGallery = tile.dataset.project === "Security trainings";
    securityGallery.hidden = !isSecurityGallery;
    videoPlaceholder.hidden = isSecurityGallery;
    showFolders();
    openModal(previewModal, tile);
  });
});

document.querySelectorAll("[data-gallery-folder]").forEach(folder => folder.addEventListener("click", () => openGallery(folder.dataset.galleryFolder)));
document.querySelector("[data-gallery-back]").addEventListener("click", showFolders);
document.querySelector("[data-gallery-prev]").addEventListener("click", () => changeGalleryImage(-1));
document.querySelector("[data-gallery-next]").addEventListener("click", () => changeGalleryImage(1));

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
  if (activeModal === previewModal && activeGallery.length && event.key === "ArrowLeft") changeGalleryImage(-1);
  if (activeModal === previewModal && activeGallery.length && event.key === "ArrowRight") changeGalleryImage(1);
});
