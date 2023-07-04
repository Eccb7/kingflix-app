import printMe from './print.js';
import './stylesheets/header.css';
import './media-library/logo.png';
import Header from './header.js';
import Footer from './footer.js';



const headerSection = new Header();
const footerSection = new Footer();
export { headerSection, footerSection };