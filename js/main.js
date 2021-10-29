let containerCardGames = document.querySelector('#containerCard');
let loader = document.querySelector('#loader');
let carouselDiv = document.querySelector('#carousel');
let imgOne = document.querySelector('#imgOne');
let imgTwo = document.querySelector('#imgTwo');
let imgThree = document.querySelector('#imgThree');
let imgFour = document.querySelector('#imgFour');
let imgFive = document.querySelector('#imgFive');
let showBtn = document.querySelector('#showBtn');
let listaElementos = [imgOne, imgTwo, imgThree, imgFour, imgFive];
let listaJuegos = {};
let games, gamesFilter;
let genre = 'allGenre';
let platform = 'allPlatforms';
let orderBy = 'relevance';

const APIURL = 'https://www.freetogame.com/api/games';
const URLGAMEID = 'https://www.freetogame.com/api/game?id=';

const APIrequest = async () => {
  let datos = await fetch(APIURL);
  let respuesta = await datos.json();
  games = respuesta;
  mapCard(games);
};

const mapCard = (data) => {
  containerCardGames.innerHTML = '';
  try {
    data.map((juego) => {
      juego.platform == 'PC (Windows)'
        ? (iconPlatform = 'desktop_windows')
        : (iconPlatform = 'web');
      listaJuegos[juego.title] = juego.thumbnail;
      loader.classList.add('hiddenLoader');
      containerCardGames.innerHTML += `<div class="col s9 m5 l4 offset-s1">
      <div class="card cardContent hoverable">
        <div class="card-image">
          <img src="${juego.thumbnail}">
          <span class="card-title">${juego.title}</span>
        </div>
        <div class="card-content description">
          <p class="truncate ">${juego.short_description}</p>
          <div class="valign-wrapper mt15 justifyFE">
          <div class="btn-small genreTag ">${juego.genre}</div>
          <i class="material-icons">${iconPlatform}</i>
          </div>
        </div>
      </div>
    </div>`;
    });
  } catch (error) {
    loader.classList.add('hiddenLoader');
    Swal.fire({
      title: 'No results found',
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
    console.log(listaElementos);
    listaElementos[i].innerHTML += `<img src=${respuesta.thumbnail}/>`;
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
  gamesFilter = games.filter(
    (game) => game.title.toLowerCase() === elemtn.toLowerCase()
  );
  if ((gamesFilter.length = 1)) {
    console.log(gamesFilter);
    gamesFilter[0].platform == 'PC (Windows)'
      ? (iconPlatform = 'desktop_windows')
      : (iconPlatform = 'web');

    containerCardGames.innerHTML = `<div class="col s11 m6 l6 offset-s1">
      <div class="card cardContent hoverable">
        <div class="card-image">
          <img src="${gamesFilter[0].thumbnail}">
          <span class="card-title">${gamesFilter[0].title}</span>
        </div>
        <div class="card-content description">
          <p class="truncate ">${gamesFilter[0].short_description}</p>
          <div class="valign-wrapper mt15 justifyFE">
          <div class="btn-small genreTag ">${gamesFilter[0].genre}</div>
          <i class="material-icons">${iconPlatform}</i>
          </div>
        </div>
      </div>
    </div>`;
    showBtn.classList.remove('disabled');
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
  let textNeedCount = document.querySelectorAll(
    '#input_text, #textarea1, #textarea2'
  );
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
