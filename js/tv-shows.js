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
            document.getElementById('title1-s').textContent = data.name;
            document.getElementById('overview-s').textContent = data.overview;
            poster = document.getElementById('poster-s');
            poster.src = "https://image.tmdb.org/t/p/w185" + data.poster_path;
            backdrop = document.getElementById('backdrop-s');
            backdrop.style.background = "url('https://image.tmdb.org/t/p/w1280" + data.backdrop_path + "')";
            document.getElementById('date-s').innerHTML = "<i class='far fa-calendar-alt' style='color: white;'></i> " + data.first_air_date;
            // document.getElementById('tmdb_id-s').textContent = "TMDB ID: " + data.id;
            // document.getElementById('imdb_id-s').textContent = "IMDB ID: " + data.imdb_id;
            embed = document.getElementById('embed-s').value
            seasons_t = document.getElementById("seasons")
            seasons_t.innerHTML = ""
            data.seasons.forEach(season => {
                if (season.season_number == 0) { return; }
                seasons_t.innerHTML += "<li style='background-image: url(\"https://image.tmdb.org/t/p/w185" + season.poster_path + "\"' id='" + season.id + "'></li>"
            })
            textarea = document.getElementById('tvshow-csv')
            textarea.style.display = 'block'
            genres = ""
            if (data.genres) {
                g = document.getElementById('genres-s')
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