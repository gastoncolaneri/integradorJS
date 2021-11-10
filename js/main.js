let containerCardGames = document.querySelector('#containerCard');
let loader = document.querySelector('#loader');
let loader2 = document.querySelector('#loader2');
let carouselDiv = document.querySelector('#carousel');
let imgOne = document.querySelector('#imgOne');
let imgTwo = document.querySelector('#imgTwo');
let imgThree = document.querySelector('#imgThree');
let imgFour = document.querySelector('#imgFour');
let imgFive = document.querySelector('#imgFive');
let showBtn = document.querySelector('#showBtn');
let autocompleteReviews = document.querySelector('#autocompleteReviews');
let autocompleteGames = document.querySelector('#autocompleteGames');
let platformSelect = document.querySelector('#platformSelect');
let genreSelect = document.querySelector('#genreSelect');
let orderSelect = document.querySelector('#orderSelect');
let modalFavorites = document.querySelector('#modalFavorites');
let modalReview = document.querySelector('#modal2');
let reviewList = document.querySelector('#reviewList');
let reviewForm = document.querySelector('#reviewForm');
let userInput = document.querySelector('#user-review-input');
let gameInput = document.querySelector('#autocomplete-review-input');
let reviewInput = document.querySelector('#review-input');
let rangeInput = document.querySelector('#range-input');
let listaElementos = [imgOne, imgTwo, imgThree, imgFour, imgFive];
let listaJuegos = {};
let games, gamesFilter;
let genre = 'allGenre';
let platform = 'allPlatforms';
let orderBy = 'relevance';

const emailRegex = /^[a-z][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i;
const APIURL = 'https://www.freetogame.com/api/games';
const URLGAMEID = 'https://www.freetogame.com/api/game?id=';

const resetPass = () => {
  let modalResetPass = document.querySelector('#modal4'),
    resetPassForm = document.querySelector('#resetPassForm'),
    email = document.querySelector('#email-reset-pass-input').value,
    instance = M.Modal.getInstance(modalResetPass);

  if (email === '') {
    Swal.fire({
      title: 'Missing email',
      text: 'Please complete the information required',
      icon: 'error',
      confirmButtonText: 'Ok',
    });
  } else if (!emailRegex.test(email)) {
    Swal.fire({
      title: 'Invalid Email',
      text: 'Please provide a valid email',
      icon: 'error',
      confirmButtonText: 'Ok',
    });
  } else {
    Swal.fire({
      title: 'Password reset',
      text: 'Password reset successfully. Please check your email and follow the instructions ',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
    instance.close();
    resetPassForm.reset();
  }
};

const signin = () => {
  let signinForm = document.querySelector('#signinForm'),
    name = document.querySelector('#nombre-input').value,
    surname = document.querySelector('#apellido-input').value,
    username = document.querySelector('#user-input').value,
    email = document.querySelector('#email-signin-input').value,
    emailConf = document.querySelector('#confirm-email-input').value,
    pass = document.querySelector('#pass-signin-input').value,
    passConf = document.querySelector('#confirmPass-input').value;

  if (
    name === '' ||
    surname === '' ||
    username === '' ||
    email === '' ||
    emailConf === '' ||
    pass === '' ||
    passConf === ''
  ) {
    Swal.fire({
      title: 'Missing information',
      text: 'Please complete the information required',
      icon: 'error',
      confirmButtonText: 'Ok',
    });
  } else if (!emailRegex.test(email) || !emailRegex.test(emailConf)) {
    Swal.fire({
      title: 'Invalid Email',
      text: 'Please provide a valid email',
      icon: 'error',
      confirmButtonText: 'Ok',
    });
  } else if (email !== emailConf) {
    Swal.fire({
      title: 'Emails not match ',
      text: 'The emails provided should be the same',
      icon: 'error',
      confirmButtonText: 'Ok',
    });
  } else {
    Swal.fire({
      title: 'Register success',
      text: 'Your account has been created successfully ',
      icon: 'success',
      confirmButtonText: 'Ok',
    }).then(() => {
      window.location.replace('login.html');
    });
    signinForm.reset();
  }
};

const mapCard = (data) => {
  let iconFav;
  containerCardGames.innerHTML = '';
  try {
    data.map((juego) => {
      if (localStorage.getItem(juego.id)) {
        iconFav = 'fas fa-star iconYellow';
      } else {
        iconFav = 'far fa-star';
      }
      juego.platform == 'PC (Windows)'
        ? (iconPlatform = 'desktop_windows')
        : (iconPlatform = 'web');
      listaJuegos[juego.title] = juego.thumbnail;
      loader.classList.add('hiddenLoader');
      containerCardGames.innerHTML += `
      <div class="col s9 m5 l4 offset-s1">
        <div class="card cardContent hoverable">
          <div class="card-image">
            <img src="${juego.thumbnail}" loading="lazy">
            <span class="card-title">${juego.title}</span>
            <a class="btn-floating waves-effect waves-light deep-purple addFav hoverable" >
              <i class="${iconFav} " onclick="addFavorite(event, '${juego.id}')"></i>
            </a>
          </div>
          <div class="card-content description">
            <p class="truncate">${juego.short_description}</p>
            <div class="valign-wrapper mt15 justifyFE">
            <div class="genreTag ">${juego.genre}</div>
            <i class="material-icons">${iconPlatform}</i>
            </div>
            <div class=" mt15 center">
              <a class="btn-small btnInfo" href="${juego.game_url}" target="_blank">Play now!</a>
            </div>
        </div>
      </div>
    `;
    });
  } catch (error) {
    loader.classList.add('hiddenLoader');
    Swal.fire({
      title: 'No results found',
      icon: 'info',
      confirmButtonText: 'Ok',
    });
  }
};

const addReview = () => {
  let userValue = userInput.value;
  let gameValue = gameInput.value;
  let reviewValue = reviewInput.value;
  let rangeValue = parseInt(rangeInput.value);
  let ratingList = [];
  let formData = {
    userValue: userValue,
    gameValue: gameValue,
    reviewValue: reviewValue,
    rangeValue: rangeValue,
  };
  let randomNumber = Math.round(Math.random() * (2000 - 1) + 1);
  let instance = M.Modal.getInstance(modalReview);

  if (
    userValue !== '' &&
    gameValue !== '' &&
    reviewValue !== '' &&
    rangeValue !== ''
  ) {
    switch (rangeValue) {
      case 1:
        ratingList.push('fas', 'far', 'far', 'far', 'far');
        break;
      case 2:
        ratingList.push('fas', 'fas', 'far', 'far', 'far');
        break;
      case 3:
        ratingList.push('fas', 'fas', 'fas', 'far', 'far');
        break;
      case 4:
        ratingList.push('fas', 'fas', 'fas', 'fas', 'far');
        break;
      case 5:
        ratingList.push('fas', 'fas', 'fas', 'fas', 'fas');
        break;
      default:
        ratingList.push('far', 'far', 'far', 'far', 'far');
    }

    reviewList.innerHTML += `
        <li class="collection-item avatar deep-purple darken-3 noBorder">
          <div class="collapsible-header deep-purple darken-3 noBorder headerCollapse">
            <div class="row m0">
              <div class="col s12 m5 l6" >
                <img src="${listaJuegos[gameValue]}" alt="img" class="circle responsive-img" />
                <p class="p5">
                  ${gameValue} <br />
                  Review posted by ${userValue}
                </p>
              </div>
              <div class="valign-wrapper p5 col s12 m7 l6">
                <i class="${ratingList[0]} fa-star  iconYellow mr5"></i>
                <i class="${ratingList[1]} fa-star iconYellow mr5"></i>
                <i class="${ratingList[2]} fa-star iconYellow mr5"></i>
                <i class="${ratingList[3]} fa-star iconYellow mr5"></i>
                <i class="${ratingList[4]} fa-star iconYellow mr5"></i>
                <p class="ratingNumber btn-floating show-on-medium-and-down">${rangeValue}/5</p>
              </div>
            </div>
          </div>
          <div class="collapsible-body noBorder">
            <p>${reviewValue}</p>
          </div>
        </li>
  `;
    Swal.fire({
      title: 'Success',
      text: 'Your review has been submitted!',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
    instance.close();
    reviewForm.reset();
  } else {
    Swal.fire({
      title: 'Missing information',
      text: 'Please complete all the information requested',
      icon: 'error',
      confirmButtonText: 'Ok',
    });
  }
};

const addFavorite = (event, id) => {
  if (event.target.classList.contains('far')) {
    event.target.classList.remove('far');
    event.target.classList.add('fas');
    event.target.classList.add('iconYellow');
    localStorage.setItem(id, id);
    M.toast({ html: 'Agregado a favoritos', classes: 'rounded' });
  } else if (event.target.classList.contains('fas')) {
    event.target.classList.remove('fas');
    event.target.classList.remove('iconYellow');
    event.target.classList.add('far');
    localStorage.removeItem(id);
    M.toast({ html: 'Eliminado de favoritos', classes: 'rounded' });
  }
};

const favoritesSaved = async () => {
  modalFavorites.innerHTML = '';
  if (localStorage.length > 1) {
    for (let i = 0; i < localStorage.length; i++) {
      let value = localStorage.getItem(localStorage.key(i));
      let datos = await fetch(URLGAMEID + value);
      let juego = await datos.json();
      modalFavorites.innerHTML += `
    <div class="container"> 
      <div class="col s9 m5 l4 offset-s1">
        <div class="card cardContent hoverable">
          <div class="card-image">
            <img src="${juego.thumbnail}" loading="lazy">
            <span class="card-title">${juego.title}</span>
            </a>
          </div>
          <div class="card-content description">
            <p class="truncate">${juego.short_description}</p>
            <div class="valign-wrapper mt15 justifyFE">
              <div class="genreTag ">${juego.genre}</div>
              <i class="material-icons">${iconPlatform}</i>
            </div>
            <div class=" mt15 center">
              <a class="btn-small btnInfo" href="${juego.game_url}" target="_blank">Play now!</a>
            </div>
        </div>
      </div>
    </div>`;
      loader2.classList.add('hiddenLoader');
    }
  } else {
    modalFavorites.innerHTML += `
    <div class="container"> 
     <p class="noFavorites"> No favorites added yet!</p>
    </div>`;
    loader2.classList.add('hiddenLoader');
  }
};

const APIrequest = async () => {
  try {
    let datos = await fetch(APIURL);
    let respuesta = await datos.json();
    games = respuesta;
    mapCard(games);
  } catch (error) {
    Swal.fire({
      title: 'There was an error',
      text: 'Something went wrong, please try again later',
      icon: 'error',
      confirmButtonText: 'Ok',
    });
  }
};

const gamesListComplete = () => {
  loader.classList.remove('hiddenLoader');
  mapCard(games);
  showBtn.classList.add('disabled');
};

const carouselAPI = async (i) => {
  let numRandom = Math.floor(Math.random() * (515 - 1)) + 1;
  let datos = await fetch(URLGAMEID + numRandom);
  let respuesta = await datos.json();
  if (respuesta.status !== 0) {
    listaElementos[
      i
    ].innerHTML += `<img src=${respuesta.thumbnail} loading="lazy"/>`;
    return respuesta;
  } else {
    carouselAPI(i);
  }
};

const carouselGames = () => {
  for (let i = 0; i < 5; i++) {
    carouselAPI(i);
  }
};

const filterAutocomplete = (elemtn) => {
  // gamesFilter = games.filter(
  //   (game) => game.title.toLowerCase() === elemtn.toLowerCase()
  // );
  if (autocompleteGames) {
    gamesFilter = games.filter(
      (game) => game.title.toLowerCase() === elemtn.toLowerCase()
    );
    if ((gamesFilter.length = 1)) {
      loader.classList.add('hiddenLoader');
      gamesFilter[0].platform == 'PC (Windows)'
        ? (iconPlatform = 'desktop_windows')
        : (iconPlatform = 'web');

      containerCardGames.innerHTML = `<div class="col s11 m6 l6 offset-s1">
      <div class="card cardContent hoverable">
        <div class="card-image">
          <img src="${gamesFilter[0].thumbnail}" loading="lazy">
          <span class="card-title">${gamesFilter[0].title}</span>
        </div>
        <div class="card-content description">
          <p class="truncate ">${gamesFilter[0].short_description}</p>
          <div class="valign-wrapper mt15 justifyFE">
          <div class="genreTag ">${gamesFilter[0].genre}</div>
          <i class="material-icons">${iconPlatform}</i>
          </div>
        </div>
      </div>
    </div>`;
      showBtn.classList.remove('disabled');
    }
  }
};
const gamesAutocomplete = async () => {
  let datos = await fetch(APIURL);
  let respuesta = await datos.json();
  respuesta.map((juego) => {
    listaJuegos[juego.title] = juego.thumbnail;
  });
};

const selectedGenre = (event) => {
  genre = event.target.value;
  showGamesFiltered();
};

const selectedPlatform = (event) => {
  platform = event.target.value;
  showGamesFiltered();
};

const sortBy = (event) => {
  orderBy = event.target.value;
  showGamesFiltered();
};

const showGamesFiltered = async () => {
  containerCardGames.innerHTML = '';
  loader.classList.remove('hiddenLoader');
  if (
    genre !== undefined &&
    genre !== 'allGenre' &&
    platform !== undefined &&
    platform !== 'allPlatforms'
  ) {
    let datos = await fetch(
      APIURL + `?platform=${platform}&category=${genre}&sort-by=${orderBy}`
    );
    let respuesta = await datos.json();
    mapCard(respuesta);
  } else if (genre !== undefined && genre !== 'allGenre') {
    let datos = await fetch(APIURL + `?category=${genre}&sort-by=${orderBy}`);
    let respuesta = await datos.json();
    mapCard(respuesta);
  } else if (platform !== undefined && platform !== 'allPlatforms') {
    let datos = await fetch(
      APIURL + `?platform=${platform}&sort-by=${orderBy}`
    );
    let respuesta = await datos.json();
    mapCard(respuesta);
  } else if (platform === 'allPlatforms' && genre === 'allGenre') {
    let datos = await fetch(APIURL + `?sort-by=${orderBy}`);
    let respuesta = await datos.json();
    mapCard(respuesta);
  }
  showBtn.classList.remove('disabled');
};

// Materialize JS
document.addEventListener('DOMContentLoaded', function () {
  let elems = document.querySelectorAll('.sidenav');
  let instances = M.Sidenav.init(elems, {});
});

document.addEventListener('DOMContentLoaded', function () {
  let options = {
    data: listaJuegos,
    onAutocomplete: function (texto) {
      filterAutocomplete(texto);
    },
    limit: 5,
  };
  let elems = document.querySelectorAll('.autocomplete');
  let instances = M.Autocomplete.init(elems, options);
});

document.addEventListener('DOMContentLoaded', function () {
  let elems = document.querySelectorAll('select');
  let instances = M.FormSelect.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
  let elems = document.querySelectorAll('.modal');
  let instances = M.Modal.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
  let elems = document.querySelectorAll('.tooltipped');
  let instances = M.Tooltip.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
  let elems = document.querySelectorAll('.carousel');
  let instances = M.Carousel.init(elems, {
    fullWidth: true,
    indicators: true,
    duration: 500,
  });
});

document.addEventListener('DOMContentLoaded', function () {
  let elems = document.querySelectorAll('.parallax');
  let instances = M.Parallax.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
  let elems = document.querySelectorAll('.fixed-action-btn');
  let instances = M.FloatingActionButton.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
  let textNeedCount = document.querySelector('#review-input');
  M.CharacterCounter.init(textNeedCount);
});

document.addEventListener('DOMContentLoaded', function () {
  let elems = document.querySelectorAll('.dropdown-trigger');
  let options = {
    coverTrigger: false,
    constrainWidth: false,
  };
  let instances = M.Dropdown.init(elems, options);
});
document.addEventListener('DOMContentLoaded', function () {
  let elems = document.querySelectorAll('.collapsible');
  let instances = M.Collapsible.init(elems);
});
