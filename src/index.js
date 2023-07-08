import './stylesheets/header.css';
import './stylesheets/footer.css';
import './stylesheets/reservations.css';
import './stylesheets/homepage.css';
import './media-library/star-filled.png';
import './media-library/star-empty.png';
import './media-library/logo.png';
import './media-library/sample-img.jpg';
import Home from './home.js';
import Header from './header.js';
import Footer from './footer.js';
import PullMoviesData from './pullMovies.js';
import PostReservation from './postReservations.js';
import FetchReservations from './fetchReservations.js';
import Reservations from './reservations.js';

const homeSection = new Home();
const headerSection = new Header();
const getMoviesData = new PullMoviesData();
const fetchedReservationData = new FetchReservations();
const postReservationData = new PostReservation();
const reservationsModal = new Reservations();
const footerSection = new Footer();

export {
    headerSection, footerSection, getMoviesData, reservationsModal, homeSection, postReservationData,
    fetchedReservationData
};
