import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectCat = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorElement = document.querySelector('.error');

fetchBreeds()
  .then(breedsData => {
    renderBreedsData(breedsData);
    loader.classList.add('hidden');
  })
  .catch(error => {
    Notiflix.Notify.failure(
      `Oops! Something went wrong while fetching breeds! Try reloading the page! Error: ${error}`
    );
    handleFetchError();
  });

function handleFetchError() {
  errorElement.classList.remove('hidden');
  loader.classList.add('hidden');
}

function renderBreedsData(catBreeds) {
  const markup = catBreeds
    .map(({ id, name }) => {
      return `<option value=${id}>${name}</option>`;
    })
    .join('');
  selectCat.insertAdjacentHTML('beforeend', markup);
  loader.classList.add('hidden');
  errorElement.classList.add('hidden');
  console.log(catBreeds);

  // new SlimSelect({
  //   select: '#single',
  // });

  errorElement.classList.add('hidden');
}

selectCat.addEventListener('change', event => {
  fetchCatByBreed(event.target.value)
    .then(data => renderCatData(data[0]))
    .catch(error => {
      Notiflix.Notify.failure(
        `Oops! Something went wrong! Try reloading the page! Error: ${error}`,
        errorNotification()
      );
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
    `<div class="cat-data"><h2>${name}</h2><img src="${url}" width="500"/><p>${description}</p><p><strong>Temperament: </strong>${temperament}</p></div>`
  );
  loader.classList.add('hidden');
}
