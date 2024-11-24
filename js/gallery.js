'use strict';

const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
];

const galleryContainer = document.querySelector('.gallery');

// Генеруємо розмітку галереї
const galleryMarkup = images
  .map(
    ({ preview, original, description }) => `
  <li class="gallery-item">
    <a class="gallery-link" href="${original}">
      <img
        class="gallery-image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>
`
  )
  .join('');

galleryContainer.innerHTML = galleryMarkup;

let currentIndex = 0;

// Відображення зображення в модальному вікні
const showImage = (index) => {
  const { original, description } = images[index];
  return `
    <div class="modal-content">
      <button class="btn-close">&times;</button>
      <button class="btn-prev">&larr;</button>
      <img src="${original}" alt="${description}" class="modal-image">
      <button class="btn-next">&rarr;</button>
    </div>
  `;
};

// Обробка кліка по галереї
galleryContainer.addEventListener('click', (event) => {
  event.preventDefault();

  if (!event.target.classList.contains('gallery-image')) return;

  const originalImageURL = event.target.dataset.source;
  currentIndex = images.findIndex(
    (image) => image.original === originalImageURL
  );

  const instance = basicLightbox.create(showImage(currentIndex), {
    onShow: (instance) => {
      const modalElement = instance.element();

      // Закриття модального вікна
      modalElement.querySelector('.btn-close').addEventListener('click', () => {
        instance.close();
      });

      // Кнопка "Назад"
      modalElement.querySelector('.btn-prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        instance.element().innerHTML = showImage(currentIndex);
        addListeners(instance);
      });

      // Кнопка "Вперед"
      modalElement.querySelector('.btn-next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        instance.element().innerHTML = showImage(currentIndex);
        addListeners(instance);
      });
    },
  });

  instance.show();
});

// Додавання обробників подій для кнопок після зміни зображення
const addListeners = (instance) => {
  const modalElement = instance.element();

  modalElement.querySelector('.btn-close').addEventListener('click', () => {
    instance.close();
  });

  modalElement.querySelector('.btn-prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    instance.element().innerHTML = showImage(currentIndex);
    addListeners(instance);
  });

  modalElement.querySelector('.btn-next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    instance.element().innerHTML = showImage(currentIndex);
    addListeners(instance);
  });
};
