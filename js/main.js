$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

// Add a 401 response interceptor
window.axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (401 === error.response.status) {
    // handle error: inform user, go to login, etc
  } else {
    return Promise.reject(error);
  }
});

function getMovies(searchText) {
  axios.post('http://62.217.127.19:8010/movie/', {
    keyword: searchText
  })
    .then((response) => {
      console.log(response);
      let movies = response.data;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
      <div class="col-md-5">
        <div class="well text-center">
          <li class="list-group-item"><strong>MovieId:</strong> ${movie.movieId}</li>
          <li class="list-group-item"><strong>Title:</strong> ${movie.title}</li>
          <li class="list-group-item"><strong>Genres:</strong> ${movie.genres}</li>
          <li class="list-group-item"><strong>Rate:</strong> <input type="number" id=${index} placeholder="Rate" step="0.5" min="1" max="5"/></li>
          <li class="list-group-item"><button id="btnRate" onclick='myFunction(${movie.movieId}, ${index})' >Click to Rate</button></li>
        </div>
      </div>
      `;
      })
      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

let movies = [];
    function myFunction(a,b) {
      let movie = {
            id: a,
            rate: document.getElementById(b).value,
      }

      movies.push(movie);
      localStorage.setItem('MyMovieList', JSON.stringify(movies) );
    }