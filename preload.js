// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const { remote } = require('electron');
const { dialog } = require('electron').remote;
var fs = require('fs');

let movie = new Array();

window.addToFile = function (data) {
  var length;
  length = movie.push(new Object);

  var gnr = new Array();
  data.genres.forEach(genre => {
    gnr.push(genre['name'])
  })
  gnr = gnr.join()

  movie[length - 1] = {
    adult: 0,
    Images: "https://image.tmdb.org/t/p/w185" + data.poster_path,
    belongs_to_collection: "",
    budget: data.budget,
    Genres: gnr,
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
    "Movie Run Time": data.runtime + " min",
    movie_status: data.status,
    "Short description": "",
    Title: data.title,
    video: "",
    vote_average: data.vote_average,
    vote_count: data.vote_count
  };
  moviesList(movie)
}

window.createFile = function () {
  var m_string;

  keys = Object.keys(movie[0])
  m_string = keys.join()
  m_string += "\n"

  movie.forEach(mv => {
    values = Object.values(mv)
    values = values.join()
    values += "\n"
    m_string += values
  })

  dialog.showSaveDialog({ properties: ['createDirectory'], defaultPath: "/Users/macbook/Documents/movies.csv" })
    .then(result => {
      if (result.filePath) {
        fs.writeFile(result.filePath, m_string, function (err) {
          if (err) throw err;
          console.log('File is created successfully.');
        });
      }
    })


  
  
  
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
