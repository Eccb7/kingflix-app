export default class PullMoviesData {
  constructor() {
    this.url = 'https://api.tvmaze.com/shows/1/episodes';
  }

  async fetchMoviesData() {
    try {
      const response = await fetch(this.url);
      const result = await response.json();
      return result;
    } catch (error) {
    return null;
    }
  }
}
