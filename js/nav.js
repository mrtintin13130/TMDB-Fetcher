// Navigation script
document.getElementById("btn_home").addEventListener("click", function () { toggleDiv("home") }, event)
document.getElementById("btn_movies_title").addEventListener("click", function () { toggleDiv("search_by_title") }, event)
//document.getElementById("btn_movies_id").addEventListener("click", function () { toggleDiv("search_by_id") }, event)
document.getElementById("btn_tv_title").addEventListener("click", function () { toggleDiv("tv_shows_by_title") }, event)

function toggleDiv(button) {
    home = document.getElementById("home");
    movie_by_title = document.getElementById("search_by_title")
    movie_by_id = document.getElementById("search_by_id")
    tv_by_title = document.getElementById("tv_shows_by_title")
    tv_by_id = document.getElementById("tv_shows_by_id")

    tabs = [home, movie_by_title, movie_by_id, tv_by_title, tv_by_id]
    tabs.forEach(tab => {
        tab.className = "is_hidden"
        if (tab.id == button) {
            tab.className = "is_shown"
        }
    })
}