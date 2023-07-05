import './stylesheets/header.css';
import './stylesheets/footer.css';
import './stylesheets/ratings.css';
import './media-library/star-filled.png';
import './media-library/star-empty.png';
import './media-library/logo.png';
import './media-library/sample-img.jpg';
import Header from './header.js';
import Footer from './footer.js';
import Ratings from './ratings.js';
import Home from "./home";

const headerSection = new Header();
const homeSection = new Home();
const footerSection = new Footer();
const ratingsModal = new Ratings();

export { headerSection, footerSection, ratingsModal, homeSection };
