export default class Footer {
  constructor() {
    this.footerContainer = document.querySelector('footer');
    this.footerText = 'Created by Microverse under CC License';
    this.createFooter();
  }

  createFooter() {
    const footerContent = document.createElement('p');
    footerContent.textContent = this.footerText;

    this.footerContainer.appendChild(footerContent);
  }
}
