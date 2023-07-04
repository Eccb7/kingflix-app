export default class Footer {
    constructor() {
      this.footer = document.querySelector('footer');
      this.footerText = 'Created by Microverse under CC License'
      this.createFooter();
    }
  
    createNavbar() {
      const footerContent = document.createElement('p');
      footerContent.textContent = footerText;
  
      this.footer.appendChild(footerContent);
    }
  
  }