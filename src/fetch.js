// const API_KEY = '33287226-4c6d423cc3cce82da2cd47053';
// const END_POINT = 'https://pixabay.com/api/';
import axios from 'axios';

export default async function findImg(name, page = 1) {
    const API_KEY = '33287226-4c6d423cc3cce82da2cd47053';
    const END_POINT = 'https://pixabay.com/api/';
    
    const res = axios.get(`${END_POINT}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
  return await res;
}


