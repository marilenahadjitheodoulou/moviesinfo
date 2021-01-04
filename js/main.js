$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

$(document).ready(() => {
  $('#searchOrm').on('submit', (e) => {
    let ratingText = $('#ratingText').val();
    getRatings(ratingText);
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
  axios.get('http://62.217.127.19:8010/movie/' + searchText)
    .then((response) => {
      console.log(response);
      let movies = response.data;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
        <div class="col-md-5">
        <div class="well text-center">
        <h5>Movies Details</h5>
        <li class="list-group-item"><strong>Title:</strong> ${movie.title}</li>
        <li class="list-group-item"><strong>Genres:</strong> ${movie.genres}</li>
        </div>
        <br>
        <a href="index.html" class="btn btn-primary">Go Back To Search</a>
        </div>
        `;
      })
      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getRatings(ratingText) {
  axios.get('http://62.217.127.19:8010/ratings/' + ratingText)
    .then((response) => {
      console.log(response);
      let ratings = response.data;
      let output = '';
      $.each(ratings, (index, rating) => {
        output += `
        <table class="table table-bordered" style="width:100%">
          <thead class="thead-light">
            <tr>
              <th>UserId</th>
              <th>MovieId</th>
              <th>Rating</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${rating.userId}</td>
              <td>${rating.movieId}</td>
              <td>${rating.rating}</td>
              <td>${rating.timestamp}</td>
            </tr>
          </tbody>
        </table>
        `;
      })
      $('#ratings').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}