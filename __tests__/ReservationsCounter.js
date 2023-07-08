import Reservations from '../src/Reservations.js';

// Mock the FetchReservations class
jest.mock('../src/fetchReservations.js', () => {
  return jest.fn().mockImplementation(() => ({
    fetchReservationsData: jest.fn().mockResolvedValue([
      { id: 1, username: 'John', date_start: '2020-12-17', date_end: '2020-12-18' },
      { id: 2, username: 'James', date_start: '2020-12-17', date_end: '2020-12-18' },
      { id: 3, username: 'Peter', date_start: '2020-12-17', date_end: '2020-12-18' },
    ]),
  }));
});

describe('Reservations', () => {
  let reservations;

  beforeEach(() => {
    reservations = new Reservations();
  });

  it('should update the reservation counter', async () => {
    // Create a mock DOM structure
    document.body.innerHTML = `
      <div class="sectionContainers">
        <h2 class="reservationsHeading headings">Reservations (0):</h2>
        <div class="existingReservations"></div>
      </div>
    `;

    // Call the displayReservations method
    await reservations.displayReservations(0);

    // Get the reservation counter element
    const reservationsCounter = document.querySelector('.reservationsHeading');

    // Expect the reservation counter to be updated
    expect(reservationsCounter.textContent).toBe('Reservations (3):');
  });
});
