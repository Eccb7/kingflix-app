import './stylesheets/header.css';
import './stylesheets/footer.css';
import './stylesheets/reservations.css';
import './stylesheets/homepage.css';
import './stylesheets/comments.css';
import './media-library/star-filled.png';
import './media-library/star-empty.png';
import './media-library/logo.png';
import './media-library/sample-img.jpg';
import Home from './home/home.js';
import Header from './home/header.js';
import Footer from './home/footer.js';
import PullMoviesData from './reservationModal/pullMovies.js';
import FetchReservations from './reservationModal/fetchReservations.js';
import Reservations from './reservationModal/reservations.js';

const homeSection = new Home();
const headerSection = new Header();
const getMoviesData = new PullMoviesData();
const fetchedReservationData = new FetchReservations();
const reservationsModal = new Reservations();
const footerSection = new Footer();

export {
  headerSection, footerSection, getMoviesData, reservationsModal, homeSection,
  fetchedReservationData,
};
