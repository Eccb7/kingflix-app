import './stylesheets/header.css';
import './stylesheets/footer.css';
import './stylesheets/homepage.css';
import './stylesheets/comments.css';
import './media-library/logo.png';
import Header from './header.js';
import Footer from './footer.js';
import Home from './home.js';
// import createModal from './modal';

const headerSection = new Header();
const homeSection = new Home();
const footerSection = new Footer();

export { headerSection, footerSection, homeSection };
