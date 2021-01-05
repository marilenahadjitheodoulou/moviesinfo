$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});
/**
Use event delegation to link to drop down to the rate function
*/
$('.container').on('change', '.movie-rating', function () {
  var rating = $(this).val();
  var movieId = $(this).attr('data-id');
  rateMovie(movieId, rating);
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
    </div>
    <select class="movie-rating" data-id="{{movieId}}">
      <option>Rate</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="delete">Delete</option>
  </select>
    </div>
    `;
      })
      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function rateMovie(movieId, movieRating) {
  if (movieRating === 'delete') {
    deleteRating(movieId);
  } else {
    axios.post('http://62.217.127.19:8010/ratings/', {
      keyword: movieId
    })
    .then((response) => {
      console.log(response);
    }, (error) => {
        console.log(error);
      });
  }
}

function deleteRating(movieId){
  axios.post('http://62.217.127.19:8010/ratings/', {
      keyword: movieId
    })
  .then((response) => {
    console.log(response);
  }, (error) => {
    console.log(error);
  });
}