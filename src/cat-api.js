import axios from 'axios';

export const fetchBreeds = () => {
  axios.defaults.headers.common['x-api-key'] =
    'live_ykBoOQtz5LgVRf7LDFEsahGSXja4fNaqGnXwQm8Yrr6cVO0lXvw1uqLqYRyS0F8V';

  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data);
};

export const fetchCatByBreed = breedId => {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data);
};
