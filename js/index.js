
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/films")
    .then(response => response.json())
    .then(films => { displayMovie(films[9]); })
    .catch(error => { console.error("Error fetching movie data:", error); });
});

function showMovie(films){
  document.getElementById("poster").src=films.poster;
  document.getElementById("title").textContent=films.title;
  document.getElementById("runtime").textContent=`Runtime:${films.runtime}minutes;`
  document.getElementById("showtime").textContent=`Showtime:${films.showtime}`;
  document.getElementById("tickets").textContent=`Available tickets-{availabletickets}`
}
document.addEventListener("DOMContentLoaded", () =>{
  fetch("http://localhost:3000/films")
  .then(response=> response.json())
  .then(films =>{
    const filmList= document.getElementById("films")
    filmList.innerHTML="";

    films.forEach(film => {
        const li = document.createElement("li");
        li.textContent = film.title;
        li.classList.add("film", "item");
        li.addEventListener("click", () => {
          displayMovie(film);
        });

        filmList.appendChild(li);
      });
      if (films.length > 0) {
        displayMovie(films[0]);
      }
    })
    .catch(error => {
      console.error("Error fetching movie data:", error);
    });
});
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/films")
    .then(response => response.json())
    .then(films => {

      displayMovie(films[0]);
    })
    .catch(error => console.error("Error fetching movie data:", error));
});
function displayMovie(film) {
  const availableTickets = film.capacity - film.tickets_sold;

  document.getElementById("poster").src = film.poster;
  document.getElementById("title").textContent = film.title;
  document.getElementById("runtime").textContent = `Runtime: ${film.runtime} minutes`;
  document.getElementById("showtime").textContent = `Showtime: ${film.showtime}`;
  document.getElementById("tickets").textContent = `Available tickets: ${availableTickets}`;

  const buyBtn = document.getElementById("buy-ticket");
  buyBtn.onclick = () => buyTicket(film);
}
function buyTicket(film) {
  let availableTickets = film.capacity - film.tickets_sold;

  if (availableTickets > 0) {
    
    film.tickets_sold++;
    availableTickets--;

    
    document.getElementById("tickets").textContent = `Available tickets: ${availableTickets}`;

  
    fetch(`http://localhost:3000/films/${film.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tickets_sold: film.tickets_sold })
    })
    .then(response => response.json())
    .then(updatedFilm => console.log("Updated film:", updatedFilm))
    .catch(error => console.error("Error updating tickets:", error));
  } else {
    alert("Sorry, this showing is sold out!");
  }
}
function displayMovies(movies) {
  const filmsList = document.getElementById("films");
  filmsList.innerHTML = ""; // Clear placeholder or old content

  movies.forEach(film => {
    const li = document.createElement("li");
    li.classList.add("film", "item");
    li.textContent = film.title;

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.style.color = "white";
    deleteBtn.style.background = "red";
    deleteBtn.style.border = "none";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.borderRadius = "5px";
    deleteBtn.style.padding = "3px 6px";

    // Handle delete click
    deleteBtn.addEventListener("click", () => {
      // 1. Remove from frontend
      li.remove();

      // 2. Delete on server
      fetch(`http://localhost:3000/films/${film.id}`, {
        method: "DELETE"
      })
      .then(response => {
        if (!response.ok) throw new Error("Failed to delete film");
        console.log(`Deleted film with id: ${film.id}`);
      })
      .catch(error => console.error("Error deleting film:", error));
    });

    li.appendChild(deleteBtn);
    filmsList.appendChild(li);
  });
}
