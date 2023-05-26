import { galleryItems } from "./gallery-items.js";

const galleryRef = document.querySelector(".gallery");

const createGalleryMarkup = (images) =>
  images
    .map(
      ({ original, preview, description }) => `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>`
    )
    .join("");

galleryRef.innerHTML = createGalleryMarkup(galleryItems);

const showImage = (event) => {
  if (event.target.nodeName !== "IMG") {
    return;
  }
  event.preventDefault();

  const image = event.target.dataset.source;
  const galleryModal = basicLightbox.create(`
  <img src="${image}" width="800" height="600">
  `);

  galleryModal.show();

  const closeModalOnKey = (event) => {
    if (event.code === "Escape") {
      galleryModal.close();
      window.removeEventListener("keydown", closeModalOnKey);
    }
  };

  window.addEventListener("keydown", closeModalOnKey);
};

galleryRef.addEventListener("click", showImage);
