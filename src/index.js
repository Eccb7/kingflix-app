import './stylesheets/header.css';
import './stylesheets/footer.css';
import './stylesheets/ratings.css';
import './stylesheets/homepage.css';
import './media-library/star-filled.png';
import './media-library/star-empty.png';
import './media-library/logo.png';
import './media-library/sample-img.jpg';
import Home from "./home.js";
import getShows from './getShows.js';
import Header from './header.js';
import Footer from './footer.js';
import Ratings from './ratings.js';

const homeSection = new Home();
const headerSection = new Header();
const ratingsModal = new Ratings();
const getNewShows = new getShows();
const footerSection = new Footer();

export { headerSection, footerSection, ratingsModal, homeSection, getNewShows };
