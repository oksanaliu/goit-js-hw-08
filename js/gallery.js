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
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
];

const galleryContainer = document.querySelector('.gallery');

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

const showImage = (index) => {
  const { original, description } = images[index];
  return `
    <div class="modal-content">
      <button class="btn-close" aria-label="Close">&times;</button>
      <button class="btn-prev">&larr;</button>
      <img src="${original}" alt="${description}" class="modal-image">
      <button class="btn-next">&rarr;</button>
    </div>
  `;
};

galleryContainer.addEventListener('click', (event) => {
  event.preventDefault();

  const isImage = event.target.classList.contains('gallery-image');
  if (!isImage) return;

  const originalImageURL = event.target.dataset.source;
  currentIndex = images.findIndex(
    (image) => image.original === originalImageURL
  );

  const instance = basicLightbox.create(showImage(currentIndex), {
    onShow: (instance) => {
      const modalElement = instance.element();

      const closeButton = modalElement.querySelector('.btn-close');
      const prevButton = modalElement.querySelector('.btn-prev');
      const nextButton = modalElement.querySelector('.btn-next');

      const showNextImage = () => {
        currentIndex = (currentIndex + 1) % images.length;
        instance.element().innerHTML = showImage(currentIndex);
        addListeners();
      };

      const showPrevImage = () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        instance.element().innerHTML = showImage(currentIndex);
        addListeners();
      };

      const closeModal = () => {
        instance.close();
      };

      const addListeners = () => {
        modalElement
          .querySelector('.btn-close')
          .addEventListener('click', closeModal);
        modalElement
          .querySelector('.btn-next')
          .addEventListener('click', showNextImage);
        modalElement
          .querySelector('.btn-prev')
          .addEventListener('click', showPrevImage);
      };

      addListeners();
    },
  });

  instance.show();
});
