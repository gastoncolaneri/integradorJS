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

let listaElementos = [imgOne, imgTwo, imgThree, imgFour, imgFive];
let listaJuegos = {};
let games, gamesFilter;
let genre = 'allGenre';
let platform = 'allPlatforms';
let orderBy = 'relevance';

const APIURL = 'https://www.freetogame.com/api/games';
const URLGAMEID = 'https://www.freetogame.com/api/game?id=';

let flagFavorite = false;
let favorite = 'favorite_border';
let gamesFavorites = [];

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

const mapCard = (data) => {
  let iconFav;
  let colorYellow;
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
