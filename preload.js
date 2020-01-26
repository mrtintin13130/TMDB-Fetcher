// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const { remote } = require('electron');
var fs = require('fs');

let movie = new Array();

window.addToFile = function(data) {
  var x;
  x = movie.push(new Object);
  movie[x - 1] = {
    adult: 0,
    Images: "https://image.tmdb.org/t/p/w185" + data.poster_path,
    belongs_to_collection: "",
    budget: data.budget,
    Genres: function () {
      x = 0;
      var genres;
      data.genres.forEach(gnr => {
        genres[x] = gnr.name
        x++;
      })
      return genres.join()
    },
    "Movie Choice": "movie_url",
    "Movie Link": "",
    "Is Affiliate URL ?": 1,
    "TMDB ID": data.id,
    "IMDB ID": data.imdb_id,
    original_language: data.original_language,
    original_title: data.original_title,
    Description: data.overview,
    popularity: data.popularity,
    "Movie Release Date": data.release_date,
    revenue: data.revenue,
    "Movie Run Time": data.runtime,
    movie_status: data.status,
    "Short description": "",
    Title: data.title,
    video: "",
    vote_average: data.vote_average,
    vote_count: data.vote_count
  };
  console.log(movie)
}

window.createFile = function () {
  console.log(movie)
  fs.writeFile('newfile.txt', movie.title, function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
  });
}


window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
