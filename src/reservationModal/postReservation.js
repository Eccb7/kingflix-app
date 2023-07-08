import DisplayAfterPost from './displayReservation.js';

export default class PostResevation {
  constructor() {
    this.reservationForm = document.querySelectorAll('.reservationForm');
    this.username = document.querySelector('#username');
    this.startDate = document.querySelector('#startDate');
    this.endDate = document.querySelector('#endDate');
    this.movieId = 0;
    this.setupListener();
  }

  async postReservation(item_id, username, date_start, date_end) {
    try {
      const data = {
        item_id,
        username,
        date_start,
        date_end,
      };

      const response = await fetch(
        'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/XTyHQABn3ej42SK28nbc/reservations',
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-type': 'application/json',
          },
        },
      );

      if (response.ok) {
        // gives error;
      }
    } catch (error) {
      throw new Error('Unable to post');
    }

    // update displayed reservations
    const loadReservations = new DisplayAfterPost();
    loadReservations.displayReservations(this.movieId);
  }

  setupListener() {
    const valueusername = document.querySelector('#username');
    const valuestartDate = document.querySelector('#startDate');
    const valueendDate = document.querySelector('#endDate');
    this.reservationForm.forEach((each) => each.addEventListener('submit', (e) => {
      e.preventDefault();

      const item_id = `item${this.movieId}`;
      const username = valueusername.value;
      const date_start = valuestartDate.value;
      const date_end = valueendDate.value;

      this.postReservation(item_id, username, date_start, date_end);
    }));
  }
}