import PullMoviesData from './pullMovies.js';
import FetchReservations from './fetchReservations.js';

export default class Reservations {
  constructor() {
    this.body = document.querySelector('body');
    this.viewReservationsBtns = document.getElementsByClassName('viewReservations');
    this.fetchReservations = new FetchReservations();
    this.reservationCount = 0;
    this.movieID = 0;

    this.reservationForm = document.querySelectorAll('.reservationForm');
    this.username = document.querySelector('#username');
    this.startDate = document.querySelector('#startDate');
    this.endDate = document.querySelector('#endDate');
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
        <h2 class="reservationsHeading headings">Reservations(${this.reservationCount}):</h2>
        <div class="existingReservations"> </div>
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

    this.setupListener();
  }

  closeReservationModal(reservationCloseBtns) {
    this.reservationsSections = document.querySelectorAll('.reservationsSection');
    reservationCloseBtns.forEach((each, position) => each.addEventListener('click', () => {
      this.reservationsSections[position].style.display = 'none';
    }));
  }

  updateCounter(fetchedReservationArr) {
    // Updates counter
    this.reservationCount = fetchedReservationArr.length;
    const reservationsHeading = document.querySelector('.reservationsHeading');
    reservationsHeading.textContent = `Reservations (${this.reservationCount}):`;
  }

  async displayReservations(index) {
    const fetchReservations = new FetchReservations();
    fetchReservations.movieID = index;
    const fetchedReservation = await fetchReservations.fetchReservationsData();
    const fetchedReservationArr = Array.from(fetchedReservation);
    const existingReservations = document.querySelectorAll('.existingReservations');

    // Clear existing reservations
    existingReservations.forEach((each) => {
      each.innerHTML = '';
    });
    this.updateCounter(fetchedReservationArr);

    fetchedReservationArr.forEach((each) => {
      const reservation = document.createElement('p');
      reservation.textContent = `${each.date_start} - ${each.date_end} by ${each.username}`;
      existingReservations.forEach((each) => {
        each.appendChild(reservation);
      });
    });
  }

  showReservations() {
    const btnsArray = Array.from(this.viewReservationsBtns);
    btnsArray.forEach((each, eachindex) => {
      each.addEventListener('click', () => {
        this.movieID = eachindex;
        this.createReservationsModal(eachindex);
        this.displayReservations(eachindex);
        this.setupListener(eachindex);
      });
    });
  }

  // post data
  async postReservation(data, id) {
    try {
      await fetch(
        'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/XTyHQABn3ej42SK28nbc/reservations',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );
    } catch (error) {
      // return null;
    }

    this.displayReservations(id);
  }

  setupListener(id) {
    this.reservationForm.forEach((each) => each.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = {
        item_id: `item${id}`,
        username: this.username.value,
        date_start: this.startDate.value,
        date_end: this.endDate.value,
      };

      this.postReservation(data, id);
      this.username.value = '';
      this.startDate.value = '';
      this.endDate.value = '';
    }));
  }
}
