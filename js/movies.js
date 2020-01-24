document.getElementById("id_movie_form").addEventListener("submit", transferToSingleMovie)
document.getElementById("title_movie_form").addEventListener("submit", transferToMovieTitle)

// SEARCH MOVIES BY TITLE
function transferToMovieTitle(e) {
    e.preventDefault();
    document.getElementById("movie_list").innerHTML = null
    title_query = document.getElementById("movie-t").value
    MoviesByTitle(title_query);
}

function MoviesByTitle(title) {
    lang = document.getElementById("language-t").value
    url = "https://api.themoviedb.org/3/search/movie?api_key=" + localStorage.getItem("api_key") + "&language=" + lang + "&query=" + title + "&page=1&include_adult=false"

    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(movie => {
                if (movie.poster_path === null) { return; }
                document.getElementById("movie_list").innerHTML += "<div class='sgl-movie' id='" + movie.id + "' onclick='MoviesById(" + movie.id + ")' style='background-image: url(\"https://image.tmdb.org/t/p/w185" + movie.poster_path + "\"'> \
                                                                \
                                                                    </div>"
            });
        })
        .catch(error => console.error(error))
}

function transferToSingleMovie(e) {
    e.preventDefault();
    id = document.getElementById("movie").value
    MoviesById(id)
}

// SEARCH MOVIES BY ID
function MoviesById(id) {
    if (document.getElementById("search_by_id").className == "is_hidden") {
        document.getElementById("search_by_id").className = "is_shown"
        document.getElementById("search_by_title").className = "is_hidden"
    }
    lang = document.getElementById("language").value
    url = "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + localStorage.getItem("api_key") + "&language=" + lang
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data) // Prints result from `response.json()` in getRequest
            document.getElementById('title1').textContent = data.title;
            document.getElementById('title2').textContent = data.tagline;
            document.getElementById('overview').textContent = data.overview;
            poster = document.getElementById('poster');
            backdrop = document.getElementById('backdrop');
            poster.src = "https://image.tmdb.org/t/p/w185" + data.poster_path;
            backdrop.style.background = "url('https://image.tmdb.org/t/p/w1280" + data.backdrop_path + "')";
            document.getElementById('date').innerHTML = "<i class='far fa-calendar-alt' style='color: white;'></i> " + data.release_date;
            // document.getElementById('tmdb_id').textContent = "TMDB ID: " + data.id;
            // document.getElementById('imdb_id').textContent = "IMDB ID: " + data.imdb_id;
            embed = document.getElementById('embed-t').value
            textarea = document.getElementById('movie-csv')
            textarea.style.display = 'block'
            genres = ""
            if (data.genres) {
                g = document.getElementById('genres')
                g.innerHTML = ""
                data.genres.forEach(gnr => {
                    g.innerHTML += "<span class='tag'>" + gnr['name'] + "</span>\n"
                    genres += gnr['name'] + ","
                })
            }
            genres = genres.slice(0, -1)
            textarea.textContent = ", https://image.tmdb.org/t/p/w185" + data.poster_path + ", " + ", " + data.budget + ", \"" + genres + "\", movie_url, " + embed + ", " + "1, " + data.id + ", " + data.imdb_id + ", " + data.original_language + ", " + data.original_title + ", " + data.overview + ", " + data.popularity + ", " + data.release_date + ", " + data.revenue + ", " + data.runtime + ", " + data.status + ",, " + data.title + ",, " + data.vote_average
        })
        .catch(error => console.error(error))
}
