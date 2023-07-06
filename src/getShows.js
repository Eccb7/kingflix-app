import getLikes from './getLikes.js';
import setLike from './likes.js';

const getShows = async () => {
  const homeContainer = document.querySelector('.homepage');
  const likesData = await getLikes();

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
      likes.innerHTML = `<p>${movie.name}</p> <p class="like-num"></p>`;
      likes.appendChild(loveImage);

      const button1 = document.createElement('button');
      button1.className = 'btn';
      button1.innerText = 'Comments';
      const button2 = document.createElement('button');
      button2.className = 'btn';
      button2.innerText = 'Reservations';

      body.appendChild(images);
      body.appendChild(likes);
      body.appendChild(button1);
      body.appendChild(button2);
      homeContainer.appendChild(body);

      loveImage.addEventListener('click', async () => {
        try {
          await setLike(movie, likes);
        } catch (error) {
          throw new Error('Unable to like');
        }
      });

      const numberOfLikes = likes.querySelector('.like-num');
      let singleLike = 0;
      const like = likesData.find((like) => like.item_id === movie.id);

      if (like) {
        singleLike = like.likes;
        numberOfLikes.textContent = `${singleLike} Likes`;
      } else {
        numberOfLikes.textContent = `${singleLike} Likes`;
      }
    });
  } catch (error) {
    throw new Error('Unable to fetch');
  }
};
export default getShows;
