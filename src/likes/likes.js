import updateMyLikes from './updateLikes.js';

const setLike = async (movie, likes) => {
  try {
    const response = await fetch(
      'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/XTyHQABn3ej42SK28nbc/likes',
      {
        method: 'POST',
        body: JSON.stringify({
          item_id: movie.id,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      },
    );

    if (response.ok) {
      updateMyLikes(movie, likes);
    }
  } catch (error) {
    throw new Error('Unable to post');
  }
};
export default setLike;
