import getShows from './getShows.js';

export default class Home {
  constructor() {
    this.renderPosts();
    this.showGetShows = getShows();
  }
  renderPosts() {
    this.showGetShows;
  }
}
