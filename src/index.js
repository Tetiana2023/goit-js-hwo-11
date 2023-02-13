import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import findImg from './fetch';

// // scroll infinity
let options = {
  root: null,
  rootMargin: '300px',
  threshold: 0,
}

let callback = (entries, observer)=> {
  entries.forEach(entry => {
      if(entry.isIntersecting){
        page += 1;
        inputValue = e.currentTarget.searchQuery.value.trim();
        const res = await findImg(inputValue, page)
        // .then(res => {
        renderGallery(res.data.hits); 
          totalPages = res.data.totalHits / 40;
          console.log(totalPages);
      
                
          if (page > totalPages) {
            
            // observer.unobserve(target);
            
            Notiflix.Notify.info(
              "We're sorry, but you've reached the end of search results."
              observer.unobserve(target)
            );
          }
          // renderGallery(res.data.hits);
          // observer.unobserve(target);
          lightbox();
      }
    })
}

let observer = new IntersectionObserver(callback, options);
let target = document.querySelector('.js-guard');
// -------------------------------------------------

const formEl = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

let page = 1;
let inputValue = '';
let totalImg = 0;
let totalPages = 0;

formEl.addEventListener('submit', searchForm);
loadBtn.addEventListener('click', onLoadBtnClik);

// function searchForm(e) {
//   e.preventDefault();

//   inputValue = e.currentTarget.searchQuery.value.trim();
//   // let inputValue = formEl.elements.searchQuery.value.trim();
//   // console.log(inputValue);

//   page = 1;
//   gallery.innerHTML = '';

//   if (!inputValue) {
//     gallery.innerHTML = '';
//     return;
//   }
//   findImg(inputValue, page).then(res => {
//     console.log(res);

//     totalImg = res.data.totalHits;
//     // console.log(totalImg);

//     if (res.data.totalHits === 0) {
//       Notiflix.Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//       return;

//     } else {
//       Notiflix.Notify.success(`Hooray! We found ${totalImg} images.`);

//       renderGallery(res.data.hits);
//       lightbox();

//       loadBtn.classList.remove('hidden');
//       loadBtn.classList.add('visible');
//     }
//   }
//   );
//   gallery.innerHTML = '';
// }
// переписана на async
async function searchForm(e) {
  e.preventDefault();

  inputValue = e.currentTarget.searchQuery.value.trim();
  // let inputValue = formEl.elements.searchQuery.value.trim();
  // console.log(inputValue);

  page = 1;
  gallery.innerHTML = '';

  if (!inputValue) {
    gallery.innerHTML = '';
    return;
  }
  const res = await findImg(inputValue, page)
// .then(res => {
//     console.log(res);

    totalImg = res.data.totalHits;
    // console.log(totalImg);

    if (res.data.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;

    } else {
      Notiflix.Notify.success(`Hooray! We found ${totalImg} images.`);

      renderGallery(res.data.hits);
      observer.unobserve(target);
      lightbox();

      // loadBtn.classList.remove('hidden');
      // loadBtn.classList.add('visible');
      // observer.unobserve(target);
    }
  }

  gallery.innerHTML = '';


function renderGallery(picture) {
  const markup = picture
    .map(
      ({webformatURL, largeImageURL, tags, likes, views, comments, downloads,
      }) => {
        return  `<a class="gallery__link" href="${largeImageURL}" >
        <div class="photo-card">
        <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
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
     </div>
     </a>`;
      }
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
 
}

function lightbox() {
  new SimpleLightbox('.gallery a', {
    captions: true,
    captionDelay: 250,
  }).refresh();
}
// переписана на async
async function onLoadBtnClik(e) {
  page += 1;

  const res = await findImg(inputValue, page)
  // .then(res => {
  //   console.log(res);

    totalPages = res.data.totalHits / 40;
    console.log(totalPages);

    loadBtn.classList.remove('hidden');
    loadBtn.classList.add('visible');

    if (page > totalPages) {
      loadBtn.classList.add('hidden');
      loadBtn.classList.remove('visible');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
    renderGallery(res.data.hits);
    lightbox();
  };

  

// function onLoadBtnClik(e) {
//   page += 1;

//   findImg(inputValue, page).then(res => {
//     console.log(res);

//     totalPages = res.data.totalHits / 40;
//     console.log(totalPages);

//     loadBtn.classList.remove('hidden');
//     loadBtn.classList.add('visible');

//     if (page > totalPages) {
//       loadBtn.classList.add('hidden');
//       loadBtn.classList.remove('visible');
//       Notiflix.Notify.info(
//         "We're sorry, but you've reached the end of search results."
//       );
//     }
//     renderGallery(res.data.hits);
//   });

//   lightbox();
// }
