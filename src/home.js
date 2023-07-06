import getShows from "./getShows";

export default class Home {
  constructor() {
    this.renderPosts();
  }  
  renderPosts() {
    getShows();
  }
}
