import getShows from './getShows.js';

export default class Home {
  constructor() {
    this.renderPosts();
  }

  renderPosts() {
    getShows.bind(this)();
  }
}
