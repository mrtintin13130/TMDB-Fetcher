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
            console.log(data)
            data.results.forEach(show => {
                console.log(show)
                document.getElementById("tvshows_list").innerHTML += "<h3>" + show.name + "</h3><br>"
            })
        })
        .catch(error => console.error(error))
}