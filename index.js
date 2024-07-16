document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch and display movie details
    const fetchMovieDetails = async (id) => {
      try {
        const response = await fetch(`http://localhost:3000/films/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const movie = await response.json();
        displayMovieDetails(movie);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
  
    // Function to display movie details in the UI
    const displayMovieDetails = (movie) => {
      const movieDetailsContainer = document.querySelector('#movie-details');
      movieDetailsContainer.innerHTML = `
        <div class="movie-details">
          <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
          <div class="movie-info">
            <h2>${movie.title}</h2>
            <p><strong>Showtime:</strong> ${movie.showtime}</p>
            <p><strong>Runtime:</strong> ${movie.runtime} minutes</p>
            <p><strong>Description:</strong> ${movie.description}</p>
            <p><strong>Available Tickets:</strong> ${movie.capacity - movie.tickets_sold}</p>
            <button class="buy-ticket" data-movie-id="${movie.id}">Buy Ticket</button>
            <button class="delete-button" data-movie-id="${movie.id}">Delete Movie</button>
          </div>
        </div>
      `;
      // Attach event listeners to Buy Ticket and Delete buttons
      attachButtonEventListeners();
    };
  
    // Function to attach event listeners to Buy Ticket and Delete buttons
    const attachButtonEventListeners = () => {
      const buyTicketButtons = document.querySelectorAll('.buy-ticket');
      const deleteButtons = document.querySelectorAll('.delete-button');
  
      buyTicketButtons.forEach(button => {
        button.addEventListener('click', (event) => {
          event.preventDefault(); // Prevent default behavior of button (form submission or link navigation)
          const movieId = event.target.dataset.movieId;
          // Implement logic for buying a ticket
          console.log(`Buying ticket for movie ${movieId}`);
          // Example: Update tickets sold locally (no persistence)
          // Simulate UI update (decrement available tickets)
          const availableTicketsElement = document.querySelector(`#film-${movieId} .available-tickets`);
          const currentTickets = parseInt(availableTicketsElement.textContent.trim(), 10);
          if (currentTickets > 0) {
            availableTicketsElement.textContent = currentTickets - 1;
            // Bonus: Check if sold out and update UI accordingly
            if (currentTickets - 1 === 0) {
              const filmItem = document.querySelector(`#film-${movieId}`);
              filmItem.classList.add('sold-out');
              button.textContent = 'Sold Out';
              button.disabled = true;
            }
          }
        });
      });
  
      deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
          const movieId = event.target.dataset.movieId;
          // Implement logic for deleting the movie (DELETE request to server)
          console.log(`Deleting movie ${movieId}`);
          // Example: Remove movie from UI (no server interaction)
          const filmItem = document.querySelector(`#film-${movieId}`);
          filmItem.remove();
        });
      });
    };
  
    // Function to fetch and display all movies in the menu
    const fetchAllMovies = async () => {
      try {
        const response = await fetch('http://localhost:3000/films');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const movies = await response.json();
        displayAllMovies(movies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
  
    // Function to display all movies in the menu
    const displayAllMovies = (movies) => {
      const filmsList = document.querySelector('#films');
      filmsList.innerHTML = ''; // Clear previous content
      movies.forEach(movie => {
        const li = document.createElement('li');
        li.id = `film-${movie.id}`;
        li.classList.add('film', 'item');
        li.innerHTML = `
          <img src="${movie.poster}" alt="${movie.title}" class="film-poster">
          <div class="film-info">
            <h3>${movie.title}</h3>
            <p><strong>Showtime:</strong> ${movie.showtime}</p>
            <p><strong>Available Tickets:</strong> <span class="available-tickets">${movie.capacity - movie.tickets_sold}</span></p>
            <button class="buy-ticket" data-movie-id="${movie.id}">Buy Ticket</button>
            <button class="delete-button" data-movie-id="${movie.id}">Delete Movie</button>
          </div>
        `;
        filmsList.appendChild(li);
      });
      // Attach event listeners to Buy Ticket and Delete buttons
      attachButtonEventListeners();
    };
  
    // Initial fetch and display of all movies
    fetchAllMovies();
  });
  