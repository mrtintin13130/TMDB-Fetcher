document.getElementById("id_tv_shows_form").addEventListener("submit", transferToTvShowsTitle)

function transferToTvShowsTitle(e) {
    e.preventDefault();
    id = document.getElementById("tvshows").value
    document.getElementById("tvshows_list").innerHTML = null
    tvShowsByTitle(id)
}

// SEARCH TV SHOWS BY TITLE
function tvShowsByTitle(id) {
    lang = document.getElementById("language-s").value
    url = "https://api.themoviedb.org/3/search/tv?api_key=" + localStorage.getItem("api_key") + "&language=" + lang + "&query=" + id + "&page=1"
    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(show => {
                if (show.poster_path === null) { return; }
                document.getElementById("tvshows_list").innerHTML += "<div class='sgl-movie' id='" + show.id + "' onclick='TvShowById(" + show.id + ")' style='background-image: url(\"https://image.tmdb.org/t/p/w185" + show.poster_path + "\"'> \
                \
                    </div>"
            })
        })
        .catch(error => console.error(error))
}

function TvShowById(id) {
    if (document.getElementById("tv_shows_by_id").className == "is_hidden") {
        document.getElementById("tv_shows_by_id").className = "is_shown"
        document.getElementById("tv_shows_by_title").className = "is_hidden"
    }

    lang = document.getElementById("language-s").value
    url = "https://api.themoviedb.org/3/tv/" + id + "?api_key=" + localStorage.getItem("api_key") + "&language=" + lang
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data) // Prints result from `response.json()` in getRequest
            document.getElementById('title-s').textContent = data.title;
            document.getElementById('overview-s').textContent = "Synopsis: " + data.overview;
            poster = document.getElementById('poster-s');
            poster.src = "https://image.tmdb.org/t/p/w185" + data.poster_path;
            document.getElementById('date-s').textContent = "Release date: " + data.release_date;
            document.getElementById('tmdb_id-s').textContent = "TMDB ID: " + data.id;
            document.getElementById('imdb_id-s').textContent = "IMDB ID: " + data.imdb_id;
            embed = document.getElementById('embed-s').value
            seasons_t = document.getElementById("seasons")
            data.seasons.forEach(season => {
                seasons_t.innerHTML += "<li style='background-image: url(\"https://image.tmdb.org/t/p/w185" + season.poster_path + "\"' id='" + season.id + "'></li>"
            })
            textarea = document.getElementById('tvshow-csv')
            textarea.style.display = 'block'
            genres = ""
            if (data.genres) {
                data.genres.forEach(gnr => {
                    genres += gnr['name'] + ","
                })
            }
            genres = genres.slice(0, -1)
            textarea.textContent = ", https://image.tmdb.org/t/p/w185" + data.poster_path + ", " + ", " + data.budget + ", \"" + genres + "\", movie_url, " + embed + ", " + "1, " + data.id + ", " + data.imdb_id + ", " + data.original_language + ", " + data.original_title + ", " + data.overview + ", " + data.popularity + ", " + data.release_date + ", " + data.revenue + ", " + data.runtime + ", " + data.status + ",, " + data.title + ",, " + data.vote_average
        })
        .catch(error => console.error(error))
}