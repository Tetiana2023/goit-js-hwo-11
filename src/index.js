import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import findImg from './fetch';

const formEl = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector(".load-more");

let page = 1;
let inputValue = '';
let totalImg = 0;
let totalPages = 0;
loadBtn.hidden = true;


formEl.addEventListener('submit', searchForm);
loadBtn.addEventListener('click', onLoadBtnClik);

function searchForm(e) {
  e.preventDefault();

   inputValue = e.currentTarget.searchQuery.value.trim();
  // let inputValue = formEl.elements.searchQuery.value.trim();
  console.log(inputValue);

  page = 1;
  gallery.innerHTML = '';

    if (!inputValue) {
    gallery.innerHTML = '';
    return;
  }
  findImg(inputValue, page).then(res => {console.log(res);
    loadBtn.hidden = false;

    totalImg = res.data.totalHits;
   console.log(totalImg)
    if (res.data.totalHits === 0 ){
      loadBtn.hidden = true;

      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      return

    }else {
      Notiflix.Notify.success(`Hooray! We found ${totalImg} images.`);
      renderGallery(res.data.hits)
       }
           
    })
// gallery.innerHTML = '';

//     lightbox.refresh();

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
        <a class="gallery__link" href="${largeImageURL}" >
        <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
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
function onLoadBtnClik(e){
  page += 1;

 findImg(inputValue, page).then(res => {console.log(res);

    totalPages = res.data.totalHits / 40;
    console.log(totalPages);
    
    if (page > totalPages){
      loadBtn.hidden = true;
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
     renderGallery(res.data.hits)});   
     
    }
