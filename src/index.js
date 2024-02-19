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
    data: cats,
  });

  loader.classList.remove('hidden');
  errorElement.classList.add('hidden');
  console.log(catBreeds);
}

selectCat.addEventListener('change', event => {
  loader.classList.remove('hidden');

  fetchCatByBreed(event.target.value)
    .then(data => renderCatData(data[0]), errorElement.classList.add('hidden'))
    .catch(error => {
      Notiflix.Notify.failure(`Error: ${error}`, handleFetchError());
      catInfo.innerHTML = '';
    });
});

function renderCatData(catData) {
  const { url } = catData;
  const { name, description, temperament } = catData.breeds[0];
  catInfo.innerHTML = '';
  catInfo.insertAdjacentHTML(
    'beforeend',
    `<div class="cat-data"><h2>${name}</h2><div class="card"><div class="content"><div class="front"><img class="cat-photo" src="${url}"/></div><div class="back"><div class="back-paragraphs"><p>${description}</p><p><strong>Temperament: </strong>${temperament}</p></div></div></div></div></div>`
  );
  loader.classList.add('hidden');
}
