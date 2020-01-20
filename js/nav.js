// Navigation script

document.getElementById("btn_movies_title").addEventListener("click", function () { toggleDiv("search_by_title") }, event)
document.getElementById("btn_movies_id").addEventListener("click", function () { toggleDiv("search_by_id") }, event)
document.getElementById("btn_tv_title").addEventListener("click", function () { toggleDiv("tv_shows_by_title") }, event)

function toggleDiv(button) {
    movie_by_title = document.getElementById("search_by_title")
    movie_by_id = document.getElementById("search_by_id")
    tv_by_title = document.getElementById("tv_shows_by_title")

    tabs = [movie_by_title, movie_by_id, tv_by_title]
    tabs.forEach(tab => {
        tab.className = "is_hidden"
        if (tab.id == button) {
            tab.className = "is_shown"
        }
    })
}