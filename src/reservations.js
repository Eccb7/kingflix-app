import PullMoviesData from './pullMovies.js';
import PostReservation from './postReservations.js';
import FetchReservations from './fetchReservations.js';

export default class Reservations {
  constructor() {
    this.body = document.querySelector('body');
    this.viewReservationsBtns = document.getElementsByClassName('viewReservations');
    this.fetchReservations = new FetchReservations();
    this.showReservations();
  }

  async createReservationsModal(index) {  
    const getMoviesDetails = new PullMoviesData();
    const moviesDetails = await getMoviesDetails.fetchMoviesData();
    const moviesDetailsArr = Array.from(moviesDetails);

    const reservationsSection = document.createElement('section');
    reservationsSection.className = 'reservationsSection';
    reservationsSection.innerHTML = `
    <div class="reservationsContainer">
      <p class="close-icon"><span class="material-symbols-outlined">close</span></p>
      <div class="movieDescription">
        <img class="movieImage" src="${moviesDetailsArr[index].image.medium}" width="600" alt="simple">
        <h2 class="movieTitle headings">${moviesDetailsArr[index].name}</h2>
        <div class="movieDescription"> ${moviesDetailsArr[index].summary}</div>
      </div>

      <div class="sectionContainers">
        <h2 class="reservationsHeading headings">Reservations:</h2>
        <div class="existingReservations"> No Resevations to show </div>
      </div>

      <div class="sectionContainers">
        <h2 class="addReservationsHeading headings">Reserve a Spot:</h2>
        <form class="reservationForm">
          <input class="formFields" type="text" placeholder="Username" id="username" name="username">
          <input class="formFields" type="date" placeholder="Start Date" id="startDate" name="startDate">
          <input class="formFields" type="date" placeholder="End Date" id="endDate" name="endDate">
          <input class="submitBtn" type="submit" value="Reserve">
        </form>
      </div>
    </div>`;
    this.body.appendChild(reservationsSection);
    
    const reservationCloseBtns = document.querySelectorAll('.close-icon');
    this.closeReservationModal(reservationCloseBtns);

    const postReservationData = new PostReservation();
    postReservationData.movieId = index;
    postReservationData.setupListener();

  }

  closeReservationModal(reservationCloseBtns) {
    const reservationsSections = document.querySelectorAll('.reservationsSection');
    reservationCloseBtns.forEach((each) => each.addEventListener('click', () => {
    reservationsSections.forEach((each) => each.style.display = 'none');
    }))
  }

  async displayReservations(index) {
    const fetchReservations = new FetchReservations();
    fetchReservations.movieID = index;
    const fetchedReservation = await fetchReservations.fetchReservationsData();
    const fetchedReservationArr = Array.from(fetchedReservation);
    const existingReservations = document.querySelectorAll('.existingReservations');
  
    // Clear existing reservations
    existingReservations.innerHTML = '';
  
    fetchedReservationArr.forEach((each) => {
      const reservation = document.createElement('p');
      reservation.textContent = `${each.date_start} - ${each.date_end} by ${each.username}`;
      existingReservations.forEach((each) => each.appendChild(reservation));
    });
  }

    showReservations() {
    const btnsArray = Array.from(this.viewReservationsBtns);
    btnsArray.forEach((each, eachindex) => {
      each.addEventListener('click', () => {
        this.createReservationsModal(eachindex);
        this.displayReservations(eachindex);
      })
    })
  }
}
