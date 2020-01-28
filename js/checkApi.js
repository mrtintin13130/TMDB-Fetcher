// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

if (!localStorage.getItem("api_key")) {
    // document.getElementById("api").className = "is_shown"
    movie = document.getElementById("movie")
    embed = document.getElementById("embed")
    movie_t = document.getElementById("movie-t")
    embed_t = document.getElementById("embed-t")
    movie.disabled = true
    embed.disabled = true
    movie_t.disabled = true
    embed_t.disabled = true
    document.getElementById("api-form").addEventListener("submit", checkApiKey)

} else {
    document.getElementById("api").innerHTML = "<p style=\"font-family: Arial, Helvetica, sans-serif; margin: 0; padding: 0; color: grey; font-size: 11px;\">TMDB API Key: " + localStorage.getItem("api_key") + "</p><br>"
}

function checkApiKey(e) {
    e.preventDefault();
    api = document.getElementById("api-key").value
    url = "https://api.themoviedb.org/3/movie/324857?api_key=" + api
    fetch(url)
        .then(function (response) {
            if (response.status !== 200) {
                console.log("ERROR IN API KEY !")
                document.getElementById("api-alert").innerHTML = "<b>Wrong API key !</b>"
            } else {
                document.getElementById("api").innerHTML = "<p style=\"font-family: Arial, Helvetica, sans-serif; margin: 0; padding: 0; color: grey; font-size: 11px;\">Your TMDB API Key: " + api + "</p><br>"
                localStorage.setItem("api_key", api)
                movie = document.getElementById("movie")
                embed = document.getElementById("embed")
                movie_t = document.getElementById("movie-t")
                embed_t = document.getElementById("embed-t")
                movie.disabled = false
                embed.disabled = false
                movie_t.disabled = false
                embed_t.disabled = false
            }
        })
        .catch(function (error) {
            console.log(error)
        });
}


