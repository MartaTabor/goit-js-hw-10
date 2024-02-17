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
  });

  new SlimSelect({
    select: '.breed-select',
    placeholderText: 'Choose a breed',
    data: cats,
  });

  loader.classList.remove('hidden');
  errorElement.classList.add('hidden');
  console.log(catBreeds);
}

selectCat.addEventListener('change', event => {
  loader.classList.remove('hidden');

  fetchCatByBreed(event.target.value)
    .then(data => renderCatData(data[0]))
    .catch(error => {
      Notiflix.Notify.failure(`Error: ${error}`, errorNotification());
      errorElement.classList.remove('hidden').finally(() => {
        loader.classList.add('hidden');
      });
    });
});

function renderCatData(catData) {
  const { url } = catData;
  const { name, description, temperament } = catData.breeds[0];
  catInfo.innerHTML = '';
  catInfo.insertAdjacentHTML(
    'beforeend',
    `<div class="cat-data"><h2>${name}</h2><img class="cat-photo" src="${url}"/><p>${description}</p><p><strong>Temperament: </strong>${temperament}</p></div>`
  );
  loader.classList.add('hidden');
}
