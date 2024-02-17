import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import 'slim-select/dist/slimselect.css';

const selectCat = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorElement = document.querySelector('.error');

const cats = [];

fetchBreeds()
  .then(breedsData => {
    renderBreedsData(breedsData);
    loader.classList.add('hidden');
  })
  .catch(error => {
    Notiflix.Notify.failure(`Error: ${error}`);
    handleFetchError();
  });

function handleFetchError() {
  errorElement.classList.remove('hidden');
  loader.classList.add('hidden');
}

function renderBreedsData(catBreeds) {
  catBreeds.map(({ id, name }) => {
    cats.push({ text: name, value: id });
    // return `<option value=${id}>${name}</option>`;
  });
  // .join('');
  // selectCat.insertAdjacentHTML('beforeend', markup);

  new SlimSelect({
    select: '.breed-select',
    placeholderText: 'Choose a breed',
    data: cats,
  });

  loader.classList.add('hidden');
  errorElement.classList.add('hidden');
  console.log(catBreeds);

  errorElement.classList.add('hidden');
}

selectCat.addEventListener('change', event => {
  fetchCatByBreed(event.target.value)
    .then(data => renderCatData(data[0]))
    .catch(error => {
      Notiflix.Notify.failure(`Error: ${error}`, errorNotification());
      errorElement.classList.remove('hidden');
      loader.classList.add('hidden');
    });
  loader.classList.remove('hidden');
});

function renderCatData(catData) {
  const { url } = catData;
  const { name, description, temperament } = catData.breeds[0];
  catInfo.innerHTML = '';
  catInfo.insertAdjacentHTML(
    'beforeend',
    `<div class="cat-data"><h2>${name}</h2><img src="${url}"/><p>${description}</p><p><strong>Temperament: </strong>${temperament}</p></div>`
  );
  loader.classList.add('hidden');
}
