document.getElementById("btn_movies_list").addEventListener("click", displayMoviesData)
let movies;

function moviesList(data) {
    movies = data;
}

function displayMoviesData() {
    var table = document.getElementsByClassName("data");
    while(table.length > 0){
        table[0].parentNode.removeChild(table[0]);
    }

    movies.forEach(movie => {
        // Create a row
        row = document.createElement("TR");

        row.className = "data"

        // Get objects values
        cells = Object.values(movie)        

        // Create cells
        cells.forEach(cell => {
            td = document.createElement("TD")

            // Create node
            node = document.createTextNode(cell);

            // Append node to cell
            td.appendChild(node);

            // Append cell to row
            row.appendChild(td)
        })

        // Append to html
        document.getElementById("m_list").appendChild(row);
    });
}