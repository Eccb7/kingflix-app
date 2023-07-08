import Reservations from './reservations.js';

const getShows = async () => {
  const homeContainer = document.querySelector('.homepage');
  const reservationsModal = new Reservations();
  try {
    const response = await fetch('https://api.tvmaze.com/shows/1/episodes');
    if (!response.ok) {
      throw new Error(`Failed to fetch scores: ${response.status}`);
    }
    const json = await response.json();
    json.forEach((movie) => {
      const body = document.createElement('div');
      body.className = 'movies';
      const images = document.createElement('div');
      images.className = 'test-img';
      images.innerHTML = `<img src=${movie.image.medium} alt="" class="my-img">`;
      const loveImage = document.createElement('img');
      loveImage.src = './media-library/love.png';
      loveImage.className = 'love';
      const likes = document.createElement('div');
      likes.className = 'space';
      likes.innerHTML = `<p>${movie.name}</p>`;
      likes.innerHTML += `<p>5 likes</p>`;
      likes.appendChild(loveImage);
      const button1 = document.createElement('button');
      button1.className = 'btn';
      button1.innerText = 'Comments';
      const button2 = document.createElement('button');
      button2.className = 'btn viewReservations';
      button2.innerText = 'Reservations';
      body.appendChild(images);
      body.appendChild(likes);
      body.appendChild(button1);
      body.appendChild(button2);
      homeContainer.appendChild(body);
    });
  } catch (error) {
    throw new Error('Unable to post');
  }
  reservationsModal.showReservations();
};
export default getShows;
