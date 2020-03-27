import galleryItems from './gallery-items.js'

const refs = {
    gallery: document.querySelector('.js-gallery'),
    divLightbox: document.querySelector('.lightbox'),
    closeModalBtn: document.querySelector('button[data-action="close-modal"]'),
}



// ?RENDER GALLERY

function renderGallery ({preview, original, description}) {
    return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}">
    <img
      class="gallery__image"
      src='${preview}'
      data-source='${original}'
      alt='${description}'
    />
  </a>
</li>
    `
}

function createGallery (arr) {
    return arr.map(element => {
        return renderGallery (element);
    }).join('');
}

function addToHTML(parent, builder) {
    parent.insertAdjacentHTML('beforeend', builder);
}


addToHTML(refs.gallery, createGallery(galleryItems))

// ?EVENTS HANDELING
const overlay = document.querySelector('.lightbox__overlay');


refs.gallery.addEventListener('click', openModal)



function openModal(e) {
e.preventDefault();
if (e.target.nodeName === "IMG") {
refs.divLightbox.classList.add('is-open');
refs.divLightbox.querySelector('.lightbox__image').src = e.target.dataset.source;
window.addEventListener('keydown', handleKeyPress);
}
}




refs.closeModalBtn.addEventListener('click', closeModal);

refs.divLightbox.addEventListener('click', closeModal);



function closeModal(e) {
    if (e.target.nodeName !== "IMG") {
refs.divLightbox.classList.remove('is-open');
refs.divLightbox.querySelector('.lightbox__image').src = '';
window.removeEventListener('keydown', handleKeyPress);
    }
}



function handleKeyPress(e){
if(event.code !== 'Escape') {
    return;
}
closeModal();
 }



