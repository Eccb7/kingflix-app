const movieNum = async () => {
  const response = await fetch('https://api.tvmaze.com/shows/1/episodes');
  const data = await response.json();
  return data.length;
};
export default movieNum;
