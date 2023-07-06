import './stylesheets/header.css';
import './stylesheets/footer.css';
import './stylesheets/homepage.css';
import './media-library/logo.png';
import Header from './header.js';
import Footer from './footer.js';
import Home from './home.js';

const headerSection = new Header();
const homeSection = new Home();
const footerSection = new Footer();

export { headerSection, footerSection, homeSection };
