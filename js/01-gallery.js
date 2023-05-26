import { galleryItems } from "./gallery-items.js";

const galleryRef = document.querySelector(".gallery");

galleryRef.innerHTML = createGalleryMarkup(galleryItems);

galleryRef.addEventListener("click", showImage);

function createGalleryMarkup(images) {
  return images
    .map(
      (image) => `
    <li class="gallery__item">
    <a class="gallery__link" href="${image.original}">
    <img
    class="gallery__image"
    src="${image.preview}"
    data-source="${image.original}"
    alt="${image.description}"
    />
    </a>
    </li>`
    )
    .join("");
}

function showImage(event) {
  event.preventDefault();

  const image = event.target.dataset.source;
  const galleryModal = basicLightbox.create(`
  <img src="${image}" width="800" height="600">
  `);

  galleryModal.show();

  window.addEventListener("keydown", closeModalOnKey);

  function closeModalOnKey(event) {
    if (event.code === "Escape") {
      galleryModal.close();
      window.removeEventListener("keydown", closeModalOnKey);
    }
  }
}
