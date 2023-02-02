import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import findImg from './fetch';

const formEl = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector(".load-more");

console.log(loadBtn)

let page = 1;


formEl.addEventListener('submit', searchForm);
loadBtn.addEventListener('click', changePage);


function changePage(){
  console.log("G")
}
// page = 1;

// findImg(inputValue).then(res=> { renderGallery(res.data.hits);
//  if (res.data.page === res.data.pages) {
//   loadBtn.hidden = true;
// };
// })

// }

function searchForm(e) {
  e.preventDefault();

  let inputValue = e.currentTarget.searchQuery.value.trim();
  // let inputValue = formEl.elements.searchQuery.value.trim();
  console.log(inputValue);

  if (!inputValue) {
    gallery.innerHTML = '';
    return;
  }
  findImg(inputValue).then(res => {renderGallery(res.data.hits)});
  gallery.innerHTML = '';

    lightbox.refresh();
}

function renderGallery(picture) {
  const markup = picture
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return ` <div class="photo-card">
        <a class="gallery-item" href="${largeImageURL}" >
        <img class="gallery-item" src="${webformatURL}" alt="${tags}" loading="lazy" />
       </a>
        <div class="info">
          <p class="info-item">
            <b>Likes ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads ${downloads}</b>
          </p>
        </div>
      </div>`;
      }
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}
const lightbox = new SimpleLightbox('.photo-card a', {
  captions: true,
  captionDelay: 250,
});