export default class Ratings {
  constructor() {
    this.body = document.querySelector('body');
    this.createRatingsModal();
  }

  createRatingsModal() {
    const ratingsSection = document.createElement('section');
    ratingsSection.className = 'ratingsSection';
    ratingsSection.innerHTML = `
    <div class="ratingsContainer">
      <p class="close-icon"><span class="material-symbols-outlined">close</span></p>
      <div class="movieDescription">
        <img class="movieImage" src="./media-library/sample-img.jpg" alt="simple">
        <h2 class="movieTitle headings">The Celetist House</h2>
        <p class="movieDescription"> Test image URLs directly: Try accessing the image URLs directly in the browser to verify that the images can be loaded independently of your web application. If the images still don't load, there might be an issue with the image files themselves or with the server hosting them. </p>
      </div>

      <div class="sectionContainers">
        <h2 class="ratingsHeading headings">Ratings:</h2>
        <p>ddddddd</p>
      </div>

      <div class="sectionContainers">
        <h2 class="addRatingsHeading headings">Rate Movie:</h2>
        <form>
          <input class="formFields" type="text" placeholder="Username" id="username" name="username">
          <div class="star-rating">
            <p class="giveRatingText"> Give your rating: </p>
            <input type="checkbox" id="star-1" name="rating" value="1">
            <label for="star-1"> </label>
            <input type="checkbox" id="star-2" name="rating" value="2">
            <label for="star-2"></label>
            <input type="checkbox" id="star-3" name="rating" value="3">
            <label for="star-3"></label>
            <input type="checkbox" id="star-4" name="rating" value="4">
            <label for="star-4"></label>
            <input type="checkbox" id="star-5" name="rating" value="5">
            <label for="star-5"></label>
          </div>
    
          <input class="submitBtn" type="submit">
        </form>
      </div>
    </div>`

    this.body.appendChild(ratingsSection);
  }
}
