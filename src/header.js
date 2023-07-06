export default class Header {
  constructor() {
    this.header = document.querySelector('header');
    this.createNavbar();
  }

  createNavbar() {
    const navBar = document.createElement('nav');
    navBar.innerHTML = `<img id="logo" src="./media-library/logo.png" alt="logo">
    <ul class="menuContainer">
      <li><a class="menuItem" href="#">Movies </a></li>
      <li><a class="menuItem" href="#">Categories </a></li>
      <li><a class="menuItem" href="#">Streaming </a></li>
    </ul>`;
    this.header.appendChild(navBar);
  }
}
