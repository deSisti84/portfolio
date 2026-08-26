const previewModal = document.querySelector("#project-modal");
const previewTitle = document.querySelector("#modal-title");
const securityGallery = document.querySelector("#security-gallery");
const videoPlaceholder = document.querySelector("#video-placeholder");
const cvPreview = document.querySelector("#cv-preview");
const cvImage = document.querySelector("[data-cv-image]");
const cvCount = document.querySelector("[data-cv-count]");
const galleryFolders = document.querySelector("[data-gallery-folders]");
const galleryViewer = document.querySelector("[data-gallery-viewer]");
const galleryImage = document.querySelector("[data-gallery-image]");
const galleryCount = document.querySelector("[data-gallery-count]");
const galleries = {
  presentation: ["1.png", "2.png", "3.png", "4.png"].map(name => `assets/security-training/presentation/${name}`),
  training: ["Concl.png", "Mod.png", "Mod1.png", "Mod2.png", "Mod3.png", "Mod4.png", "Mod5.png", "Mod6.png"].map(name => `assets/security-training/training/${name}`),
  projects: ["TM.png", "Gl1.png", "In1.png", "In2.png"].map(name => `assets/projects-from-scratch/projects/${name}`),
};
const cvImages = ["1.png", "2.png", "3.png", "4.png", "5.png"].map(name => `assets/curriculum-vitae/${name}`);
let activeModal = null;
let triggerButton = null;
let activeGallery = [];
let activeImageIndex = 0;
let cvImageIndex = 0;

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
  cvImageIndex = 0;
  renderCvImage();
}

function showFolders() {
  galleryFolders.hidden = false;
  galleryViewer.hidden = true;
  activeGallery = [];
  activeImageIndex = 0;
}

function renderGalleryImage() {
  galleryImage.src = activeGallery[activeImageIndex];
  galleryImage.alt = `Project gallery image ${activeImageIndex + 1}`;
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

function renderCvImage() {
  if (!cvImage) return;
  cvImage.src = cvImages[cvImageIndex];
  cvImage.alt = `Curriculum vitae work experience ${cvImageIndex + 1}`;
  cvCount.textContent = `${cvImageIndex + 1} / ${cvImages.length}`;
}

function changeCvImage(direction) {
  cvImageIndex = (cvImageIndex + direction + cvImages.length) % cvImages.length;
  renderCvImage();
}

document.querySelectorAll(".project-tile").forEach((tile) => {
  tile.addEventListener("click", () => {
    previewTitle.textContent = tile.dataset.project;
    const isGalleryProject = tile.dataset.project === "Security trainings" || tile.dataset.project === "Projects from Scratch";
    const isCv = tile.dataset.project === "Curriculum vitae";
    securityGallery.hidden = !isGalleryProject;
    cvPreview.hidden = !isCv;
    videoPlaceholder.hidden = isGalleryProject || isCv;
    document.querySelectorAll("[data-gallery-folder]").forEach(folder => {
      const isProjectsFolder = folder.dataset.galleryFolder === "projects";
      folder.hidden = tile.dataset.project === "Projects from Scratch" ? !isProjectsFolder : isProjectsFolder;
    });
    galleryFolders.classList.toggle("single-folder", tile.dataset.project === "Projects from Scratch");
    if (isCv) { cvImageIndex = 0; renderCvImage(); }
    showFolders();
    openModal(previewModal, tile);
  });
});

document.querySelectorAll("[data-gallery-folder]").forEach(folder => folder.addEventListener("click", () => openGallery(folder.dataset.galleryFolder)));
document.querySelector("[data-gallery-back]").addEventListener("click", showFolders);
document.querySelector("[data-gallery-prev]").addEventListener("click", () => changeGalleryImage(-1));
document.querySelector("[data-gallery-next]").addEventListener("click", () => changeGalleryImage(1));
document.querySelector("[data-cv-prev]").addEventListener("click", () => changeCvImage(-1));
document.querySelector("[data-cv-next]").addEventListener("click", () => changeCvImage(1));

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
  if (activeModal === previewModal && !cvPreview.hidden && event.key === "ArrowLeft") changeCvImage(-1);
  if (activeModal === previewModal && !cvPreview.hidden && event.key === "ArrowRight") changeCvImage(1);
});
