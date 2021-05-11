import gallery from './gallery-items.js';

const ground = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.lightbox');
const closeButton = document.querySelector('.lightbox__button');
const overlay = document.querySelector('.lightbox__overlay');
const fullScreenPreview = lightbox.querySelector('.lightbox__image');

const markUp = gallery.reduce((acc, image, i) =>
(acc +=
  `<li class="gallery__item">
  <a
    class="gallery__link"
    href='${image.original}'
  >
    <img
      class="gallery__image"
      src='${image.preview}'
      data-source='${image.original}'
      data-index='${i}'
      alt='${image.description}'
    />
  </a>
</li>`
), ' ');

ground.insertAdjacentHTML('afterbegin', markUp);

function onClickHandler(e) {
  e.preventDefault();
  fullScreenPreview.setAttribute('data-index', '')
  
  if(e.target.nodeName === 'IMG') {
    lightbox.classList.add('is-open');
    fullScreenPreview.src = e.target.dataset.source;
    fullScreenPreview.alt = e.target.alt;
    fullScreenPreview.dataset.index = e.target.dataset.index;
    };
};

function onCloseButton(e) {
  if(e.target.classList.contains('lightbox__button')) {
    lightbox.classList.remove('is-open');
    fullScreenPreview.src = '';
    fullScreenPreview.alt = '';
    };
};

function onCloseOverlay(e) {
    if (e.target === e.currentTarget) {
      lightbox.classList.remove('is-open');
      fullScreenPreview.src = '';
      fullScreenPreview.alt = '';
    };
};
  
ground.addEventListener('click', onClickHandler);
overlay.addEventListener('click', onCloseOverlay);
closeButton.addEventListener('click', onCloseButton);

document.addEventListener('keydown', function(e) {
  
  const index = fullScreenPreview.dataset.index;
  const prevPicture = document.querySelector(`img[data-index='${index - 1}']`);
  const nextPicture = document.querySelector(`img[data-index='${Number(index) + 1}']`);
  
  switch (e.code) {
    case "ArrowLeft":
        if (e.code !== 'ArrowLeft' || prevPicture === null) {
          return
  }
        fullScreenPreview.src = prevPicture.dataset.source;
        fullScreenPreview.dataset.index = prevPicture.dataset.index;
        fullScreenPreview.alt = prevPicture.alt;
        break;
    case "ArrowRight":
        if (e.code !== 'ArrowRight' || nextPicture === null) {
          return
  }
        fullScreenPreview.src = nextPicture.dataset.source;
        fullScreenPreview.dataset.index = nextPicture.dataset.index;
        fullScreenPreview.alt = nextPicture.alt;
        break;
    case "Escape":
        if (e.code === 'Escape') {
        lightbox.classList.remove('is-open');
        fullScreenPreview.src = '';
        fullScreenPreview.alt = '';
    };
        break;
}
});

